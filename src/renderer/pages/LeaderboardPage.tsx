import { useMemo, useState } from "react";
import {
  formatDivisionForRating,
  formatDivisionRatingRange,
  type Division
} from "../../shared/contracts/matchmaking";
import { FormPips } from "../components/common/FormPips";
import { mockLeaderboard } from "../mocks/mockLeaderboard";
import { useAppStore } from "../state/appStore";

export function LeaderboardPage() {
  const { state } = useAppStore();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");
  const rows = useMemo(
    () =>
      mockLeaderboard.filter((player) => {
        const byName = player.displayName.toLowerCase().includes(query.toLowerCase());
        const byDivision = division === "all" || player.division === division;
        return byName && byDivision;
      }),
    [division, query]
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
        <label>
          Season
          <select defaultValue="summer-anvil">
            <option value="summer-anvil">Summer Anvil</option>
            <option value="spring-siege">Spring Siege</option>
          </select>
        </label>
      </div>
      <div className="panel">
        <div className="leaderboard-table">
          {rows.map((player) => (
            <div className={player.id === state.currentUser.id ? "leader-row current" : "leader-row"} key={player.id}>
              <strong>#{player.rank}</strong>
              <span>{player.displayName}</span>
              <span>{player.countryCode}</span>
              <span>{player.rating}</span>
              <span>{formatDivisionForRating(player.rating)}</span>
              <span>{player.wins}</span>
              <span>{player.losses}</span>
              <span>{player.winRate}%</span>
              <span>{player.streak > 0 ? `W${player.streak}` : `L${Math.abs(player.streak)}`}</span>
              <FormPips form={player.recentForm} />
            </div>
          ))}
          {rows.length === 0 && <div className="empty-state">No leaderboard results.</div>}
        </div>
      </div>
    </section>
  );
}
