import assert from "node:assert/strict";
import test from "node:test";
import { createTournamentChatStore } from "./tournament-chat.mjs";

test("retains the full in-memory history in message order", () => {
  const chats = createTournamentChatStore();
  for (let index = 0; index < 150; index += 1) {
    chats.add("tournament-1", { id: String(index) });
  }
  const history = chats.history("tournament-1");
  assert.equal(history.length, 150);
  assert.equal(history[0].id, "0");
  assert.equal(history.at(-1).id, "149");
});

test("keeps tournament histories isolated and clears them explicitly", () => {
  const chats = createTournamentChatStore();
  chats.add("tournament-1", { id: "one" });
  chats.add("tournament-2", { id: "two" });
  chats.clear("tournament-1");
  assert.deepEqual(chats.history("tournament-1"), []);
  assert.deepEqual(chats.history("tournament-2"), [{ id: "two" }]);
});
