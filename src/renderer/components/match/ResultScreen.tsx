import { useAppStore } from "../../state/appStore";

export function ResultScreen() {
  const { state, setPage, returnToMatchmaking } = useAppStore();
  const match = state.activeMatch;
  const result = match?.result;
  if (!match || !result) return null;
  const won = result.outcome === "win";
  const contested = result.verificationStatus === "contested";
  return (
    <section className="result-screen">
      <span className="eyebrow">{contested ? "Contested result" : "Verified result"}</span>
      <h2 className={won ? "win" : "loss"}>
        {contested ? "Result Contested" : won ? "Victory" : result.outcome === "loss" ? "Defeat" : "No Contest"}
      </h2>
      {contested && (
        <p>The replay result could not be verified. The result was discarded and ratings were not changed.</p>
      )}
      <div className="rating-swing">
        <strong>{result.ratingChange > 0 ? "+" : ""}{result.ratingChange} Rating</strong>
        <span>{contested ? "No rating change" : `${result.oldRating} → ${result.newRating}`}</span>
      </div>
      <div className="metrics-grid compact">
        <div><span>Opponent</span><strong>{match.opponent.displayName}</strong></div>
        <div><span>Map</span><strong>{match.selectedMap?.name}</strong></div>
        <div><span>Reason</span><strong>{result.reason}</strong></div>
        <div><span>Source</span><strong>{result.verificationSource}</strong></div>
        <div><span>Replay</span><strong>{contested ? "Not verified" : "Available"}</strong></div>
        <div><span>Status</span><strong>{contested ? "Discarded" : "Recorded"}</strong></div>
      </div>
      <div className="button-row">
        <button className="primary" type="button" onClick={() => void returnToMatchmaking()}>
          Return to Matchmaking
        </button>
        <button className="secondary" type="button" onClick={() => setPage("home")}>Return Home</button>
      </div>
    </section>
  );
}
