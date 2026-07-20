import type { MatchOutcome } from "./matchmaking.js";

export interface MatchResult {
  winnerProfileId: number;
  loserProfileId: number;
  outcome: MatchOutcome;
  reason: "resignation" | "defeat" | "disconnect" | "unknown";
  oldRating: number;
  newRating: number;
  ratingChange: number;
  verified: boolean;
  verificationSource: "mock" | "worlds_edge" | "replay" | "manual_review";
}

export interface MatchSummary {
  id: string;
  opponent: string;
  opponentRating: number;
  outcome: MatchOutcome;
  map: string;
  civilization: string;
  opponentCivilization: string;
  ratingChange: number;
  durationMinutes: number;
  timestamp: string;
  verified: boolean;
  queueType: string;
}

export interface MatchTrackingStatus {
  matchId: string;
  stage:
    | "in_game"
    | "game_finished"
    | "waiting_for_data"
    | "result_located"
    | "players_verified"
    | "winner_verified"
    | "rating_updated"
    | "failed";
  message: string;
}

export interface ReplayUploadResult {
  uploaded: boolean;
  replayId?: string;
}
