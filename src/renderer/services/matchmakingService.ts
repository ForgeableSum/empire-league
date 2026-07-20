import type {
  JoinQueueRequest,
  MatchSession,
  QueueEventListener,
  QueueTicket,
  UnsubscribeFunction
} from "../../shared/contracts/matchmaking";
import type { MockServiceConfig } from "../state/types";
import { currentUser, maps, matchmakingOpponents } from "../mocks/mockPlayers";
import { delay } from "./timing";

export interface MatchmakingService {
  joinQueue(request: JoinQueueRequest): Promise<QueueTicket>;
  leaveQueue(ticketId: string): Promise<void>;
  subscribeToQueue(ticketId: string, listener: QueueEventListener): UnsubscribeFunction;
  acceptMatch(matchId: string): Promise<void>;
  declineMatch(matchId: string): Promise<void>;
}

export class MockMatchmakingService implements MatchmakingService {
  private listeners = new Map<string, QueueEventListener>();
  private timers = new Map<string, number[]>();

  constructor(private readonly getConfig: () => MockServiceConfig) {}

  async joinQueue(request: JoinQueueRequest): Promise<QueueTicket> {
    await delay(350);
    if (this.getConfig().forceQueueFailure) {
      throw new Error("Matchmaking service is unavailable.");
    }
    return { id: `ticket-${crypto.randomUUID()}`, queueId: request.queueId, joinedAt: new Date().toISOString() };
  }

  async leaveQueue(ticketId: string): Promise<void> {
    await delay(150);
    this.clearTimers(ticketId);
    this.listeners.delete(ticketId);
  }

  subscribeToQueue(ticketId: string, listener: QueueEventListener): UnsubscribeFunction {
    this.listeners.set(ticketId, listener);
    const config = this.getConfig();
    const timers: number[] = [];
    [0, 20000, 40000, 60000, 90000].forEach((at, index) => {
      timers.push(
        window.setTimeout(() => {
          const spread = [50, 75, 100, 150, 250][index];
          listener({ type: "range", minRating: 1426 - spread, maxRating: 1426 + spread });
        }, at)
      );
    });
    timers.push(
      window.setTimeout(() => {
        const opponent = matchmakingOpponents[Math.floor(Math.random() * matchmakingOpponents.length)];
        const match: MatchSession = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: maps,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          player: currentUser,
          opponent,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 20000).toISOString(),
          selectedMap: maps[Math.floor(Math.random() * maps.length)],
          createdAt: new Date().toISOString()
        };
        listener({ type: "match_found", match });
      }, config.queueWaitMs)
    );
    this.timers.set(ticketId, timers);
    return () => {
      this.clearTimers(ticketId);
      this.listeners.delete(ticketId);
    };
  }

  async acceptMatch(matchId: string): Promise<void> {
    await delay(250);
    const config = this.getConfig();
    if (config.forceOpponentDecline) {
      throw new Error("Opponent declined the match.");
    }
    window.setTimeout(() => {
      this.listeners.forEach((listener) => listener({ type: "opponent_accepted", matchId }));
    }, config.opponentAcceptDelayMs);
  }

  async declineMatch(_matchId: string): Promise<void> {
    await delay(200);
  }

  private clearTimers(ticketId: string): void {
    this.timers.get(ticketId)?.forEach((timer) => window.clearTimeout(timer));
    this.timers.delete(ticketId);
  }
}
