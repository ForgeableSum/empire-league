import type { MatchSummary } from "../../shared/contracts/matches";
import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { currentUser, leaderboardPlayers } from "../mocks/mockPlayers";
import { previewMatches } from "../mocks/previewData";

export const playerService = {
  async getProfile(playerId: string): Promise<{ player: PlayerProfile; matches: MatchSummary[] }> {
    if (isPreviewMode) return { player: leaderboardPlayers.find((player) => player.id === playerId) ?? currentUser, matches: previewMatches };
    return matchmakerTransport.request(`/players/${encodeURIComponent(playerId)}`);
  }
};
