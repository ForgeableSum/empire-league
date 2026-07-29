export function winningProfileIdsForReplay(replay) {
  return Array.isArray(replay?.winningProfileIds) && replay.winningProfileIds.length > 0
    ? replay.winningProfileIds
    : [replay?.winnerProfileId];
}

export function replayPlayerWon(replay, profileId) {
  return winningProfileIdsForReplay(replay).includes(profileId);
}
