const aoeCommunityApiUrl = "https://aoe-api.worldsedgelink.com/community/leaderboard/getPersonalStat";
const soloRandomMapLeaderboardId = 3;
const teamRandomMapLeaderboardId = 4;

export async function attemptAoeRatingSeed(database, playerId, steamId) {
  const [claim] = await database.execute(
    `UPDATE players
     SET aoe_rating_seed_attempted = TRUE
     WHERE id = ? AND aoe_rating_seed_attempted = FALSE`,
    [playerId]
  );
  if (claim.affectedRows !== 1) {
    return backfillAoeCountry(database, playerId, steamId);
  }

  try {
    const seed = await fetchAoeRatingSeed(steamId);
    if (!seed) {
      console.info(`[aoe-rating-seed] No ranked RM rating found for Steam ${steamId}.`);
      return { attempted: true, seeded: false };
    }

    await database.execute(
      `UPDATE players
       SET aoe_profile_id = ?,
           rating = COALESCE(?, rating),
           peak_rating = COALESCE(?, peak_rating),
           aoe_initial_rating = ?,
           team_rating = COALESCE(?, team_rating),
           team_peak_rating = COALESCE(?, team_peak_rating),
           aoe_team_initial_rating = ?,
           legacy_solo_wins = ?,
           legacy_solo_losses = ?,
           legacy_team_wins = ?,
           legacy_team_losses = ?,
           country_code = COALESCE(?, country_code),
           aoe_rating_seeded_at = NOW(3)
       WHERE id = ?`,
      [
        seed.profileId,
        seed.rating,
        seed.peakRating,
        seed.rating,
        seed.teamRating,
        seed.teamPeakRating,
        seed.teamRating,
        seed.legacySoloWins,
        seed.legacySoloLosses,
        seed.legacyTeamWins,
        seed.legacyTeamLosses,
        seed.countryCode,
        playerId
      ]
    );
    console.info(
      `[aoe-rating-seed] Seeded ${playerId} at`
      + (seed.rating ? ` 1v1 RM ${seed.rating}` : " no 1v1 RM rating")
      + (seed.teamRating ? ` and Team RM ${seed.teamRating}.` : "; no Team RM rating found.")
    );
    return { attempted: true, seeded: true, ...seed };
  } catch (error) {
    console.warn(
      `[aoe-rating-seed] One-time seed failed for Steam ${steamId}:`,
      error instanceof Error ? error.message : error
    );
    return { attempted: true, seeded: false };
  }
}

async function backfillAoeCountry(database, playerId, steamId) {
  const [players] = await database.execute(
    "SELECT country_code FROM players WHERE id = ?",
    [playerId]
  );
  if (!players.length || players[0].country_code) return { attempted: false, seeded: false };

  try {
    const seed = await fetchAoeRatingSeed(steamId);
    if (!seed?.countryCode) return { attempted: false, seeded: false };
    await database.execute(
      "UPDATE players SET country_code = ? WHERE id = ? AND country_code IS NULL",
      [seed.countryCode, playerId]
    );
    console.info(`[aoe-rating-seed] Backfilled country ${seed.countryCode} for ${playerId}.`);
    return { attempted: false, seeded: false, countryCode: seed.countryCode };
  } catch (error) {
    console.warn(
      `[aoe-rating-seed] Country backfill failed for Steam ${steamId}:`,
      error instanceof Error ? error.message : error
    );
    return { attempted: false, seeded: false };
  }
}

export async function fetchAoeRatingSeed(steamId) {
  const parameters = new URLSearchParams({
    title: "age2",
    profile_names: JSON.stringify([`/steam/${steamId}`])
  });
  const response = await fetch(`${aoeCommunityApiUrl}?${parameters}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000)
  });
  if (!response.ok) throw new Error(`AoE community API returned ${response.status}.`);

  return parseAoeRatingSeed(await response.json());
}

export function parseAoeRatingSeed(payload) {
  if (payload?.result?.code !== 0) return null;

  const soloStat = payload?.leaderboardStats?.find(
    (item) => Number(item?.leaderboard_id) === soloRandomMapLeaderboardId
  );
  const rating = validRating(soloStat?.rating);
  const teamStat = payload?.leaderboardStats?.find(
    (item) => Number(item?.leaderboard_id) === teamRandomMapLeaderboardId
  );
  const teamRating = validRating(teamStat?.rating);
  if (!rating && !teamRating) return null;

  const profileStat = soloStat ?? teamStat;
  const statGroup = payload?.statGroups?.find(
    (group) => Number(group?.id) === Number(profileStat?.statgroup_id)
  );
  const profileId = Number(statGroup?.members?.[0]?.profile_id);
  if (!Number.isSafeInteger(profileId) || profileId <= 0) return null;

  const member = statGroup?.members?.[0];
  return {
    profileId,
    rating,
    peakRating: rating ? validPeakRating(soloStat?.highestrating, rating) : null,
    legacySoloWins: rating ? validCount(soloStat?.wins) : 0,
    legacySoloLosses: rating ? validCount(soloStat?.losses) : 0,
    teamRating,
    teamPeakRating: teamRating ? validPeakRating(teamStat?.highestrating, teamRating) : null,
    legacyTeamWins: teamRating ? validCount(teamStat?.wins) : 0,
    legacyTeamLosses: teamRating ? validCount(teamStat?.losses) : 0,
    countryCode: normalizeCountryCode(
      member?.countryCode ?? member?.country_code ?? member?.country ?? profileStat?.country
    )
  };
}

function validRating(value) {
  const rating = Number(value);
  return Number.isInteger(rating) && rating > 0 && rating <= 5000 ? rating : null;
}

function validPeakRating(value, rating) {
  const peak = Number(value);
  return Number.isInteger(peak) && peak >= rating && peak <= 5000 ? peak : rating;
}

function validCount(value) {
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

function normalizeCountryCode(value) {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}
