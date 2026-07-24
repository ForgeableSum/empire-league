const aoeCommunityApiUrl = "https://aoe-api.worldsedgelink.com/community/leaderboard/getPersonalStat";
const soloRandomMapLeaderboardId = 3;

export async function attemptAoeRatingSeed(database, playerId, steamId) {
  const [claim] = await database.execute(
    `UPDATE players
     SET aoe_rating_seed_attempted = TRUE
     WHERE id = ? AND aoe_rating_seed_attempted = FALSE`,
    [playerId]
  );
  if (claim.affectedRows !== 1) return { attempted: false, seeded: false };

  try {
    const seed = await fetchAoeRatingSeed(steamId);
    if (!seed) {
      console.info(`[aoe-rating-seed] No ranked 1v1 RM rating found for Steam ${steamId}.`);
      return { attempted: true, seeded: false };
    }

    await database.execute(
      `UPDATE players
       SET aoe_profile_id = ?,
           rating = ?,
           peak_rating = ?,
           aoe_initial_rating = ?,
           aoe_rating_seeded_at = NOW(3)
       WHERE id = ?`,
      [seed.profileId, seed.rating, seed.peakRating, seed.rating, playerId]
    );
    console.info(`[aoe-rating-seed] Seeded ${playerId} at ${seed.rating} from ranked 1v1 RM.`);
    return { attempted: true, seeded: true, ...seed };
  } catch (error) {
    console.warn(
      `[aoe-rating-seed] One-time seed failed for Steam ${steamId}:`,
      error instanceof Error ? error.message : error
    );
    return { attempted: true, seeded: false };
  }
}

export async function fetchAoeRatingSeed(steamId) {
  const parameters = new URLSearchParams({
    title: "age2",
    profile_names: JSON.stringify([`/steam/${steamId}`])
  });
  const response = await fetch(`${aoeCommunityApiUrl}?${parameters}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000)
  });
  if (!response.ok) throw new Error(`AoE community API returned ${response.status}.`);

  return parseAoeRatingSeed(await response.json());
}

export function parseAoeRatingSeed(payload) {
  if (payload?.result?.code !== 0) return null;

  const stat = payload?.leaderboardStats?.find(
    (item) => Number(item?.leaderboard_id) === soloRandomMapLeaderboardId
  );
  const rating = Number(stat?.rating);
  if (!Number.isInteger(rating) || rating <= 0 || rating > 5000) return null;

  const statGroup = payload?.statGroups?.find(
    (group) => Number(group?.id) === Number(stat?.statgroup_id)
  );
  const profileId = Number(statGroup?.members?.[0]?.profile_id);
  if (!Number.isSafeInteger(profileId) || profileId <= 0) return null;

  const reportedPeak = Number(stat?.highestrating);
  return {
    profileId,
    rating,
    peakRating: Number.isInteger(reportedPeak) && reportedPeak >= rating && reportedPeak <= 5000
      ? reportedPeak
      : rating
  };
}
