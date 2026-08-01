import type { CustomLobbyGameSettings, CustomLobbyPlayer, CustomLobbyRoom, LocalCustomContent } from "../../shared/contracts/customLobby";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { previewCustomRooms } from "../mocks/previewData";

export const customLobbyService = {
  async list(): Promise<CustomLobbyRoom[]> {
    if (isPreviewMode) return previewCustomRooms;
    return (await matchmakerTransport.request<{ rooms: CustomLobbyRoom[] }>("/custom-lobbies")).rooms;
  },
  async create(input: { name: string; maxPlayers: number; map?: LocalCustomContent; dataMod?: LocalCustomContent }): Promise<CustomLobbyRoom> {
    if (isPreviewMode) return { ...previewCustomRooms[0], id: "preview-created", name: input.name, maxPlayers: input.maxPlayers };
    return (await matchmakerTransport.request<{ room: CustomLobbyRoom }>("/custom-lobbies", {
      method: "POST",
      body: { name: input.name, maxPlayers: input.maxPlayers, map: summarize(input.map), dataMod: summarize(input.dataMod) }
    })).room;
  },
  async join(roomId: string, previewPlayer?: Pick<CustomLobbyPlayer, "id" | "displayName">): Promise<CustomLobbyRoom> {
    if (isPreviewMode) {
      const room = previewCustomRooms.find((candidate) => candidate.id === roomId);
      if (!room || !previewPlayer) throw new Error("The preview lobby is unavailable.");
      if (room.players.some((player) => player.id === previewPlayer.id)) return room;
      const occupiedSlots = new Set(room.players.map((player) => player.slot));
      const slot = Array.from({ length: room.maxPlayers }, (_, index) => index + 1).find((candidate) => !occupiedSlots.has(candidate));
      if (!slot) throw new Error("The preview lobby is full.");
      return {
        ...room,
        players: [...room.players, { ...previewPlayer, slot, team: 0, civilization: "Random", ready: false, host: false }],
        messages: [...room.messages, {
          id: `preview-join-${room.id}`,
          author: "Empire League",
          text: `${previewPlayer.displayName} joined the lobby.`,
          sentAt: new Date().toISOString(),
          system: true
        }]
      };
    }
    return (await matchmakerTransport.request<{ room: CustomLobbyRoom }>(`/custom-lobbies/${encodeURIComponent(roomId)}/join`, { method: "POST" })).room;
  },
  async leave(roomId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/leave`, { method: "POST" });
  },
  async updatePlayer(roomId: string, patch: { team?: number; civilization?: string; ready?: boolean }): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/player`, { method: "PATCH", body: patch });
  },
  async updateSettings(roomId: string, patch: Partial<CustomLobbyGameSettings>): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/settings`, { method: "PATCH", body: patch });
  },
  async sendMessage(roomId: string, text: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/messages`, { method: "POST", body: { text } });
  },
  async kick(roomId: string, playerId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/players/${encodeURIComponent(playerId)}`, { method: "DELETE" });
  },
  async start(roomId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/start`, { method: "POST" });
  },
  async publish(roomId: string, platformLobbyId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/publish`, { method: "POST", body: { platformLobbyId } });
  },
  async reportJoined(roomId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/joined`, { method: "POST" });
  },
  async reportAoeReady(roomId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/aoe-ready`, { method: "POST" });
  },
  async completeStart(roomId: string, gameStartedAt: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/complete-start`, {
      method: "POST",
      body: { gameStartedAt }
    });
  },
  async finish(roomId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/finish`, { method: "POST" });
  },
  async failStart(roomId: string, error: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/fail-start`, { method: "POST", body: { error } });
  },
  onEvent(listener: Parameters<typeof matchmakerTransport.onCustomLobbyEvent>[0]) {
    if (isPreviewMode) return () => undefined;
    return matchmakerTransport.onCustomLobbyEvent(listener);
  }
};

function summarize(content?: LocalCustomContent) {
  return content ? { id: content.id, name: content.name, gameName: content.gameName, kind: content.kind } : undefined;
}
