export function tournamentSpectatorUri(lobbyUri) {
  const match = /^aoe2de:\/\/0\/(\d+)$/.exec(lobbyUri ?? "");
  return match ? `aoe2de://1/${match[1]}` : null;
}
