import { randomUUID } from "node:crypto";

const defaultMaximumMembers = 4;
const defaultMaximumMessages = 100;

export class PartyOperationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "PartyOperationError";
    this.status = status;
  }
}

export function createPartyStore({ maximumMembers = defaultMaximumMembers, maximumMessages = defaultMaximumMessages } = {}) {
  const parties = new Map();
  const partyByPlayer = new Map();
  const invites = new Map();

  function partyFor(playerId) {
    const partyId = partyByPlayer.get(playerId);
    return partyId ? parties.get(partyId) ?? null : null;
  }

  function publicParty(party, viewerId) {
    if (!party) return null;
    return {
      id: party.id,
      leaderId: party.leaderId,
      members: party.members.map(({ id, displayName, rating, teamRating, avatarUrl }) => ({
        id, displayName, rating, teamRating, ...(avatarUrl ? { avatarUrl } : {})
      })),
      messages: party.messages,
      createdAt: party.createdAt,
      isLeader: party.leaderId === viewerId,
      activeQueue: party.activeQueue
        ? {
            queue: party.activeQueue.queue,
            joinedAt: party.activeQueue.joinedAt,
            ticketId: party.activeQueue.ticketIds.get(viewerId) ?? null
          }
        : null
    };
  }

  function snapshot(playerId) {
    return {
      party: publicParty(partyFor(playerId), playerId),
      invites: [...invites.values()]
        .filter((invite) => invite.recipientId === playerId)
        .map(({ id, partyId, inviterId, inviterName, createdAt }) => ({ id, partyId, inviterId, inviterName, createdAt }))
    };
  }

  function create(leader) {
    const existing = partyFor(leader.id);
    if (existing) return existing;
    const party = {
      id: `party-${randomUUID()}`,
      leaderId: leader.id,
      members: [leader],
      messages: [],
      activeQueue: null,
      createdAt: new Date().toISOString()
    };
    parties.set(party.id, party);
    partyByPlayer.set(leader.id, party.id);
    for (const [id, invite] of invites) if (invite.recipientId === leader.id) invites.delete(id);
    return party;
  }

  function requireParty(playerId) {
    const party = partyFor(playerId);
    if (!party) throw new PartyOperationError("You are not in a party.", 404);
    return party;
  }

  function requireLeader(playerId) {
    const party = requireParty(playerId);
    if (party.leaderId !== playerId) throw new PartyOperationError("Only the party leader can do that.", 403);
    return party;
  }

  function invite(leader, recipient) {
    const party = requireLeader(leader.id);
    if (party.activeQueue) throw new PartyOperationError("You cannot invite players while the party is queued.", 409);
    if (party.members.length >= maximumMembers) throw new PartyOperationError("The party is full.", 409);
    if (partyFor(recipient.id)) throw new PartyOperationError("That player is already in a party.", 409);
    const duplicate = [...invites.values()].find((item) => item.partyId === party.id && item.recipientId === recipient.id);
    if (duplicate) return duplicate;
    const invite = {
      id: `party-invite-${randomUUID()}`,
      partyId: party.id,
      inviterId: leader.id,
      inviterName: leader.displayName,
      recipientId: recipient.id,
      createdAt: new Date().toISOString()
    };
    invites.set(invite.id, invite);
    return invite;
  }

  function accept(inviteId, player) {
    const invite = invites.get(inviteId);
    if (!invite || invite.recipientId !== player.id) throw new PartyOperationError("Party invite not found.", 404);
    if (partyFor(player.id)) throw new PartyOperationError("Leave your current party first.", 409);
    const party = parties.get(invite.partyId);
    if (!party) throw new PartyOperationError("That party no longer exists.", 410);
    if (party.activeQueue) throw new PartyOperationError("That party is already queued.", 409);
    if (party.members.length >= maximumMembers) throw new PartyOperationError("That party is full.", 409);
    party.members.push(player);
    partyByPlayer.set(player.id, party.id);
    for (const [id, pending] of invites) {
      if (pending.recipientId === player.id || pending.partyId === party.id && pending.recipientId === player.id) invites.delete(id);
    }
    addSystemMessage(party, `${player.displayName} joined the party.`);
    return party;
  }

  function decline(inviteId, playerId) {
    const invite = invites.get(inviteId);
    if (!invite || invite.recipientId !== playerId) throw new PartyOperationError("Party invite not found.", 404);
    invites.delete(inviteId);
    return invite;
  }

  function removeMember(actorId, memberId) {
    const party = requireParty(actorId);
    if (actorId !== memberId && party.leaderId !== actorId) {
      throw new PartyOperationError("Only the party leader can remove members.", 403);
    }
    if (party.activeQueue) throw new PartyOperationError("Leave matchmaking before changing the party.", 409);
    const member = party.members.find((item) => item.id === memberId);
    if (!member) throw new PartyOperationError("Party member not found.", 404);
    if (memberId === party.leaderId) {
      return disband(actorId);
    }
    party.members = party.members.filter((item) => item.id !== memberId);
    partyByPlayer.delete(memberId);
    addSystemMessage(party, `${member.displayName} left the party.`);
    return { party, removedIds: [memberId], disbanded: false };
  }

  function disband(leaderId) {
    const party = requireLeader(leaderId);
    if (party.activeQueue) throw new PartyOperationError("Leave matchmaking before disbanding the party.", 409);
    const removedIds = party.members.map((member) => member.id);
    for (const memberId of removedIds) partyByPlayer.delete(memberId);
    parties.delete(party.id);
    for (const [id, invite] of invites) if (invite.partyId === party.id) invites.delete(id);
    return { party, removedIds, disbanded: true };
  }

  function addMessage(playerId, text) {
    const party = requireParty(playerId);
    const member = party.members.find((item) => item.id === playerId);
    const message = {
      id: randomUUID(),
      playerId,
      author: member.displayName,
      text,
      sentAt: new Date().toISOString()
    };
    party.messages.push(message);
    party.messages = party.messages.slice(-maximumMessages);
    return { party, message };
  }

  function addSystemMessage(party, text) {
    party.messages.push({ id: randomUUID(), author: "Party", text, sentAt: new Date().toISOString(), system: true });
    party.messages = party.messages.slice(-maximumMessages);
  }

  function setActiveQueue(partyId, queue, ticketIds, joinedAt) {
    const party = parties.get(partyId);
    if (!party) throw new PartyOperationError("Party not found.", 404);
    party.activeQueue = { queue, ticketIds: new Map(ticketIds), joinedAt };
    addSystemMessage(party, `Searching for ${queue.name}.`);
    return party;
  }

  function clearActiveQueue(partyId, message) {
    const party = parties.get(partyId);
    if (!party || !party.activeQueue) return party ?? null;
    party.activeQueue = null;
    if (message) addSystemMessage(party, message);
    return party;
  }

  return {
    partyFor,
    publicParty,
    snapshot,
    create,
    requireParty,
    requireLeader,
    invite,
    accept,
    decline,
    removeMember,
    disband,
    addMessage,
    addSystemMessage,
    setActiveQueue,
    clearActiveQueue
  };
}

export function eligibleTeamSize(memberCount) {
  return memberCount === 2 || memberCount === 3 || memberCount === 4 ? memberCount : null;
}

export function validatePartyQueue(party, queue) {
  if (!party) return;
  if (party.leaderId === undefined || !Array.isArray(party.members)) throw new PartyOperationError("Invalid party.", 500);
  const size = eligibleTeamSize(party.members.length);
  if (!size) {
    throw new PartyOperationError(`A party of ${party.members.length} cannot enter matchmaking. Ranked parties must have exactly 2, 3, or 4 players.`, 409);
  }
  if (queue.id !== "team-games" || queue.tournamentId || queue.format !== "team" || !queue.teamSizes?.includes(size)) {
    throw new PartyOperationError(`A party of ${party.members.length} can only queue for ${size}v${size}.`, 409);
  }
  return size;
}

export function partyMatchmakingRating(ticket, ticketList, ratingFor) {
  if (!ticket.partyId) return ratingFor(ticket);
  const members = ticketList.filter((candidate) =>
    candidate.partyId === ticket.partyId && candidate.queueId === ticket.queueId && !candidate.matchId);
  if (!members.length) return ratingFor(ticket);
  return members.reduce((total, candidate) => total + ratingFor(candidate), 0) / members.length;
}

export function completePartyTeam(participants, teamSize) {
  const groups = new Map();
  for (const participant of participants) {
    if (!participant.partyId) continue;
    const group = groups.get(participant.partyId) ?? [];
    group.push(participant);
    groups.set(participant.partyId, group);
  }
  return [...groups.values()].find((group) => group.length === teamSize) ?? null;
}
