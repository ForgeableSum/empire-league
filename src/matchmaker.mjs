import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { playerRatingForQueue, ratingPoolForQueue } from "./rating-pool.mjs";
import { replayPlayerWon } from "./replay-result.mjs";
import { WebSocket, WebSocketServer } from "ws";
import {
  database,
  checkDatabase,
  getLeaderboard,
  getPlayerProfile,
  getPlayerByDisplayName,
  getSocialSnapshot,
  createFriendRequest,
  acceptFriendRequest,
  deleteSocialConnection,
  areFriends,
  removeFriend,
  getPlayerMatchHistory,
  linkPlayerAoeProfile,
  recordMatchResultConflict,
  recordVerifiedMatchResult
} from "./database.mjs";
import { replaySettingsAgree, validateRankedReplaySettings } from "./replayRules.mjs";
import { authenticate, beginSteamLogin, completeSteamLogin, pollSteamLogin, revokeSession } from "./auth.mjs";
import { normalizeQueueMapPreferences, publicMapCatalog, selectMapForMatch } from "./map-catalog.mjs";
import {
  civilizationBansForMapGroup,
  effectiveCivilizationPreference,
  normalizeCivilizationPreference,
  rollCivilizationPreference
} from "./civilization-roll.mjs";

const port = Number(process.env.EMPIRE_MATCHMAKER_PORT ?? 4317);
const host = process.env.MATCHMAKER_HOST ?? "127.0.0.1";
const publicBaseUrl = (process.env.PUBLIC_MATCHMAKER_URL ?? `http://127.0.0.1:${port}`).replace(/\/$/, "");
const tickets = new Map();
const matches = new Map();
const playersJoiningQueue = new Set();
const rematchCooldowns = new Map();
const leaderboardCache = new Map();
const leaderboardCacheTtlMs = 3 * 60 * 1000;
const leaderboardDivisions = new Set([
  "copper", "bronze", "silver", "gold", "platinum", "diamond", "master", "grandmaster"
]);
const minimumQueueTimeMs = 15_000;
const declinedPairCooldownMs = 30 * 1000;
const matchSetupTimeoutMs = Number(process.env.MATCH_SETUP_TIMEOUT_MS ?? 120_000);
const matchResultTimeoutMs = Number(process.env.MATCH_RESULT_TIMEOUT_MS ?? 6 * 60 * 60 * 1000);
const ticketDisconnectGraceMs = Number(process.env.TICKET_DISCONNECT_GRACE_MS ?? 20_000);
const soloRatingRangeSchedule = [
  { afterMs: 0, spread: 50 },
  { afterMs: 20_000, spread: 75 },
  { afterMs: 40_000, spread: 100 },
  { afterMs: 60_000, spread: 150 },
  { afterMs: 90_000, spread: 250 }
];
const teamRatingRangeSchedule = [
  { afterMs: 0, spread: 100 },
  { afterMs: 20_000, spread: 150 },
  { afterMs: 40_000, spread: 225 },
  { afterMs: 60_000, spread: 325 },
  { afterMs: 90_000, spread: 500 }
];
let eventSequence = 0;
let rematchCooldownCleanupTimer;
const socialPresence = new Map();
const socialFriendIds = new Map();
const socialMessages = new Map();
const socialUnread = new Map();
const maxSocialMessagesPerConversation = 100;

function conversationKey(leftId, rightId) {
  return [leftId, rightId].sort().join(":");
}

function publicPresence(playerId) {
  const connected = [...webSocketServer.clients].some(
    (socket) => socket.readyState === WebSocket.OPEN && socketSessions.get(socket)?.player?.id === playerId
  );
  if (!connected) return { presence: "offline", activity: "Offline" };
  const value = socialPresence.get(playerId);
  if (!value) return { presence: "online", activity: "Online" };
  return value;
}

function sendToPlayer(playerId, message) {
  for (const socket of webSocketServer.clients) {
    if (socketSessions.get(socket)?.player?.id === playerId) sendSocket(socket, message);
  }
}

async function refreshSocialCache(playerId) {
  const snapshot = await getSocialSnapshot(playerId);
  socialFriendIds.set(playerId, new Set(snapshot.friends.map((friend) => friend.id)));
  return {
    ...snapshot,
    friends: snapshot.friends.map((friend) => ({
      ...friend,
      ...publicPresence(friend.id),
      unread: socialUnread.get(playerId)?.get(friend.id) ?? 0
    }))
  };
}

async function emitSocialGraphChanged(...playerIds) {
  for (const playerId of new Set(playerIds)) {
    const snapshot = await refreshSocialCache(playerId);
    sendToPlayer(playerId, { type: "social_event", event: { type: "snapshot", snapshot } });
  }
}

function broadcastPresence(playerId) {
  const event = { type: "presence", playerId, ...publicPresence(playerId) };
  for (const friendId of socialFriendIds.get(playerId) ?? []) {
    sendToPlayer(friendId, { type: "social_event", event });
  }
}

async function ensureFriends(leftId, rightId) {
  if (socialFriendIds.get(leftId)?.has(rightId)) return true;
  if (!await areFriends(leftId, rightId)) return false;
  socialFriendIds.get(leftId)?.add(rightId);
  socialFriendIds.get(rightId)?.add(leftId);
  return true;
}

async function getCachedLeaderboard(page, division) {
  const safePage = Math.max(1, Math.floor(Number(page) || 1));
  const requestedDivision = String(division ?? "all").trim().toLowerCase();
  const safeDivision = leaderboardDivisions.has(requestedDivision) ? requestedDivision : "all";
  const cacheKey = `${safeDivision}:${safePage}`;
  const now = Date.now();
  const cached = leaderboardCache.get(cacheKey);
  if (cached?.value && cached.expiresAt > now) return cached.value;
  if (cached?.promise) return cached.promise;

  for (const [key, entry] of leaderboardCache) {
    if (!entry.promise && entry.expiresAt <= now) leaderboardCache.delete(key);
  }

  const promise = getLeaderboard(safePage, 100, safeDivision)
    .then((value) => {
      leaderboardCache.set(cacheKey, {
        value,
        expiresAt: Date.now() + leaderboardCacheTtlMs
      });
      return value;
    })
    .catch((error) => {
      leaderboardCache.delete(cacheKey);
      throw error;
    });
  leaderboardCache.set(cacheKey, { promise, expiresAt: 0 });
  return promise;
}

function send(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(body));
}

function sendHtml(response, status, body) {
  response.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  response.end(body);
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
}

function emit(ticket, event) {
  const item = { sequence: ++eventSequence, event };
  ticket.events.push(item);
  for (const socket of ticket.eventSockets ?? []) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "event", ticketId: ticket.id, ...item }));
    }
  }
}

function clearMatchTimers(match) {
  clearTimeout(match.expirationTimer);
  clearTimeout(match.lifecycleTimer);
  match.expirationTimer = undefined;
  match.lifecycleTimer = undefined;
}

function clearTicketDisconnectTimer(ticket) {
  clearTimeout(ticket.disconnectTimer);
  ticket.disconnectTimer = undefined;
  ticket.disconnectedAt = undefined;
}

function clearTicketSearchTimers(ticket) {
  clearTimeout(ticket.matchSearchTimer);
  for (const timer of ticket.ratingRangeTimers ?? []) clearTimeout(timer);
  ticket.matchSearchTimer = undefined;
  ticket.ratingRangeTimers = [];
}

function matchTickets(match) {
  return match.participants ?? [match.host, match.guest];
}

function matchGuests(match) {
  return matchTickets(match).filter((ticket) => ticket.id !== match.host.id);
}

function emitToMatch(match, event, exceptTicketId) {
  for (const ticket of matchTickets(match)) {
    if (ticket.id !== exceptTicketId) emit(ticket, event);
  }
}

function deleteMatch(match) {
  clearMatchTimers(match);
  matches.delete(match.id);
  for (const ticket of matchTickets(match)) {
    clearTicketSearchTimers(ticket);
    clearTicketDisconnectTimer(ticket);
    if (tickets.get(ticket.id) === ticket) tickets.delete(ticket.id);
    ticket.matchId = null;
  }
}

function deleteDisconnectedTicket(ticket, message = "The other player disconnected from the match.") {
  if (tickets.get(ticket.id) !== ticket || ticket.eventSockets?.size) return false;
  const match = ticket.matchId ? matches.get(ticket.matchId) : null;
  if (match?.startedAt) {
    clearTimeout(ticket.disconnectTimer);
    ticket.disconnectTimer = undefined;
    return false;
  }
  clearTicketSearchTimers(ticket);
  clearTicketDisconnectTimer(ticket);
  if (!match) {
    tickets.delete(ticket.id);
    console.warn(`[matchmaker] ${ticket.id}: disconnected ticket removed`);
    return true;
  }
  emitToMatch(match, { type: "error", code: "MATCH_DISCONNECTED", message }, ticket.id);
  deleteMatch(match);
  console.warn(`[matchmaker] ${match.id}: disconnected player ${ticket.player.id} removed`);
  return true;
}

function scheduleTicketDisconnectCleanup(ticket) {
  clearTimeout(ticket.disconnectTimer);
  ticket.disconnectedAt = Date.now();
  ticket.disconnectTimer = setTimeout(() => {
    deleteDisconnectedTicket(ticket);
  }, ticketDisconnectGraceMs);
  ticket.disconnectTimer.unref?.();
}

function rematchCooldownKey(firstPlayerId, secondPlayerId) {
  return JSON.stringify([firstPlayerId, secondPlayerId].sort());
}

function clearExpiredRematchCooldowns(now = Date.now()) {
  let removed = 0;
  for (const [key, expiresAt] of rematchCooldowns) {
    if (expiresAt <= now) {
      rematchCooldowns.delete(key);
      removed += 1;
    }
  }
  return removed;
}

async function retryWaitingTicketsAfterCooldown() {
  for (const ticket of tickets.values()) {
    if (!ticket.matchId && hasCompletedMinimumQueueTime(ticket)) await tryMatch(ticket);
  }
}

function scheduleRematchCooldownCleanup() {
  clearTimeout(rematchCooldownCleanupTimer);
  rematchCooldownCleanupTimer = undefined;
  if (!rematchCooldowns.size) return;

  let nextExpiration = Number.POSITIVE_INFINITY;
  for (const expiresAt of rematchCooldowns.values()) {
    if (expiresAt < nextExpiration) nextExpiration = expiresAt;
  }
  rematchCooldownCleanupTimer = setTimeout(() => {
    rematchCooldownCleanupTimer = undefined;
    const removed = clearExpiredRematchCooldowns();
    scheduleRematchCooldownCleanup();
    if (removed) {
      void retryWaitingTicketsAfterCooldown().catch((error) => {
        console.error("[matchmaker] Failed to retry tickets after rematch cooldown cleanup:", error);
      });
    }
  }, Math.max(0, nextExpiration - Date.now()));
  rematchCooldownCleanupTimer.unref?.();
}

function addDeclinedPairCooldown(match) {
  if (match.teamSize !== 1) return;

  const expiresAt = Date.now() + declinedPairCooldownMs;
  const players = matchTickets(match);
  for (let left = 0; left < players.length; left += 1) {
    for (let right = left + 1; right < players.length; right += 1) {
      const key = rematchCooldownKey(players[left].player.id, players[right].player.id);
      rematchCooldowns.set(key, Math.max(rematchCooldowns.get(key) ?? 0, expiresAt));
    }
  }
  scheduleRematchCooldownCleanup();
  console.log(`[matchmaker] ${match.id}: participant rematches blocked until ${new Date(expiresAt).toISOString()}`);
}

function hasDeclinedPairCooldown(firstPlayerId, secondPlayerId, now = Date.now()) {
  const key = rematchCooldownKey(firstPlayerId, secondPlayerId);
  const expiresAt = rematchCooldowns.get(key);
  if (!expiresAt) return false;
  if (expiresAt > now) return true;
  rematchCooldowns.delete(key);
  scheduleRematchCooldownCleanup();
  return false;
}

function expireActiveMatch(match, message, code = "MATCH_EXPIRED") {
  if (!matches.has(match.id)) return;
  emitToMatch(match, { type: "error", code, message });
  deleteMatch(match);
  console.warn(`[matchmaker] ${match.id}: ${message}`);
}

function scheduleMatchLifecycleTimeout(match, timeoutMs, message) {
  clearTimeout(match.lifecycleTimer);
  match.lifecycleTimer = setTimeout(() => expireActiveMatch(match, message), timeoutMs);
  match.lifecycleTimer.unref?.();
}

function refreshMatchSetupTimeout(match) {
  clearTimeout(match.lifecycleTimer);
  match.lifecycleTimer = setTimeout(() => {
    expireActiveMatch(
      match,
      "The lobby setup timed out before the game started.",
      "MATCH_SETUP_FAILED"
    );
  }, matchSetupTimeoutMs);
  match.lifecycleTimer.unref?.();
}

async function reconcileReplayPlayerLinks(match, actingTicket, replay) {
  if (!replay || !Array.isArray(replay.players)) return;
  const reportedProfileIds = new Set(replay.players.map((player) => player.profileId));
  if (!actingTicket.player.aoeProfileId
    && Number.isSafeInteger(replay.reporterProfileId)
    && reportedProfileIds.has(replay.reporterProfileId)) {
    const linked = await linkPlayerAoeProfile(actingTicket.player.id, replay.reporterProfileId);
    if (linked) {
      actingTicket.player.aoeProfileId = replay.reporterProfileId;
      console.log(`[matchmaker] Linked ${actingTicket.player.id} to AoE profile ${replay.reporterProfileId} from replay perspective`);
    }
  }

  const participants = matchTickets(match);
  const missing = participants.filter((ticket) => !ticket.player.aoeProfileId);
  const known = new Set(participants.map((ticket) => ticket.player.aoeProfileId).filter(Boolean));
  const remaining = [...reportedProfileIds].filter((profileId) => !known.has(profileId));
  if (missing.length === 1 && remaining.length === 1 && [...known].every((profileId) => reportedProfileIds.has(profileId))) {
    const linked = await linkPlayerAoeProfile(missing[0].player.id, remaining[0]);
    if (linked) {
      missing[0].player.aoeProfileId = remaining[0];
      console.log(`[matchmaker] Linked ${missing[0].player.id} to AoE profile ${remaining[0]} by replay elimination`);
    }
  }
}

function validateReplayReport(match, actingTicket, replay) {
  if (!replay || !Number.isInteger(replay.winnerProfileId) || !Number.isInteger(replay.loserProfileId)) {
    return "winner and loser profile IDs are required";
  }
  if (!Number.isFinite(replay.durationMs) || replay.durationMs <= 0 || !Array.isArray(replay.players)) {
    return "duration and player metadata are required";
  }
  if (!Number.isSafeInteger(replay.fileSizeBytes) || replay.fileSizeBytes <= 0) {
    return "replay file size is required";
  }
  const invalidSettings = validateRankedReplaySettings(replay.settings, matchTickets(match).length);
  if (invalidSettings) return invalidSettings;
  if (replay.reporterProfileId !== actingTicket.player.aoeProfileId) {
    return "replay perspective does not match the reporting player";
  }
  const expected = matchTickets(match).map((ticket) => ticket.player.aoeProfileId).sort((a, b) => a - b);
  const reported = replay.players.map((player) => player.profileId).sort((a, b) => a - b);
  if (reported.length !== expected.length || expected.some((profileId, index) => profileId !== reported[index])) {
    return "replay players do not match the matched players";
  }
  if (!expected.includes(replay.winnerProfileId) || !expected.includes(replay.loserProfileId)
    || replay.winnerProfileId === replay.loserProfileId) {
    return "replay winner and loser do not match the match";
  }
  if (match.teamSize > 1) {
    const winning = new Set(replay.winningProfileIds);
    const losing = new Set(replay.losingProfileIds);
    if (winning.size !== match.teamSize || losing.size !== match.teamSize
      || [...winning, ...losing].some((profileId) => !expected.includes(profileId))) {
      return "replay winning and losing teams do not match the team size";
    }
    const expectedTeams = [1, 2].map((team) => new Set(
      matchTickets(match)
        .filter((ticket) => match.assignments.get(ticket.id).team === team)
        .map((ticket) => ticket.player.aoeProfileId)
    ));
    const matchesAssignedTeam = expectedTeams.some((team) =>
      team.size === winning.size && [...team].every((profileId) => winning.has(profileId)));
    if (!matchesAssignedTeam) return "replay teams do not match the assigned lobby teams";
  }
  return null;
}

function replayReportsAgree(left, right) {
  // File size and recording timestamp are local replay artifacts. Duration can
  // also vary slightly between clients depending on when each file is flushed.
  const durationToleranceMs = 5_000;
  if (Math.abs(left.durationMs - right.durationMs) > durationToleranceMs) return false;
  if (left.build !== right.build
    || left.winnerProfileId !== right.winnerProfileId
    || left.loserProfileId !== right.loserProfileId
    || left.reason !== right.reason) {
    return false;
  }
  const normalizeTeam = (profileIds) => [...(profileIds ?? [])].sort((a, b) => a - b);
  if (JSON.stringify(normalizeTeam(left.winningProfileIds)) !== JSON.stringify(normalizeTeam(right.winningProfileIds))
    || JSON.stringify(normalizeTeam(left.losingProfileIds)) !== JSON.stringify(normalizeTeam(right.losingProfileIds))) {
    return false;
  }
  if (!replaySettingsAgree(left.settings, right.settings)) return false;

  const normalizePlayers = (players) => [...players]
    .map((player) => ({
      profileId: player.profileId,
      playerNumber: player.playerNumber,
      civilizationId: player.civilizationId,
      resigned: player.resigned
    }))
    .sort((a, b) => a.profileId - b.profileId);

  return JSON.stringify(normalizePlayers(left.players)) === JSON.stringify(normalizePlayers(right.players));
}

function resultForTicket(match, ticket, replay, ratings) {
  const playerRatings = ratings[ticket.player.id];
  const won = replayPlayerWon(replay, ticket.player.aoeProfileId);
  return {
    ratingPool: ratingPoolForQueue(ticket.queueId),
    winnerProfileId: replay.winnerProfileId,
    loserProfileId: replay.loserProfileId,
    outcome: won ? "win" : "loss",
    reason: replay.reason,
    oldRating: playerRatings.oldRating,
    newRating: playerRatings.newRating,
    ratingChange: playerRatings.ratingChange,
    verified: true,
    verificationSource: "replay",
    verificationStatus: "verified"
  };
}

function contestedResultForTicket(ticket) {
  const currentRating = playerRatingForQueue(ticket.player, ticket.queueId);
  return {
    ratingPool: ratingPoolForQueue(ticket.queueId),
    winnerProfileId: 0,
    loserProfileId: 0,
    outcome: "no_contest",
    reason: "unknown",
    oldRating: currentRating,
    newRating: currentRating,
    ratingChange: 0,
    verified: false,
    verificationSource: "replay",
    verificationStatus: "contested"
  };
}

async function resolveContestedResult(match, detail, implicatedTicketIds, reports) {
  console.warn(`[matchmaker] CONTESTED_RESULT ${JSON.stringify({ matchId: match.id, ...detail })}`);
  await recordMatchResultConflict(match, {
    reason: detail.reason,
    implicatedTicketIds,
    reports
  });
  match.resultResolved = true;
  for (const ticket of matchTickets(match)) {
    emit(ticket, {
      type: "result_contested",
      matchId: match.id,
      result: contestedResultForTicket(ticket)
    });
  }
  deleteMatch(match);
}

function sharedMapPool(firstQueue, secondQueue) {
  const secondMapIds = new Set(secondQueue.mapPool.map((map) => map.id));
  return firstQueue.mapPool.filter((map) => secondMapIds.has(map.id));
}

function hasCompletedMinimumQueueTime(ticket, now = Date.now()) {
  return now - new Date(ticket.joinedAt).getTime() >= minimumQueueTimeMs;
}

function opponentPreference(ticket, candidate) {
  const ratingDifference = Math.abs(
    playerRatingForQueue(candidate.player, candidate.queueId)
      - playerRatingForQueue(ticket.player, ticket.queueId)
  );
  return [
    Number.isFinite(ratingDifference) ? ratingDifference : Number.MAX_SAFE_INTEGER,
    new Date(candidate.joinedAt).getTime()
  ];
}

function compareOpponentPreference(ticket, left, right) {
  const leftPreference = opponentPreference(ticket, left);
  const rightPreference = opponentPreference(ticket, right);
  return leftPreference[0] - rightPreference[0]
    || leftPreference[1] - rightPreference[1]
    || left.id.localeCompare(right.id);
}

function ratingRangeScheduleForTicket(ticket) {
  return ticket.queue.format === "team" ? teamRatingRangeSchedule : soloRatingRangeSchedule;
}

function ratingSpreadForTicket(ticket, now = Date.now()) {
  const elapsed = Math.max(0, now - new Date(ticket.joinedAt).getTime());
  const schedule = ratingRangeScheduleForTicket(ticket);
  return [...schedule].reverse().find((step) => elapsed >= step.afterMs)?.spread
    ?? schedule[0].spread;
}

function emitRatingRange(ticket, now = Date.now()) {
  const rating = playerRatingForQueue(ticket.player, ticket.queueId);
  const spread = ratingSpreadForTicket(ticket, now);
  emit(ticket, { type: "range", minRating: rating - spread, maxRating: rating + spread });
}

function ratingsAreInRange(ticket, candidate, now = Date.now()) {
  const difference = Math.abs(
    playerRatingForQueue(ticket.player, ticket.queueId)
      - playerRatingForQueue(candidate.player, candidate.queueId)
  );
  const ticketAllowsCandidate = ticket.queue.findAnyone === true
    || difference <= ratingSpreadForTicket(ticket, now);
  const candidateAllowsTicket = candidate.queue.findAnyone === true
    || difference <= ratingSpreadForTicket(candidate, now);
  return ticketAllowsCandidate && candidateAllowsTicket;
}

function scheduleRatingRanges(ticket) {
  emitRatingRange(ticket);
  ticket.ratingRangeTimers = ratingRangeScheduleForTicket(ticket).slice(1).map((step) => setTimeout(() => {
    if (tickets.get(ticket.id) !== ticket || ticket.matchId) return;
    emitRatingRange(ticket);
    void tryMatch(ticket).catch((error) => {
      console.error(`[matchmaker] Failed to match expanded-range ticket ${ticket.id}:`, error);
    });
  }, step.afterMs));
}

function normalizeMaximumLowerOpponentRatingGap(value) {
  const gap = Number(value ?? 0);
  if (![0, 200, 300, 400, 500].includes(gap)) {
    throw new Error("maximum lower opponent rating gap must be Off or an increment from 200 to 500");
  }
  return gap;
}

function allowsOpponentRating(ticket, candidate) {
  if (ticket.queue.format === "team" || ticket.queue.findAnyone === true) return true;
  const maximumGap = ticket.maximumLowerOpponentRatingGap;
  return maximumGap === 0
    || playerRatingForQueue(candidate.player, candidate.queueId)
      >= playerRatingForQueue(ticket.player, ticket.queueId) - maximumGap;
}

function balancedTeamAssignments(participants, host, teamSize) {
  const ranked = [...participants].sort((left, right) =>
    playerRatingForQueue(right.player, right.queueId) - playerRatingForQueue(left.player, left.queueId));
  if (teamSize === 1) {
    return [[host], ranked.filter((participant) => participant.id !== host.id)];
  }

  const candidates = ranked.filter((participant) => participant.id !== host.id);
  const hostRating = playerRatingForQueue(host.player, host.queueId);
  let bestTeamOne = null;
  let bestDifference = Number.POSITIVE_INFINITY;

  function considerTeamOne(teammates) {
    const teamOneIds = new Set([host.id, ...teammates.map((participant) => participant.id)]);
    const teamTwo = ranked.filter((participant) => !teamOneIds.has(participant.id));
    const teamOneTotal = hostRating + teammates.reduce(
      (total, participant) => total + playerRatingForQueue(participant.player, participant.queueId),
      0
    );
    const teamTwoTotal = teamTwo.reduce(
      (total, participant) => total + playerRatingForQueue(participant.player, participant.queueId),
      0
    );
    const difference = Math.abs(teamOneTotal - teamTwoTotal);
    if (difference < bestDifference) {
      bestDifference = difference;
      bestTeamOne = teammates;
    }
  }

  function chooseTeammates(start, selected) {
    if (selected.length === teamSize - 1) {
      considerTeamOne(selected);
      return;
    }
    for (let index = start; index <= candidates.length - (teamSize - 1 - selected.length); index += 1) {
      chooseTeammates(index + 1, [...selected, candidates[index]]);
    }
  }

  chooseTeammates(0, []);
  const teamOne = [host, ...bestTeamOne];
  const teamOneIds = new Set(teamOne.map((participant) => participant.id));
  return [teamOne, ranked.filter((participant) => !teamOneIds.has(participant.id))];
}

function sessionFor(match, ticket) {
  const assignment = match.assignments.get(ticket.id);
  const opponent = matchTickets(match).find((candidate) => match.assignments.get(candidate.id)?.team !== assignment.team);
  const playerCivilizationPreference = match.civilizationPreferences.get(ticket.id);
  const opponentCivilizationPreference = match.civilizationPreferences.get(opponent.id);
  return {
    id: match.id,
    status: "match_found",
    queue: {
      ...ticket.queue,
      teamSizes: ticket.queue.format === "team" ? [match.teamSize] : undefined,
      civilizationPreference: playerCivilizationPreference
    },
    opponentCivilizationPreference,
    player: ticket.player,
    opponent: opponent.player,
    role: match.host.id === ticket.id ? "host" : "guest",
    lobbySlot: assignment.slot,
    team: assignment.team,
    hostPlayerId: match.host.player.aoeProfileId,
    acceptedByPlayer: match.accepted.has(ticket.id),
    acceptedByOpponent: match.accepted.has(opponent.id),
    acceptDeadline: match.acceptDeadline,
    selectedMap: match.selectedMap,
    createdAt: match.createdAt
  };
}

async function tryMatch(ticket) {
  if (ticket.matchId || !tickets.has(ticket.id) || !hasCompletedMinimumQueueTime(ticket)) return;

  const candidates = [...tickets.values()].filter((candidate) =>
    candidate.id !== ticket.id
      && candidate.player.id !== ticket.player.id
      && !candidate.matchId
      && hasCompletedMinimumQueueTime(candidate)
      && candidate.queueId === ticket.queueId
      && !hasDeclinedPairCooldown(ticket.player.id, candidate.player.id)
      && ratingsAreInRange(ticket, candidate)
      && allowsOpponentRating(ticket, candidate)
      && allowsOpponentRating(candidate, ticket)
      && sharedMapPool(candidate.queue, ticket.queue).length > 0
  ).sort((left, right) => compareOpponentPreference(ticket, left, right));
  const possibleSizes = ticket.queue.format === "team"
    ? [4, 2].filter((size) => ticket.queue.teamSizes?.includes(size))
    : [1];
  let teamSize;
  let participants;
  for (const size of possibleSizes) {
    const required = size * 2;
    const compatible = [ticket];
    for (const candidate of candidates) {
      if (ticket.queue.format === "team" && !candidate.queue.teamSizes?.includes(size)) continue;
      if (!compatible.every((participant) => ratingsAreInRange(participant, candidate))) continue;
      compatible.push(candidate);
      if (compatible.length === required) break;
    }
    if (compatible.length === required) {
      teamSize = size;
      participants = compatible;
      break;
    }
  }
  if (!teamSize || !participants) return;
  const host = participants.filter((candidate) => candidate.canHost)
    .sort((left, right) => new Date(left.joinedAt) - new Date(right.joinedAt))[0];
  if (!host) return;
  const guests = participants.filter((candidate) => candidate.id !== host.id);
  const guest = guests[0];
  let sharedMaps = participants[0].queue.mapPool;
  for (const participant of participants.slice(1)) {
    sharedMaps = sharedMapPool({ mapPool: sharedMaps }, participant.queue);
  }
  const selectedMap = selectMapForMatch(
    { ...host.queue, mapPool: sharedMaps },
    { ...guest.queue, mapPool: sharedMaps }
  );
  if (!selectedMap) return;
  const mapGroupId = publicMapCatalog.maps.find((map) => map.id === selectedMap.id)?.groupId ?? null;
  const effectivePreferences = new Map(participants.map((participant) => {
    const preference = participant.queue.civilizationPreference;
    return [
      participant.id,
      effectiveCivilizationPreference(
        preference,
        participants
          .filter((other) => other.id !== participant.id)
          .map((other) => other.queue.civilizationPreference)
      )
    ];
  }));
  const sharedCivilizationBans = participants.flatMap((participant) =>
    civilizationBansForMapGroup(effectivePreferences.get(participant.id), mapGroupId));
  const [teamOne, teamTwo] = balancedTeamAssignments(participants, host, teamSize);
  const ordered = [...teamOne, ...teamTwo];
  const assignments = new Map(ordered.map((participant, index) => [
    participant.id,
    { slot: index + 1, team: index < teamSize ? 1 : 2 }
  ]));
  const match = {
    id: `match-${randomUUID().slice(0, 8)}`,
    host,
    guest,
    guests,
    participants,
    assignments,
    teamSize,
    accepted: new Set(),
    selectedMap,
    createdAt: new Date().toISOString(),
    acceptDeadline: new Date(Date.now() + 30_000).toISOString(),
    lobby: null,
    guestLobbyJoined: new Set(),
    guestContentAccepted: new Set(),
    guestLobbyReady: new Set(),
    resultReports: new Map(),
    resultResolved: false,
    mapCatalogVersion: publicMapCatalog.version,
    mapGroupId,
    civilizationPreferences: new Map(participants.map((participant) => [
      participant.id,
      rollCivilizationPreference(effectivePreferences.get(participant.id), mapGroupId, sharedCivilizationBans)
    ]))
  };
  for (const participant of participants) {
    participant.matchId = match.id;
    clearTicketSearchTimers(participant);
  }
  matches.set(match.id, match);
  for (const participant of participants) {
    emit(participant, { type: "match_found", match: sessionFor(match, participant) });
  }
  match.expirationTimer = setTimeout(() => {
    void expireMatch(match);
  }, Math.max(0, new Date(match.acceptDeadline).getTime() - Date.now()));
  console.log(`[matchmaker] ${match.id}: ${teamSize}v${teamSize}, host=${host.player.displayName}`);
}

async function expireMatch(match) {
  if (match.accepted.size === matchTickets(match).length || !matches.has(match.id)) return;
  emitToMatch(match, { type: "error", code: "MATCH_EXPIRED", message: "The match acceptance window expired." });
  deleteMatch(match);
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") return send(response, 204, {});
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      const connection = await checkDatabase();
      return send(response, 200, {
        ok: true,
        database: {
          connected: true,
          name: connection.databaseName,
          version: connection.version,
          schemaVersion: connection.schemaVersion
        },
        queued: [...tickets.values()].filter((ticket) => !ticket.matchId).length
      });
    }

    if (request.method === "GET" && url.pathname === "/maps") {
      return send(response, 200, publicMapCatalog);
    }

    if (request.method === "POST" && url.pathname === "/auth/steam/start") {
      return send(response, 201, await beginSteamLogin(publicBaseUrl));
    }

    if (request.method === "GET" && url.pathname === "/auth/steam/callback") {
      try {
        await completeSteamLogin(url);
        return sendHtml(response, 200, "<!doctype html><title>Empire League</title><style>body{background:#171614;color:#eee;font:18px system-ui;display:grid;place-items:center;height:100vh;margin:0}main{text-align:center}h1{color:#c58d45}</style><main><h1>Signed in to Empire League</h1><p>You can close this window and return to the app.</p></main>");
      } catch (error) {
        return sendHtml(response, 400, `<!doctype html><title>Sign-in failed</title><main><h1>Sign-in failed</h1><p>${escapeHtml(error instanceof Error ? error.message : "Steam authentication failed.")}</p></main>`);
      }
    }

    if (request.method === "GET" && url.pathname === "/auth/steam/status") {
      const attemptId = url.searchParams.get("attempt");
      const pollToken = url.searchParams.get("token");
      if (!attemptId || !pollToken) return send(response, 400, { error: "attempt and token are required" });
      return send(response, 200, await pollSteamLogin(attemptId, pollToken));
    }

    if (request.method === "GET" && url.pathname === "/auth/me") {
      const player = await authenticate(request, true);
      return player ? send(response, 200, { player }) : send(response, 401, { error: "authentication required" });
    }

    if (request.method === "POST" && url.pathname === "/auth/logout") {
      await revokeSession(request);
      return send(response, 200, { ok: true });
    }

    const authenticatedPlayer = await authenticate(request);
    if (!authenticatedPlayer) return send(response, 401, { error: "authentication required" });

    if (request.method === "POST" && url.pathname === "/auth/steam-license") {
      const body = await readJson(request);
      const status = body.status;
      const currentSteamId = String(body.currentSteamId ?? "");
      const ownerSteamId = String(body.ownerSteamId ?? "");
      if (status === "unknown") {
        return send(response, 200, { player: authenticatedPlayer, updated: false });
      }
      if (status !== "owned" && status !== "family_shared") {
        return send(response, 400, { error: "invalid Steam license status" });
      }
      if (!/^\d{17}$/.test(currentSteamId) || currentSteamId !== authenticatedPlayer.steamId) {
        return send(response, 400, { error: "Steam probe identity does not match the authenticated account" });
      }
      if (!/^\d{17}$/.test(ownerSteamId)) {
        return send(response, 400, { error: "invalid Steam license owner" });
      }
      if (status === "owned" && ownerSteamId !== currentSteamId) {
        return send(response, 400, { error: "owned Steam license must belong to the authenticated account" });
      }
      if (status === "family_shared" && ownerSteamId === currentSteamId) {
        return send(response, 400, { error: "family-shared Steam license must identify a different owner" });
      }
      await database.execute(
        `UPDATE players
         SET steam_license_status = ?, steam_license_owner_id = ?, steam_license_checked_at = NOW(3)
         WHERE id = ?`,
        [status, ownerSteamId, authenticatedPlayer.id]
      );
      return send(response, 200, {
        player: { ...authenticatedPlayer, steamLicenseStatus: status },
        updated: true
      });
    }

    if (request.method === "GET" && url.pathname === "/online") {
      const playerIds = new Set(
        [...webSocketServer.clients]
          .map((socket) => socketSessions.get(socket)?.player?.id)
          .filter(Boolean)
      );
      return send(response, 200, { onlinePlayers: playerIds.size });
    }

    if (request.method === "GET" && url.pathname === "/matches/history") {
      return send(response, 200, { matches: await getPlayerMatchHistory(authenticatedPlayer.id) });
    }

    if (request.method === "GET" && url.pathname === "/leaderboard") {
      const page = Number(url.searchParams.get("page") ?? 1);
      const division = url.searchParams.get("division") ?? "all";
      return send(response, 200, await getCachedLeaderboard(page, division));
    }

    if (request.method === "GET" && url.pathname === "/players/lookup") {
      const name = url.searchParams.get("name")?.trim() ?? "";
      if (!name || name.length > 64) return send(response, 400, { error: "A valid player name is required." });
      const player = await getPlayerByDisplayName(name);
      return player
        ? send(response, 200, { player })
        : send(response, 404, { error: "No Empire League player was found with that name." });
    }

    const playerProfile = url.pathname.match(/^\/players\/([^/]+)$/);
    if (request.method === "GET" && playerProfile) {
      const playerId = decodeURIComponent(playerProfile[1]);
      const player = await getPlayerProfile(playerId);
      return player
        ? send(response, 200, { player, matches: await getPlayerMatchHistory(playerId) })
        : send(response, 404, { error: "Player not found." });
    }

    if (request.method === "GET" && url.pathname === "/social") {
      return send(response, 200, { snapshot: await refreshSocialCache(authenticatedPlayer.id) });
    }

    if (request.method === "POST" && url.pathname === "/social/requests") {
      const body = await readJson(request);
      const target = await getPlayerByDisplayName(body.displayName);
      if (!target) return send(response, 404, { error: "No Empire League player was found with that name." });
      if (target.id === authenticatedPlayer.id) return send(response, 400, { error: "You can’t invite yourself." });
      try {
        await createFriendRequest(authenticatedPlayer.id, target.id);
      } catch (error) {
        return send(response, 409, { error: error instanceof Error ? error.message : "The request already exists." });
      }
      await emitSocialGraphChanged(authenticatedPlayer.id, target.id);
      return send(response, 201, { player: target });
    }

    const acceptSocialRequest = url.pathname.match(/^\/social\/requests\/(\d+)\/accept$/);
    if (request.method === "POST" && acceptSocialRequest) {
      const connectionId = acceptSocialRequest[1];
      const previousFriendIds = new Set(socialFriendIds.get(authenticatedPlayer.id) ?? []);
      if (!await acceptFriendRequest(connectionId, authenticatedPlayer.id)) {
        return send(response, 404, { error: "Friend request not found." });
      }
      const snapshot = await refreshSocialCache(authenticatedPlayer.id);
      const friend = snapshot.friends.find((item) => !previousFriendIds.has(item.id));
      await emitSocialGraphChanged(authenticatedPlayer.id, ...(friend ? [friend.id] : []));
      return send(response, 200, { accepted: true });
    }

    const declineSocialRequest = url.pathname.match(/^\/social\/requests\/(\d+)$/);
    if (request.method === "DELETE" && declineSocialRequest) {
      const otherPlayerId = await deleteSocialConnection(declineSocialRequest[1], authenticatedPlayer.id);
      if (!otherPlayerId) {
        return send(response, 404, { error: "Friend request not found." });
      }
      await emitSocialGraphChanged(authenticatedPlayer.id, otherPlayerId);
      return send(response, 200, { deleted: true });
    }

    const removeSocialFriend = url.pathname.match(/^\/social\/friends\/([^/]+)$/);
    if (request.method === "DELETE" && removeSocialFriend) {
      const friendId = decodeURIComponent(removeSocialFriend[1]);
      if (!await removeFriend(authenticatedPlayer.id, friendId)) {
        return send(response, 404, { error: "Friendship not found." });
      }
      socialFriendIds.get(authenticatedPlayer.id)?.delete(friendId);
      socialFriendIds.get(friendId)?.delete(authenticatedPlayer.id);
      socialMessages.delete(conversationKey(authenticatedPlayer.id, friendId));
      socialUnread.get(authenticatedPlayer.id)?.delete(friendId);
      socialUnread.get(friendId)?.delete(authenticatedPlayer.id);
      await emitSocialGraphChanged(authenticatedPlayer.id, friendId);
      return send(response, 200, { removed: true });
    }

    if (request.method === "POST" && url.pathname === "/social/presence") {
      const body = await readJson(request);
      const allowed = new Set(["online", "idle", "in_game"]);
      const presence = allowed.has(body.presence) ? body.presence : "online";
      const activity = String(body.activity ?? (presence === "idle" ? "Idle" : "Online")).trim().slice(0, 120);
      const mapName = typeof body.mapName === "string" ? body.mapName.trim().slice(0, 100) : undefined;
      socialPresence.set(authenticatedPlayer.id, { presence, activity, ...(mapName ? { mapName } : {}) });
      broadcastPresence(authenticatedPlayer.id);
      return send(response, 200, { updated: true });
    }

    const socialMessageHistory = url.pathname.match(/^\/social\/messages\/([^/]+)$/);
    if (request.method === "GET" && socialMessageHistory) {
      const friendId = decodeURIComponent(socialMessageHistory[1]);
      if (!await ensureFriends(authenticatedPlayer.id, friendId)) return send(response, 403, { error: "You can only message friends." });
      return send(response, 200, {
        messages: socialMessages.get(conversationKey(authenticatedPlayer.id, friendId)) ?? []
      });
    }

    const socialMessageRead = url.pathname.match(/^\/social\/messages\/([^/]+)\/read$/);
    if (request.method === "POST" && socialMessageRead) {
      const friendId = decodeURIComponent(socialMessageRead[1]);
      socialUnread.get(authenticatedPlayer.id)?.delete(friendId);
      return send(response, 200, { read: true });
    }

    if (request.method === "POST" && url.pathname === "/social/messages") {
      const body = await readJson(request);
      const recipientId = String(body.recipientId ?? "");
      const text = String(body.text ?? "").trim().slice(0, 1000);
      if (!recipientId || !text) return send(response, 400, { error: "A recipient and message are required." });
      if (!await ensureFriends(authenticatedPlayer.id, recipientId)) return send(response, 403, { error: "You can only message friends." });
      const message = {
        id: randomUUID(),
        senderId: authenticatedPlayer.id,
        recipientId,
        text,
        sentAt: new Date().toISOString()
      };
      const key = conversationKey(authenticatedPlayer.id, recipientId);
      const history = socialMessages.get(key) ?? [];
      history.push(message);
      if (history.length > maxSocialMessagesPerConversation) history.splice(0, history.length - maxSocialMessagesPerConversation);
      socialMessages.set(key, history);
      const unreadBySender = socialUnread.get(recipientId) ?? new Map();
      unreadBySender.set(authenticatedPlayer.id, (unreadBySender.get(authenticatedPlayer.id) ?? 0) + 1);
      socialUnread.set(recipientId, unreadBySender);
      sendToPlayer(recipientId, { type: "social_event", event: { type: "message", message } });
      return send(response, 201, { message });
    }

    if (request.method === "POST" && url.pathname === "/queue") {
      const body = await readJson(request);
      if (!body.queue?.id) return send(response, 400, { error: "queue is required" });
      let ignoredMapIds = [];
      try {
        body.queue = normalizeQueueMapPreferences(body.queue);
        ignoredMapIds = body.queue.ignoredMapIds;
        delete body.queue.ignoredMapIds;
        body.queue.civilizationPreference = normalizeCivilizationPreference(body.queue.civilizationPreference);
        body.maximumLowerOpponentRatingGap = normalizeMaximumLowerOpponentRatingGap(
          body.maximumLowerOpponentRatingGap
        );
      } catch (error) {
        return send(response, 400, { error: error instanceof Error ? error.message : "invalid map preferences" });
      }
      for (const [ticketId, ticket] of tickets) {
        if (ticket.player.id === authenticatedPlayer.id && ticket.matchId && matches.get(ticket.matchId)?.resultResolved) {
          clearTicketDisconnectTimer(ticket);
          tickets.delete(ticketId);
        }
      }
      for (const ticket of tickets.values()) {
        if (ticket.player.id === authenticatedPlayer.id && ticket.disconnectedAt) {
          deleteDisconnectedTicket(ticket, "The other player restarted or left the match.");
        }
      }
      const alreadyActive = [...tickets.values()].some((ticket) => ticket.player.id === authenticatedPlayer.id);
      if (alreadyActive || playersJoiningQueue.has(authenticatedPlayer.id)) {
        return send(response, 409, { error: "player already has an active queue or match" });
      }
      playersJoiningQueue.add(authenticatedPlayer.id);
      const ticket = {
        id: `ticket-${randomUUID()}`,
        queueId: body.queue.id,
        queue: body.queue,
        player: authenticatedPlayer,
        canHost: body.canHost !== false,
        maximumLowerOpponentRatingGap: body.maximumLowerOpponentRatingGap,
        joinedAt: new Date().toISOString(),
        matchId: null,
        events: []
      };
      tickets.set(ticket.id, ticket);
      scheduleRatingRanges(ticket);
      ticket.matchSearchTimer = setTimeout(() => {
        void tryMatch(ticket).catch((error) => {
          console.error(`[matchmaker] Failed to match matured ticket ${ticket.id}:`, error);
        });
      }, minimumQueueTimeMs);
      try {
        await tryMatch(ticket);
        return send(response, 201, {
          id: ticket.id,
          queueId: ticket.queueId,
          joinedAt: ticket.joinedAt,
          ignoredMapIds
        });
      } catch (error) {
        tickets.delete(ticket.id);
        throw error;
      } finally {
        playersJoiningQueue.delete(authenticatedPlayer.id);
      }
    }

    const ticketMatch = url.pathname.match(/^\/tickets\/([^/]+)$/);
    if (request.method === "PATCH" && ticketMatch) {
      const ticket = tickets.get(decodeURIComponent(ticketMatch[1]));
      if (!ticket || ticket.player.id !== authenticatedPlayer.id) {
        return send(response, 404, { error: "ticket not found" });
      }
      if (ticket.matchId) return send(response, 409, { error: "queue preferences are locked after a match is found" });
      const body = await readJson(request);
      if (!body.queue?.id || body.queue.id !== ticket.queueId) {
        return send(response, 400, { error: "the active queue cannot be changed" });
      }
      try {
        body.queue = normalizeQueueMapPreferences(body.queue);
        delete body.queue.ignoredMapIds;
        body.queue.civilizationPreference = normalizeCivilizationPreference(body.queue.civilizationPreference);
      } catch (error) {
        return send(response, 400, { error: error instanceof Error ? error.message : "invalid map preferences" });
      }
      ticket.queue = body.queue;
      await tryMatch(ticket);
      return send(response, 200, { ok: true });
    }

    if (request.method === "DELETE" && ticketMatch) {
      const ticketId = decodeURIComponent(ticketMatch[1]);
      const ticket = tickets.get(ticketId);
      if (!ticket || ticket.player.id !== authenticatedPlayer.id) return send(response, 404, { error: "ticket not found" });
      clearTicketSearchTimers(ticket);
      const match = ticket.matchId ? matches.get(ticket.matchId) : null;
      if (match) {
        const setupStarted = match.accepted.size === matchTickets(match).length;
        emitToMatch(match, {
          type: "error",
          code: setupStarted ? "MATCH_SETUP_FAILED" : "MATCH_DECLINED",
          message: setupStarted
            ? "The other player could not finish setting up the lobby."
            : "The other player left the match."
        }, ticket.id);
        addDeclinedPairCooldown(match);
        deleteMatch(match);
        return send(response, 200, { ok: true });
      }
      tickets.delete(ticketId);
      return send(response, 200, { ok: true });
    }

    const acceptMatch = url.pathname.match(/^\/matches\/([^/]+)\/accept$/);
    if (request.method === "POST" && acceptMatch) {
      const match = matches.get(decodeURIComponent(acceptMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id
        || !matchTickets(match).some((item) => item.id === body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      if (Date.now() >= new Date(match.acceptDeadline).getTime()) {
        await expireMatch(match);
        return send(response, 410, { error: "match acceptance window expired" });
      }
      match.accepted.add(body.ticketId);
      if (match.accepted.size === matchTickets(match).length) {
        clearTimeout(match.expirationTimer);
        refreshMatchSetupTimeout(match);
        for (const participant of matchTickets(match)) {
          emit(participant, {
            type: "opponent_accepted",
            matchId: match.id,
            role: participant.id === match.host.id ? "host" : "guest"
          });
        }
      }
      return send(response, 200, {
        accepted: true,
        bothAccepted: match.accepted.size === matchTickets(match).length
      });
    }

    const declineMatch = url.pathname.match(/^\/matches\/([^/]+)\/decline$/);
    if (request.method === "POST" && declineMatch) {
      const match = matches.get(decodeURIComponent(declineMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id
        || !matchTickets(match).some((item) => item.id === body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      clearTimeout(match.expirationTimer);
      emitToMatch(match, {
        type: "error",
        code: "MATCH_DECLINED",
        message: "Another player declined the match."
      }, body.ticketId);
      addDeclinedPairCooldown(match);
      deleteMatch(match);
      return send(response, 200, { declined: true });
    }

    const lobbyMatch = url.pathname.match(/^\/matches\/([^/]+)\/lobby$/);
    if (request.method === "POST" && lobbyMatch) {
      const match = matches.get(decodeURIComponent(lobbyMatch[1]));
      const body = await readJson(request);
      if (!match || body.ticketId !== match.host.id || match.host.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only the host may publish a lobby" });
      }
      match.lobby = body.lobby;
      refreshMatchSetupTimeout(match);
      const firstGuest = matchGuests(match)
        .sort((left, right) => match.assignments.get(left.id).slot - match.assignments.get(right.id).slot)[0];
      if (firstGuest) emit(firstGuest, { type: "lobby_ready", matchId: match.id, lobby: match.lobby });
      return send(response, 200, { published: true });
    }

    const guestJoinedMatch = url.pathname.match(/^\/matches\/([^/]+)\/guest-joined$/);
    if (request.method === "POST" && guestJoinedMatch) {
      const match = matches.get(decodeURIComponent(guestJoinedMatch[1]));
      const body = await readJson(request);
      const guestTicket = match && matchGuests(match).find((item) => item.id === body.ticketId);
      if (!match || !guestTicket || guestTicket.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only a matched guest may report joining the lobby" });
      }
      if (!match.lobby) return send(response, 409, { error: "the lobby has not been published" });
      if (!match.guestLobbyJoined.has(body.ticketId)) {
        match.guestLobbyJoined.add(body.ticketId);
        refreshMatchSetupTimeout(match);
        const orderedGuests = matchGuests(match)
          .sort((left, right) => match.assignments.get(left.id).slot - match.assignments.get(right.id).slot);
        const nextGuest = orderedGuests.find((item) => !match.guestLobbyJoined.has(item.id));
        if (nextGuest) {
          emit(nextGuest, { type: "lobby_ready", matchId: match.id, lobby: match.lobby });
        } else {
          emit(match.host, { type: "guest_lobby_joined", matchId: match.id });
        }
      }
      return send(response, 200, { joined: true });
    }

    const hostReadyMatch = url.pathname.match(/^\/matches\/([^/]+)\/host-ready$/);
    if (request.method === "POST" && hostReadyMatch) {
      const match = matches.get(decodeURIComponent(hostReadyMatch[1]));
      const body = await readJson(request);
      if (!match || body.ticketId !== match.host.id || match.host.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only the host may report lobby readiness" });
      }
      if (match.guestLobbyJoined.size !== matchGuests(match).length) {
        return send(response, 409, { error: "not all guests have joined the lobby" });
      }
      if (!match.hostLobbyReady) {
        match.hostLobbyReady = true;
        refreshMatchSetupTimeout(match);
        for (const guestTicket of matchGuests(match)) {
          emit(guestTicket, { type: "host_lobby_ready", matchId: match.id });
        }
      }
      return send(response, 200, { ready: true });
    }

    const guestContentAcceptedMatch = url.pathname.match(/^\/matches\/([^/]+)\/guest-content-accepted$/);
    if (request.method === "POST" && guestContentAcceptedMatch) {
      const match = matches.get(decodeURIComponent(guestContentAcceptedMatch[1]));
      const body = await readJson(request);
      const guestTicket = match && matchGuests(match).find((item) => item.id === body.ticketId);
      if (!match || !guestTicket || guestTicket.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only a matched guest may report accepting lobby content" });
      }
      if (!match.hostLobbyReady) return send(response, 409, { error: "the host has not readied the lobby" });
      if (!match.guestContentAccepted.has(body.ticketId)) {
        match.guestContentAccepted.add(body.ticketId);
        refreshMatchSetupTimeout(match);
        if (match.guestContentAccepted.size === matchGuests(match).length) {
          emit(match.host, { type: "guest_content_accepted", matchId: match.id });
        }
      }
      return send(response, 200, { accepted: true });
    }

    const guestReadyMatch = url.pathname.match(/^\/matches\/([^/]+)\/guest-ready$/);
    if (request.method === "POST" && guestReadyMatch) {
      const match = matches.get(decodeURIComponent(guestReadyMatch[1]));
      const body = await readJson(request);
      const guestTicket = match && matchGuests(match).find((item) => item.id === body.ticketId);
      if (!match || !guestTicket || guestTicket.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only a matched guest may report lobby readiness" });
      }
      if (!match.lobby) return send(response, 409, { error: "the lobby has not been published" });
      if (!match.guestLobbyReady.has(body.ticketId)) {
        match.guestLobbyReady.add(body.ticketId);
        refreshMatchSetupTimeout(match);
        if (match.guestLobbyReady.size === matchGuests(match).length) {
          emit(match.host, { type: "guest_lobby_ready", matchId: match.id });
        }
      }
      return send(response, 200, { ready: true });
    }

    const startedMatch = url.pathname.match(/^\/matches\/([^/]+)\/started$/);
    if (request.method === "POST" && startedMatch) {
      const match = matches.get(startedMatch[1]);
      const body = await readJson(request);
      if (!match || body.ticketId !== match.host.id || match.host.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only the host may report game start" });
      }
      scheduleMatchLifecycleTimeout(
        match,
        matchResultTimeoutMs,
        "The match result was not reported before the match expired."
      );
      match.startedAt = new Date().toISOString();
      for (const guestTicket of matchGuests(match)) {
        emit(guestTicket, { type: "game_started", matchId: match.id });
      }
      return send(response, 200, { started: true });
    }

    const resultMatch = url.pathname.match(/^\/matches\/([^/]+)\/result$/);
    if (request.method === "POST" && resultMatch) {
      const match = matches.get(decodeURIComponent(resultMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id
        || !matchTickets(match).some((item) => item.id === body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      if (match.resultResolved) return send(response, 200, { accepted: true, resolved: true });
      if (typeof body.error === "string" && body.error.trim()) {
        const replayError = body.error.trim().slice(0, 500);
        if (match.teamSize === 1) {
          await resolveContestedResult(match, {
            reason: "a client could not parse its replay",
            reportingTicketId: body.ticketId,
            error: replayError
          }, [body.ticketId], { [body.ticketId]: { error: replayError } });
          return send(response, 200, { accepted: true, resolved: true, contested: true });
        }
        console.warn(
          `[matchmaker] ${match.id}: ignored replay error from ${body.ticketId}:`
          + ` ${replayError}`
        );
        return send(response, 202, { accepted: false, resolved: false });
      }
      try {
        await reconcileReplayPlayerLinks(match, actingTicket, body.replay);
      } catch (error) {
        if (match.teamSize === 1) {
          await resolveContestedResult(match, {
            reason: error instanceof Error ? error.message : "replay identity linking failed",
            reportingTicketId: body.ticketId,
            report: body.replay
          }, [body.ticketId], { [body.ticketId]: body.replay });
          return send(response, 200, { accepted: true, resolved: true, contested: true });
        }
        console.warn(
          `[matchmaker] ${match.id}: ignored replay identity failure from ${body.ticketId}:`,
          error
        );
        return send(response, 202, { accepted: false, resolved: false });
      }
      const invalid = validateReplayReport(match, actingTicket, body.replay);
      if (invalid) {
        if (match.teamSize === 1) {
          await resolveContestedResult(match, {
            reason: invalid,
            reportingTicketId: body.ticketId,
            report: body.replay
          }, [body.ticketId], { [body.ticketId]: body.replay });
          return send(response, 200, { accepted: true, resolved: true, contested: true });
        }
        console.warn(`[matchmaker] ${match.id}: ignored invalid replay from ${body.ticketId}: ${invalid}`);
        return send(response, 202, { accepted: false, resolved: false });
      }
      match.resultReports.set(body.ticketId, body.replay);
      const reportsByTeam = new Map();
      for (const [ticketId, replay] of match.resultReports) {
        const team = match.assignments.get(ticketId).team;
        if (!reportsByTeam.has(team)) reportsByTeam.set(team, { ticketId, replay });
      }
      if (reportsByTeam.size < 2) {
        return send(response, 202, { accepted: true, resolved: false });
      }

      const [teamOneReport, teamTwoReport] = [reportsByTeam.get(1), reportsByTeam.get(2)];
      const qualifyingReports = {
        [teamOneReport.ticketId]: teamOneReport.replay,
        [teamTwoReport.ticketId]: teamTwoReport.replay
      };
      if (!replayReportsAgree(teamOneReport.replay, teamTwoReport.replay)) {
        await resolveContestedResult(match, {
          reason: "the qualifying Team 1 and Team 2 replay metadata did not agree",
          reports: qualifyingReports
        }, [teamOneReport.ticketId, teamTwoReport.ticketId], qualifyingReports);
        return send(response, 200, { accepted: true, resolved: true, contested: true });
      }

      const verifiedReplay = teamOneReport.replay;
      const ratings = await recordVerifiedMatchResult(match, verifiedReplay);
      match.resultResolved = true;
      for (const participant of matchTickets(match)) {
        emit(participant, {
          type: "result_verified",
          matchId: match.id,
          result: resultForTicket(match, participant, verifiedReplay, ratings)
        });
      }
      deleteMatch(match);
      console.log(
        `[matchmaker] ${match.id}: verified from one replay per team;`
        + ` winner=${verifiedReplay.winnerProfileId}`
      );
      return send(response, 200, { accepted: true, resolved: true, contested: false });
    }

    return send(response, 404, { error: "not found" });
  } catch (error) {
    console.error("[matchmaker]", error);
    return send(response, 500, { error: error instanceof Error ? error.message : "internal error" });
  }
}

const server = createServer(handleRequest);

const webSocketServer = new WebSocketServer({ noServer: true, maxPayload: 1024 * 1024 });
const socketSessions = new WeakMap();

function sendSocket(socket, message) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
}

function unsubscribeSocket(socket) {
  const session = socketSessions.get(socket);
  if (session?.ticketId) {
    const ticket = tickets.get(session.ticketId);
    ticket?.eventSockets?.delete(socket);
    if (ticket && !ticket.eventSockets?.size) scheduleTicketDisconnectCleanup(ticket);
  }
  if (session) session.ticketId = null;
}

server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
  if (url.pathname !== "/events") {
    socket.destroy();
    return;
  }
  webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
    webSocketServer.emit("connection", webSocket);
  });
});

webSocketServer.on("connection", (socket) => {
  socketSessions.set(socket, { player: null, token: null, ticketId: null, authenticating: false, alive: true });
  socket.on("pong", () => {
    const session = socketSessions.get(socket);
    if (session) session.alive = true;
  });

  socket.on("message", async (data) => {
    const session = socketSessions.get(socket);
    try {
      const message = JSON.parse(data.toString());
      if (message.type === "authenticate") {
        if (session.player || session.authenticating || typeof message.token !== "string") {
          sendSocket(socket, { type: "error", code: "INVALID_AUTH_REQUEST", message: "Invalid authentication request." });
          return;
        }
        session.authenticating = true;
        const player = await authenticate({ headers: { authorization: `Bearer ${message.token}` } });
        session.authenticating = false;
        if (!player) {
          sendSocket(socket, { type: "error", code: "AUTHENTICATION_FAILED", message: "Authentication failed." });
          socket.close(4001, "Authentication failed");
          return;
        }
        session.player = player;
        session.token = message.token;
        sendSocket(socket, { type: "authenticated", player });
        await refreshSocialCache(player.id);
        broadcastPresence(player.id);
        return;
      }

      if (message.type === "subscribe") {
        if (!session.player) {
          sendSocket(socket, { type: "error", code: "AUTHENTICATION_REQUIRED", message: "Authenticate before subscribing." });
          return;
        }
        const ticketId = typeof message.ticketId === "string" ? message.ticketId : "";
        const ticket = tickets.get(ticketId);
        if (!ticket || ticket.player.id !== session.player.id) {
          sendSocket(socket, { type: "error", code: "TICKET_NOT_FOUND", message: "Matchmaking ticket not found." });
          return;
        }
        unsubscribeSocket(socket);
        session.ticketId = ticketId;
        ticket.eventSockets ??= new Set();
        ticket.eventSockets.add(socket);
        clearTicketDisconnectTimer(ticket);
        const after = Number.isSafeInteger(message.after) && message.after >= 0 ? message.after : 0;
        for (const item of ticket.events.filter((candidate) => candidate.sequence > after)) {
          sendSocket(socket, { type: "event", ticketId, ...item });
        }
        sendSocket(socket, { type: "subscribed", ticketId });
        return;
      }

      if (message.type === "request") {
        if (typeof message.id !== "string" || typeof message.method !== "string" || typeof message.path !== "string") {
          sendSocket(socket, { type: "error", code: "INVALID_REQUEST", message: "Invalid RPC request." });
          return;
        }
        const chunks = message.body === undefined ? [] : [Buffer.from(JSON.stringify(message.body))];
        const rpcRequest = {
          method: message.method.toUpperCase(),
          url: message.path,
          headers: {
            host: requestHost(socket),
            ...(session.token ? { authorization: `Bearer ${session.token}` } : {})
          },
          authenticatedPlayer: session.player,
          async *[Symbol.asyncIterator]() {
            yield* chunks;
          }
        };
        let status = 200;
        let responseBody = "";
        const rpcResponse = {
          writeHead(nextStatus) {
            status = nextStatus;
          },
          end(chunk = "") {
            responseBody += chunk?.toString?.() ?? String(chunk);
          }
        };
        await handleRequest(rpcRequest, rpcResponse);
        let body = null;
        try {
          body = responseBody ? JSON.parse(responseBody) : null;
        } catch {
          body = { error: "Matchmaker returned an invalid RPC response." };
          status = 500;
        }
        if (
          message.method.toUpperCase() === "POST"
          && new URL(message.path, "http://localhost").pathname === "/queue"
          && status === 201
          && typeof body?.id === "string"
        ) {
          const ticket = tickets.get(body.id);
          if (ticket && ticket.player.id === session.player?.id) {
            unsubscribeSocket(socket);
            session.ticketId = ticket.id;
            ticket.eventSockets ??= new Set();
            ticket.eventSockets.add(socket);
            clearTicketDisconnectTimer(ticket);
          }
        }
        sendSocket(socket, { type: "response", id: message.id, status, body });
        if (message.method.toUpperCase() === "POST" && new URL(message.path, "http://localhost").pathname === "/auth/logout" && status < 400) {
          unsubscribeSocket(socket);
          session.player = null;
          session.token = null;
        }
        return;
      }

      sendSocket(socket, { type: "error", code: "INVALID_MESSAGE", message: "Unsupported WebSocket message." });
    } catch (error) {
      const session = socketSessions.get(socket);
      if (session) session.authenticating = false;
      console.error("[matchmaker websocket]", error);
      sendSocket(socket, { type: "error", code: "WEBSOCKET_ERROR", message: "Invalid WebSocket request." });
    }
  });

  socket.on("close", () => {
    const playerId = socketSessions.get(socket)?.player?.id;
    unsubscribeSocket(socket);
    if (playerId) queueMicrotask(() => {
      const friends = [...(socialFriendIds.get(playerId) ?? [])];
      const stillConnected = [...webSocketServer.clients].some(
        (candidate) => candidate.readyState === WebSocket.OPEN && socketSessions.get(candidate)?.player?.id === playerId
      );
      if (!stillConnected) {
        socialPresence.delete(playerId);
        socialFriendIds.delete(playerId);
      }
      const event = { type: "presence", playerId, ...publicPresence(playerId) };
      for (const friendId of friends) sendToPlayer(friendId, { type: "social_event", event });
    });
  });
  socket.on("error", (error) => console.warn("[matchmaker websocket]", error.message));
});

function requestHost(socket) {
  return socket._socket?.localAddress && socket._socket?.localPort
    ? `${socket._socket.localAddress}:${socket._socket.localPort}`
    : `127.0.0.1:${port}`;
}

const socketHeartbeat = setInterval(() => {
  for (const socket of webSocketServer.clients) {
    const session = socketSessions.get(socket);
    if (!session?.alive) {
      socket.terminate();
      continue;
    }
    session.alive = false;
    socket.ping();
  }
}, 30_000);
socketHeartbeat.unref();

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}

const databaseInfo = await checkDatabase();
console.log(`[matchmaker] MySQL ${databaseInfo.version} connected (${databaseInfo.databaseName}, schema ${databaseInfo.schemaVersion})`);
server.listen(port, host, () => {
  console.log(`[matchmaker] listening on http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    clearInterval(socketHeartbeat);
    clearTimeout(rematchCooldownCleanupTimer);
    for (const socket of webSocketServer.clients) socket.close(1001, "Server shutting down");
    server.close(() => database.end().finally(() => process.exit(0)));
  });
}
