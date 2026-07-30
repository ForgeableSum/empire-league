import type { ReplayMatchMetadata, ReplayPlayerMetadata } from "../../shared/contracts/matches";

export class ReplayNotFinishedError extends Error {
  constructor(teamGame = false) {
    super(teamGame
      ? "The team replay does not contain final PostGame results yet."
      : "The replay does not contain a PostGame or Resign operation yet.");
    this.name = "ReplayNotFinishedError";
  }
}

export async function replayHasEnded(filePath: string): Promise<boolean> {
  if (!window.electronApi) return false;
  const { parse_rec } = await import("aoe2rec-js");
  const bytes = await window.electronApi.readReplayFile(filePath);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  let replay: { operations?: Array<Record<string, unknown>> };
  try {
    replay = parse_rec(buffer) as { operations?: Array<Record<string, unknown>> };
  } catch {
    return false;
  }
  return replay.operations?.some((operation) => {
    if ("PostGame" in operation) return true;
    const action = operation.Action;
    if (typeof action !== "object" || action === null) return false;
    const actionData = (action as Record<string, unknown>).action_data;
    return typeof actionData === "object"
      && actionData !== null
      && "Resign" in actionData;
  }) ?? false;
}

export async function parseReplayMetadata(
  filePath: string,
  teamGame = false
): Promise<ReplayMatchMetadata> {
  if (!window.electronApi) throw new Error("Replay files are only available in the desktop app.");
  const { parse_rec, parse_rec_summary } = await import("aoe2rec-js");
  const bytes = await window.electronApi.readReplayFile(filePath);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  let replay: { operations?: Array<Record<string, unknown>> };
  try {
    replay = parse_rec(buffer) as { operations?: Array<Record<string, unknown>> };
  } catch {
    throw new ReplayNotFinishedError();
  }
  const hasPostGame = replay.operations?.some((operation) => "PostGame" in operation) ?? false;
  const resignPlayerNumber = replay.operations
    ?.map((operation) => operation.Action)
    .filter((action): action is Record<string, unknown> => typeof action === "object" && action !== null)
    .map((action) => action.action_data)
    .filter((actionData): actionData is Record<string, unknown> =>
      typeof actionData === "object" && actionData !== null
    )
    .map((actionData) => actionData.Resign)
    .filter((resign): resign is Record<string, unknown> => typeof resign === "object" && resign !== null)
    .map((resign) => resign.player_id)
    .find((playerId): playerId is number => typeof playerId === "number");
  if (!teamGame && !hasPostGame && resignPlayerNumber === undefined) {
    // Preserve the original 1v1 behavior: do not attempt to summarize an
    // actively written replay until it has a terminal operation.
    throw new ReplayNotFinishedError();
  }
  const summary = parse_rec_summary(buffer);
  const gameSettings = summary.header.game_settings;
  const replaySettings = summary.header.replay;
  const players: ReplayPlayerMetadata[] = summary.teams.flatMap((team) =>
    team.players
      .filter((player) => player.profile_id > 0)
      .map((player) => ({
        profileId: player.profile_id,
        playerNumber: player.player_number,
        civilizationId: player.civ_id,
        resigned: player.resigned
      }))
  );
  const isTeamGame = teamGame || players.length > 2;
  if (isTeamGame && !hasPostGame) {
    throw new ReplayNotFinishedError(true);
  }
  const winningPlayers = summary.teams.filter((team) => team.winner).flatMap((team) => team.players);
  const losingPlayers = summary.teams.filter((team) => !team.winner).flatMap((team) => team.players);
  const allPlayers = summary.teams.flatMap((team) => team.players).filter((player) => player.profile_id > 0);
  const resignedPlayer = resignPlayerNumber === undefined
    ? undefined
    : allPlayers.find((player) => player.player_number === resignPlayerNumber);
  const winner = !isTeamGame && resignedPlayer
    ? allPlayers.find((player) => player.player_number !== resignPlayerNumber)
    : winningPlayers.find((player) => player.profile_id > 0);
  const loser = (!isTeamGame && resignedPlayer) || losingPlayers.find((player) => player.profile_id > 0);
  const reporter = players.find((player) => player.playerNumber === summary.header.replay.rec_player);
  if (![2, 4, 8].includes(players.length) || !winner || !loser || !reporter) {
    throw new Error("The replay does not contain identifiable winning and losing teams.");
  }
  return {
    fileSizeBytes: bytes.byteLength,
    build: summary.header.build,
    recordedAt: summary.header.timestamp,
    durationMs: summary.duration,
    players: players.sort((left, right) => left.profileId - right.profileId),
    settings: {
      cheats: gameSettings.cheats,
      replayCheatsEnabled: replaySettings.cheats_enabled,
      instantBuild: replaySettings.instant_build,
      playerCount: gameSettings.n_players,
      populationLimit: gameSettings.population_limit,
      recordGame: gameSettings.record_game,
      gameType: gameSettings.game_type,
      replayGameMode: replaySettings.game_mode,
      gameSpeedId: replaySettings.game_speed_id,
      gameSpeed: replaySettings.game_speed,
      startingAgeId: gameSettings.starting_age_id,
      startingResourcesId: gameSettings.starting_resources_id,
      endingAgeId: gameSettings.ending_age_id,
      victoryTypeId: gameSettings.victory_type_id,
      victoryAmount: gameSettings.victory_amount,
      revealMap: gameSettings.reveal_map,
      lockTeams: gameSettings.lock_teams,
      allTechs: gameSettings.all_techs,
      handicap: gameSettings.handicap,
      sharedExploration: gameSettings.shared_exploration,
      teamBonusDisabled: gameSettings.team_bonus_disabled,
      treatyLength: gameSettings.treaty_length,
      selectedMapId: gameSettings.selected_map_id,
      resolvedMapId: gameSettings.resolved_map_id,
      rmsStrings: [...gameSettings.rms_strings]
    },
    reporterProfileId: reporter.profileId,
    winnerProfileId: winner.profile_id,
    loserProfileId: loser.profile_id,
    winningProfileIds: winningPlayers.map((player) => player.profile_id).filter((profileId) => profileId > 0).sort(),
    losingProfileIds: losingPlayers.map((player) => player.profile_id).filter((profileId) => profileId > 0).sort(),
    reason: isTeamGame
      ? (losingPlayers.filter((player) => player.profile_id > 0).every((player) => player.resigned)
        ? "resignation"
        : "defeat")
      : resignPlayerNumber !== undefined || loser.resigned ? "resignation" : "defeat"
  };
}
