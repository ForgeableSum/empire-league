import { mockLeaderboard } from "../mocks/mockLeaderboard";

export const leaderboardService = {
  list: () => Promise.resolve(mockLeaderboard)
};
