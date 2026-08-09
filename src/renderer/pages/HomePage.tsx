import { formatDivisionForRating } from "../../shared/contracts/matchmaking";
import { Metric } from "../components/common/Metric";
import { FormPips } from "../components/common/FormPips";
import { MapPool } from "../components/common/MapPool";
import { mapGroups } from "../mocks/mockPlayers";
import { useAppStore } from "../state/appStore";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { isPreviewMode } from "../previewMode";
import { isAppMinimizeLocked } from "../components/layout/WindowControls";
import { useSyncExternalStore } from "react";
import { matchmakerTransport } from "../services/matchmakerTransport";

const openLandMaps = mapGroups.find((group) => group.id === "land-open")?.maps ?? [];

export function HomePage() {
  const { state, lobbyAutomationActive, weeklyQueueActive, notify, localizeAoe2Name } = useAppStore();
  const user = state.currentUser;
  const recentForm = state.recentMatches.slice(0, 5).map((match) => match.outcome);
  const matchmakerStatus = useSyncExternalStore(
    matchmakerTransport.onConnectionStatusChange,
    matchmakerTransport.getConnectionStatus
  );
  const matchmakerStatusLabel = matchmakerStatus === "connected"
    ? "Connected"
    : matchmakerStatus === "connecting"
      ? "Connecting..."
      : "Disconnected";
  const openDiscord = async () => {
    if (window.electronApi) {
      if (isAppMinimizeLocked(state.queueStatus, weeklyQueueActive, lobbyAutomationActive)) {
        notify(
          "Discord opened without minimizing Empire League.",
          "warning",
          { detail: "Cancel matchmaking or finish the current match before minimizing." }
        );
      } else {
        await window.electronApi.minimizeToTaskbar();
      }
      await window.electronApi.openDiscordInvite();
      return;
    }
    window.open("https://discord.gg/arRjVxx2y7", "_blank", "noopener,noreferrer");
  };
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
              <span>{localizeAoe2Name(match.map)}</span>
              <span>{match.civilization && match.opponentCivilization
                ? `${localizeAoe2Name(match.civilization)} vs. ${localizeAoe2Name(match.opponentCivilization)}`
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
          <div><span>Matchmaker</span><strong>{matchmakerStatusLabel}</strong></div>
          <div><span>Match history</span><strong>{state.recentMatches.length} recorded</strong></div>
        </div>
        <div className="discord-community">
          <div>
            <strong>Join the community</strong>
            <span>Find opponents, get support, and follow beta updates.</span>
          </div>
          <button className="secondary" type="button" onClick={() => void openDiscord()}>
            <MessageCircle size={18} /> Join our Discord
          </button>
        </div>
      </div>
    </section>
  );
}
