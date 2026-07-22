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
import { useAppStore } from "./state/appStore";
import { LogIn } from "lucide-react";

export function App() {
  if (new URLSearchParams(window.location.search).get("overlay") === "test") {
    return <TestOverlay />;
  }

  const { page, state, authStatus, authError, signInWithSteam } = useAppStore();

  if (authStatus !== "authenticated") {
    return (
      <>
        <main className="auth-screen">
          <div className="auth-card">
            <h1>Empire League</h1>
            <p>Sign in with Steam to use matchmaking and keep your rating tied to your account.</p>
            {authError && <div className="auth-error">{authError}</div>}
            <button
              className="primary large"
              type="button"
              disabled={authStatus === "loading" || authStatus === "authenticating"}
              onClick={() => void signInWithSteam()}
            >
              <LogIn size={20} />
              {authStatus === "loading" ? "Checking session…" : authStatus === "authenticating" ? "Waiting for Steam…" : "Sign in through Steam"}
            </button>
            {authStatus === "authenticating" && <span>Complete sign-in in your browser.</span>}
          </div>
        </main>
        <StartupGamePrompt />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}

function TestOverlay() {
  return (
    <main className="test-overlay">
      <div className="test-overlay__status"><span /> EMPIRE LEAGUE OVERLAY</div>
      <strong>Searching for an opponent</strong>
      <p>Queue time 00:42 · Ranked 1v1</p>
      <button type="button" onClick={() => void window.electronApi?.closeTestOverlay()}>Hide overlay</button>
    </main>
  );
}
