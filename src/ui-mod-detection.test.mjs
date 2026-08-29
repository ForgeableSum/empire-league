import assert from "node:assert/strict";
import test from "node:test";
import { isAutomationSensitiveUiPath } from "./shared/uiModDetection.ts";

test("detects main-menu replacement artwork used by event menu mods", () => {
  const vikingRoot = "mods/subscribed/515106_[TheVikingSagas] Main Menu";
  assert.equal(isAutomationSensitiveUiPath(
    `${vikingRoot}/resources/_common/wpfg/resources/mainmenu/mainmenu_bg.jpg`
  ), true);
  assert.equal(isAutomationSensitiveUiPath(
    `${vikingRoot}/widgetui/textures/backgrounds/mainmenu_bg.dds`
  ), true);
  assert.equal(isAutomationSensitiveUiPath(
    `${vikingRoot}/widgetui/textures-sd/backgrounds/mainmenu_bg.dds`
  ), true);
});

test("keeps audio-only and unrelated visual mods out of the warning", () => {
  assert.equal(isAutomationSensitiveUiPath(
    "mods/subscribed/515122_[TheVikingSagas] Main Menu Music/resources/_common/sound/music/menu_theme.wem"
  ), false);
  assert.equal(isAutomationSensitiveUiPath(
    "mods/subscribed/790_Small Trees/resources/_common/drs/graphics/tree_pine.sld"
  ), false);
});

test("continues to detect sensitive layouts and controls", () => {
  assert.equal(isAutomationSensitiveUiPath(
    "mods/subscribed/example/widgetui/screenmainmenu.json"
  ), true);
  assert.equal(isAutomationSensitiveUiPath(
    "mods/subscribed/example/resources/_common/wpfg/resources/simplemainmenu/background.png"
  ), true);
  assert.equal(isAutomationSensitiveUiPath(
    "mods/subscribed/example/widgetui/textures/menu/buttons/button_ready_normal.dds"
  ), true);
});
