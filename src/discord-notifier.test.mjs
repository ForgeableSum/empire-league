import assert from "node:assert/strict";
import test from "node:test";
import {
  createDiscordNotifier,
  isRanked1v1Match,
  isRanked1v1Ticket,
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
