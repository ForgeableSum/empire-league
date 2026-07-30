import type { MatchOutcome } from "./matchmaking.js";

export interface MatchResult {
  ratingPool: "solo" | "team";
  winnerProfileId: number;
  loserProfileId: number;
  outcome: MatchOutcome;
  reason: "resignation" | "defeat" | "disconnect" | "unknown";
  oldRating: number;
  newRating: number;
  ratingChange: number;
  verified: boolean;
  verificationSource: "mock" | "worlds_edge" | "replay" | "manual_review";
  verificationStatus?: "verified" | "contested";
}

export interface ReplayPlayerMetadata {
  profileId: number;
  playerNumber: number;
  civilizationId: number;
  resigned: boolean;
}

export interface ReplayGameSettings {
  cheats: boolean;
  replayCheatsEnabled: boolean;
  instantBuild: boolean;
  playerCount: number;
  populationLimit: number;
  recordGame: boolean;
  gameType: number;
  replayGameMode: number;
  gameSpeedId: number;
  gameSpeed: number;
  startingAgeId: number;
  startingResourcesId: number;
  endingAgeId: number;
  victoryTypeId: number;
  victoryAmount: number;
  revealMap: number;
  lockTeams: boolean;
  allTechs: boolean;
  handicap: boolean;
  sharedExploration: boolean;
  teamBonusDisabled: boolean;
  treatyLength: number;
  selectedMapId: number;
  resolvedMapId: number;
  rmsStrings: string[];
}

export interface ReplayMatchMetadata {
  fileSizeBytes: number;
  build: number;
  recordedAt: number;
  durationMs: number;
  players: ReplayPlayerMetadata[];
  settings: ReplayGameSettings;
  reporterProfileId: number;
  winnerProfileId: number;
  loserProfileId: number;
  winningProfileIds: number[];
  losingProfileIds: number[];
  reason: "resignation" | "defeat" | "disconnect" | "unknown";
}

export interface MatchSummary {
  id: string;
  opponentId: string;
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
