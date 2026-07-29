import type {
  JoinQueueRequest,
  MatchResultReport,
  MatchSession,
  QueueEventListener,
  QueueTicket,
  UnsubscribeFunction
} from "../../shared/contracts/matchmaking";
import type { MockServiceConfig } from "../state/types";
import { currentUser, maps, matchmakingOpponents } from "../mocks/mockPlayers";
import { mapCatalog, selectMapFromQueues } from "../../shared/mapCatalog";
import { rollCivilization } from "../../shared/civilizations";
import { delay } from "./timing";
import { matchmakerTransport } from "./matchmakerTransport";

export interface MatchmakingService {
  joinQueue(request: JoinQueueRequest): Promise<QueueTicket>;
  updateQueue(ticketId: string, queue: NonNullable<JoinQueueRequest["queue"]>): Promise<void>;
  leaveQueue(ticketId: string): Promise<void>;
  subscribeToQueue(ticketId: string, listener: QueueEventListener): UnsubscribeFunction;
  acceptMatch(matchId: string): Promise<void>;
  declineMatch(matchId: string): Promise<void>;
  publishLobby(matchId: string, lobby: import("../../shared/contracts/matchmaking").LobbySession): Promise<void>;
  reportGuestLobbyJoined(matchId: string): Promise<void>;
  reportHostLobbyReady(matchId: string): Promise<void>;
  reportGuestContentAccepted(matchId: string): Promise<void>;
  reportGuestLobbyReady(matchId: string): Promise<void>;
  reportGameStarted(matchId: string): Promise<void>;
  reportMatchResult(report: MatchResultReport): Promise<void>;
}

export class LocalMatchmakingService implements MatchmakingService {
  private activeTicketId: string | null = null;

  async joinQueue(request: JoinQueueRequest): Promise<QueueTicket> {
    return matchmakerTransport.request<QueueTicket>("/queue", {
      method: "POST",
      body: {
        queue: request.queue,
        canHost: request.canHost,
        maximumLowerOpponentRatingGap: request.maximumLowerOpponentRatingGap
      }
    });
  }

  async updateQueue(ticketId: string, queue: NonNullable<JoinQueueRequest["queue"]>): Promise<void> {
    await matchmakerTransport.request(`/tickets/${encodeURIComponent(ticketId)}`, {
      method: "PATCH",
      body: { queue }
    });
  }

  async leaveQueue(ticketId: string): Promise<void> {
    await matchmakerTransport.request(`/tickets/${encodeURIComponent(ticketId)}`, { method: "DELETE" });
    if (this.activeTicketId === ticketId) this.activeTicketId = null;
  }

  subscribeToQueue(ticketId: string, listener: QueueEventListener): UnsubscribeFunction {
    this.activeTicketId = ticketId;
    return matchmakerTransport.subscribe(ticketId, listener);
  }

  async acceptMatch(matchId: string): Promise<void> {
    await this.matchAction(matchId, "accept");
  }

  async declineMatch(matchId: string): Promise<void> {
    await this.matchAction(matchId, "decline");
  }

  async publishLobby(matchId: string, lobby: import("../../shared/contracts/matchmaking").LobbySession): Promise<void> {
    if (!this.activeTicketId) throw new Error("No active matchmaking ticket.");
    await matchmakerTransport.request(`/matches/${encodeURIComponent(matchId)}/lobby`, {
      method: "POST",
      body: { ticketId: this.activeTicketId, lobby }
    });
  }

  async reportGuestLobbyJoined(matchId: string): Promise<void> {
    await this.reportLobbyMilestone(matchId, "guest-joined");
  }

  async reportHostLobbyReady(matchId: string): Promise<void> {
    await this.reportLobbyMilestone(matchId, "host-ready");
  }

  async reportGuestContentAccepted(matchId: string): Promise<void> {
    await this.reportLobbyMilestone(matchId, "guest-content-accepted");
  }

  async reportGuestLobbyReady(matchId: string): Promise<void> {
    await this.reportLobbyMilestone(matchId, "guest-ready");
  }

  private async reportLobbyMilestone(
    matchId: string,
    milestone: "guest-joined" | "host-ready" | "guest-content-accepted" | "guest-ready"
  ): Promise<void> {
    if (!this.activeTicketId) throw new Error("No active matchmaking ticket.");
    await matchmakerTransport.request(`/matches/${encodeURIComponent(matchId)}/${milestone}`, {
      method: "POST",
      body: { ticketId: this.activeTicketId }
    });
  }

  async reportGameStarted(matchId: string): Promise<void> {
    if (!this.activeTicketId) throw new Error("No active matchmaking ticket.");
    await matchmakerTransport.request(`/matches/${encodeURIComponent(matchId)}/started`, {
      method: "POST",
      body: { ticketId: this.activeTicketId }
    });
  }

  async reportMatchResult(report: MatchResultReport): Promise<void> {
    if (!this.activeTicketId) throw new Error("No active matchmaking ticket.");
    await matchmakerTransport.request(`/matches/${encodeURIComponent(report.matchId)}/result`, {
      method: "POST",
      body: { ticketId: this.activeTicketId, replay: report.replay, error: report.error }
    });
  }

  private async matchAction(matchId: string, action: "accept" | "decline"): Promise<void> {
    if (!this.activeTicketId) throw new Error("No active matchmaking ticket.");
    await matchmakerTransport.request(`/matches/${encodeURIComponent(matchId)}/${action}`, {
      method: "POST",
      body: { ticketId: this.activeTicketId }
    });
  }
}

export class MockMatchmakingService implements MatchmakingService {
  private listeners = new Map<string, QueueEventListener>();
  private timers = new Map<string, number[]>();
  private queuedDefinitions = new Map<string, NonNullable<JoinQueueRequest["queue"]>>();
  private lowerRatingLimits = new Map<string, number>();

  constructor(private readonly getConfig: () => MockServiceConfig) {}

  async joinQueue(request: JoinQueueRequest): Promise<QueueTicket> {
    await delay(350);
    if (this.getConfig().forceQueueFailure) {
      throw new Error("Matchmaking service is unavailable.");
    }
    if (!request.queue?.mapPool.length) throw new Error("At least one selected map is required.");
    const ticket = { id: `ticket-${crypto.randomUUID()}`, queueId: request.queueId, joinedAt: new Date().toISOString() };
    this.queuedDefinitions.set(ticket.id, request.queue);
    this.lowerRatingLimits.set(ticket.id, request.maximumLowerOpponentRatingGap ?? 0);
    return ticket;
  }

  async updateQueue(ticketId: string, queue: NonNullable<JoinQueueRequest["queue"]>): Promise<void> {
    await delay(75);
    if (!this.queuedDefinitions.has(ticketId)) throw new Error("Queue ticket is no longer active.");
    if (!queue.mapPool.length) throw new Error("At least one selected map is required.");
    this.queuedDefinitions.set(ticketId, queue);
  }

  async leaveQueue(ticketId: string): Promise<void> {
    await delay(150);
    this.clearTimers(ticketId);
    this.listeners.delete(ticketId);
    this.queuedDefinitions.delete(ticketId);
    this.lowerRatingLimits.delete(ticketId);
  }

  subscribeToQueue(ticketId: string, listener: QueueEventListener): UnsubscribeFunction {
    this.listeners.set(ticketId, listener);
    const queuedDefinition = this.queuedDefinitions.get(ticketId);
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
        const currentDefinition = this.queuedDefinitions.get(ticketId) ?? queuedDefinition;
        const selectedMaps = currentDefinition?.mapPool ?? maps;
        const opponentDefinition = {
          mapPool: maps,
          mapPreferences: {
            favoriteMapIds: {}
          }
        };
        const maximumGap = this.lowerRatingLimits.get(ticketId) ?? 0;
        const eligibleOpponents = maximumGap > 0
          ? matchmakingOpponents.filter((opponent) => opponent.rating >= currentUser.rating - maximumGap)
          : matchmakingOpponents;
        const opponent = eligibleOpponents[Math.floor(Math.random() * eligibleOpponents.length)];
        if (!opponent) return;
        const selectedMap = selectMapFromQueues(
          currentDefinition ?? { mapPool: selectedMaps },
          opponentDefinition
        );
        const selectedMapGroup = mapCatalog.maps.find((map) => map.id === selectedMap?.id)?.groupId;
        const resolvedDefinition = currentDefinition
          ? {
              ...currentDefinition,
              civilizationPreference: rollCivilization(
                currentDefinition.civilizationPreference,
                selectedMapGroup
              )
            }
          : undefined;
        const match: MatchSession = {
          id: `match-${crypto.randomUUID().slice(0, 8)}`,
          status: "match_found",
          queue: resolvedDefinition ?? {
            id: "ranked-rm-1v1",
            name: "Ranked 1v1 Random Map",
            description: "Competitive 1v1 matchmaking with the active community map pool.",
            format: "1v1",
            ruleset: "Random Map",
            mapPool: maps,
            mapPreferences: {
              enabledGroupIds: mapCatalog.groups.map((group) => group.id),
              favoriteMapIds: {}
            },
            mapCatalogVersion: mapCatalog.version,
            ranked: true,
            estimatedWaitSeconds: 65,
            playersSearching: 128
          },
          opponentCivilizationPreference: {
            mode: "pick",
            civilization: "Franks"
          },
          player: currentUser,
          opponent,
          acceptedByPlayer: false,
          acceptedByOpponent: false,
          acceptDeadline: new Date(Date.now() + 30_000).toISOString(),
          selectedMap,
          createdAt: new Date().toISOString()
        };
        listener({ type: "match_found", match });
      }, config.queueWaitMs)
    );
    this.timers.set(ticketId, timers);
    return () => {
      this.clearTimers(ticketId);
      this.listeners.delete(ticketId);
      this.queuedDefinitions.delete(ticketId);
      this.lowerRatingLimits.delete(ticketId);
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

  async publishLobby(_matchId: string, _lobby: import("../../shared/contracts/matchmaking").LobbySession): Promise<void> {
    await delay(100);
  }

  async reportGuestLobbyJoined(_matchId: string): Promise<void> {
    await delay(100);
  }

  async reportHostLobbyReady(_matchId: string): Promise<void> {
    await delay(100);
  }

  async reportGuestContentAccepted(_matchId: string): Promise<void> {
    await delay(100);
  }

  async reportGuestLobbyReady(_matchId: string): Promise<void> {
    await delay(100);
  }

  async reportGameStarted(_matchId: string): Promise<void> {
    await delay(100);
  }

  async reportMatchResult(_report: MatchResultReport): Promise<void> {
    await delay(100);
  }

  private clearTimers(ticketId: string): void {
    this.timers.get(ticketId)?.forEach((timer) => window.clearTimeout(timer));
    this.timers.delete(ticketId);
  }
}
