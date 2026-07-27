import type { MatchSummary } from "../../shared/contracts/matches";
import { matchmakerTransport } from "./matchmakerTransport";

export const matchHistoryService = {
  async getMine(): Promise<MatchSummary[]> {
    const body = await matchmakerTransport.request<{ matches: MatchSummary[] }>("/matches/history");
    return body.matches as MatchSummary[];
  }
};
