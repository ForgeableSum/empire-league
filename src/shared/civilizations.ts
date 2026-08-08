import type { CivilizationPreference, MapGroupId } from "./contracts/matchmaking.js";

export const civilizations = [
  "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians",
  "Burgundians", "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians",
  "Ethiopians", "Franks", "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns",
  "Incas", "Italians", "Japanese", "Jurchens", "Khitans", "Khmer", "Koreans",
  "Lithuanians", "Magyars", "Malay", "Malians", "Mapuche", "Mayans", "Mongols", "Muisca",
  "Persians", "Poles", "Portuguese", "Romans", "Saracens", "Shu", "Sicilians", "Slavs",
  "Spanish", "Tatars", "Teutons", "Tupi", "Turks", "Vietnamese", "Vikings", "Wei", "Wu"
] as const;

/** Civilizations excluded from Empire League Classic Mode. */
export const nonClassicCivilizations = [
  "Chinese", "Incas", "Jurchens", "Khitans", "Koreans", "Mapuche", "Muisca", "Shu", "Tupi",
  "Vietnamese", "Wei", "Wu"
] as const;

/** The Empire League Classic Mode civilization pool. */
export const classicCivilizations = civilizations.filter(
  (civilization) => !nonClassicCivilizations.includes(
    civilization as typeof nonClassicCivilizations[number]
  )
);

export function rollCivilization(
  preference: CivilizationPreference | undefined,
  mapGroupId: MapGroupId | undefined,
  additionalBans: readonly string[] = [],
  random: () => number = Math.random
): CivilizationPreference | undefined {
  if (preference?.mode !== "random") return preference;
  const bans = mapGroupId === "land-open"
    ? preference.openLandBans
    : mapGroupId === "land-closed"
      ? preference.closedLandBans
      : [];
  const banned = new Set([...(bans ?? []), ...additionalBans]);
  const available = civilizations.filter((civilization) => !banned.has(civilization));
  return {
    mode: "pick",
    civilization: available[Math.floor(random() * available.length)]
  };
}
