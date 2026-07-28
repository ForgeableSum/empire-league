import { HomePage } from "./pages/HomePage";
import { QueuePage } from "./pages/QueuePage";
import { MatchHistoryPage } from "./pages/MatchHistoryPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { Shell } from "./components/layout/Shell";
import { MatchFoundOverlay } from "./components/match/MatchFoundOverlay";
import { Toasts } from "./components/common/Toasts";
import { StartupGamePrompt } from "./components/common/StartupGamePrompt";
import { RoomSetupRecoveryPrompt } from "./components/common/RoomSetupRecoveryPrompt";
import { WindowControls } from "./components/layout/WindowControls";
import { useAppStore } from "./state/appStore";
import { Loader2, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseTestPointerInfo } from "../shared/contracts/gameIntegration";
import loadingScreenArtwork from "./assets/el_icon.webp";

export function App() {
  const [mouseTestActive, setMouseTestActive] = useState(false);
  const [startupScreenVisible, setStartupScreenVisible] = useState(true);
  useEffect(() => window.electronApi?.onMouseTestModeChanged(setMouseTestActive), []);
  useEffect(() => {
    const timer = window.setTimeout(() => setStartupScreenVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const { page, state, authStatus, authError, signInWithSteam } = useAppStore();

  if (startupScreenVisible || authStatus === "loading") {
    return (
      <>
        <WindowControls />
        <main className="auth-screen session-loading-screen" aria-label="Loading Empire League">
          <div className="session-loading-mark">
            <img className="session-loading-artwork" src={loadingScreenArtwork} alt="Empire League" />
            <h1>Empire League</h1>
            <Loader2 className="spin" size={24} aria-hidden="true" />
          </div>
        </main>
        <StartupGamePrompt />
        <RoomSetupRecoveryPrompt />
      </>
    );
  }

  if (authStatus !== "authenticated") {
    return (
      <>
        <WindowControls />
        <main className="auth-screen">
          <div className="auth-card">
            <h1>Empire League</h1>
            <p>Sign in with Steam to use matchmaking and keep your rating tied to your account.</p>
            {authError && <div className="auth-error">{authError}</div>}
            <button
              className="primary large"
              type="button"
              disabled={authStatus === "authenticating"}
              onClick={() => void signInWithSteam()}
            >
              <LogIn size={20} />
              {authStatus === "authenticating" ? "Waiting for Steam…" : "Sign in through Steam"}
            </button>
            {authStatus === "authenticating" && <span>Complete sign-in in your browser.</span>}
          </div>
        </main>
        <StartupGamePrompt />
        <RoomSetupRecoveryPrompt />
      </>
    );
  }

  return (
    <>
      <LobbyInputForwarding locked={["creating_lobby", "waiting_for_opponent", "verifying_lobby", "ready"].includes(state.queueStatus) && !state.error} />
      <Shell>
        {page === "home" && <HomePage />}
        {page === "play" && <QueuePage />}
        {page === "match-history" && <MatchHistoryPage />}
        {page === "leaderboard" && <LeaderboardPage />}
        {page === "profile" && <ProfilePage />}
        {page === "settings" && <SettingsPage />}
      </Shell>
      {state.queueStatus === "match_found" && state.activeMatch && <MatchFoundOverlay />}
      <Toasts />
      <StartupGamePrompt />
      <RoomSetupRecoveryPrompt />
      {mouseTestActive && <TestOverlay />}
    </>
  );
}

function LobbyInputForwarding({ locked }: { locked: boolean }) {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!locked) {
      setPointer(null);
      return;
    }
    void window.electronApi?.setLobbyInputLock(true);
    const removePointerListener = window.electronApi?.onLobbyGuardPointer(setPointer);
    document.documentElement.classList.add("game-transition-input-forwarded");
    (document.activeElement as HTMLElement | null)?.blur?.();
    return () => {
      void window.electronApi?.setLobbyInputLock(false);
      removePointerListener?.();
      document.documentElement.classList.remove("game-transition-input-forwarded");
    };
  }, [locked]);

  if (!locked || !pointer) return null;
  return (
    <span
      className="lobby-guard-pointer"
      style={{ left: pointer.x, top: pointer.y }}
      aria-hidden="true"
    />
  );
}

function TestOverlay() {
  const [pointer, setPointer] = useState<MouseTestPointerInfo | null>(null);
  const [copiedCoordinates, setCopiedCoordinates] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("mouse-test-hud-active");
    document.body.classList.add("mouse-test-hud-active");
    const removePointerListener = window.electronApi?.onMouseTestPointer(setPointer);
    const removeCopiedListener = window.electronApi?.onMouseTestCoordinatesCopied((coordinates) => {
      setCopiedCoordinates(coordinates);
      window.setTimeout(() => setCopiedCoordinates(null), 1600);
    });
    return () => {
      removePointerListener?.();
      removeCopiedListener?.();
      document.documentElement.classList.remove("mouse-test-hud-active");
      document.body.classList.remove("mouse-test-hud-active");
    };
  }, []);

  return (
    <>
      <section className="mouse-test-hud">
        <div className="test-overlay__status"><span /> AOE2 MOUSE TEST MODE</div>
        <strong>Live pointer coordinates</strong>
        {pointer ? (
          <dl>
            <div><dt>Screen</dt><dd>{pointer.screenX}, {pointer.screenY}</dd></div>
            <div><dt>Client</dt><dd>{pointer.clientX}, {pointer.clientY}</dd></div>
            <div><dt>Design 3840×2160</dt><dd>{pointer.designX}, {pointer.designY}</dd></div>
            <div><dt>Client size</dt><dd>{pointer.clientWidth} × {pointer.clientHeight}</dd></div>
            <div><dt>Inside AoE2</dt><dd>{pointer.inside ? "Yes" : "No"}</dd></div>
          </dl>
        ) : <p>Waiting for pointer data…</p>}
        <div className="mouse-test-hotkey">
          <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd>
          <span>{copiedCoordinates ? `Copied all data at ${copiedCoordinates}` : "Copy all mouse data"}</span>
        </div>
        <div className="mouse-test-hotkey">
          <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>
          <span>Hide or show Empire League</span>
        </div>
        <small>Overlay is click-through. Alt+Tab to Empire League to stop the mode.</small>
      </section>
      {pointer?.inside && (
        <div
          className="mouse-test-crosshair"
          style={{ transform: `translate(${pointer.clientX}px, ${pointer.clientY}px)` }}
        >
          <span>{pointer.designX}, {pointer.designY}</span>
        </div>
      )}
    </>
  );
}

function LegacyTestOverlay() {
  return (
    <main className="test-overlay">
      <div className="test-overlay__status"><span /> EMPIRE LEAGUE OVERLAY</div>
      <strong>Searching for an opponent</strong>
      <p>Queue time 00:42 · Ranked 1v1</p>
      <button type="button">Legacy overlay</button>
    </main>
  );
}
