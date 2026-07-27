import type { ReplayMatchMetadata, ReplayPlayerMetadata } from "../../shared/contracts/matches";

export class ReplayNotFinishedError extends Error {
  constructor() {
    super("The replay does not contain its PostGame marker yet.");
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
  if (!replay.operations?.some((operation) => "PostGame" in operation)) {
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
  const winner = winningPlayers.find((player) => player.profile_id > 0);
  const loser = losingPlayers.find((player) => player.profile_id > 0);
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
    reason: loser.resigned ? "resignation" : "defeat"
  };
}
