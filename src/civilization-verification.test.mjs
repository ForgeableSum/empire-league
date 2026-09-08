import assert from "node:assert/strict";
import test from "node:test";
import { verifyCivilizationCapture } from "./main/civilizationVerification.ts";

const unreadable = { state: "unknown", detail: "State=unknown|Reason=PIXEL_READ_FAILED" };
function fixture(read) {
  let elapsed = 0;
  const logs = [];
  return {
    read, phase: "tile", assertActive() {},
    log: (message) => logs.push(message), logs,
    now: () => elapsed,
    sleep: async (ms) => { elapsed += ms; }
  };
}

test("Turks and Random recover from unreadable captures without another input", async () => {
  for (const phase of ["Turks", "Random"]) {
    let reads = 0;
    const selected = { state: "selected", detail: "State=selected|BrightSamples=6" };
    const options = fixture(() => ++reads <= 3 ? unreadable : selected);
    options.phase = phase;
    assert.equal(await verifyCivilizationCapture(options), selected);
    assert.equal(reads, 4);
    assert.equal(options.now(), 300);
    assert.match(options.logs.at(-1), /Event=Recovered/);
  }
});

test("persistent capture failure reports capture timeout rather than tile unavailability", async () => {
  const options = fixture(() => unreadable);
  await assert.rejects(verifyCivilizationCapture(options), /because screen capture failed/);
  assert.equal(options.now(), 5000);
  assert.match(options.logs.at(-1), /Event=Timeout/);
});

test("readable unselected or unknown tiles preserve existing selection decisions", async () => {
  for (const state of ["not-selected", "unknown"]) {
    const result = { state, detail: `State=${state}|BrightSamples=0|GraySamples=2` };
    const options = fixture(() => result);
    assert.equal(await verifyCivilizationCapture(options), result);
    assert.equal(options.now(), 0);
  }
});

test("match cancellation stops capture retry before the next read", async () => {
  let reads = 0;
  const options = fixture(() => { reads++; return unreadable; });
  options.assertActive = () => { if (options.now() > 0) throw new Error("Lobby setup cancelled."); };
  await assert.rejects(verifyCivilizationCapture(options), /cancelled/);
  assert.equal(reads, 1);
});

test("picker-close verification also recovers before any confirmation fallback", async () => {
  let reads = 0;
  const closed = { state: "closed", detail: "State=closed" };
  const options = fixture(() => ++reads === 1 ? unreadable : closed);
  assert.equal(await verifyCivilizationCapture(options), closed);
});
