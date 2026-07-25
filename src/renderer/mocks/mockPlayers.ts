import { getDivisionForRating, type MapDefinition, type MatchOutcome } from "../../shared/contracts/matchmaking";
import type { PlayerProfile } from "../../shared/contracts/players";
import acropolisThumbnail from "../assets/maps/acropolis.png";
import arabiaThumbnail from "../assets/maps/arabia.png";
import arenaThumbnail from "../assets/maps/arena.png";
import goldRushThumbnail from "../assets/maps/gold-rush.png";
import megaRandomThumbnail from "../assets/maps/megarandom.png";
import nomadThumbnail from "../assets/maps/nomad.png";

export const maps: MapDefinition[] = [
  { id: "arabia", name: "Arabia", style: "open", thumbnailUrl: arabiaThumbnail },
  { id: "arena", name: "Arena", style: "closed", thumbnailUrl: arenaThumbnail },
  { id: "acropolis", name: "Acropolis", style: "open", thumbnailUrl: acropolisThumbnail },
  { id: "gold-rush", name: "Gold Rush", style: "open", thumbnailUrl: goldRushThumbnail },
  { id: "nomad", name: "Nomad", style: "nomad", thumbnailUrl: nomadThumbnail },
  { id: "megarandom", name: "MegaRandom", style: "hybrid", thumbnailUrl: megaRandomThumbnail }
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
  teamRating: 1378,
  teamPeakRating: 1442,
  legacy1v1Wins: 284,
  legacy1v1Losses: 241,
  legacyTeamWins: 149,
  legacyTeamLosses: 130,
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
    teamRating: index === 17 ? currentUser.teamRating : rating - 75,
    teamPeakRating: index === 17 ? currentUser.teamPeakRating : rating - 20,
    legacy1v1Wins: wins,
    legacy1v1Losses: losses,
    legacyTeamWins: Math.max(0, wins - 120),
    legacyTeamLosses: Math.max(0, losses - 80),
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
