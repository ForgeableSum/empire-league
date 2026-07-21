const matchmakerUrl = "http://127.0.0.1:4317";

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
  rank: 9999,
  division: "Gold",
  wins: 10,
  losses: 10,
  winRate: 50,
  streak: 0,
  preferredMaps: ["Arabia"],
  favoriteCivilizations: ["Random"],
  recentForm: ["win", "loss", "win", "loss", "win"]
};

async function request(path, options) {
  const response = await fetch(`${matchmakerUrl}${path}`, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status})`);
  return body;
}

let ticket;
let stopped = false;

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
  await request("/health");
  ticket = await request("/queue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queue, player, canHost: false })
  });
  console.log("[guest bot] Joined Ranked 1v1. Waiting for your Electron client...");

  let after = 0;
  while (!stopped) {
    const result = await request(`/tickets/${encodeURIComponent(ticket.id)}/events?after=${after}`);
    for (const item of result.events) {
      after = Math.max(after, item.sequence);
      const event = item.event;
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
        return;
      }
      if (event.type === "error") throw new Error(event.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
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
