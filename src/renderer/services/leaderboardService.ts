import type { PlayerProfile } from "../../shared/contracts/players";
import { authorizationHeaders, matchmakerUrl } from "./authService";

export const leaderboardService = {
  async list(): Promise<PlayerProfile[]> {
    const response = await fetch(`${matchmakerUrl}/leaderboard`, { headers: authorizationHeaders() });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error ?? `Leaderboard request failed (${response.status}).`);
    return body.players;
  }
};
