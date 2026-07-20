import { app, BrowserWindow } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export function createMainWindow(): BrowserWindow {
  const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1050,
    minHeight: 680,
    title: "Empire League",
    backgroundColor: "#141312",
    webPreferences: {
      preload: join(currentDir, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  if (isDev) {
    void mainWindow.loadURL("http://127.0.0.1:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    void mainWindow.loadFile(join(currentDir, "../renderer/index.html"));
  }

  return mainWindow;
}
