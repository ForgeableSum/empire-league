import type { MatchSummary, MatchSummaryParticipant } from "../../../shared/contracts/matches";

interface HistoryMatchupProps {
  match: MatchSummary;
  localizeAoe2Name: (name: string) => string;
  openPlayerProfile?: (playerId: string) => void;
  showRatings?: boolean;
}

export function historyTeamsFor(match: MatchSummary): MatchSummaryParticipant[][] {
  const participants = match.participants ?? [];
  const teamNumbers = [...new Set(participants.map((participant) => participant.teamNumber))].sort((a, b) => a - b);
  return teamNumbers.map((teamNumber) => participants
    .filter((participant) => participant.teamNumber === teamNumber)
    .sort((a, b) => a.lobbySlot - b.lobbySlot));
}

export function HistoryPlayers({ match, openPlayerProfile, showRatings = false }: HistoryMatchupProps) {
  const teams = historyTeamsFor(match);
  if ((match.teamSize ?? 1) <= 1 || teams.length !== 2) {
    const label = `${match.opponent}${showRatings ? ` (${match.opponentRating})` : ""}`;
    return openPlayerProfile ? (
      <button className="player-link" type="button" onClick={() => openPlayerProfile(match.opponentId)}>{label}</button>
    ) : <span>{label}</span>;
  }

  const opponentTeam = teams.find((team) => !team.some((participant) => participant.isCurrentPlayer)) ?? teams[1];
  return (
    <div className="history-team-summary">
      <strong>{match.teamSize}v{match.teamSize} Team Game</strong>
      <span>vs. {opponentTeam.map((participant) => participant.displayName).join(", ")}</span>
    </div>
  );
}

export function HistoryCivilizations({ match, localizeAoe2Name }: HistoryMatchupProps) {
  const teams = historyTeamsFor(match);
  if ((match.teamSize ?? 1) <= 1 || teams.length !== 2) {
    return <span>{match.civilization && match.opponentCivilization
      ? `${localizeAoe2Name(match.civilization)} vs. ${localizeAoe2Name(match.opponentCivilization)}`
      : "Unknown civilizations"}</span>;
  }

  const current = teams.find((team) => team.some((participant) => participant.isCurrentPlayer))?.find((participant) => participant.isCurrentPlayer);
  return <span>{current?.civilization ? localizeAoe2Name(current.civilization) : "Unknown civilization"}</span>;
}
