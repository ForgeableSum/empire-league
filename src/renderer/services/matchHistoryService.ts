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

function saveReplayPaths(paths: Record<string, string>): void {
  if (Object.keys(paths).length === 0) {
    window.localStorage.removeItem(replayPathsStorageKey);
    return;
  }
  window.localStorage.setItem(replayPathsStorageKey, JSON.stringify(paths));
}

function retainReplayPaths(matchIds: Set<string>): Record<string, string> {
  const paths = replayPaths();
  const retained = Object.fromEntries(Object.entries(paths).filter(([matchId]) => matchIds.has(matchId)));
  if (Object.keys(retained).length !== Object.keys(paths).length) saveReplayPaths(retained);
  return retained;
}

export const matchHistoryService = {
  async getMine(): Promise<MatchSummary[]> {
    if (isPreviewMode) return previewMatches;
    const body = await matchmakerTransport.request<{ matches: MatchSummary[] }>("/matches/history");
    const paths = retainReplayPaths(new Set(body.matches.map((match) => match.id)));
    return body.matches.map((match) => ({ ...match, replayPath: paths[match.id] }));
  },

  rememberReplay(matchId: string, replayPath: string): void {
    const paths = replayPaths();
    paths[matchId] = replayPath;
    saveReplayPaths(paths);
  }
};
