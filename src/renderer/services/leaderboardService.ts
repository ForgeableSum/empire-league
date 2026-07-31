import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { leaderboardPlayers } from "../mocks/mockPlayers";

export interface LeaderboardPageResult {
  players: PlayerProfile[];
  page: number;
  pageSize: number;
  total: number;
  division: string;
}

export const leaderboardService = {
  async list(page = 1, division = "all"): Promise<LeaderboardPageResult> {
    if (isPreviewMode) {
      const filtered = division === "all" ? leaderboardPlayers : leaderboardPlayers.filter((player) => player.division === division);
      return { players: filtered, page, pageSize: 100, total: filtered.length, division };
    }
    const params = new URLSearchParams({ page: String(page), division });
    return matchmakerTransport.request<LeaderboardPageResult>(`/leaderboard?${params}`);
  }
};
