import mysql from "mysql2/promise";
import { civilizationNameFromId } from "./civilization-roll.mjs";
import { ratingFieldsForQueue } from "./rating-pool.mjs";
import { chooseRandomBracketSlot } from "./tournament-bracket.mjs";
import { hashTournamentPassword, tournamentPasswordMatches } from "./tournament-password.mjs";

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
    database.query("SELECT version FROM schema_migrations ORDER BY applied_at DESC, version DESC LIMIT 1")
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

export class TournamentOperationError extends Error {
  constructor(message, status = 409) {
    super(message);
    this.name = "TournamentOperationError";
    this.status = status;
  }
}

export async function getTournaments() {
  const [tournamentRows] = await database.query(
    `SELECT t.id, t.creator_player_id, creator.display_name AS creator_display_name,
            t.name, t.format, t.civilization_mode, t.participant_capacity,
            t.minimum_elo, t.maximum_elo, t.map_id, t.map_name, (t.password_hash IS NOT NULL) AS password_protected,
            t.status, t.starts_at, t.started_at,
            t.completed_at, t.created_at
     FROM tournaments t
     JOIN players creator ON creator.id = t.creator_player_id
     WHERE (t.status = 'registration' AND t.starts_at >= UTC_TIMESTAMP(3))
        OR t.status = 'started'
        OR t.status = 'completed'
     ORDER BY FIELD(t.status, 'started', 'registration', 'completed'),
              CASE WHEN t.status = 'completed' THEN COALESCE(t.completed_at, t.starts_at) END DESC,
              CASE WHEN t.status <> 'completed' THEN t.starts_at END ASC,
              CASE WHEN t.status = 'completed' THEN t.created_at END DESC,
              CASE WHEN t.status <> 'completed' THEN t.created_at END ASC`
  );
  return tournamentsWithEntries(tournamentRows);
}

export async function getTournamentById(tournamentId) {
  const [rows] = await database.execute(
    `SELECT t.id, t.creator_player_id, creator.display_name AS creator_display_name,
            t.name, t.format, t.civilization_mode, t.participant_capacity,
            t.minimum_elo, t.maximum_elo, t.map_id, t.map_name, (t.password_hash IS NOT NULL) AS password_protected,
            t.status, t.starts_at, t.started_at,
            t.completed_at, t.created_at
     FROM tournaments t
     JOIN players creator ON creator.id = t.creator_player_id
     WHERE t.id = ?`,
    [tournamentId]
  );
  if (!rows.length) return null;
  return (await tournamentsWithEntries(rows))[0];
}

async function tournamentsWithEntries(tournamentRows) {
  if (!tournamentRows.length) return [];
  const ids = tournamentRows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [entryRows] = await database.query(
    `SELECT e.tournament_id, e.player_id, e.bracket_slot, e.rating_at_join, e.status, e.joined_at,
            p.display_name, p.avatar_url, p.rating
     FROM tournament_entries e
     JOIN players p ON p.id = e.player_id
     WHERE e.tournament_id IN (${placeholders})
     ORDER BY e.tournament_id, e.bracket_slot`,
    ids
  );
  const entriesByTournament = new Map();
  for (const row of entryRows) {
    const entries = entriesByTournament.get(row.tournament_id) ?? [];
    entries.push({
      playerId: row.player_id,
      displayName: row.display_name,
      ...(row.avatar_url ? { avatarUrl: row.avatar_url } : {}),
      rating: Number(row.rating),
      ratingAtJoin: Number(row.rating_at_join),
      status: row.status,
      bracketSlot: Number(row.bracket_slot),
      joinedAt: dateToIso(row.joined_at)
    });
    entriesByTournament.set(row.tournament_id, entries);
  }
  const [matchRows] = await database.query(
    `SELECT id, tournament_id, round_number, match_position, player_one_id, player_two_id,
            player_one_ready_at, player_two_ready_at, ready_deadline, game_match_id,
            spectator_uri, game_started_at, winner_player_id, status, completed_at
     FROM tournament_matches
     WHERE tournament_id IN (${placeholders})
     ORDER BY tournament_id, round_number, match_position`,
    ids
  );
  const matchesByTournament = new Map();
  for (const row of matchRows) {
    const matches = matchesByTournament.get(row.tournament_id) ?? [];
    matches.push({
      id: row.id,
      roundNumber: Number(row.round_number),
      matchPosition: Number(row.match_position),
      ...(row.player_one_id ? { playerOneId: row.player_one_id } : {}),
      ...(row.player_two_id ? { playerTwoId: row.player_two_id } : {}),
      playerOneReady: Boolean(row.player_one_ready_at),
      playerTwoReady: Boolean(row.player_two_ready_at),
      ...(row.ready_deadline ? { readyDeadline: dateToIso(row.ready_deadline) } : {}),
      ...(row.game_match_id ? { gameMatchId: row.game_match_id } : {}),
      ...(row.status === "in_progress" && row.game_started_at && row.spectator_uri
        ? { spectatorUri: row.spectator_uri, gameStartedAt: dateToIso(row.game_started_at) }
        : {}),
      ...(row.winner_player_id ? { winnerPlayerId: row.winner_player_id } : {}),
      status: row.status,
      ...(row.completed_at ? { completedAt: dateToIso(row.completed_at) } : {})
    });
    matchesByTournament.set(row.tournament_id, matches);
  }
  return tournamentRows.map((row) => ({
    id: row.id,
    creatorPlayerId: row.creator_player_id,
    creatorDisplayName: row.creator_display_name,
    name: row.name,
    format: row.format,
    civilizationMode: row.civilization_mode,
    participantCapacity: Number(row.participant_capacity),
    minimumElo: Number(row.minimum_elo),
    ...(row.maximum_elo == null ? {} : { maximumElo: Number(row.maximum_elo) }),
    mapId: row.map_id,
    mapName: row.map_name,
    passwordProtected: Boolean(row.password_protected),
    status: row.status,
    startsAt: dateToIso(row.starts_at),
    ...(row.started_at ? { startedAt: dateToIso(row.started_at) } : {}),
    ...(row.completed_at ? { completedAt: dateToIso(row.completed_at) } : {}),
    createdAt: dateToIso(row.created_at),
    entries: entriesByTournament.get(row.id) ?? [],
    matches: matchesByTournament.get(row.id) ?? []
  }));
}

export async function createTournament(input) {
  const passwordCredentials = input.password
    ? await hashTournamentPassword(input.password)
    : null;
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("SELECT id FROM players WHERE id = ? FOR UPDATE", [input.creatorPlayerId]);
    const [existingRows] = await connection.execute(
      `SELECT id, name
       FROM tournaments
       WHERE creator_player_id = ?
         AND (status = 'started' OR (status = 'registration' AND starts_at > UTC_TIMESTAMP(3)))
       LIMIT 1`,
      [input.creatorPlayerId]
    );
    if (existingRows.length) {
      throw new TournamentOperationError(
        `You already have a tournament running: "${existingRows[0].name}". Cancel it before creating another.`
      );
    }
    await connection.execute(
      `INSERT INTO tournaments
        (id, creator_player_id, name, format, civilization_mode, participant_capacity,
         minimum_elo, maximum_elo, map_id, map_name, password_hash, password_salt, status, starts_at)
       VALUES (?, ?, ?, 'single_elimination', ?, ?, ?, ?, ?, ?, ?, ?, 'registration', ?)`,
      [
        input.id,
        input.creatorPlayerId,
        input.name,
        input.civilizationMode,
        input.participantCapacity,
        input.minimumElo,
        input.maximumElo,
        input.mapId,
        input.mapName,
        passwordCredentials?.hash ?? null,
        passwordCredentials?.salt ?? null,
        input.startsAt
      ]
    );
    await connection.commit();
    return getTournamentById(input.id);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function cancelTournament(tournamentId, playerId) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [ownerRows] = await connection.execute(
      "SELECT creator_player_id FROM tournaments WHERE id = ?",
      [tournamentId]
    );
    if (!ownerRows.length) throw new TournamentOperationError("Tournament not found.", 404);
    if (ownerRows[0].creator_player_id !== playerId) {
      throw new TournamentOperationError("Only the tournament creator can cancel it.", 403);
    }

    await connection.execute("SELECT id FROM players WHERE id = ? FOR UPDATE", [playerId]);
    const [tournamentRows] = await connection.execute(
      `SELECT id, name, status, (starts_at <= UTC_TIMESTAMP(3)) AS already_started,
              (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = tournaments.id) AS entry_count
       FROM tournaments
       WHERE id = ?
       FOR UPDATE`,
      [tournamentId]
    );
    const tournament = tournamentRows[0];
    if (!tournament) throw new TournamentOperationError("Tournament not found.", 404);
    if (tournament.status !== "registration" || tournament.already_started) {
      throw new TournamentOperationError("This tournament can no longer be canceled.");
    }

    await connection.execute("DELETE FROM tournaments WHERE id = ?", [tournamentId]);
    await connection.commit();
    return {
      id: tournament.id,
      name: tournament.name,
      unregisteredPlayers: Number(tournament.entry_count)
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function joinTournament(tournamentId, playerId, password = "") {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [tournamentRows] = await connection.execute(
      `SELECT participant_capacity, minimum_elo, maximum_elo, password_hash, password_salt, status,
              (starts_at <= UTC_TIMESTAMP(3)) AS already_started
       FROM tournaments WHERE id = ? FOR UPDATE`,
      [tournamentId]
    );
    const tournament = tournamentRows[0];
    if (!tournament) throw new TournamentOperationError("Tournament not found.", 404);

    const [existingRows] = await connection.execute(
      "SELECT bracket_slot FROM tournament_entries WHERE tournament_id = ? AND player_id = ?",
      [tournamentId, playerId]
    );
    if (existingRows.length) {
      await connection.commit();
      return getTournamentById(tournamentId);
    }
    if (tournament.status !== "registration" || tournament.already_started) {
      throw new TournamentOperationError("Registration for this tournament is closed.");
    }
    if (tournament.password_hash && !(await tournamentPasswordMatches(
      password,
      tournament.password_salt,
      tournament.password_hash
    ))) {
      throw new TournamentOperationError("Incorrect tournament password.", 403);
    }

    const [playerRows] = await connection.execute("SELECT rating FROM players WHERE id = ?", [playerId]);
    const playerRating = Number(playerRows[0]?.rating ?? 0);
    if (playerRating < Number(tournament.minimum_elo)) {
      throw new TournamentOperationError(`This tournament requires at least ${Number(tournament.minimum_elo)} Elo.`, 403);
    }
    if (tournament.maximum_elo !== null && playerRating > Number(tournament.maximum_elo)) {
      throw new TournamentOperationError(`This tournament allows at most ${Number(tournament.maximum_elo)} Elo.`, 403);
    }

    const [entryRows] = await connection.execute(
      "SELECT bracket_slot FROM tournament_entries WHERE tournament_id = ? FOR UPDATE",
      [tournamentId]
    );
    const bracketSlot = chooseRandomBracketSlot(
      Number(tournament.participant_capacity),
      entryRows.map((row) => Number(row.bracket_slot))
    );
    if (bracketSlot === null) throw new TournamentOperationError("This tournament is full.");
    await connection.execute(
      `INSERT INTO tournament_entries (tournament_id, player_id, bracket_slot, rating_at_join)
       VALUES (?, ?, ?, ?)`,
      [tournamentId, playerId, bracketSlot, playerRating]
    );
    await connection.commit();
    return getTournamentById(tournamentId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function leaveTournament(tournamentId, playerId) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [tournamentRows] = await connection.execute(
      "SELECT status, (starts_at <= UTC_TIMESTAMP(3)) AS already_started FROM tournaments WHERE id = ? FOR UPDATE",
      [tournamentId]
    );
    const tournament = tournamentRows[0];
    if (!tournament) throw new TournamentOperationError("Tournament not found.", 404);
    if (tournament.status !== "registration" || tournament.already_started) {
      throw new TournamentOperationError("You can no longer leave this tournament.");
    }
    await connection.execute(
      "DELETE FROM tournament_entries WHERE tournament_id = ? AND player_id = ?",
      [tournamentId, playerId]
    );
    await connection.commit();
    return getTournamentById(tournamentId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function processTournamentLifecycle() {
  const connection = await database.getConnection();
  const changedTournamentIds = new Set();
  const cancelledTournamentIds = [];
  const expiredMatches = [];
  try {
    await connection.beginTransaction();
    const [dueTournaments] = await connection.query(
      `SELECT id, participant_capacity
       FROM tournaments
       WHERE status = 'registration' AND starts_at <= UTC_TIMESTAMP(3)
       FOR UPDATE`
    );
    for (const tournament of dueTournaments) {
      const [entries] = await connection.execute(
        "SELECT player_id FROM tournament_entries WHERE tournament_id = ? FOR UPDATE",
        [tournament.id]
      );
      if (entries.length < 2) {
        await connection.execute("DELETE FROM tournaments WHERE id = ?", [tournament.id]);
        changedTournamentIds.add(tournament.id);
        cancelledTournamentIds.push(tournament.id);
        continue;
      }
      await startTournamentWithinTransaction(connection, tournament);
      changedTournamentIds.add(tournament.id);
    }

    const [expiredRows] = await connection.query(
      `SELECT * FROM tournament_matches
       WHERE status = 'waiting' AND ready_deadline <= UTC_TIMESTAMP(3)
         AND (player_one_ready_at IS NULL OR player_two_ready_at IS NULL)
       FOR UPDATE`
    );
    for (const tournamentMatch of expiredRows) {
      const playerOneReady = Boolean(tournamentMatch.player_one_ready_at);
      const playerTwoReady = Boolean(tournamentMatch.player_two_ready_at);
      const winnerPlayerId = playerOneReady === playerTwoReady
        ? null
        : playerOneReady ? tournamentMatch.player_one_id : tournamentMatch.player_two_id;
      await completeTournamentMatchWithinTransaction(
        connection,
        tournamentMatch,
        winnerPlayerId,
        "forfeit",
        true
      );
      changedTournamentIds.add(tournamentMatch.tournament_id);
      expiredMatches.push({
        tournamentMatchId: tournamentMatch.id,
        playerIds: [tournamentMatch.player_one_id, tournamentMatch.player_two_id].filter(Boolean)
      });
    }
    await connection.commit();
    return { changedTournamentIds: [...changedTournamentIds], cancelledTournamentIds, expiredMatches };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function recoverInterruptedTournamentMatches() {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query(
      "SELECT id, tournament_id, game_match_id FROM tournament_matches WHERE status = 'in_progress' FOR UPDATE"
    );
    for (const tournamentMatch of rows) {
      if (tournamentMatch.game_match_id) {
        await connection.execute(
          "UPDATE matches SET status = 'completed', completed_at = UTC_TIMESTAMP(3) WHERE id = ? AND status <> 'completed'",
          [tournamentMatch.game_match_id]
        );
        await connection.execute(
          `INSERT INTO match_results (match_id, winner_player_id, result, verification_status, verified_at)
           SELECT id, NULL, 'no_contest', 'no_contest', UTC_TIMESTAMP(3) FROM matches WHERE id = ?
           ON DUPLICATE KEY UPDATE winner_player_id = NULL, result = 'no_contest',
             verification_status = 'no_contest', verified_at = UTC_TIMESTAMP(3)`,
          [tournamentMatch.game_match_id]
        );
      }
      await connection.execute(
        `UPDATE tournament_matches
         SET status = 'waiting', player_one_ready_at = NULL, player_two_ready_at = NULL,
             ready_deadline = DATE_ADD(UTC_TIMESTAMP(3), INTERVAL 5 MINUTE), game_match_id = NULL,
             spectator_uri = NULL, game_started_at = NULL
         WHERE id = ?`,
        [tournamentMatch.id]
      );
    }
    await connection.commit();
    return [...new Set(rows.map((row) => row.tournament_id))];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function startTournamentWithinTransaction(connection, tournament) {
  const capacity = Number(tournament.participant_capacity);
  const roundCount = Math.log2(capacity);
  await connection.execute(
    "UPDATE tournaments SET status = 'started', started_at = UTC_TIMESTAMP(3) WHERE id = ?",
    [tournament.id]
  );
  for (let roundNumber = 1; roundNumber <= roundCount; roundNumber += 1) {
    const matchCount = capacity / (2 ** roundNumber);
    for (let matchPosition = 1; matchPosition <= matchCount; matchPosition += 1) {
      await connection.execute(
        `INSERT IGNORE INTO tournament_matches
          (id, tournament_id, round_number, match_position)
         VALUES (?, ?, ?, ?)`,
        [`${tournament.id}:r${roundNumber}:m${matchPosition}`, tournament.id, roundNumber, matchPosition]
      );
    }
  }

  const [entries] = await connection.execute(
    "SELECT player_id, bracket_slot FROM tournament_entries WHERE tournament_id = ? ORDER BY bracket_slot",
    [tournament.id]
  );
  const entrantsBySlot = new Map(entries.map((entry) => [Number(entry.bracket_slot), entry.player_id]));
  for (let matchPosition = 1; matchPosition <= capacity / 2; matchPosition += 1) {
    const playerOneId = entrantsBySlot.get(matchPosition * 2 - 1) ?? null;
    const playerTwoId = entrantsBySlot.get(matchPosition * 2) ?? null;
    await connection.execute(
      `UPDATE tournament_matches
       SET player_one_id = ?, player_two_id = ?,
           player_one_source_resolved = TRUE, player_two_source_resolved = TRUE
       WHERE tournament_id = ? AND round_number = 1 AND match_position = ?`,
      [playerOneId, playerTwoId, tournament.id, matchPosition]
    );
    const [rows] = await connection.execute(
      "SELECT * FROM tournament_matches WHERE tournament_id = ? AND round_number = 1 AND match_position = ? FOR UPDATE",
      [tournament.id, matchPosition]
    );
    await activateResolvedTournamentMatch(connection, rows[0]);
  }
}

async function activateResolvedTournamentMatch(connection, tournamentMatch) {
  if (tournamentMatch.player_one_id && tournamentMatch.player_two_id) {
    await connection.execute(
      `UPDATE tournament_matches
       SET status = 'waiting', ready_deadline = DATE_ADD(UTC_TIMESTAMP(3), INTERVAL 5 MINUTE)
       WHERE id = ?`,
      [tournamentMatch.id]
    );
    return;
  }
  const winnerPlayerId = tournamentMatch.player_one_id ?? tournamentMatch.player_two_id ?? null;
  await completeTournamentMatchWithinTransaction(connection, tournamentMatch, winnerPlayerId, "bye", false);
}

async function completeTournamentMatchWithinTransaction(
  connection,
  tournamentMatch,
  winnerPlayerId,
  status = "completed",
  noShow = false
) {
  await connection.execute(
    `UPDATE tournament_matches
     SET status = ?, winner_player_id = ?, completed_at = UTC_TIMESTAMP(3)
     WHERE id = ?`,
    [status, winnerPlayerId, tournamentMatch.id]
  );
  const participants = [tournamentMatch.player_one_id, tournamentMatch.player_two_id].filter(Boolean);
  for (const playerId of participants) {
    if (playerId === winnerPlayerId) continue;
    await connection.execute(
      "UPDATE tournament_entries SET status = ? WHERE tournament_id = ? AND player_id = ?",
      [noShow ? "no_show" : "eliminated", tournamentMatch.tournament_id, playerId]
    );
  }

  const [[tournament]] = await connection.execute(
    "SELECT participant_capacity FROM tournaments WHERE id = ? FOR UPDATE",
    [tournamentMatch.tournament_id]
  );
  const finalRound = Math.log2(Number(tournament.participant_capacity));
  if (Number(tournamentMatch.round_number) === finalRound) {
    await connection.execute(
      "UPDATE tournaments SET status = 'completed', completed_at = UTC_TIMESTAMP(3) WHERE id = ?",
      [tournamentMatch.tournament_id]
    );
    if (winnerPlayerId) {
      await connection.execute(
        "UPDATE tournament_entries SET status = 'winner' WHERE tournament_id = ? AND player_id = ?",
        [tournamentMatch.tournament_id, winnerPlayerId]
      );
    }
    return;
  }

  const nextRound = Number(tournamentMatch.round_number) + 1;
  const nextPosition = Math.ceil(Number(tournamentMatch.match_position) / 2);
  const oddPosition = Number(tournamentMatch.match_position) % 2 === 1;
  await connection.execute(
    `UPDATE tournament_matches
     SET ${oddPosition ? "player_one_id" : "player_two_id"} = ?,
         ${oddPosition ? "player_one_source_resolved" : "player_two_source_resolved"} = TRUE
     WHERE tournament_id = ? AND round_number = ? AND match_position = ?`,
    [winnerPlayerId, tournamentMatch.tournament_id, nextRound, nextPosition]
  );
  await activateTournamentRoundIfReady(connection, tournamentMatch.tournament_id, nextRound, finalRound);
}

async function activateTournamentRoundIfReady(connection, tournamentId, roundNumber, finalRound) {
  const [unfinishedPrevious] = await connection.execute(
    `SELECT id FROM tournament_matches
     WHERE tournament_id = ? AND round_number = ?
       AND status IN ('pending', 'waiting', 'in_progress')
     LIMIT 1`,
    [tournamentId, roundNumber - 1]
  );
  if (unfinishedPrevious.length) return;
  const [rows] = await connection.execute(
    `SELECT * FROM tournament_matches
     WHERE tournament_id = ? AND round_number = ? AND status = 'pending'
       AND player_one_source_resolved = TRUE AND player_two_source_resolved = TRUE
     ORDER BY match_position
     FOR UPDATE`,
    [tournamentId, roundNumber]
  );
  for (const tournamentMatch of rows) await activateResolvedTournamentMatch(connection, tournamentMatch);
  if (roundNumber >= finalRound) return;
  const [unfinishedCurrent] = await connection.execute(
    `SELECT id FROM tournament_matches
     WHERE tournament_id = ? AND round_number = ?
       AND status IN ('pending', 'waiting', 'in_progress')
     LIMIT 1`,
    [tournamentId, roundNumber]
  );
  if (!unfinishedCurrent.length) {
    await activateTournamentRoundIfReady(connection, tournamentId, roundNumber + 1, finalRound);
  }
}

export async function readyTournamentMatch(tournamentId, playerId) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      `SELECT tm.*, (tm.ready_deadline <= UTC_TIMESTAMP(3)) AS ready_deadline_passed,
              t.name AS tournament_name, t.map_id, t.map_name, t.civilization_mode
       FROM tournament_matches tm
       JOIN tournaments t ON t.id = tm.tournament_id
       WHERE tm.tournament_id = ? AND t.status = 'started' AND tm.status = 'waiting'
         AND (tm.player_one_id = ? OR tm.player_two_id = ?)
       ORDER BY tm.round_number, tm.match_position
       LIMIT 1
       FOR UPDATE`,
      [tournamentId, playerId, playerId]
    );
    const tournamentMatch = rows[0];
    if (!tournamentMatch) throw new TournamentOperationError("You do not have a tournament match ready.", 404);
    const isPlayerOne = tournamentMatch.player_one_id === playerId;
    const alreadyReady = Boolean(isPlayerOne ? tournamentMatch.player_one_ready_at : tournamentMatch.player_two_ready_at);
    if (!alreadyReady && tournamentMatch.ready_deadline_passed) {
      throw new TournamentOperationError("The ready deadline for this match has passed.", 410);
    }
    await connection.execute(
      `UPDATE tournament_matches SET ${isPlayerOne ? "player_one_ready_at" : "player_two_ready_at"} = COALESCE(${isPlayerOne ? "player_one_ready_at" : "player_two_ready_at"}, UTC_TIMESTAMP(3)) WHERE id = ?`,
      [tournamentMatch.id]
    );
    await connection.commit();
    return {
      tournamentId,
      tournamentName: tournamentMatch.tournament_name,
      tournamentMatchId: tournamentMatch.id,
      playerOneId: tournamentMatch.player_one_id,
      playerTwoId: tournamentMatch.player_two_id,
      mapId: tournamentMatch.map_id,
      mapName: tournamentMatch.map_name,
      civilizationMode: tournamentMatch.civilization_mode
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function markTournamentMatchLaunched(tournamentMatchId, gameMatchId) {
  const [result] = await database.execute(
    `UPDATE tournament_matches
     SET status = 'in_progress', game_match_id = ?, spectator_uri = NULL, game_started_at = NULL
     WHERE id = ? AND status = 'waiting' AND player_one_ready_at IS NOT NULL AND player_two_ready_at IS NOT NULL`,
    [gameMatchId, tournamentMatchId]
  );
  if (result.affectedRows !== 1) throw new TournamentOperationError("Tournament match is no longer available.");
}

export async function markTournamentMatchStarted(tournamentMatchId, spectatorUri) {
  const [result] = await database.execute(
    `UPDATE tournament_matches
     SET spectator_uri = ?, game_started_at = UTC_TIMESTAMP(3)
     WHERE id = ? AND status = 'in_progress' AND game_match_id IS NOT NULL`,
    [spectatorUri, tournamentMatchId]
  );
  if (result.affectedRows !== 1) throw new TournamentOperationError("Tournament match is no longer available.");
}

export async function unreadyTournamentMatch(tournamentMatchId, playerId) {
  const [rows] = await database.execute(
    "SELECT tournament_id, player_one_id, player_two_id FROM tournament_matches WHERE id = ? AND status = 'waiting'",
    [tournamentMatchId]
  );
  const tournamentMatch = rows[0];
  if (!tournamentMatch) return null;
  const column = tournamentMatch.player_one_id === playerId
    ? "player_one_ready_at"
    : tournamentMatch.player_two_id === playerId ? "player_two_ready_at" : null;
  if (!column) return null;
  await database.execute(`UPDATE tournament_matches SET ${column} = NULL WHERE id = ? AND status = 'waiting'`, [tournamentMatchId]);
  return tournamentMatch.tournament_id;
}

export async function resetTournamentMatch(tournamentMatchId) {
  const [rows] = await database.execute(
    "SELECT tournament_id FROM tournament_matches WHERE id = ? AND status = 'in_progress'",
    [tournamentMatchId]
  );
  if (!rows.length) return null;
  await database.execute(
    `UPDATE tournament_matches
     SET status = 'waiting', player_one_ready_at = NULL, player_two_ready_at = NULL,
         ready_deadline = DATE_ADD(UTC_TIMESTAMP(3), INTERVAL 5 MINUTE), game_match_id = NULL,
         spectator_uri = NULL, game_started_at = NULL
     WHERE id = ? AND status = 'in_progress'`,
    [tournamentMatchId]
  );
  return rows[0].tournament_id;
}

function dateToIso(value) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

async function resolveTournamentGameResultWithinTransaction(connection, tournamentMatchId, winnerPlayerId, status) {
  if (!tournamentMatchId) return;
  const [rows] = await connection.execute(
    "SELECT * FROM tournament_matches WHERE id = ? FOR UPDATE",
    [tournamentMatchId]
  );
  const tournamentMatch = rows[0];
  if (!tournamentMatch || !["waiting", "in_progress"].includes(tournamentMatch.status)) return;
  await completeTournamentMatchWithinTransaction(
    connection,
    tournamentMatch,
    winnerPlayerId,
    status,
    false
  );
}

async function resetTournamentGameWithinTransaction(connection, tournamentMatchId) {
  if (!tournamentMatchId) return;
  await connection.execute(
    `UPDATE tournament_matches
     SET status = 'waiting', player_one_ready_at = NULL, player_two_ready_at = NULL,
         ready_deadline = DATE_ADD(UTC_TIMESTAMP(3), INTERVAL 5 MINUTE), game_match_id = NULL,
         spectator_uri = NULL, game_started_at = NULL
     WHERE id = ? AND status IN ('waiting', 'in_progress')`,
    [tournamentMatchId]
  );
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
    if (match.tournamentMatchId) {
      await resolveTournamentGameResultWithinTransaction(
        connection,
        match.tournamentMatchId,
        null,
        "no_contest"
      );
    }
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
      if (match.ratingEligible === false) {
        ratings[player.id] = { oldRating: before, newRating: before, ratingChange: 0 };
        continue;
      }
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
    await resolveTournamentGameResultWithinTransaction(
      connection,
      match.tournamentMatchId,
      winners[0].id,
      "completed"
    );
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
    await resetTournamentGameWithinTransaction(connection, match.tournamentMatchId);
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
