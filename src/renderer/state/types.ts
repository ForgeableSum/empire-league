import type { GameStatus } from "../../shared/contracts/gameIntegration";
import type { MatchSummary } from "../../shared/contracts/matches";
import type { PlayerProfile } from "../../shared/contracts/players";
import type { MatchSession, QueueDefinition, QueueStatus } from "../../shared/contracts/matchmaking";

export interface AppError {
  code: string;
  message: string;
  technicalDetails?: string;
  retryable: boolean;
}

export interface MockServiceConfig {
  queueWaitMs: number;
  opponentAcceptDelayMs: number;
  lobbyCreationDelayMs: number;
  opponentJoinDelayMs: number;
  lobbyVerificationDelayMs: number;
  matchDurationMs: number;
  resultVerificationDelayMs: number;
  forceQueueFailure: boolean;
  forceOpponentDecline: boolean;
  forceGameNotInstalled: boolean;
  forceGameLaunchFailure: boolean;
  forceLobbyCreationFailure: boolean;
  forceLobbyVerificationFailure: boolean;
  forceOpponentJoinTimeout: boolean;
  forceResultVerificationFailure: boolean;
  forcedResult?: "win" | "loss" | "no_contest";
}

export interface NotificationItem {
  id: string;
  tone: "info" | "success" | "warning" | "danger";
  message: string;
  detail?: string;
  durationMs: number;
}

export interface UserSettings {
  aoePath: string;
  autoDetect: boolean;
  autoLaunch: boolean;
  focusWhenReady: boolean;
  displayMode: "Borderless" | "Fullscreen" | "Windowed";
  replayDetection: boolean;
  replayFolder: string;
  serverRegion: string;
  acceptSound: boolean;
  matchNotifications: boolean;
  maxInitialRange: number;
  autoExpandRange: boolean;
  rematchOffers: boolean;
  soundVolume: number;
  reducedMotion: boolean;
  compactLayout: boolean;
  minimizeOnStart: boolean;
  startWithWindows: boolean;
}

export interface AppState {
  currentUser: PlayerProfile;
  queueStatus: QueueStatus;
  selectedQueue: QueueDefinition | null;
  queueStartedAt: string | null;
  activeMatch: MatchSession | null;
  recentMatches: MatchSummary[];
  connectionStatus: "online" | "degraded" | "offline";
  gameStatus: GameStatus;
  searchRange: { min: number; max: number };
  error: AppError | null;
  notifications: NotificationItem[];
  eventLog: string[];
  mockConfig: MockServiceConfig;
  settings: UserSettings;
}
