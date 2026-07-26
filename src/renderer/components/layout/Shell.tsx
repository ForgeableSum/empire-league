import { BarChart3, History, Home, LogOut, Play, Settings, User } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import appIcon from "../../assets/el-2.png";
import { presenceService } from "../../services/presenceService";
import { useAppStore, type AppPage } from "../../state/appStore";
import { WindowControls } from "./WindowControls";

const navItems: Array<{ page: AppPage; label: string; icon: ReactNode }> = [
  { page: "home", label: "Home", icon: <Home size={18} /> },
  { page: "play", label: "Play", icon: <Play size={18} /> },
  { page: "match-history", label: "Match History", icon: <History size={18} /> },
  { page: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={18} /> },
  { page: "profile", label: "Profile", icon: <User size={18} /> },
  { page: "settings", label: "Settings", icon: <Settings size={18} /> }
];

export function Shell({ children }: { children: ReactNode }) {
  const { page, setPage, state, signOut } = useAppStore();
  const record = `${state.currentUser.wins}-${state.currentUser.losses}`;
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);

  useEffect(() => {
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
              onClick={() => setPage(item.page)}
            >
              {item.icon}
              <span>{item.label}</span>
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
          <header className="topbar">
            <div>
              <h1>{titleFor(page)}</h1>
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

function titleFor(page: AppPage): string {
  return {
    home: "Home",
    play: "Play",
    "match-history": "Match History",
    leaderboard: "Leaderboard",
    profile: "Player Profile",
    settings: "Settings"
  }[page];
}
