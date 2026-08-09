import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import civBonuses from "../../../shared/civBonuses.json";
import type { CivilizationPreference } from "../../../shared/contracts/matchmaking";
import { getCatalogMap } from "../../../shared/mapCatalog";
import { maps } from "../../mocks/mockPlayers";
import { useAppStore } from "../../state/appStore";
import { MatchmakingBrand } from "./MatchmakingBrand";

type CivilizationName = keyof typeof civBonuses;

export function LobbyPreparation() {
  const { state, prepareLobby, localizeAoe2Name } = useAppStore();
  const inputLocked = !state.error;
  const match = state.activeMatch;
  const countdownMs = state.roomSetupEstimateMs ?? 60_000;
  const [remaining, setRemaining] = useState(() => getRemaining(state.roomSetupStartedAt, countdownMs));
  const selectedMap = maps.find((map) => map.id === match?.selectedMap?.id) ?? match?.selectedMap;
  const mapDescription = selectedMap ? getCatalogMap(selectedMap.id)?.description : undefined;
  const playerCivilization = resolveCivilization(
    match?.queue.civilizationPreference,
    match?.opponentCivilizationPreference
  );
  const opponentCivilization = resolveCivilization(
    match?.opponentCivilizationPreference,
    match?.queue.civilizationPreference
  );

  useEffect(() => {
    const update = () => setRemaining(getRemaining(state.roomSetupStartedAt, countdownMs));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [countdownMs, state.roomSetupStartedAt]);

  return (
    <section className="search-waiting-layout" aria-busy={inputLocked}>
      <div className="search-state">
        <span className="eyebrow">Preparing game</span>
        <h2>{remaining > 0 ? "Game starts in" : "Starting game…"}</h2>
        {remaining > 0 && <div className="lobby-countdown" aria-live="polite">{remaining}</div>}
        <div className="lobby-milestone" aria-live="polite">
          <Loader2 size={18} className="spin" aria-hidden="true" />
          <span>{state.roomSetupMilestone ?? "Preparing game"}</span>
        </div>
        {state.error && (
          <div className="error-panel">
            <strong>{state.error.message}</strong>
            <span>{state.error.technicalDetails}</span>
            <button type="button" onClick={() => void prepareLobby()}>Try Again</button>
          </div>
        )}
      </div>
      <MatchmakingBrand />
      <div className="civilization-matchup">
        <article className="upcoming-map-card">
          <span className="eyebrow">Map</span>
          <h3>{selectedMap ? localizeAoe2Name(selectedMap.name) : "Map pending"}</h3>
          {selectedMap?.thumbnailUrl ? (
            <img src={selectedMap.thumbnailUrl} alt={`Preview of ${selectedMap.name}`} />
          ) : (
            <div className="upcoming-map-placeholder">Map preview unavailable</div>
          )}
          {mapDescription && <p className="upcoming-map-description">{mapDescription}</p>}
        </article>
        <CivilizationBonuses civilization={playerCivilization} side="player" />
        <CivilizationBonuses civilization={opponentCivilization} side="opponent" />
      </div>
    </section>
  );
}

function resolveCivilization(
  preference?: CivilizationPreference,
  otherPreference?: CivilizationPreference
): CivilizationName | null {
  const selected = preference?.mode === "mirror" ? otherPreference?.civilization : preference?.civilization;
  return selected && selected in civBonuses ? selected as CivilizationName : null;
}

function CivilizationBonuses({
  civilization,
  side
}: {
  civilization: CivilizationName | null;
  side: "player" | "opponent";
}) {
  const { localizeAoe2Name } = useAppStore();
  const details = civilization ? civBonuses[civilization] : null;
  return (
    <article className={`civ-bonus-card ${side}`}>
      <span className="eyebrow">{side === "player" ? "Your civilization" : "Opponent civilization"}</span>
      <h3>{civilization ? localizeAoe2Name(civilization) : "Random civilization"}</h3>
      {details ? (
        <>
          <ul>{details.bonuses.map((bonus) => <li key={bonus}>{bonus}</li>)}</ul>
          <div className="team-bonus">
            <span>Team bonus</span>
            <p>{details.teamBonus}</p>
          </div>
        </>
      ) : (
        <p className="civ-bonus-unavailable">Bonuses will be revealed when the civilization is known.</p>
      )}
    </article>
  );
}

function getRemaining(startedAt: string | null, countdownMs: number): number {
  const countdownSeconds = Math.ceil(countdownMs / 1000);
  if (!startedAt) return countdownSeconds;
  const elapsedSeconds = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  return Math.max(0, countdownSeconds - elapsedSeconds);
}
