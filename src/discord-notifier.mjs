const DISCORD_API_BASE_URL = "https://discord.com/api/v10";
const MAX_ATTEMPTS = 3;
const DEFAULT_PLAYER_RATE_LIMIT = 5;
const DEFAULT_PLAYER_RATE_WINDOW_MS = 60_000;

export function isRanked1v1Ticket(ticket) {
  return ticket?.source !== "tournament"
    && ticket?.queue?.ranked === true
    && ticket?.queue?.format === "1v1";
}

export function isRanked1v1Match(match) {
  return match?.matchType !== "tournament"
    && match?.teamSize === 1
    && isRanked1v1Ticket(match?.host);
}

function escapeMarkdown(value) {
  return String(value ?? "Unknown player").replace(/([\\`*_{}\[\]()<>#+\-.!|])/g, "\\$1").slice(0, 250);
}

function formatRating(value) {
  const rating = Number(value);
  return Number.isFinite(rating) ? Math.round(rating).toLocaleString("en-US") : "Unrated";
}

function formatDuration(durationMs) {
  const seconds = Math.max(0, Math.round(Number(durationMs) / 1000));
  if (!Number.isFinite(seconds)) return null;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function ratingLine(ticket, ratings) {
  if (!ticket) return "Unknown rating";
  const result = ratings?.[ticket.player.id];
  if (!result) return `${formatRating(ticket.player.rating)} Elo`;
  const change = Number(result.ratingChange);
  const signedChange = change > 0 ? `+${change}` : String(change);
  return `${formatRating(result.newRating)} Elo (${signedChange})`;
}

export function lookingForMatchPayload(ticket) {
  return {
    allowed_mentions: { parse: [] },
    embeds: [{
      title: "Looking for a ranked 1v1",
      description: `**${escapeMarkdown(ticket.player.displayName)}** joined the matchmaking queue.`,
      color: 0xc58d45,
      fields: [
        { name: "Rating", value: `${formatRating(ticket.player.rating)} Elo`, inline: true },
        { name: "Queue", value: escapeMarkdown(ticket.queue.name ?? "Ranked 1v1 Random Map"), inline: true }
      ],
      timestamp: ticket.joinedAt ?? new Date().toISOString()
    }]
  };
}

export function matchCompletedPayload(match, replay, ratings) {
  const participants = match.participants ?? [match.host, match.guest];
  const winningProfileIds = new Set(replay.winningProfileIds?.length
    ? replay.winningProfileIds.map(Number)
    : [Number(replay.winnerProfileId)]);
  const winner = participants.find((ticket) => winningProfileIds.has(Number(ticket.player.aoeProfileId)));
  const loser = participants.find((ticket) => ticket.id !== winner?.id);
  const duration = formatDuration(replay.durationMs);
  return {
    allowed_mentions: { parse: [] },
    embeds: [{
      title: "Ranked 1v1 complete",
      description: `**${escapeMarkdown(winner?.player.displayName)}** defeated **${escapeMarkdown(loser?.player.displayName)}**.`,
      color: 0x4f9f69,
      fields: [
        { name: "Winner", value: ratingLine(winner, ratings), inline: true },
        { name: "Runner-up", value: ratingLine(loser, ratings), inline: true },
        { name: "Map", value: escapeMarkdown(match.selectedMap?.name ?? "Unknown map"), inline: true },
        ...(duration ? [{ name: "Duration", value: duration, inline: true }] : [])
      ],
      footer: { text: `Match ${String(match.id).slice(0, 100)}` },
      timestamp: new Date().toISOString()
    }]
  };
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function createDiscordNotifier({
  token = process.env.DISCORD_BOT_TOKEN,
  channelId = process.env.DISCORD_CHANNEL_ID,
  fetchImpl = globalThis.fetch,
  logger = console,
  now = Date.now,
  playerRateLimit = DEFAULT_PLAYER_RATE_LIMIT,
  playerRateWindowMs = DEFAULT_PLAYER_RATE_WINDOW_MS
} = {}) {
  const enabled = Boolean(token && channelId);
  if (Boolean(token) !== Boolean(channelId)) {
    logger.warn("[discord] Notifications disabled: set both DISCORD_BOT_TOKEN and DISCORD_CHANNEL_ID.");
  }
  let pending = Promise.resolve();
  const playerMessageTimes = new Map();

  function reservePlayerRateLimit(playerIds) {
    const timestamp = now();
    const cutoff = timestamp - playerRateWindowMs;
    const uniquePlayerIds = [...new Set(playerIds.filter(Boolean))];
    const recentByPlayer = new Map();
    for (const playerId of uniquePlayerIds) {
      const recent = (playerMessageTimes.get(playerId) ?? []).filter((sentAt) => sentAt > cutoff);
      recentByPlayer.set(playerId, recent);
      if (recent.length >= playerRateLimit) return false;
    }
    for (const [playerId, recent] of recentByPlayer) {
      playerMessageTimes.set(playerId, [...recent, timestamp]);
    }
    return true;
  }

  async function send(payload) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      try {
        const response = await fetchImpl(
          `${DISCORD_API_BASE_URL}/channels/${encodeURIComponent(channelId)}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bot ${token}`,
              "Content-Type": "application/json",
              "User-Agent": "EmpireLeagueMatchmaker/1.0"
            },
            body: JSON.stringify(payload),
            signal: controller.signal
          }
        );
        if (response.ok) return true;
        if (attempt < MAX_ATTEMPTS && (response.status === 429 || response.status >= 500)) {
          const retry = response.status === 429
            ? await response.json().catch(() => ({}))
            : {};
          await wait(Math.min(10_000, Math.max(250, Number(retry.retry_after ?? attempt) * 1000)));
          continue;
        }
        const detail = (await response.text().catch(() => "")).slice(0, 300);
        throw new Error(`Discord API returned ${response.status}${detail ? `: ${detail}` : ""}`);
      } finally {
        clearTimeout(timeout);
      }
    }
    return false;
  }

  function enqueue(payload, playerIds) {
    if (!enabled) return Promise.resolve(false);
    if (!reservePlayerRateLimit(playerIds)) return Promise.resolve(false);
    const notification = pending.then(() => send(payload));
    pending = notification.catch((error) => {
      logger.error("[discord] Could not post notification:", error instanceof Error ? error.message : error);
    });
    return notification.catch(() => false);
  }

  return {
    enabled,
    playerLooking(ticket) {
      return isRanked1v1Ticket(ticket)
        ? enqueue(lookingForMatchPayload(ticket), [ticket.player.id])
        : Promise.resolve(false);
    },
    matchCompleted(match, replay, ratings) {
      return isRanked1v1Match(match)
        ? enqueue(
            matchCompletedPayload(match, replay, ratings),
            (match.participants ?? [match.host, match.guest]).map((ticket) => ticket.player.id)
          )
        : Promise.resolve(false);
    }
  };
}
