import { contextBridge, ipcRenderer } from "electron";
import type { ElectronGameApi } from "../shared/contracts/electronApi.js";

const electronApi: ElectronGameApi = {
  detectAoe2Installation: () => ipcRenderer.invoke("game:detect-installation"),
  detectAoe2Process: () => ipcRenderer.invoke("game:detect-process"),
  closeAoe2: (force) => ipcRenderer.invoke("game:close", force),
  launchAoe2: () => ipcRenderer.invoke("game:launch"),
  focusAoe2: () => ipcRenderer.invoke("game:focus"),
  startReplayEndDetection: (replayFolder) => ipcRenderer.invoke("game:start-replay-end-detection", replayFolder),
  stopReplayEndDetection: () => ipcRenderer.invoke("game:stop-replay-end-detection"),
  onReplayEnded: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, filePath: string) => listener(filePath);
    ipcRenderer.on("game:replay-ended", handler);
    return () => ipcRenderer.removeListener("game:replay-ended", handler);
  },
  readReplayFile: (filePath) => ipcRenderer.invoke("game:read-replay-file", filePath),
  showAoe2FullscreenAfterDelay: () => ipcRenderer.invoke("game:show-fullscreen-after-delay"),
  startAoe2TabTest: () => ipcRenderer.invoke("game:start-tab-test"),
  stopAoe2TabTest: () => ipcRenderer.invoke("game:stop-tab-test"),
  sendAoe2Key: (key) => ipcRenderer.invoke("game:send-background-key", key),
  runAoe2CreateLobbySequence: () => ipcRenderer.invoke("game:run-create-lobby-sequence"),
  runAoe2LobbyCursorAction: (target) => ipcRenderer.invoke("game:run-lobby-cursor-action", target),
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
  openAoe2Lobby: (lobbyId) => ipcRenderer.invoke("game:open-lobby", lobbyId),
  openSteamLogin: (url) => ipcRenderer.invoke("auth:open-steam-login", url),
  loadAuthToken: () => ipcRenderer.invoke("auth:load-token"),
  storeAuthToken: (token) => ipcRenderer.invoke("auth:store-token", token),
  clearAuthToken: () => ipcRenderer.invoke("auth:clear-token"),
  alertMatchFound: () => ipcRenderer.invoke("system:alert-match-found"),
  stopMatchFoundAlert: () => ipcRenderer.invoke("system:stop-match-found-alert"),
  minimizeToTaskbar: () => ipcRenderer.invoke("system:minimize-to-taskbar"),
  quitApp: () => ipcRenderer.invoke("system:quit"),
  restartApp: () => ipcRenderer.invoke("system:restart")
};

contextBridge.exposeInMainWorld("electronApi", electronApi);

const setupInputEvents = [
  "pointerdown", "pointerup", "mousedown", "mouseup", "click",
  "dblclick", "contextmenu", "wheel"
] as const;
const blockSetupInput = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
};
ipcRenderer.on("game:setup-input-guard", (_event, active: boolean) => {
  setupInputEvents.forEach((eventName) => {
    if (active) {
      window.addEventListener(eventName, blockSetupInput, { capture: true, passive: false });
    } else {
      window.removeEventListener(eventName, blockSetupInput, { capture: true });
    }
  });
});
