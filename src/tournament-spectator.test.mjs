import assert from "node:assert/strict";
import test from "node:test";
import { tournamentSpectatorUri } from "./tournament-spectator.mjs";

test("converts an AoE2 lobby URI into its spectator URI", () => {
  assert.equal(tournamentSpectatorUri("aoe2de://0/123456789"), "aoe2de://1/123456789");
});

test("rejects malformed or already-converted lobby URIs", () => {
  assert.equal(tournamentSpectatorUri("aoe2de://1/123456789"), null);
  assert.equal(tournamentSpectatorUri("https://example.com/123456789"), null);
  assert.equal(tournamentSpectatorUri(undefined), null);
});
