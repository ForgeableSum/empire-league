import catalog from "./data/maps.json" with { type: "json" };
import type { MapDefinition, MapGroupDefinition, MapGroupId } from "./contracts/matchmaking.js";

export interface MapCatalogEntry extends Omit<MapDefinition, "thumbnailUrl"> {
  gameMapName: string;
  lobbyPickerResultIndex: number;
  isCustomMap?: boolean;
  groupId: MapGroupId;
  imageAsset: string;
  wikiUrl: string;
}

export interface MapCatalog {
  version: number;
  groups: MapGroupDefinition[];
  maps: MapCatalogEntry[];
}

export const mapCatalog = catalog as MapCatalog;
export const mapCatalogById = new Map(mapCatalog.maps.map((map) => [map.id, map]));

export function getCatalogMap(mapId: string): MapCatalogEntry | undefined {
  return mapCatalogById.get(mapId);
}

export function selectMapFromQueues(
  firstQueue: { mapPool: MapDefinition[]; mapPreferences?: { favoriteMapIds: Partial<Record<MapGroupId, string>> } },
  secondQueue: { mapPool: MapDefinition[]; mapPreferences?: { favoriteMapIds: Partial<Record<MapGroupId, string>> } },
  random: () => number = Math.random
): MapDefinition | undefined {
  const secondMapIds = new Set(secondQueue.mapPool.map((map) => map.id));
  const sharedMaps = firstQueue.mapPool.filter((map) => secondMapIds.has(map.id));
  if (sharedMaps.length === 0) return undefined;
  const firstFavorites = new Set(Object.values(firstQueue.mapPreferences?.favoriteMapIds ?? {}));
  const secondFavorites = new Set(Object.values(secondQueue.mapPreferences?.favoriteMapIds ?? {}));
  const mutualFavorites = sharedMaps.filter((map) => firstFavorites.has(map.id) && secondFavorites.has(map.id));
  if (mutualFavorites.length > 0) {
    return mutualFavorites[Math.floor(random() * mutualFavorites.length)];
  }
  const weightedMaps = sharedMaps.flatMap((map) => Array.from(
    { length: 1 + Number(firstFavorites.has(map.id)) + Number(secondFavorites.has(map.id)) },
    () => map
  ));
  return weightedMaps[Math.floor(random() * weightedMaps.length)];
}
