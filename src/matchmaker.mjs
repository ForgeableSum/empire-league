import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import {
  database,
  checkDatabase,
  getLeaderboard,
  getPlayerMatchHistory,
  linkPlayerAoeProfile,
  recordMatchResultConflict,
  recordVerifiedMatchResult,
  saveMatch,
  saveQueueTicket,
  updateMatchStatus,
  updateTicketStatus
} from "./database.mjs";
import { authenticate, beginSteamLogin, completeSteamLogin, pollSteamLogin, revokeSession } from "./auth.mjs";

const port = Number(process.env.EMPIRE_MATCHMAKER_PORT ?? 4317);
const host = process.env.MATCHMAKER_HOST ?? "127.0.0.1";
const publicBaseUrl = (process.env.PUBLIC_MATCHMAKER_URL ?? `http://127.0.0.1:${port}`).replace(/\/$/, "");
const tickets = new Map();
const matches = new Map();
const playersJoiningQueue = new Set();
let eventSequence = 0;

function send(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
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
  ticket.events.push({ sequence: ++eventSequence, event });
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

  const matchTickets = [match.host, match.guest];
  const missing = matchTickets.filter((ticket) => !ticket.player.aoeProfileId);
  const known = new Set(matchTickets.map((ticket) => ticket.player.aoeProfileId).filter(Boolean));
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
  if (replay.reporterProfileId !== actingTicket.player.aoeProfileId) {
    return "replay perspective does not match the reporting player";
  }
  const expected = [match.host.player.aoeProfileId, match.guest.player.aoeProfileId].sort((a, b) => a - b);
  const reported = replay.players.map((player) => player.profileId).sort((a, b) => a - b);
  if (reported.length !== 2 || expected.some((profileId, index) => profileId !== reported[index])) {
    return "replay players do not match the matched players";
  }
  if (!expected.includes(replay.winnerProfileId) || !expected.includes(replay.loserProfileId)
    || replay.winnerProfileId === replay.loserProfileId) {
    return "replay winner and loser do not match the match";
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
  const won = ticket.player.aoeProfileId === replay.winnerProfileId;
  return {
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
  return {
    winnerProfileId: 0,
    loserProfileId: 0,
    outcome: "no_contest",
    reason: "unknown",
    oldRating: ticket.player.rating,
    newRating: ticket.player.rating,
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
  emit(match.host, {
    type: "result_contested",
    matchId: match.id,
    result: contestedResultForTicket(match.host)
  });
  emit(match.guest, {
    type: "result_contested",
    matchId: match.id,
    result: contestedResultForTicket(match.guest)
  });
}

function sharedMapPool(firstQueue, secondQueue) {
  const secondMapIds = new Set(secondQueue.mapPool.map((map) => map.id));
  return firstQueue.mapPool.filter((map) => secondMapIds.has(map.id));
}

function sessionFor(match, ticket) {
  const opponent = match.host.id === ticket.id ? match.guest : match.host;
  return {
    id: match.id,
    status: "match_found",
    queue: ticket.queue,
    player: ticket.player,
    opponent: opponent.player,
    role: match.host.id === ticket.id ? "host" : "guest",
    hostPlayerId: match.host.player.aoeProfileId,
    acceptedByPlayer: match.accepted.has(ticket.id),
    acceptedByOpponent: match.accepted.has(opponent.id),
    acceptDeadline: match.acceptDeadline,
    selectedMap: match.selectedMap,
    createdAt: match.createdAt
  };
}

async function tryMatch(ticket) {
  const opponent = [...tickets.values()].find((candidate) =>
    candidate.id !== ticket.id
      && candidate.player.id !== ticket.player.id
      && !candidate.matchId
      && candidate.queueId === ticket.queueId
      && sharedMapPool(candidate.queue, ticket.queue).length > 0
      && (candidate.canHost || ticket.canHost)
  );
  if (!opponent) return;

  const host = opponent.canHost && ticket.canHost
    ? (opponent.joinedAt <= ticket.joinedAt ? opponent : ticket)
    : (opponent.canHost ? opponent : ticket);
  const guest = host.id === opponent.id ? ticket : opponent;
  const availableMaps = sharedMapPool(host.queue, guest.queue);
  const match = {
    id: `match-${randomUUID().slice(0, 8)}`,
    host,
    guest,
    accepted: new Set(),
    selectedMap: availableMaps[Math.floor(Math.random() * availableMaps.length)],
    createdAt: new Date().toISOString(),
    acceptDeadline: new Date(Date.now() + 30_000).toISOString(),
    lobby: null,
    guestLobbyReady: false,
    resultReports: new Map(),
    resultResolved: false
  };
  host.matchId = match.id;
  guest.matchId = match.id;
  matches.set(match.id, match);
  await saveMatch(match);
  emit(host, { type: "match_found", match: sessionFor(match, host) });
  emit(guest, { type: "match_found", match: sessionFor(match, guest) });
  match.expirationTimer = setTimeout(() => {
    void expireMatch(match);
  }, Math.max(0, new Date(match.acceptDeadline).getTime() - Date.now()));
  console.log(`[matchmaker] ${match.id}: host=${host.player.displayName}, guest=${guest.player.displayName}`);
}

async function expireMatch(match) {
  if (match.accepted.size === 2 || !matches.has(match.id)) return;
  matches.delete(match.id);
  await updateMatchStatus(match.id, "cancelled");
  emit(match.host, { type: "error", code: "MATCH_EXPIRED", message: "The match acceptance window expired." });
  emit(match.guest, { type: "error", code: "MATCH_EXPIRED", message: "The match acceptance window expired." });
}

const server = createServer(async (request, response) => {
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

    if (request.method === "GET" && url.pathname === "/matches/history") {
      return send(response, 200, { matches: await getPlayerMatchHistory(authenticatedPlayer.id) });
    }

    if (request.method === "GET" && url.pathname === "/leaderboard") {
      return send(response, 200, { players: await getLeaderboard() });
    }

    if (request.method === "POST" && url.pathname === "/queue") {
      const body = await readJson(request);
      if (!body.queue?.id) return send(response, 400, { error: "queue is required" });
      if (!Array.isArray(body.queue.mapPool) || body.queue.mapPool.length === 0) {
        return send(response, 400, { error: "at least one selected map is required" });
      }
      for (const [ticketId, ticket] of tickets) {
        if (ticket.player.id === authenticatedPlayer.id && ticket.matchId && matches.get(ticket.matchId)?.resultResolved) {
          tickets.delete(ticketId);
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
        joinedAt: new Date().toISOString(),
        matchId: null,
        events: []
      };
      tickets.set(ticket.id, ticket);
      try {
        await saveQueueTicket(ticket);
        await tryMatch(ticket);
        return send(response, 201, { id: ticket.id, queueId: ticket.queueId, joinedAt: ticket.joinedAt });
      } catch (error) {
        tickets.delete(ticket.id);
        throw error;
      } finally {
        playersJoiningQueue.delete(authenticatedPlayer.id);
      }
    }

    const eventMatch = url.pathname.match(/^\/tickets\/([^/]+)\/events$/);
    if (request.method === "GET" && eventMatch) {
      const ticket = tickets.get(decodeURIComponent(eventMatch[1]));
      if (!ticket || ticket.player.id !== authenticatedPlayer.id) return send(response, 404, { error: "ticket not found" });
      const after = Number(url.searchParams.get("after") ?? 0);
      return send(response, 200, { events: ticket.events.filter((item) => item.sequence > after) });
    }

    const ticketMatch = url.pathname.match(/^\/tickets\/([^/]+)$/);
    if (request.method === "DELETE" && ticketMatch) {
      const ticketId = decodeURIComponent(ticketMatch[1]);
      const ticket = tickets.get(ticketId);
      if (!ticket || ticket.player.id !== authenticatedPlayer.id) return send(response, 404, { error: "ticket not found" });
      if (ticket && !ticket.matchId) await updateTicketStatus(ticketId, "cancelled");
      tickets.delete(ticketId);
      return send(response, 200, { ok: true });
    }

    const acceptMatch = url.pathname.match(/^\/matches\/([^/]+)\/accept$/);
    if (request.method === "POST" && acceptMatch) {
      const match = matches.get(decodeURIComponent(acceptMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id || ![match.host.id, match.guest.id].includes(body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      if (Date.now() >= new Date(match.acceptDeadline).getTime()) {
        await expireMatch(match);
        return send(response, 410, { error: "match acceptance window expired" });
      }
      match.accepted.add(body.ticketId);
      if (match.accepted.size === 2) {
        clearTimeout(match.expirationTimer);
        await updateMatchStatus(match.id, "accepted");
        emit(match.host, { type: "opponent_accepted", matchId: match.id, role: "host" });
        emit(match.guest, { type: "opponent_accepted", matchId: match.id, role: "guest" });
      }
      return send(response, 200, { accepted: true, bothAccepted: match.accepted.size === 2 });
    }

    const declineMatch = url.pathname.match(/^\/matches\/([^/]+)\/decline$/);
    if (request.method === "POST" && declineMatch) {
      const match = matches.get(decodeURIComponent(declineMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id || ![match.host.id, match.guest.id].includes(body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      clearTimeout(match.expirationTimer);
      matches.delete(match.id);
      await updateMatchStatus(match.id, "declined");
      emit(match.host, { type: "error", code: "MATCH_DECLINED", message: "The other player declined the match." });
      emit(match.guest, { type: "error", code: "MATCH_DECLINED", message: "The other player declined the match." });
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
      await updateMatchStatus(match.id, "lobby_ready");
      emit(match.guest, { type: "lobby_ready", matchId: match.id, lobby: match.lobby });
      return send(response, 200, { published: true });
    }

    const guestReadyMatch = url.pathname.match(/^\/matches\/([^/]+)\/guest-ready$/);
    if (request.method === "POST" && guestReadyMatch) {
      const match = matches.get(decodeURIComponent(guestReadyMatch[1]));
      const body = await readJson(request);
      if (!match || body.ticketId !== match.guest.id || match.guest.player.id !== authenticatedPlayer.id) {
        return send(response, 403, { error: "only the guest may report lobby readiness" });
      }
      if (!match.lobby) return send(response, 409, { error: "the lobby has not been published" });
      if (!match.guestLobbyReady) {
        match.guestLobbyReady = true;
        emit(match.host, { type: "guest_lobby_ready", matchId: match.id });
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
      await updateMatchStatus(match.id, "in_game");
      emit(match.guest, { type: "game_started", matchId: match.id });
      return send(response, 200, { started: true });
    }

    const resultMatch = url.pathname.match(/^\/matches\/([^/]+)\/result$/);
    if (request.method === "POST" && resultMatch) {
      const match = matches.get(decodeURIComponent(resultMatch[1]));
      const body = await readJson(request);
      const actingTicket = tickets.get(body.ticketId);
      if (!match || !actingTicket || actingTicket.player.id !== authenticatedPlayer.id
        || ![match.host.id, match.guest.id].includes(body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      if (match.resultResolved) return send(response, 200, { accepted: true, resolved: true });
      if (typeof body.error === "string" && body.error.trim()) {
        await resolveContestedResult(match, {
          reason: "a client could not parse its replay",
          reportingTicketId: body.ticketId,
          error: body.error.trim().slice(0, 500)
        }, [body.ticketId], { [body.ticketId]: { error: body.error.trim().slice(0, 500) } });
        return send(response, 200, { accepted: true, resolved: true, contested: true });
      }
      try {
        await reconcileReplayPlayerLinks(match, actingTicket, body.replay);
      } catch (error) {
        await resolveContestedResult(match, {
          reason: error instanceof Error ? error.message : "replay identity linking failed",
          reportingTicketId: body.ticketId,
          report: body.replay
        }, [body.ticketId], { [body.ticketId]: body.replay });
        return send(response, 200, { accepted: true, resolved: true, contested: true });
      }
      const invalid = validateReplayReport(match, actingTicket, body.replay);
      if (invalid) {
        await resolveContestedResult(match, {
          reason: invalid,
          reportingTicketId: body.ticketId,
          report: body.replay
        }, [body.ticketId], { [body.ticketId]: body.replay });
        return send(response, 200, { accepted: true, resolved: true, contested: true });
      }
      match.resultReports.set(body.ticketId, body.replay);
      if (match.resultReports.size < 2) {
        return send(response, 202, { accepted: true, resolved: false });
      }

      const hostReplay = match.resultReports.get(match.host.id);
      const guestReplay = match.resultReports.get(match.guest.id);
      if (!replayReportsAgree(hostReplay, guestReplay)) {
        await resolveContestedResult(match, {
          reason: "client replay metadata did not agree",
          hostReport: hostReplay,
          guestReport: guestReplay
        }, [match.host.id, match.guest.id], {
          [match.host.id]: hostReplay,
          [match.guest.id]: guestReplay
        });
        return send(response, 200, { accepted: true, resolved: true, contested: true });
      }

      const ratings = await recordVerifiedMatchResult(match, hostReplay.winnerProfileId);
      match.resultResolved = true;
      emit(match.host, {
        type: "result_verified",
        matchId: match.id,
        result: resultForTicket(match, match.host, hostReplay, ratings)
      });
      emit(match.guest, {
        type: "result_verified",
        matchId: match.id,
        result: resultForTicket(match, match.guest, hostReplay, ratings)
      });
      console.log(`[matchmaker] ${match.id}: verified winner=${hostReplay.winnerProfileId}`);
      return send(response, 200, { accepted: true, resolved: true, contested: false });
    }

    return send(response, 404, { error: "not found" });
  } catch (error) {
    console.error("[matchmaker]", error);
    return send(response, 500, { error: error instanceof Error ? error.message : "internal error" });
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}

const databaseInfo = await checkDatabase();
console.log(`[matchmaker] MySQL ${databaseInfo.version} connected (${databaseInfo.databaseName}, schema ${databaseInfo.schemaVersion})`);
server.listen(port, host, () => {
  console.log(`[matchmaker] listening on http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => database.end().finally(() => process.exit(0))));
}
