import { ArrowLeft, BarChart3, CalendarDays, Download, Gamepad2, History, Home, LogOut, RotateCcw, Swords, Settings, User, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import appIcon from "../../assets/el_icon_no_plume.png";
import { presenceService } from "../../services/presenceService";
import { useAppStore, type AppPage } from "../../state/appStore";
import { WindowControls } from "./WindowControls";
import { isPreviewMode } from "../../previewMode";
import type { PendingAppUpdate } from "../../../shared/contracts/electronApi";

const navItems: Array<{ page: AppPage; label: string; icon: ReactNode }> = [
  { page: "home", label: "Home", icon: <Home size={18} /> },
  { page: "ranked", label: "Ranked", icon: <Swords size={18} /> },
  { page: "weekly", label: "Weekly", icon: <CalendarDays size={18} /> },
  { page: "custom", label: "Custom", icon: <Gamepad2 size={18} /> },
  { page: "match-history", label: "Match History", icon: <History size={18} /> },
  { page: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={18} /> },
  { page: "profile", label: "Profile", icon: <User size={18} /> },
  { page: "social", label: "Social", icon: <Users size={18} /> },
  { page: "settings", label: "Settings", icon: <Settings size={18} /> }
];

export function Shell({ children, socialUnreadCount = 0 }: { children: ReactNode; socialUnreadCount?: number }) {
  const { page, setPage, state, customLobbyAutomationActive, signOut, selectedProfileId, openPlayerProfile, returnFromPlayerProfile } = useAppStore();
  const viewingLinkedProfile = page === "profile" && selectedProfileId !== null && selectedProfileId !== state.currentUser.id;
  const record = `${state.currentUser.wins}-${state.currentUser.losses}`;
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [pendingUpdate, setPendingUpdate] = useState<PendingAppUpdate | null>(null);
  const [installingUpdate, setInstallingUpdate] = useState(false);
  const [retryingUpdate, setRetryingUpdate] = useState(false);
  const [gameCountdownActive, setGameCountdownActive] = useState(false);

  useEffect(() => {
    const update = () => {
      const startedAt = state.roomSetupStartedAt;
      if (!startedAt || state.error) {
        setGameCountdownActive(false);
        return;
      }

      const estimateMs = state.roomSetupEstimateMs ?? 60_000;
      setGameCountdownActive(Date.now() < new Date(startedAt).getTime() + estimateMs);
    };

    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [state.error, state.roomSetupEstimateMs, state.roomSetupStartedAt]);

  useEffect(() => {
    let active = true;
    void window.electronApi?.getAppVersion().then((version) => {
      if (active) setAppVersion(version);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const electronApi = window.electronApi;
    if (!electronApi) return;
    let active = true;
    void electronApi.getPendingUpdate().then((update) => {
      if (active && update) setPendingUpdate(update);
    });
    const unsubscribe = electronApi.onUpdateReady((update) => {
      if (active) setPendingUpdate(update);
    });
    const unsubscribeDetected = electronApi.onUpdateDetected((update) => {
      if (active) setPendingUpdate(update);
    });
    return () => {
      active = false;
      unsubscribe();
      unsubscribeDetected();
    };
  }, []);

  async function restartForUpdate(): Promise<void> {
    if (!window.electronApi || installingUpdate) return;
    setInstallingUpdate(true);
    const started = await window.electronApi.installPendingUpdate().catch(() => false);
    if (!started) setInstallingUpdate(false);
  }

  async function retryUpdate(): Promise<void> {
    if (!window.electronApi || retryingUpdate) return;
    setRetryingUpdate(true);
    setPendingUpdate(null);
    const started = await window.electronApi.retryPendingUpdate().catch(() => false);
    if (!started) {
      const update = await window.electronApi.getPendingUpdate().catch(() => null);
      if (update?.status === "error") setPendingUpdate(update);
    }
    setRetryingUpdate(false);
  }

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
        {appVersion && <span className="window-title-version">v{appVersion}</span>}
        {pendingUpdate?.status === "downloading" && (
          <span className="window-title-version">
            Downloading v{pendingUpdate.version}{pendingUpdate.percent === undefined ? "…" : ` · ${pendingUpdate.percent}%`}
          </span>
        )}
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
              {item.page === "social" && socialUnreadCount > 0 && (
                <span className="nav-notification-badge" aria-label={`${socialUnreadCount} unread ${socialUnreadCount === 1 ? "message" : "messages"}`}>
                  {socialUnreadCount > 99 ? "99+" : socialUnreadCount}
                </span>
              )}
              {item.page === "ranked" && (state.queueStatus === "searching" || gameCountdownActive) && (
                <span
                  className="medieval-loader nav-search-loader"
                  role="status"
                  aria-label={state.queueStatus === "searching" ? "Searching for a match" : "Preparing game"}
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </span>
              )}
              {item.page === "custom" && customLobbyAutomationActive && (
                <span className="medieval-loader nav-search-loader" role="status" aria-label="Preparing custom game">
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
      {pendingUpdate && (pendingUpdate.status === "downloaded" || pendingUpdate.status === "error") && (
        <div className="modal-backdrop update-ready-backdrop" role="presentation">
          <section className="match-modal update-ready-modal" role="alertdialog" aria-modal="true" aria-labelledby="update-ready-title">
            <div className="update-ready-icon"><Download size={28} aria-hidden="true" /></div>
            <span className="eyebrow">{pendingUpdate.status === "error" ? "Update failed" : "Update downloaded"}</span>
            <h2 id="update-ready-title">{pendingUpdate.status === "error" ? "Update couldn't download" : "Update ready"}</h2>
            <p>{pendingUpdate.status === "error"
              ? `Empire League v${pendingUpdate.version} could not be downloaded automatically. Check your connection or security software, then retry or download the installer manually.`
              : `Empire League v${pendingUpdate.version} has been downloaded. Restart the application to complete the required update.`}</p>
            <div className="modal-actions update-ready-actions">
              {pendingUpdate.status === "error" && <>
                <button className="primary" type="button" disabled={retryingUpdate} onClick={() => void retryUpdate()} autoFocus>
                  <RotateCcw className={retryingUpdate ? "spin" : undefined} size={17} aria-hidden="true" />
                  {retryingUpdate ? "Retrying…" : "Retry download"}
                </button>
                <button className="secondary" type="button" onClick={() => void window.electronApi?.openUpdateDownload()}>
                  Download manually
                </button>
              </>}
              {pendingUpdate.status !== "error" && (
              <button className="primary" type="button" disabled={installingUpdate} onClick={() => void restartForUpdate()} autoFocus>
                <RotateCcw className={installingUpdate ? "spin" : undefined} size={17} aria-hidden="true" />
                {installingUpdate ? "Restarting…" : "Restart and update"}
              </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function titleFor(page: AppPage): string {
  return {
    home: "Home",
    ranked: "Ranked",
    weekly: "Weekly Queue",
    custom: "Custom Games",
    "match-history": "Match History",
    leaderboard: "Leaderboard",
    profile: "Player Profile",
    social: "Social",
    settings: "Settings"
  }[page];
}
