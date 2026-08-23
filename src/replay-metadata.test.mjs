import assert from "node:assert/strict";
import test from "node:test";
import {
  replayContainsTerminalHumanResign,
  replaySummaryHasEnded,
  shouldUseAiReplayCompletionFallback
} from "./renderer/services/replayMetadataService.ts";

test("completed team games count AI participants without Steam profile IDs", () => {
  const teams = [
    {
      winner: false,
      players: [{ player_number: 1, profile_id: 1231146 }]
    },
    {
      winner: true,
      players: [
        { player_number: 2, profile_id: -1 },
        { player_number: 3, profile_id: -1 },
        { player_number: 4, profile_id: -1 }
      ]
    }
  ];

  assert.equal(replaySummaryHasEnded(teams, "team", 4), true);
  assert.equal(replaySummaryHasEnded(teams, "team", 5), false);
});

test("completed FFA games still require exactly one winning participant", () => {
  const oneWinner = [
    { winner: true, players: [{ player_number: 1, profile_id: -1 }] },
    { winner: false, players: [{ player_number: 2, profile_id: 456 }] }
  ];
  const twoWinners = oneWinner.map((team) => ({ ...team, winner: true }));

  assert.equal(replaySummaryHasEnded(oneWinner, "ffa", 2), true);
  assert.equal(replaySummaryHasEnded(twoWinners, "ffa", 2), false);
});

test("unparseable AI replays require a repeated quiet snapshot", () => {
  assert.equal(shouldUseAiReplayCompletionFallback(3, { reason: "FileGrowth", retry: false }), false);
  assert.equal(shouldUseAiReplayCompletionFallback(3, { reason: "QuietFallback", retry: false }), false);
  assert.equal(shouldUseAiReplayCompletionFallback(0, { reason: "QuietFallback", retry: true }), false);
  assert.equal(shouldUseAiReplayCompletionFallback(3, { reason: "QuietFallback", retry: true }), true);
});

test("only the sole human surrender is terminal in an AI custom game", () => {
  const operations = [
    { Action: { action_data: { Resign: { player_id: 2 } } } },
    { Action: { action_data: { Resign: { player_id: 1 } } } }
  ];

  assert.equal(replayContainsTerminalHumanResign(operations.slice(0, 1), [1]), false);
  assert.equal(replayContainsTerminalHumanResign(operations, [1]), true);
  assert.equal(replayContainsTerminalHumanResign(operations, []), false);
});
