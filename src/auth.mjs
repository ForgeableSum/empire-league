import { createHash, randomBytes, randomUUID } from "node:crypto";
import { database } from "./database.mjs";
import { attemptAoeRatingSeed } from "./aoe-rating-seed.mjs";

const steamOpenIdUrl = "https://steamcommunity.com/openid/login";
const sessionLifetimeMs = 30 * 24 * 60 * 60 * 1000;
const loginLifetimeMs = 5 * 60 * 1000;

function token() {
  return randomBytes(32).toString("base64url");
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function beginSteamLogin(publicBaseUrl) {
  const id = randomUUID();
  const pollToken = token();
  const state = token();
  const expiresAt = new Date(Date.now() + loginLifetimeMs);
  await database.execute(
    "INSERT INTO auth_login_attempts (id, poll_token_hash, state_hash, expires_at) VALUES (?, ?, ?, ?)",
    [id, hash(pollToken), hash(state), expiresAt]
  );
  const returnTo = `${publicBaseUrl}/auth/steam/callback?attempt=${encodeURIComponent(id)}&state=${encodeURIComponent(state)}`;
  const parameters = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnTo,
    "openid.realm": `${publicBaseUrl}/`,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select"
  });
  return { attemptId: id, pollToken, loginUrl: `${steamOpenIdUrl}?${parameters}`, expiresAt: expiresAt.toISOString() };
}

export async function completeSteamLogin(url) {
  const attemptId = url.searchParams.get("attempt");
  const state = url.searchParams.get("state");
  if (!attemptId || !state) throw new Error("Missing login state.");
  const [attempts] = await database.execute(
    "SELECT id FROM auth_login_attempts WHERE id = ? AND state_hash = ? AND status = 'pending' AND expires_at > NOW(3)",
    [attemptId, hash(state)]
  );
  if (!attempts.length) throw new Error("This login attempt is invalid or expired.");

  const verification = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (key.startsWith("openid.")) verification.set(key, value);
  }
  verification.set("openid.mode", "check_authentication");
  const response = await fetch(steamOpenIdUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verification
  });
  const result = await response.text();
  if (!response.ok || !/(?:^|\n)is_valid:true(?:\n|$)/.test(result)) throw new Error("Steam rejected the login response.");

  const claimedId = url.searchParams.get("openid.claimed_id") ?? "";
  const match = claimedId.match(/^https?:\/\/steamcommunity\.com\/openid\/id\/(\d{17})$/);
  if (!match) throw new Error("Steam returned an invalid account identifier.");
  await database.execute("UPDATE auth_login_attempts SET steam_id = ?, status = 'approved' WHERE id = ?", [match[1], attemptId]);
  return match[1];
}

export async function pollSteamLogin(attemptId, pollToken) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [attempts] = await connection.execute(
      "SELECT steam_id, status, expires_at FROM auth_login_attempts WHERE id = ? AND poll_token_hash = ? FOR UPDATE",
      [attemptId, hash(pollToken)]
    );
    const attempt = attempts[0];
    if (!attempt) {
      await connection.rollback();
      return { status: "invalid" };
    }
    if (new Date(attempt.expires_at).getTime() <= Date.now()) {
      await connection.execute("UPDATE auth_login_attempts SET status = 'expired' WHERE id = ?", [attemptId]);
      await connection.commit();
      return { status: "expired" };
    }
    if (attempt.status !== "approved") {
      await connection.rollback();
      return { status: attempt.status };
    }

    const steamId = attempt.steam_id;
    const playerId = `steam-${steamId}`;
    await connection.execute(
      `INSERT INTO players (id, steam_id, display_name, rating, peak_rating)
       VALUES (?, ?, ?, 1000, 1000)
       ON DUPLICATE KEY UPDATE id = id`,
      [playerId, steamId, `Steam ${steamId.slice(-6)}`]
    );
    const [players] = await connection.execute("SELECT id FROM players WHERE steam_id = ?", [steamId]);
    const sessionToken = token();
    const expiresAt = new Date(Date.now() + sessionLifetimeMs);
    await connection.execute(
      "INSERT INTO auth_sessions (id, player_id, token_hash, expires_at, last_used_at) VALUES (?, ?, ?, ?, NOW(3))",
      [randomUUID(), players[0].id, hash(sessionToken), expiresAt]
    );
    await connection.execute("UPDATE auth_login_attempts SET status = 'consumed', consumed_at = NOW(3) WHERE id = ?", [attemptId]);
    await connection.commit();
    await attemptAoeRatingSeed(database, players[0].id, steamId);
    return { status: "authenticated", token: sessionToken, expiresAt: expiresAt.toISOString() };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function authenticate(request, refreshSteamProfile = false) {
  const authorization = request.headers.authorization ?? "";
  const match = authorization.match(/^Bearer (\S+)$/);
  if (!match) return null;
  const [rows] = await database.execute(
    `SELECT p.*, (SELECT COUNT(*) + 1 FROM players higher WHERE higher.rating > p.rating) AS ladder_rank
     FROM auth_sessions s JOIN players p ON p.id = s.player_id
     WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > NOW(3)`,
    [hash(match[1])]
  );
  if (!rows.length) return null;
  await database.execute("UPDATE auth_sessions SET last_used_at = NOW(3) WHERE token_hash = ?", [hash(match[1])]);
  const row = rows[0];
  if (refreshSteamProfile && row.steam_id) {
    const steamProfile = await fetchSteamProfile(row.steam_id);
    if (steamProfile) {
      row.display_name = steamProfile.personaName ?? row.display_name;
      row.avatar_url = steamProfile.avatarUrl ?? row.avatar_url;
      row.country_code = row.country_code ?? steamProfile.countryCode;
      await database.execute(
        "UPDATE players SET display_name = ?, avatar_url = ?, country_code = ? WHERE id = ?",
        [row.display_name, row.avatar_url, row.country_code, row.id]
      );
    }
  }
  return playerFromRow(row);
}

export async function revokeSession(request) {
  const match = (request.headers.authorization ?? "").match(/^Bearer (\S+)$/);
  if (match) await database.execute("UPDATE auth_sessions SET revoked_at = NOW(3) WHERE token_hash = ?", [hash(match[1])]);
}

function playerFromRow(row) {
  const games = Number(row.wins) + Number(row.losses);
  return {
    id: row.id,
    aoeProfileId: row.aoe_profile_id ? Number(row.aoe_profile_id) : 0,
    steamId: row.steam_id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url ?? undefined,
    countryCode: row.country_code ?? undefined,
    rating: Number(row.rating),
    peakRating: Number(row.peak_rating),
    rank: Number(row.ladder_rank),
    division: divisionForRating(Number(row.rating)),
    wins: Number(row.wins),
    losses: Number(row.losses),
    winRate: games ? Number(((Number(row.wins) / games) * 100).toFixed(1)) : 0,
    streak: Number(row.streak),
    preferredMaps: [],
    favoriteCivilizations: [],
    recentForm: []
  };
}

function divisionForRating(rating) {
  if (rating >= 2200) return "Grandmaster";
  if (rating >= 1800) return "Master";
  if (rating >= 1400) return "Diamond";
  if (rating >= 1200) return "Platinum";
  if (rating >= 1000) return "Gold";
  if (rating >= 800) return "Silver";
  return "Bronze";
}

async function fetchSteamProfile(steamId) {
  try {
    if (process.env.STEAM_WEB_API_KEY) {
      const parameters = new URLSearchParams({ key: process.env.STEAM_WEB_API_KEY, steamids: steamId });
      const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?${parameters}`, {
        signal: AbortSignal.timeout(5000)
      });
      if (response.ok) {
        const profile = (await response.json()).response?.players?.[0];
        if (profile) {
          return {
            personaName: typeof profile.personaname === "string" ? profile.personaname.trim().slice(0, 100) : null,
            avatarUrl: normalizeSteamAvatarUrl(profile.avatarfull),
            countryCode: normalizeCountryCode(profile.loccountrycode)
          };
        }
      }
    }

    const response = await fetch(`https://steamcommunity.com/profiles/${steamId}/?xml=1`, {
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return null;
    const xml = await response.text();
    const name = xml.match(/<steamID><!\[CDATA\[([\s\S]*?)\]\]><\/steamID>/)?.[1];
    const avatarUrl = xml.match(/<avatarFull><!\[CDATA\[([\s\S]*?)\]\]><\/avatarFull>/)?.[1];
    const countryCode = xml.match(/<countryCode>([^<]+)<\/countryCode>/)?.[1];
    if (!name && !avatarUrl && !countryCode) return null;
    return {
      personaName: name?.trim().slice(0, 100) || null,
      avatarUrl: normalizeSteamAvatarUrl(avatarUrl),
      countryCode: normalizeCountryCode(countryCode)
    };
  } catch (error) {
    console.warn(`[auth] Could not load Steam persona for ${steamId}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function normalizeSteamAvatarUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const url = value.trim();
  return /fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb/i.test(url) ? null : url;
}

function normalizeCountryCode(value) {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}
