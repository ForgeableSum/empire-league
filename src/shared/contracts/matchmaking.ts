import type { PlayerProfile } from "./players.js";
import type { MatchResult, ReplayMatchMetadata } from "./matches.js";

export type Division =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Grandmaster";

export const divisionRatingRanges: Record<Division, readonly [number, number | null]> = {
  Bronze: [0, 799],
  Silver: [800, 999],
  Gold: [1000, 1199],
  Platinum: [1200, 1399],
  Diamond: [1400, 1799],
  Master: [1800, 2199],
  Grandmaster: [2200, null]
};

export function formatDivisionRatingRange(division: Division): string {
  const [minimum, maximum] = divisionRatingRanges[division];
  return maximum === null ? `${minimum}+ Elo` : `${minimum}–${maximum} Elo`;
}

export function getDivisionForRating(rating: number): Division {
  if (rating >= 2200) return "Grandmaster";
  if (rating >= 1800) return "Master";
  if (rating >= 1400) return "Diamond";
  if (rating >= 1200) return "Platinum";
  if (rating >= 1000) return "Gold";
  if (rating >= 800) return "Silver";
  return "Bronze";
}

export type DivisionTier = 1 | 2 | 3;

export function getDivisionTierForRating(rating: number): DivisionTier {
  const division = getDivisionForRating(rating);
  const thresholds: Record<Division, [number, number]> = {
    Bronze: [600, 700],
    Silver: [867, 934],
    Gold: [1067, 1134],
    Platinum: [1267, 1334],
    Diamond: [1533, 1666],
    Master: [1933, 2066],
    Grandmaster: [2300, 2400]
  };
  const [tierTwo, tierOne] = thresholds[division];
  if (rating >= tierOne) return 1;
  if (rating >= tierTwo) return 2;
  return 3;
}

export function formatDivisionForRating(rating: number): string {
  const division = getDivisionForRating(rating);
  const tier = getDivisionTierForRating(rating);
  return `${division} ${tier === 1 ? "I" : tier === 2 ? "II" : "III"}`;
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
  thumbnailUrl: string;
}

export type CivilizationMode = "pick" | "random" | "mirror" | "full-random";

export interface CivilizationPreference {
  mode: CivilizationMode;
  civilization?: string;
}

export interface QueueDefinition {
  id: string;
  name: string;
  description: string;
  format: "1v1";
  ruleset: "Random Map" | "Empire Wars";
  mapPool: MapDefinition[];
  favoriteMapId?: string;
  civilizationPreference?: CivilizationPreference;
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
  opponentCivilizationPreference?: CivilizationPreference;
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
  | { type: "guest_lobby_ready"; matchId: string }
  | { type: "game_started"; matchId: string }
  | { type: "result_verified"; matchId: string; result: MatchResult }
  | { type: "result_contested"; matchId: string; result: MatchResult }
  | { type: "error"; code: string; message: string };

export interface MatchResultReport {
  matchId: string;
  replay?: ReplayMatchMetadata;
  error?: string;
}

export type QueueEventListener = (event: QueueEvent) => void;
export type UnsubscribeFunction = () => void;
