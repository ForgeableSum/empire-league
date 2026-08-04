import { app, BrowserWindow } from "electron";
import electronUpdater from "electron-updater";

const { autoUpdater } = electronUpdater;

const firstCheckDelayMs = 3_000;
const recurringCheckIntervalMs = 10 * 60 * 1_000;
let downloadedVersion: string | null = null;

export function getDownloadedUpdateVersion(): string | null {
  return downloadedVersion;
}

export function installDownloadedUpdate(): boolean {
  if (!downloadedVersion) return false;
  // The renderer has already collected explicit restart approval. NSIS stays
  // silent and relaunches directly into the updated application.
  autoUpdater.quitAndInstall(true, true);
  return true;
}

async function checkForUpdates(): Promise<void> {
  try {
    await autoUpdater.checkForUpdates();
  } catch (error) {
    // A temporary network/feed failure must never prevent the app from starting.
    console.error("[Updater] Update check failed", error);
  }
}

export function startAutoUpdates(): void {
  if (!app.isPackaged) {
    console.info("[Updater] Skipping update checks in development");
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.logger = console;

  autoUpdater.on("update-available", (info) => {
    console.info(`[Updater] Downloading version ${info.version}`);
  });
  autoUpdater.on("update-not-available", (info) => {
    console.info(`[Updater] Version ${info.version} is current`);
  });
  autoUpdater.on("error", (error) => {
    console.error("[Updater] Error", error);
  });
  autoUpdater.on("update-downloaded", (info) => {
    downloadedVersion = info.version;
    for (const window of BrowserWindow.getAllWindows()) {
      if (window.isDestroyed()) continue;
      if (window.isMinimized()) window.restore();
      window.show();
      window.focus();
      window.webContents.send("system:update-ready", { version: info.version });
    }
  });

  setTimeout(() => void checkForUpdates(), firstCheckDelayMs);
  const timer = setInterval(() => void checkForUpdates(), recurringCheckIntervalMs);
  timer.unref();
}
