import { app, BrowserWindow, clipboard, globalShortcut, screen } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
let pointerTimer: NodeJS.Timeout | undefined;
let mouseTestHudVisible = false;
let mainCoverManuallyVisible = true;
let coveredMainWindow: BrowserWindow | null = null;
let coveredMainWindowState: {
  bounds: Electron.Rectangle;
  alwaysOnTop: boolean;
  focusable: boolean;
  opacity: number;
} | null = null;
let latestPointer: {
  screenX: number; screenY: number; clientX: number; clientY: number;
  designX: number; designY: number; clientWidth: number; clientHeight: number; inside: boolean;
} | undefined;
const copyCoordinatesAccelerator = "CommandOrControl+Shift+C";
const toggleCoverAccelerator = "CommandOrControl+Shift+H";

function appIconPath(): string {
  return app.isPackaged
    ? join(process.resourcesPath, "icon.png")
    : join(app.getAppPath(), "src/renderer/assets/el-2.png");
}

function loadRenderer(window: BrowserWindow, route = ""): void {
  const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  if (isDev) {
    void window.loadURL(`http://127.0.0.1:5173${route}`);
  } else {
    void window.loadFile(join(currentDir, "../renderer/index.html"), route ? { search: route.slice(1) } : undefined);
  }
}

export function createMainWindow(): BrowserWindow {
  const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1050,
    minHeight: 680,
    title: "Empire League",
    icon: appIconPath(),
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#141312",
      symbolColor: "#e8dfca",
      height: 40
    },
    backgroundColor: "#141312",
    webPreferences: {
      preload: join(currentDir, "../preload/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  if (isDev) {
    loadRenderer(mainWindow);
  } else {
    void mainWindow.loadFile(join(currentDir, "../renderer/index.html"));
  }

  return mainWindow;
}

export function showMainWindowAsGameCover(window: BrowserWindow): void {
  if (window.isDestroyed()) return;
  if (coveredMainWindow !== window || !coveredMainWindowState) {
    coveredMainWindow = window;
    coveredMainWindowState = {
      bounds: window.getBounds(),
      alwaysOnTop: window.isAlwaysOnTop(),
      focusable: window.isFocusable(),
      opacity: window.getOpacity()
    };
  }
  const area = screen.getPrimaryDisplay().bounds;
  mainCoverManuallyVisible = true;
  window.setIgnoreMouseEvents(true);
  window.setOpacity(1);
  window.setBounds(area);
  window.setAlwaysOnTop(true, "screen-saver");
  window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  window.showInactive();
  window.webContents.send("overlay:mouse-test-active", true);
  globalShortcut.unregister(toggleCoverAccelerator);
  globalShortcut.register(toggleCoverAccelerator, () => {
    if (!coveredMainWindow || coveredMainWindow.isDestroyed()) return;
    mainCoverManuallyVisible = !mainCoverManuallyVisible;
    if (mainCoverManuallyVisible) {
      coveredMainWindow.showInactive();
    } else {
      coveredMainWindow.hide();
    }
  });
}

export function restoreMainWindowFromGameCover(): void {
  const window = coveredMainWindow;
  const state = coveredMainWindowState;
  coveredMainWindow = null;
  coveredMainWindowState = null;
  mainCoverManuallyVisible = true;
  globalShortcut.unregister(toggleCoverAccelerator);
  if (!window || window.isDestroyed() || !state) return;
  window.setIgnoreMouseEvents(false);
  window.setOpacity(state.opacity);
  window.setAlwaysOnTop(state.alwaysOnTop);
  window.setVisibleOnAllWorkspaces(false);
  window.setBounds(state.bounds);
  window.setFocusable(state.focusable);
  window.show();
  window.focus();
  window.webContents.send("overlay:mouse-test-active", false);
}

export function setMainWindowGameCoverOverAoe(active: boolean): void {
  const window = coveredMainWindow;
  if (!window || window.isDestroyed()) return;
  if (active) {
    window.setAlwaysOnTop(true, "screen-saver");
    if (mainCoverManuallyVisible) window.showInactive();
  } else {
    window.setAlwaysOnTop(false);
  }
}

export function showMouseTestOverlay(): void {
  if (!coveredMainWindow || coveredMainWindow.isDestroyed()) return;
  mouseTestHudVisible = true;
  coveredMainWindow.webContents.send("overlay:mouse-test-active", true);
  globalShortcut.unregister(copyCoordinatesAccelerator);
  globalShortcut.register(copyCoordinatesAccelerator, () => {
    if (!latestPointer || !coveredMainWindow || coveredMainWindow.isDestroyed() || !mouseTestHudVisible) return;
    const mouseData = [
      `Screen: ${latestPointer.screenX}, ${latestPointer.screenY}`,
      `Client: ${latestPointer.clientX}, ${latestPointer.clientY}`,
      `Design 3840x2160: ${latestPointer.designX}, ${latestPointer.designY}`,
      `Client size: ${latestPointer.clientWidth} x ${latestPointer.clientHeight}`,
      `Inside AoE2: ${latestPointer.inside ? "Yes" : "No"}`
    ].join("\n");
    clipboard.writeText(mouseData);
    coveredMainWindow.webContents.send(
      "overlay:coordinates-copied",
      `${latestPointer.designX}, ${latestPointer.designY}`
    );
  });
  startPointerUpdates();
}

export function hideMouseTestOverlay(): void {
  mouseTestHudVisible = false;
  coveredMainWindow?.webContents.send("overlay:mouse-test-active", false);
  globalShortcut.unregister(copyCoordinatesAccelerator);
}

function startPointerUpdates(): void {
  if (pointerTimer) clearInterval(pointerTimer);
  pointerTimer = setInterval(() => {
    if (!coveredMainWindow || coveredMainWindow.isDestroyed() || !mouseTestHudVisible) return;
    const area = screen.getPrimaryDisplay().bounds;
    const point = screen.getCursorScreenPoint();
    const clientX = point.x - area.x;
    const clientY = point.y - area.y;
    const pointer = {
      screenX: point.x,
      screenY: point.y,
      clientX,
      clientY,
      designX: Math.round(clientX * 3840 / area.width),
      designY: Math.round(clientY * 2160 / area.height),
      clientWidth: area.width,
      clientHeight: area.height,
      inside: clientX >= 0 && clientY >= 0 && clientX < area.width && clientY < area.height
    };
    latestPointer = pointer;
    coveredMainWindow.webContents.send("overlay:mouse-pointer", pointer);
  }, 50);
}

export function closeTestOverlay(): void {
  mouseTestHudVisible = false;
  coveredMainWindow?.webContents.send("overlay:mouse-test-active", false);
  globalShortcut.unregister(copyCoordinatesAccelerator);
  latestPointer = undefined;
  if (pointerTimer) clearInterval(pointerTimer);
  pointerTimer = undefined;
}
