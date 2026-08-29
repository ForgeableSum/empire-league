export const automationSensitiveWidgetUiFiles = new Set([
  "dialogcreatemultiplayergame.json",
  "dialoglobbysettings.json",
  "screenempireinvites.json",
  "screenmainmenu.json",
  "screenmapselection.json",
  "screenmultiplayerbrowser.json",
  "screenmultiplayerlobbyclient.json",
  "screenmultiplayerlobbyhost.json",
  "screenmultiplayerlobbyspectator.json",
  "screenmultiplayerlobbytransition.json",
  "screenselectscenario.json"
]);

export function isAutomationSensitiveUiPath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/").toLowerCase();
  const fileName = normalized.split("/").at(-1) ?? "";

  // Fixed-coordinate automation operates only these menu/lobby layouts. Mods
  // that merely contain other widgetui files (HUDs, minimaps, etc.) are safe.
  if (normalized.includes("/widgetui/") && automationSensitiveWidgetUiFiles.has(fileName)) return true;

  // The civilization card controls picker layout, while the listed images are
  // sampled to recognize the main menu and Ready state. Replacing either can
  // invalidate fixed coordinates or pixel verification. Main-menu event mods
  // commonly replace mainmenu_bg in both the WPFG resource tree and the SD/HD
  // widget texture trees without shipping screenmainmenu.json.
  return normalized.includes("/resources/_common/wpfg/wpfui/paphos/civselection/")
    || normalized.includes("/widgetui/textures/menu/buttons/button_ready_")
    || normalized.includes("/widgetui/textures/menu/buttons/button_red_")
    || normalized.includes("/resources/_common/wpfg/resources/mainmenu/")
    || normalized.includes("/resources/_common/wpfg/resources/simplemainmenu/")
    || normalized.includes("/widgetui/textures/backgrounds/mainmenu_")
    || normalized.includes("/widgetui/textures-sd/backgrounds/mainmenu_")
    || normalized.includes("/resources/_common/wpfg/resources/button_large/");
}
