import { ipcMain } from "electron";
import { closeTestOverlay, toggleTestOverlay } from "../window.js";

export function registerSystemHandlers(): void {
  ipcMain.handle("system:ping", async () => ({ ok: true, at: new Date().toISOString() }));
  ipcMain.handle("overlay:toggle", async () => ({ visible: toggleTestOverlay() }));
  ipcMain.handle("overlay:close", async () => {
    closeTestOverlay();
    return { visible: false as const };
  });
}
