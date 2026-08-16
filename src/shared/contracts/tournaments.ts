export type TournamentCivilizationMode = "pick" | "random";
export type TournamentStatus = "registration" | "started" | "completed" | "cancelled";

export interface TournamentEntry {
  playerId: string;
  displayName: string;
  avatarUrl?: string;
  rating: number;
  ratingAtJoin: number;
  bracketSlot: number;
  joinedAt: string;
}

export interface Tournament {
  id: string;
  creatorPlayerId: string;
  creatorDisplayName: string;
  name: string;
  format: "single_elimination";
  civilizationMode: TournamentCivilizationMode;
  participantCapacity: number;
  minimumElo: number;
  mapId: string;
  mapName: string;
  status: TournamentStatus;
  startsAt: string;
  createdAt: string;
  entries: TournamentEntry[];
}

export interface CreateTournamentInput {
  name: string;
  civilizationMode: TournamentCivilizationMode;
  participantCapacity: number;
  minimumElo: number;
  mapId: string;
  startsAt: string;
}
