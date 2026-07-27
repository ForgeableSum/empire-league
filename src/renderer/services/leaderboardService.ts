import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";

export const leaderboardService = {
  async list(): Promise<PlayerProfile[]> {
    const body = await matchmakerTransport.request<{ players: PlayerProfile[] }>("/leaderboard");
    return body.players;
  }
};
