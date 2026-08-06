import { app, BrowserWindow } from "electron";
import electronUpdater from "electron-updater";
import type { PendingAppUpdate } from "../shared/contracts/electronApi.js";

const { autoUpdater } = electronUpdater;

const firstCheckDelayMs = 3_000;
const recurringCheckIntervalMs = 10 * 60 * 1_000;
let downloadedVersion: string | null = null;
let pendingUpdate: PendingAppUpdate | null = null;

export function getPendingUpdate(): PendingAppUpdate | null {
  return pendingUpdate;
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
    pendingUpdate = { version: info.version, status: "downloading" };
    for (const window of BrowserWindow.getAllWindows()) {
      if (!window.isDestroyed()) window.webContents.send("system:update-detected", pendingUpdate);
    }
  });
  autoUpdater.on("update-not-available", (info) => {
    console.info(`[Updater] Version ${info.version} is current`);
    pendingUpdate = null;
  });
  autoUpdater.on("error", (error) => {
    console.error("[Updater] Error", error);
  });
  autoUpdater.on("update-downloaded", (info) => {
    downloadedVersion = info.version;
    pendingUpdate = { version: info.version, status: "downloaded" };
    for (const window of BrowserWindow.getAllWindows()) {
      if (window.isDestroyed()) continue;
      if (window.isMinimized()) window.restore();
      window.show();
      window.focus();
      window.webContents.send("system:update-ready", pendingUpdate);
    }
  });

  setTimeout(() => void checkForUpdates(), firstCheckDelayMs);
  const timer = setInterval(() => void checkForUpdates(), recurringCheckIntervalMs);
  timer.unref();
}
