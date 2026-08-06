import { useEffect, useRef, useState } from "react";
import { maps } from "../../mocks/mockPlayers";
import { useAppStore } from "../../state/appStore";

export function MatchFoundOverlay() {
  const { state, acceptMatch, declineMatch } = useAppStore();
  const match = state.activeMatch;
  const requiresFamilySharingDecision = match?.queue.id === "ranked-rm-1v1"
    && match.opponent.steamLicenseStatus === "family_shared";
  const autoAcceptDeadline = useRef(
    requiresFamilySharingDecision && match?.acceptDeadline
      ? new Date(match.acceptDeadline).getTime()
      : Date.now() + 10_000
  );
  const autoAcceptStarted = useRef(false);
  const deadline = autoAcceptDeadline.current;
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
  const selectedMap = maps.find((map) => map.id === match?.selectedMap?.id) ?? match?.selectedMap;

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    if (requiresFamilySharingDecision) return;
    const focusCheckDelay = Math.max(0, deadline - Date.now() - 3_000);
    const focusCheckTimer = window.setTimeout(() => {
      if (autoAcceptStarted.current) return;
      void (window.electronApi?.isAppFocused() ?? Promise.resolve(document.hasFocus())).then((focused) => {
        if (focused || autoAcceptStarted.current) return;
        autoAcceptStarted.current = true;
        void declineMatch();
      });
    }, focusCheckDelay);
    const delay = Math.max(0, deadline - Date.now());
    const autoAcceptTimer = window.setTimeout(() => {
      if (autoAcceptStarted.current) return;
      autoAcceptStarted.current = true;
      void acceptMatch();
    }, delay);
    return () => {
      window.clearTimeout(focusCheckTimer);
      window.clearTimeout(autoAcceptTimer);
    };
  }, [acceptMatch, deadline, declineMatch, requiresFamilySharingDecision]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") void declineMatch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [declineMatch]);

  if (!match) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="match-found-title">
      <div className="match-modal">
        <span className="eyebrow">
          {requiresFamilySharingDecision ? "Decision required" : "Auto-accepting"}
        </span>
        <h2 id="match-found-title">Match Found</h2>
        {selectedMap && (
          <figure className="match-map-thumbnail">
            <img src={selectedMap.thumbnailUrl} alt="" />
            <strong className="match-game-type">{match.queue.format}</strong>
            <figcaption>{selectedMap.name}</figcaption>
          </figure>
        )}
        {requiresFamilySharingDecision && (
          <p className="family-sharing-warning">
            Opponent is using family sharing, which means a higher likelihood of smurfing.
          </p>
        )}
        <div className="countdown">{remaining}s</div>
        <div className="modal-actions">
          <button className="secondary" type="button" onClick={() => void declineMatch()}>Decline Match</button>
          {requiresFamilySharingDecision && (
            <button className="primary" type="button" onClick={() => void acceptMatch()}>Accept Match</button>
          )}
        </div>
      </div>
    </div>
  );
}
