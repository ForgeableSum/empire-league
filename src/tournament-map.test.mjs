import assert from "node:assert/strict";
import test from "node:test";
import { builtInTournamentMapId, tournamentMapFromInput } from "./tournament-map.mjs";

test("creates stable bounded ids for locally discovered built-in maps", () => {
  assert.equal(builtInTournamentMapId("Four Lakes"), "builtin:four-lakes");
  assert.equal(builtInTournamentMapId("  Mega-Random  "), "builtin:mega-random");
  assert.ok(builtInTournamentMapId("A".repeat(100)).length <= 64);
});

test("accepts catalog maps and matching discovered built-in map identities", () => {
  const catalog = [{ id: "arabia", gameMapName: "Arabia" }];
  assert.deepEqual(tournamentMapFromInput({ mapId: "arabia", mapName: "ignored" }, catalog), { id: "arabia", name: "Arabia" });
  assert.deepEqual(
    tournamentMapFromInput({ mapId: "builtin:four-lakes", mapName: "Four Lakes" }, catalog),
    { id: "builtin:four-lakes", name: "Four Lakes" }
  );
});

test("rejects mismatched or unsafe discovered map identities", () => {
  assert.equal(tournamentMapFromInput({ mapId: "builtin:arabia", mapName: "Arena" }, []), null);
  assert.equal(tournamentMapFromInput({ mapId: "builtin:bad", mapName: "Bad\nMap" }, []), null);
});
