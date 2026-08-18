import { app, BrowserWindow, ipcMain, Notification, safeStorage, shell } from "electron";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { focusMainWindow, minimizeMainWindowToTaskbar } from "../window.js";
import { getPendingUpdate, installDownloadedUpdate, retryPendingUpdate, setAutoUpdateChecksPaused } from "../autoUpdate.js";
import { getLoginItemSettings as getSystemLoginItemSettings, setLoginItemOpenAtLogin } from "../loginItem.js";

let steamLoginParent: BrowserWindow | null = null;

export function registerSystemHandlers(): void {
  ipcMain.handle("system:ping", async () => ({ ok: true, at: new Date().toISOString() }));
  ipcMain.handle("system:quit", async () => {
    app.quit();
  });
  ipcMain.handle("system:minimize-to-taskbar", async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) minimizeMainWindowToTaskbar(window);
  });
  ipcMain.handle("system:alert-match-found", async (event, showNotification: boolean) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return;
    focusMainWindow(window);
    window.moveTop();
    const focusDeadline = Date.now() + 2_000;
    while (!window.isFocused() && Date.now() < focusDeadline) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      focusMainWindow(window);
      window.moveTop();
    }
    if (!window.isFocused()) throw new Error("The Empire League window could not be focused for the match-found prompt.");
    if (!showNotification) return;

    window.flashFrame(true);

    if (Notification.isSupported()) {
      const notification = new Notification({
        title: "Match found",
        body: "Your match auto-accepts in 10 seconds unless you decline.",
        silent: false,
        timeoutType: "never"
      });
      notification.on("click", () => {
        if (window.isDestroyed()) return;
        if (window.isMinimized()) window.restore();
        window.show();
        window.moveTop();
        window.focus();
        window.flashFrame(false);
      });
      notification.show();
    }
  });
  ipcMain.handle("system:alert-tournament-ready", async (event, tournamentName: string) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return;
    const safeTournamentName = typeof tournamentName === "string"
      ? tournamentName.trim().slice(0, 64)
      : "Tournament";
    if (!window.isFocused()) window.flashFrame(true);

    if (Notification.isSupported()) {
      const notification = new Notification({
        title: "Tournament match ready",
        body: `${safeTournamentName || "Your tournament"} is waiting for you. Ready up before the deadline.`,
        silent: false,
        timeoutType: "never"
      });
      notification.on("click", () => {
        if (window.isDestroyed()) return;
        if (window.isMinimized()) window.restore();
        window.show();
        window.moveTop();
        window.focus();
        window.flashFrame(false);
        window.webContents.send("system:tournament-notification-clicked");
      });
      notification.show();
    }
  });
  ipcMain.handle("system:is-app-focused", async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    return Boolean(window && !window.isDestroyed() && window.isVisible() && !window.isMinimized() && window.isFocused());
  });
  ipcMain.handle("system:stop-match-found-alert", async (event) => {
    BrowserWindow.fromWebContents(event.sender)?.flashFrame(false);
  });
  ipcMain.handle("system:alert-unread-message", async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window && !window.isFocused()) window.flashFrame(true);
  });
  ipcMain.handle("system:clear-unread-message-alert", async (event) => {
    BrowserWindow.fromWebContents(event.sender)?.flashFrame(false);
  });
  ipcMain.handle("system:get-login-item-settings", async () => getLoginItemSettings());
  ipcMain.handle("system:get-app-version", async () => app.getVersion());
  ipcMain.handle("system:get-preferred-languages", async () => app.getPreferredSystemLanguages());
  ipcMain.handle("system:open-external-url", async (event, value: string) => {
    const url = new URL(value);
    if (url.protocol !== "https:") throw new Error("Invalid external URL.");
    const parent = BrowserWindow.fromWebContents(event.sender);
    if (parent) {
      minimizeMainWindowToTaskbar(parent);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    await shell.openExternal(url.toString());
  });
  ipcMain.handle("system:get-pending-update", async () => {
    return getPendingUpdate();
  });
  ipcMain.handle("system:install-pending-update", async () => installDownloadedUpdate());
  ipcMain.handle("system:retry-pending-update", async () => retryPendingUpdate());
  ipcMain.handle("system:set-update-checks-paused", async (_event, paused: boolean) => {
    if (typeof paused !== "boolean") throw new TypeError("Update pause state must be a boolean.");
    setAutoUpdateChecksPaused(paused);
  });
  ipcMain.handle("system:set-login-item-open-at-login", async (_event, openAtLogin: boolean) => {
    if (typeof openAtLogin !== "boolean") throw new TypeError("Startup preference must be a boolean.");
    if (!supportsLoginItems()) return getLoginItemSettings();
    setLoginItemOpenAtLogin(openAtLogin);
    return getLoginItemSettings();
  });
  ipcMain.handle("system:restart", async () => {
    app.relaunch();
    app.quit();
  });
  ipcMain.handle("auth:open-steam-login", async (event, value: string) => {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "steamcommunity.com") throw new Error("Invalid Steam login URL.");
    const parent = BrowserWindow.fromWebContents(event.sender);
    steamLoginParent = parent;
    if (parent) {
      minimizeMainWindowToTaskbar(parent);
      // Let Windows finish the minimize/blur transition (which also releases
      // the shell's always-on-top level) before asking it to foreground the
      // user's browser.
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    await shell.openExternal(url.toString());
  });
  ipcMain.handle("auth:complete-steam-login", async () => {
    const parent = steamLoginParent;
    steamLoginParent = null;
    if (parent && !parent.isDestroyed()) focusMainWindow(parent);
  });
  ipcMain.handle("auth:load-token", async () => {
    try {
      const encrypted = await readFile(authTokenPath());
      const token = safeStorage.decryptString(encrypted);
      return token;
    } catch {
      return null;
    }
  });
  ipcMain.handle("auth:store-token", async (_event, token: string) => {
    if (!safeStorage.isEncryptionAvailable()) throw new Error("Secure token storage is unavailable.");
    await writeFile(authTokenPath(), safeStorage.encryptString(token));
  });
  ipcMain.handle("auth:clear-token", async () => {
    await unlink(authTokenPath()).catch(() => undefined);
  });
}

function supportsLoginItems(): boolean {
  return app.isPackaged && process.platform === "win32";
}

function getLoginItemSettings(): { supported: boolean; openAtLogin: boolean } {
  const supported = supportsLoginItems();
  return {
    supported,
    // This reflects whether Windows will actually launch this executable,
    // including registrations made with startup arguments.
    openAtLogin: supported && getSystemLoginItemSettings().executableWillLaunchAtLogin
  };
}

function authTokenPath(): string {
  return join(app.getPath("userData"), "auth-token.bin");
}
