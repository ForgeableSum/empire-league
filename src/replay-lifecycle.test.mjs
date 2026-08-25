import assert from "node:assert/strict";
import test from "node:test";
import {
  shouldMonitorReplayMainMenu,
  shouldProcessReplayCandidate
} from "./shared/replayLifecycle.ts";

test("ranked main-menu recovery remains armed after replay growth becomes quiet", () => {
  assert.equal(shouldMonitorReplayMainMenu(false, false), true);
  assert.equal(shouldMonitorReplayMainMenu(true, false), false);
  assert.equal(shouldMonitorReplayMainMenu(true, true), true);
});

test("the first replay candidate survives the ready-to-in-game transition", () => {
  assert.equal(shouldProcessReplayCandidate("match-short-2v2", "match-short-2v2", "ready"), true);
  assert.equal(shouldProcessReplayCandidate("match-short-2v2", "match-short-2v2", "in_game"), true);
});

test("replay candidates cannot leak across matches or reopen a completed match", () => {
  assert.equal(shouldProcessReplayCandidate("match-new", "match-old", "in_game"), false);
  assert.equal(shouldProcessReplayCandidate("match-new", "match-new", "completed"), false);
  assert.equal(shouldProcessReplayCandidate(undefined, "match-new", "in_game"), false);
});
