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
  GameProcessStatus,
  MouseTestPointerInfo,
  OpenLobbyResult
} from "./gameIntegration.js";
import type { Aoe2CivilizationSelection } from "../aoe2UiManifest.js";

export interface SteamFamilyProbeResult {
  status: "owned" | "family_shared" | "unknown";
  currentSteamId?: string;
  ownerSteamId?: string;
  familySharedFlag?: boolean;
  identityMatchesLogin?: boolean;
  exitCode: number | null;
  logPath: string;
  events: Array<{
    at: string;
    level: "info" | "warn" | "error";
    event: string;
    data?: Record<string, unknown>;
  }>;
  message: string;
}

export interface ElectronGameApi {
  detectAoe2Installation(): Promise<GameInstallationStatus>;
  detectAoe2Process(): Promise<GameProcessStatus>;
  runSteamFamilyProbe(expectedSteamId?: string): Promise<SteamFamilyProbeResult>;
  closeAoe2(force: boolean): Promise<GameCloseResult>;
  launchAoe2(): Promise<GameLaunchResult>;
  focusAoe2(): Promise<GameFocusResult>;
  setLobbyInputLock(locked: boolean): Promise<{ locked: boolean }>;
  onLobbyGuardPointer(listener: (point: { x: number; y: number }) => void): () => void;
  startReplayEndDetection(replayFolder?: string): Promise<{ started: boolean; message?: string }>;
  stopReplayEndDetection(): Promise<void>;
  confirmReplayEnded(): Promise<void>;
  testReturnToMenuRecovery(): Promise<{ started: boolean; message?: string }>;
  onReplayEnded(listener: (filePath: string) => void): () => void;
  onReplayDetectionFailed(listener: (message: string) => void): () => void;
  readReplayFile(filePath: string): Promise<Uint8Array>;
  showAoe2FullscreenAfterDelay(): Promise<GameFocusResult>;
  startAoe2TabTest(): Promise<GameInputTestResult>;
  stopAoe2TabTest(): Promise<void>;
  sendAoe2Key(key: GameInputKey): Promise<GameInputResult>;
  runAoe2CreateLobbySequence(mapName: string, playerCount?: 2 | 4 | 8): Promise<GameInputResult>;
  runAoe2LobbyCursorAction(target: "content-confirm" | "guest-ready" | "host-ready" | "start"): Promise<GameInputResult>;
  selectAoe2Civilization(selection: Aoe2CivilizationSelection, slot: number): Promise<GameInputResult>;
  selectAoe2Team(team: 1 | 2, slot: number): Promise<GameInputResult>;
  testAoe2HostGameMouseClick(): Promise<GameInputResult>;
  calibrateAoe2HostGameMouseClick(): Promise<GameInputResult>;
  testAoe2FakeActivationMouseClick(): Promise<GameInputResult>;
  startAoe2MouseTestMode(): Promise<GameFocusResult>;
  stopAoe2MouseTestMode(): Promise<void>;
  onMouseTestPointer(listener: (pointer: MouseTestPointerInfo) => void): () => void;
  onMouseTestCoordinatesCopied(listener: (coordinates: string) => void): () => void;
  onMouseTestModeChanged(listener: (active: boolean) => void): () => void;
  onAoe2AutomationLog(listener: (message: string) => void): () => void;
  createRanked1v1Lobby(request: CreateLobbyRequest): Promise<CreateLobbyResult>;
  openAoe2Lobby(lobbyId: string): Promise<OpenLobbyResult>;
  openSteamLogin(url: string): Promise<void>;
  loadAuthToken(): Promise<string | null>;
  storeAuthToken(token: string): Promise<void>;
  clearAuthToken(): Promise<void>;
  alertMatchFound(): Promise<void>;
  stopMatchFoundAlert(): Promise<void>;
  minimizeToTaskbar(): Promise<void>;
  quitApp(): Promise<void>;
  restartApp(): Promise<void>;
}
