import { useMemo, useState, type ReactNode } from "react";
import { CalendarDays, Clock3, File, MapPinned, Users } from "lucide-react";
import type { MatchSummary } from "../../shared/contracts/matches";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { HistoryCivilizations, HistoryPlayers, historyTeamsFor } from "../components/match/HistoryMatchup";
import { useAppStore } from "../state/appStore";

type ModeFilter = "all" | "solo" | "team";

function isTeamMatch(match: MatchSummary): boolean {
  return (match.teamSize ?? 1) > 1 || (match.participants?.length ?? 0) > 2 || match.queueType === "team-games";
}

export function MatchHistoryPage() {
  const { state, openPlayerProfile, localizeAoe2Name } = useAppStore();
  const [query, setQuery] = useState("");
  const [resultFilter, setResultFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all");
  const matches = useMemo(
    () => state.recentMatches.filter((match) => {
      const participantSearch = (match.participants ?? [])
        .flatMap((participant) => [participant.displayName, participant.civilization, localizeAoe2Name(participant.civilization)])
        .join(" ");
      const matchesQuery = `${match.opponent} ${match.map} ${localizeAoe2Name(match.map)} ${match.civilization} ${localizeAoe2Name(match.civilization)} ${match.opponentCivilization} ${localizeAoe2Name(match.opponentCivilization)} ${participantSearch}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesResult = resultFilter === "all" || match.outcome === resultFilter;
      const teamMatch = isTeamMatch(match);
      const matchesMode = modeFilter === "all" || (modeFilter === "team" ? teamMatch : !teamMatch);
      return matchesQuery && matchesResult && matchesMode;
    }),
    [localizeAoe2Name, modeFilter, query, resultFilter, state.recentMatches]
  );
  const soloMatches = matches.filter((match) => !isTeamMatch(match));
  const teamMatches = matches.filter(isTeamMatch);

  return (
    <section className="stack">
      <div className="toolbar history-toolbar">
        <label>
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Player, map, civilization" />
        </label>
        <ThemedSelect
          label="Game type"
          options={[
            { value: "all", label: "All games" },
            { value: "solo", label: "1v1" },
            { value: "team", label: "Team games" }
          ]}
          value={modeFilter}
          onChange={(value) => setModeFilter(value as ModeFilter)}
        />
        <ThemedSelect
          label="Result"
          options={[
            { value: "all", label: "All" },
            { value: "win", label: "Wins" },
            { value: "loss", label: "Losses" }
          ]}
          value={resultFilter}
          onChange={setResultFilter}
        />
      </div>

      {soloMatches.length > 0 && (
        <div className="panel history-section">
          {modeFilter === "all" && <div className="history-section-title"><strong>1v1 Matches</strong><span>{soloMatches.length}</span></div>}
          <div className="table history-table">
            <div className="table-row table-header">
              <strong>Result</strong>
              <span>Opponent</span>
              <span>Map</span>
              <span>Civilizations</span>
              <span>Rating</span>
              <span>Duration</span>
              <span>Date</span>
              <span>Status</span>
              <span>Replay</span>
            </div>
            {soloMatches.map((match) => (
              <div className="table-row clickable" key={match.id}>
                <strong className={match.outcome}>{match.outcome}</strong>
                <HistoryPlayers match={match} localizeAoe2Name={localizeAoe2Name} openPlayerProfile={openPlayerProfile} showRatings />
                <span>{localizeAoe2Name(match.map)}</span>
                <HistoryCivilizations match={match} localizeAoe2Name={localizeAoe2Name} />
                <RatingChange match={match} />
                <span>{match.durationMinutes}m</span>
                <span>{new Date(match.timestamp).toLocaleDateString()}</span>
                <span>{historyStatusLabel(match.verificationStatus, match.verified)}</span>
                <ReplayButton match={match} />
              </div>
            ))}
          </div>
        </div>
      )}

      {teamMatches.length > 0 && (
        <div className="history-section">
          {modeFilter === "all" && <div className="history-section-title"><strong>Team Games</strong><span>{teamMatches.length}</span></div>}
          <div className="team-history-list">
            {teamMatches.map((match) => (
              <TeamHistoryCard
                key={match.id}
                match={match}
                localizeAoe2Name={localizeAoe2Name}
                openPlayerProfile={openPlayerProfile}
              />
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && (
        <div className="panel empty-state">
          {state.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."}
        </div>
      )}
    </section>
  );
}

function TeamHistoryCard({ match, localizeAoe2Name, openPlayerProfile }: {
  match: MatchSummary;
  localizeAoe2Name: (name: string) => string;
  openPlayerProfile: (playerId: string) => void;
}) {
  const teams = historyTeamsFor(match);
  const orderedTeams = [...teams].sort((left, right) =>
    Number(right.some((participant) => participant.isCurrentPlayer)) - Number(left.some((participant) => participant.isCurrentPlayer))
  );
  const outcomeLabel = match.outcome === "win" ? "Victory" : match.outcome === "loss" ? "Defeat" : "No Contest";
  const teamNodes = orderedTeams.map((team, teamIndex) => {
    const currentTeam = team.some((participant) => participant.isCurrentPlayer);
    return (
      <section className="team-history-side" data-current={currentTeam || undefined} key={team[0]?.teamNumber ?? teamIndex}>
        <header>
          <span>{currentTeam ? "Your team" : "Opponents"}</span>
          <small>Team {team[0]?.teamNumber ?? teamIndex + 1}</small>
        </header>
        <div className="team-history-roster">
          {team.map((participant) => (
            <div className="team-history-player" data-current={participant.isCurrentPlayer || undefined} key={participant.playerId}>
              <div>
                {participant.isCurrentPlayer ? (
                  <strong>{participant.displayName}<small>You</small></strong>
                ) : (
                  <button className="player-link" type="button" onClick={() => openPlayerProfile(participant.playerId)}>
                    {participant.displayName}
                  </button>
                )}
                <span>{participant.civilization ? localizeAoe2Name(participant.civilization) : "Unknown civilization"}</span>
              </div>
              <strong className="team-history-player-rating">{participant.rating}</strong>
            </div>
          ))}
        </div>
      </section>
    );
  });
  const matchupNodes = teamNodes.reduce<ReactNode[]>((nodes, team, index) => [
    ...nodes,
    index > 0 ? <span className="team-history-versus" key={`versus-${index}`}>VS</span> : null,
    team
  ], []);

  return (
    <article className="team-history-card" data-outcome={match.outcome}>
      <header className="team-history-header">
        <div className={`team-history-result ${match.outcome}`}>{outcomeLabel}</div>
        <div className="team-history-heading">
          <strong><Users aria-hidden="true" size={16} /> {match.teamSize}v{match.teamSize} Team Game</strong>
          <span><MapPinned aria-hidden="true" size={14} /> {localizeAoe2Name(match.map)}</span>
        </div>
        <span className="team-history-status">{historyStatusLabel(match.verificationStatus, match.verified)}</span>
      </header>

      <div className="team-history-matchup">{matchupNodes}</div>

      <footer className="team-history-footer">
        <span><Clock3 aria-hidden="true" size={14} /> {match.durationMinutes}m</span>
        <span><CalendarDays aria-hidden="true" size={14} /> {new Date(match.timestamp).toLocaleDateString()}</span>
        <span className="team-history-rating-label">Team rating <RatingChange match={match} /></span>
        <ReplayButton match={match} withLabel />
      </footer>
    </article>
  );
}

function RatingChange({ match }: { match: MatchSummary }) {
  return <span className={match.ratingChange >= 0 ? "win" : "loss"}>{match.ratingChange > 0 ? "+" : ""}{match.ratingChange}</span>;
}

function ReplayButton({ match, withLabel = false }: { match: MatchSummary; withLabel?: boolean }) {
  return match.replayPath ? (
    <button
      className="replay-link"
      type="button"
      aria-label="Show replay in File Explorer"
      title="Show replay in File Explorer"
      onClick={() => void window.electronApi?.revealReplayFile(match.replayPath!)}
    >
      <File aria-hidden="true" size={16} />{withLabel && <span>Replay</span>}
    </button>
  ) : withLabel ? <span className="replay-unavailable">Replay unavailable</span> : <span className="replay-unavailable" title="Replay unavailable">—</span>;
}

function historyStatusLabel(status: MatchSummary["verificationStatus"], verified: boolean): string {
  if (verified || status === "verified") return "Verified";
  if (status === "contested" || status === "rejected") return "Contested";
  if (status === "no_contest") return "No contest";
  return "Pending";
}
