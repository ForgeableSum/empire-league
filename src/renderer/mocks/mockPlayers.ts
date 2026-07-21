import { getDivisionForRating, type MapDefinition, type MatchOutcome } from "../../shared/contracts/matchmaking";
import type { PlayerProfile } from "../../shared/contracts/players";

export const maps: MapDefinition[] = [
  { id: "arabia", name: "Arabia", style: "open" },
  { id: "arena", name: "Arena", style: "closed" },
  { id: "acropolis", name: "Acropolis", style: "open" },
  { id: "gold-rush", name: "Gold Rush", style: "open" },
  { id: "hideout", name: "Hideout", style: "closed" },
  { id: "nomad", name: "Nomad", style: "nomad" },
  { id: "four-lakes", name: "Four Lakes", style: "hybrid" },
  { id: "megarandom", name: "MegaRandom", style: "hybrid" },
  { id: "socotra", name: "Socotra", style: "open" },
  { id: "runestones", name: "Runestones", style: "open" }
];

export const civilizations = [
  "Britons",
  "Franks",
  "Mayans",
  "Lithuanians",
  "Hindustanis",
  "Mongols",
  "Aztecs",
  "Byzantines",
  "Japanese",
  "Poles"
];

export const currentUser: PlayerProfile = {
  id: "user-1",
  aoeProfileId: 12345678,
  displayName: "EmpireSum",
  countryCode: "US",
  rating: 1426,
  peakRating: 1511,
  rank: 8421,
  division: "Diamond",
  wins: 284,
  losses: 241,
  winRate: 54.1,
  streak: 3,
  preferredMaps: ["Arabia", "Runestones", "Gold Rush"],
  favoriteCivilizations: ["Mayans", "Lithuanians", "Britons"],
  recentForm: ["win", "win", "loss", "win", "win"]
};

const countries = ["US", "CA", "BR", "GB", "DE", "FR", "ES", "PL", "SE", "KR", "JP", "AU"];
const names = [
  "StoneGate",
  "MangoLine",
  "BoarPuller",
  "DarkAgeDan",
  "ScoutRush",
  "WallBuilder",
  "RelicRunner",
  "TownBell",
  "HillFort",
  "CastleClick",
  "FarmReset",
  "GoldMiner",
  "BerryGuard",
  "LoomFirst",
  "FastImp",
  "StableSwitch",
  "ArcherSplit",
  "MarketAbuse",
  "MonkMicro",
  "DockDrop"
];

function form(seed: number): MatchOutcome[] {
  return [0, 1, 2, 3, 4].map((offset) => ((seed + offset) % 3 === 0 ? "loss" : "win"));
}

export const leaderboardPlayers: PlayerProfile[] = Array.from({ length: 50 }, (_, index) => {
  const rating = 1910 - index * 17 + (index % 5) * 3;
  const wins = 420 - index * 4;
  const losses = 170 + index * 3;
  return {
    id: index === 17 ? currentUser.id : `player-${index + 1}`,
    aoeProfileId: index === 17 ? currentUser.aoeProfileId : 6200000 + index,
    displayName: index === 17 ? currentUser.displayName : `${names[index % names.length]}${index + 11}`,
    countryCode: countries[index % countries.length],
    rating: index === 17 ? currentUser.rating : rating,
    peakRating: index === 17 ? currentUser.peakRating : rating + 54,
    rank: index === 17 ? currentUser.rank : index + 1,
    division: getDivisionForRating(index === 17 ? currentUser.rating : rating),
    wins,
    losses,
    winRate: Number(((wins / (wins + losses)) * 100).toFixed(1)),
    streak: (index % 9) - 3,
    preferredMaps: [maps[index % maps.length].name, maps[(index + 3) % maps.length].name],
    favoriteCivilizations: [civilizations[index % civilizations.length], civilizations[(index + 4) % civilizations.length]],
    recentForm: form(index)
  };
});

export const matchmakingOpponents = leaderboardPlayers
  .filter((player) => player.id !== currentUser.id)
  .slice(10, 18);
