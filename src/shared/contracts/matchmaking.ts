import type { PlayerProfile } from "./players.js";
import type { MatchResult } from "./matches.js";

export type Division =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Grandmaster";

export function getDivisionForRating(rating: number): Division {
  if (rating >= 2200) return "Grandmaster";
  if (rating >= 1800) return "Master";
  if (rating >= 1400) return "Diamond";
  if (rating >= 1200) return "Platinum";
  if (rating >= 1000) return "Gold";
  if (rating >= 800) return "Silver";
  return "Bronze";
}

export type MatchOutcome = "win" | "loss" | "no_contest";

export type QueueStatus =
  | "idle"
  | "searching"
  | "match_found"
  | "accepting"
  | "creating_lobby"
  | "waiting_for_opponent"
  | "verifying_lobby"
  | "ready"
  | "in_game"
  | "verifying_result"
  | "completed"
  | "cancelled"
  | "error";

export interface MapDefinition {
  id: string;
  name: string;
  style: "open" | "closed" | "hybrid" | "water" | "nomad";
}

export interface QueueDefinition {
  id: string;
  name: string;
  description: string;
  format: "1v1";
  ruleset: "Random Map" | "Empire Wars";
  mapPool: MapDefinition[];
  ranked: boolean;
  estimatedWaitSeconds: number;
  playersSearching: number;
}

export interface LobbySettings {
  playerCount: 2;
  gameMode: "Random Map";
  speed: "Normal";
  startingAge: "Dark Age";
  startingResources: "Standard";
  populationLimit: 200;
  victoryCondition: "Conquest";
  cheatsEnabled: false;
  recordGame: true;
  spectatorsAllowed: boolean;
  hiddenCivilizations: boolean;
}

export interface LobbyVerification {
  correctPlayers: boolean;
  correctMap: boolean;
  correctSettings: boolean;
  cheatsDisabled: boolean;
  recordingEnabled: boolean;
  noUnexpectedPlayers: boolean;
}

export interface LobbySession {
  platformLobbyId?: string;
  lobbyName: string;
  password?: string;
  hostProfileId: number;
  guestProfileId: number;
  map: MapDefinition;
  serverRegion: string;
  settings: LobbySettings;
  verification: LobbyVerification;
}

export interface MatchSession {
  id: string;
  status: QueueStatus;
  queue: QueueDefinition;
  player: PlayerProfile;
  opponent: PlayerProfile;
  role?: "host" | "guest";
  hostPlayerId?: number;
  acceptedByPlayer: boolean;
  acceptedByOpponent: boolean;
  acceptDeadline?: string;
  selectedMap?: MapDefinition;
  lobby?: LobbySession;
  result?: MatchResult;
  createdAt: string;
}

export interface JoinQueueRequest {
  queueId: string;
  queue?: QueueDefinition;
  player: PlayerProfile;
  canHost?: boolean;
}

export interface QueueTicket {
  id: string;
  queueId: string;
  joinedAt: string;
}

export type QueueEvent =
  | { type: "range"; minRating: number; maxRating: number }
  | { type: "match_found"; match: MatchSession }
  | { type: "opponent_accepted"; matchId: string; role?: "host" | "guest" }
  | { type: "lobby_ready"; matchId: string; lobby: LobbySession }
  | { type: "error"; code: string; message: string };

export type QueueEventListener = (event: QueueEvent) => void;
export type UnsubscribeFunction = () => void;
