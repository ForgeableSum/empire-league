import { ArrowLeft, BarChart3, Gamepad2, History, Home, LogOut, Swords, Settings, User, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import appIcon from "../../assets/el_icon_no_plume.png";
import { presenceService } from "../../services/presenceService";
import { useAppStore, type AppPage } from "../../state/appStore";
import { WindowControls } from "./WindowControls";
import { isPreviewMode } from "../../previewMode";

const navItems: Array<{ page: AppPage; label: string; icon: ReactNode }> = [
  { page: "home", label: "Home", icon: <Home size={18} /> },
  { page: "ranked", label: "Ranked", icon: <Swords size={18} /> },
  { page: "custom", label: "Custom", icon: <Gamepad2 size={18} /> },
  { page: "match-history", label: "Match History", icon: <History size={18} /> },
  { page: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={18} /> },
  { page: "profile", label: "Profile", icon: <User size={18} /> },
  { page: "social", label: "Social", icon: <Users size={18} /> },
  { page: "settings", label: "Settings", icon: <Settings size={18} /> }
];

export function Shell({ children }: { children: ReactNode }) {
  const { page, setPage, state, signOut, selectedProfileId, openPlayerProfile, returnFromPlayerProfile } = useAppStore();
  const viewingLinkedProfile = page === "profile" && selectedProfileId !== null && selectedProfileId !== state.currentUser.id;
  const record = `${state.currentUser.wins}-${state.currentUser.losses}`;
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);

  useEffect(() => {
    if (isPreviewMode) return;
    let cancelled = false;
    const refresh = () => {
      void presenceService.getOnlinePlayerCount()
        .then((count) => {
          if (!cancelled) setOnlinePlayers(count);
        })
        .catch(() => {
          if (!cancelled) setOnlinePlayers(null);
        });
    };
    refresh();
    const interval = window.setInterval(refresh, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="window-title">
        <img src={appIcon} alt="" />
        <span>Empire League - AoE2:DE Community Client &amp; Matchmaker</span>
      </div>
      <WindowControls />
      <aside className="sidebar">
        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={page === item.page ? "nav-item active" : "nav-item"}
              type="button"
              onClick={() => item.page === "profile" ? openPlayerProfile(state.currentUser.id) : setPage(item.page)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.page === "ranked" && state.queueStatus === "searching" && (
                <span className="medieval-loader nav-search-loader" role="status" aria-label="Searching for a match">
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-meta">
          <div><span>Season</span><strong>1</strong></div>
          {onlinePlayers !== null && onlinePlayers >= 300 && (
            <div>
              <span>Online</span>
              <strong>{onlinePlayers.toLocaleString()} players</strong>
            </div>
          )}
          <div><span>Connection</span><strong className={`status-${state.connectionStatus}`}>{state.connectionStatus}</strong></div>
          <div><span>Version</span><strong>0.1.0</strong></div>
        </div>
        <div className="user-block">
          <div className="avatar">
            {state.currentUser.avatarUrl
              ? <img src={state.currentUser.avatarUrl} alt="" />
              : state.currentUser.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <strong>{state.currentUser.displayName}</strong>
            <span>{state.currentUser.rating} Elo · {record}</span>
          </div>
          <button className="icon-button" type="button" aria-label="Sign out" title="Sign out" onClick={() => void signOut()}>
            <LogOut size={16} />
          </button>
        </div>
      </aside>
      <main className={`main-area page-${page}`}>
        <div className="content-shell">
          <header className={viewingLinkedProfile ? "topbar linked-profile-topbar" : "topbar"}>
            {viewingLinkedProfile && (
              <button className="secondary profile-header-back" type="button" onClick={returnFromPlayerProfile}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <div>
              <h1>{titleFor(page)}</h1>
            </div>
          </header>
          {children}
          <footer className="legal-footer">
            Age of Empires II © Microsoft Corporation. Empire League is an independent community project and is not endorsed by or affiliated with Microsoft.
          </footer>
        </div>
      </main>
    </div>
  );
}

function titleFor(page: AppPage): string {
  return {
    home: "Home",
    ranked: "Ranked",
    custom: "Custom",
    "match-history": "Match History",
    leaderboard: "Leaderboard",
    profile: "Player Profile",
    social: "Social",
    settings: "Settings"
  }[page];
}
