import { useEffect, useRef, useState } from "react";
import { maps } from "../../mocks/mockPlayers";
import { useAppStore } from "../../state/appStore";
import { useParty } from "../../state/partyContext";

export function MatchFoundOverlay() {
  const { state, acceptMatch, declineMatch } = useAppStore();
  const { snapshot } = useParty();
  const waitingForPartyLeader = Boolean(snapshot.party && !snapshot.party.isLeader);
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
    if (requiresFamilySharingDecision || waitingForPartyLeader) return;
    const delay = Math.max(0, deadline - Date.now());
    const autoAcceptTimer = window.setTimeout(() => {
      if (autoAcceptStarted.current) return;
      autoAcceptStarted.current = true;
      void acceptMatch();
    }, delay);
    return () => {
      window.clearTimeout(autoAcceptTimer);
    };
  }, [acceptMatch, deadline, requiresFamilySharingDecision, waitingForPartyLeader]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !waitingForPartyLeader) void declineMatch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [declineMatch, waitingForPartyLeader]);

  if (!match) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="match-found-title">
      <div className="match-modal">
        <span className="eyebrow">
          {requiresFamilySharingDecision ? "Decision required" : "Auto-accepting"}
        </span>
        <h2 id="match-found-title">Match Found</h2>
        {waitingForPartyLeader && <p>Your party leader is accepting this match for the whole party.</p>}
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
        {!waitingForPartyLeader && <div className="modal-actions">
          <button className="secondary" type="button" onClick={() => void declineMatch()}>Decline Match</button>
          {requiresFamilySharingDecision && (
            <button className="primary" type="button" onClick={() => void acceptMatch()}>Accept Match</button>
          )}
        </div>}
      </div>
    </div>
  );
}
