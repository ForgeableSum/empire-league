import WebSocket from "ws";

const matchmakerUrl = "http://127.0.0.1:4317";
const accessToken = process.env.EMPIRE_GUEST_AUTH_TOKEN;

const queue = {
  id: "ranked-rm-1v1",
  name: "Ranked 1v1 Random Map",
  description: "Local guest-bot test queue.",
  format: "1v1",
  ruleset: "Random Map",
  mapPool: [{ id: "arabia", name: "Arabia", style: "open" }],
  ranked: true,
  estimatedWaitSeconds: 1,
  playersSearching: 1
};

const player = {
  id: "local-guest-bot",
  aoeProfileId: 999002,
  displayName: "Local Guest Bot",
  countryCode: "BOT",
  rating: 1400,
  peakRating: 1400,
  teamRating: 1400,
  teamPeakRating: 1400,
  legacy1v1Wins: 10,
  legacy1v1Losses: 10,
  legacyTeamWins: 0,
  legacyTeamLosses: 0,
  rank: 9999,
  division: "Diamond",
  wins: 10,
  losses: 10,
  winRate: 50,
  streak: 0,
  preferredMaps: ["Arabia"],
  favoriteCivilizations: ["Random"],
  recentForm: ["win", "loss", "win", "loss", "win"]
};

let ticket;
let stopped = false;
let socket;
let requestSequence = 0;
let authenticatedResolve;
const pendingRequests = new Map();
let eventHandler;

async function connect() {
  socket = new WebSocket(matchmakerUrl.replace(/^http/, "ws") + "/events");
  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (message.type === "authenticated") {
      authenticatedResolve?.();
      return;
    }
    if (message.type === "response") {
      const pending = pendingRequests.get(message.id);
      if (!pending) return;
      pendingRequests.delete(message.id);
      if (message.status >= 400) pending.reject(new Error(message.body?.error ?? `Request failed (${message.status})`));
      else pending.resolve(message.body);
      return;
    }
    if (message.type === "event") void Promise.resolve(eventHandler?.(message.event)).catch((error) => {
      console.error(`[guest bot] ${error instanceof Error ? error.message : error}`);
      void stop();
    });
  });
  await new Promise((resolve, reject) => {
    socket.once("open", resolve);
    socket.once("error", reject);
  });
  const authenticated = new Promise((resolve) => {
    authenticatedResolve = resolve;
  });
  socket.send(JSON.stringify({ type: "authenticate", token: accessToken }));
  await authenticated;
}

async function request(path, options = {}) {
  const id = `guest-${++requestSequence}`;
  const result = new Promise((resolve, reject) => pendingRequests.set(id, { resolve, reject }));
  socket.send(JSON.stringify({
    type: "request",
    id,
    method: options.method ?? "GET",
    path,
    body: typeof options.body === "string" ? JSON.parse(options.body) : options.body
  }));
  return result;
}

async function stop() {
  if (stopped) return;
  stopped = true;
  if (ticket) {
    try {
      await request(`/tickets/${encodeURIComponent(ticket.id)}`, { method: "DELETE" });
    } catch {}
  }
}

async function main() {
  if (!accessToken) throw new Error("EMPIRE_GUEST_AUTH_TOKEN is required.");
  await connect();
  await request("/health");
  ticket = await request("/queue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queue, player, canHost: false })
  });
  console.log("[guest bot] Joined Ranked 1v1. Waiting for your Electron client...");

  await new Promise((resolve, reject) => {
    eventHandler = async (event) => {
      if (event.type === "match_found") {
        console.log(`[guest bot] Matched with ${event.match.opponent.displayName}. Auto-accepting as ${event.match.role}.`);
        await request(`/matches/${encodeURIComponent(event.match.id)}/accept`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId: ticket.id })
        });
      }
      if (event.type === "opponent_accepted") {
        console.log("[guest bot] Both players accepted. Waiting for the host lobby URI...");
      }
      if (event.type === "lobby_ready") {
        console.log(`[guest bot] SUCCESS: received ${event.lobby.platformLobbyId}`);
        console.log("[guest bot] Host automation and lobby relay both worked.");
        await stop();
        socket.close();
        resolve();
      }
      if (event.type === "error") throw new Error(event.message);
    };
    socket.send(JSON.stringify({ type: "subscribe", ticketId: ticket.id, after: 0 }));
    socket.once("error", reject);
    socket.once("close", () => {
      if (!stopped) reject(new Error("Matchmaker WebSocket closed."));
    });
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => void stop().finally(() => process.exit(0)));
}

main().catch(async (error) => {
  console.error(`[guest bot] ${error instanceof Error ? error.message : error}`);
  console.error("[guest bot] Make sure start-app.cmd is already running.");
  await stop();
  process.exitCode = 1;
});
