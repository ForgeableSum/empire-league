import type { PartyMessage, PartySnapshot } from "../../shared/contracts/parties";
import { matchmakerTransport, type PartyEvent } from "./matchmakerTransport";

export const emptyPartySnapshot: PartySnapshot = { party: null, invites: [] };

export const partyService = {
  async getSnapshot(): Promise<PartySnapshot> {
    return (await matchmakerTransport.request<{ snapshot: PartySnapshot }>("/party")).snapshot;
  },
  async create(): Promise<PartySnapshot> {
    return (await matchmakerTransport.request<{ snapshot: PartySnapshot }>("/party", { method: "POST" })).snapshot;
  },
  async invite(playerId: string): Promise<void> {
    await matchmakerTransport.request("/party/invites", { method: "POST", body: { playerId } });
  },
  async accept(inviteId: string): Promise<PartySnapshot> {
    return (await matchmakerTransport.request<{ snapshot: PartySnapshot }>(`/party/invites/${encodeURIComponent(inviteId)}/accept`, { method: "POST" })).snapshot;
  },
  async decline(inviteId: string): Promise<void> {
    await matchmakerTransport.request(`/party/invites/${encodeURIComponent(inviteId)}`, { method: "DELETE" });
  },
  async leave(): Promise<void> {
    await matchmakerTransport.request("/party", { method: "DELETE" });
  },
  async removeMember(playerId: string): Promise<void> {
    await matchmakerTransport.request(`/party/members/${encodeURIComponent(playerId)}`, { method: "DELETE" });
  },
  async sendMessage(text: string): Promise<PartyMessage> {
    return (await matchmakerTransport.request<{ message: PartyMessage }>("/party/chat", { method: "POST", body: { text } })).message;
  },
  onEvent(listener: (event: PartyEvent) => void) {
    return matchmakerTransport.onPartyEvent(listener);
  }
};
