const requiredRankedSettings = Object.freeze({
  cheats: false,
  replayCheatsEnabled: false,
  instantBuild: false,
  playerCount: 2,
  populationLimit: 200,
  recordGame: true,
  gameType: 0,
  replayGameMode: 0,
  gameSpeedId: 0,
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
  treatyLength: 0
});

export function validateRankedReplaySettings(settings, expectedPlayerCount = 2) {
  if (!settings || typeof settings !== "object") return "replay game settings are required";
  for (const [field, configuredExpected] of Object.entries(requiredRankedSettings)) {
    const expected = field === "playerCount" ? expectedPlayerCount : configuredExpected;
    if (settings[field] !== expected) {
      return `replay setting ${field} must be ${JSON.stringify(expected)}`;
    }
  }
  if (!Number.isFinite(settings.gameSpeed) || Math.abs(settings.gameSpeed - 1.69) > 0.001) {
    return "replay setting gameSpeed must be Normal";
  }
  if (!Number.isInteger(settings.selectedMapId) || !Number.isInteger(settings.resolvedMapId)
    || !Array.isArray(settings.rmsStrings) || settings.rmsStrings.some((value) => typeof value !== "string")) {
    return "replay contains incomplete game or map settings";
  }
  return null;
}

export function replaySettingsAgree(left, right) {
  if (!left || !right) return false;
  const normalize = (settings) => ({
    ...settings,
    rmsStrings: [...settings.rmsStrings].sort()
  });
  return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
}
