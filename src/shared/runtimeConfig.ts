export const cursorAutomationEnabled = true;

export const lobbySetupTiming = {
  multiplayerMenuMs: 1000,
  hostGameMenuMs: 2000,
  lobbyCreationMs: 8000,
  resetFocusMs: 250,
  resetConfirmationMs: 1000,
  clipboardReadMs: 800,
  lobbyMetadataMs: 700,
  guestJoinMs: 10000,
  hostReadyToStartMs: 1000,
  revealAfterStartMs: 8000
} as const;

export const lobbySetupCountdownMs = Object.values(lobbySetupTiming)
  .reduce((total, milliseconds) => total + milliseconds, 0);

export const lobbySetupRetryTiming = {
  beforeClipboardRetryMs: 1000,
  clipboardReadMs: lobbySetupTiming.clipboardReadMs
} as const;
