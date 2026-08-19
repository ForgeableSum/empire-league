import type { LobbySession, LobbyVerification, MapDefinition } from "./matchmaking.js";

export type GameStatus = "not_detected" | "installed" | "loading" | "running" | "in_lobby" | "in_match";

export interface GameInstallationStatus {
  installed: boolean;
  path?: string;
  message?: string;
}

export interface GameProcessStatus {
  running: boolean;
  pid?: number;
  windowReady?: boolean;
  owned: boolean;
}

export type Aoe2AutomationScreenState =
  | "main-menu"
  | "main-menu-news"
  | "multiplayer-menu"
  | "create-lobby-dialog"
  | "lobby-room"
  | "content-picker"
  | "loading-screen"
  | "unknown";

export interface Aoe2AutomationPreflightResult extends GameProcessStatus {
  phase: "queue-entry" | "host-start";
  captureReady: boolean;
  state: Aoe2AutomationScreenState;
  detail: string;
}

export interface GameCloseResult {
  closed: boolean;
  running: boolean;
  message?: string;
}

export interface GameLaunchResult {
  launched: boolean;
  status: GameStatus;
  message?: string;
}

export interface GameFocusResult {
  focused: boolean;
}

export interface GameInputTestResult {
  started: boolean;
  message: string;
}

export type GameInputKey = "TAB" | "ENTER";

export interface GameInputResult {
  sent: boolean;
  message: string;
  lobbyUri?: string;
  usedRandomCivilizationFallback?: boolean;
}

export interface MouseTestPointerInfo {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  designX: number;
  designY: number;
  clientWidth: number;
  clientHeight: number;
  inside: boolean;
}

export interface CreateLobbyRequest {
  matchId: string;
  hostProfileId: number;
  guestProfileId: number;
  map: MapDefinition;
  playerCount: 2 | 4 | 8;
}

export interface CreateLobbyResult {
  lobby: LobbySession;
}

export interface DiscoverLobbyRequest {
  matchId: string;
  lobbyName: string;
}

export interface DiscoverLobbyResult {
  lobbyId: string;
}

export interface OpenLobbyResult {
  opened: boolean;
}

export interface OpenSpectatorResult {
  opened: boolean;
  captureAgeLaunched: boolean;
  message?: string;
}

export interface LobbyVerificationResult {
  verification: LobbyVerification;
}

export interface GameStartResult {
  started: boolean;
  startedAt: string;
}

export interface GameEndResult {
  ended: boolean;
  endedAt: string;
}

export interface GameIntegrationService {
  detectInstallation(): Promise<GameInstallationStatus>;
  detectRunningGame(): Promise<GameProcessStatus>;
  launchGame(): Promise<GameLaunchResult>;
  focusGame(): Promise<GameFocusResult>;
  createLobby(config: CreateLobbyRequest): Promise<CreateLobbyResult>;
  discoverLobby(request: DiscoverLobbyRequest): Promise<DiscoverLobbyResult>;
  openLobby(lobbyId: string): Promise<OpenLobbyResult>;
  verifyLobby(lobbyId: string): Promise<LobbyVerificationResult>;
  waitForGameStart(lobbyId: string): Promise<GameStartResult>;
  detectGameEnd(matchId: string): Promise<GameEndResult>;
}
