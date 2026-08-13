import { app } from "electron";

export const loginLaunchArgument = "--minimized-at-login";

export function getLoginItemSettings() {
  return app.getLoginItemSettings({ args: [loginLaunchArgument] });
}

export function setLoginItemOpenAtLogin(openAtLogin: boolean): void {
  app.setLoginItemSettings({ openAtLogin, args: [loginLaunchArgument] });
}
