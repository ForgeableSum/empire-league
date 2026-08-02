import mysql from "mysql2/promise";
import { civilizationNameFromId } from "./civilization-roll.mjs";
import { ratingFieldsForQueue } from "./rating-pool.mjs";

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

export async function getOnlinePlayerCount(activeWithinSeconds = 90) {
  const safeSeconds = Math.max(1, Math.min(3600, Math.floor(Number(activeWithinSeconds) || 90)));
  const [rows] = await database.query(
    `SELECT COUNT(DISTINCT player_id) AS online_player_count
     FROM auth_sessions
     WHERE revoked_at IS NULL
       AND expires_at > NOW(3)
       AND last_used_at >= DATE_SUB(NOW(3), INTERVAL ${safeSeconds} SECOND)`
  );
  return Number(rows[0]?.online_player_count ?? 0);
}

async function insertDurableMatch(connection, match, status, completedAt = null, civilizations = {}) {
  await connection.execute(
    `INSERT INTO matches
      (id, queue_id, host_player_id, guest_player_id, selected_map_id, selected_map_name,
       host_civilization, guest_civilization, map_catalog_version, map_group_id, status,
       created_at, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       status = VALUES(status),
       completed_at = VALUES(completed_at),
       host_civilization = COALESCE(VALUES(host_civilization), host_civilization),
       guest_civilization = COALESCE(VALUES(guest_civilization), guest_civilization)`,
    [
      match.id,
      match.host.queueId,
      match.host.player.id,
      match.guest.player.id,
      match.selectedMap.id,
      match.selectedMap.name,
      civilizations.host || null,
      civilizations.guest || null,
      match.mapCatalogVersion,
      match.mapGroupId,
      status,
      new Date(match.createdAt),
      completedAt
    ]
  );
  if (match.teamSize > 1 && match.participants?.length) {
    for (const ticket of match.participants) {
      const assignment = match.assignments.get(ticket.id);
      await connection.execute(
        `INSERT INTO match_participants
          (match_id, player_id, lobby_slot, team_number, civilization)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           lobby_slot = VALUES(lobby_slot),
           team_number = VALUES(team_number),
           civilization = COALESCE(VALUES(civilization), civilization)`,
        [
          match.id,
          ticket.player.id,
          assignment.slot,
          assignment.team,
          civilizations[ticket.id] || null
        ]
      );
    }
  }
}

export async function recordPendingMatch(match) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    await insertDurableMatch(connection, match, "in_game");
    await connection.execute(
      `INSERT INTO match_results (match_id, winner_player_id, result, verification_status, verified_at)
       VALUES (?, NULL, NULL, 'pending', NULL)
       ON DUPLICATE KEY UPDATE verification_status = 'pending'`,
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

export async function recordNoContestMatch(match) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const completedAt = new Date();
    await insertDurableMatch(connection, match, "completed", completedAt);
    await connection.execute(
      `INSERT INTO match_results (match_id, winner_player_id, result, verification_status, verified_at)
       VALUES (?, NULL, 'no_contest', 'no_contest', ?)
       ON DUPLICATE KEY UPDATE
         winner_player_id = NULL, result = 'no_contest', verification_status = 'no_contest', verified_at = VALUES(verified_at)`,
      [match.id, completedAt]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
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

export async function recordVerifiedMatchResult(match, replay) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const fields = ratingFieldsForQueue(match.host.queueId);
    const participantTickets = match.participants ?? [match.host, match.guest];
    const placeholders = participantTickets.map(() => "?").join(", ");
    const [players] = await connection.execute(
      `SELECT id, aoe_profile_id, ${fields.rating} AS active_rating
       FROM players
       WHERE id IN (${placeholders})
       FOR UPDATE`,
      participantTickets.map((ticket) => ticket.player.id)
    );
    if (players.length !== participantTickets.length) {
      throw new Error("Every matched player must exist before recording a result.");
    }
    const winningProfileIds = new Set(replay.winningProfileIds?.length
      ? replay.winningProfileIds
      : [replay.winnerProfileId]);
    const winners = players.filter((player) => winningProfileIds.has(Number(player.aoe_profile_id)));
    const losers = players.filter((player) => !winningProfileIds.has(Number(player.aoe_profile_id)));
    if (!winners.length || winners.length !== losers.length) {
      throw new Error("The replay must identify two equally sized teams.");
    }
    const average = (team) => team.reduce((sum, player) => sum + Number(player.active_rating), 0) / team.length;
    const expectedWinner = 1 / (1 + 10 ** ((average(losers) - average(winners)) / 400));
    const winnerChange = Math.round(32 * (1 - expectedWinner));
    const loserChange = -winnerChange;
    const hostWon = winners.some((player) => player.id === match.host.player.id);
    const result = hostWon ? "host_win" : "guest_win";
    const completedAt = new Date();

    const civilizationFor = (ticket) => civilizationNameFromId(
      replay.players.find((player) => player.profileId === ticket.player.aoeProfileId)?.civilizationId
    );
    const civilizations = Object.fromEntries(participantTickets.map((ticket) => [ticket.id, civilizationFor(ticket)]));
    civilizations.host = civilizationFor(match.host);
    civilizations.guest = civilizationFor(match.guest);
    await insertDurableMatch(connection, match, "completed", completedAt, civilizations);
    await connection.execute(
      `INSERT INTO match_results
        (match_id, winner_player_id, result, verification_status, verified_at)
      VALUES (?, ?, ?, 'verified', ?)
      ON DUPLICATE KEY UPDATE
        winner_player_id = VALUES(winner_player_id), result = VALUES(result),
        verification_status = 'verified', verified_at = VALUES(verified_at)`,
      [match.id, winners[0].id, result, completedAt]
    );
    const ratings = {};
    for (const player of players) {
      const won = winners.includes(player);
      const change = won ? winnerChange : loserChange;
      const before = Number(player.active_rating);
      const after = before + change;
      await connection.execute(
        `UPDATE players
         SET ${fields.rating} = ?, ${fields.peakRating} = GREATEST(${fields.peakRating}, ?),
             ${won ? fields.wins : fields.losses} = ${won ? fields.wins : fields.losses} + 1,
             ${fields.streak} = IF(${fields.streak} ${won ? ">=" : "<="} 0,
               ${fields.streak} ${won ? "+" : "-"} 1, ${won ? "1" : "-1"})
         WHERE id = ?`,
        [after, after, player.id]
      );
      await connection.execute(
        `INSERT INTO rating_history
          (player_id, match_id, rating_pool, rating_before, rating_after, rating_change)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [player.id, match.id, fields.pool, before, after, change]
      );
      ratings[player.id] = { oldRating: before, newRating: after, ratingChange: change };
    }
    await connection.commit();
    return ratings;
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
    const completedAt = new Date();
    await insertDurableMatch(connection, match, "completed", completedAt);
    await connection.execute(
      `INSERT INTO match_results (match_id, winner_player_id, result, verification_status, verified_at)
       VALUES (?, NULL, 'no_contest', 'contested', ?)
       ON DUPLICATE KEY UPDATE
         winner_player_id = NULL, result = 'no_contest', verification_status = 'contested', verified_at = VALUES(verified_at)`,
      [match.id, completedAt]
    );
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
    `SELECT m.id, opponent.id AS opponent_id, opponent.display_name AS opponent,
       CASE WHEN m.queue_id = 'team-games' THEN opponent.team_rating ELSE opponent.rating END AS opponent_rating,
       m.selected_map_name AS map_name, m.queue_id AS queue_type,
       CASE WHEN m.host_player_id = ? THEN m.host_civilization ELSE m.guest_civilization END AS civilization,
       CASE WHEN m.host_player_id = ? THEN m.guest_civilization ELSE m.host_civilization END AS opponent_civilization,
       CASE
         WHEN mr.verification_status <> 'verified' THEN 'no_contest'
         WHEN mr.result = 'no_contest' THEN 'no_contest'
         WHEN mr.winner_player_id = ? THEN 'win'
         ELSE 'loss'
       END AS outcome,
       COALESCE(rh.rating_change, 0) AS rating_change,
       TIMESTAMPDIFF(MINUTE, m.created_at, m.completed_at) AS duration_minutes,
       COALESCE(m.completed_at, m.created_at) AS history_at, mr.verification_status
     FROM matches m
     JOIN players opponent ON opponent.id = CASE WHEN m.host_player_id = ? THEN m.guest_player_id ELSE m.host_player_id END
     JOIN match_results mr ON mr.match_id = m.id
     LEFT JOIN rating_history rh ON rh.match_id = m.id AND rh.player_id = ?
     WHERE (m.host_player_id = ? OR m.guest_player_id = ?) AND m.status IN ('in_game', 'completed')
     ORDER BY history_at DESC
     LIMIT 100`,
    [playerId, playerId, playerId, playerId, playerId, playerId, playerId]
  );
  return rows.map((row) => ({
    id: row.id,
    opponentId: row.opponent_id,
    opponent: row.opponent,
    opponentRating: Number(row.opponent_rating),
    outcome: row.outcome,
    map: row.map_name,
    civilization: row.civilization ?? "",
    opponentCivilization: row.opponent_civilization ?? "",
    ratingChange: Number(row.rating_change),
    durationMinutes: Number(row.duration_minutes ?? 0),
    timestamp: new Date(row.history_at).toISOString(),
    verified: row.verification_status === "verified",
    verificationStatus: row.verification_status,
    queueType: row.queue_type
  }));
}

export async function getPlayerProfile(playerId) {
  const [rows] = await database.query(
    `SELECT p.*, (SELECT COUNT(*) + 1 FROM players higher WHERE higher.rating > p.rating) AS ladder_rank
     FROM players p
     WHERE p.id = ?
     LIMIT 1`,
    [playerId]
  );
  const row = rows[0];
  if (!row) return null;
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
    teamRating: Number(row.team_rating),
    teamPeakRating: Number(row.team_peak_rating),
    legacy1v1Wins: Number(row.legacy_solo_wins),
    legacy1v1Losses: Number(row.legacy_solo_losses),
    legacyTeamWins: Number(row.legacy_team_wins),
    legacyTeamLosses: Number(row.legacy_team_losses),
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
}

const leaderboardDivisionRanges = {
  copper: { maximum: 500 },
  bronze: { minimum: 501, maximum: 799 },
  silver: { minimum: 800, maximum: 999 },
  gold: { minimum: 1000, maximum: 1199 },
  platinum: { minimum: 1200, maximum: 1399 },
  diamond: { minimum: 1400, maximum: 1799 },
  master: { minimum: 1800, maximum: 2199 },
  grandmaster: { minimum: 2200 }
};

export async function getLeaderboard(page = 1, pageSize = 100, division = "all", mode = "solo") {
  const safePageSize = Math.max(1, Math.min(100, Number(pageSize) || 100));
  const safePage = Math.max(1, Math.floor(Number(page) || 1));
  const normalizedDivision = String(division).trim().toLowerCase();
  const range = leaderboardDivisionRanges[normalizedDivision];
  const safeMode = mode === "team" ? "team" : "solo";
  const ratingColumn = safeMode === "team" ? "team_rating" : "rating";
  const winsColumn = safeMode === "team" ? "team_wins" : "wins";
  const lossesColumn = safeMode === "team" ? "team_losses" : "losses";
  const streakColumn = safeMode === "team" ? "team_streak" : "streak";
  const conditions = [];
  const filterValues = [];
  if (range?.minimum !== undefined) {
    conditions.push("ladder_rating >= ?");
    filterValues.push(range.minimum);
  }
  if (range?.maximum !== undefined) {
    conditions.push("ladder_rating <= ?");
    filterValues.push(range.maximum);
  }
  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const offset = (safePage - 1) * safePageSize;
  const [[rows], [countRows]] = await Promise.all([
    database.query(
    `SELECT *
     FROM (
       SELECT id, aoe_profile_id, steam_id, display_name, avatar_url, country_code,
              rating, peak_rating, team_rating, team_peak_rating,
              legacy_solo_wins, legacy_solo_losses, legacy_team_wins, legacy_team_losses,
              ${ratingColumn} AS ladder_rating,
              ${winsColumn} AS ladder_wins, ${lossesColumn} AS ladder_losses,
              ${streakColumn} AS ladder_streak,
              RANK() OVER (ORDER BY ${ratingColumn} DESC) AS ladder_rank
       FROM players
     ) AS ranked_players
     ${whereClause}
     ORDER BY ladder_rating DESC, ladder_wins DESC, display_name ASC
     LIMIT ${safePageSize} OFFSET ${offset}`,
      filterValues
    ),
    database.query(
      `SELECT COUNT(*) AS total FROM (SELECT ${ratingColumn} AS ladder_rating FROM players) AS ranked_players ${whereClause}`,
      filterValues
    )
  ]);
  const players = rows.map((row) => {
    const wins = Number(row.ladder_wins);
    const losses = Number(row.ladder_losses);
    const games = wins + losses;
    return {
      id: row.id,
      aoeProfileId: row.aoe_profile_id ? Number(row.aoe_profile_id) : 0,
      steamId: row.steam_id ?? undefined,
      displayName: row.display_name,
      avatarUrl: row.avatar_url ?? undefined,
      countryCode: row.country_code ?? undefined,
      rating: Number(row.ladder_rating),
      peakRating: Number(row.peak_rating),
      teamRating: Number(row.team_rating),
      teamPeakRating: Number(row.team_peak_rating),
      legacy1v1Wins: Number(row.legacy_solo_wins),
      legacy1v1Losses: Number(row.legacy_solo_losses),
      legacyTeamWins: Number(row.legacy_team_wins),
      legacyTeamLosses: Number(row.legacy_team_losses),
      rank: Number(row.ladder_rank),
      division: divisionForRating(Number(row.ladder_rating)),
      wins,
      losses,
      winRate: games ? Number(((wins / games) * 100).toFixed(1)) : 0,
      streak: Number(row.ladder_streak),
      preferredMaps: [],
      favoriteCivilizations: [],
      recentForm: []
    };
  });
  return {
    players,
    page: safePage,
    pageSize: safePageSize,
    total: Number(countRows[0]?.total ?? 0),
    division: range ? normalizedDivision : "all",
    mode: safeMode
  };
}

export async function getPlayerByDisplayName(displayName) {
  const normalizedName = String(displayName ?? "").trim();
  if (!normalizedName) return null;
  const [rows] = await database.query(
    `SELECT id, display_name
     FROM players
     WHERE LOWER(display_name) = LOWER(?)
     LIMIT 1`,
    [normalizedName]
  );
  return rows[0]
    ? { id: rows[0].id, displayName: rows[0].display_name }
    : null;
}

function socialPair(leftId, rightId) {
  return leftId < rightId ? [leftId, rightId] : [rightId, leftId];
}

export async function getSocialSnapshot(playerId) {
  const [connectionRows] = await database.execute(
    `SELECT c.id AS connection_id, c.status, c.requested_by_id,
            p.id, p.display_name, p.avatar_url, p.rating,
            (SELECT COUNT(*)
             FROM social_connections mutual
             WHERE mutual.status = 'accepted'
               AND (mutual.player_one_id = p.id OR mutual.player_two_id = p.id)
               AND (
                 CASE WHEN mutual.player_one_id = p.id THEN mutual.player_two_id ELSE mutual.player_one_id END
               ) IN (
                 SELECT CASE WHEN mine.player_one_id = ? THEN mine.player_two_id ELSE mine.player_one_id END
                 FROM social_connections mine
                 WHERE mine.status = 'accepted' AND (mine.player_one_id = ? OR mine.player_two_id = ?)
               )) AS mutual_friends
     FROM social_connections c
     JOIN players p ON p.id = CASE WHEN c.player_one_id = ? THEN c.player_two_id ELSE c.player_one_id END
     WHERE c.player_one_id = ? OR c.player_two_id = ?
     ORDER BY p.display_name`,
    [playerId, playerId, playerId, playerId, playerId, playerId]
  );
  const friends = [];
  const requests = [];
  const outgoing = [];
  for (const row of connectionRows) {
    const player = {
      id: row.id,
      name: row.display_name,
      avatarUrl: row.avatar_url ?? undefined,
      rating: Number(row.rating),
      mutualFriends: Number(row.mutual_friends)
    };
    if (row.status === "accepted") friends.push(player);
    else if (row.requested_by_id === playerId) outgoing.push(player);
    else requests.push({ ...player, connectionId: String(row.connection_id) });
  }
  return { friends, requests, outgoing };
}

export async function createFriendRequest(requesterId, targetId) {
  const [playerOneId, playerTwoId] = socialPair(requesterId, targetId);
  try {
    await database.execute(
      `INSERT INTO social_connections
       (player_one_id, player_two_id, requested_by_id, status)
       VALUES (?, ?, ?, 'pending')`,
      [playerOneId, playerTwoId, requesterId]
    );
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") throw new Error("A friendship or pending request already exists.");
    throw error;
  }
}

export async function acceptFriendRequest(connectionId, playerId) {
  const [result] = await database.execute(
    `UPDATE social_connections
     SET status = 'accepted'
     WHERE id = ? AND status = 'pending' AND requested_by_id <> ?
       AND (player_one_id = ? OR player_two_id = ?)`,
    [connectionId, playerId, playerId, playerId]
  );
  return result.affectedRows === 1;
}

export async function deleteSocialConnection(connectionId, playerId) {
  const [rows] = await database.execute(
    `SELECT CASE WHEN player_one_id = ? THEN player_two_id ELSE player_one_id END AS other_player_id
     FROM social_connections
     WHERE id = ? AND (player_one_id = ? OR player_two_id = ?)`,
    [playerId, connectionId, playerId, playerId]
  );
  if (!rows.length) return null;
  const [result] = await database.execute(
    "DELETE FROM social_connections WHERE id = ? AND (player_one_id = ? OR player_two_id = ?)",
    [connectionId, playerId, playerId]
  );
  return result.affectedRows === 1 ? rows[0].other_player_id : null;
}

export async function areFriends(leftId, rightId) {
  const [playerOneId, playerTwoId] = socialPair(leftId, rightId);
  const [rows] = await database.execute(
    `SELECT id FROM social_connections
     WHERE player_one_id = ? AND player_two_id = ? AND status = 'accepted'`,
    [playerOneId, playerTwoId]
  );
  return rows.length > 0;
}

export async function removeFriend(leftId, rightId) {
  const [playerOneId, playerTwoId] = socialPair(leftId, rightId);
  const [result] = await database.execute(
    `DELETE FROM social_connections
     WHERE player_one_id = ? AND player_two_id = ? AND status = 'accepted'`,
    [playerOneId, playerTwoId]
  );
  return result.affectedRows === 1;
}

function divisionForRating(rating) {
  if (rating >= 2200) return "Grandmaster";
  if (rating >= 1800) return "Master";
  if (rating >= 1400) return "Diamond";
  if (rating >= 1200) return "Platinum";
  if (rating >= 1000) return "Gold";
  if (rating >= 800) return "Silver";
  if (rating >= 501) return "Bronze";
  return "Copper";
}
