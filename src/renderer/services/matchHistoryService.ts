import type { MatchSummary } from "../../shared/contracts/matches";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { previewMatches } from "../mocks/previewData";

const replayPathsStorageKey = "empire-league.match-replay-paths";

function replayPaths(): Record<string, string> {
  try {
    const value = JSON.parse(window.localStorage.getItem(replayPathsStorageKey) ?? "{}");
    return value && typeof value === "object" ? value as Record<string, string> : {};
  } catch {
    return {};
  }
}

export const matchHistoryService = {
  async getMine(): Promise<MatchSummary[]> {
    if (isPreviewMode) return previewMatches;
    const body = await matchmakerTransport.request<{ matches: MatchSummary[] }>("/matches/history");
    const paths = replayPaths();
    return body.matches.map((match) => ({ ...match, replayPath: paths[match.id] }));
  },

  rememberReplay(matchId: string, replayPath: string): void {
    const paths = replayPaths();
    paths[matchId] = replayPath;
    window.localStorage.setItem(replayPathsStorageKey, JSON.stringify(paths));
  }
};
