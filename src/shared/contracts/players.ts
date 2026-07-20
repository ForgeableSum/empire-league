import type { Division, MatchOutcome } from "./matchmaking.js";

export interface PlayerProfile {
  id: string;
  aoeProfileId: number;
  displayName: string;
  avatarUrl?: string;
  countryCode?: string;
  rating: number;
  peakRating: number;
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
