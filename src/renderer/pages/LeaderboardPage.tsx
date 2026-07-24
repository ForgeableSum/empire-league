import { useEffect, useMemo, useState } from "react";
import {
  formatDivisionForRating,
  formatDivisionRatingRange,
  type Division
} from "../../shared/contracts/matchmaking";
import type { PlayerProfile } from "../../shared/contracts/players";
import { leaderboardService } from "../services/leaderboardService";
import { useAppStore } from "../state/appStore";

export function LeaderboardPage() {
  const { state } = useAppStore();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void leaderboardService.list()
      .then((result) => {
        if (!cancelled) setPlayers(result);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : "Leaderboard could not be loaded.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);
  const rows = useMemo(
    () =>
      players.filter((player) => {
        const byName = player.displayName.toLowerCase().includes(query.toLowerCase());
        const byDivision = division === "all" || player.division === division;
        return byName && byDivision;
      }),
    [division, players, query]
  );

  return (
    <section className="stack">
      <div className="toolbar">
        <label>
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Player name" />
        </label>
        <label>
          Division
          <select value={division} onChange={(event) => setDivision(event.target.value)}>
            <option value="all">All</option>
            {(["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"] satisfies Division[]).map((item) => (
              <option value={item} key={item}>{item} ({formatDivisionRatingRange(item)})</option>
            ))}
          </select>
        </label>
      </div>
      <div className="panel">
        <div className="leaderboard-table">
          <div className="leader-row leader-header" aria-hidden="true">
            <strong>Rank</strong>
            <span>Player</span>
            <span>Country</span>
            <span>Rating</span>
            <span>Division</span>
            <span>Wins</span>
            <span>Losses</span>
            <span>Win rate</span>
            <span>Streak</span>
          </div>
          {rows.map((player) => (
            <div className={player.id === state.currentUser.id ? "leader-row current" : "leader-row"} key={player.id}>
              <strong>#{player.rank}</strong>
              <span>{player.displayName}</span>
              <span>{player.countryCode ?? "—"}</span>
              <span>{player.rating}</span>
              <span>{formatDivisionForRating(player.rating)}</span>
              <span>{player.wins}</span>
              <span>{player.losses}</span>
              <span>{player.winRate}%</span>
              <span>{player.streak > 0 ? `W${player.streak}` : player.streak < 0 ? `L${Math.abs(player.streak)}` : "—"}</span>
            </div>
          ))}
          {loading && <div className="empty-state">Loading leaderboard…</div>}
          {!loading && loadError && <div className="empty-state">{loadError}</div>}
          {!loading && !loadError && rows.length === 0 && <div className="empty-state">No leaderboard results.</div>}
        </div>
      </div>
    </section>
  );
}
