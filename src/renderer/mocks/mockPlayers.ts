import { getDivisionForRating, type MapDefinition, type MapGroupDefinition } from "../../shared/contracts/matchmaking";
import { enabledMapCatalogEntries, mapCatalog } from "../../shared/mapCatalog";
import type { PlayerProfile } from "../../shared/contracts/players";
import acropolisThumbnail from "../assets/maps/acropolis.png";
import africanClearingThumbnail from "../assets/maps/african-clearing.png";
import arabiaThumbnail from "../assets/maps/arabia.png";
import arenaThumbnail from "../assets/maps/arena.png";
import atacamaThumbnail from "../assets/maps/atacama.png";
import balticThumbnail from "../assets/maps/baltic.png";
import blackForestThumbnail from "../assets/maps/black-forest.png";
import fortifiedClearingThumbnail from "../assets/maps/fortified-clearing.png";
import fourLakesThumbnail from "../assets/maps/four-lakes.png";
import goldenSwampThumbnail from "../assets/maps/golden-swamp.png";
import goldRushThumbnail from "../assets/maps/gold-rush.png";
import hideoutThumbnail from "../assets/maps/hideout.png";
import islandsThumbnail from "../assets/maps/islands.png";
import landMadnessThumbnail from "../assets/maps/land-madness.png";
import landNomadThumbnail from "../assets/maps/land-nomad.png";
import mediterraneanThumbnail from "../assets/maps/mediterranean.png";
import michiThumbnail from "../assets/maps/michi.png";
import officialLeaderboard from "./data/officialLeaderboardPreview.json";

export interface RenderedMapGroupDefinition extends MapGroupDefinition {
  maps: MapDefinition[];
}

const thumbnailByAsset: Record<string, string> = {
  "arabia.png": arabiaThumbnail,
  "land-madness.png": landMadnessThumbnail,
  "acropolis.png": acropolisThumbnail,
  "african-clearing.png": africanClearingThumbnail,
  "atacama.png": atacamaThumbnail,
  "gold-rush.png": goldRushThumbnail,
  "land-nomad.png": landNomadThumbnail,
  "arena.png": arenaThumbnail,
  "fortified-clearing.png": fortifiedClearingThumbnail,
  "hideout.png": hideoutThumbnail,
  "black-forest.png": blackForestThumbnail,
  "michi.png": michiThumbnail,
  "four-lakes.png": fourLakesThumbnail,
  "baltic.png": balticThumbnail,
  "islands.png": islandsThumbnail,
  "mediterranean.png": mediterraneanThumbnail,
  "golden-swamp.png": goldenSwampThumbnail
};

export const maps: MapDefinition[] = enabledMapCatalogEntries.map((map) => ({
  id: map.id,
  name: map.name,
  style: map.style,
  thumbnailUrl: thumbnailByAsset[map.imageAsset]
}));

export const mapGroups: RenderedMapGroupDefinition[] = mapCatalog.groups.map((group) => ({
  ...group,
  maps: maps.filter((map) => mapCatalog.maps.find((entry) => entry.id === map.id)?.groupId === group.id)
}));

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

export const leaderboardPlayers: PlayerProfile[] = officialLeaderboard.players.map((official) => {
  const wins = official.wins;
  const losses = official.losses;
  return {
    id: `aoe-${official.profileId}`,
    aoeProfileId: official.profileId,
    steamId: official.steamId || undefined,
    displayName: official.name || `Player ${official.profileId}`,
    countryCode: official.countryCode || undefined,
    rating: official.rating,
    peakRating: official.rating,
    // The harvested file is leaderboard 3 (solo RM); do not invent team statistics.
    teamRating: 0,
    teamPeakRating: 0,
    legacy1v1Wins: wins,
    legacy1v1Losses: losses,
    legacyTeamWins: 0,
    legacyTeamLosses: 0,
    rank: official.rank,
    division: getDivisionForRating(official.rating),
    wins,
    losses,
    winRate: Number(((wins / (wins + losses)) * 100).toFixed(1)),
    streak: official.streak,
    preferredMaps: [],
    favoriteCivilizations: [],
    recentForm: []
  };
});

export const matchmakingOpponents = leaderboardPlayers
  .filter((player) => player.id !== currentUser.id)
  .slice(10, 18);
