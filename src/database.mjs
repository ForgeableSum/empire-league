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
