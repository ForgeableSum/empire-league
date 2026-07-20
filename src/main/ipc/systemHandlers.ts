import { ipcMain } from "electron";

export function registerSystemHandlers(): void {
  ipcMain.handle("system:ping", async () => ({ ok: true, at: new Date().toISOString() }));
}
