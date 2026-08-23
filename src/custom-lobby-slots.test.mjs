import assert from "node:assert/strict";
import test from "node:test";
import {
  customLobbyAiSlots,
  customLobbyOccupiedCount,
  normalizeCustomLobbyHumanSlots
} from "./custom-lobby-slots.mjs";

function room(players, aiSlots = []) {
  return { hostId: "host", maxPlayers: 8, players, aiSlots };
}

test("AI reservations count toward custom lobby capacity", () => {
  const lobby = room([
    { id: "host", slot: 1 },
    { id: "guest", slot: 4 }
  ], [
    { slot: 2 },
    { slot: 3 }
  ]);
  assert.equal(customLobbyOccupiedCount(lobby), 4);
});

test("human slots are assigned around AI reservations in join order", () => {
  const host = { id: "host", slot: 7 };
  const firstGuest = { id: "first", slot: 6 };
  const secondGuest = { id: "second", slot: 8 };
  const lobby = room([host, firstGuest, secondGuest], [{ slot: 2 }, { slot: 4 }]);

  normalizeCustomLobbyHumanSlots(lobby);

  assert.equal(host.slot, 1);
  assert.equal(firstGuest.slot, 3);
  assert.equal(secondGuest.slot, 5);
});

test("removing an AI reservation compacts later human slots", () => {
  const guest = { id: "guest", slot: 3 };
  const lobby = room([{ id: "host", slot: 1 }, guest], [{ slot: 2 }]);
  lobby.aiSlots = [];

  normalizeCustomLobbyHumanSlots(lobby);

  assert.equal(guest.slot, 2);
  assert.deepEqual(customLobbyAiSlots(lobby), []);
});

test("older rooms without AI data are normalized to an empty AI roster", () => {
  const lobby = { hostId: "host", maxPlayers: 2, players: [{ id: "host", slot: 1 }] };
  assert.deepEqual(customLobbyAiSlots(lobby), []);
  assert.deepEqual(lobby.aiSlots, []);
});
