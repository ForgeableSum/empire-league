import { BarChart3, History, Home, Play, Settings, User } from "lucide-react";
import type { ReactNode } from "react";
import appIcon from "../../assets/el-2.png";
import { useAppStore, type AppPage } from "../../state/appStore";

const navItems: Array<{ page: AppPage; label: string; icon: ReactNode }> = [
  { page: "home", label: "Home", icon: <Home size={18} /> },
  { page: "play", label: "Play", icon: <Play size={18} /> },
  { page: "match-history", label: "Match History", icon: <History size={18} /> },
  { page: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={18} /> },
  { page: "profile", label: "Profile", icon: <User size={18} /> },
  { page: "settings", label: "Settings", icon: <Settings size={18} /> }
];

export function Shell({ children }: { children: ReactNode }) {
  const { page, setPage, state } = useAppStore();
  const record = `${state.currentUser.wins}-${state.currentUser.losses}`;

  return (
    <div className="app-shell">
      <div className="window-title">
        <img src={appIcon} alt="" />
        <span>Empire League - AoE2 DE</span>
      </div>
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
          <div><span>Season</span><strong>Summer Anvil</strong></div>
          <div><span>Online</span><strong>8,314 players</strong></div>
          <div><span>Connection</span><strong className={`status-${state.connectionStatus}`}>{state.connectionStatus}</strong></div>
          <div><span>Version</span><strong>0.1.0</strong></div>
        </div>
        <div className="user-block">
          <div className="avatar">{state.currentUser.displayName.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{state.currentUser.displayName}</strong>
            <span>{state.currentUser.rating} Elo · {record}</span>
          </div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div>
            <h1>{titleFor(page)}</h1>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function titleFor(page: AppPage): string {
  return {
    home: "Competitive Home",
    play: "Play 1v1",
    "match-history": "Match History",
    leaderboard: "Leaderboard",
    profile: "Player Profile",
    settings: "Settings"
  }[page];
}
