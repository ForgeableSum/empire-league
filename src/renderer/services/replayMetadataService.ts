import type { ReplayMatchMetadata, ReplayPlayerMetadata } from "../../shared/contracts/matches";
import type { ReplayEndCandidate } from "../../shared/contracts/electronApi";

export class ReplayNotFinishedError extends Error {
  readonly localPlayerEnded: boolean;

  constructor(teamGame = false, message?: string, localPlayerEnded = false) {
    super(message ?? (teamGame
      ? "The team replay does not contain final PostGame results yet."
      : "The replay does not contain a PostGame or Resign operation yet."));
    this.name = "ReplayNotFinishedError";
    this.localPlayerEnded = localPlayerEnded;
  }
}

interface ReplayCompletionPlayer {
  player_number: number;
}

interface ReplayCompletionTeam {
  winner: boolean;
  players: ReplayCompletionPlayer[];
}

export function replaySummaryHasEnded(
  teams: ReplayCompletionTeam[],
  mode: "ffa" | "team",
  expectedPlayerCount?: number
): boolean {
  const isParticipant = (player: ReplayCompletionPlayer): boolean =>
    player.player_number > 0
    && (expectedPlayerCount === undefined || player.player_number <= expectedPlayerCount);
  const players = teams.flatMap((team) => team.players).filter(isParticipant);
  const winners = teams.filter((team) => team.winner).flatMap((team) => team.players).filter(isParticipant);
  const losers = teams.filter((team) => !team.winner).flatMap((team) => team.players).filter(isParticipant);
  const requiredPlayers = expectedPlayerCount ?? players.length;
  return players.length === requiredPlayers
    && winners.length >= 1
    && (mode !== "ffa" || winners.length === 1)
    && winners.length + losers.length === requiredPlayers;
}

export function shouldUseAiReplayCompletionFallback(
  aiPlayerCount: number,
  candidate: ReplayEndCandidate
): boolean {
  // aoe2rec-js cannot parse some AI scripting operations. Waiting for the
  // retry proves that the same replay snapshot remained quiet across two
  // stability windows instead of accepting an ordinary in-progress write.
  return aiPlayerCount > 0
    && candidate.reason === "QuietFallback"
    && candidate.retry;
}

export function replayContainsTerminalHumanResign(
  operations: Array<Record<string, unknown>> | undefined,
  terminalHumanPlayerNumbers: readonly number[]
): boolean {
  if (terminalHumanPlayerNumbers.length === 0) return false;
  const terminalPlayers = new Set(terminalHumanPlayerNumbers);
  return operations?.some((operation) => {
    const action = operation.Action;
    if (typeof action !== "object" || action === null) return false;
    const actionData = (action as Record<string, unknown>).action_data;
    if (typeof actionData !== "object" || actionData === null) return false;
    const resign = (actionData as Record<string, unknown>).Resign;
    if (typeof resign !== "object" || resign === null) return false;
    const playerId = (resign as Record<string, unknown>).player_id;
    return typeof playerId === "number" && terminalPlayers.has(playerId);
  }) ?? false;
}

export function replayContainsLocalPlayerEnd(
  operations: Array<Record<string, unknown>> | undefined,
  localPlayerNumbers: readonly number[]
): boolean {
  // PostGame is written from this client's replay perspective when gameplay
  // has ended for it, including defeat. A Resign action can arrive earlier;
  // only accept it when it belongs to this local replay slot so another
  // participant surrendering cannot pull Electron over an active game.
  return operations?.some((operation) => "PostGame" in operation) === true
    || replayContainsTerminalHumanResign(operations, localPlayerNumbers);
}

export interface ReplayEndInspection {
  matchEnded: boolean;
  localPlayerEnded: boolean;
}

export async function inspectReplayEnd(
  filePath: string,
  mode: "standard" | "ffa" | "team" = "standard",
  expectedPlayerCount?: number,
  terminalHumanPlayerNumbers: readonly number[] = [],
  localPlayerNumbers: readonly number[] = []
): Promise<ReplayEndInspection> {
  if (!window.electronApi) return { matchEnded: false, localPlayerEnded: false };
  const { parse_rec, parse_rec_summary } = await import("aoe2rec-js");
  const bytes = await window.electronApi.readReplayFile(filePath);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  let replay: { operations?: Array<Record<string, unknown>> };
  try {
    replay = parse_rec(buffer) as { operations?: Array<Record<string, unknown>> };
  } catch {
    return { matchEnded: false, localPlayerEnded: false };
  }
  const localPlayerEnded = replayContainsLocalPlayerEnd(replay.operations, localPlayerNumbers);
  if (replayContainsTerminalHumanResign(replay.operations, terminalHumanPlayerNumbers)) {
    return { matchEnded: true, localPlayerEnded };
  }
  if (mode !== "standard") {
    // Multiplayer replays contain a Resign operation whenever any participant
    // is eliminated. Only the final PostGame summary can prove that the last
    // two players (or teams) have finished their contest.
    const hasPostGame = replay.operations?.some((operation) => "PostGame" in operation) ?? false;
    if (!hasPostGame) return { matchEnded: false, localPlayerEnded };
    try {
      const summary = parse_rec_summary(buffer);
      // AI players use non-positive profile IDs in recorded games, so profile
      // identity cannot be used to decide which lobby slots participated.
      return {
        matchEnded: replaySummaryHasEnded(summary.teams, mode, expectedPlayerCount),
        localPlayerEnded
      };
    } catch {
      // PostGame can be written before the final summary has settled. The
      // replay watcher will notify us again after the next write/stable edge.
      return { matchEnded: false, localPlayerEnded };
    }
  }
  const matchEnded = replay.operations?.some((operation) => {
    if ("PostGame" in operation) return true;
    const action = operation.Action;
    if (typeof action !== "object" || action === null) return false;
    const actionData = (action as Record<string, unknown>).action_data;
    return typeof actionData === "object"
      && actionData !== null
      && "Resign" in actionData;
  }) ?? false;
  return { matchEnded, localPlayerEnded };
}

export async function replayHasEnded(
  filePath: string,
  mode: "standard" | "ffa" | "team" = "standard",
  expectedPlayerCount?: number,
  terminalHumanPlayerNumbers: readonly number[] = []
): Promise<boolean> {
  return (await inspectReplayEnd(
    filePath,
    mode,
    expectedPlayerCount,
    terminalHumanPlayerNumbers
  )).matchEnded;
}

export async function parseReplayMetadata(
  filePath: string,
  teamGame = false,
  localPlayerNumber?: number
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
  const localPlayerEnded = replayContainsLocalPlayerEnd(
    replay.operations,
    localPlayerNumber === undefined ? [] : [localPlayerNumber]
  );
  if (!teamGame && !hasPostGame && resignPlayerNumber === undefined) {
    // Preserve the original 1v1 behavior: do not attempt to summarize an
    // actively written replay until it has a terminal operation.
    throw new ReplayNotFinishedError();
  }
  if (teamGame && !hasPostGame) throw new ReplayNotFinishedError(true, undefined, localPlayerEnded);
  let summary: ReturnType<typeof parse_rec_summary>;
  try {
    summary = parse_rec_summary(buffer);
  } catch {
    if (localPlayerEnded) {
      throw new ReplayNotFinishedError(
        teamGame,
        "The local game has ended, but the replay summary is still settling.",
        true
      );
    }
    throw new Error("The replay summary could not be parsed.");
  }
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
  if (isTeamGame && !hasPostGame) throw new ReplayNotFinishedError(true, undefined, localPlayerEnded);
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
    // A terminal operation can be flushed before aoe2rec-js observes the
    // completed summary. In particular, short surrenders can expose PostGame
    // while both teams are temporarily marked as winners. Treat that snapshot
    // as incomplete so the replay watcher's later write/stability notification
    // can parse it again instead of permanently rejecting a valid result.
    throw new ReplayNotFinishedError(
      isTeamGame,
      "The replay summary does not contain complete player and team results yet.",
      localPlayerEnded
    );
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
