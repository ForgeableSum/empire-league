import { app, BrowserWindow, ipcMain, safeStorage, shell } from "electron";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { minimizeMainWindowToTaskbar } from "../window.js";

export function registerSystemHandlers(): void {
  ipcMain.handle("system:ping", async () => ({ ok: true, at: new Date().toISOString() }));
  ipcMain.handle("system:quit", async () => {
    app.quit();
  });
  ipcMain.handle("system:minimize-to-taskbar", async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) minimizeMainWindowToTaskbar(window);
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
      return safeStorage.decryptString(encrypted);
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

function authTokenPath(): string {
  return join(app.getPath("userData"), "auth-token.bin");
}
