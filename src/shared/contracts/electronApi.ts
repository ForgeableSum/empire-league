import type {
  CreateLobbyRequest,
  CreateLobbyResult,
  GameFocusResult,
  GameInputKey,
  GameInputResult,
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
  sendAoe2Key(key: GameInputKey): Promise<GameInputResult>;
  runAoe2CreateLobbySequence(): Promise<GameInputResult>;
  testAoe2HostGameMouseClick(): Promise<GameInputResult>;
  calibrateAoe2HostGameMouseClick(): Promise<GameInputResult>;
  testAoe2FakeActivationMouseClick(): Promise<GameInputResult>;
  onAoe2AutomationLog(listener: (message: string) => void): () => void;
  createRanked1v1Lobby(request: CreateLobbyRequest): Promise<CreateLobbyResult>;
  openAoe2Lobby(lobbyId: string): Promise<OpenLobbyResult>;
  toggleTestOverlay(): Promise<{ visible: boolean }>;
  closeTestOverlay(): Promise<{ visible: false }>;
}
