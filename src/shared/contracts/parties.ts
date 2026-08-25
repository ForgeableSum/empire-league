import type { QueueDefinition } from "./matchmaking.js";

export interface PartyMember {
  id: string;
  displayName: string;
  rating: number;
  teamRating: number;
  avatarUrl?: string;
}

export interface PartyMessage {
  id: string;
  playerId?: string;
  author: string;
  text: string;
  sentAt: string;
  system?: boolean;
}

export interface PartyInvite {
  id: string;
  partyId: string;
  inviterId: string;
  inviterName: string;
  createdAt: string;
}

export interface Party {
  id: string;
  leaderId: string;
  members: PartyMember[];
  messages: PartyMessage[];
  createdAt: string;
  isLeader: boolean;
  activeQueue: { queue: QueueDefinition; joinedAt: string; ticketId: string | null } | null;
}

export interface PartySnapshot {
  party: Party | null;
  invites: PartyInvite[];
}
