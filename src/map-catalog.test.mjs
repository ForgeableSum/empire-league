import assert from "node:assert/strict";
import test from "node:test";
import { normalizeQueueMapPreferences, selectMapForMatch } from "./map-catalog.mjs";

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
    name: "Arabia",
    style: "open",
    thumbnailUrl: ""
  });
  assert.equal(normalized.mapCatalogVersion, 1);
});

test("rejects unknown maps and favorites that are not selected", () => {
  assert.throws(() => queue(["made-up-map"]), /unknown map id/);
  assert.throws(() => queue(["arabia"], { "land-open": "atacama" }), /must be enabled/);
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
