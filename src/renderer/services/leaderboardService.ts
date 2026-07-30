import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";

export interface LeaderboardPageResult {
  players: PlayerProfile[];
  page: number;
  pageSize: number;
  total: number;
}

export const leaderboardService = {
  async list(page = 1): Promise<LeaderboardPageResult> {
    return matchmakerTransport.request<LeaderboardPageResult>(`/leaderboard?page=${page}`);
  }
};
