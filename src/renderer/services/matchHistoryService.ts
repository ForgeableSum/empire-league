import type { MatchSummary } from "../../shared/contracts/matches";
import { authorizationHeaders, matchmakerUrl } from "./authService";

export const matchHistoryService = {
  async getMine(): Promise<MatchSummary[]> {
    const response = await fetch(`${matchmakerUrl}/matches/history`, { headers: authorizationHeaders() });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error ?? `Could not load match history (${response.status}).`);
    return body.matches as MatchSummary[];
  }
};
