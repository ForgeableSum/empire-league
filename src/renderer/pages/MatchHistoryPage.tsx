import { useMemo, useState } from "react";
import { File } from "lucide-react";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { useAppStore } from "../state/appStore";

export function MatchHistoryPage() {
  const { state, openPlayerProfile } = useAppStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const matches = useMemo(
    () =>
      state.recentMatches.filter((match) => {
        const matchesQuery = `${match.opponent} ${match.map} ${match.civilization} ${match.opponentCivilization}`
          .toLowerCase()
          .includes(query.toLowerCase());
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
        <ThemedSelect
          label="Result"
          options={[
            { value: "all", label: "All" },
            { value: "win", label: "Wins" },
            { value: "loss", label: "Losses" }
          ]}
          value={filter}
          onChange={setFilter}
        />
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
            <span>Replay</span>
          </div>
          {matches.map((match) => (
            <div className="table-row clickable" key={match.id}>
              <strong className={match.outcome}>{match.outcome}</strong>
              <button className="player-link" type="button" onClick={() => openPlayerProfile(match.opponentId)}>
                {match.opponent} ({match.opponentRating})
              </button>
              <span>{match.map}</span>
              <span>{match.civilization && match.opponentCivilization
                ? `${match.civilization} vs. ${match.opponentCivilization}`
                : "Unknown civilizations"}</span>
              <span className={match.ratingChange >= 0 ? "win" : "loss"}>{match.ratingChange > 0 ? "+" : ""}{match.ratingChange}</span>
              <span>{match.durationMinutes}m</span>
              <span>{new Date(match.timestamp).toLocaleDateString()}</span>
              <span>{historyStatusLabel(match.verificationStatus, match.verified)}</span>
              {match.replayPath ? (
                <button
                  className="replay-link"
                  type="button"
                  aria-label="Show replay in File Explorer"
                  title="Show replay in File Explorer"
                  onClick={() => void window.electronApi?.revealReplayFile(match.replayPath!)}
                >
                  <File aria-hidden="true" size={18} />
                </button>
              ) : <span className="replay-unavailable" title="Replay unavailable">—</span>}
            </div>
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

function historyStatusLabel(status: import("../../shared/contracts/matches").MatchSummary["verificationStatus"], verified: boolean): string {
  if (verified || status === "verified") return "Verified";
  if (status === "contested" || status === "rejected") return "Contested";
  if (status === "no_contest") return "No contest";
  return "Pending";
}
