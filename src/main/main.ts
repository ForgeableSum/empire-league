import { app, BrowserWindow, nativeTheme } from "electron";
import { createMainWindow } from "./window.js";
import { registerIpcHandlers } from "./ipc/registerIpcHandlers.js";

registerIpcHandlers();
app.setAppUserModelId("community.empireleague.aoe2");

app.whenReady().then(() => {
  nativeTheme.themeSource = "dark";
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
