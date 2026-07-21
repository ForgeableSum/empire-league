import { app, BrowserWindow, screen } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
let overlayWindow: BrowserWindow | null = null;

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

export function toggleTestOverlay(): boolean {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
      return false;
    }
    overlayWindow.setBounds(screen.getPrimaryDisplay().bounds);
    overlayWindow.showInactive();
    return true;
  }

  const area = screen.getPrimaryDisplay().bounds;
  overlayWindow = new BrowserWindow({
    width: area.width,
    height: area.height,
    x: area.x,
    y: area.y,
    frame: false,
    transparent: true,
    resizable: false,
    fullscreenable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    hasShadow: false,
    webPreferences: {
      preload: join(currentDir, "../preload/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  overlayWindow.setAlwaysOnTop(true, "screen-saver");
  overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWindow.on("closed", () => { overlayWindow = null; });
  overlayWindow.once("ready-to-show", () => overlayWindow?.showInactive());
  loadRenderer(overlayWindow, "?overlay=test");
  return true;
}

export function closeTestOverlay(): void {
  overlayWindow?.hide();
}
