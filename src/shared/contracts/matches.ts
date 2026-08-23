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
  ratingEligible?: boolean;
  tournamentId?: string;
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

export interface MatchSummaryParticipant {
  playerId: string;
  displayName: string;
  rating: number;
  civilization: string;
  teamNumber: number;
  lobbySlot: number;
  /** True for the player whose history was requested. */
  isCurrentPlayer: boolean;
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
  participants?: MatchSummaryParticipant[];
  teamSize?: number;
  ratingChange: number;
  durationMinutes: number;
  timestamp: string;
  verified: boolean;
  verificationStatus?: "pending" | "verified" | "contested" | "no_contest" | "rejected";
  queueType: string;
  /** Path to this client's recorded game. Available only on the machine that played it. */
  replayPath?: string;
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
