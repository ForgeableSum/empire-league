export const civilizations = [
  "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians",
  "Burgundians", "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians",
  "Ethiopians", "Franks", "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns",
  "Incas", "Italians", "Japanese", "Jurchens", "Khitans", "Khmer", "Koreans",
  "Lithuanians", "Magyars", "Malay", "Malians", "Mayans", "Mongols", "Persians",
  "Poles", "Portuguese", "Romans", "Saracens", "Sicilians", "Slavs", "Spanish",
  "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"
];

export function civilizationBansForMapGroup(preference, mapGroupId) {
  if (preference?.mode !== "random") return [];
  const bans = mapGroupId === "land-open"
    ? preference.openLandBans
    : mapGroupId === "land-closed"
      ? preference.closedLandBans
      : [];
  return Array.isArray(bans) ? bans : [];
}

export function rollCivilizationPreference(
  preference,
  mapGroupId,
  additionalBans = [],
  random = Math.random
) {
  if (preference?.mode !== "random") return preference;
  const banned = new Set([
    ...civilizationBansForMapGroup(preference, mapGroupId),
    ...(Array.isArray(additionalBans) ? additionalBans : [])
  ]);
  const available = civilizations.filter((civilization) => !banned.has(civilization));
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
        : "Byzantines"
    };
  }
  if (preference.mode === "random") {
    const validBans = (value) => [...new Set(
      (Array.isArray(value) ? value : []).filter((name) => civilizations.includes(name))
    )].slice(0, 5);
    return {
      mode: "random",
      openLandBans: validBans(preference.openLandBans),
      closedLandBans: validBans(preference.closedLandBans)
    };
  }
  return { mode: "mirror" };
}
