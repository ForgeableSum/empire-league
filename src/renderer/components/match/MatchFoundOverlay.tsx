import { useEffect, useState } from "react";
import { FormPips } from "../common/FormPips";
import { useAppStore } from "../../state/appStore";

export function MatchFoundOverlay() {
  const { state, acceptMatch, declineMatch } = useAppStore();
  const [remaining, setRemaining] = useState(20);
  const opponent = state.activeMatch?.opponent;

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") void declineMatch();
      if (event.key === "Enter") void acceptMatch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [acceptMatch, declineMatch]);

  if (!opponent) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="match-found-title">
      <div className="match-modal">
        <span className="eyebrow">20 second accept window</span>
        <h2 id="match-found-title">Match Found</h2>
        <div className="opponent-card">
          <div className="avatar large-avatar">{opponent.displayName.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{opponent.displayName}</strong>
            <span>{opponent.rating} Elo · Rank #{opponent.rank}</span>
            <span>{opponent.division} · {opponent.countryCode}</span>
          </div>
        </div>
        <FormPips form={opponent.recentForm} />
        <div className="tag-list">{opponent.preferredMaps.map((map) => <span key={map}>{map}</span>)}</div>
        <div className="countdown">{remaining}s</div>
        <div className="modal-actions">
          <button className="primary" type="button" onClick={() => void acceptMatch()}>Accept</button>
          <button className="secondary" type="button" onClick={() => void declineMatch()}>Decline</button>
        </div>
      </div>
    </div>
  );
}
