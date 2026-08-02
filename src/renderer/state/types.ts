import type { GameStatus } from "../../shared/contracts/gameIntegration";
import type { MatchSummary } from "../../shared/contracts/matches";
import type { PlayerProfile } from "../../shared/contracts/players";
import type { MatchSession, QueueDefinition, QueueStatus } from "../../shared/contracts/matchmaking";

export interface AppError {
  code: string;
  message: string;
  technicalDetails?: string;
  retryable: boolean;
  notificationId?: string;
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
  tone: "info" | "success" | "warning" | "danger" | "loading";
  message: string;
  detail?: string;
  durationMs: number | null;
  dismissible?: boolean;
}

export interface UserSettings {
  launchAoe2OnStartup: boolean;
  matchNotifications: boolean;
  autoRejectFamilySharing: boolean;
  maximumLowerOpponentRatingGap: number;
}

export interface AppState {
  currentUser: PlayerProfile;
  queueStatus: QueueStatus;
  selectedQueue: QueueDefinition | null;
  queueStartedAt: string | null;
  roomSetupStartedAt: string | null;
  roomSetupEstimateMs: number | null;
  roomSetupMilestone: string | null;
  transitionInputLocked: boolean;
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
