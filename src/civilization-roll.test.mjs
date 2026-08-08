import assert from "node:assert/strict";
import test from "node:test";
import {
  classicCivilizations,
  classicQueuesAreCompatible,
  civilizationNameFromId,
  civilizations,
  effectiveCivilizationPreference,
  normalizeCivilizationPreference,
  rollCivilizationPreference
} from "./civilization-roll.mjs";

test("classic matchmaking remains compatible with guaranteed classic choices", () => {
  const classic = { classicMode: true, civilizationPreference: { mode: "random" } };
  assert.equal(classicQueuesAreCompatible(classic, { civilizationPreference: { mode: "pick", civilization: "Georgians" } }), true);
  assert.equal(classicQueuesAreCompatible(classic, { civilizationPreference: { mode: "mirror" } }), true);
  assert.equal(classicQueuesAreCompatible(classic, { civilizationPreference: { mode: "random" } }), false);
  assert.equal(classicQueuesAreCompatible(classic, { civilizationPreference: { mode: "pick", civilization: "Khitans" } }), false);
});

test("classic random rolls exclude post-Mountain Royals civilizations", () => {
  const rolled = rollCivilizationPreference(
    { mode: "random" },
    "land-open",
    [],
    () => 0.999999,
    classicCivilizations
  );
  assert.equal(rolled.civilization, "Vikings");
  assert.equal(classicCivilizations.includes("Jurchens"), false);
  assert.equal(classicCivilizations.includes("Khitans"), false);
});

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

test("prefer-random becomes random when the 1v1 opponent selects random", () => {
  const preference = {
    mode: "pick",
    civilization: "Byzantines",
    preferRandom: true,
    openLandBans: ["Franks"]
  };
  assert.deepEqual(
    effectiveCivilizationPreference(preference, [{ mode: "random" }]),
    { ...preference, mode: "random" }
  );
  assert.equal(
    effectiveCivilizationPreference(preference, [{ mode: "pick", civilization: "Mayans" }]),
    preference
  );
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
