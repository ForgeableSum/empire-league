import type {
  CreateLobbyRequest,
  CreateLobbyResult,
  GameFocusResult,
  GameCloseResult,
  GameInputKey,
  GameInputResult,
  GameInputTestResult,
  GameInstallationStatus,
  GameLaunchResult,
  LobbyMouseTarget,
  GameProcessStatus,
  OpenLobbyResult
} from "./gameIntegration.js";

export interface ElectronGameApi {
  detectAoe2Installation(): Promise<GameInstallationStatus>;
  detectAoe2Process(): Promise<GameProcessStatus>;
  closeAoe2(force: boolean): Promise<GameCloseResult>;
  launchAoe2(): Promise<GameLaunchResult>;
  focusAoe2(): Promise<GameFocusResult>;
  showAoe2FullscreenAfterDelay(): Promise<GameFocusResult>;
  startAoe2TabTest(): Promise<GameInputTestResult>;
  stopAoe2TabTest(): Promise<void>;
  sendAoe2Key(key: GameInputKey): Promise<GameInputResult>;
  clickAoe2LobbyControl(target: LobbyMouseTarget): Promise<GameInputResult>;
  runAoe2CreateLobbySequence(): Promise<GameInputResult>;
  testAoe2HostGameMouseClick(): Promise<GameInputResult>;
  calibrateAoe2HostGameMouseClick(): Promise<GameInputResult>;
  testAoe2FakeActivationMouseClick(): Promise<GameInputResult>;
  onAoe2AutomationLog(listener: (message: string) => void): () => void;
  createRanked1v1Lobby(request: CreateLobbyRequest): Promise<CreateLobbyResult>;
  openAoe2Lobby(lobbyId: string): Promise<OpenLobbyResult>;
  toggleTestOverlay(): Promise<{ visible: boolean }>;
  closeTestOverlay(): Promise<{ visible: false }>;
  openSteamLogin(url: string): Promise<void>;
  loadAuthToken(): Promise<string | null>;
  storeAuthToken(token: string): Promise<void>;
  clearAuthToken(): Promise<void>;
  quitApp(): Promise<void>;
  restartApp(): Promise<void>;
}
