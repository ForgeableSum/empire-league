import assert from "node:assert/strict";
import test from "node:test";
import { normalizeQueueMapPreferences, publicMapCatalog, selectMapForMatch } from "./map-catalog.mjs";

function queue(mapIds, favoriteMapIds = {}) {
  return normalizeQueueMapPreferences({
    id: "ranked-rm-1v1",
    mapPool: mapIds.map((id) => ({ id, name: "untrusted client value", style: "nomad" })),
    mapPreferences: {
      enabledGroupIds: ["land-open"],
      favoriteMapIds
    }
  });
}

test("canonicalizes client map metadata against the catalog", () => {
  const normalized = queue(["arabia"]);
  assert.deepEqual(normalized.mapPool[0], {
    id: "arabia",
    name: "KotD6 Arabia EL",
    style: "open",
    thumbnailUrl: ""
  });
  assert.equal(normalized.mapCatalogVersion, 6);
});

test("uses built-in Arabia and Land Nomad for team games only", () => {
  const teamQueue = (mapIds) => normalizeQueueMapPreferences({
    ...queue(mapIds),
    id: "team-games",
    format: "team"
  });
  assert.deepEqual(teamQueue(["arabia", "land-nomad"]).mapPool.map((map) => map.name), [
    "Arabia",
    "Land Nomad"
  ]);
  assert.deepEqual(queue(["arabia", "land-nomad"]).mapPool.map((map) => map.name), [
    "KotD6 Arabia EL",
    "Land Nomad EL"
  ]);
});

test("every UI map defines its AoE2 lobby-picker metadata", () => {
  for (const map of publicMapCatalog.maps) {
    assert.equal(typeof map.description, "string", `${map.id} needs a description`);
    assert.ok(map.description.length > 0, `${map.id} needs a non-empty description`);
    assert.equal(typeof map.gameMapName, "string", `${map.id} needs a gameMapName`);
    assert.ok(map.gameMapName.length > 0, `${map.id} needs a non-empty gameMapName`);
    assert.equal(
      Number.isInteger(map.lobbyPickerResultIndex) && map.lobbyPickerResultIndex >= 0,
      true,
      `${map.id} needs a non-negative lobbyPickerResultIndex`
    );
  }
  assert.equal(
    new Set(publicMapCatalog.maps.map((map) => map.gameMapName)).size,
    publicMapCatalog.maps.length,
    "gameMapName values must be unique"
  );
});

test("ignores stale maps when recognized enabled maps remain", () => {
  const normalized = queue(["arabia", "made-up-map", "acropolis"], { "land-open": "acropolis" });
  assert.deepEqual(normalized.mapPool.map((map) => map.id), ["arabia"]);
  assert.deepEqual(normalized.ignoredMapIds, ["made-up-map", "acropolis"]);
  assert.deepEqual(normalized.mapPreferences.favoriteMapIds, {});
});

test("rejects queues with no recognized enabled maps and favorites that are not selected", () => {
  assert.throws(() => queue(["made-up-map"]), /no recognized enabled maps remain/);
  assert.throws(() => queue(["arabia"], { "land-open": "atacama" }), /must be enabled/);
});

test("keeps disabled maps out of the public catalog and rejects queues containing only disabled maps", () => {
  assert.equal(publicMapCatalog.maps.some((map) => map.id === "acropolis"), false);
  assert.equal(publicMapCatalog.maps.some((map) => map.id === "african-clearing"), true);
  assert.equal(publicMapCatalog.maps.some((map) => map.id === "gold-rush"), false);
  assert.equal(publicMapCatalog.maps.some((map) => map.id === "land-nomad"), true);
  assert.throws(() => queue(["acropolis"]), /no recognized enabled maps remain/);
  assert.throws(() => queue(["gold-rush"]), /no recognized enabled maps remain/);
});

test("rejects selected maps from disabled groups", () => {
  assert.throws(() => normalizeQueueMapPreferences({
    id: "ranked-rm-1v1",
    mapPool: [{ id: "arena" }],
    mapPreferences: {
      enabledGroupIds: ["land-open"],
      favoriteMapIds: {}
    }
  }), /enabled groups/);
});

test("a mutual favorite always wins over non-favorite shared maps", () => {
  const first = queue(["arabia", "atacama"], { "land-open": "atacama" });
  const second = queue(["arabia", "atacama"], { "land-open": "atacama" });
  assert.equal(selectMapForMatch(first, second, () => 0)?.id, "atacama");
  assert.equal(selectMapForMatch(first, second, () => 0.99)?.id, "atacama");
});
