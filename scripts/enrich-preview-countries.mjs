import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const dataPath = resolve("src/renderer/mocks/data/officialLeaderboardPreview.json");
const payload = JSON.parse(await readFile(dataPath, "utf8"));
const playersByProfileId = new Map(payload.players.map((player) => [Number(player.profileId), player]));
const playersWithSteamIds = payload.players.filter((player) => /^\d{17}$/.test(player.steamId ?? ""));

for (let index = 0; index < playersWithSteamIds.length; index += 25) {
  const batch = playersWithSteamIds.slice(index, index + 25);
  const url = new URL("https://aoe-api.worldsedgelink.com/community/leaderboard/getPersonalStat");
  url.searchParams.set("title", "age2");
  url.searchParams.set("profile_names", JSON.stringify(batch.map((player) => `/steam/${player.steamId}`)));
  const response = await fetchWithRetries(url);
  const result = await response.json();
  if (result?.result?.code !== 0) throw new Error(result?.result?.message ?? "Official API request failed.");

  for (const group of result.statGroups ?? []) {
    for (const member of group.members ?? []) {
      const countryCode = normalizeCountryCode(member.countryCode ?? member.country_code ?? member.country);
      const player = playersByProfileId.get(Number(member.profile_id));
      if (player && countryCode) player.countryCode = countryCode;
    }
  }
  process.stdout.write(`\rCountries: ${Math.min(index + 25, playersWithSteamIds.length)} / ${playersWithSteamIds.length}`);
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
}

const playersWithoutCountries = payload.players.filter((player) => !player.countryCode);
if (playersWithoutCountries.length) {
  const url = new URL("https://aoe-api.worldsedgelink.com/community/leaderboard/getPersonalStat");
  url.searchParams.set("title", "age2");
  url.searchParams.set("profile_ids", JSON.stringify(playersWithoutCountries.map((player) => player.profileId)));
  const result = await (await fetchWithRetries(url)).json();
  if (result?.result?.code !== 0) throw new Error(result?.result?.message ?? "Official API request failed.");
  for (const group of result.statGroups ?? []) {
    for (const member of group.members ?? []) {
      const countryCode = normalizeCountryCode(member.countryCode ?? member.country_code ?? member.country);
      const player = playersByProfileId.get(Number(member.profile_id));
      if (player && countryCode) player.countryCode = countryCode;
    }
  }
}

payload.countrySource = "World's Edge Age of Empires community API getPersonalStat";
payload.countriesEnrichedAt = new Date().toISOString();
await writeFile(dataPath, `${JSON.stringify(payload)}\n`, "utf8");
const populated = payload.players.filter((player) => player.countryCode).length;
console.log(`\nWrote ${populated} country codes for ${payload.players.length} players.`);

async function fetchWithRetries(url, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": "EmpireLeaguePreview/0.1" },
        signal: AbortSignal.timeout(20_000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolveDelay) => setTimeout(resolveDelay, 500 * 2 ** (attempt - 1)));
    }
  }
  throw lastError;
}

function normalizeCountryCode(value) {
  if (typeof value !== "string") return undefined;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : undefined;
}
