import { HomePage } from "./pages/HomePage";
import { QueuePage } from "./pages/QueuePage";
import { WeeklyPage } from "./pages/WeeklyPage";
import { TournamentsPage } from "./pages/TournamentsPage";
import { CustomPage } from "./pages/CustomPage";
import { MatchHistoryPage } from "./pages/MatchHistoryPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SocialPage, type FriendRequest, type SocialFriend, type FriendPresence } from "./pages/SocialPage";
import { ChatDock, type OpenChat } from "./components/social/ChatDock";
import { Shell } from "./components/layout/Shell";
import { MatchFoundOverlay } from "./components/match/MatchFoundOverlay";
import { Toasts } from "./components/common/Toasts";
import { WindowControls } from "./components/layout/WindowControls";
import { useAppStore } from "./state/appStore";
import { LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseTestPointerInfo } from "../shared/contracts/gameIntegration";
import loadingScreenArtwork from "./assets/el5-loading.png";
import { socialService } from "./services/socialService";
import { matchmakerTransport } from "./services/matchmakerTransport";
import { tournamentService } from "./services/tournamentService";
import { isPreviewMode } from "./previewMode";
import { previewFriendRequests, previewFriends } from "./mocks/previewData";

const permanentLoadingScreen = import.meta.env.VITE_PERMANENT_LOADING_SCREEN === "true";

export function App() {
  const [mouseTestActive, setMouseTestActive] = useState(false);
  const [startupScreenVisible, setStartupScreenVisible] = useState(!isPreviewMode);
  const [friends, setFriends] = useState<SocialFriend[]>(isPreviewMode ? previewFriends : []);
  const [requests, setRequests] = useState<FriendRequest[]>(isPreviewMode ? previewFriendRequests : []);
  const [outgoingRequestIds, setOutgoingRequestIds] = useState<string[]>([]);
  const [chats, setChats] = useState<OpenChat[]>([]);
  const chatsRef = useRef<OpenChat[]>([]);
  const notifiedTournamentMatchesRef = useRef(new Set<string>());
  useEffect(() => window.electronApi?.onMouseTestModeChanged(setMouseTestActive), []);
  useEffect(() => {
    if (permanentLoadingScreen) return;
    const timer = window.setTimeout(() => setStartupScreenVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const { page, setPage, state, lobbyAutomationActive, authStatus, authError, signInWithSteam, notify } = useAppStore();
  const rankedLobbyTransition = ["creating_lobby", "waiting_for_opponent", "verifying_lobby", "ready"].includes(state.queueStatus) && !state.error;
  const rankedInputGuardActive = ["match_found", "accepting"].includes(state.queueStatus) || rankedLobbyTransition;
  const gameInSession = state.queueStatus === "in_game" || state.gameStatus === "in_match";

  useEffect(() => {
    void window.electronApi?.setUpdateChecksPaused(gameInSession);
  }, [gameInSession]);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  useEffect(() => matchmakerTransport.onAdminMessage(({ message }) => {
    notify("Message from Empire League", "info", { detail: message, durationMs: 15_000 });
  }), [notify]);

  useEffect(() => {
    if (authStatus !== "authenticated") return () => undefined;
    const inspectTournament = (tournament: Awaited<ReturnType<typeof tournamentService.get>>) => {
      const readyMatch = tournament.matches.find((match) =>
        match.status === "waiting"
        && (match.playerOneId === state.currentUser.id || match.playerTwoId === state.currentUser.id)
      );
      if (!readyMatch) return;
      const notificationKey = `${readyMatch.id}:${readyMatch.readyDeadline ?? "waiting"}`;
      if (notifiedTournamentMatchesRef.current.has(notificationKey)) return;
      const playerReady = readyMatch.playerOneId === state.currentUser.id
        ? readyMatch.playerOneReady
        : readyMatch.playerTwoReady;
      if (playerReady) return;
      notifiedTournamentMatchesRef.current.add(notificationKey);
      notify("Your tournament match is ready.", "warning", {
        detail: `${tournament.name} is waiting for you. Ready up before the deadline.`,
        durationMs: 15_000,
        action: { label: "Open Tournament", run: () => setPage("tournaments") }
      });
    };
    void tournamentService.list().then((tournaments) => tournaments.forEach(inspectTournament)).catch(() => undefined);
    return tournamentService.onEvent((event) => {
      void tournamentService.get(event.tournamentId).then(inspectTournament).catch(() => undefined);
    });
  }, [authStatus, notify, setPage, state.currentUser.id]);

  useEffect(() => {
    const clearAttention = () => void window.electronApi?.clearUnreadMessageAlert();
    window.addEventListener("focus", clearAttention);
    return () => window.removeEventListener("focus", clearAttention);
  }, []);

  async function openChat(friend: SocialFriend) {
    const history = await socialService.getMessages(friend.id).catch(() => []);
    void socialService.markMessagesRead(friend.id);
    setChats((current) => {
      const existing = current.find((chat) => chat.friend.id === friend.id);
      if (existing) return current.map((chat) => chat.friend.id === friend.id ? { ...chat, minimized: false } : chat);
      return [...current.slice(-2), {
        friend,
        minimized: false,
        messages: history.map((message) => ({
          id: message.id,
          from: message.senderId === state.currentUser.id ? "me" as const : "friend" as const,
          text: message.text,
          time: new Date(message.sentAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        }))
      }];
    });
    setFriends((current) => current.map((item) => item.id === friend.id ? { ...item, unread: 0 } : item));
  }

  function activateChat(friendId: string) {
    setFriends((current) => current.map((friend) => friend.id === friendId ? { ...friend, unread: 0 } : friend));
    void socialService.markMessagesRead(friendId);
    void window.electronApi?.clearUnreadMessageAlert();
  }

  async function unfriend(friend: SocialFriend) {
    await socialService.removeFriend(friend.id);
    setChats((current) => current.filter((chat) => chat.friend.id !== friend.id));
  }

  async function acceptRequest(request: FriendRequest) {
    await socialService.acceptRequest(request.connectionId);
  }

  async function inviteFriend(name: string): Promise<string> {
    const normalizedName = name.trim().toLowerCase();
    if (normalizedName === state.currentUser.displayName.toLowerCase()) {
      throw new Error("You can’t send a friend invite to yourself.");
    }
    if (friends.some((friend) => friend.name.toLowerCase() === normalizedName)) {
      throw new Error(`${name.trim()} is already your friend.`);
    }
    if (requests.some((request) => request.name.toLowerCase() === normalizedName)) {
      throw new Error(`You already have a pending request from ${name.trim()}.`);
    }
    const player = await socialService.sendFriendRequest(name);
    return player.displayName;
  }

  useEffect(() => {
    if (isPreviewMode) return;
    if (authStatus !== "authenticated") return;
    const applySnapshot = (snapshot: import("./services/socialService").SocialSnapshot) => {
      setFriends((current) => snapshot.friends.map((friend) => ({
        ...friend,
        initials: initialsFor(friend.name),
        unread: friend.unread ?? current.find((item) => item.id === friend.id)?.unread ?? 0
      })));
      setRequests(snapshot.requests.map((request) => ({ ...request, initials: initialsFor(request.name) })));
      setOutgoingRequestIds(snapshot.outgoing.map((request) => request.id));
    };
    void socialService.getSnapshot().then(applySnapshot);
    return socialService.onEvent((event) => {
      if (event.type === "snapshot") applySnapshot(event.snapshot);
      if (event.type === "presence") {
        setFriends((current) => current.map((friend) => friend.id === event.playerId
          ? { ...friend, presence: event.presence, activity: event.activity, mapName: event.mapName }
          : friend));
        setChats((current) => current.map((chat) => chat.friend.id === event.playerId
          ? { ...chat, friend: { ...chat.friend, presence: event.presence, activity: event.activity, mapName: event.mapName } }
          : chat));
      }
      if (event.type === "message") {
        const message = event.message;
        const receivedMessage = {
          id: message.id,
          from: "friend" as const,
          text: message.text,
          time: new Date(message.sentAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        };
        const openChat = chatsRef.current.find((chat) => chat.friend.id === message.senderId && !chat.minimized);
        setChats((current) => {
          const open = current.some((chat) => chat.friend.id === message.senderId);
          if (!open) return current;
          return current.map((chat) => chat.friend.id === message.senderId ? {
            ...chat,
            messages: [...chat.messages, receivedMessage]
          } : chat);
        });
        if (openChat) {
          void socialService.markMessagesRead(message.senderId);
        } else {
          setFriends((items) => items.map((friend) => friend.id === message.senderId
            ? { ...friend, unread: (friend.unread ?? 0) + 1 }
            : friend));
          if (!document.hasFocus()) void window.electronApi?.alertUnreadMessage();
        }
      }
    });
  }, [authStatus, state.currentUser.id]);

  useEffect(() => {
    if (isPreviewMode) return;
    if (authStatus !== "authenticated") return;
    let idle = false;
    let idleTimer = 0;
    const publish = () => {
      const match = state.activeMatch;
      const inGame = state.queueStatus === "in_game" || state.gameStatus === "in_match";
      const presence: FriendPresence = inGame ? "in_game" : idle ? "idle" : "online";
      const activity = inGame
        ? `In game${match?.selectedMap?.name ? ` · ${match.selectedMap.name}` : ""}`
        : state.queueStatus === "searching" ? "Looking for a match"
        : idle ? "Idle" : "Online";
      void socialService.updatePresence(presence, activity, inGame ? match?.selectedMap?.name : undefined);
    };
    const resetIdle = () => {
      const wasIdle = idle;
      idle = false;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { idle = true; publish(); }, 5 * 60_000);
      if (wasIdle) publish();
    };
    const events = ["pointerdown", "keydown", "wheel"];
    events.forEach((event) => window.addEventListener(event, resetIdle, { passive: true }));
    resetIdle();
    publish();
    const heartbeat = window.setInterval(publish, 30_000);
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetIdle));
      window.clearTimeout(idleTimer);
      window.clearInterval(heartbeat);
    };
  }, [authStatus, state.queueStatus, state.gameStatus, state.activeMatch?.id, state.activeMatch?.selectedMap?.name]);

  if (startupScreenVisible || authStatus === "loading") {
    return (
      <>
        <WindowControls />
        <main className="auth-screen session-loading-screen" aria-label="Loading Empire League">
          <div className="session-loading-mark">
            <img className="session-loading-artwork" src={loadingScreenArtwork} alt="Empire League" />
            <div className="medieval-loader" role="status" aria-label="Loading">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (authStatus !== "authenticated") {
    return (
      <>
        <WindowControls />
        <main className="auth-screen">
          <div className="auth-card">
            <img className="auth-logo" src={loadingScreenArtwork} alt="Empire League" />
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
      </>
    );
  }

  return (
    <>
      <LobbyInputForwarding active={lobbyAutomationActive || rankedInputGuardActive} manageNativeLock={rankedInputGuardActive} />
      <Shell socialUnreadCount={friends.reduce((total, friend) => total + (friend.unread ?? 0), 0)}>
        {page === "home" && <HomePage />}
        {page === "ranked" && <QueuePage />}
        <div className="persistent-page" hidden={page !== "weekly"}>
          <WeeklyPage />
        </div>
        {page === "tournaments" && <TournamentsPage />}
        {page === "custom" && <CustomPage />}
        {page === "match-history" && <MatchHistoryPage />}
        {page === "leaderboard" && <LeaderboardPage />}
        {page === "profile" && (
          <ProfilePage
            friendIds={friends.map((friend) => friend.id)}
            outgoingRequestIds={outgoingRequestIds}
            onAddFriend={async (displayName) => {
              await inviteFriend(displayName);
            }}
          />
        )}
        {page === "social" && <SocialPage friends={friends} requests={requests} onMessage={(friend) => void openChat(friend)} onAccept={(request) => void acceptRequest(request)} onDecline={(id) => void socialService.declineRequest(requests.find((item) => item.id === id)?.connectionId ?? id)} onInvite={inviteFriend} onUnfriend={(friend) => void unfriend(friend)} />}
        {page === "settings" && <SettingsPage />}
      </Shell>
      {state.queueStatus === "match_found" && state.activeMatch && <MatchFoundOverlay />}
      <Toasts />
      <ChatDock
        chats={chats}
        onToggle={(id) => setChats((current) => current.map((chat) => chat.friend.id === id ? { ...chat, minimized: !chat.minimized } : chat))}
        onClose={(id) => setChats((current) => current.filter((chat) => chat.friend.id !== id))}
        onActivate={activateChat}
        onSend={(id, text) => void socialService.sendMessage(id, text).then((message) => setChats((current) => current.map((chat) => chat.friend.id === id ? {
          ...chat,
          messages: [...chat.messages, { id: message.id, from: "me", text: message.text, time: new Date(message.sentAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }]
        } : chat)))}
      />
      {mouseTestActive && <TestOverlay />}
    </>
  );
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? `${parts[0][0]}${parts.at(-1)?.[0]}` : name.slice(0, 2)).toUpperCase();
}

function LobbyInputForwarding({ active, manageNativeLock }: { active: boolean; manageNativeLock: boolean }) {
  const pointerElementRef = useRef<HTMLSpanElement | null>(null);
  const latestPointerRef = useRef<{ x: number; y: number; sequence: number } | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const { notify } = useAppStore();

  const clearPointer = () => {
    latestPointerRef.current = null;
    if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = null;
    pointerElementRef.current?.classList.remove("visible");
    document.documentElement.classList.remove("game-transition-input-forwarded");
  };

  useEffect(() => {
    const restoreNativeCursor = () => {
      // Alt-Tab can race the native game/app handoff. Clear the renderer's
      // synthetic cursor immediately on blur so Electron can never return
      // with both the native cursor hidden and no guarded pointer frames.
      clearPointer();
    };
    window.addEventListener("blur", restoreNativeCursor);
    return () => window.removeEventListener("blur", restoreNativeCursor);
  }, []);

  useEffect(() => {
    if (!active) {
      clearPointer();
      return;
    }
    if (manageNativeLock) void window.electronApi?.setLobbyInputLock(true);
    const removePointerListener = window.electronApi?.onLobbyGuardPointer((point) => {
      latestPointerRef.current = point;
      window.electronApi?.acknowledgeLobbyGuardPointer(point.sequence);
      if (pointerFrameRef.current !== null) return;
      pointerFrameRef.current = window.requestAnimationFrame(() => {
        pointerFrameRef.current = null;
        const latest = latestPointerRef.current;
        const element = pointerElementRef.current;
        if (!latest || !element) return;
        element.style.transform = `translate3d(${latest.x}px, ${latest.y}px, 0)`;
        element.classList.add("visible");
        document.documentElement.classList.add("game-transition-input-forwarded");
      });
    });
    (document.activeElement as HTMLElement | null)?.blur?.();
    return () => {
      clearPointer();
      if (manageNativeLock) void window.electronApi?.setLobbyInputLock(false);
      removePointerListener?.();
    };
  }, [active, manageNativeLock]);

  useEffect(() => {
    if (!active) return;
    const removeShortcutListener = window.electronApi?.onLobbyGuardShortcutBlocked(() => {
      notify(
        "Stay in Empire League while the lobby is being prepared.",
        "danger",
        {
          detail: "Keyboard shortcuts that switch away from Empire League are temporarily blocked so lobby automation can finish. Controls unlock automatically after the countdown.",
          durationMs: 6500
        }
      );
    });
    return removeShortcutListener;
  }, [active, notify]);

  if (!active) return null;
  return (
    <span
      ref={pointerElementRef}
      className="lobby-guard-pointer"
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
