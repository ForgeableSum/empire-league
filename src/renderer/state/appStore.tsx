import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MatchResult } from "../../shared/contracts/matches";
import type { GameInputResult } from "../../shared/contracts/gameIntegration";
import type { LobbySession, MatchSession, QueueDefinition } from "../../shared/contracts/matchmaking";
import { getDivisionForRating } from "../../shared/contracts/matchmaking";
import { maps, currentUser } from "../mocks/mockPlayers";
import { mockMatches } from "../mocks/mockMatches";
import { defaultMockServiceConfig } from "../mocks/mockServiceConfig";
import { MockGameIntegrationService } from "../services/gameIntegrationService";
import { LocalMatchmakingService, MockMatchmakingService } from "../services/matchmakingService";
import { MockMatchResultService } from "../services/matchResultService";
import { nowLog } from "../services/timing";
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
}

const settingsKey = "empire-league-settings";
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
  startWithWindows: false,
  linkedIdentity: "Steam placeholder",
  displayName: currentUser.displayName
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
  const [state, setState] = useState<AppState>(() => ({
    currentUser,
    queueStatus: "idle",
    selectedQueue: null,
    queueStartedAt: null,
    activeMatch: null,
    recentMatches: mockMatches,
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
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lobbyAutomationRef = useRef<Promise<GameInputResult> | null>(null);

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
    if (!state.settings.autoLaunch) return;

    let cancelled = false;

    async function autoLaunchAoe2(): Promise<void> {
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

        const result = await window.electronApi.launchAoe2();
        if (!result.launched) {
          throw new Error(result.message ?? "Steam did not accept the AoE2 DE launch request.");
        }

        if (!cancelled) {
          setState((previous) => ({
            ...previous,
            gameStatus: "running",
            settings: { ...previous.settings, aoePath: installation.path as string }
          }));
          window.localStorage.setItem(settingsKey, JSON.stringify({ ...state.settings, aoePath: installation.path }));
          notify("Launching AoE2 DE…", "success", {
            detail: "Steam received the launch request.",
            durationMs: 5000
          });
        }
      } catch (error) {
        if (!cancelled) {
          notify(error instanceof Error ? error.message : "AoE2 DE could not be launched.", "danger");
        }
      }
    }

    void autoLaunchAoe2();
    return () => {
      cancelled = true;
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
    options: { detail?: string; durationMs?: number } = {}
  ): void {
    setState((previous) => ({
      ...previous,
      notifications: [{
        id: crypto.randomUUID(),
        message,
        tone,
        detail: options.detail,
        durationMs: options.durationMs ?? (tone === "danger" ? 8000 : 5000)
      }, ...previous.notifications].slice(0, 4)
    }));
  }

  function setError(error: AppError): void {
    setState((previous) => ({ ...previous, error, queueStatus: "error" }));
    notify(error.message, "danger");
  }

  async function startQueue(queue: QueueDefinition): Promise<void> {
    try {
      const ticket = await services.matchmaking.joinQueue({ queueId: queue.id, queue, player: state.currentUser, canHost: true });
      ticketRef.current = ticket.id;
      setState((previous) => ({
        ...previous,
        selectedQueue: queue,
        queueStartedAt: ticket.joinedAt,
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
          const matchedSession = {
            ...event.match,
            player: state.currentUser,
            status: event.match.role === "host" ? "creating_lobby" as const : "waiting_for_opponent" as const
          };
          setState((previous) => ({
            ...previous,
            queueStatus: event.match.role === "host" ? "creating_lobby" : "waiting_for_opponent",
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
            activeMatch: previous.activeMatch
              ? { ...previous.activeMatch, lobby: event.lobby, status: "ready" }
              : null
          }));
          log(`Host published lobby: ${event.lobby.platformLobbyId ?? "pending"}`);
          notify("The host created the AoE2 lobby", "success");
          if (event.lobby.platformLobbyId?.startsWith("aoe2de://0/") && window.electronApi) {
            void window.electronApi.openAoe2Lobby(event.lobby.platformLobbyId).then((result) => {
              log(result.opened ? "Opening the host lobby in AoE2" : "The host lobby URI was rejected");
              if (!result.opened) notify("The host lobby could not be opened", "danger");
            });
          }
        }
        if (event.type === "error") {
          setError({ code: event.code, message: event.message, retryable: true });
        }
      });
    } catch (error) {
      setError({
        code: "QUEUE_JOIN_FAILED",
        message: "Matchmaking is currently unavailable.",
        technicalDetails: error instanceof Error ? error.message : undefined,
        retryable: true
      });
    }
  }

  async function cancelQueue(): Promise<void> {
    if (ticketRef.current) {
      await services.matchmaking.leaveQueue(ticketRef.current);
    }
    unsubscribeRef.current?.();
    ticketRef.current = null;
    setState((previous) => ({ ...previous, queueStatus: "cancelled", selectedQueue: null, queueStartedAt: null }));
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
    if (state.activeMatch) {
      await services.matchmaking.declineMatch(state.activeMatch.id);
    }
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
        // Lifecycle timing test intentionally disabled until real game-start and
        // game-end detection can trigger the fullscreen and victory transitions.
        // await window.electronApi.showAoe2FullscreenAfterDelay();
        setState((previous) => ({
          ...previous,
          activeMatch: previous.activeMatch ? { ...previous.activeMatch, lobby: discoveredLobby } : null,
          queueStatus: "waiting_for_opponent"
        }));
        await services.game.waitForGameStart(discoveredLobby.platformLobbyId);
        log("Opponent joined");
        setState((previous) => ({ ...previous, queueStatus: "verifying_lobby" }));
        await services.game.verifyLobby(discoveredLobby.platformLobbyId);
        log("Lobby verified");
        notify("Lobby created and verified", "success");
        setState((previous) => ({
          ...previous,
          queueStatus: "ready",
          gameStatus: "in_lobby",
          activeMatch: previous.activeMatch
            ? { ...previous.activeMatch, lobby: verifiedLobby(discoveredLobby), status: "ready" }
            : null
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
    dismissNotification: (id) =>
      setState((previous) => ({ ...previous, notifications: previous.notifications.filter((item) => item.id !== id) })),
    clearError: () => setState((previous) => ({ ...previous, error: null, queueStatus: "idle" }))
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
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
