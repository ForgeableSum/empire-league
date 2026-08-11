import type { MockServiceConfig } from "../state/types";

export const defaultMockServiceConfig: MockServiceConfig = {
  queueWaitMs: 6000,
  opponentAcceptDelayMs: 2500,
  lobbyCreationDelayMs: 0,
  opponentJoinDelayMs: 1200,
  lobbyVerificationDelayMs: 1000,
  matchDurationMs: 12000,
  resultVerificationDelayMs: 1300,
  forceQueueFailure: false,
  forceOpponentDecline: false,
  forceGameNotInstalled: false,
  forceGameLaunchFailure: false,
  forceLobbyCreationFailure: false,
  forceLobbyVerificationFailure: false,
  forceOpponentJoinTimeout: false,
  forceResultVerificationFailure: false,
  forcedResult: undefined
};
