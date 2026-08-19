import { app, BrowserWindow, nativeTheme } from "electron";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { installBundledAoe2Maps } from "./aoe2MapInstaller.js";
import { createMainWindow, focusMainWindow } from "./window.js";
import { registerIpcHandlers } from "./ipc/registerIpcHandlers.js";
import { startAutoUpdates } from "./autoUpdate.js";
import { getLoginItemSettings, loginLaunchArgument, setLoginItemOpenAtLogin } from "./loginItem.js";

app.setAppUserModelId("community.empireleague.aoe2");

const hasSingleInstanceLock = app.requestSingleInstanceLock();

if (!hasSingleInstanceLock) {
  app.quit();
} else {
  registerIpcHandlers();

  const launchedAtLogin = process.argv.includes(loginLaunchArgument);
  let mainWindow: BrowserWindow | null = null;
  let secondInstanceRequested = false;

  app.on("second-instance", () => {
    secondInstanceRequested = true;
    if (mainWindow && !mainWindow.isDestroyed()) focusMainWindow(mainWindow);
  });

  app.whenReady().then(async () => {
    nativeTheme.themeSource = "dark";

    if (app.isPackaged && process.platform === "win32") {
      const startupPreferenceInitialized = join(app.getPath("userData"), ".startup-default-initialized");
      if (!existsSync(startupPreferenceInitialized)) {
        try {
          setLoginItemOpenAtLogin(true);
          writeFileSync(startupPreferenceInitialized, "enabled\n", "utf8");
        } catch (error) {
          console.error("[Startup] Failed to enable launch at login", error);
        }
      } else if (getLoginItemSettings().executableWillLaunchAtLogin) {
        // Keep existing enabled login items up to date with the startup-only flag.
        setLoginItemOpenAtLogin(true);
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
    mainWindow = createMainWindow({ startMinimized: launchedAtLogin && !secondInstanceRequested });
    startAutoUpdates();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createMainWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
