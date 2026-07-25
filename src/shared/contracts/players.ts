import type { Division, MatchOutcome } from "./matchmaking.js";

export interface PlayerProfile {
  id: string;
  aoeProfileId: number;
  steamId?: string;
  displayName: string;
  avatarUrl?: string;
  countryCode?: string;
  rating: number;
  peakRating: number;
  teamRating: number;
  teamPeakRating: number;
  legacy1v1Wins: number;
  legacy1v1Losses: number;
  legacyTeamWins: number;
  legacyTeamLosses: number;
  rank: number;
  division: Division;
  wins: number;
  losses: number;
  winRate: number;
  streak: number;
  preferredMaps: string[];
  favoriteCivilizations: string[];
  recentForm: MatchOutcome[];
}
