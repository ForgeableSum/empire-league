import { aoe2UiManifest } from "./aoe2UiManifest.js";

export const cursorAutomationEnabled = true;
export const matchmakerEventPollMs = 400;
export const aoe2PhysicalClickSettleMs = 500;

export const lobbySetupTiming = {
  hostLobbyAutomationSettleMs: 2000,
  multiplayerMenuMs: 1000,
  hostGameMenuMs: 2000,
  lobbyCreationMs: 8000,
  resetFocusMs: 250,
  resetConfirmationMs: 1000,
  clipboardReadMs: 800,
  lobbyMetadataMs: 700,
  guestJoinMs: 10000,
  guestReadySettleMs: 2000,
  customMapTransferPollMs: 1500,
  customMapTransferTimeoutMs: 60_000,
  hostReadySettleMs: 2000,
  hostReadyToStartMs: 1000,
  startGameSettleMs: 2000,
  revealAfterStartMs: 8000
} as const;

// This is a user-facing estimate, not the watchdog deadline. Keep maximum
// retry/transfer timeouts out of it so a slow-path safety limit is not shown
// as the expected start time.
export const lobbySetupCountdownMs = [
  lobbySetupTiming.hostLobbyAutomationSettleMs,
  lobbySetupTiming.multiplayerMenuMs,
  lobbySetupTiming.hostGameMenuMs,
  lobbySetupTiming.lobbyCreationMs,
  lobbySetupTiming.resetFocusMs,
  lobbySetupTiming.resetConfirmationMs,
  lobbySetupTiming.clipboardReadMs,
  lobbySetupTiming.lobbyMetadataMs,
  lobbySetupTiming.guestJoinMs,
  lobbySetupTiming.guestReadySettleMs,
  lobbySetupTiming.hostReadySettleMs,
  lobbySetupTiming.hostReadyToStartMs,
  lobbySetupTiming.startGameSettleMs,
  lobbySetupTiming.revealAfterStartMs
].reduce((total, milliseconds) => total + milliseconds, 0);

const customMapFlowAdditionalMs =
  aoe2UiManifest.mapPicker.styleMenuSettleMs
  + aoe2UiManifest.mapPicker.styleSelectionSettleMs
  + (lobbySetupTiming.customMapTransferPollMs * 2)
  + (aoe2UiManifest.actions.guestReady.settleMs * 2)
  + aoe2UiManifest.actions.confirmGuestContent.settleMs
  + aoe2PhysicalClickSettleMs
  + lobbySetupTiming.hostReadySettleMs
  + aoe2UiManifest.actions.hostReady.settleMs
  + matchmakerEventPollMs;

export const customMapLobbySetupCountdownMs =
  lobbySetupCountdownMs + customMapFlowAdditionalMs;

export const lobbySetupRetryTiming = {
  beforeClipboardRetryMs: 1000,
  clipboardReadMs: lobbySetupTiming.clipboardReadMs
} as const;
