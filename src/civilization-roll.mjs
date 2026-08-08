export const civilizations = [
  "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians",
  "Burgundians", "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians",
  "Ethiopians", "Franks", "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns",
  "Incas", "Italians", "Japanese", "Jurchens", "Khitans", "Khmer", "Koreans",
  "Lithuanians", "Magyars", "Malay", "Malians", "Mapuche", "Mayans", "Mongols", "Muisca",
  "Persians", "Poles", "Portuguese", "Romans", "Saracens", "Shu", "Sicilians", "Slavs",
  "Spanish", "Tatars", "Teutons", "Tupi", "Turks", "Vietnamese", "Vikings", "Wei", "Wu"
];

export const nonClassicCivilizations = [
  "Chinese", "Incas", "Jurchens", "Khitans", "Koreans", "Mapuche", "Muisca", "Shu", "Tupi",
  "Vietnamese", "Wei", "Wu"
];

// The Empire League Classic Mode civilization pool.
export const classicCivilizations = civilizations.filter(
  (civilization) => !nonClassicCivilizations.includes(civilization)
);

export function isClassicCivilization(civilization) {
  return classicCivilizations.includes(civilization);
}

export function classicQueuesAreCompatible(firstQueue, secondQueue) {
  if (firstQueue?.classicMode !== true && secondQueue?.classicMode !== true) return true;
  return [firstQueue, secondQueue].every((queue) => {
    if (queue?.classicMode === true) return true;
    const preference = queue?.civilizationPreference;
    return preference?.mode === "mirror"
      || (preference?.mode === "pick" && isClassicCivilization(preference.civilization));
  });
}

const civilizationNamesById = new Map([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  39, 40, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53, 57, 58, 59
].map((id, index) => [id, [
  "Britons", "Franks", "Goths", "Teutons", "Japanese", "Chinese", "Byzantines",
  "Persians", "Saracens", "Turks", "Vikings", "Mongols", "Celts", "Spanish",
  "Aztecs", "Mayans", "Huns", "Koreans", "Italians", "Hindustanis", "Incas",
  "Magyars", "Slavs", "Portuguese", "Ethiopians", "Malians", "Berbers", "Khmer",
  "Malay", "Burmese", "Vietnamese", "Bulgarians", "Tatars", "Cumans",
  "Lithuanians", "Burgundians", "Sicilians", "Poles", "Bohemians", "Dravidians",
  "Bengalis", "Gurjaras", "Romans", "Armenians", "Georgians", "Shu", "Wu", "Wei",
  "Jurchens", "Khitans", "Muisca", "Mapuche", "Tupi"
][index]]));

export function civilizationNameFromId(id) {
  return civilizationNamesById.get(Number(id)) ?? "";
}

export function civilizationBansForMapGroup(preference, mapGroupId) {
  if (preference?.mode !== "random") return [];
  const bans = mapGroupId === "land-open"
    ? preference.openLandBans
    : mapGroupId === "land-closed"
      ? preference.closedLandBans
      : [];
  return Array.isArray(bans) ? bans : [];
}

export function effectiveCivilizationPreference(preference, otherPreferences = []) {
  const anotherPlayerSelectedRandom = otherPreferences.some((other) => other?.mode === "random");
  return preference?.mode === "pick" && preference.preferRandom && anotherPlayerSelectedRandom
    ? { ...preference, mode: "random" }
    : preference;
}

export function rollCivilizationPreference(
  preference,
  mapGroupId,
  additionalBans = [],
  random = Math.random,
  allowedCivilizations = civilizations
) {
  if (preference?.mode !== "random") return preference;
  const banned = new Set([
    ...civilizationBansForMapGroup(preference, mapGroupId),
    ...(Array.isArray(additionalBans) ? additionalBans : [])
  ]);
  const available = allowedCivilizations.filter((civilization) => !banned.has(civilization));
  return {
    mode: "pick",
    civilization: available[Math.floor(random() * available.length)]
  };
}

export function normalizeCivilizationPreference(preference) {
  if (!preference || !["pick", "random", "mirror"].includes(preference.mode)) {
    return { mode: "pick", civilization: "Byzantines" };
  }
  if (preference.mode === "pick") {
    return {
      mode: "pick",
      civilization: civilizations.includes(preference.civilization)
        ? preference.civilization
        : "Byzantines",
      preferRandom: preference.preferRandom === true,
      openLandBans: validCivilizationBans(preference.openLandBans),
      closedLandBans: validCivilizationBans(preference.closedLandBans)
    };
  }
  if (preference.mode === "random") {
    return {
      mode: "random",
      openLandBans: validCivilizationBans(preference.openLandBans),
      closedLandBans: validCivilizationBans(preference.closedLandBans)
    };
  }
  return { mode: "mirror" };
}

function validCivilizationBans(value) {
  return [...new Set(
    (Array.isArray(value) ? value : []).filter((name) => civilizations.includes(name))
  )].slice(0, 5);
}
