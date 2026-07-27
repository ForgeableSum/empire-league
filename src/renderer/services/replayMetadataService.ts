import type { ReplayMatchMetadata, ReplayPlayerMetadata } from "../../shared/contracts/matches";

export class ReplayNotFinishedError extends Error {
  constructor() {
    super("The replay does not contain a PostGame or Resign operation yet.");
    this.name = "ReplayNotFinishedError";
  }
}

export async function parseReplayMetadata(filePath: string): Promise<ReplayMatchMetadata> {
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
  if (!hasPostGame && resignPlayerNumber === undefined) {
    throw new ReplayNotFinishedError();
  }
  const summary = parse_rec_summary(buffer);
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
  const winningPlayers = summary.teams.filter((team) => team.winner).flatMap((team) => team.players);
  const losingPlayers = summary.teams.filter((team) => !team.winner).flatMap((team) => team.players);
  const allPlayers = summary.teams.flatMap((team) => team.players).filter((player) => player.profile_id > 0);
  const resignedPlayer = resignPlayerNumber === undefined
    ? undefined
    : allPlayers.find((player) => player.player_number === resignPlayerNumber);
  const winner = resignedPlayer
    ? allPlayers.find((player) => player.player_number !== resignPlayerNumber)
    : winningPlayers.find((player) => player.profile_id > 0);
  const loser = resignedPlayer ?? losingPlayers.find((player) => player.profile_id > 0);
  const reporter = players.find((player) => player.playerNumber === summary.header.replay.rec_player);
  if (players.length !== 2 || !winner || !loser || !reporter) {
    throw new Error("The replay does not contain one identifiable winner and loser.");
  }
  return {
    fileSizeBytes: bytes.byteLength,
    build: summary.header.build,
    recordedAt: summary.header.timestamp,
    durationMs: summary.duration,
    players: players.sort((left, right) => left.profileId - right.profileId),
    reporterProfileId: reporter.profileId,
    winnerProfileId: winner.profile_id,
    loserProfileId: loser.profile_id,
    reason: resignPlayerNumber !== undefined || loser.resigned ? "resignation" : "defeat"
  };
}
