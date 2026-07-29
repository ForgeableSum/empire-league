import assert from "node:assert/strict";
import test from "node:test";
import { replaySettingsAgree, validateRankedReplaySettings } from "./replayRules.mjs";

function validSettings(overrides = {}) {
  return {
    cheats: false,
    replayCheatsEnabled: false,
    instantBuild: false,
    playerCount: 2,
    populationLimit: 200,
    recordGame: true,
    gameType: 0,
    replayGameMode: 0,
    gameSpeedId: 0,
    gameSpeed: 1.69,
    startingAgeId: 0,
    startingResourcesId: 0,
    endingAgeId: 0,
    victoryTypeId: 9,
    victoryAmount: -1,
    revealMap: 0,
    lockTeams: true,
    allTechs: false,
    handicap: false,
    sharedExploration: true,
    teamBonusDisabled: false,
    treatyLength: 0,
    selectedMapId: 9,
    resolvedMapId: 9,
    rmsStrings: ["KotD6 Arabia EL"],
    ...overrides
  };
}

test("accepts the ranked 1v1 replay rules", () => {
  assert.equal(validateRankedReplaySettings(validSettings()), null);
});

test("rejects either replay cheat flag and instant build", () => {
  assert.match(validateRankedReplaySettings(validSettings({ cheats: true })), /cheats/);
  assert.match(validateRankedReplaySettings(validSettings({ replayCheatsEnabled: true })), /replayCheatsEnabled/);
  assert.match(validateRankedReplaySettings(validSettings({ instantBuild: true })), /instantBuild/);
});

test("rejects altered ranked lobby settings", () => {
  for (const override of [
    { playerCount: 3 },
    { populationLimit: 500 },
    { recordGame: false },
    { replayGameMode: 1 },
    { gameSpeedId: 3, gameSpeed: 2 },
    { startingAgeId: 2 },
    { startingResourcesId: 2 },
    { endingAgeId: 3 },
    { victoryTypeId: 0 },
    { victoryAmount: 500 },
    { revealMap: 2 },
    { lockTeams: false },
    { allTechs: true },
    { handicap: true },
    { sharedExploration: false },
    { treatyLength: 10 }
  ]) {
    assert.notEqual(validateRankedReplaySettings(validSettings(override)), null);
  }
});

test("requires both replay headers to agree including map settings", () => {
  assert.equal(replaySettingsAgree(validSettings(), validSettings()), true);
  assert.equal(replaySettingsAgree(validSettings(), validSettings({ selectedMapId: 10 })), false);
  assert.equal(replaySettingsAgree(
    validSettings({ rmsStrings: ["b", "a"] }),
    validSettings({ rmsStrings: ["a", "b"] })
  ), true);
});
