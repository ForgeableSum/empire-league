export type TournamentCivilizationMode = "pick" | "random";
export type TournamentStatus = "registration" | "started" | "completed" | "cancelled";
export type TournamentEntryStatus = "active" | "eliminated" | "withdrawn" | "no_show" | "winner";
export type TournamentMatchStatus = "pending" | "waiting" | "in_progress" | "completed" | "forfeit" | "bye" | "no_contest";

export interface TournamentEntry {
  playerId: string;
  displayName: string;
  avatarUrl?: string;
  rating: number;
  ratingAtJoin: number;
  status: TournamentEntryStatus;
  bracketSlot: number;
  joinedAt: string;
}

export interface TournamentMatch {
  id: string;
  roundNumber: number;
  matchPosition: number;
  playerOneId?: string;
  playerTwoId?: string;
  playerOneReady: boolean;
  playerTwoReady: boolean;
  readyDeadline?: string;
  gameMatchId?: string;
  spectatorUri?: string;
  gameStartedAt?: string;
  winnerPlayerId?: string;
  status: TournamentMatchStatus;
  completedAt?: string;
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
  passwordProtected: boolean;
  status: TournamentStatus;
  startsAt: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  entries: TournamentEntry[];
  matches: TournamentMatch[];
}

export interface CreateTournamentInput {
  name: string;
  civilizationMode: TournamentCivilizationMode;
  participantCapacity: number;
  minimumElo: number;
  mapId: string;
  startsAt: string;
  password?: string;
}
