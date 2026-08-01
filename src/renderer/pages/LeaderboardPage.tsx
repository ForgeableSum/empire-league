import { useEffect, useMemo, useState } from "react";
import {
  formatDivisionForRating,
  formatDivisionRatingRange,
  type Division
} from "../../shared/contracts/matchmaking";
import type { PlayerProfile } from "../../shared/contracts/players";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { leaderboardService, type LeaderboardMode } from "../services/leaderboardService";
import { useAppStore } from "../state/appStore";

export function LeaderboardPage() {
  const { state, openPlayerProfile } = useAppStore();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");
  const [mode, setMode] = useState<LeaderboardMode>("solo");
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    void leaderboardService.list(page, division, mode)
      .then((result) => {
        if (!cancelled) {
          setPlayers(result.players);
          setTotal(result.total);
        }
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : "Leaderboard could not be loaded.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [division, mode, page]);
  const rows = useMemo(
    () =>
      players.filter((player) => {
        return player.displayName.toLowerCase().includes(query.toLowerCase());
      }),
    [players, query]
  );
  const divisionOptions = [
    { value: "all", label: "All" },
    ...(["Copper", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"] satisfies Division[])
      .map((item) => ({ value: item, label: `${item} (${formatDivisionRatingRange(item)})` }))
  ];
  const totalPages = Math.max(1, Math.ceil(total / 100));
  const firstRank = total === 0 ? 0 : (page - 1) * 100 + 1;
  const lastRank = Math.min(page * 100, total);
  const pagination = (
    <LeaderboardPagination
      page={page}
      totalPages={totalPages}
      firstRank={firstRank}
      lastRank={lastRank}
      total={total}
      loading={loading}
      onPageChange={setPage}
    />
  );

  return (
    <section className="stack">
      <div className="toolbar">
        <div className="leaderboard-mode" role="group" aria-label="Leaderboard mode">
          <button
            type="button"
            aria-pressed={mode === "solo"}
            onClick={() => { setMode("solo"); setPage(1); }}
          >
            1v1
          </button>
          <button
            type="button"
            aria-pressed={mode === "team"}
            onClick={() => { setMode("team"); setPage(1); }}
          >
            Teams
          </button>
        </div>
        <label>
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Player name" />
        </label>
        <ThemedSelect
          className="division-field"
          label="Division"
          options={divisionOptions}
          value={division}
          onChange={(value) => {
            setPage(1);
            setDivision(value);
          }}
        />
      </div>
      <div className="panel">
        <div className="leaderboard-pagination-top">{pagination}</div>
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
              <button className="player-link" type="button" onClick={() => openPlayerProfile(player.id)}>
                {player.displayName}
              </button>
              <span>{countryFlag(player.countryCode)}</span>
              <span>{player.rating}</span>
              <span>{formatDivisionForRating(player.rating)}</span>
              <span>{player.wins}</span>
              <span>{player.losses}</span>
              <span>{player.winRate}%</span>
              <span>{player.streak > 0 ? `W${player.streak}` : player.streak < 0 ? `L${Math.abs(player.streak)}` : "0"}</span>
            </div>
          ))}
          {loading && <div className="empty-state">Loading leaderboard…</div>}
          {!loading && loadError && <div className="empty-state">{loadError}</div>}
          {!loading && !loadError && rows.length === 0 && <div className="empty-state">No leaderboard results.</div>}
        </div>
        <div className="leaderboard-pagination-bottom">{pagination}</div>
      </div>
    </section>
  );
}

function LeaderboardPagination({
  page,
  totalPages,
  firstRank,
  lastRank,
  total,
  loading,
  onPageChange
}: {
  page: number;
  totalPages: number;
  firstRank: number;
  lastRank: number;
  total: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}) {
  const pageItems: Array<number | "ellipsis"> = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : page <= 4
      ? [1, 2, 3, 4, 5, "ellipsis", totalPages]
      : page >= totalPages - 3
        ? [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        : [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];

  return (
    <nav className="leaderboard-pagination" aria-label="Leaderboard pages">
      <button
        className="secondary leaderboard-page-step"
        type="button"
        disabled={loading || page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <div className="leaderboard-page-numbers">
        {pageItems.map((item, index) => item === "ellipsis"
          ? <span className="leaderboard-page-ellipsis" key={`ellipsis-${index}`} aria-hidden="true">…</span>
          : (
            <button
              className="leaderboard-page-number"
              type="button"
              key={item}
              aria-current={item === page ? "page" : undefined}
              disabled={loading}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ))}
      </div>
      <button
        className="secondary leaderboard-page-step"
        type="button"
        disabled={loading || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
      <span className="leaderboard-page-status">
        Page {page} of {totalPages}
        {total > 0 && <small>Players {firstRank}–{lastRank} of {total.toLocaleString()}</small>}
      </span>
    </nav>
  );
}

function countryFlag(countryCode?: string) {
  const code = countryCode?.trim().toUpperCase();
  if (!code) return "Unknown";
  if (!/^[A-Z]{2}$/.test(code)) return code;

  return (
    <span
      className={`country-flag fi fi-${code.toLowerCase()}`}
      role="img"
      aria-label={`${code} flag`}
      title={code}
    />
  );
}
