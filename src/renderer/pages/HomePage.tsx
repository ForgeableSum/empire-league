import { formatDivisionForRating } from "../../shared/contracts/matchmaking";
import { Metric } from "../components/common/Metric";
import { FormPips } from "../components/common/FormPips";
import { MapPool } from "../components/common/MapPool";
import { mapGroups } from "../mocks/mockPlayers";
import { useAppStore } from "../state/appStore";
import { AlertTriangle } from "lucide-react";
import { isPreviewMode } from "../previewMode";

const openLandMaps = mapGroups.find((group) => group.id === "land-open")?.maps ?? [];

export function HomePage() {
  const { state } = useAppStore();
  const user = state.currentUser;
  const recentForm = state.recentMatches.slice(0, 5).map((match) => match.outcome);
  return (
    <section className="page-grid">
      {!isPreviewMode && (
        <div className="closed-beta-warning" role="note" aria-label="Closed beta data notice">
          <AlertTriangle size={20} aria-hidden="true" />
          <p><strong>Empire League is in closed beta.</strong> Elo ratings and match data will be reset when the platform fully launches.</p>
        </div>
      )}
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Current Rating</span>
          <div className="rating-display">{user.rating}</div>
          <p>{formatDivisionForRating(user.rating)} · Global Rank #{user.rank.toLocaleString()}</p>
        </div>
      </div>
      <div className="metrics-grid">
        <Metric label="Division" value={formatDivisionForRating(user.rating)} detail={`${user.wins + user.losses} ranked matches`} />
        <Metric label="Season Record" value={`${user.wins}-${user.losses}`} detail={`${user.winRate}% win rate`} />
        <Metric label="Current Streak" value={user.streak > 0 ? `W${user.streak}` : `L${Math.abs(user.streak)}`} />
        <Metric label="Peak Rating" value={user.peakRating} />
      </div>
      <div className="panel span-2">
        <div className="panel-title">
          <h2>Recent Matches</h2>
          {recentForm.length > 0 && <FormPips form={recentForm} />}
        </div>
        <div className="table recent-matches-table">
          <div className="table-row table-header">
            <strong>Result</strong>
            <span>Opponent</span>
            <span>Map</span>
            <span>Civilization</span>
            <span>Rating</span>
            <span>Duration</span>
          </div>
          {state.recentMatches.slice(0, 7).map((match) => (
            <div className="table-row" key={match.id}>
              <strong className={match.outcome}>{match.outcome === "win" ? "Victory" : match.outcome === "loss" ? "Defeat" : "No Contest"}</strong>
              <span>{match.opponent}</span>
              <span>{match.map}</span>
              <span>{match.civilization && match.opponentCivilization
                ? `${match.civilization} vs. ${match.opponentCivilization}`
                : "Unknown civilizations"}</span>
              <span className={match.ratingChange >= 0 ? "win" : "loss"}>{match.ratingChange > 0 ? "+" : ""}{match.ratingChange}</span>
              <span>{match.durationMinutes}m</span>
            </div>
          ))}
          {state.recentMatches.length === 0 && (
            <div className="empty-state">You haven't played any matches yet.</div>
          )}
        </div>
      </div>
      <div className="panel">
        <h2>Current Open Land Map Pool</h2>
        <MapPool maps={openLandMaps} />
      </div>
      <div className="panel">
        <h2>Platform Status</h2>
        <div className="status-list">
          <div><span>Matchmaking</span><strong>Operational</strong></div>
          <div><span>Result service</span><strong>Connected</strong></div>
          <div><span>Match history</span><strong>{state.recentMatches.length} recorded</strong></div>
        </div>
      </div>
    </section>
  );
}
