import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import civBonuses from "../../../shared/civBonuses.json";
import type { CivilizationPreference } from "../../../shared/contracts/matchmaking";
import { useAppStore } from "../../state/appStore";
import { YouTubeShorts } from "./YouTubeShorts";

type CivilizationName = keyof typeof civBonuses;

export function LobbyPreparation() {
  const { state, prepareLobby } = useAppStore();
  const inputLocked = !state.error;
  const match = state.activeMatch;
  const countdownMs = state.roomSetupEstimateMs ?? 60_000;
  const [remaining, setRemaining] = useState(() => getRemaining(state.roomSetupStartedAt, countdownMs));
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

  useEffect(() => {
    if (!inputLocked) return;
    void window.electronApi?.setLobbyInputLock(true);
    const preventInput = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const options = { capture: true, passive: false } as const;
    const events = ["keydown", "keyup", "mousedown", "mouseup", "click", "dblclick", "wheel", "contextmenu", "touchstart", "touchend"] as const;
    events.forEach((eventName) => window.addEventListener(eventName, preventInput, options));
    document.documentElement.classList.add("game-transition-input-locked");
    (document.activeElement as HTMLElement | null)?.blur?.();
    return () => {
      void window.electronApi?.setLobbyInputLock(false);
      events.forEach((eventName) => window.removeEventListener(eventName, preventInput, options));
      document.documentElement.classList.remove("game-transition-input-locked");
    };
  }, [inputLocked]);

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
        {inputLocked && (
          <div className="lobby-input-lock-notice" role="status">
            Inputs are locked until the game is ready
          </div>
        )}
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

function getRemaining(startedAt: string | null, countdownMs: number): number {
  const countdownSeconds = Math.ceil(countdownMs / 1000);
  if (!startedAt) return countdownSeconds;
  const elapsedSeconds = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  return Math.max(0, countdownSeconds - elapsedSeconds);
}
