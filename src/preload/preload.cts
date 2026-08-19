import { contextBridge, ipcRenderer } from "electron";
import type { ElectronGameApi } from "../shared/contracts/electronApi.js";

const electronApi: ElectronGameApi = {
  getAoe2Localization: (currentSessionOnly) => ipcRenderer.invoke("game:get-localization", currentSessionOnly),
  setAoe2LanguageOverride: (languageId) => ipcRenderer.invoke("game:set-language-override", languageId),
  getObsStatus: (password) => ipcRenderer.invoke("obs:get-status", password),
  setupObs: (password) => ipcRenderer.invoke("obs:setup", password),
  getObsOutputStatus: () => ipcRenderer.invoke("obs:get-output-status"),
  setObsStreaming: (active) => ipcRenderer.invoke("obs:set-streaming", active),
  setObsRecording: (active) => ipcRenderer.invoke("obs:set-recording", active),
  scanLocalCustomContent: () => ipcRenderer.invoke("game:scan-local-custom-content"),
  detectEnabledUiMods: () => ipcRenderer.invoke("game:detect-enabled-ui-mods"),
  disableEnabledUiMods: () => ipcRenderer.invoke("game:disable-enabled-ui-mods"),
  detectAoe2Installation: () => ipcRenderer.invoke("game:detect-installation"),
  detectAoe2Process: () => ipcRenderer.invoke("game:detect-process"),
  inspectAoe2AutomationState: (phase) => ipcRenderer.invoke("game:inspect-automation-state", phase),
  runSteamFamilyProbe: (expectedSteamId) => ipcRenderer.invoke("game:probe-steam-family", expectedSteamId),
  closeAoe2: (force) => ipcRenderer.invoke("game:close", force),
  launchAoe2: () => ipcRenderer.invoke("game:launch"),
  focusAoe2: () => ipcRenderer.invoke("game:focus"),
  focusAoe2ForGameplay: (matchId) => ipcRenderer.invoke("game:focus-for-gameplay", matchId),
  beginAoe2MatchAudioSuppression: () => ipcRenderer.invoke("game:begin-match-audio-suppression"),
  setLobbyInputLock: (locked) => ipcRenderer.invoke("game:set-lobby-input-lock", locked),
  onLobbyGuardPointer: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, point: { x: number; y: number; sequence: number }) => listener(point);
    ipcRenderer.on("game:lobby-guard-pointer", handler);
    return () => ipcRenderer.removeListener("game:lobby-guard-pointer", handler);
  },
  acknowledgeLobbyGuardPointer: (sequence) => ipcRenderer.send("game:lobby-guard-pointer-ack", sequence),
  onLobbyGuardShortcutBlocked: (listener) => {
    const handler = () => listener();
    ipcRenderer.on("game:lobby-guard-shortcut-blocked", handler);
    return () => ipcRenderer.removeListener("game:lobby-guard-shortcut-blocked", handler);
  },
  startReplayEndDetection: (replayFolder) => ipcRenderer.invoke("game:start-replay-end-detection", replayFolder),
  stopReplayEndDetection: () => ipcRenderer.invoke("game:stop-replay-end-detection"),
  confirmReplayEnded: () => ipcRenderer.invoke("game:confirm-replay-ended"),
  testReturnToMenuRecovery: () => ipcRenderer.invoke("game:test-return-to-menu-recovery"),
  startLoadingScreenWatch: () => ipcRenderer.invoke("game:start-loading-screen-watch"),
  onLoadingScreen: (listener) => {
    const handler = () => listener();
    ipcRenderer.on("game:loading-screen", handler);
    return () => ipcRenderer.removeListener("game:loading-screen", handler);
  },
  onReplayStarted: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, filePath: string) => listener(filePath);
    ipcRenderer.on("game:replay-started", handler);
    return () => ipcRenderer.removeListener("game:replay-started", handler);
  },
  onReplayEnded: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, filePath: string) => listener(filePath);
    ipcRenderer.on("game:replay-ended", handler);
    return () => ipcRenderer.removeListener("game:replay-ended", handler);
  },
  onAoe2ProcessExited: (listener) => {
    const handler = () => listener();
    ipcRenderer.on("game:process-exited", handler);
    return () => ipcRenderer.removeListener("game:process-exited", handler);
  },
  onReplayDetectionFailed: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, message: string) => listener(message);
    ipcRenderer.on("game:replay-detection-failed", handler);
    return () => ipcRenderer.removeListener("game:replay-detection-failed", handler);
  },
  readReplayFile: (filePath) => ipcRenderer.invoke("game:read-replay-file", filePath),
  revealReplayFile: (filePath) => ipcRenderer.invoke("game:reveal-replay-file", filePath),
  showAoe2FullscreenAfterDelay: () => ipcRenderer.invoke("game:show-fullscreen-after-delay"),
  startAoe2TabTest: () => ipcRenderer.invoke("game:start-tab-test"),
  stopAoe2TabTest: () => ipcRenderer.invoke("game:stop-tab-test"),
  sendAoe2Key: (key) => ipcRenderer.invoke("game:send-background-key", key),
  runAoe2CreateLobbySequence: (mapName, playerCount, contentKind, context, gameSettings) =>
    ipcRenderer.invoke("game:run-create-lobby-sequence", mapName, playerCount, contentKind, context, gameSettings),
  runAoe2LobbyCursorAction: (target, context) => ipcRenderer.invoke("game:run-lobby-cursor-action", target, context),
  selectAoe2Civilization: (civilization, slot, context) => ipcRenderer.invoke("game:select-civilization", civilization, slot, context),
  selectAoe2Team: (team, slot, context) => ipcRenderer.invoke("game:select-team", team, slot, context),
  testAoe2HostGameMouseClick: () => ipcRenderer.invoke("game:test-host-game-mouse-click"),
  calibrateAoe2HostGameMouseClick: () => ipcRenderer.invoke("game:calibrate-host-game-mouse-click"),
  testAoe2FakeActivationMouseClick: () => ipcRenderer.invoke("game:test-fake-activation-mouse-click"),
  startAoe2MouseTestMode: () => ipcRenderer.invoke("game:start-mouse-test-mode"),
  stopAoe2MouseTestMode: () => ipcRenderer.invoke("game:stop-mouse-test-mode"),
  onMouseTestPointer: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, pointer: Parameters<typeof listener>[0]) => listener(pointer);
    ipcRenderer.on("overlay:mouse-pointer", handler);
    return () => ipcRenderer.removeListener("overlay:mouse-pointer", handler);
  },
  onMouseTestCoordinatesCopied: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, coordinates: string) => listener(coordinates);
    ipcRenderer.on("overlay:coordinates-copied", handler);
    return () => ipcRenderer.removeListener("overlay:coordinates-copied", handler);
  },
  onMouseTestModeChanged: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, active: boolean) => listener(active);
    ipcRenderer.on("overlay:mouse-test-active", handler);
    return () => ipcRenderer.removeListener("overlay:mouse-test-active", handler);
  },
  onAoe2AutomationLog: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, message: string) => listener(message);
    ipcRenderer.on("game:automation-log", handler);
    return () => ipcRenderer.removeListener("game:automation-log", handler);
  },
  createRanked1v1Lobby: (request) => ipcRenderer.invoke("game:create-ranked-1v1-lobby", request),
  openAoe2Lobby: (lobbyId, allowCustomContentPrompt) => ipcRenderer.invoke(
    "game:open-lobby",
    lobbyId,
    allowCustomContentPrompt
  ),
  openAoe2Spectator: (spectatorUri) => ipcRenderer.invoke("game:open-spectator", spectatorUri),
  openSteamLogin: (url) => ipcRenderer.invoke("auth:open-steam-login", url),
  completeSteamLogin: () => ipcRenderer.invoke("auth:complete-steam-login"),
  loadAuthToken: () => ipcRenderer.invoke("auth:load-token"),
  storeAuthToken: (token) => ipcRenderer.invoke("auth:store-token", token),
  clearAuthToken: () => ipcRenderer.invoke("auth:clear-token"),
  alertMatchFound: (showNotification) => ipcRenderer.invoke("system:alert-match-found", showNotification),
  alertTournamentReady: (tournamentName) => ipcRenderer.invoke("system:alert-tournament-ready", tournamentName),
  onTournamentNotificationClicked: (listener) => {
    const handler = () => listener();
    ipcRenderer.on("system:tournament-notification-clicked", handler);
    return () => ipcRenderer.removeListener("system:tournament-notification-clicked", handler);
  },
  isAppFocused: () => ipcRenderer.invoke("system:is-app-focused"),
  stopMatchFoundAlert: () => ipcRenderer.invoke("system:stop-match-found-alert"),
  alertUnreadMessage: () => ipcRenderer.invoke("system:alert-unread-message"),
  clearUnreadMessageAlert: () => ipcRenderer.invoke("system:clear-unread-message-alert"),
  getLoginItemSettings: () => ipcRenderer.invoke("system:get-login-item-settings"),
  getAppVersion: () => ipcRenderer.invoke("system:get-app-version"),
  getPreferredSystemLanguages: () => ipcRenderer.invoke("system:get-preferred-languages"),
  openExternalUrl: (url) => ipcRenderer.invoke("system:open-external-url", url),
  getPendingUpdate: () => ipcRenderer.invoke("system:get-pending-update"),
  installPendingUpdate: () => ipcRenderer.invoke("system:install-pending-update"),
  retryPendingUpdate: () => ipcRenderer.invoke("system:retry-pending-update"),
  setUpdateChecksPaused: (paused) => ipcRenderer.invoke("system:set-update-checks-paused", paused),
  onUpdateDetected: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, update: Parameters<typeof listener>[0]) => listener(update);
    ipcRenderer.on("system:update-detected", handler);
    return () => ipcRenderer.removeListener("system:update-detected", handler);
  },
  onUpdateReady: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, update: Parameters<typeof listener>[0]) => listener(update);
    ipcRenderer.on("system:update-ready", handler);
    return () => ipcRenderer.removeListener("system:update-ready", handler);
  },
  setLoginItemOpenAtLogin: (openAtLogin) => ipcRenderer.invoke("system:set-login-item-open-at-login", openAtLogin),
  minimizeToTaskbar: () => ipcRenderer.invoke("system:minimize-to-taskbar"),
  quitApp: () => ipcRenderer.invoke("system:quit"),
  restartApp: () => ipcRenderer.invoke("system:restart")
};

contextBridge.exposeInMainWorld("electronApi", electronApi);
