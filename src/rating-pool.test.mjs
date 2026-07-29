import assert from "node:assert/strict";
import test from "node:test";
import {
  SOLO_RATING_POOL,
  TEAM_RATING_POOL,
  playerRatingForQueue,
  ratingFieldsForQueue,
  ratingPoolForQueue
} from "./rating-pool.mjs";

test("team games use the independent team rating pool", () => {
  assert.equal(ratingPoolForQueue("team-games"), TEAM_RATING_POOL);
  assert.equal(ratingFieldsForQueue("team-games").rating, "team_rating");
  assert.equal(playerRatingForQueue({ rating: 1200, teamRating: 1500 }, "team-games"), 1500);
});

test("all other queues use the solo rating pool", () => {
  assert.equal(ratingPoolForQueue("ranked-rm-1v1"), SOLO_RATING_POOL);
  assert.equal(ratingFieldsForQueue("ranked-rm-1v1").rating, "rating");
  assert.equal(playerRatingForQueue({ rating: 1200, teamRating: 1500 }, "ranked-rm-1v1"), 1200);
});
