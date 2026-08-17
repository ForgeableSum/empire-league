export function builtInTournamentMapId(gameName) {
  const slug = gameName.toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `builtin:${slug}`.slice(0, 64);
}

export function tournamentMapFromInput(input, catalogMaps) {
  const catalogMap = catalogMaps.find((candidate) => candidate.id === input.mapId);
  if (catalogMap) return { id: catalogMap.id, name: catalogMap.gameMapName };
  const name = String(input.mapName ?? "").trim();
  if (!name || name.length > 100 || /[\u0000-\u001f\u007f]/.test(name)) return null;
  if (input.mapId !== builtInTournamentMapId(name)) return null;
  return { id: input.mapId, name };
}
