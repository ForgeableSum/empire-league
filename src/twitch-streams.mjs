const twitchApiBaseUrl = "https://api.twitch.tv/helix";
const twitchTokenUrl = "https://id.twitch.tv/oauth2/token";
const streamCacheTtlMs = 60_000;
const tokenSafetyWindowMs = 60_000;

let appToken;
let appTokenExpiresAt = 0;
let aoe2GameId;
let streamCache;
let streamCacheExpiresAt = 0;
let streamRefreshPromise;

function credentials() {
  return {
    clientId: process.env.TWITCH_CLIENT_ID?.trim(),
    clientSecret: process.env.TWITCH_CLIENT_SECRET?.trim()
  };
}

async function getAppToken() {
  const { clientId, clientSecret } = credentials();
  if (!clientId || !clientSecret) return null;
  if (appToken && appTokenExpiresAt > Date.now() + tokenSafetyWindowMs) return appToken;

  const parameters = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials"
  });
  const response = await fetch(`${twitchTokenUrl}?${parameters}`, { method: "POST" });
  if (!response.ok) throw new Error(`Twitch authentication failed (${response.status}).`);
  const body = await response.json();
  appToken = body.access_token;
  appTokenExpiresAt = Date.now() + Math.max(0, Number(body.expires_in) || 0) * 1000;
  return appToken;
}

async function twitchGet(path, parameters) {
  const { clientId } = credentials();
  const token = await getAppToken();
  if (!clientId || !token) return null;
  const query = new URLSearchParams(parameters);
  const response = await fetch(`${twitchApiBaseUrl}${path}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": clientId
    }
  });
  if (!response.ok) throw new Error(`Twitch API request failed (${response.status}).`);
  return response.json();
}

async function getAoe2GameId() {
  if (aoe2GameId) return aoe2GameId;
  const body = await twitchGet("/games", { name: "Age of Empires II" });
  aoe2GameId = body?.data?.[0]?.id;
  return aoe2GameId;
}

async function refreshLiveStreams() {
  const gameId = await getAoe2GameId();
  if (!gameId) return [];
  const body = await twitchGet("/streams", { game_id: gameId, first: "3" });
  return (body?.data ?? []).slice(0, 3).map((stream) => ({
    id: String(stream.id),
    creatorName: String(stream.user_name || stream.user_login),
    title: String(stream.title || "Age of Empires II"),
    thumbnailUrl: String(stream.thumbnail_url).replace("{width}", "320").replace("{height}", "180"),
    viewerCount: Number(stream.viewer_count) || 0,
    streamUrl: `https://www.twitch.tv/${encodeURIComponent(stream.user_login)}`
  }));
}

export async function getTopAoe2Streams() {
  if (!credentials().clientId || !credentials().clientSecret) return [];
  if (streamCache && streamCacheExpiresAt > Date.now()) return streamCache;
  if (streamRefreshPromise) return streamRefreshPromise;

  streamRefreshPromise = refreshLiveStreams()
    .then((streams) => {
      streamCache = streams;
      streamCacheExpiresAt = Date.now() + streamCacheTtlMs;
      return streams;
    })
    .finally(() => {
      streamRefreshPromise = undefined;
    });
  return streamRefreshPromise;
}
