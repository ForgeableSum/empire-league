import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = process.argv[2];
const requestedCount = Number(process.argv[3] ?? 500);

if (!sourcePath || !Number.isSafeInteger(requestedCount) || requestedCount < 300) {
  throw new Error("Usage: node scripts/generate-preview-leaderboard.mjs <leaderboard.json> [count >= 300]");
}

const source = JSON.parse(await readFile(resolve(sourcePath), "utf8"));
const players = Array.isArray(source?.players) ? source.players.slice(0, requestedCount) : [];
if (players.length < 300) throw new Error("The source must contain at least 300 players.");

const output = {
  source: "World's Edge Age of Empires community API (Ranked 1v1 Random Map, leaderboard 3)",
  harvestedAt: source.harvestedAt,
  leaderboardId: source.leaderboardId,
  totalAtHarvest: source.players.length,
  players: players.map((player) => ({
    profileId: player.profileId,
    steamId: player.steamId,
    name: player.name,
    rating: player.rating,
    rank: player.rank,
    wins: player.wins,
    losses: player.losses,
    streak: player.currentStreak
  }))
};

await writeFile(
  resolve("src/renderer/mocks/data/officialLeaderboardPreview.json"),
  `${JSON.stringify(output)}\n`,
  "utf8"
);
console.log(`Wrote ${players.length} official leaderboard rows harvested at ${source.harvestedAt}.`);
