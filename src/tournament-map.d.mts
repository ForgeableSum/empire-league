export function builtInTournamentMapId(gameName: string): string;
export function tournamentMapFromInput(
  input: { mapId?: unknown; mapName?: unknown },
  catalogMaps: Array<{ id: string; gameMapName: string }>
): { id: string; name: string } | null;
