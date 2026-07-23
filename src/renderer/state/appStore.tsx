import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MatchResult } from "../../shared/contracts/matches";
import { lobbySetupTiming } from "../../shared/runtimeConfig";
import type { GameInputResult } from "../../shared/contracts/gameIntegration";
import type { LobbySession, MatchSession, QueueDefinition } from "../../shared/contracts/matchmaking";
import { getDivisionForRating } from "../../shared/contracts/matchmaking";
import { maps, currentUser } from "../mocks/mockPlayers";
import { defaultMockServiceConfig } from "../mocks/mockServiceConfig";
import { MockGameIntegrationService } from "../services/gameIntegrationService";
import { LocalMatchmakingService, MockMatchmakingService } from "../services/matchmakingService";
import { MockMatchResultService } from "../services/matchResultService";
import { nowLog } from "../services/timing";
import { authService } from "../services/authService";
import { matchHistoryService } from "../services/matchHistoryService";
import type { AppError, AppState, MockServiceConfig, NotificationItem, UserSettings } from "./types";

type AppPage = "home" | "play" | "match-history" | "leaderboard" | "profile" | "settings";

interface AppContextValue {
  state: AppState;
  page: AppPage;
  setPage: (page: AppPage) => void;
  queues: QueueDefinition[];
  startQueue: (queue: QueueDefinition) => Promise<void>;
  cancelQueue: () => Promise<void>;
  acceptMatch: () => Promise<void>;
  declineMatch: () => Promise<void>;
  prepareLobby: (matchOverride?: MatchSession) => Promise<void>;
  openAoe2: () => Promise<void>;
  simulateMatchEnd: () => Promise<void>;
  updateMockConfig: (patch: Partial<MockServiceConfig>) => void;
  updateSettings: (patch: Partial<UserSettings>) => void;
  dismissNotification: (id: string) => void;
  clearError: () => void;
  authStatus: "loading" | "unauthenticated" | "authenticating" | "authenticated";
  authError: string | null;
  signInWithSteam: () => Promise<void>;
  signOut: () => Promise<void>;
  startupGamePrompt: "restart" | "force-close" | null;
  respondToStartupGamePrompt: (confirmed: boolean) => void;
  roomSetupFailed: boolean;
  exitAfterRoomSetupFailure: (restart: boolean) => Promise<void>;
}

const settingsKey = "empire-league-settings";
const aoe2PostWindowReadyDelayMs = 7000;
const roomSetupTimeoutMs = 65_000;
const defaultSettings: UserSettings = {
  aoePath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\AoE2DE",
  autoDetect: true,
  autoLaunch: true,
  focusWhenReady: true,
  displayMode: "Borderless",
  replayDetection: true,
  replayFolder: "",
  serverRegion: "US East",
  acceptSound: true,
  matchNotifications: true,
  maxInitialRange: 50,
  autoExpandRange: true,
  rematchOffers: true,
  soundVolume: 45,
  reducedMotion: false,
  compactLayout: false,
  minimizeOnStart: false,
  startWithWindows: false
};

export const queueDefinitions: QueueDefinition[] = [
  {
    id: "ranked-rm-1v1",
    name: "Ranked 1v1 Random Map",
    description: "Primary prototype queue with ranked settings, hidden civilizations, and verified results.",
    format: "1v1",
    ruleset: "Random Map",
    mapPool: maps,
    ranked: true,
    estimatedWaitSeconds: 65,
    playersSearching: 128
  },
  {
    id: "team-games",
    name: "Team Games",
    description: "Find a match for solo, two-player, or three-player teams.",
    format: "1v1",
    ruleset: "Random Map",
    mapPool: maps,
    ranked: false,
    estimatedWaitSeconds: 90,
    playersSearching: 42
  }
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<AppPage>("home");
  const [authStatus, setAuthStatus] = useState<AppContextValue["authStatus"]>("loading");
  const [authError, setAuthError] = useState<string | null>(null);
  const [state, setState] = useState<AppState>(() => ({
    currentUser,
    queueStatus: "idle",
    selectedQueue: null,
    queueStartedAt: null,
    roomSetupStartedAt: null,
    roomSetupMilestone: null,
    activeMatch: null,
    recentMatches: [],
    connectionStatus: "online",
    gameStatus: "installed",
    searchRange: { min: currentUser.rating - 50, max: currentUser.rating + 50 },
    error: null,
    notifications: [],
    eventLog: [],
    mockConfig: defaultMockServiceConfig,
    settings: loadSettings()
  }));

  const configRef = useRef(state.mockConfig);
  configRef.current = state.mockConfig;
  const ticketRef = useRef<string | null>(null);
  const queueJoinInFlightRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lobbyAutomationRef = useRef<Promise<GameInputResult> | null>(null);
  const roomSetupTimeoutRef = useRef<number | null>(null);
  const startupPromptResolverRef = useRef<((confirmed: boolean) => void) | null>(null);
  const [startupGamePrompt, setStartupGamePrompt] = useState<AppContextValue["startupGamePrompt"]>(null);
  const [roomSetupFailed, setRoomSetupFailed] = useState(false);

  const services = useMemo(
    () => ({
      matchmaking: import.meta.env.DEV
        ? new LocalMatchmakingService()
        : new MockMatchmakingService(() => configRef.current),
      game: new MockGameIntegrationService(() => configRef.current),
      results: new MockMatchResultService(() => configRef.current)
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;
    void authService.restore().then((player) => {
      if (cancelled) return;
      if (player) {
        void matchHistoryService.getMine().then((recentMatches) => {
          if (!cancelled) setState((previous) => ({ ...previous, currentUser: player, recentMatches }));
        }).catch(() => {
          if (!cancelled) setState((previous) => ({ ...previous, currentUser: player, recentMatches: [] }));
        });
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("unauthenticated");
      }
    }).catch((error) => {
      if (cancelled) return;
      setAuthError(error instanceof Error ? error.message : "Could not restore the Steam session.");
      setAuthStatus("unauthenticated");
    });
    return () => { cancelled = true; };
  }, []);

  async function signInWithSteam(): Promise<void> {
    setAuthStatus("authenticating");
    setAuthError(null);
    try {
      const player = await authService.signIn();
      const recentMatches = await matchHistoryService.getMine();
      setState((previous) => ({ ...previous, currentUser: player, recentMatches }));
      setAuthStatus("authenticated");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Steam sign-in failed.");
      setAuthStatus("unauthenticated");
    }
  }

  async function signOut(): Promise<void> {
    clearRoomSetupWatchdog();
    if (ticketRef.current) await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
    unsubscribeRef.current?.();
    ticketRef.current = null;
    queueJoinInFlightRef.current = false;
    await authService.logout();
    setState((previous) => ({ ...previous, currentUser, queueStatus: "idle", selectedQueue: null, activeMatch: null }));
    setAuthStatus("unauthenticated");
    setPage("home");
  }

  useEffect(() => {
    if (!state.settings.autoLaunch) return;

    let cancelled = false;

    async function autoLaunchAoe2(): Promise<void> {
      let loadingNotificationId: string | null = null;
      try {
        if (!window.electronApi) {
          throw new Error("The Electron game integration bridge is unavailable.");
        }

        const installation = await window.electronApi.detectAoe2Installation();
        if (!installation.installed || !installation.path) {
          if (!cancelled) {
            notify(installation.message ?? "AoE2 DE was not detected, so it was not launched.", "warning");
          }
          return;
        }

        const existingProcess = await window.electronApi.detectAoe2Process();
        if (existingProcess.running) {
          const shouldRestart = await requestStartupGameConfirmation("restart");
          if (!shouldRestart) {
            await window.electronApi.quitApp();
            return;
          }

          const gracefulClose = await window.electronApi.closeAoe2(false);
          if (!gracefulClose.closed) {
            const shouldForceClose = await requestStartupGameConfirmation("force-close");
            if (!shouldForceClose) {
              await window.electronApi.quitApp();
              return;
            }
            const forcedClose = await window.electronApi.closeAoe2(true);
            if (!forcedClose.closed) {
              throw new Error(forcedClose.message ?? "AoE2 could not be closed.");
            }
          }
        }

        setState((previous) => ({ ...previous, gameStatus: "loading" }));
        loadingNotificationId = notify("Loading AoE2 DE…", "loading", {
          detail: "Waiting for the game window to become ready.",
          durationMs: null
        });

        const result = await window.electronApi.launchAoe2();
        if (!result.launched) {
          throw new Error(result.message ?? "Steam did not accept the AoE2 DE launch request.");
        }

        const ready = await waitForAoe2Window(120_000);
        if (!ready) throw new Error("AoE2 started, but its game window did not become ready in time.");

        if (loadingNotificationId) {
          updateNotification(loadingNotificationId, { detail: "Finishing game startup." });
        }
        await delayForStartup(aoe2PostWindowReadyDelayMs);

        if (!cancelled) {
          setState((previous) => ({
            ...previous,
            gameStatus: "running",
            settings: { ...previous.settings, aoePath: installation.path as string }
          }));
          window.localStorage.setItem(settingsKey, JSON.stringify({ ...state.settings, aoePath: installation.path }));
          if (loadingNotificationId) {
            updateNotification(loadingNotificationId, {
              message: "AoE2 DE is ready",
              tone: "success",
              detail: undefined,
              durationMs: 5000
            });
          }
        }
      } catch (error) {
        if (!cancelled) {
          if (loadingNotificationId) dismissNotificationById(loadingNotificationId);
          setState((previous) => ({ ...previous, gameStatus: "installed" }));
          notify(error instanceof Error ? error.message : "AoE2 DE could not be launched.", "danger");
        }
      }
    }

    const startupTimer = window.setTimeout(() => void autoLaunchAoe2(), 0);
    return () => {
      cancelled = true;
      window.clearTimeout(startupTimer);
    };
    // Auto-launch is intentionally evaluated once when the app starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function log(message: string): void {
    setState((previous) => ({ ...previous, eventLog: [nowLog(message), ...previous.eventLog].slice(0, 80) }));
  }

  function notify(
    message: string,
    tone: NotificationItem["tone"] = "info",
    options: { detail?: string; durationMs?: number | null } = {}
  ): string {
    const id = crypto.randomUUID();
    setState((previous) => ({
      ...previous,
      notifications: [{
        id,
        message,
        tone,
        detail: options.detail,
        durationMs: options.durationMs === undefined ? (tone === "danger" ? 8000 : 5000) : options.durationMs
      }, ...previous.notifications].slice(0, 4)
    }));
    return id;
  }

  function requestStartupGameConfirmation(prompt: NonNullable<AppContextValue["startupGamePrompt"]>): Promise<boolean> {
    return new Promise((resolve) => {
      startupPromptResolverRef.current = resolve;
      setStartupGamePrompt(prompt);
    });
  }

  function respondToStartupGamePrompt(confirmed: boolean): void {
    const resolve = startupPromptResolverRef.current;
    startupPromptResolverRef.current = null;
    setStartupGamePrompt(null);
    resolve?.(confirmed);
  }

  function startRoomSetupWatchdog(): void {
    clearRoomSetupWatchdog();
    roomSetupTimeoutRef.current = window.setTimeout(() => {
      roomSetupTimeoutRef.current = null;
      setRoomSetupFailed(true);
    }, roomSetupTimeoutMs);
  }

  function clearRoomSetupWatchdog(): void {
    if (roomSetupTimeoutRef.current === null) return;
    window.clearTimeout(roomSetupTimeoutRef.current);
    roomSetupTimeoutRef.current = null;
  }

  async function exitAfterRoomSetupFailure(restart: boolean): Promise<void> {
    clearRoomSetupWatchdog();
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    if (ticketRef.current) {
      await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
      ticketRef.current = null;
    }
    if (!window.electronApi) return;
    if (restart) await window.electronApi.restartApp();
    else await window.electronApi.quitApp();
  }

  function dismissNotificationById(id: string): void {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.filter((item) => item.id !== id)
    }));
  }

  function updateNotification(id: string, patch: Partial<Omit<NotificationItem, "id">>): void {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.map((item) => item.id === id ? { ...item, ...patch } : item)
    }));
  }

  function setError(error: AppError): void {
    setState((previous) => ({ ...previous, error, queueStatus: "error" }));
    notify(error.message, "danger");
  }

  async function startQueue(queue: QueueDefinition): Promise<void> {
    const canStartQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
      && (!state.activeMatch || state.queueStatus === "completed");
    if (state.gameStatus === "loading" || !canStartQueue || queueJoinInFlightRef.current) return;
    queueJoinInFlightRef.current = true;
    try {
      if (ticketRef.current) {
        await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
        unsubscribeRef.current?.();
        unsubscribeRef.current = null;
        ticketRef.current = null;
      }
      const ticket = await services.matchmaking.joinQueue({ queueId: queue.id, queue, player: state.currentUser, canHost: true });
      ticketRef.current = ticket.id;
      setRoomSetupFailed(false);
      setState((previous) => ({
        ...previous,
        selectedQueue: queue,
        queueStartedAt: ticket.joinedAt,
        roomSetupStartedAt: null,
        roomSetupMilestone: null,
        queueStatus: "searching",
        activeMatch: null,
        error: null
      }));
      setPage("play");
      log(`Joined queue ${queue.id}`);
      notify("Queue started", "success");
      unsubscribeRef.current = services.matchmaking.subscribeToQueue(ticket.id, (event) => {
        if (event.type === "range") {
          setState((previous) => ({ ...previous, searchRange: { min: event.minRating, max: event.maxRating } }));
        }
        if (event.type === "match_found") {
          startRoomSetupWatchdog();
          const matchedSession = {
            ...event.match,
            player: state.currentUser,
            status: event.match.role === "host" ? "creating_lobby" as const : "waiting_for_opponent" as const
          };
          setState((previous) => ({
            ...previous,
            queueStatus: event.match.role === "host" ? "creating_lobby" : "waiting_for_opponent",
            roomSetupStartedAt: new Date().toISOString(),
            roomSetupMilestone: event.match.role === "host"
              ? "Setting up lobby room"
              : "Waiting for the host to set up the lobby room",
            activeMatch: matchedSession
          }));
          log(`Match found: ${event.match.id}`);
          notify("Match found", "warning");
          if (event.match.role === "host" && window.electronApi) {
            log("Assigned as host; starting AoE2 lobby automation");
            lobbyAutomationRef.current = window.electronApi.runAoe2CreateLobbySequence();
            void prepareLobby(matchedSession);
          }
        }
        if (event.type === "lobby_ready") {
          setState((previous) => ({
            ...previous,
            queueStatus: "ready",
            gameStatus: "in_lobby",
            roomSetupMilestone: "Joining lobby room",
            activeMatch: previous.activeMatch
              ? { ...previous.activeMatch, lobby: event.lobby, status: "ready" }
              : null
          }));
          log(`Host published lobby: ${event.lobby.platformLobbyId ?? "pending"}`);
          if (event.lobby.platformLobbyId?.startsWith("aoe2de://0/") && window.electronApi) {
            void window.electronApi.openAoe2Lobby(event.lobby.platformLobbyId).then(async (result) => {
              log(result.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected");
              if (result.opened) {
                log("Guest lobby opened; clicking Ready");
                const ready = await window.electronApi!.runAoe2LobbyCursorAction("guest-ready");
                if (!ready.sent) throw new Error(ready.message);
                log("Guest Ready click sent; reporting readiness to the host");
                await services.matchmaking.reportGuestLobbyReady(event.matchId);
                log("Guest readied and notified the host");
                setState((previous) => ({
                  ...previous,
                  roomSetupMilestone: "Ready — waiting for the host to start"
                }));
              } else {
                notify("The host lobby could not be opened", "danger");
              }
            }).catch((error: unknown) => {
              log(`Opening the host lobby failed: ${error instanceof Error ? error.message : "Unknown error"}`);
              notify("The host lobby could not be opened", "danger");
            });
          }
        }
        if (event.type === "guest_lobby_ready" && window.electronApi) {
          setState((previous) => ({
            ...previous,
            roomSetupMilestone: "Opponent ready — starting game"
          }));
          void (async () => {
            try {
              log("Guest reported ready; clicking Ready for the host");
              const ready = await window.electronApi!.runAoe2LobbyCursorAction("host-ready");
              if (!ready.sent) throw new Error(ready.message);
              log("Host Ready click sent; waiting for the Start button state to settle");
              await delayForLobbyInput(lobbySetupTiming.hostReadyToStartMs);
              log("Host readied; clicking Start Game");
              const start = await window.electronApi!.runAoe2LobbyCursorAction("start");
              if (!start.sent) throw new Error(start.message);
              clearRoomSetupWatchdog();
              setState((previous) => ({
                ...previous,
                queueStatus: "ready",
                gameStatus: "in_match",
                roomSetupMilestone: "Starting game",
                activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "ready" } : null
              }));
              await services.matchmaking.reportGameStarted(event.matchId);
              void revealAoe2AfterGameStart();
            } catch (error) {
              log(`Automated host start failed: ${error instanceof Error ? error.message : "Unknown error"}`);
              notify("The automated game start failed", "danger");
            }
          })();
        }
        if (event.type === "game_started") {
          clearRoomSetupWatchdog();
          setState((previous) => ({
            ...previous,
            queueStatus: "ready",
            gameStatus: "in_match",
            roomSetupMilestone: "Starting game",
            activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "ready" } : null
          }));
          log("Host started the game");
          void revealAoe2AfterGameStart();
        }
        if (event.type === "error") {
          if (event.code === "MATCH_DECLINED") {
            clearRoomSetupWatchdog();
            queueJoinInFlightRef.current = false;
            if (ticketRef.current) {
              void services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
              ticketRef.current = null;
            }
            unsubscribeRef.current?.();
            unsubscribeRef.current = null;
          }
          setError({ code: event.code, message: event.message, retryable: true });
        }
      });
    } catch (error) {
      queueJoinInFlightRef.current = false;
      setError({
        code: "QUEUE_JOIN_FAILED",
        message: "Matchmaking is currently unavailable.",
        technicalDetails: error instanceof Error ? error.message : undefined,
        retryable: true
      });
    }
  }

  async function cancelQueue(): Promise<void> {
    clearRoomSetupWatchdog();
    if (ticketRef.current) {
      await services.matchmaking.leaveQueue(ticketRef.current);
    }
    unsubscribeRef.current?.();
    ticketRef.current = null;
    queueJoinInFlightRef.current = false;
    setState((previous) => ({
      ...previous,
      queueStatus: "cancelled",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupMilestone: null
    }));
    log("Queue cancelled");
  }

  async function acceptMatch(): Promise<void> {
    if (!state.activeMatch) return;
    try {
      setState((previous) => ({
        ...previous,
        queueStatus: "accepting",
        activeMatch: previous.activeMatch
          ? { ...previous.activeMatch, acceptedByPlayer: true, status: "accepting" }
          : null
      }));
      log("Local player accepted");
      await services.matchmaking.acceptMatch(state.activeMatch.id);
    } catch (error) {
      setError({
        code: "MATCH_ACCEPT_FAILED",
        message: "The match could not be accepted.",
        technicalDetails: error instanceof Error ? error.message : undefined,
        retryable: true
      });
    }
  }

  async function declineMatch(): Promise<void> {
    clearRoomSetupWatchdog();
    if (state.activeMatch) {
      await services.matchmaking.declineMatch(state.activeMatch.id);
    }
    if (ticketRef.current) await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    ticketRef.current = null;
    queueJoinInFlightRef.current = false;
    setState((previous) => ({ ...previous, queueStatus: "cancelled", activeMatch: null }));
    log("Match declined");
  }

  async function prepareLobby(matchOverride?: MatchSession): Promise<void> {
    const match = matchOverride ?? state.activeMatch;
    if (!match?.selectedMap) return;
    try {
      setPage("play");
      setState((previous) => ({ ...previous, queueStatus: "creating_lobby" }));
      log("Detecting AoE2 installation");
      const install = await services.game.detectInstallation();
      if (!install.installed) throw new Error("AoE2 installation not detected.");
      log("Installation detected");
      await services.game.detectRunningGame();
      log("AoE2 process found");
      await services.game.launchGame();
      log("Opening multiplayer menu");
      if (window.electronApi) {
        const automation = await (lobbyAutomationRef.current ?? window.electronApi.runAoe2CreateLobbySequence());
        lobbyAutomationRef.current = null;
        if (!automation.sent) throw new Error(automation.message);
        if (!automation.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
        log("AoE2 host-lobby sequence completed");
        log(`Lobby URI discovered: ${automation.lobbyUri}`);
        const lobbyResult = await services.game.createLobby({
          matchId: match.id,
          hostProfileId: match.player.aoeProfileId,
          guestProfileId: match.opponent.aoeProfileId,
          map: match.selectedMap,
          serverRegion: state.settings.serverRegion
        });
        const discoveredLobby = { ...lobbyResult.lobby, platformLobbyId: automation.lobbyUri };
        log(`Lobby created: ${discoveredLobby.platformLobbyId}`);
        await services.matchmaking.publishLobby(match.id, discoveredLobby);
        log("Lobby details published to opponent");
        setState((previous) => ({
          ...previous,
          activeMatch: previous.activeMatch ? { ...previous.activeMatch, lobby: discoveredLobby } : null,
          queueStatus: "waiting_for_opponent",
          roomSetupMilestone: "Waiting for opponent to join"
        }));
        return;
      }
      const lobbyResult = await services.game.createLobby({
        matchId: match.id,
        hostProfileId: match.player.aoeProfileId,
        guestProfileId: match.opponent.aoeProfileId,
        map: match.selectedMap,
        serverRegion: state.settings.serverRegion
      });
      log(`Lobby created: ${lobbyResult.lobby.platformLobbyId ?? "pending"}`);
      await services.matchmaking.publishLobby(match.id, lobbyResult.lobby);
      log("Lobby details published to opponent");
      setState((previous) => ({
        ...previous,
        activeMatch: previous.activeMatch ? { ...previous.activeMatch, lobby: lobbyResult.lobby } : null,
        queueStatus: "waiting_for_opponent"
      }));
      log("Opponent invited");
      await services.game.waitForGameStart(lobbyResult.lobby.platformLobbyId ?? match.id);
      log("Opponent joined");
      setState((previous) => ({ ...previous, queueStatus: "verifying_lobby" }));
      await services.game.verifyLobby(lobbyResult.lobby.platformLobbyId ?? match.id);
      log("Lobby verified");
      notify("Lobby created and verified", "success");
      setState((previous) => ({
        ...previous,
        queueStatus: "ready",
        gameStatus: "in_lobby",
        activeMatch: previous.activeMatch
          ? { ...previous.activeMatch, lobby: verifiedLobby(lobbyResult.lobby), status: "ready" }
          : null
      }));
    } catch (error) {
      setError({
        code: "LOBBY_PREPARATION_FAILED",
        message: "We could not create the AoE2 lobby.",
        technicalDetails: error instanceof Error ? error.message : undefined,
        retryable: true
      });
    }
  }

  async function openAoe2(): Promise<void> {
    await services.game.focusGame();
    setState((previous) => ({ ...previous, queueStatus: "in_game", gameStatus: "in_match" }));
    log("Focused AoE2");
    if (state.activeMatch) {
      await services.results.beginTracking(state.activeMatch);
    }
  }

  async function simulateMatchEnd(): Promise<void> {
    const match = state.activeMatch;
    if (!match) return;
    try {
      setState((previous) => ({ ...previous, queueStatus: "verifying_result" }));
      log("Game finished");
      const result = await services.results.waitForVerifiedResult(match.id);
      completeResult(result);
    } catch (error) {
      setError({
        code: "RESULT_VERIFICATION_FAILED",
        message: "The result service could not verify this match.",
        technicalDetails: error instanceof Error ? error.message : undefined,
        retryable: true
      });
    }
  }

  function completeResult(result: MatchResult): void {
    queueJoinInFlightRef.current = false;
    setState((previous) => {
      const activeMatch = previous.activeMatch ? { ...previous.activeMatch, result, status: "completed" as const } : null;
      const updatedUser = {
        ...previous.currentUser,
        rating: result.newRating,
        division: getDivisionForRating(result.newRating),
        wins: result.outcome === "win" ? previous.currentUser.wins + 1 : previous.currentUser.wins,
        losses: result.outcome === "loss" ? previous.currentUser.losses + 1 : previous.currentUser.losses,
        streak: result.outcome === "win" ? Math.max(1, previous.currentUser.streak + 1) : -1
      };
      const summary = activeMatch
        ? {
            id: activeMatch.id,
            opponent: activeMatch.opponent.displayName,
            opponentRating: activeMatch.opponent.rating,
            outcome: result.outcome,
            map: activeMatch.selectedMap?.name ?? "Arabia",
            civilization: "Mayans",
            opponentCivilization: "Franks",
            ratingChange: result.ratingChange,
            durationMinutes: 24,
            timestamp: new Date().toISOString(),
            verified: result.verified,
            queueType: activeMatch.queue.name
          }
        : null;
      return {
        ...previous,
        currentUser: updatedUser,
        activeMatch,
        queueStatus: "completed",
        gameStatus: "installed",
        recentMatches: summary ? [summary, ...previous.recentMatches] : previous.recentMatches
      };
    });
    log("Match result verified");
    notify("Match result verified", "success");
  }

  function updateMockConfig(patch: Partial<MockServiceConfig>): void {
    setState((previous) => ({ ...previous, mockConfig: { ...previous.mockConfig, ...patch } }));
  }

  async function revealAoe2AfterGameStart(): Promise<void> {
    if (!window.electronApi) return;
    await delayForLobbyInput(lobbySetupTiming.revealAfterStartMs);
    await window.electronApi.focusAoe2();
    setState((previous) => ({
      ...previous,
      queueStatus: "in_game",
      roomSetupMilestone: null,
      activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "in_game" } : null
    }));
    log("Showing AoE2 after game start");
  }

  function updateSettings(patch: Partial<UserSettings>): void {
    setState((previous) => {
      const settings = { ...previous.settings, ...patch };
      window.localStorage.setItem(settingsKey, JSON.stringify(settings));
      return { ...previous, settings };
    });
  }

  const value: AppContextValue = {
    state,
    page,
    setPage,
    queues: queueDefinitions,
    startQueue,
    cancelQueue,
    acceptMatch,
    declineMatch,
    prepareLobby,
    openAoe2,
    simulateMatchEnd,
    updateMockConfig,
    updateSettings,
    dismissNotification: dismissNotificationById,
    clearError: () => setState((previous) => ({ ...previous, error: null, queueStatus: "idle" })),
    authStatus,
    authError,
    signInWithSteam,
    signOut,
    startupGamePrompt,
    respondToStartupGamePrompt,
    roomSetupFailed,
    exitAfterRoomSetupFailure
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

async function waitForAoe2Window(timeoutMs: number): Promise<boolean> {
  if (!window.electronApi) return false;
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const process = await window.electronApi.detectAoe2Process();
    if (process.running && process.windowReady) return true;
    await new Promise((resolve) => window.setTimeout(resolve, 500));
  }
  return false;
}

function delayForStartup(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function delayForLobbyInput(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function useAppStore(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppStore must be used inside AppProvider");
  }
  return context;
}

function loadSettings(): UserSettings {
  try {
    const raw = window.localStorage.getItem(settingsKey);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function verifiedLobby(lobby: LobbySession): LobbySession {
  return {
    ...lobby,
    verification: {
      correctPlayers: true,
      correctMap: true,
      correctSettings: true,
      cheatsDisabled: true,
      recordingEnabled: true,
      noUnexpectedPlayers: true
    }
  };
}

export type { AppPage };
