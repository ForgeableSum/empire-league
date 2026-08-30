import assert from "node:assert/strict";
import test from "node:test";
import {
  createDiscordNotifier,
  isRanked1v1Match,
  isRanked1v1Ticket,
  leaderboardPayload,
  lookingForMatchPayload,
  matchCompletedPayload
} from "./discord-notifier.mjs";

const first = {
  id: "ticket-one",
  queueId: "ranked-rm-1v1",
  queue: { id: "ranked-rm-1v1", name: "Ranked 1v1 Random Map", format: "1v1", ranked: true },
  player: { id: "one", displayName: "Player *One*", aoeProfileId: 101, rating: 1200 },
  joinedAt: "2026-08-28T12:00:00.000Z"
};
const second = {
  ...first,
  id: "ticket-two",
  player: { id: "two", displayName: "Player Two", aoeProfileId: 202, rating: 1180 }
};
const match = {
  id: "match-test",
  host: first,
  guest: second,
  participants: [first, second],
  teamSize: 1,
  selectedMap: { name: "Arabia" }
};

test("only ranked 1v1 tickets and matches qualify", () => {
  assert.equal(isRanked1v1Ticket(first), true);
  assert.equal(isRanked1v1Ticket({ ...first, queue: { ...first.queue, format: "team" } }), false);
  assert.equal(isRanked1v1Match(match), true);
  assert.equal(isRanked1v1Match({ ...match, matchType: "tournament" }), false);
});

test("builds safe Discord embeds for queue and completed-match messages", () => {
  const looking = lookingForMatchPayload(first);
  assert.deepEqual(looking.allowed_mentions, { parse: [] });
  assert.match(looking.embeds[0].description, /Player \\\*One\\\*/);

  const completed = matchCompletedPayload(
    match,
    { winnerProfileId: 101, winningProfileIds: [101], durationMs: 1_525_000 },
    {
      one: { newRating: 1217, ratingChange: 17 },
      two: { newRating: 1163, ratingChange: -17 }
    }
  );
  assert.match(completed.embeds[0].description, /Player \\\*One\\\*.*defeated.*Player Two/);
  assert.deepEqual(completed.embeds[0].fields.map((field) => field.value), [
    "1,217 Elo (+17)", "1,163 Elo (-17)", "Arabia", "25:25"
  ]);
});

test("formats the top 50 leaderboard as two safe Discord embeds", () => {
  const players = Array.from({ length: 50 }, (_, index) => ({
    id: `player-${index + 1}`,
    rank: index + 1,
    displayName: index === 0 ? "Champion *One*" : `Player ${index + 1}`,
    rating: 2000 - index * 10,
    wins: 10 + index,
    losses: index
  }));
  const payload = leaderboardPayload(players, new Date("2026-08-29T12:00:00.000Z"));
  assert.deepEqual(payload.allowed_mentions, { parse: [] });
  assert.equal(payload.embeds.length, 2);
  assert.match(payload.embeds[0].title, /1v1 Top 50/);
  assert.match(payload.embeds[0].description, /🥇 \*\*Champion \\\*One\\\*\*\*.*2,000 Elo.*10W–0L.*100\.0%/);
  assert.match(payload.embeds[1].description, /\*\*#50\*\*.*Player 50/);
  assert.equal(payload.embeds[1].timestamp, "2026-08-29T12:00:00.000Z");
});

test("posts through Discord's bot channel endpoint", async () => {
  const calls = [];
  const notifier = createDiscordNotifier({
    token: "test-token",
    channelId: "123456789",
    fetchImpl: async (...args) => {
      calls.push(args);
      return { ok: true, status: 200 };
    }
  });
  assert.equal(await notifier.playerLooking(first), true);
  assert.equal(await notifier.matchCompleted(
    match,
    { winnerProfileId: 101, winningProfileIds: [101], durationMs: 60_000 },
    {}
  ), true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], "https://discord.com/api/v10/channels/123456789/messages");
  assert.equal(calls[0][1].headers.Authorization, "Bot test-token");
});

test("limits Discord posts involving a player to five per rolling minute", async () => {
  const calls = [];
  let currentTime = 1_000_000;
  const notifier = createDiscordNotifier({
    token: "test-token",
    channelId: "123456789",
    now: () => currentTime,
    fetchImpl: async (...args) => {
      calls.push(args);
      return { ok: true, status: 200 };
    }
  });

  for (let count = 0; count < 5; count += 1) {
    assert.equal(await notifier.playerLooking(first), true);
  }
  assert.equal(await notifier.playerLooking(first), false);
  assert.equal(calls.length, 5);

  assert.equal(await notifier.playerLooking(second), true);
  assert.equal(calls.length, 6);

  currentTime += 60_001;
  assert.equal(await notifier.playerLooking(first), true);
  assert.equal(calls.length, 7);
});

test("a completed match is suppressed if either participant reached the limit", async () => {
  let calls = 0;
  const notifier = createDiscordNotifier({
    token: "test-token",
    channelId: "123456789",
    fetchImpl: async () => {
      calls += 1;
      return { ok: true, status: 200 };
    }
  });

  for (let count = 0; count < 5; count += 1) await notifier.playerLooking(first);
  assert.equal(await notifier.matchCompleted(
    match,
    { winnerProfileId: 101, winningProfileIds: [101], durationMs: 60_000 },
    {}
  ), false);
  assert.equal(calls, 5);

  for (let count = 0; count < 5; count += 1) assert.equal(await notifier.playerLooking(second), true);
  assert.equal(calls, 10);
});

test("posts leaderboards to the dedicated channel at most once every five minutes", async () => {
  const calls = [];
  const scheduled = [];
  let currentTime = 1_000_000;
  const notifier = createDiscordNotifier({
    token: "test-token",
    channelId: "123456789",
    leaderboardChannelId: "1543424444935045260",
    now: () => currentTime,
    schedule: (callback, delay) => {
      const timer = { callback, delay, unref() {} };
      scheduled.push(timer);
      return timer;
    },
    fetchImpl: async (...args) => {
      calls.push(args);
      return { ok: true, status: 200 };
    }
  });
  const players = [{ id: "one", rank: 1, displayName: "Player One", rating: 1200, wins: 1, losses: 0 }];
  assert.equal(notifier.leaderboardEnabled, true);
  assert.equal(await notifier.leaderboard(players), true);
  assert.equal(await notifier.leaderboard(players), false);
  assert.equal(await notifier.leaderboard([{ ...players[0], rating: 1216, wins: 2 }]), false);
  assert.equal(await notifier.leaderboard([{ ...players[0], rating: 1232, wins: 3 }]), false);
  assert.equal(calls.length, 1);
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].delay, 5 * 60_000);

  currentTime += 5 * 60_000;
  await scheduled[0].callback();
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], "https://discord.com/api/v10/channels/1543424444935045260/messages");
  assert.match(JSON.parse(calls[1][1].body).embeds[0].description, /1,232 Elo.*3W/);
});
