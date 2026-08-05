import { app, BrowserWindow, nativeTheme } from "electron";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { installBundledAoe2Maps } from "./aoe2MapInstaller.js";
import { createMainWindow } from "./window.js";
import { registerIpcHandlers } from "./ipc/registerIpcHandlers.js";
import { startAutoUpdates } from "./autoUpdate.js";
import { restoreWindowsMinimizedForAoe2 } from "./aoe2Win32Automation.js";

registerIpcHandlers();
app.setAppUserModelId("community.empireleague.aoe2");
app.on("will-quit", restoreWindowsMinimizedForAoe2);

app.whenReady().then(async () => {
  nativeTheme.themeSource = "dark";

  if (app.isPackaged && process.platform === "win32") {
    const startupPreferenceInitialized = join(app.getPath("userData"), ".startup-default-initialized");
    if (!existsSync(startupPreferenceInitialized)) {
      try {
        app.setLoginItemSettings({ openAtLogin: true });
        writeFileSync(startupPreferenceInitialized, "enabled\n", "utf8");
      } catch (error) {
        console.error("[Startup] Failed to enable launch at login", error);
      }
    }
  }

  try {
    const maps = await installBundledAoe2Maps();
    console.info(
      `[AoE2 maps] Installed=${maps.installedProfiles.join(",") || "none"} `
      + `Current=${maps.skippedProfiles.join(",") || "none"} `
      + `Reenabled=${maps.enabledProfiles.join(",") || "none"}`
    );
  } catch (error) {
    console.error("[AoE2 maps] Installation failed", error);
  }
  createMainWindow();
  startAutoUpdates();

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
