import { ipcMain } from "electron";
import { getObsOutputStatus, getObsStatus, setObsRecording, setObsStreaming, setupObs } from "../obsIntegration.js";

export function registerObsHandlers(): void {
  ipcMain.handle("obs:get-status", async (_event, password?: string) => getObsStatus(password));
  ipcMain.handle("obs:setup", async (_event, password?: string) => setupObs(password));
  ipcMain.handle("obs:get-output-status", async () => getObsOutputStatus());
  ipcMain.handle("obs:set-streaming", async (_event, active: boolean) => setObsStreaming(active));
  ipcMain.handle("obs:set-recording", async (_event, active: boolean) => setObsRecording(active));
}
