import assert from "node:assert/strict";
import test from "node:test";
import {
  civilizationNameFromId,
  civilizations,
  normalizeCivilizationPreference,
  rollCivilizationPreference
} from "./civilization-roll.mjs";

test("replay civilization ids resolve to display names", () => {
  assert.equal(civilizationNameFromId(19), "Italians");
  assert.equal(civilizationNameFromId(46), "Jurchens");
  assert.equal(civilizationNameFromId(47), "Khitans");
  assert.equal(civilizationNameFromId(999), "");
});

test("random civilization excludes bans for the selected land-map group", () => {
  const preference = {
    mode: "random",
    openLandBans: civilizations.slice(0, 5),
    closedLandBans: civilizations.slice(-5)
  };
  assert.equal(
    rollCivilizationPreference(preference, "land-open", [], () => 0).civilization,
    civilizations[5]
  );
  assert.equal(
    rollCivilizationPreference(preference, "land-closed", [], () => 0.999999).civilization,
    civilizations.at(-6)
  );
});

test("an opponent's bans are excluded from the random roll", () => {
  const preference = { mode: "random", openLandBans: ["Armenians"] };
  const rolled = rollCivilizationPreference(
    preference,
    "land-open",
    ["Aztecs", "Bengalis"],
    () => 0
  );
  assert.equal(rolled.civilization, "Berbers");
});

test("non-random preferences are unchanged", () => {
  const preference = { mode: "pick", civilization: "Byzantines" };
  assert.equal(rollCivilizationPreference(preference, "land-open"), preference);
});

test("normalization limits each map-style list to five known unique civilizations", () => {
  const normalized = normalizeCivilizationPreference({
    mode: "random",
    openLandBans: [...civilizations.slice(0, 6), civilizations[0], "Not a civ"],
    closedLandBans: ["Franks"]
  });
  assert.deepEqual(normalized.openLandBans, civilizations.slice(0, 5));
  assert.deepEqual(normalized.closedLandBans, ["Franks"]);
});

test("normalization preserves prefer-random and bans for a chosen civilization", () => {
  const normalized = normalizeCivilizationPreference({
    mode: "pick",
    civilization: "Mayans",
    preferRandom: true,
    openLandBans: ["Franks"],
    closedLandBans: ["Turks"]
  });
  assert.deepEqual(normalized, {
    mode: "pick",
    civilization: "Mayans",
    preferRandom: true,
    openLandBans: ["Franks"],
    closedLandBans: ["Turks"]
  });
});
