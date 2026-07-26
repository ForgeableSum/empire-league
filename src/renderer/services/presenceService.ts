import { authorizationHeaders, matchmakerUrl } from "./authService";

export const presenceService = {
  async getOnlinePlayerCount(): Promise<number> {
    const response = await fetch(`${matchmakerUrl}/online`, {
      headers: authorizationHeaders()
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`);
    return Number(body.onlinePlayers);
  }
};
