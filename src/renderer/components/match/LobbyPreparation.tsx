import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { lobbySetupCountdownMs } from "../../../shared/runtimeConfig";
import { useAppStore } from "../../state/appStore";
import { YouTubeShorts } from "./YouTubeShorts";

const setupCountdownSeconds = Math.ceil(lobbySetupCountdownMs / 1000);

export function LobbyPreparation() {
  const { state, openAoe2, prepareLobby } = useAppStore();
  const [remaining, setRemaining] = useState(() => getRemaining(state.roomSetupStartedAt));

  useEffect(() => {
    const update = () => setRemaining(getRemaining(state.roomSetupStartedAt));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [state.roomSetupStartedAt]);

  return (
    <section className="search-waiting-layout">
      <div className="search-state">
        <span className="eyebrow">Lobby preparation</span>
        <h2>{remaining > 0 ? "Game starts in" : "Starting game…"}</h2>
        {remaining > 0 && (
          <div className="lobby-countdown" aria-live="polite">{remaining}</div>
        )}
        <div className="lobby-milestone" aria-live="polite">
          <Loader2 size={18} className="spin" aria-hidden="true" />
          <span>{remaining > 0 ? (state.roomSetupMilestone ?? "Preparing game") : "Starting game…"}</span>
        </div>
        {state.error && (
          <div className="error-panel">
            <strong>{state.error.message}</strong>
            <span>{state.error.technicalDetails}</span>
            <button type="button" onClick={() => void prepareLobby()}>Try Again</button>
          </div>
        )}
        {state.queueStatus === "ready" && (
          <button className="primary wide" type="button" onClick={() => void openAoe2()}>Open AoE2</button>
        )}
      </div>
      <YouTubeShorts />
    </section>
  );
}

function getRemaining(startedAt: string | null): number {
  if (!startedAt) return setupCountdownSeconds;
  const elapsedSeconds = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  return Math.max(0, setupCountdownSeconds - elapsedSeconds);
}
