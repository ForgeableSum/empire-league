import { useAppStore } from "../../state/appStore";

export function ResultScreen() {
  const { state, setPage, startQueue } = useAppStore();
  const match = state.activeMatch;
  const result = match?.result;
  if (!match || !result) return null;
  const won = result.outcome === "win";
  return (
    <section className="result-screen">
      <span className="eyebrow">Verified result</span>
      <h2 className={won ? "win" : "loss"}>{won ? "Victory" : result.outcome === "loss" ? "Defeat" : "No Contest"}</h2>
      <div className="rating-swing">
        <strong>{result.ratingChange > 0 ? "+" : ""}{result.ratingChange} Rating</strong>
        <span>{result.oldRating} → {result.newRating}</span>
      </div>
      <div className="metrics-grid compact">
        <div><span>Opponent</span><strong>{match.opponent.displayName}</strong></div>
        <div><span>Map</span><strong>{match.selectedMap?.name}</strong></div>
        <div><span>Reason</span><strong>{result.reason}</strong></div>
        <div><span>Source</span><strong>{result.verificationSource}</strong></div>
        <div><span>Replay</span><strong>Available</strong></div>
        <div><span>Updated rank</span><strong>#{Math.max(1, state.currentUser.rank - 12).toLocaleString()}</strong></div>
      </div>
      <div className="button-row">
        <button className="primary" type="button" onClick={() => void startQueue(match.queue)}>Rematch</button>
        <button className="secondary" type="button" onClick={() => setPage("home")}>Return Home</button>
      </div>
    </section>
  );
}
