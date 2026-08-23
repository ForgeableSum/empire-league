export function customLobbyAiSlots(room) {
  room.aiSlots ??= [];
  return room.aiSlots;
}

export function customLobbyOccupiedCount(room) {
  return room.players.length + customLobbyAiSlots(room).length;
}

export function normalizeCustomLobbyHumanSlots(room) {
  const host = room.players.find((player) => player.id === room.hostId);
  if (host) host.slot = 1;
  const aiSlotNumbers = new Set(customLobbyAiSlots(room).map((ai) => ai.slot));
  const availableGuestSlots = Array.from({ length: room.maxPlayers - 1 }, (_, index) => index + 2)
    .filter((slot) => !aiSlotNumbers.has(slot));
  room.players
    .filter((player) => player.id !== room.hostId)
    .sort((left, right) => left.slot - right.slot)
    .forEach((player, index) => {
      player.slot = availableGuestSlots[index];
    });
}
