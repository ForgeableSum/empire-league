export function shouldMonitorReplayMainMenu(observedGrowth: boolean, replayQuietEnough: boolean): boolean {
  return !observedGrowth || replayQuietEnough;
}

export function shouldProcessReplayCandidate(
  activeMatchId: string | undefined,
  candidateMatchId: string | undefined,
  queueStatus: string
): boolean {
  return Boolean(activeMatchId)
    && (!candidateMatchId || candidateMatchId === activeMatchId)
    && queueStatus !== "completed";
}
