import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";

export const presenceService = {
  async getOnlinePlayerCount(): Promise<number> {
    if (isPreviewMode) return 486;
    const body = await matchmakerTransport.request<{ onlinePlayers: number }>("/online");
    return Number(body.onlinePlayers);
  }
};
