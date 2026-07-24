import { useEffect, useRef, useState } from "react";
import { formatDivisionForRating } from "../../../shared/contracts/matchmaking";
import { FormPips } from "../common/FormPips";
import { useAppStore } from "../../state/appStore";

export function MatchFoundOverlay() {
  const { state, acceptMatch, declineMatch } = useAppStore();
  const autoAcceptDeadline = useRef(Date.now() + 10_000);
  const autoAcceptStarted = useRef(false);
  const deadline = autoAcceptDeadline.current;
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
  const opponent = state.activeMatch?.opponent;

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    const delay = Math.max(0, deadline - Date.now());
    const timer = window.setTimeout(() => {
      if (autoAcceptStarted.current) return;
      autoAcceptStarted.current = true;
      void acceptMatch();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [acceptMatch, deadline]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") void declineMatch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [declineMatch]);

  if (!opponent) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="match-found-title">
      <div className="match-modal">
        <span className="eyebrow">Auto-accepting in {remaining} seconds</span>
        <h2 id="match-found-title">Match Found</h2>
        <div className="opponent-card">
          <div className="avatar large-avatar">{opponent.displayName.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{opponent.displayName}</strong>
            <span>{opponent.rating} Elo · Rank #{opponent.rank}</span>
            <span>{formatDivisionForRating(opponent.rating)} · {opponent.countryCode}</span>
          </div>
        </div>
        <FormPips form={opponent.recentForm} />
        <div className="tag-list">{opponent.preferredMaps.map((map) => <span key={map}>{map}</span>)}</div>
        <div className="countdown">{remaining}s</div>
        <div className="modal-actions">
          <button className="secondary" type="button" onClick={() => void declineMatch()}>Decline Match</button>
        </div>
      </div>
    </div>
  );
}
