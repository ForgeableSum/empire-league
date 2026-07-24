import { useMemo, useState } from "react";
import { useAppStore } from "../state/appStore";

export function MatchHistoryPage() {
  const { state } = useAppStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const matches = useMemo(
    () =>
      state.recentMatches.filter((match) => {
        const matchesQuery = `${match.opponent} ${match.map} ${match.civilization}`.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter === "all" || match.outcome === filter;
        return matchesQuery && matchesFilter;
      }),
    [filter, query, state.recentMatches]
  );

  return (
    <section className="stack">
      <div className="toolbar">
        <label>
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Opponent, map, civilization" />
        </label>
        <label>
          Result
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="win">Wins</option>
            <option value="loss">Losses</option>
          </select>
        </label>
      </div>
      <div className="panel">
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
          </div>
          {matches.map((match) => (
            <button className="table-row clickable" type="button" key={match.id}>
              <strong className={match.outcome}>{match.outcome}</strong>
              <span>{match.opponent} ({match.opponentRating})</span>
              <span>{match.map}</span>
              <span>{match.civilization && match.opponentCivilization ? `${match.civilization} vs ${match.opponentCivilization}` : "—"}</span>
              <span className={match.ratingChange >= 0 ? "win" : "loss"}>{match.ratingChange > 0 ? "+" : ""}{match.ratingChange}</span>
              <span>{match.durationMinutes}m</span>
              <span>{new Date(match.timestamp).toLocaleDateString()}</span>
              <span>{match.verified ? "Verified" : "Pending"}</span>
            </button>
          ))}
          {matches.length === 0 && (
            <div className="empty-state">
              {state.recentMatches.length === 0 ? "You haven't played any matches yet." : "No matches match these filters."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
