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
  Aoe2AutomationPreflightResult,
  MouseTestPointerInfo,
  OpenLobbyResult
} from "./gameIntegration.js";
import type { Aoe2CivilizationSelection } from "../aoe2UiManifest.js";
import type { DisableUiModsResult, EnabledUiModsResult, LocalCustomContentCatalog } from "./customLobby.js";
import type { Aoe2Localization } from "./localization.js";

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

export interface LoginItemSettings {
  supported: boolean;
  openAtLogin: boolean;
}

export interface PendingAppUpdate {
  version: string;
  status: "available" | "downloading" | "downloaded" | "error";
  percent?: number;
}

export interface ObsIntegrationStatus {
  state: "unavailable" | "auth_required" | "connected" | "configured" | "error";
  message: string;
  obsVersion?: string;
  websocketVersion?: string;
  sceneConfigured?: boolean;
}

export interface ObsSetupResult {
  ok: boolean;
  message: string;
  obsVersion?: string;
  websocketVersion?: string;
}

export interface ObsOutputStatus {
  connected: boolean;
  captureReady: boolean;
  streaming: boolean;
  recording: boolean;
  streamTimecode?: string;
  recordTimecode?: string;
  outputWidth?: number;
  outputHeight?: number;
  fps?: number;
  message?: string;
}

export interface ElectronGameApi {
  getAoe2Localization(currentSessionOnly?: boolean): Promise<Aoe2Localization>;
  setAoe2LanguageOverride(languageId: number | null): Promise<Aoe2Localization>;
  getObsStatus(password?: string): Promise<ObsIntegrationStatus>;
  setupObs(password?: string): Promise<ObsSetupResult>;
  getObsOutputStatus(): Promise<ObsOutputStatus>;
  setObsStreaming(active: boolean): Promise<ObsOutputStatus>;
  setObsRecording(active: boolean): Promise<ObsOutputStatus>;
  scanLocalCustomContent(): Promise<LocalCustomContentCatalog>;
  detectEnabledUiMods(): Promise<EnabledUiModsResult>;
  disableEnabledUiMods(): Promise<DisableUiModsResult>;
  detectAoe2Installation(): Promise<GameInstallationStatus>;
  detectAoe2Process(): Promise<GameProcessStatus>;
  inspectAoe2AutomationState(phase: "queue-entry" | "host-start"): Promise<Aoe2AutomationPreflightResult>;
  runSteamFamilyProbe(expectedSteamId?: string): Promise<SteamFamilyProbeResult>;
  closeAoe2(force: boolean): Promise<GameCloseResult>;
  launchAoe2(): Promise<GameLaunchResult>;
  focusAoe2(): Promise<GameFocusResult>;
  focusAoe2ForGameplay(matchId: string): Promise<GameFocusResult>;
  beginAoe2MatchAudioSuppression(): Promise<void>;
  setLobbyInputLock(locked: boolean): Promise<{ locked: boolean }>;
  onLobbyGuardPointer(listener: (point: { x: number; y: number; sequence: number }) => void): () => void;
  acknowledgeLobbyGuardPointer(sequence: number): void;
  onLobbyGuardShortcutBlocked(listener: () => void): () => void;
  startReplayEndDetection(replayFolder?: string): Promise<{ started: boolean; message?: string }>;
  stopReplayEndDetection(): Promise<void>;
  confirmReplayEnded(): Promise<void>;
  testReturnToMenuRecovery(): Promise<{ started: boolean; message?: string }>;
  startLoadingScreenWatch(): Promise<{ started: boolean; message?: string }>;
  onLoadingScreen(listener: () => void): () => void;
  onReplayStarted(listener: (filePath: string) => void): () => void;
  onReplayEnded(listener: (filePath: string) => void): () => void;
  onAoe2ProcessExited(listener: () => void): () => void;
  onReplayDetectionFailed(listener: (message: string) => void): () => void;
  readReplayFile(filePath: string): Promise<Uint8Array>;
  revealReplayFile(filePath: string): Promise<void>;
  showAoe2FullscreenAfterDelay(): Promise<GameFocusResult>;
  startAoe2TabTest(): Promise<GameInputTestResult>;
  stopAoe2TabTest(): Promise<void>;
  sendAoe2Key(key: GameInputKey): Promise<GameInputResult>;
  runAoe2CreateLobbySequence(mapName: string, playerCount?: number, contentKind?: "map" | "scenario", context?: "ranked" | "tournament" | "custom" | { context: "custom"; gameSettings: import("./customLobby.js").CustomLobbyGameSettings }, gameSettings?: import("./customLobby.js").CustomLobbyGameSettings): Promise<GameInputResult>;
  runAoe2LobbyCursorAction(target: "content-confirm" | "guest-ready" | "host-ready" | "start", context?: "ranked" | "custom"): Promise<GameInputResult>;
  selectAoe2Civilization(selection: Aoe2CivilizationSelection, slot: number, context?: "ranked" | "custom"): Promise<GameInputResult>;
  selectAoe2Team(team: 1 | 2, slot: number, context?: "ranked" | "custom"): Promise<GameInputResult>;
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
  openAoe2Lobby(lobbyId: string, allowCustomContentPrompt?: boolean): Promise<OpenLobbyResult>;
  openAoe2Spectator(spectatorUri: string): Promise<import("./gameIntegration.js").OpenSpectatorResult>;
  openSteamLogin(url: string): Promise<void>;
  completeSteamLogin(): Promise<void>;
  loadAuthToken(): Promise<string | null>;
  storeAuthToken(token: string): Promise<void>;
  clearAuthToken(): Promise<void>;
  alertMatchFound(showNotification: boolean): Promise<void>;
  alertTournamentReady(tournamentId: string, tournamentName: string): Promise<void>;
  onTournamentNotificationClicked(listener: (tournamentId: string) => void): () => void;
  isAppFocused(): Promise<boolean>;
  stopMatchFoundAlert(): Promise<void>;
  alertUnreadMessage(): Promise<void>;
  clearUnreadMessageAlert(): Promise<void>;
  getLoginItemSettings(): Promise<LoginItemSettings>;
  getAppVersion(): Promise<string>;
  getPreferredSystemLanguages(): Promise<string[]>;
  openExternalUrl(url: string): Promise<void>;
  getPendingUpdate(): Promise<PendingAppUpdate | null>;
  installPendingUpdate(): Promise<boolean>;
  retryPendingUpdate(): Promise<boolean>;
  setUpdateChecksPaused(paused: boolean): Promise<void>;
  onUpdateDetected(listener: (update: PendingAppUpdate) => void): () => void;
  onUpdateReady(listener: (update: PendingAppUpdate) => void): () => void;
  setLoginItemOpenAtLogin(openAtLogin: boolean): Promise<LoginItemSettings>;
  minimizeToTaskbar(): Promise<void>;
  quitApp(): Promise<void>;
  restartApp(): Promise<void>;
}
