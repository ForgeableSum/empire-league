import type { PlayerProfile } from "./players.js";
import type { MatchResult, ReplayMatchMetadata } from "./matches.js";

export type Division =
  | "Copper"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Grandmaster";

export const divisionRatingRanges: Record<Division, readonly [number, number | null]> = {
  Copper: [0, 500],
  Bronze: [501, 799],
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
  if (rating >= 501) return "Bronze";
  return "Copper";
}

export type DivisionTier = 1 | 2 | 3;

export function getDivisionTierForRating(rating: number): DivisionTier {
  const division = getDivisionForRating(rating);
  const thresholds: Record<Division, [number, number]> = {
    Copper: [167, 334],
    Bronze: [601, 701],
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

export function isRatingPromotion(oldRating: number, newRating: number): boolean {
  return newRating > oldRating
    && (
      getDivisionForRating(oldRating) !== getDivisionForRating(newRating)
      || getDivisionTierForRating(oldRating) !== getDivisionTierForRating(newRating)
    );
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

export type MapGroupId = "land-open" | "land-closed" | "water";

export interface MapGroupDefinition {
  id: MapGroupId;
  name: string;
  description: string;
  primaryMapId: string;
}

export interface MapPreferences {
  enabledGroupIds: MapGroupId[];
  favoriteMapIds: Partial<Record<MapGroupId, string>>;
}

export type CivilizationMode = "pick" | "random" | "mirror";

export interface CivilizationPreference {
  mode: CivilizationMode;
  civilization?: string;
  preferRandom?: boolean;
  openLandBans?: string[];
  closedLandBans?: string[];
}

export interface QueueDefinition {
  id: string;
  name: string;
  description: string;
  format: "1v1" | "team";
  findAnyone?: boolean;
  teamSizes?: Array<2 | 4>;
  ruleset: "Random Map" | "Empire Wars";
  mapPool: MapDefinition[];
  mapPreferences?: MapPreferences;
  mapCatalogVersion?: number;
  favoriteMapId?: string;
  civilizationPreference?: CivilizationPreference;
  ranked: boolean;
  estimatedWaitSeconds: number;
  playersSearching: number;
}

export interface LobbySettings {
  playerCount: 2 | 4 | 8;
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
  lobbySlot?: number;
  team?: 1 | 2;
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
  maximumLowerOpponentRatingGap?: number;
}

export interface QueueTicket {
  id: string;
  queueId: string;
  joinedAt: string;
  ignoredMapIds?: string[];
}

export type QueueEvent =
  | { type: "range"; minRating: number; maxRating: number }
  | { type: "match_found"; match: MatchSession }
  | { type: "opponent_accepted"; matchId: string; role?: "host" | "guest" }
  | { type: "lobby_setup_estimate"; matchId: string; estimateMs: number }
  | { type: "lobby_ready"; matchId: string; lobby: LobbySession }
  | { type: "guest_lobby_joined"; matchId: string }
  | { type: "host_lobby_ready"; matchId: string }
  | { type: "guest_content_accepted"; matchId: string }
  | { type: "guest_lobby_ready"; matchId: string }
  | { type: "game_start_attempted"; matchId: string }
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
