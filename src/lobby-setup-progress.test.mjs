import assert from "node:assert/strict";
import test from "node:test";
import { LobbySetupProgressGate, lobbySetupProgressKey } from "./shared/lobbySetupProgress.ts";

test("only completed input steps relay progress", () => {
  for (const message of [
    "INPUT_GUARD|GUARD_HEALTH|PhysicalMoves=1",
    "SEQUENCE|Id=1|STEP_VERIFY|Create Lobby|State=unknown",
    "CIV_SELECT|Step=TileVerify|State=not-selected",
    "CIV_SELECT|Step=Tile|WINDOW_NOT_FOUND",
    "SEQUENCE|Id=1|RESET_SETTINGS|Phase=VerifyLobby|PIXEL_READ_FAILED"
  ]) assert.equal(lobbySetupProgressKey(message), null);
  assert.equal(lobbySetupProgressKey("SEQUENCE|Id=1|STEP|Host Game|SENT|Mode=WindowMessage"), "step:Host Game");
});

test("retries and rapid inputs cannot produce continuous keepalives", () => {
  const gate = new LobbySetupProgressGate();
  assert.equal(gate.accept("CIV_SELECT|Step=Tile|Attempt=1|SENT|Mode=WindowMessage", 0), true);
  assert.equal(gate.accept("CIV_SELECT|Step=Tile|Attempt=2|SENT|Mode=WindowMessage", 6000), false);
  assert.equal(gate.accept("CIV_SELECT|Step=ConfirmClick|SENT|Mode=WindowMessage", 1000), false);
  assert.equal(gate.accept("CIV_SELECT|Step=SearchText|SENT|Mode=WindowMessage", 7000), true);
});

test("slow host setup keeps the waiting guest alive, then expires if progress stops", () => {
  const gate = new LobbySetupProgressGate();
  const timeout = 97110;
  let deadline = 4154 + timeout;
  // Relative timings from the September 8 failure: lobby creation succeeded,
  // but civilization selection was still running when the guest timed out.
  const steps = [
    [13000, "SEQUENCE|Id=1|STEP|Multiplayer|SENT|Mode=WindowMessage"],
    [20000, "SEQUENCE|Id=1|STEP|Host Game|SENT|Mode=WindowMessage"],
    [35000, "SEQUENCE|Id=1|STEP|Create Lobby|SENT|Mode=WindowMessage"],
    [81000, "MAP_SELECT|Step=Search|SENT|Mode=WindowMessageText"],
    [97000, "CIV_SELECT|Step=Open|SENT|Mode=WindowMessage"],
    [101000, "CIV_SELECT|Step=SearchFocus|SENT|Mode=WindowMessage"]
  ];
  for (const [now, message] of steps) {
    assert.ok(now < deadline);
    if (gate.accept(message, now)) deadline = now + timeout;
  }
  assert.ok(101788 < deadline, "opponent must not cancel while the host advances");
  assert.equal(gate.accept("INPUT_GUARD|GUARD_HEALTH", deadline), false);
  assert.equal(gate.accept(steps.at(-2)[1], deadline), false);
  assert.equal(deadline, 97000 + timeout, "no progress means the deadline remains finite");
  assert.equal(new LobbySetupProgressGate().accept(steps[0][1], 0), true, "new matches reset deduplication");
});
