import { aoe2UiManifest, type Aoe2UiAction } from "../../shared/aoe2UiManifest";
import type { CivilizationPreference, MatchSession } from "../../shared/contracts/matchmaking";
import {
  aoe2PhysicalClickSettleMs,
  lobbySetupTiming,
  matchmakerEventPollMs
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
  const residuals = loadHistory()[flowKind(match)];
  if (!residuals.length) return baseline;
  return Math.max(10_000, baseline + median(residuals));
}

export function recordLobbySetupDuration(match: MatchSession, actualDurationMs: number): void {
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

  let total = lobbySetupTiming.hostLobbyAutomationSettleMs;
  total += (multiplayerTabCount * multiplayerTabDelayMs) + actions.multiplayer.settleMs;
  total += actionDuration(actions.hostGame) + clickEnterDelayMs;
  total += actionDuration(actions.createLobby);
  total += defaultClickDurationMs() + lobbySetupTiming.resetFocusMs + lobbySetupTiming.resetConfirmationMs;
  total += defaultClickDurationMs() + mapPicker.openSettleMs;
  if (custom) {
    total += defaultClickDurationMs() + mapPicker.styleMenuSettleMs;
    total += defaultClickDurationMs() + mapPicker.styleSelectionSettleMs;
  }
  total += defaultClickDurationMs() + mapPicker.searchSettleMs;
  total += defaultClickDurationMs() + mapPicker.selectionSettleMs;
  total += actionDuration(actions.copyLobbyUri) + lobbySetupTiming.clipboardReadMs;
  total += civilizationSelectionDuration(match.queue.civilizationPreference);
  total += lobbySetupTiming.lobbyMetadataMs + matchmakerEventPollMs;
  total += lobbySetupTiming.guestJoinMs + lobbySetupTiming.guestReadySettleMs;
  total += civilizationSelectionDuration(match.opponentCivilizationPreference);
  total += matchmakerEventPollMs;
  total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);
  total += matchmakerEventPollMs;

  if (custom) {
    total += lobbySetupTiming.customMapTransferPollMs + actions.guestReady.settleMs;
    total += aoe2PhysicalClickSettleMs + actions.confirmGuestContent.settleMs;
    total += matchmakerEventPollMs;
    total += lobbySetupTiming.hostReadySettleMs + actionDuration(actions.hostReady);
    total += lobbySetupTiming.customMapTransferPollMs;
  } else {
    total += lobbySetupTiming.customMapTransferPollMs;
  }

  total += actionDuration(actions.guestReady) + matchmakerEventPollMs;
  total += lobbySetupTiming.hostReadyToStartMs + lobbySetupTiming.startGameSettleMs;
  total += actionDuration(actions.startGame) + lobbySetupTiming.revealAfterStartMs;
  return total;
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
  return (aoe2UiManifest.mapPicker.customMapNames as readonly string[])
    .includes(match.selectedMap?.name ?? "")
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
