import type { FriendPresence, SocialFriend, FriendRequest } from "../pages/SocialPage";
import { matchmakerTransport, type SocialEvent } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";
import { previewFriendRequests, previewFriends } from "../mocks/previewData";

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
    if (isPreviewMode) return { friends: previewFriends, requests: previewFriendRequests, outgoing: [] };
    return (await matchmakerTransport.request<{ snapshot: SocialSnapshot }>("/social")).snapshot;
  },

  async sendFriendRequest(displayName: string): Promise<PlayerLookup> {
    if (isPreviewMode) return { id: `preview-${displayName.toLowerCase().replaceAll(" ", "-")}`, displayName };
    return (await matchmakerTransport.request<{ player: PlayerLookup }>("/social/requests", {
      method: "POST",
      body: { displayName }
    })).player;
  },

  async acceptRequest(connectionId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/social/requests/${encodeURIComponent(connectionId)}/accept`, { method: "POST" });
  },

  async declineRequest(connectionId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/social/requests/${encodeURIComponent(connectionId)}`, { method: "DELETE" });
  },

  async removeFriend(friendId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/social/friends/${encodeURIComponent(friendId)}`, { method: "DELETE" });
  },

  async updatePresence(presence: FriendPresence, activity: string, mapName?: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request("/social/presence", { method: "POST", body: { presence, activity, mapName } });
  },

  async getMessages(friendId: string): Promise<SocialMessage[]> {
    if (isPreviewMode) return [
      { id: "preview-message-1", senderId: friendId, recipientId: "user-1", text: "Want to queue for Arabia?", sentAt: new Date(Date.now() - 180_000).toISOString() },
      { id: "preview-message-2", senderId: "user-1", recipientId: friendId, text: "Sure, give me two minutes.", sentAt: new Date(Date.now() - 120_000).toISOString() }
    ];
    return (await matchmakerTransport.request<{ messages: SocialMessage[] }>(
      `/social/messages/${encodeURIComponent(friendId)}`
    )).messages;
  },

  async sendMessage(recipientId: string, text: string): Promise<SocialMessage> {
    if (isPreviewMode) return { id: `preview-message-${Date.now()}`, senderId: "user-1", recipientId, text, sentAt: new Date().toISOString() };
    return (await matchmakerTransport.request<{ message: SocialMessage }>("/social/messages", {
      method: "POST",
      body: { recipientId, text }
    })).message;
  },

  async markMessagesRead(friendId: string): Promise<void> {
    if (isPreviewMode) return;
    await matchmakerTransport.request(`/social/messages/${encodeURIComponent(friendId)}/read`, { method: "POST" });
  },

  onEvent(listener: (event: SocialEvent) => void) {
    if (isPreviewMode) return () => undefined;
    return matchmakerTransport.onSocialEvent(listener);
  }
};
