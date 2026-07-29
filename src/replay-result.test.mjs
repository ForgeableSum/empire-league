import assert from "node:assert/strict";
import test from "node:test";
import { replayPlayerWon, winningProfileIdsForReplay } from "./replay-result.mjs";

test("resignation-only 1v1 falls back to winnerProfileId", () => {
  const replay = { winnerProfileId: 123, winningProfileIds: [] };
  assert.deepEqual(winningProfileIdsForReplay(replay), [123]);
  assert.equal(replayPlayerWon(replay, 123), true);
  assert.equal(replayPlayerWon(replay, 456), false);
});

test("completed team results use every winning profile", () => {
  const replay = { winnerProfileId: 123, winningProfileIds: [123, 456] };
  assert.equal(replayPlayerWon(replay, 123), true);
  assert.equal(replayPlayerWon(replay, 456), true);
  assert.equal(replayPlayerWon(replay, 789), false);
});
