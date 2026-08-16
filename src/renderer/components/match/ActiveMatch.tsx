import { useAppStore } from "../../state/appStore";

export function ActiveMatch() {
  const { state, returnToMatchmaking } = useAppStore();
  const match = state.activeMatch;
  if (!match) return null;
  return (
    <section className="match-focus">
      <span className="eyebrow">{state.queueStatus === "verifying_result" ? "Result verification" : "Match in progress"}</span>
      <h2>{match.player.displayName} vs {match.opponent.displayName}</h2>
      {state.queueStatus === "verifying_result" && (
        <p>Replay metadata submitted. The result will resolve when the opponent reports or the verification window ends.</p>
      )}
      <div className="metrics-grid compact">
        <div><span>Map</span><strong>{match.selectedMap?.name}</strong></div>
        <div><span>Lobby</span><strong>{match.lobby?.platformLobbyId}</strong></div>
        <div><span>Status</span><strong>{state.queueStatus.replaceAll("_", " ")}</strong></div>
      </div>
      {state.queueStatus === "verifying_result" && (
        <div className="button-row">
          <button className="primary" type="button" onClick={() => void returnToMatchmaking()}>
            {match.matchType === "tournament" ? "Return to Tournament" : "Return to Matchmaking"}
          </button>
        </div>
      )}
    </section>
  );
}
