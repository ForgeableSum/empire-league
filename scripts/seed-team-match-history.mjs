import { database, databaseConfig } from "../src/database.mjs";

if (!["127.0.0.1", "localhost", "::1"].includes(databaseConfig.host)) {
  throw new Error(`Refusing to seed a non-local database host: ${databaseConfig.host}`);
}

const currentPlayerId = "steam-76561197993175362";
const fixtures = [
  {
    id: "local-preview-team-history-2v2-win",
    mapId: "arabia",
    mapName: "Arabia",
    minutesAgo: 35,
    durationMinutes: 33,
    ratingChange: 18,
    winnerPlayerId: "leaderboard-test-001",
    teams: [
      [
        [currentPlayerId, "Byzantines"],
        ["leaderboard-test-001", "Mongols"]
      ],
      [
        ["steam-76561198345196929", "Franks"],
        ["leaderboard-test-002", "Mayans"]
      ]
    ]
  },
  {
    id: "local-preview-team-history-2v2-loss",
    mapId: "arena",
    mapName: "Arena",
    minutesAgo: 105,
    durationMinutes: 46,
    ratingChange: -15,
    winnerPlayerId: "steam-76561198345196929",
    teams: [
      [
        [currentPlayerId, "Britons"],
        ["leaderboard-test-003", "Bohemians"]
      ],
      [
        ["steam-76561198345196929", "Lithuanians"],
        ["leaderboard-test-004", "Japanese"]
      ]
    ]
  },
  {
    id: "local-preview-team-history-4v4-win",
    mapId: "black-forest",
    mapName: "Black Forest",
    minutesAgo: 190,
    durationMinutes: 58,
    ratingChange: 11,
    winnerPlayerId: "leaderboard-test-005",
    teams: [
      [
        [currentPlayerId, "Persians"],
        ["leaderboard-test-001", "Celts"],
        ["leaderboard-test-003", "Koreans"],
        ["leaderboard-test-005", "Teutons"]
      ],
      [
        ["steam-76561198345196929", "Goths"],
        ["leaderboard-test-002", "Chinese"],
        ["leaderboard-test-004", "Spanish"],
        ["leaderboard-test-006", "Turks"]
      ]
    ]
  }
];

const playerIds = [...new Set(fixtures.flatMap((fixture) => fixture.teams.flat().map(([playerId]) => playerId)))];
const placeholders = playerIds.map(() => "?").join(", ");
const [playerRows] = await database.execute(
  `SELECT id, team_rating FROM players WHERE id IN (${placeholders})`,
  playerIds
);
const ratings = new Map(playerRows.map((player) => [player.id, Number(player.team_rating)]));
const missingPlayerIds = playerIds.filter((playerId) => !ratings.has(playerId));
if (missingPlayerIds.length > 0) {
  throw new Error(`Missing fixture players: ${missingPlayerIds.join(", ")}`);
}

const connection = await database.getConnection();
try {
  await connection.beginTransaction();
  for (const fixture of fixtures) {
    const completedAt = new Date(Date.now() - fixture.minutesAgo * 60_000);
    const createdAt = new Date(completedAt.getTime() - fixture.durationMinutes * 60_000);
    const host = fixture.teams[0][0];
    const guest = fixture.teams[1][0];
    await connection.execute(
      `INSERT INTO matches
        (id, queue_id, host_player_id, guest_player_id, selected_map_id, selected_map_name,
         host_civilization, guest_civilization, map_catalog_version, map_group_id, status, created_at, completed_at)
       VALUES (?, 'team-games', ?, ?, ?, ?, ?, ?, 1, 'land-closed', 'completed', ?, ?)
       ON DUPLICATE KEY UPDATE id = VALUES(id)`,
      [fixture.id, host[0], guest[0], fixture.mapId, fixture.mapName, host[1], guest[1], createdAt, completedAt]
    );

    let lobbySlot = 1;
    for (const [teamIndex, team] of fixture.teams.entries()) {
      for (const [playerId, civilization] of team) {
        await connection.execute(
          `INSERT INTO match_participants
            (match_id, player_id, lobby_slot, team_number, civilization)
           VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE civilization = VALUES(civilization)`,
          [fixture.id, playerId, lobbySlot, teamIndex + 1, civilization]
        );
        const won = teamIndex === 0 ? fixture.ratingChange > 0 : fixture.ratingChange < 0;
        const change = Math.abs(fixture.ratingChange) * (won ? 1 : -1);
        const currentRating = ratings.get(playerId);
        await connection.execute(
          `INSERT INTO rating_history
            (player_id, match_id, rating_pool, rating_before, rating_after, rating_change, created_at)
           VALUES (?, ?, 'team', ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE rating_change = VALUES(rating_change)`,
          [playerId, fixture.id, currentRating - change, currentRating, change, completedAt]
        );
        lobbySlot += 1;
      }
    }

    await connection.execute(
      `INSERT INTO match_results
        (match_id, winner_player_id, result, verification_status, verified_at)
       VALUES (?, ?, ?, 'verified', ?)
       ON DUPLICATE KEY UPDATE winner_player_id = VALUES(winner_player_id),
         result = VALUES(result), verification_status = 'verified', verified_at = VALUES(verified_at)`,
      [fixture.id, fixture.winnerPlayerId, fixture.ratingChange > 0 ? "host_win" : "guest_win", completedAt]
    );
  }
  await connection.commit();
  console.log(`Seeded ${fixtures.length} team match-history fixtures for ForgeableSum.`);
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
  await database.end();
}
