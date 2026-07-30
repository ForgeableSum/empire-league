import type { CustomLobbyRoom, LocalCustomContent } from "../../shared/contracts/customLobby";
import { matchmakerTransport } from "./matchmakerTransport";

export const customLobbyService = {
  async list(): Promise<CustomLobbyRoom[]> {
    return (await matchmakerTransport.request<{ rooms: CustomLobbyRoom[] }>("/custom-lobbies")).rooms;
  },
  async create(input: { name: string; map?: LocalCustomContent; dataMod?: LocalCustomContent }): Promise<CustomLobbyRoom> {
    return (await matchmakerTransport.request<{ room: CustomLobbyRoom }>("/custom-lobbies", {
      method: "POST",
      body: { name: input.name, map: summarize(input.map), dataMod: summarize(input.dataMod) }
    })).room;
  },
  async join(roomId: string): Promise<CustomLobbyRoom> {
    return (await matchmakerTransport.request<{ room: CustomLobbyRoom }>(`/custom-lobbies/${encodeURIComponent(roomId)}/join`, { method: "POST" })).room;
  },
  async leave(roomId: string): Promise<void> {
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/leave`, { method: "POST" });
  },
  async updatePlayer(roomId: string, patch: { team?: number; civilization?: string; ready?: boolean }): Promise<void> {
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/player`, { method: "PATCH", body: patch });
  },
  async sendMessage(roomId: string, text: string): Promise<void> {
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/messages`, { method: "POST", body: { text } });
  },
  async kick(roomId: string, playerId: string): Promise<void> {
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/players/${encodeURIComponent(playerId)}`, { method: "DELETE" });
  },
  async start(roomId: string): Promise<void> {
    await matchmakerTransport.request(`/custom-lobbies/${encodeURIComponent(roomId)}/start`, { method: "POST" });
  },
  onEvent(listener: Parameters<typeof matchmakerTransport.onCustomLobbyEvent>[0]) {
    return matchmakerTransport.onCustomLobbyEvent(listener);
  }
};

function summarize(content?: LocalCustomContent) {
  return content ? { id: content.id, name: content.name, kind: content.kind } : undefined;
}
