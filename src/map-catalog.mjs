import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(new URL("./shared/data/maps.json", import.meta.url), "utf8"));
const enabledMaps = catalog.maps.filter((map) => map.enabled !== false);
const mapsById = new Map(enabledMaps.map((map) => [map.id, map]));
const groupsById = new Map(catalog.groups.map((group) => [group.id, group]));

export const publicMapCatalog = Object.freeze({
  version: catalog.version,
  groups: catalog.groups,
  maps: enabledMaps
});

function canonicalMap(map) {
  return {
    id: map.id,
    name: map.name,
    style: map.style,
    thumbnailUrl: ""
  };
}

export function normalizeQueueMapPreferences(queue) {
  if (!queue || typeof queue !== "object") throw new Error("queue is required");
  if (!Array.isArray(queue.mapPool) || queue.mapPool.length === 0) {
    throw new Error("at least one selected map is required");
  }

  const selectedIds = [];
  for (const submittedMap of queue.mapPool) {
    const mapId = typeof submittedMap === "string" ? submittedMap : submittedMap?.id;
    if (typeof mapId !== "string" || !mapsById.has(mapId)) {
      throw new Error(`unknown map id: ${String(mapId ?? "")}`);
    }
    if (!selectedIds.includes(mapId)) selectedIds.push(mapId);
  }

  const selectedMaps = selectedIds.map((mapId) => mapsById.get(mapId));
  const submittedPreferences = queue.mapPreferences;
  const derivedGroupIds = [...new Set(selectedMaps.map((map) => map.groupId))];
  const enabledGroupIds = submittedPreferences?.enabledGroupIds === undefined
    ? derivedGroupIds
    : submittedPreferences.enabledGroupIds;

  if (!Array.isArray(enabledGroupIds)
    || enabledGroupIds.some((groupId) => !groupsById.has(groupId))
    || new Set(enabledGroupIds).size !== enabledGroupIds.length) {
    throw new Error("enabled map groups are invalid");
  }
  if (selectedMaps.some((map) => !enabledGroupIds.includes(map.groupId))) {
    throw new Error("selected maps must belong to enabled groups");
  }

  const submittedFavorites = {
    ...(submittedPreferences?.favoriteMapIds ?? {})
  };
  if (queue.favoriteMapId && Object.keys(submittedFavorites).length === 0) {
    const legacyFavorite = mapsById.get(queue.favoriteMapId);
    if (legacyFavorite) submittedFavorites[legacyFavorite.groupId] = legacyFavorite.id;
  }

  const favoriteMapIds = {};
  for (const [groupId, mapId] of Object.entries(submittedFavorites)) {
    const map = mapsById.get(mapId);
    if (!groupsById.has(groupId) || !map || map.groupId !== groupId) {
      throw new Error(`favorite map for ${groupId} is invalid`);
    }
    if (!enabledGroupIds.includes(groupId) || !selectedIds.includes(mapId)) {
      throw new Error(`favorite map ${mapId} must be enabled`);
    }
    favoriteMapIds[groupId] = mapId;
  }

  return {
    ...queue,
    mapPool: selectedMaps.map(canonicalMap),
    mapCatalogVersion: catalog.version,
    mapPreferences: {
      enabledGroupIds,
      favoriteMapIds
    },
    favoriteMapId: Object.values(favoriteMapIds)[0]
  };
}

export function selectMapForMatch(firstQueue, secondQueue, random = Math.random) {
  const secondMapIds = new Set(secondQueue.mapPool.map((map) => map.id));
  const sharedMaps = firstQueue.mapPool.filter((map) => secondMapIds.has(map.id));
  if (sharedMaps.length === 0) return undefined;

  const firstFavorites = new Set(Object.values(firstQueue.mapPreferences?.favoriteMapIds ?? {}));
  const secondFavorites = new Set(Object.values(secondQueue.mapPreferences?.favoriteMapIds ?? {}));
  const mutualFavorites = sharedMaps.filter((map) => firstFavorites.has(map.id) && secondFavorites.has(map.id));
  if (mutualFavorites.length > 0) {
    return mutualFavorites[Math.floor(random() * mutualFavorites.length)];
  }
  const weightedMaps = sharedMaps.flatMap((map) => {
    const weight = 1 + Number(firstFavorites.has(map.id)) + Number(secondFavorites.has(map.id));
    return Array.from({ length: weight }, () => map);
  });
  return weightedMaps[Math.floor(random() * weightedMaps.length)];
}
