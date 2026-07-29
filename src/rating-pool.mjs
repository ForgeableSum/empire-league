export const SOLO_RATING_POOL = "solo";
export const TEAM_RATING_POOL = "team";

export function ratingPoolForQueue(queueId) {
  return queueId === "team-games" ? TEAM_RATING_POOL : SOLO_RATING_POOL;
}

export function ratingFieldsForQueue(queueId) {
  return ratingPoolForQueue(queueId) === TEAM_RATING_POOL
    ? {
        pool: TEAM_RATING_POOL,
        rating: "team_rating",
        peakRating: "team_peak_rating",
        wins: "team_wins",
        losses: "team_losses",
        streak: "team_streak"
      }
    : {
        pool: SOLO_RATING_POOL,
        rating: "rating",
        peakRating: "peak_rating",
        wins: "wins",
        losses: "losses",
        streak: "streak"
      };
}

export function playerRatingForQueue(player, queueId) {
  const value = ratingPoolForQueue(queueId) === TEAM_RATING_POOL
    ? player.teamRating
    : player.rating;
  return Number(value);
}
