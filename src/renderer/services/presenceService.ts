import { matchmakerTransport } from "./matchmakerTransport";

export const presenceService = {
  async getOnlinePlayerCount(): Promise<number> {
    const body = await matchmakerTransport.request<{ onlinePlayers: number }>("/online");
    return Number(body.onlinePlayers);
  }
};
