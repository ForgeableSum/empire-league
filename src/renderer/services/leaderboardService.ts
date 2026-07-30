import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";

export interface LeaderboardPageResult {
  players: PlayerProfile[];
  page: number;
  pageSize: number;
  total: number;
  division: string;
}

export const leaderboardService = {
  async list(page = 1, division = "all"): Promise<LeaderboardPageResult> {
    const params = new URLSearchParams({ page: String(page), division });
    return matchmakerTransport.request<LeaderboardPageResult>(`/leaderboard?${params}`);
  }
};
