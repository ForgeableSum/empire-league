import assert from "node:assert/strict";
import test from "node:test";
import { chooseRandomBracketSlot } from "./tournament-bracket.mjs";

test("chooses from only unoccupied bracket slots", () => {
  assert.equal(chooseRandomBracketSlot(8, [1, 2, 4, 5, 6, 7, 8], () => 0.4), 3);
});

test("uses randomness across available bracket slots", () => {
  assert.equal(chooseRandomBracketSlot(8, [2, 4, 6, 8], () => 0), 1);
  assert.equal(chooseRandomBracketSlot(8, [2, 4, 6, 8], () => 0.999), 7);
});

test("prioritizes a random existing player who is waiting for an opponent", () => {
  assert.equal(chooseRandomBracketSlot(8, [1, 3, 4], () => 0), 2);
});

test("uses any open slot when all existing players already have opponents", () => {
  assert.equal(chooseRandomBracketSlot(8, [1, 2, 5, 6], () => 0), 3);
  assert.equal(chooseRandomBracketSlot(8, [1, 2, 5, 6], () => 0.999), 8);
});

test("returns null for a full bracket", () => {
  assert.equal(chooseRandomBracketSlot(4, [1, 2, 3, 4]), null);
});
