import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const port = Number(process.env.EMPIRE_MATCHMAKER_PORT ?? 4317);
const tickets = new Map();
const matches = new Map();
let eventSequence = 0;

function send(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
}

function emit(ticket, event) {
  ticket.events.push({ sequence: ++eventSequence, event });
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

function tryMatch(ticket) {
  const opponent = [...tickets.values()].find((candidate) =>
    candidate.id !== ticket.id && !candidate.matchId && candidate.queueId === ticket.queueId
  );
  if (!opponent) return;

  const host = opponent.joinedAt <= ticket.joinedAt ? opponent : ticket;
  const guest = host.id === opponent.id ? ticket : opponent;
  const match = {
    id: `match-${randomUUID().slice(0, 8)}`,
    host,
    guest,
    accepted: new Set(),
    selectedMap: host.queue.mapPool[Math.floor(Math.random() * host.queue.mapPool.length)],
    createdAt: new Date().toISOString(),
    acceptDeadline: new Date(Date.now() + 30_000).toISOString(),
    lobby: null
  };
  host.matchId = match.id;
  guest.matchId = match.id;
  matches.set(match.id, match);
  emit(host, { type: "match_found", match: sessionFor(match, host) });
  emit(guest, { type: "match_found", match: sessionFor(match, guest) });
  console.log(`[matchmaker] ${match.id}: host=${host.player.displayName}, guest=${guest.player.displayName}`);
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") return send(response, 204, {});
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      return send(response, 200, { ok: true, queued: [...tickets.values()].filter((ticket) => !ticket.matchId).length });
    }

    if (request.method === "POST" && url.pathname === "/queue") {
      const body = await readJson(request);
      if (!body.queue?.id || !body.player) return send(response, 400, { error: "queue and player are required" });
      const ticket = {
        id: `ticket-${randomUUID()}`,
        queueId: body.queue.id,
        queue: body.queue,
        player: body.player,
        joinedAt: new Date().toISOString(),
        matchId: null,
        events: []
      };
      tickets.set(ticket.id, ticket);
      tryMatch(ticket);
      return send(response, 201, { id: ticket.id, queueId: ticket.queueId, joinedAt: ticket.joinedAt });
    }

    const eventMatch = url.pathname.match(/^\/tickets\/([^/]+)\/events$/);
    if (request.method === "GET" && eventMatch) {
      const ticket = tickets.get(decodeURIComponent(eventMatch[1]));
      if (!ticket) return send(response, 404, { error: "ticket not found" });
      const after = Number(url.searchParams.get("after") ?? 0);
      return send(response, 200, { events: ticket.events.filter((item) => item.sequence > after) });
    }

    const ticketMatch = url.pathname.match(/^\/tickets\/([^/]+)$/);
    if (request.method === "DELETE" && ticketMatch) {
      tickets.delete(decodeURIComponent(ticketMatch[1]));
      return send(response, 200, { ok: true });
    }

    const acceptMatch = url.pathname.match(/^\/matches\/([^/]+)\/accept$/);
    if (request.method === "POST" && acceptMatch) {
      const match = matches.get(decodeURIComponent(acceptMatch[1]));
      const body = await readJson(request);
      if (!match || ![match.host.id, match.guest.id].includes(body.ticketId)) {
        return send(response, 404, { error: "match or ticket not found" });
      }
      match.accepted.add(body.ticketId);
      if (match.accepted.size === 2) {
        emit(match.host, { type: "opponent_accepted", matchId: match.id, role: "host" });
        emit(match.guest, { type: "opponent_accepted", matchId: match.id, role: "guest" });
      }
      return send(response, 200, { accepted: true, bothAccepted: match.accepted.size === 2 });
    }

    const declineMatch = url.pathname.match(/^\/matches\/([^/]+)\/decline$/);
    if (request.method === "POST" && declineMatch) {
      const match = matches.get(decodeURIComponent(declineMatch[1]));
      if (!match) return send(response, 404, { error: "match not found" });
      emit(match.host, { type: "error", code: "MATCH_DECLINED", message: "The other player declined the match." });
      emit(match.guest, { type: "error", code: "MATCH_DECLINED", message: "The other player declined the match." });
      return send(response, 200, { declined: true });
    }

    const lobbyMatch = url.pathname.match(/^\/matches\/([^/]+)\/lobby$/);
    if (request.method === "POST" && lobbyMatch) {
      const match = matches.get(decodeURIComponent(lobbyMatch[1]));
      const body = await readJson(request);
      if (!match || body.ticketId !== match.host.id) return send(response, 403, { error: "only the host may publish a lobby" });
      match.lobby = body.lobby;
      emit(match.guest, { type: "lobby_ready", matchId: match.id, lobby: match.lobby });
      return send(response, 200, { published: true });
    }

    return send(response, 404, { error: "not found" });
  } catch (error) {
    console.error("[matchmaker]", error);
    return send(response, 500, { error: error instanceof Error ? error.message : "internal error" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`[matchmaker] listening on http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
