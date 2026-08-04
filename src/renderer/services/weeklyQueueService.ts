import type { CustomLobbyRoom } from "../../shared/contracts/customLobby";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";

export interface WeeklyModeDefinition {
  id: string;
  rotationId: string;
  name: string;
  description: string;
  details: string[];
  playerCount: number;
  startsAt: string;
  endsAt: string;
  map: { id: string; name: string; gameName: string; kind: "map" | "scenario" };
}

export interface WeeklyQueueStatus {
  mode: WeeklyModeDefinition;
  rotation: WeeklyModeDefinition[];
  queued: boolean;
  position?: number;
  playersQueued: number;
  room?: CustomLobbyRoom;
}

export const weeklyQueueService = {
  status(): Promise<WeeklyQueueStatus> {
    if (isPreviewMode) return Promise.resolve(previewStatus(false));
    return matchmakerTransport.request<WeeklyQueueStatus>("/weekly-queue");
  },
  join(civilization: string): Promise<WeeklyQueueStatus> {
    if (isPreviewMode) return Promise.resolve(previewStatus(true));
    return matchmakerTransport.request<WeeklyQueueStatus>("/weekly-queue", {
      method: "POST",
      body: { civilization }
    });
  },
  leave(): Promise<WeeklyQueueStatus> {
    if (isPreviewMode) return Promise.resolve(previewStatus(false));
    return matchmakerTransport.request<WeeklyQueueStatus>("/weekly-queue", { method: "DELETE" });
  }
};

function previewStatus(queued: boolean): WeeklyQueueStatus {
  return {
    queued,
    playersQueued: queued ? 1 : 0,
    position: queued ? 1 : undefined,
    mode: {
      id: "ffa-nomad",
      rotationId: "preview-weekly",
      name: "FFA Nomad",
      description: "No town center. No teammates. Find your footing and outlast every rival.",
      details: ["8 players", "Free for all", "Nomad start"],
      playerCount: 8,
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      map: { id: "land-nomad", name: "Land Nomad EL", gameName: "Land Nomad EL", kind: "map" }
    },
    rotation: [
      {
        id: "ffa-nomad", rotationId: "preview-weekly", name: "FFA Nomad",
        description: "No town center. No teammates. Find your footing and outlast every rival.",
        details: ["8 players", "Free for all", "Nomad start"], playerCount: 8,
        startsAt: new Date().toISOString(), endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        map: { id: "land-nomad", name: "Land Nomad EL", gameName: "Land Nomad EL", kind: "map" }
      },
      {
        id: "ffa-arena", rotationId: "preview-arena", name: "FFA Arena", description: "Eight kingdoms begin behind stone walls. Boom, then choose when to strike.",
        details: ["8 players", "Free for all", "Arena"], playerCount: 8,
        startsAt: new Date().toISOString(), endsAt: new Date().toISOString(),
        map: { id: "arena", name: "Arena", gameName: "Arena", kind: "map" }
      },
      {
        id: "ffa-black-forest", rotationId: "preview-black-forest", name: "FFA Black Forest", description: "Eight rivals fight through narrow forest paths for control of the map.",
        details: ["8 players", "Free for all", "Black Forest"], playerCount: 8,
        startsAt: new Date().toISOString(), endsAt: new Date().toISOString(),
        map: { id: "black-forest", name: "Black Forest", gameName: "Black Forest", kind: "map" }
      }
    ]
  };
}
