import mysql from "mysql2/promise";

const databaseName = process.env.DB_NAME ?? "empire_league";

export const databaseConfig = {
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3306),
  database: databaseName,
  user: process.env.DB_USER ?? "empire_league_app",
  password: process.env.DB_PASSWORD
};

export const database = mysql.createPool({
  ...databaseConfig,
  connectionLimit: 10,
  enableKeepAlive: true,
  timezone: "Z"
});

export async function checkDatabase() {
  const [[serverRows], [migrationRows]] = await Promise.all([
    database.query("SELECT VERSION() AS version, DATABASE() AS databaseName"),
    database.query("SELECT version FROM schema_migrations ORDER BY applied_at DESC LIMIT 1")
  ]);
  return { ...serverRows[0], schemaVersion: migrationRows[0]?.version ?? null };
}

export async function saveQueueTicket(ticket) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      `INSERT INTO players
        (id, aoe_profile_id, display_name, country_code, rating, peak_rating, wins, losses, streak)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         aoe_profile_id = VALUES(aoe_profile_id), display_name = VALUES(display_name),
         country_code = VALUES(country_code), peak_rating = GREATEST(peak_rating, VALUES(peak_rating)),
         wins = VALUES(wins), losses = VALUES(losses), streak = VALUES(streak)`,
      [ticket.player.id, ticket.player.aoeProfileId || null, ticket.player.displayName, ticket.player.countryCode ?? null,
        ticket.player.rating, ticket.player.peakRating, ticket.player.wins, ticket.player.losses, ticket.player.streak]
    );
    await connection.execute(
      `INSERT INTO queue_tickets
        (id, player_id, queue_id, selected_maps, favorite_map_id, can_host, status, joined_at)
       VALUES (?, ?, ?, ?, ?, ?, 'searching', ?)`,
      [ticket.id, ticket.player.id, ticket.queueId, JSON.stringify(ticket.queue.mapPool.map((map) => map.id)),
        ticket.queue.favoriteMapId ?? null, ticket.canHost, new Date(ticket.joinedAt)]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function saveMatch(match) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      `INSERT INTO matches
        (id, queue_id, host_player_id, guest_player_id, selected_map_id, selected_map_name, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'found', ?)`,
      [match.id, match.host.queueId, match.host.player.id, match.guest.player.id,
        match.selectedMap.id, match.selectedMap.name, new Date(match.createdAt)]
    );
    await connection.execute(
      "UPDATE queue_tickets SET status = 'matched', matched_at = ? WHERE id IN (?, ?)",
      [new Date(match.createdAt), match.host.id, match.guest.id]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateTicketStatus(ticketId, status) {
  await database.execute("UPDATE queue_tickets SET status = ? WHERE id = ?", [status, ticketId]);
}

export async function updateMatchStatus(matchId, status) {
  await database.execute("UPDATE matches SET status = ? WHERE id = ?", [status, matchId]);
}

export async function linkPlayerAoeProfile(playerId, profileId) {
  const [existing] = await database.execute(
    "SELECT id FROM players WHERE aoe_profile_id = ? AND id <> ?",
    [profileId, playerId]
  );
  if (existing.length > 0) throw new Error("That AoE profile is already linked to another player.");
  const [result] = await database.execute(
    "UPDATE players SET aoe_profile_id = ? WHERE id = ? AND aoe_profile_id IS NULL",
    [profileId, playerId]
  );
  if (result.affectedRows === 1) return true;
  const [players] = await database.execute(
    "SELECT aoe_profile_id FROM players WHERE id = ?",
    [playerId]
  );
  return Number(players[0]?.aoe_profile_id) === profileId;
}

export async function recordVerifiedMatchResult(match, winnerProfileId) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [players] = await connection.execute(
      `SELECT id, aoe_profile_id, rating
       FROM players
       WHERE id IN (?, ?)
       FOR UPDATE`,
      [match.host.player.id, match.guest.player.id]
    );
    if (players.length !== 2) throw new Error("Both matched players must exist before recording a result.");
    const winner = players.find((player) => Number(player.aoe_profile_id) === winnerProfileId);
    const loser = players.find((player) => Number(player.aoe_profile_id) !== winnerProfileId);
    if (!winner || !loser) throw new Error("The reported winner is not a player in this match.");

    const expectedWinner = 1 / (1 + 10 ** ((Number(loser.rating) - Number(winner.rating)) / 400));
    const winnerChange = Math.round(32 * (1 - expectedWinner));
    const loserChange = -winnerChange;
    const winnerAfter = Number(winner.rating) + winnerChange;
    const loserAfter = Number(loser.rating) + loserChange;
    const result = winner.id === match.host.player.id ? "host_win" : "guest_win";
    const completedAt = new Date();

    await connection.execute(
      `INSERT INTO match_results
        (match_id, winner_player_id, result, verification_status, verified_at)
       VALUES (?, ?, ?, 'verified', ?)`,
      [match.id, winner.id, result, completedAt]
    );
    await connection.execute(
      "UPDATE matches SET status = 'completed', completed_at = ? WHERE id = ?",
      [completedAt, match.id]
    );
    await connection.execute(
      `UPDATE players
       SET rating = ?, peak_rating = GREATEST(peak_rating, ?), wins = wins + 1,
           streak = IF(streak >= 0, streak + 1, 1)
       WHERE id = ?`,
      [winnerAfter, winnerAfter, winner.id]
    );
    await connection.execute(
      `UPDATE players
       SET rating = ?, losses = losses + 1, streak = IF(streak <= 0, streak - 1, -1)
       WHERE id = ?`,
      [loserAfter, loser.id]
    );
    await connection.execute(
      `INSERT INTO rating_history
        (player_id, match_id, rating_before, rating_after, rating_change)
       VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`,
      [
        winner.id, match.id, Number(winner.rating), winnerAfter, winnerChange,
        loser.id, match.id, Number(loser.rating), loserAfter, loserChange
      ]
    );
    await connection.commit();
    return {
      [winner.id]: { oldRating: Number(winner.rating), newRating: winnerAfter, ratingChange: winnerChange },
      [loser.id]: { oldRating: Number(loser.rating), newRating: loserAfter, ratingChange: loserChange }
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function recordMatchResultConflict(match, { reason, implicatedTicketIds, reports }) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    for (const ticketId of implicatedTicketIds) {
      const ticket = ticketId === match.host.id ? match.host : ticketId === match.guest.id ? match.guest : null;
      if (!ticket) continue;
      const opponent = ticket.id === match.host.id ? match.guest : match.host;
      const [insert] = await connection.execute(
        `INSERT IGNORE INTO match_result_conflicts
          (match_id, player_id, opponent_player_id, reason, replay_metadata)
         VALUES (?, ?, ?, ?, ?)`,
        [
          match.id,
          ticket.player.id,
          opponent.player.id,
          String(reason).slice(0, 500),
          reports?.[ticket.id] === undefined ? null : JSON.stringify(reports[ticket.id])
        ]
      );
      if (insert.affectedRows > 0) {
        await connection.execute(
          "UPDATE players SET result_conflict_count = result_conflict_count + 1 WHERE id = ?",
          [ticket.player.id]
        );
      }
    }
    await connection.execute(
      "UPDATE matches SET status = 'cancelled' WHERE id = ?",
      [match.id]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function getPlayerMatchHistory(playerId) {
  const [rows] = await database.execute(
    `SELECT m.id, opponent.display_name AS opponent, opponent.rating AS opponent_rating,
       m.selected_map_name AS map_name, m.queue_id AS queue_type,
       CASE
         WHEN mr.result = 'no_contest' THEN 'no_contest'
         WHEN mr.winner_player_id = ? THEN 'win'
         ELSE 'loss'
       END AS outcome,
       COALESCE(rh.rating_change, 0) AS rating_change,
       TIMESTAMPDIFF(MINUTE, m.created_at, m.completed_at) AS duration_minutes,
       m.completed_at, mr.verification_status
     FROM matches m
     JOIN players opponent ON opponent.id = CASE WHEN m.host_player_id = ? THEN m.guest_player_id ELSE m.host_player_id END
     JOIN match_results mr ON mr.match_id = m.id
     LEFT JOIN rating_history rh ON rh.match_id = m.id AND rh.player_id = ?
     WHERE (m.host_player_id = ? OR m.guest_player_id = ?) AND m.status = 'completed'
     ORDER BY m.completed_at DESC
     LIMIT 100`,
    [playerId, playerId, playerId, playerId, playerId]
  );
  return rows.map((row) => ({
    id: row.id,
    opponent: row.opponent,
    opponentRating: Number(row.opponent_rating),
    outcome: row.outcome,
    map: row.map_name,
    civilization: "",
    opponentCivilization: "",
    ratingChange: Number(row.rating_change),
    durationMinutes: Number(row.duration_minutes ?? 0),
    timestamp: new Date(row.completed_at).toISOString(),
    verified: row.verification_status === "verified",
    queueType: row.queue_type
  }));
}

export async function getLeaderboard(limit = 500) {
  const safeLimit = Math.max(1, Math.min(500, Number(limit) || 500));
  const [rows] = await database.query(
    `SELECT id, aoe_profile_id, steam_id, display_name, avatar_url, country_code,
            rating, peak_rating, wins, losses, streak,
            RANK() OVER (ORDER BY rating DESC) AS ladder_rank
     FROM players
     ORDER BY rating DESC, wins DESC, display_name ASC
     LIMIT ${safeLimit}`
  );
  return rows.map((row) => {
    const wins = Number(row.wins);
    const losses = Number(row.losses);
    const games = wins + losses;
    return {
      id: row.id,
      aoeProfileId: row.aoe_profile_id ? Number(row.aoe_profile_id) : 0,
      steamId: row.steam_id ?? undefined,
      displayName: row.display_name,
      avatarUrl: row.avatar_url ?? undefined,
      countryCode: row.country_code ?? undefined,
      rating: Number(row.rating),
      peakRating: Number(row.peak_rating),
      rank: Number(row.ladder_rank),
      division: divisionForRating(Number(row.rating)),
      wins,
      losses,
      winRate: games ? Number(((wins / games) * 100).toFixed(1)) : 0,
      streak: Number(row.streak),
      preferredMaps: [],
      favoriteCivilizations: [],
      recentForm: []
    };
  });
}

function divisionForRating(rating) {
  if (rating >= 2200) return "Grandmaster";
  if (rating >= 1800) return "Master";
  if (rating >= 1400) return "Diamond";
  if (rating >= 1200) return "Platinum";
  if (rating >= 1000) return "Gold";
  if (rating >= 800) return "Silver";
  return "Bronze";
}
