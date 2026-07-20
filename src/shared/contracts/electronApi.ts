import type {
  CreateLobbyRequest,
  CreateLobbyResult,
  GameFocusResult,
  GameInputTestResult,
  GameInstallationStatus,
  GameLaunchResult,
  GameProcessStatus,
  OpenLobbyResult
} from "./gameIntegration.js";

export interface ElectronGameApi {
  detectAoe2Installation(): Promise<GameInstallationStatus>;
  detectAoe2Process(): Promise<GameProcessStatus>;
  launchAoe2(): Promise<GameLaunchResult>;
  focusAoe2(): Promise<GameFocusResult>;
  startAoe2TabTest(): Promise<GameInputTestResult>;
  stopAoe2TabTest(): Promise<void>;
  onAoe2AutomationLog(listener: (message: string) => void): () => void;
  createRanked1v1Lobby(request: CreateLobbyRequest): Promise<CreateLobbyResult>;
  openAoe2Lobby(lobbyId: string): Promise<OpenLobbyResult>;
}
