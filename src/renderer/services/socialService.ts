import type { FriendPresence, SocialFriend, FriendRequest } from "../pages/SocialPage";
import { matchmakerTransport, type SocialEvent } from "./matchmakerTransport";

export interface PlayerLookup {
  id: string;
  displayName: string;
}

export interface SocialMessage {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  sentAt: string;
}

export interface SocialSnapshot {
  friends: SocialFriend[];
  requests: FriendRequest[];
  outgoing: Array<{ id: string; name: string }>;
}

export const socialService = {
  async getSnapshot(): Promise<SocialSnapshot> {
    return (await matchmakerTransport.request<{ snapshot: SocialSnapshot }>("/social")).snapshot;
  },

  async sendFriendRequest(displayName: string): Promise<PlayerLookup> {
    return (await matchmakerTransport.request<{ player: PlayerLookup }>("/social/requests", {
      method: "POST",
      body: { displayName }
    })).player;
  },

  async acceptRequest(connectionId: string): Promise<void> {
    await matchmakerTransport.request(`/social/requests/${encodeURIComponent(connectionId)}/accept`, { method: "POST" });
  },

  async declineRequest(connectionId: string): Promise<void> {
    await matchmakerTransport.request(`/social/requests/${encodeURIComponent(connectionId)}`, { method: "DELETE" });
  },

  async updatePresence(presence: FriendPresence, activity: string, mapName?: string): Promise<void> {
    await matchmakerTransport.request("/social/presence", { method: "POST", body: { presence, activity, mapName } });
  },

  async getMessages(friendId: string): Promise<SocialMessage[]> {
    return (await matchmakerTransport.request<{ messages: SocialMessage[] }>(
      `/social/messages/${encodeURIComponent(friendId)}`
    )).messages;
  },

  async sendMessage(recipientId: string, text: string): Promise<SocialMessage> {
    return (await matchmakerTransport.request<{ message: SocialMessage }>("/social/messages", {
      method: "POST",
      body: { recipientId, text }
    })).message;
  },

  async markMessagesRead(friendId: string): Promise<void> {
    await matchmakerTransport.request(`/social/messages/${encodeURIComponent(friendId)}/read`, { method: "POST" });
  },

  onEvent(listener: (event: SocialEvent) => void) {
    return matchmakerTransport.onSocialEvent(listener);
  }
};
