import type { MatchResult, MatchTrackingStatus, ReplayUploadResult } from "../../shared/contracts/matches";
import type { MatchSession } from "../../shared/contracts/matchmaking";
import type { MockServiceConfig } from "../state/types";
import { delay } from "./timing";

export interface MatchResultService {
  beginTracking(match: MatchSession): Promise<void>;
  getMatchStatus(matchId: string): Promise<MatchTrackingStatus>;
  waitForVerifiedResult(matchId: string): Promise<MatchResult>;
  submitReplay?(filePath: string): Promise<ReplayUploadResult>;
}

export class MockMatchResultService implements MatchResultService {
  private status = new Map<string, MatchTrackingStatus>();

  constructor(private readonly getConfig: () => MockServiceConfig) {}

  async beginTracking(match: MatchSession): Promise<void> {
    await delay(200);
    this.status.set(match.id, { matchId: match.id, stage: "in_game", message: "Match in progress" });
  }

  async getMatchStatus(matchId: string): Promise<MatchTrackingStatus> {
    await delay(100);
    return this.status.get(matchId) ?? { matchId, stage: "in_game", message: "Match in progress" };
  }

  async waitForVerifiedResult(matchId: string): Promise<MatchResult> {
    const steps: MatchTrackingStatus[] = [
      { matchId, stage: "game_finished", message: "Game finished" },
      { matchId, stage: "waiting_for_data", message: "Waiting for official match data" },
      { matchId, stage: "result_located", message: "Result located" },
      { matchId, stage: "players_verified", message: "Players verified" },
      { matchId, stage: "winner_verified", message: "Winner verified" },
      { matchId, stage: "rating_updated", message: "Rating updated" }
    ];
    for (const step of steps) {
      await delay(this.getConfig().resultVerificationDelayMs);
      this.status.set(matchId, step);
    }
    if (this.getConfig().forceResultVerificationFailure) {
      this.status.set(matchId, { matchId, stage: "failed", message: "Result verification failed" });
      throw new Error("Result service could not verify the winner.");
    }
    const forced = this.getConfig().forcedResult ?? (Math.random() > 0.38 ? "win" : "loss");
    const ratingChange = forced === "win" ? 16 : forced === "loss" ? -14 : 0;
    return {
      ratingPool: "solo",
      winnerProfileId: forced === "loss" ? 990011 : 12345678,
      loserProfileId: forced === "loss" ? 12345678 : 990011,
      outcome: forced,
      reason: forced === "no_contest" ? "unknown" : forced === "loss" ? "defeat" : "resignation",
      oldRating: 1426,
      newRating: 1426 + ratingChange,
      ratingChange,
      verified: forced !== "no_contest",
      verificationSource: "mock"
    };
  }

  async submitReplay(_filePath: string): Promise<ReplayUploadResult> {
    await delay(500);
    return { uploaded: true, replayId: `replay-${crypto.randomUUID().slice(0, 8)}` };
  }
}
