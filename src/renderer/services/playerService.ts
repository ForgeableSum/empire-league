import type { MatchSummary } from "../../shared/contracts/matches";
import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";

export const playerService = {
  async getProfile(playerId: string): Promise<{ player: PlayerProfile; matches: MatchSummary[] }> {
    return matchmakerTransport.request(`/players/${encodeURIComponent(playerId)}`);
  }
};
