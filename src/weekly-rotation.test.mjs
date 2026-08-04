import test from "node:test";
import assert from "node:assert/strict";
import { currentWeeklyMode, weeklyRotation } from "./weekly-rotation.mjs";

test("rotates at exactly 00:00 UTC each Monday", () => {
  const before = currentWeeklyMode(Date.parse("2026-08-09T23:59:59.999Z"));
  const after = currentWeeklyMode(Date.parse("2026-08-10T00:00:00.000Z"));
  assert.equal(before.id, "ffa-nomad");
  assert.equal(after.id, "ffa-arena");
  assert.notEqual(before.rotationId, after.rotationId);
  assert.equal(before.endsAt, after.startsAt);
});

test("rotation contains the three FFA maps in order and repeats", () => {
  const rotation = weeklyRotation(Date.parse("2026-08-03T12:00:00Z"));
  assert.deepEqual(rotation.map((mode) => mode.id), ["ffa-nomad", "ffa-arena", "ffa-black-forest"]);
  assert.equal(currentWeeklyMode(Date.parse("2026-08-24T00:00:00Z")).id, "ffa-nomad");
  assert.ok(rotation.every((mode) => mode.playerCount === 8));
});
