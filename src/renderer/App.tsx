import { HomePage } from "./pages/HomePage";
import { QueuePage } from "./pages/QueuePage";
import { MatchHistoryPage } from "./pages/MatchHistoryPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { Shell } from "./components/layout/Shell";
import { MatchFoundOverlay } from "./components/match/MatchFoundOverlay";
import { Toasts } from "./components/common/Toasts";
import { useAppStore } from "./state/appStore";

export function App() {
  if (new URLSearchParams(window.location.search).get("overlay") === "test") {
    return <TestOverlay />;
  }

  const { page, state } = useAppStore();

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
