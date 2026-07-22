import type { LobbySession, LobbyVerification, MapDefinition } from "./matchmaking.js";

export type GameStatus = "not_detected" | "installed" | "running" | "in_lobby" | "in_match";

export interface GameInstallationStatus {
  installed: boolean;
  path?: string;
  message?: string;
}

export interface GameProcessStatus {
  running: boolean;
  pid?: number;
  windowReady?: boolean;
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
}

export interface CreateLobbyRequest {
  matchId: string;
  hostProfileId: number;
  guestProfileId: number;
  map: MapDefinition;
  serverRegion: string;
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
