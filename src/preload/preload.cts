import { contextBridge, ipcRenderer } from "electron";
import type { ElectronGameApi } from "../shared/contracts/electronApi.js";

const electronApi: ElectronGameApi = {
  detectAoe2Installation: () => ipcRenderer.invoke("game:detect-installation"),
  detectAoe2Process: () => ipcRenderer.invoke("game:detect-process"),
  closeAoe2: (force) => ipcRenderer.invoke("game:close", force),
  launchAoe2: () => ipcRenderer.invoke("game:launch"),
  focusAoe2: () => ipcRenderer.invoke("game:focus"),
  showAoe2LobbyDebug: () => ipcRenderer.invoke("game:show-lobby-debug"),
  showAoe2FullscreenAfterDelay: () => ipcRenderer.invoke("game:show-fullscreen-after-delay"),
  startAoe2TabTest: () => ipcRenderer.invoke("game:start-tab-test"),
  stopAoe2TabTest: () => ipcRenderer.invoke("game:stop-tab-test"),
  sendAoe2Key: (key) => ipcRenderer.invoke("game:send-background-key", key),
  runAoe2CreateLobbySequence: () => ipcRenderer.invoke("game:run-create-lobby-sequence"),
  testAoe2HostGameMouseClick: () => ipcRenderer.invoke("game:test-host-game-mouse-click"),
  calibrateAoe2HostGameMouseClick: () => ipcRenderer.invoke("game:calibrate-host-game-mouse-click"),
  testAoe2FakeActivationMouseClick: () => ipcRenderer.invoke("game:test-fake-activation-mouse-click"),
  onAoe2AutomationLog: (listener) => {
    const handler = (_event: Electron.IpcRendererEvent, message: string) => listener(message);
    ipcRenderer.on("game:automation-log", handler);
    return () => ipcRenderer.removeListener("game:automation-log", handler);
  },
  createRanked1v1Lobby: (request) => ipcRenderer.invoke("game:create-ranked-1v1-lobby", request),
  openAoe2Lobby: (lobbyId) => ipcRenderer.invoke("game:open-lobby", lobbyId),
  toggleTestOverlay: () => ipcRenderer.invoke("overlay:toggle"),
  closeTestOverlay: () => ipcRenderer.invoke("overlay:close"),
  openSteamLogin: (url) => ipcRenderer.invoke("auth:open-steam-login", url),
  loadAuthToken: () => ipcRenderer.invoke("auth:load-token"),
  storeAuthToken: (token) => ipcRenderer.invoke("auth:store-token", token),
  clearAuthToken: () => ipcRenderer.invoke("auth:clear-token"),
  quitApp: () => ipcRenderer.invoke("system:quit"),
  restartApp: () => ipcRenderer.invoke("system:restart")
};

contextBridge.exposeInMainWorld("electronApi", electronApi);
