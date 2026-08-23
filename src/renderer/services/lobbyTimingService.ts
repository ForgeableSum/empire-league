import { aoe2UiManifest, teamGameMapSizeSelection, type Aoe2UiAction } from "../../shared/aoe2UiManifest";
import type { CivilizationPreference, MatchSession } from "../../shared/contracts/matchmaking";
import {
  customLobbyAiDifficulties,
  customLobbyEndingAges,
  customLobbyGameSpeeds,
  customLobbyMapSizes,
  customLobbyPopulationLimits,
  customLobbyRevealMapOptions,
  customLobbyStartingAges,
  customLobbyStartingResources,
  customLobbyTreatyLengths,
  customLobbyVictoryConditions,
  defaultCustomLobbyGameSettings,
  type CustomLobbyRoom
} from "../../shared/contracts/customLobby";
import { enabledMapCatalogEntries, isCustomMapForQueue } from "../../shared/mapCatalog";
import {
  adaptiveLobbyTimingEnabled,
  contentConfirmationKeyDelayMs,
  lobbySetupEstimateTiming,
  lobbySetupTiming
} from "../../shared/runtimeConfig";

const storageKey = "empire-league:lobby-setup-timing:v1";
const historyLimit = 9;
const defaultHoverMs = 100;
const defaultHoldMs = 120;
const clickEnterDelayMs = 500;
const multiplayerTabCount = 6;
const multiplayerTabDelayMs = 100;

type FlowKind = "standard" | "custom";
type TimingHistory = Record<FlowKind, number[]>;

export function estimateLobbySetupMs(match: MatchSession): number {
  const baseline = calculateLobbySetupBaselineMs(match);
  if (!adaptiveLobbyTimingEnabled) return baseline;
  const residuals = loadHistory()[flowKind(match)];
  if (!residuals.length) return baseline;
  return Math.max(10_000, baseline + median(residuals));
}

export function recordLobbySetupDuration(match: MatchSession, actualDurationMs: number): void {
  if (!adaptiveLobbyTimingEnabled) return;
  if (!Number.isFinite(actualDurationMs) || actualDurationMs < 10_000 || actualDurationMs > 180_000) return;
  const kind = flowKind(match);
  const history = loadHistory();
  const residual = Math.round(actualDurationMs - calculateLobbySetupBaselineMs(match));
  history[kind] = [...history[kind], residual].slice(-historyLimit);
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(history));
  } catch {
    // Timing history is an optional calibration aid.
  }
}

export function calculateLobbySetupBaselineMs(match: MatchSession): number {
  const custom = flowKind(match) === "custom";
  const mapPicker = aoe2UiManifest.mapPicker;
  const actions = aoe2UiManifest.actions;

  let total = lobbySetupTiming.hostLobbyAutomationSettleMs
    + lobbySetupTiming.hostLobbyAutomationOverheadMs
    + lobbySetupEstimateTiming.hostSetupSafetyMarginMs;
  total += (multiplayerTabCount * multiplayerTabDelayMs) + actions.multiplayer.settleMs;
  total += actionDuration(actions.hostGame) + clickEnterDelayMs;
  if (match.matchType === "tournament") {
    total += actionDuration(actions.lobbyPassword) + actionDuration(actions.allowSpectators);
  }
  total += actionDuration(actions.createLobby);
  total += defaultClickDurationMs() + lobbySetupTiming.resetFocusMs + lobbySetupTiming.resetConfirmationMs;
  total += defaultClickDurationMs() + mapPicker.openSettleMs;
  total += defaultClickDurationMs() + mapPicker.styleMenuSettleMs;
  total += defaultClickDurationMs() + mapPicker.styleSelectionSettleMs;
  total += defaultClickDurationMs() + mapPicker.searchSettleMs;
  total += defaultClickDurationMs() + mapPicker.selectionSettleMs;
  const teamPlayerCount = match.queue.format === "team"
    ? (match.queue.teamSizes?.[0] ?? 2) * 2
    : 2;
  const sequentialGuestCount = teamPlayerCount > 2 ? teamPlayerCount - 1 : 1;
  if (teamGameMapSizeSelection(teamPlayerCount)) {
    total += (defaultClickDurationMs() * 2)
      + aoe2UiManifest.lobbySelectSettings.openSettleMs
      + aoe2UiManifest.lobbySelectSettings.selectionSettleMs;
  }
  total += actionDuration(actions.copyLobbyUri) + lobbySetupTiming.clipboardReadMs;
  total += civilizationSelectionDuration(match.queue.civilizationPreference);
  total += lobbySetupTiming.lobbyMetadataMs;
  total += (lobbySetupEstimateTiming.guestJoinMs + lobbySetupTiming.guestReadySettleMs)
    * sequentialGuestCount;
  if (match.matchType === "tournament") {
    total += (defaultClickDurationMs() * 2)
      + aoe2UiManifest.passwordPrompt.inputSettleMs
      + (12 * 15)
      + aoe2UiManifest.passwordPrompt.confirmSettleMs;
  }
  total += civilizationSelectionDuration(match.opponentCivilizationPreference);
  total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);

  if (custom) {
    total += lobbySetupEstimateTiming.customTransferReadyAdjustmentMs;
    total += lobbySetupTiming.customMapTransferPollMs + actions.guestReady.settleMs;
    total += contentConfirmationKeyDelayMs + actions.confirmGuestContent.settleMs;
    total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);
    total += lobbySetupTiming.customMapTransferPollMs;
  } else {
    total += lobbySetupTiming.customMapTransferPollMs;
  }

  total += actionDuration(actions.guestReady);
  total += lobbySetupTiming.hostReadyToStartMs + lobbySetupTiming.startGameSettleMs;
  total += actionDuration(actions.startGame) + lobbySetupEstimateTiming.gameRevealMs;
  return total;
}

/** Deterministic estimate for the custom-room automation path. */
export function estimateCustomLobbySetupMs(room: CustomLobbyRoom): number {
  const actions = aoe2UiManifest.actions;
  const mapPicker = aoe2UiManifest.mapPicker;
  const catalogMap = enabledMapCatalogEntries.find((entry) =>
    entry.id === room.map?.id || entry.gameMapName === room.map?.gameName
  );
  const usesCustomContent = Boolean(room.dataMod || room.map?.kind === "scenario")
    || (room.map ? (catalogMap ? Boolean(catalogMap.isCustomMap) : true) : false);
  const selectsPlayerSettings = room.map?.kind !== "scenario" || room.source === "weekly";
  const guestCount = room.players.filter((player) => !player.host).length;
  const sequentialGuestCount = guestCount > 1 ? guestCount : 1;

  let total = lobbySetupTiming.hostLobbyAutomationOverheadMs
    + lobbySetupEstimateTiming.hostSetupSafetyMarginMs;
  if (room.source === "weekly") total += lobbySetupTiming.hostLobbyAutomationSettleMs;
  total += (multiplayerTabCount * multiplayerTabDelayMs) + actions.multiplayer.settleMs;
  total += actionDuration(actions.hostGame) + clickEnterDelayMs;
  total += actionDuration(actions.createLobby);
  total += defaultClickDurationMs() + lobbySetupTiming.resetFocusMs + lobbySetupTiming.resetConfirmationMs;
  total += defaultClickDurationMs() + mapPicker.openSettleMs;
  total += defaultClickDurationMs() + mapPicker.styleMenuSettleMs;
  total += defaultClickDurationMs() + mapPicker.styleSelectionSettleMs;
  total += defaultClickDurationMs() + mapPicker.searchSettleMs;
  total += defaultClickDurationMs() + mapPicker.selectionSettleMs;
  if (room.map?.kind !== "scenario") total += customLobbySelectSettingsDuration(room);
  const aiSlots = room.map?.kind === "scenario" ? [] : (room.aiSlots ?? []);
  total += aiSlots.length * (
    defaultClickDurationMs()
    + aoe2UiManifest.playerTypeSlotDropdowns.openSettleMs
    + 15
    + aoe2UiManifest.playerTypeSlotDropdowns.selectionSettleMs
  );
  total += actionDuration(actions.copyLobbyUri) + lobbySetupTiming.clipboardReadMs;
  for (const ai of aiSlots) {
    total += civilizationSelectionDuration({ mode: "pick", civilization: ai.civilization });
    if (ai.team >= 1 && ai.team <= 4) {
      total += (ai.team + 1) * (defaultClickDurationMs() + 150);
    }
  }
  total += lobbySetupTiming.lobbyMetadataMs
    + (lobbySetupEstimateTiming.guestJoinMs * sequentialGuestCount);

  if (selectsPlayerSettings) {
    // Each machine configures its own slot concurrently, so budget for one
    // selection path rather than multiplying the estimate by player count.
    total += civilizationSelectionDuration({ mode: "pick", civilization: "Random" });
  }
  total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);
  if (usesCustomContent) {
    total += lobbySetupEstimateTiming.customTransferReadyAdjustmentMs;
    total += lobbySetupTiming.customMapTransferPollMs + actions.guestReady.settleMs;
    total += contentConfirmationKeyDelayMs + actions.confirmGuestContent.settleMs;
    total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);
  } else {
    total += lobbySetupTiming.customMapTransferPollMs;
  }
  total += actionDuration(actions.guestReady);
  total += lobbySetupTiming.hostReadyToStartMs + lobbySetupTiming.startGameSettleMs;
  total += actionDuration(actions.startGame) + lobbySetupEstimateTiming.gameRevealMs;
  return total;
}

function customLobbySelectSettingsDuration(room: CustomLobbyRoom): number {
  const settings = { ...defaultCustomLobbyGameSettings, ...room.gameSettings };
  const definitions = [
    ["mapSize", customLobbyMapSizes],
    ["aiDifficulty", customLobbyAiDifficulties],
    ["startingResources", customLobbyStartingResources],
    ["populationLimit", customLobbyPopulationLimits],
    ["gameSpeed", customLobbyGameSpeeds],
    ["revealMap", customLobbyRevealMapOptions],
    ["startingAge", customLobbyStartingAges],
    ["endingAge", customLobbyEndingAges],
    ["treatyLength", customLobbyTreatyLengths],
    ["victoryCondition", customLobbyVictoryConditions]
  ] as const;
  const timing = aoe2UiManifest.lobbySelectSettings;
  return definitions.reduce((total, [key, options]) => {
    if (settings[key] === defaultCustomLobbyGameSettings[key]) return total;
    const typedOptions = options as readonly (typeof settings)[typeof key][];
    const index = typedOptions.indexOf(settings[key]);
    const scrollSteps = index === typedOptions.length - 1
      ? 0
      : Math.max(0, index - (timing.visibleRows - 1));
    return total + defaultClickDurationMs() + timing.openSettleMs
      + scrollSteps * (defaultClickDurationMs() + timing.scrollSettleMs)
      + (index === typedOptions.length - 1 ? 15 : defaultClickDurationMs())
      + timing.selectionSettleMs;
  }, 0);
}

function civilizationSelectionDuration(preference?: CivilizationPreference): number {
  if (!preference) return 0;
  let total = defaultClickDurationMs() + aoe2UiManifest.civilizationSlotButtons.settleMs;
  if (preference.mode === "pick") {
    total += defaultClickDurationMs() + aoe2UiManifest.civilizationPicker.searchSettleMs;
  }
  total += aoe2UiManifest.civilizationGrid.hoverMs
    + aoe2UiManifest.civilizationGrid.holdMs
    + aoe2UiManifest.civilizationPicker.selectionSettleMs;
  total += aoe2UiManifest.actions.confirmCivilization.settleMs;
  return total;
}

function actionDuration(action: Aoe2UiAction): number {
  return (action.hoverMs ?? defaultHoverMs) + (action.holdMs ?? defaultHoldMs) + action.settleMs;
}

function defaultClickDurationMs(): number {
  return defaultHoverMs + defaultHoldMs;
}

function flowKind(match: MatchSession): FlowKind {
  return match.selectedMap && isCustomMapForQueue(match.selectedMap.id, match.queue.id)
    ? "custom"
    : "standard";
}

function loadHistory(): TimingHistory {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Partial<TimingHistory>;
    return {
      standard: validResiduals(parsed.standard),
      custom: validResiduals(parsed.custom)
    };
  } catch {
    return { standard: [], custom: [] };
  }
}

function validResiduals(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((item): item is number => Number.isFinite(item) && Math.abs(item) <= 120_000).slice(-historyLimit)
    : [];
}

function median(values: number[]): number {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[middle];
}
