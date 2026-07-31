import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { leaderboardPlayers } from "../mocks/mockPlayers";
import { getDivisionForRating } from "../../shared/contracts/matchmaking";

export interface LeaderboardPageResult {
  players: PlayerProfile[];
  page: number;
  pageSize: number;
  total: number;
  division: string;
  mode: LeaderboardMode;
}

export type LeaderboardMode = "solo" | "team";

export const leaderboardService = {
  async list(page = 1, division = "all", mode: LeaderboardMode = "solo"): Promise<LeaderboardPageResult> {
    if (isPreviewMode) {
      const ranked = [...leaderboardPlayers]
        .sort((left, right) => (mode === "team" ? right.teamRating - left.teamRating : right.rating - left.rating))
        .map((player, index) => {
          const rating = mode === "team" ? player.teamRating : player.rating;
          const wins = mode === "team" ? player.legacyTeamWins : player.wins;
          const losses = mode === "team" ? player.legacyTeamLosses : player.losses;
          return {
            ...player,
            rating,
            rank: index + 1,
            division: getDivisionForRating(rating),
            wins,
            losses,
            winRate: wins + losses ? Number(((wins / (wins + losses)) * 100).toFixed(1)) : 0
          };
        });
      const filtered = division === "all" ? ranked : ranked.filter((player) => player.division === division);
      return { players: filtered, page, pageSize: 100, total: filtered.length, division, mode };
    }
    const params = new URLSearchParams({ page: String(page), division, mode });
    return matchmakerTransport.request<LeaderboardPageResult>(`/leaderboard?${params}`);
  }
};
