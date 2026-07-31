import type { MatchSummary } from "../../shared/contracts/matches";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { previewMatches } from "../mocks/previewData";

export const matchHistoryService = {
  async getMine(): Promise<MatchSummary[]> {
    if (isPreviewMode) return previewMatches;
    const body = await matchmakerTransport.request<{ matches: MatchSummary[] }>("/matches/history");
    return body.matches as MatchSummary[];
  }
};
