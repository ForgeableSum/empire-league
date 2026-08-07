import { app, BrowserWindow, ipcMain, Notification, safeStorage, shell } from "electron";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { focusMainWindow, minimizeMainWindowToTaskbar } from "../window.js";
import { getPendingUpdate, installDownloadedUpdate, setAutoUpdateChecksPaused } from "../autoUpdate.js";

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
  ipcMain.handle("system:open-discord-invite", async () => {
    await shell.openExternal("https://discord.gg/arRjVxx2y7");
  });
  ipcMain.handle("system:get-pending-update", async () => {
    return getPendingUpdate();
  });
  ipcMain.handle("system:install-pending-update", async () => installDownloadedUpdate());
  ipcMain.handle("system:set-update-checks-paused", async (_event, paused: boolean) => {
    if (typeof paused !== "boolean") throw new TypeError("Update pause state must be a boolean.");
    setAutoUpdateChecksPaused(paused);
  });
  ipcMain.handle("system:set-login-item-open-at-login", async (_event, openAtLogin: boolean) => {
    if (typeof openAtLogin !== "boolean") throw new TypeError("Startup preference must be a boolean.");
    if (!supportsLoginItems()) return getLoginItemSettings();
    app.setLoginItemSettings({ openAtLogin, args: ["--minimized-at-login"] });
    return getLoginItemSettings();
  });
  ipcMain.handle("system:restart", async () => {
    app.relaunch();
    app.quit();
  });
  ipcMain.handle("auth:open-steam-login", async (_event, value: string) => {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "steamcommunity.com") throw new Error("Invalid Steam login URL.");
    await shell.openExternal(url.toString());
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
    openAtLogin: supported && app.getLoginItemSettings().openAtLogin
  };
}

function authTokenPath(): string {
  return join(app.getPath("userData"), "auth-token.bin");
}
