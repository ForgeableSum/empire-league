import { app, BrowserWindow } from "electron";
import electronUpdater from "electron-updater";
import type { PendingAppUpdate } from "../shared/contracts/electronApi.js";

const { autoUpdater } = electronUpdater;

const firstCheckDelayMs = 3_000;
const recurringCheckIntervalMs = 2 * 60 * 1_000;
let downloadedVersion: string | null = null;
let pendingUpdate: PendingAppUpdate | null = null;
let updateChecksPaused = false;
let checkInFlight = false;
let notifiedUpdateVersion: string | null = null;

export function getPendingUpdate(): PendingAppUpdate | null {
  return pendingUpdate;
}

export function installDownloadedUpdate(): boolean {
  if (!downloadedVersion || updateChecksPaused) return false;
  // The renderer has already collected explicit restart approval. NSIS stays
  // silent and relaunches directly into the updated application.
  autoUpdater.quitAndInstall(true, true);
  return true;
}

async function checkForUpdates(): Promise<void> {
  if (updateChecksPaused || checkInFlight) return;
  checkInFlight = true;
  try {
    await autoUpdater.checkForUpdates();
  } catch (error) {
    // A temporary network/feed failure must never prevent the app from starting.
    console.error("[Updater] Update check failed", error);
  } finally {
    checkInFlight = false;
  }
}

function sendPendingUpdate(): void {
  if (updateChecksPaused || !pendingUpdate || notifiedUpdateVersion === `${pendingUpdate.version}:${pendingUpdate.status}`) return;
  notifiedUpdateVersion = `${pendingUpdate.version}:${pendingUpdate.status}`;
  const channel = pendingUpdate.status === "downloaded" ? "system:update-ready" : "system:update-detected";
  for (const window of BrowserWindow.getAllWindows()) {
    if (window.isDestroyed()) continue;
    if (pendingUpdate.status === "downloaded") {
      if (window.isMinimized()) window.restore();
      window.show();
      window.focus();
    }
    window.webContents.send(channel, pendingUpdate);
  }
}

export function setAutoUpdateChecksPaused(paused: boolean): void {
  if (updateChecksPaused === paused) return;
  updateChecksPaused = paused;
  console.info(`[Updater] Checks ${paused ? "paused for active game" : "resumed after game"}`);
  if (!paused) {
    sendPendingUpdate();
    if (!pendingUpdate) void checkForUpdates();
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
    sendPendingUpdate();
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
    sendPendingUpdate();
  });

  setTimeout(() => void checkForUpdates(), firstCheckDelayMs);
  const timer = setInterval(() => void checkForUpdates(), recurringCheckIntervalMs);
  timer.unref();
}
