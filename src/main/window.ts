import { app, BrowserWindow, clipboard, globalShortcut, screen } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
let pointerTimer: NodeJS.Timeout | undefined;
let mouseTestHudVisible = false;
let mouseCoordinateOverlayEnabled = false;
let mainCoverManuallyVisible = true;
let coveredMainWindow: BrowserWindow | null = null;
let coveredMainWindowState: {
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
  const displayId = screen.getPrimaryDisplay().id;
  const area = screen.getPrimaryDisplay().bounds;
  const mainWindow = new BrowserWindow({
    show: false,
    x: area.x,
    y: area.y,
    width: area.width,
    height: area.height,
    title: "Empire League",
    icon: appIconPath(),
    frame: false,
    fullscreen: true,
    kiosk: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    backgroundColor: "#141312",
    webPreferences: {
      preload: join(currentDir, "../preload/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  const fitKioskToDisplay = (): void => {
    if (mainWindow.isDestroyed()) return;
    const display = screen.getAllDisplays().find((item) => item.id === displayId) ?? screen.getPrimaryDisplay();
    const currentBounds = mainWindow.getBounds();
    const targetBounds = display.bounds;
    if (
      currentBounds.x !== targetBounds.x ||
      currentBounds.y !== targetBounds.y ||
      currentBounds.width !== targetBounds.width ||
      currentBounds.height !== targetBounds.height
    ) {
      mainWindow.setBounds(targetBounds, false);
    }
  };
  const handleDisplayMetricsChanged = (): void => {
    setImmediate(fitKioskToDisplay);
  };

  mainWindow.setMenuBarVisibility(false);
  mainWindow.once("ready-to-show", () => {
    if (mainWindow.isDestroyed()) return;
    mainWindow.setKiosk(true);
    fitKioskToDisplay();
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on("leave-full-screen", () => {
    if (mainWindow.isDestroyed()) return;
    setImmediate(() => {
      if (mainWindow.isDestroyed()) return;
      mainWindow.setKiosk(true);
      fitKioskToDisplay();
    });
  });
  screen.on("display-metrics-changed", handleDisplayMetricsChanged);
  mainWindow.once("closed", () => {
    screen.off("display-metrics-changed", handleDisplayMetricsChanged);
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
      alwaysOnTop: window.isAlwaysOnTop(),
      focusable: window.isFocusable(),
      opacity: window.getOpacity()
    };
  }
  mainCoverManuallyVisible = true;
  window.setIgnoreMouseEvents(false);
  window.setOpacity(1);
  window.setKiosk(true);
  window.setAlwaysOnTop(true, "screen-saver");
  window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  window.showInactive();
  if (mouseCoordinateOverlayEnabled) {
    showMouseTestOverlay();
  } else {
    window.webContents.send("overlay:mouse-test-active", false);
  }
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
  window.setFocusable(state.focusable);
  window.setKiosk(true);
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

export function setMainWindowGameCoverClickThrough(clickThrough: boolean): void {
  const window = coveredMainWindow;
  if (!window || window.isDestroyed()) return;
  if (clickThrough) {
    window.setAlwaysOnTop(true, "screen-saver");
    if (mainCoverManuallyVisible) window.showInactive();
  }
  window.setIgnoreMouseEvents(clickThrough);
}

export function hideMainWindowGameCover(): void {
  const window = coveredMainWindow;
  if (!window || window.isDestroyed()) return;
  mainCoverManuallyVisible = false;
  window.hide();
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

export function setMouseCoordinateOverlayEnabled(enabled: boolean): void {
  mouseCoordinateOverlayEnabled = enabled;
  if (enabled) showMouseTestOverlay();
  else hideMouseTestOverlay();
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
