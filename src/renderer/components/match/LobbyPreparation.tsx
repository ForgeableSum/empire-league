import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import civBonuses from "../../../shared/civBonuses.json";
import type { CivilizationPreference } from "../../../shared/contracts/matchmaking";
import { lobbySetupCountdownMs } from "../../../shared/runtimeConfig";
import { useAppStore } from "../../state/appStore";
import { YouTubeShorts } from "./YouTubeShorts";

const setupCountdownSeconds = Math.ceil(lobbySetupCountdownMs / 1000);
type CivilizationName = keyof typeof civBonuses;

export function LobbyPreparation() {
  const { state, prepareLobby } = useAppStore();
  const [remaining, setRemaining] = useState(() => getRemaining(state.roomSetupStartedAt));
  const match = state.activeMatch;
  const playerCivilization = resolveCivilization(
    match?.queue.civilizationPreference,
    match?.opponentCivilizationPreference
  );
  const opponentCivilization = resolveCivilization(
    match?.opponentCivilizationPreference,
    match?.queue.civilizationPreference
  );

  useEffect(() => {
    const update = () => setRemaining(getRemaining(state.roomSetupStartedAt));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [state.roomSetupStartedAt]);

  return (
    <section className="search-waiting-layout">
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
      <YouTubeShorts />
      <div className="civilization-matchup">
        <CivilizationBonuses civilization={playerCivilization} side="player" />
        <div className="civilization-versus" aria-hidden="true">VS</div>
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
  const details = civilization ? civBonuses[civilization] : null;
  return (
    <article className={`civ-bonus-card ${side}`}>
      <span className="eyebrow">{side === "player" ? "Your civilization" : "Opponent civilization"}</span>
      <h3>{civilization ?? "Random civilization"}</h3>
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

function getRemaining(startedAt: string | null): number {
  if (!startedAt) return setupCountdownSeconds;
  const elapsedSeconds = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  return Math.max(0, setupCountdownSeconds - elapsedSeconds);
}
