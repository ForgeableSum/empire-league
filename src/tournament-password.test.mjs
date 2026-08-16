import assert from "node:assert/strict";
import test from "node:test";
import { hashTournamentPassword, tournamentPasswordMatches } from "./tournament-password.mjs";

test("tournament passwords match only the original value", async () => {
  const password = "wololo-secret";
  const stored = await hashTournamentPassword(password);

  assert.equal(await tournamentPasswordMatches(password, stored.salt, stored.hash), true);
  assert.equal(await tournamentPasswordMatches("wrong-password", stored.salt, stored.hash), false);
});

test("tournament password hashes use unique salts", async () => {
  const first = await hashTournamentPassword("same-password");
  const second = await hashTournamentPassword("same-password");

  assert.notEqual(first.salt, second.salt);
  assert.notEqual(first.hash, second.hash);
});
