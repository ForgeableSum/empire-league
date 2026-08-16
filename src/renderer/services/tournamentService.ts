import type { CreateTournamentInput, Tournament } from "../../shared/contracts/tournaments";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";

let previewTournaments: Tournament[] = [previewTournament()];

export const tournamentService = {
  async list(): Promise<Tournament[]> {
    if (isPreviewMode) return structuredClone(previewTournaments);
    return (await matchmakerTransport.request<{ tournaments: Tournament[] }>("/tournaments")).tournaments;
  },

  async get(tournamentId: string): Promise<Tournament> {
    if (isPreviewMode) return structuredClone(requirePreviewTournament(tournamentId));
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}`)).tournament;
  },

  async create(input: CreateTournamentInput): Promise<Tournament> {
    if (isPreviewMode) {
      const tournament: Tournament = {
        id: `preview-${Date.now()}`,
        creatorPlayerId: "user-1",
        creatorDisplayName: "EmpireSum",
        name: input.name,
        format: "single_elimination",
        civilizationMode: input.civilizationMode,
        participantCapacity: input.participantCapacity,
        minimumElo: input.minimumElo,
        mapId: input.mapId,
        mapName: input.mapId,
        status: "registration",
        startsAt: input.startsAt,
        createdAt: new Date().toISOString(),
        entries: []
      };
      previewTournaments = [...previewTournaments, tournament];
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>("/tournaments", { method: "POST", body: input })).tournament;
  },

  async join(tournamentId: string): Promise<Tournament> {
    if (isPreviewMode) {
      const tournament = requirePreviewTournament(tournamentId);
      if (!tournament.entries.some((entry) => entry.playerId === "user-1")) {
        const occupied = new Set(tournament.entries.map((entry) => entry.bracketSlot));
        const bracketSlot = Array.from({ length: tournament.participantCapacity }, (_, index) => index + 1).find((slot) => !occupied.has(slot))!;
        tournament.entries.push({ playerId: "user-1", displayName: "EmpireSum", rating: 1426, ratingAtJoin: 1426, bracketSlot, joinedAt: new Date().toISOString() });
      }
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}/join`, { method: "POST" })).tournament;
  },

  async leave(tournamentId: string): Promise<Tournament> {
    if (isPreviewMode) {
      const tournament = requirePreviewTournament(tournamentId);
      tournament.entries = tournament.entries.filter((entry) => entry.playerId !== "user-1");
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}/join`, { method: "DELETE" })).tournament;
  },

  onEvent(listener: Parameters<typeof matchmakerTransport.onTournamentEvent>[0]) {
    if (isPreviewMode) return () => undefined;
    return matchmakerTransport.onTournamentEvent(listener);
  }
};

function requirePreviewTournament(tournamentId: string): Tournament {
  const tournament = previewTournaments.find((item) => item.id === tournamentId);
  if (!tournament) throw new Error("Tournament not found.");
  return tournament;
}

function previewTournament(): Tournament {
  const entries = [
    ["preview-1", "WololoJoe", 2], ["preview-2", "CastleAge", 3], ["preview-3", "MangoShot", 5],
    ["preview-4", "BlueCoffee", 6], ["preview-5", "RelicHunter", 8], ["preview-6", "TownBell", 9],
    ["preview-7", "FastCastle", 10], ["preview-8", "Trebuchet", 11], ["preview-9", "ScoutRush", 12],
    ["preview-10", "StoneWall", 13], ["preview-11", "KingdomCome", 15], ["preview-12", "MonkMicro", 16]
  ].map(([playerId, displayName, bracketSlot], index) => ({
    playerId: String(playerId),
    displayName: String(displayName),
    rating: 1250 + index * 22,
    ratingAtJoin: 1250 + index * 22,
    bracketSlot: Number(bracketSlot),
    joinedAt: new Date(Date.now() - index * 60_000).toISOString()
  }));
  return {
    id: "arabia-open",
    creatorPlayerId: "preview-organizer",
    creatorDisplayName: "TournamentHost",
    name: "Arabia Open",
    format: "single_elimination",
    civilizationMode: "pick",
    participantCapacity: 16,
    minimumElo: 1200,
    mapId: "arabia",
    mapName: "KotD6 Arabia EL",
    status: "registration",
    startsAt: new Date(Date.now() + 42 * 60_000).toISOString(),
    createdAt: new Date().toISOString(),
    entries
  };
}
