export const cursorAutomationEnabled = true;
export const aoe2PhysicalClickSettleMs = 500;
export const contentConfirmationKeyDelayMs = 150;
export const customContentHostRecoveryMs = 4000;

// When enabled, successful lobby setups calibrate future countdowns using
// locally stored timing history. Keep disabled for deterministic countdowns.
export const adaptiveLobbyTimingEnabled = false;

export const lobbySetupTiming = {
  hostLobbyAutomationSettleMs: 2000,
  // Measured allowance for host-side lobby controls and verification waits
  // that are not represented by the manifest's individual click timings.
  hostLobbyAutomationOverheadMs: 9000,
  multiplayerMenuMs: 1000,
  hostGameMenuMs: 2000,
  lobbyCreationMs: 8000,
  // Reset applies immediately without a confirmation dialog and can keep
  // AoE2's window thread busy beyond the initial settle delay. Do not send the
  // unnecessary Enter input: probe the thread harmlessly until reset completes.
  resetSettleMs: 1_000,
  // Countdown compatibility values describe the same direct-reset wait and
  // stable-read allowance. They are not a dialog focus/confirmation action.
  resetFocusMs: 1_000,
  resetConfirmationMs: 500,
  resetProbeTimeoutMs: 5_000,
  resetProbeAttempts: 2,
  resetProbeRetryMs: 250,
  resetVerificationPollMs: 250,
  resetVerificationTimeoutMs: 5_000,
  resetStableLobbyReads: 2,
  clipboardReadMs: 800,
  lobbyMetadataMs: 700,
  guestJoinMs: 13000,
  guestReadySettleMs: 2000,
  customMapTransferPollMs: 1500,
  customMapTransferTimeoutMs: 60_000,
  hostReadySettleMs: 2000,
  hostReadyToStartMs: 1000,
  startGameSettleMs: 2000,
  revealAfterStartMs: 8000
} as const;

// Expected durations used only by the setup countdown. Keep these separate
// from the longer runtime deadlines above so ordinary successful paths are
// estimated accurately without weakening failure detection or fallbacks.
export const lobbySetupEstimateTiming = {
  hostSetupSafetyMarginMs: 3_000,
  guestJoinMs: 5_000,
  customTransferReadyAdjustmentMs: 5_000,
  gameRevealMs: 2_000
} as const;

export const lobbySetupRetryTiming = {
  beforeClipboardRetryMs: 1000,
  clipboardReadMs: lobbySetupTiming.clipboardReadMs
} as const;
