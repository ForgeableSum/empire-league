import type { AppState } from "../state/types";

const rankedLobbyTransitionStatuses = new Set<AppState["queueStatus"]>([
  "creating_lobby",
  "waiting_for_opponent",
  "verifying_lobby",
  "ready"
]);

export function isRankedInputGuardActive(state: AppState): boolean {
  return state.queueStatus === "match_found"
    || state.queueStatus === "accepting"
    || (rankedLobbyTransitionStatuses.has(state.queueStatus) && !state.error);
}

export function isExternalNavigationLocked(
  state: AppState,
  lobbyAutomationActive: boolean,
  customLobbyAutomationActive: boolean
): boolean {
  return lobbyAutomationActive
    || customLobbyAutomationActive
    || state.transitionInputLocked
    || isRankedInputGuardActive(state);
}
