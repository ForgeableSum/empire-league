import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { aoe2UiManifest } from "../../shared/aoe2UiManifest";
import { isAoe2LanguageId } from "../../shared/aoe2Languages";
import type { MatchResult } from "../../shared/contracts/matches";
import { customContentHostRecoveryMs, lobbySetupTiming } from "../../shared/runtimeConfig";
import type { GameInputResult } from "../../shared/contracts/gameIntegration";
import type { LobbySession, MapDefinition, MatchSession, QueueDefinition } from "../../shared/contracts/matchmaking";
import { getDivisionForRating } from "../../shared/contracts/matchmaking";
import type { PlayerProfile } from "../../shared/contracts/players";
import type { Aoe2Localization } from "../../shared/contracts/localization";
import { getCatalogMap, mapCatalog } from "../../shared/mapCatalog";
import { maps, currentUser } from "../mocks/mockPlayers";
import { defaultMockServiceConfig } from "../mocks/mockServiceConfig";
import { MockGameIntegrationService } from "../services/gameIntegrationService";
import { LocalMatchmakingService, MockMatchmakingService, type AutomationFailureReport } from "../services/matchmakingService";
import { MockMatchResultService } from "../services/matchResultService";
import { nowLog } from "../services/timing";
import { authService } from "../services/authService";
import { matchHistoryService } from "../services/matchHistoryService";
import { parseReplayMetadata, ReplayNotFinishedError } from "../services/replayMetadataService";
import { estimateLobbySetupMs, recordLobbySetupDuration } from "../services/lobbyTimingService";
import { stopYouTubeShorts } from "../services/shortsPlaybackService";
import type { AppError, AppState, MockServiceConfig, NotificationItem, UserSettings } from "./types";
import { isPreviewCapture, isPreviewMode, previewPage } from "../previewMode";
import { previewMatches } from "../mocks/previewData";

type AppPage = "home" | "ranked" | "weekly" | "custom" | "match-history" | "leaderboard" | "profile" | "social" | "settings";

function isAppPage(value: string | null): value is AppPage {
  return value === "home" || value === "ranked" || value === "weekly" || value === "custom" || value === "match-history"
    || value === "leaderboard" || value === "profile" || value === "social" || value === "settings";
}

interface AppContextValue {
  state: AppState;
  lobbyAutomationActive: boolean;
  setLobbyAutomationActive: (active: boolean) => void;
  customLobbyAutomationActive: boolean;
  setCustomLobbyAutomationActive: (active: boolean) => void;
  claimCustomLobbyAutomationStep: (key: string) => boolean;
  releaseCustomLobbyAutomationStep: (key: string) => void;
  clearCustomLobbyAutomationSteps: (roomId: string) => void;
  weeklyQueueActive: boolean;
  setWeeklyQueueActive: (active: boolean) => void;
  page: AppPage;
  setPage: (page: AppPage) => void;
  selectedProfileId: string | null;
  openPlayerProfile: (playerId: string) => void;
  returnFromPlayerProfile: () => void;
  queues: QueueDefinition[];
  aoe2Language: string;
  aoe2LanguageCode: string;
  aoe2LanguageId: number | null;
  localizeAoe2Name: (canonicalName: string) => string;
  localizeAoe2MapDescription: (canonicalName: string, fallback: string) => string;
  getLocalizedAoe2CivilizationBonuses: (canonicalName: string) => Aoe2Localization["civilizationBonuses"][string] | undefined;
  ensureAoe2Ready: (purpose?: "matchmaking" | "custom") => Promise<boolean>;
  startQueue: (queue: QueueDefinition) => Promise<void>;
  updateActiveQueue: (queue: QueueDefinition) => Promise<void>;
  cancelQueue: () => Promise<void>;
  acceptMatch: () => Promise<void>;
  declineMatch: () => Promise<void>;
  prepareLobby: (matchOverride?: MatchSession) => Promise<void>;
  openAoe2: () => Promise<void>;
  simulateMatchEnd: () => Promise<void>;
  returnToMatchmaking: () => Promise<void>;
  updateMockConfig: (patch: Partial<MockServiceConfig>) => void;
  updateSettings: (patch: Partial<UserSettings>) => void;
  setAoe2LanguageOverride: (languageId: number | null) => Promise<void>;
  openExternalUrl: (url: string) => Promise<void>;
  notify: (
    message: string,
    tone?: NotificationItem["tone"],
    options?: { detail?: string; durationMs?: number | null; dismissible?: boolean; action?: NotificationItem["action"]; secondaryAction?: NotificationItem["secondaryAction"] }
  ) => string;
  appendDiagnosticLog: (message: string) => void;
  dismissNotification: (id: string) => void;
  clearError: () => void;
  authStatus: "loading" | "unauthenticated" | "authenticating" | "authenticated";
  authError: string | null;
  signInWithSteam: () => Promise<void>;
  signOut: () => Promise<void>;
}

const settingsKey = "empire-league-settings";
const aoe2PostWindowReadyDelayMs = 7000;
const aoe2LaunchAttemptTimeoutMs = 30_000;
const aoe2LanguageInitialRefreshDelayMs = 15_000;
const aoe2LanguageRefreshIntervalMs = 5_000;
const aoe2LanguageRefreshDurationMs = 5 * 60_000;
const roomSetupTimeoutMs = 65_000;
const roomSetupEstimateMarginMs = 15_000;

function isLobbyAutomationProgress(message: string): boolean {
  if (message.includes("INPUT_GUARD|GUARD_HEALTH")) return false;
  return message.includes("SEQUENCE|")
    || message.includes("MAP_SELECT|")
    || message.includes("CIV_SELECT|")
    || message.includes("CURSOR_ACTION|")
    || message.includes("START_RETRY|");
}

const defaultSettings: UserSettings = {
  launchAoe2OnStartup: false,
  matchNotifications: true,
  autoRejectFamilySharing: false,
  maximumLowerOpponentRatingGap: 0,
  aoe2LanguageOverrideId: null
};

export const queueDefinitions: QueueDefinition[] = [
  {
    id: "ranked-rm-1v1",
    name: "Ranked 1v1 Random Map",
    description: "Ranked 1v1 Random Map.",
    format: "1v1",
    ruleset: "Random Map",
    mapPool: maps,
    mapPreferences: {
      enabledGroupIds: mapCatalog.groups.map((group) => group.id),
      favoriteMapIds: {}
    },
    mapCatalogVersion: mapCatalog.version,
    ranked: true,
    estimatedWaitSeconds: 65,
    playersSearching: 128
  },
  {
    id: "team-games",
    name: "Team Games",
    description: "Find a match for solo, two-player, or three-player teams.",
    format: "team",
    teamSizes: [2, 4],
    ruleset: "Random Map",
    mapPool: maps,
    mapPreferences: {
      enabledGroupIds: mapCatalog.groups.map((group) => group.id),
      favoriteMapIds: {}
    },
    mapCatalogVersion: mapCatalog.version,
    ranked: false,
    estimatedWaitSeconds: 90,
    playersSearching: 42
  }
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [aoe2Localization, setAoe2Localization] = useState<Aoe2Localization>({
    languageId: null,
    languageCode: "en",
    languageName: "English",
    names: {},
    mapDescriptions: {},
    civilizationBonuses: {}
  });
  const [lobbyAutomationActive, setLobbyAutomationActive] = useState(false);
  const [customLobbyAutomationActive, setCustomLobbyAutomationActive] = useState(false);
  const [weeklyQueueActive, setWeeklyQueueActive] = useState(false);
  const [incompatibleUiMods, setIncompatibleUiMods] = useState<string[]>([]);
  const [disablingUiMods, setDisablingUiMods] = useState(false);
  const [page, setPage] = useState<AppPage>(() => isAppPage(previewPage) ? previewPage : "home");
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [profileReturnPage, setProfileReturnPage] = useState<AppPage>("leaderboard");
  const profileReturnScrollRef = useRef(0);
  const pendingScrollRestoreRef = useRef<{ page: AppPage; top: number } | null>(null);
  const [authStatus, setAuthStatus] = useState<AppContextValue["authStatus"]>(isPreviewMode ? "authenticated" : "loading");
  const [authError, setAuthError] = useState<string | null>(null);
  const [state, setState] = useState<AppState>(() => ({
    currentUser,
    queueStatus: "idle",
    selectedQueue: null,
    queueStartedAt: null,
    roomSetupStartedAt: null,
    roomSetupEstimateMs: null,
    roomSetupMilestone: null,
    transitionInputLocked: false,
    activeMatch: null,
    recentMatches: isPreviewMode ? previewMatches : [],
    connectionStatus: "online",
    gameStatus: "installed",
    searchRange: { min: currentUser.rating - 50, max: currentUser.rating + 50 },
    error: null,
    notifications: isPreviewMode && !isPreviewCapture ? [{
      id: "preview-data-notice",
      tone: "info",
      message: "Preview mode",
      detail: "All accounts, ratings, matches, messages, and lobbies use dummy data.",
      durationMs: null,
      dismissible: true
    }] : [],
    eventLog: [],
    mockConfig: defaultMockServiceConfig,
    settings: loadSettings()
  }));

  const aoe2LocalizationRefreshTimerRef = useRef<number | null>(null);
  const aoe2LocalizationRefreshDeadlineRef = useRef<number | null>(null);

  async function refreshAoe2Localization(currentSessionOnly = false, reportResult = false): Promise<boolean> {
    if (!window.electronApi) return false;
    const localization = await window.electronApi.getAoe2Localization(currentSessionOnly);
    if (currentSessionOnly && localization.languageId === null) {
      if (reportResult) log("AOE2_LANGUAGE|Detected=false|Source=current-session|Reason=authoritative-entry-not-available");
      return false;
    }
    setAoe2Localization(localization);
    const overrideId = stateRef.current.settings.aoe2LanguageOverrideId;
    if (currentSessionOnly && overrideId !== null && localization.languageId !== overrideId) {
      updateSettings({ aoe2LanguageOverrideId: null });
      log(`AOE2_LANGUAGE|Override=false|Reason=detected-language-changed|PreviousId=${overrideId}|DetectedId=${localization.languageId}`);
    }
    if (reportResult) {
      log(`AOE2_LANGUAGE|Detected=${localization.languageId !== null}|Source=${currentSessionOnly ? "current-session" : "retained-log"}|Id=${localization.languageId ?? "none"}|Code=${localization.languageCode}|Name=${localization.languageName}`);
    }
    return localization.languageId !== null;
  }

  function armAoe2LocalizationRefresh(delayMs: number): void {
    aoe2LocalizationRefreshTimerRef.current = window.setTimeout(() => {
      aoe2LocalizationRefreshTimerRef.current = null;
      void refreshAoe2Localization(true, true).then((detected) => {
        if (detected) {
          aoe2LocalizationRefreshDeadlineRef.current = null;
          log("AOE2_LANGUAGE|Polling=false|Reason=detected");
          return;
        }
        const deadline = aoe2LocalizationRefreshDeadlineRef.current;
        if (deadline !== null && Date.now() < deadline) {
          armAoe2LocalizationRefresh(aoe2LanguageRefreshIntervalMs);
          return;
        }
        aoe2LocalizationRefreshDeadlineRef.current = null;
        log("AOE2_LANGUAGE|Polling=false|Reason=timeout");
      }).catch((error: unknown) => {
        log(`AOE2_LANGUAGE|Detected=false|Source=current-session|Error=${error instanceof Error ? error.message : "unknown"}`);
        const deadline = aoe2LocalizationRefreshDeadlineRef.current;
        if (deadline !== null && Date.now() < deadline) {
          armAoe2LocalizationRefresh(aoe2LanguageRefreshIntervalMs);
        } else {
          aoe2LocalizationRefreshDeadlineRef.current = null;
          log("AOE2_LANGUAGE|Polling=false|Reason=timeout");
        }
      });
    }, delayMs);
  }

  function scheduleAoe2LocalizationRefresh(): void {
    if (aoe2LocalizationRefreshDeadlineRef.current !== null) return;
    aoe2LocalizationRefreshDeadlineRef.current = Date.now() + aoe2LanguageRefreshDurationMs;
    log(`AOE2_LANGUAGE|Scheduled=true|InitialDelayMs=${aoe2LanguageInitialRefreshDelayMs}|RetryMs=${aoe2LanguageRefreshIntervalMs}|DurationMs=${aoe2LanguageRefreshDurationMs}`);
    armAoe2LocalizationRefresh(aoe2LanguageInitialRefreshDelayMs);
  }

  useEffect(() => {
    if (!window.electronApi) return;
    const refreshOnFocus = () => void refreshAoe2Localization().catch(() => undefined);
    const overrideId = stateRef.current.settings.aoe2LanguageOverrideId;
    const initialLocalization = overrideId === null
      ? refreshAoe2Localization(false, true)
      : window.electronApi.getAoe2Localization(true).then(async (detected) => {
        if (detected.languageId !== null && detected.languageId !== overrideId) {
          updateSettings({ aoe2LanguageOverrideId: null });
          setAoe2Localization(detected);
          log(`AOE2_LANGUAGE|Override=false|Reason=detected-language-changed|PreviousId=${overrideId}|DetectedId=${detected.languageId}`);
          return true;
        }
        const localization = await window.electronApi!.setAoe2LanguageOverride(overrideId);
        setAoe2Localization(localization);
        log(`AOE2_LANGUAGE|Override=true|Id=${localization.languageId}|Code=${localization.languageCode}|Name=${localization.languageName}`);
        return true;
      });
    void initialLocalization.catch((error: unknown) => {
      log(`AOE2_LANGUAGE|Detected=false|Source=initialization|Error=${error instanceof Error ? error.message : "unknown"}`);
    });
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, []);

  useEffect(() => () => {
    if (aoe2LocalizationRefreshTimerRef.current !== null) {
      window.clearTimeout(aoe2LocalizationRefreshTimerRef.current);
    }
    aoe2LocalizationRefreshDeadlineRef.current = null;
  }, []);

  const configRef = useRef(state.mockConfig);
  configRef.current = state.mockConfig;
  const stateRef = useRef(state);
  stateRef.current = state;
  const ticketRef = useRef<string | null>(null);
  const queueJoinInFlightRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lobbyAutomationRef = useRef<Promise<GameInputResult> | null>(null);
  const customLobbyAutomationStepsRef = useRef(new Set<string>());
  const lobbyRecoveryInFlightRef = useRef(false);
  const matchedSessionRef = useRef<MatchSession | null>(null);
  const roomSetupTimeoutRef = useRef<number | null>(null);
  const roomSetupWatchdogDurationRef = useRef(roomSetupTimeoutMs);
  const replayResultInFlightRef = useRef(false);
  const gameRevealInFlightRef = useRef<Promise<void> | null>(null);
  const gameStartSignalInFlightRef = useRef<Promise<boolean> | null>(null);
  const lobbyTimingAuditRef = useRef<{ matchId: string; startedAt: number; previousAt: number; expectedMs: number; role: "host" | "guest" } | null>(null);
  const familySharingNoticeShownRef = useRef(false);
  useEffect(() => {
    if (isPreviewMode || !window.electronApi) return;
    let cancelled = false;
    void window.electronApi.detectEnabledUiMods().then(({ mods }) => {
      if (cancelled || !mods.length) return;
      setIncompatibleUiMods(mods);
    }).catch((error) => log(`UI mod detection failed: ${error instanceof Error ? error.message : "Unknown error"}`));
    return () => { cancelled = true; };
  }, []);

  const disableIncompatibleUiMods = async () => {
    if (!window.electronApi || disablingUiMods) return;
    setDisablingUiMods(true);
    try {
      const process = await window.electronApi.detectAoe2Process();
      if (process.running) {
        const graceful = await window.electronApi.closeAoe2(false);
        if (!graceful.closed) {
          const forced = await window.electronApi.closeAoe2(true);
          if (!forced.closed) throw new Error(forced.message ?? "AoE2 could not be closed.");
        }
      }
      const result = await window.electronApi.disableEnabledUiMods();
      if (!result.disabled.length) throw new Error("The enabled UI mods could not be updated.");
      setIncompatibleUiMods([]);
      notify("UI mods disabled", "success", { detail: `${result.disabled.join(", ")} disabled.` });
    } catch (error) {
      notify("UI mods could not be disabled", "danger", {
        detail: error instanceof Error ? error.message : "Update the mods manually in AoE2.",
        durationMs: null
      });
    } finally {
      setDisablingUiMods(false);
    }
  };

  useEffect(() => {
    const electronApi = window.electronApi;
    if (!electronApi) return;
    return electronApi.onUpdateDetected((update) => {
      if (stateRef.current.queueStatus !== "searching") return;
      notify(`Empire League v${update.version} is downloading`, "warning", {
        detail: "Matchmaking was cancelled because the required update must be installed first.",
        durationMs: null
      });
      void cancelQueue();
    });
  }, []);

  useEffect(() => {
    const pending = pendingScrollRestoreRef.current;
    if (!pending || pending.page !== page) return;
    pendingScrollRestoreRef.current = null;
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(".main-area")?.scrollTo({ top: pending.top });
      });
    });
    return () => window.cancelAnimationFrame(firstFrame);
  }, [page]);

  useEffect(() => {
    if (isPreviewMode || page !== "match-history" || authStatus !== "authenticated") return;
    let cancelled = false;
    void matchHistoryService.getMine().then((recentMatches) => {
      if (!cancelled) setState((previous) => ({ ...previous, recentMatches }));
    }).catch((error) => {
      if (!cancelled) log(`Match history refresh failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    });
    return () => { cancelled = true; };
  }, [authStatus, page]);

  const services = useMemo(
    () => ({
      matchmaking: isPreviewMode
        ? new MockMatchmakingService(() => configRef.current)
        : new LocalMatchmakingService(),
      game: new MockGameIntegrationService(() => configRef.current),
      results: new MockMatchResultService(() => configRef.current)
    }),
    []
  );

  useEffect(() => {
    if (isPreviewMode) return;
    let cancelled = false;
    void authService.restore().then((player) => {
      if (cancelled) return;
      if (player) {
        showFamilySharingLoginNotice(player);
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
      setAuthError(authErrorMessage(error, "Could not restore the Steam session."));
      setAuthStatus("unauthenticated");
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!window.electronApi) return;
    return window.electronApi.onReplayEnded((filePath) => {
      const match = stateRef.current.activeMatch;
      const queueStatus = stateRef.current.queueStatus;
      const inFlight = replayResultInFlightRef.current;
      if (!match) {
        return;
      }
      if (queueStatus !== "in_game") {
        return;
      }
      if (inFlight) {
        return;
      }
      replayResultInFlightRef.current = true;
      void (async () => {
        let replay: Awaited<ReturnType<typeof parseReplayMetadata>>;
        try {
          replay = await parseReplayMetadata(filePath, match.queue.format === "team");
        } catch (error) {
          if (error instanceof ReplayNotFinishedError) {
            replayResultInFlightRef.current = false;
            return;
          }
          const message = error instanceof Error ? error.message : "Replay parsing failed.";
          log(`REPLAY_RESULT|Event=ParseFailed|Match=${match.id}|Reason=${message}|File=${filePath}`);
          setState((previous) => ({ ...previous, queueStatus: "verifying_result" }));
          let contestedStage: "Confirm" | "Report" = "Confirm";
          try {
            // A non-retryable parse failure makes the result contested, but the
            // match has still ended. Start the same menu recovery used after a
            // successfully parsed replay before reporting the contested result.
            log(`REPLAY_RESULT|Event=ConfirmRequested|Match=${match.id}|Outcome=Contested`);
            await window.electronApi?.confirmReplayEnded();
            log(`REPLAY_RESULT|Event=Confirmed|Match=${match.id}|Outcome=Contested`);
            contestedStage = "Report";
            log(`REPLAY_RESULT|Event=ReportStarted|Match=${match.id}|Outcome=Contested`);
            await services.matchmaking.reportMatchResult({ matchId: match.id, error: message });
            log(`REPLAY_RESULT|Event=ReportSubmitted|Match=${match.id}|Outcome=Contested`);
            log("Replay could not be parsed; result reported as contested");
            return;
          } catch (reportError) {
            replayResultInFlightRef.current = false;
            log(
              `REPLAY_RESULT|Event=${contestedStage}Failed|Match=${match.id}|Outcome=Contested`
              + `|Reason=${reportError instanceof Error ? reportError.message : message}`
            );
            setError({
              code: "RESULT_VERIFICATION_FAILED",
              message: "The replay parsing failure could not be reported.",
              technicalDetails: reportError instanceof Error ? reportError.message : message,
              retryable: true
            });
            return;
          }
        }

        log(
          `REPLAY_RESULT|Event=Parsed|Match=${match.id}|TerminalReason=${replay.reason}`
          + `|DurationMs=${replay.durationMs}|File=${filePath}`
        );
        log(`REPLAY_RESULT|Event=ConfirmRequested|Match=${match.id}|Outcome=Parsed`);
        try {
          await window.electronApi?.confirmReplayEnded();
        } catch (error) {
          log(
            `REPLAY_RESULT|Event=ConfirmFailed|Match=${match.id}|Outcome=Parsed`
            + `|Reason=${error instanceof Error ? error.message : String(error)}`
          );
          throw error;
        }
        log(`REPLAY_RESULT|Event=Confirmed|Match=${match.id}|Outcome=Parsed`);
        setState((previous) => ({ ...previous, queueStatus: "verifying_result" }));
        log(`Replay ended with terminal operation (${replay.reason}): ${filePath}`);
        matchHistoryService.rememberReplay(match.id, filePath);
        try {
          log(`REPLAY_RESULT|Event=ReportStarted|Match=${match.id}|Outcome=Parsed`);
          await services.matchmaking.reportMatchResult({ matchId: match.id, replay });
          log(`REPLAY_RESULT|Event=ReportSubmitted|Match=${match.id}|Outcome=Parsed`);
          log("Replay result reported; waiting for opponent report");
        } catch (error) {
          replayResultInFlightRef.current = false;
          log(
            `REPLAY_RESULT|Event=ReportFailed|Match=${match.id}|Outcome=Parsed`
            + `|Reason=${error instanceof Error ? error.message : "Matchmaker reporting failed."}`
          );
          setError({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The replay result could not be reported.",
            technicalDetails: error instanceof Error ? error.message : "Matchmaker reporting failed.",
            retryable: true
          });
        }
      })().catch((error) => {
        replayResultInFlightRef.current = false;
        log(
          `REPLAY_RESULT|Event=UnhandledFailure|Match=${match.id}`
          + `|Reason=${error instanceof Error ? error.message : String(error)}|File=${filePath}`
        );
      });
    });
  }, [services]);

  useEffect(() => {
    if (!window.electronApi) return;
    return window.electronApi.onReplayDetectionFailed((message) => {
      const match = stateRef.current.activeMatch;
      if (!match || stateRef.current.queueStatus !== "in_game" || replayResultInFlightRef.current) return;
      replayResultInFlightRef.current = true;
      setState((previous) => ({ ...previous, queueStatus: "verifying_result" }));
      log("Replay recording did not start; reporting the result as contested");
      void services.matchmaking.reportMatchResult({ matchId: match.id, error: message })
        .then(() => {
          log("Missing replay reported; waiting for contested result");
        })
        .catch((error) => {
          replayResultInFlightRef.current = false;
          setError({
            code: "RESULT_VERIFICATION_FAILED",
            message: "The missing replay could not be reported.",
            technicalDetails: error instanceof Error ? error.message : message,
            retryable: true
          });
        });
    });
  }, [services]);

  useEffect(() => {
    if (!window.electronApi) return;
    return window.electronApi.onAoe2ProcessExited(() => {
      if (stateRef.current.queueStatus !== "in_game" || !stateRef.current.activeMatch) return;
      log("AoE2 exited before local result verification completed");
      void returnToMatchmaking().then(() => {
        notify("AoE2 was closed. The match result is still pending.", "warning", {
          detail: "The result may still be resolved from your opponent's replay.",
          durationMs: 8000
        });
      });
    });
  }, [services]);

  async function signInWithSteam(): Promise<void> {
    setAuthStatus("authenticating");
    setAuthError(null);
    try {
      const player = await authService.signIn();
      showFamilySharingLoginNotice(player);
      const recentMatches = await matchHistoryService.getMine();
      setState((previous) => ({ ...previous, currentUser: player, recentMatches }));
      setAuthStatus("authenticated");
    } catch (error) {
      setAuthError(authErrorMessage(error, "Steam sign-in failed."));
      setAuthStatus("unauthenticated");
    }
  }

  async function signOut(): Promise<void> {
    if (isPreviewMode) return;
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
    if (isPreviewMode) return;
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
          const gracefulClose = await window.electronApi.closeAoe2(false);
          if (!gracefulClose.closed) {
            const forcedClose = await window.electronApi.closeAoe2(true);
            if (!forcedClose.closed) {
              throw new Error(forcedClose.message ?? "AoE2 could not be closed.");
            }
          }
        }

        if (!state.settings.launchAoe2OnStartup) return;

        setState((previous) => ({ ...previous, gameStatus: "loading" }));
        loadingNotificationId = notify("Loading AoE2 DE…", "loading", {
          detail: "Waiting for the game window to become ready.",
          durationMs: null
        });

        const ready = await launchAoe2WithRetry((detail) => {
          if (loadingNotificationId) updateNotification(loadingNotificationId, { detail });
        });
        if (!ready) throw new Error("AoE2 started, but its game window did not become ready in time.");

        if (loadingNotificationId) {
          updateNotification(loadingNotificationId, { detail: "Finishing game startup." });
        }
        scheduleAoe2LocalizationRefresh();
        await delayForStartup(aoe2PostWindowReadyDelayMs);

        if (!cancelled) {
          setState((previous) => ({
            ...previous,
            gameStatus: "running"
          }));
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

  async function launchAoe2ForActivity(purpose: "matchmaking" | "custom"): Promise<boolean> {
    let loadingNotificationId: string | null = null;
    try {
      if (!window.electronApi) throw new Error("The Electron game integration bridge is unavailable.");

      const installation = await window.electronApi.detectAoe2Installation();
      if (!installation.installed || !installation.path) {
        throw new Error(installation.message ?? "AoE2 DE was not detected.");
      }

      const existingProcess = await window.electronApi.detectAoe2Process();
      if (existingProcess.running && existingProcess.owned) {
        if (!existingProcess.windowReady) {
          // The managed window is intentionally hidden while Empire League is
          // minimized. The main-process launch guard reveals that same window
          // behind Electron; it does not send another Steam launch request.
          const resumed = await window.electronApi.launchAoe2();
          if (!resumed.launched || !(await waitForAoe2Window(5_000))) {
            throw new Error("The running AoE2 window could not be prepared for automation.");
          }
        }
        setState((previous) => ({ ...previous, gameStatus: "running" }));
        scheduleAoe2LocalizationRefresh();
        return true;
      }
      if (existingProcess.running && !existingProcess.owned) {
        const gracefulClose = await window.electronApi.closeAoe2(false);
        if (!gracefulClose.closed) {
          const forcedClose = await window.electronApi.closeAoe2(true);
          if (!forcedClose.closed) {
            throw new Error(forcedClose.message ?? "The existing AoE2 process could not be closed.");
          }
        }
      }

      setState((previous) => ({ ...previous, gameStatus: "loading" }));
      loadingNotificationId = notify("Launching AoE2 DE…", "loading", {
        detail: purpose === "custom"
          ? "Your custom game action will continue automatically when the game is ready."
          : "Matchmaking will begin automatically when the game is ready.",
        durationMs: null
      });

      const ready = await launchAoe2WithRetry((detail) => {
        if (loadingNotificationId) updateNotification(loadingNotificationId, { detail });
      });
      if (!ready) throw new Error("AoE2 started, but its game window did not become ready in time.");

      updateNotification(loadingNotificationId, { detail: "Finishing game startup." });
      scheduleAoe2LocalizationRefresh();
      await delayForStartup(aoe2PostWindowReadyDelayMs);
      setState((previous) => ({ ...previous, gameStatus: "running" }));
      updateNotification(loadingNotificationId, {
        message: "AoE2 DE is ready",
        tone: "success",
        detail: purpose === "custom" ? "Continuing with your custom game." : "Starting matchmaking.",
        durationMs: 3000
      });
      return true;
    } catch (error) {
      if (loadingNotificationId) dismissNotificationById(loadingNotificationId);
      setState((previous) => ({ ...previous, gameStatus: "installed" }));
      notify(error instanceof Error ? error.message : "AoE2 DE could not be launched.", "danger");
      return false;
    }
  }

  async function ensureAoe2Ready(purpose: "matchmaking" | "custom" = "matchmaking"): Promise<boolean> {
    if (isPreviewMode) return true;
    if (!window.electronApi) return true;
    const gameProcess = await window.electronApi.detectAoe2Process();
    if (gameProcess.running && gameProcess.windowReady && gameProcess.owned) {
      scheduleAoe2LocalizationRefresh();
      return true;
    }
    return launchAoe2ForActivity(purpose);
  }

  function log(message: string): void {
    setState((previous) => ({ ...previous, eventLog: [nowLog(message), ...previous.eventLog].slice(0, 1000) }));
  }

  function startLobbyTimingAudit(match: MatchSession, role: "host" | "guest"): void {
    const startedAt = performance.now();
    const expectedMs = estimateLobbySetupMs(match);
    lobbyTimingAuditRef.current = { matchId: match.id, startedAt, previousAt: startedAt, expectedMs, role };
    log(`LOBBY_TIMING|Match=${match.id}|Role=${role}|Phase=setup-start|ElapsedMs=0|PhaseMs=0|ExpectedTotalMs=${expectedMs}|ExpectedRemainingMs=${expectedMs}`);
  }

  function auditLobbyPhase(phase: string, complete = false): void {
    const audit = lobbyTimingAuditRef.current;
    if (!audit) return;
    const now = performance.now();
    const elapsedMs = Math.round(now - audit.startedAt);
    const phaseMs = Math.round(now - audit.previousAt);
    const expectedRemainingMs = Math.max(0, audit.expectedMs - elapsedMs);
    const suffix = complete ? `|DeltaMs=${elapsedMs - audit.expectedMs}` : "";
    log(`LOBBY_TIMING|Match=${audit.matchId}|Role=${audit.role}|Phase=${phase}|ElapsedMs=${elapsedMs}|PhaseMs=${phaseMs}|ExpectedTotalMs=${audit.expectedMs}|ExpectedRemainingMs=${expectedRemainingMs}${suffix}`);
    audit.previousAt = now;
    if (complete) lobbyTimingAuditRef.current = null;
  }

  useEffect(() => {
    return window.electronApi?.onAoe2AutomationLog((message) => {
      log(`[AoE2 automation] ${message}`);
      if (isLobbyAutomationProgress(message)) touchRoomSetupWatchdog();
    });
  }, []);

  function notify(
    message: string,
    tone: NotificationItem["tone"] = "info",
    options: { detail?: string; durationMs?: number | null; dismissible?: boolean; action?: NotificationItem["action"]; secondaryAction?: NotificationItem["secondaryAction"] } = {}
  ): string {
    const existingError = tone === "danger"
      ? stateRef.current.notifications.find((item) => item.tone === "danger" && item.message === message)
      : undefined;
    if (existingError) {
      setState((previous) => ({
        ...previous,
        notifications: previous.notifications.map((item) => item.id === existingError.id
          ? { ...item, attentionSequence: (item.attentionSequence ?? 0) + 1 }
          : item)
      }));
      return existingError.id;
    }
    const id = crypto.randomUUID();
    setState((previous) => ({
      ...previous,
      notifications: [{
        id,
        message,
        tone,
        detail: options.detail,
        durationMs: options.durationMs === undefined ? (tone === "danger" ? 8000 : 5000) : options.durationMs,
        dismissible: options.dismissible,
        action: options.action,
        secondaryAction: options.secondaryAction
      }, ...previous.notifications].slice(0, 4)
    }));
    return id;
  }

  function startRoomSetupWatchdog(durationMs = roomSetupWatchdogDurationRef.current): void {
    clearRoomSetupWatchdog();
    roomSetupWatchdogDurationRef.current = durationMs;
    roomSetupTimeoutRef.current = window.setTimeout(() => {
      roomSetupTimeoutRef.current = null;
      const queue = stateRef.current.selectedQueue;
      if (queue) {
        void handleLobbySetupFailure(
          queue,
          `Lobby setup stopped making progress for ${Math.ceil(durationMs / 1000)} seconds.`,
          { criticalFailure: { code: "LOBBY_SETUP_STALLED", phase: "lobby_setup" } }
        );
      }
    }, durationMs);
  }

  function touchRoomSetupWatchdog(): void {
    if (roomSetupTimeoutRef.current !== null) startRoomSetupWatchdog();
  }

  async function handleLobbySetupFailure(
    _queue: QueueDefinition,
    message: string,
    options: { showLocalFailureGuidance?: boolean; criticalFailure?: Omit<AutomationFailureReport, "severity" | "message"> } = {}
  ): Promise<void> {
    if (lobbyRecoveryInFlightRef.current) return;
    lobbyRecoveryInFlightRef.current = true;
    const criticalFailure: AutomationFailureReport | undefined = options.criticalFailure
      ? { severity: "critical", ...options.criticalFailure, message }
      : undefined;
    if (criticalFailure) log(`CRITICAL | ${criticalFailure.phase.replaceAll("_", " ")} | ${message}`);
    auditLobbyPhase(`failed:${message.replaceAll("|", "/")}`, true);
    void window.electronApi?.stopMatchFoundAlert();
    clearRoomSetupWatchdog();
    queueJoinInFlightRef.current = false;
    matchedSessionRef.current = null;
    lobbyAutomationRef.current = null;
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    const ticketId = ticketRef.current;
    ticketRef.current = null;
    setState((previous) => ({
      ...previous,
      queueStatus: "cancelled",
      gameStatus: "installed",
      activeMatch: null,
      error: null,
      transitionInputLocked: false,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null
    }));
    notify(message, "warning", { durationMs: 5000, dismissible: false });
    if (ticketId) await services.matchmaking.leaveQueue(ticketId, criticalFailure).catch(() => undefined);
    await window.electronApi?.setLobbyInputLock(false).catch(() => ({ locked: false }));
    log("Lobby setup failed; terminating AoE2 and leaving matchmaking cancelled");
    const closed = await window.electronApi?.closeAoe2(true).catch(() => null);
    if (closed && !closed.closed) {
      notify(closed.message ?? "AoE2 could not be terminated after the lobby setup failure.", "danger");
    }
    if (options.showLocalFailureGuidance !== false) {
      log(`Opening diagnostic log after lobby setup failure|Aoe2Closed=${closed?.closed ?? false}`);
      window.dispatchEvent(new Event("empire:open-diagnostic-log"));
    } else {
      log(`Local failure guidance suppressed for opponent lobby setup failure|Aoe2Closed=${closed?.closed ?? false}`);
    }
    lobbyRecoveryInFlightRef.current = false;
  }

  function clearRoomSetupWatchdog(): void {
    if (roomSetupTimeoutRef.current === null) return;
    window.clearTimeout(roomSetupTimeoutRef.current);
    roomSetupTimeoutRef.current = null;
  }

  function showFamilySharingLoginNotice(player: PlayerProfile): void {
    if (player.steamLicenseStatus !== "family_shared" || familySharingNoticeShownRef.current) return;
    familySharingNoticeShownRef.current = true;
    notify("Opponents may reject matches with you because you are using family share.", "warning", {
      durationMs: null,
      dismissible: true
    });
  }

  function dismissNotificationById(id: string): void {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.filter((item) => item.id !== id),
      error: previous.error?.notificationId === id ? null : previous.error,
      queueStatus: previous.error?.notificationId === id && previous.queueStatus === "error"
        ? "idle"
        : previous.queueStatus
    }));
  }

  function updateNotification(id: string, patch: Partial<Omit<NotificationItem, "id">>): void {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.map((item) => item.id === id ? { ...item, ...patch } : item)
    }));
  }

  function setError(error: AppError): void {
    const notificationId = notify(error.message, "danger", {
      detail: error.technicalDetails,
      durationMs: null
    });
    setState((previous) => ({
      ...previous,
      error: { ...error, notificationId },
      queueStatus: "error"
    }));
  }

  async function startQueue(queue: QueueDefinition): Promise<void> {
    const canStartQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
      && (!state.activeMatch || state.queueStatus === "completed");
    if (state.gameStatus === "loading" || !canStartQueue || queueJoinInFlightRef.current) return;
    queueJoinInFlightRef.current = true;
    try {
      if (await blockQueueForPendingUpdate()) return;
      if (!(await ensureAoe2Ready())) {
        queueJoinInFlightRef.current = false;
        return;
      }

      if (ticketRef.current) {
        const staleTicketId = ticketRef.current;
        unsubscribeRef.current?.();
        unsubscribeRef.current = null;
        ticketRef.current = null;
        await services.matchmaking.leaveQueue(staleTicketId).catch(() => undefined);
      }
      const currentUser = await authService.reportSteamLicense(state.currentUser);
      showFamilySharingLoginNotice(currentUser);
      if (currentUser !== state.currentUser) {
        setState((previous) => ({ ...previous, currentUser }));
      }
      if (await blockQueueForPendingUpdate()) return;
      const ticket = await services.matchmaking.joinQueue({
        queueId: queue.id,
        queue,
        player: currentUser,
        canHost: true,
        maximumLowerOpponentRatingGap: state.settings.maximumLowerOpponentRatingGap
      });
      ticketRef.current = ticket.id;
      if (ticket.ignoredMapIds?.length) {
        notify("Your map pool was outdated. Retired maps were ignored; restart Empire League to update.", "warning", {
          detail: `Ignored maps: ${ticket.ignoredMapIds.join(", ")}`,
          durationMs: 10_000
        });
      }
      setState((previous) => ({
        ...previous,
        selectedQueue: queue,
        searchRange: {
          min: (queue.format === "team" ? currentUser.teamRating : currentUser.rating) - 50,
          max: (queue.format === "team" ? currentUser.teamRating : currentUser.rating) + 50
        },
        queueStartedAt: ticket.joinedAt,
        roomSetupStartedAt: null,
        roomSetupEstimateMs: null,
        roomSetupMilestone: null,
        queueStatus: "searching",
        activeMatch: null,
        error: null
      }));
      setPage("ranked");
      log(`Joined queue ${queue.id}`);
      unsubscribeRef.current = services.matchmaking.subscribeToQueue(ticket.id, async (event) => {
        if (event.type === "range") {
          setState((previous) => ({ ...previous, searchRange: { min: event.minRating, max: event.maxRating } }));
        }
        if (event.type === "match_found") {
          const shouldAutoRejectFamilySharing = state.settings.autoRejectFamilySharing
            && event.match.queue.id === "ranked-rm-1v1"
            && event.match.opponent.steamLicenseStatus === "family_shared";
          if (shouldAutoRejectFamilySharing) {
            log(`Automatically declining family-shared opponent: ${event.match.id}`);
            notify("Automatically declined a Family Share opponent.", "warning");
            void declineMatchById(event.match.id);
            return;
          }
          const matchedSession = {
            ...event.match,
            player: state.currentUser,
            status: "match_found" as const
          };
          matchedSessionRef.current = matchedSession;
          setPage("ranked");
          setState((previous) => ({
            ...previous,
            queueStatus: "match_found",
            roomSetupStartedAt: null,
            roomSetupEstimateMs: null,
            roomSetupMilestone: null,
            activeMatch: matchedSession
          }));
          log(`Match found: ${event.match.id}`);
          void window.electronApi?.alertMatchFound(state.settings.matchNotifications);
        }
        if (event.type === "opponent_accepted") {
          const matchedSession = matchedSessionRef.current;
          if (!matchedSession) return;
          void window.electronApi?.stopMatchFoundAlert();
          const acceptedSession = {
            ...matchedSession,
            acceptedByPlayer: true,
            acceptedByOpponent: true,
            status: event.role === "host" ? "creating_lobby" as const : "waiting_for_opponent" as const
          };
          const inputLock = await window.electronApi?.setLobbyInputLock(true)
            .catch(() => ({ locked: false }));
          if (!inputLock?.locked) {
            await handleLobbySetupFailure(
              acceptedSession.queue,
              "Empire League could not secure the lobby automation input lock.",
              { criticalFailure: { code: "LOBBY_INPUT_LOCK_FAILED", phase: "lobby_setup" } }
            );
            return;
          }
          const setupEstimateMs = estimateLobbySetupMs(acceptedSession);
          startRoomSetupWatchdog(event.role === "guest"
            ? Math.max(roomSetupTimeoutMs, setupEstimateMs + roomSetupEstimateMarginMs)
            : roomSetupTimeoutMs);
          matchedSessionRef.current = acceptedSession;
          startLobbyTimingAudit(acceptedSession, event.role === "host" ? "host" : "guest");
          setState((previous) => ({
            ...previous,
            queueStatus: event.role === "host" ? "creating_lobby" : "waiting_for_opponent",
            roomSetupStartedAt: new Date().toISOString(),
            roomSetupEstimateMs: setupEstimateMs,
            roomSetupMilestone: event.role === "host"
              ? "Setting up lobby room"
              : "Waiting for the host to set up the lobby room",
            activeMatch: acceptedSession
          }));
          log("Both players accepted");
          if (event.role === "host" && window.electronApi) {
            void services.matchmaking.reportLobbySetupEstimate(
              acceptedSession.id,
              setupEstimateMs
            ).catch((error: unknown) => {
              log(`Could not synchronize lobby countdown: ${error instanceof Error ? error.message : "unknown error"}`);
            });
            log("Assigned as host; waiting for AoE2 lobby automation to settle");
            lobbyAutomationRef.current = delayForLobbyInput(lobbySetupTiming.hostLobbyAutomationSettleMs)
              .then(() => {
                startRoomSetupWatchdog();
                log("Starting AoE2 lobby automation");
                return window.electronApi!.runAoe2CreateLobbySequence(
                  getLobbyMapName(acceptedSession.selectedMap),
                  acceptedSession.queue.format === "team"
                    ? ((acceptedSession.queue.teamSizes?.[0] ?? 2) * 2) as 4 | 8
                    : 2
                );
              });
            void prepareLobby(acceptedSession);
          }
        }
        if (event.type === "lobby_setup_estimate") {
          if (event.matchId !== matchedSessionRef.current?.id) return;
          if (lobbyTimingAuditRef.current?.matchId === event.matchId) {
            lobbyTimingAuditRef.current.expectedMs = event.estimateMs;
          }
          auditLobbyPhase("countdown-synchronized");
          if (lobbyTimingAuditRef.current?.role === "guest") {
            startRoomSetupWatchdog(Math.max(
              roomSetupTimeoutMs,
              event.estimateMs + roomSetupEstimateMarginMs
            ));
          }
          setState((previous) => ({ ...previous, roomSetupEstimateMs: event.estimateMs }));
          log(`Synchronized lobby countdown with host estimate: ${Math.ceil(event.estimateMs / 1000)} seconds`);
        }
        if (event.type === "lobby_ready") {
          auditLobbyPhase("lobby-published");
          startRoomSetupWatchdog(roomSetupTimeoutMs);
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
            const allowCustomContentPrompt = isCustomLobbyMap(matchedSessionRef.current?.selectedMap);
            void window.electronApi.openAoe2Lobby(
              event.lobby.platformLobbyId,
              allowCustomContentPrompt
            ).then(async (result) => {
              log(result.opened ? "Opened the host lobby in AoE2" : "The host lobby URI was rejected");
              if (result.opened) {
                log("Guest lobby opened; waiting for the Ready button state to settle");
                await delayForLobbyInput(lobbySetupTiming.guestReadySettleMs);
                const preference = matchedSessionRef.current?.queue.civilizationPreference;
                const selection = aoe2SelectionForPreference(preference);
                if (selection) {
                  const lobbySlot = matchedSessionRef.current?.lobbySlot ?? 2;
                  log(`Selecting ${selection} for guest lobby slot ${lobbySlot}`);
                  const selected = await window.electronApi!.selectAoe2Civilization(
                    selection,
                    lobbySlot
                  );
                  if (!selected.sent) throw new Error(selected.message);
                  if (selected.usedRandomCivilizationFallback) {
                    notify("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning");
                    log(`${selection} unavailable; Random selected in AoE2`);
                  } else {
                    log(`${selection} selected in AoE2`);
                  }
                }
                const teamSession = matchedSessionRef.current;
                if (teamSession?.queue.format === "team") {
                  const lobbySlot = teamSession.lobbySlot ?? 2;
                  const team = teamSession.team ?? 2;
                  log(`Selecting Team ${team} for guest lobby slot ${lobbySlot}`);
                  const selectedTeam = await window.electronApi!.selectAoe2Team(team, lobbySlot);
                  if (!selectedTeam.sent) throw new Error(selectedTeam.message);
                }
                log("Guest lobby opened; reporting join to the host");
                await services.matchmaking.reportGuestLobbyJoined(event.matchId);
                log("Guest joined; waiting for the host to finalize custom map transfer");
                setState((previous) => ({
                  ...previous,
                  roomSetupMilestone: "Waiting for host to finalize lobby files"
                }));
              } else throw new Error("The host lobby URI was rejected.");
            }).catch((error: unknown) => {
              const message = error instanceof Error ? error.message : "The host lobby could not be opened.";
              log(`Opening the host lobby failed: ${message}`);
              void handleLobbySetupFailure(queue, message, {
                criticalFailure: { code: "LOBBY_OPEN_FAILED", phase: "lobby_join" }
              });
            });
          }
        }
        if (event.type === "guest_lobby_joined" && window.electronApi) {
          auditLobbyPhase("guest-joined");
          setState((previous) => ({
            ...previous,
            roomSetupMilestone: "Opponent joined. Finalizing lobby files..."
          }));
          void (async () => {
            try {
              log("Guest joined; waiting for the host lobby state to settle");
              await delayForLobbyInput(lobbySetupTiming.hostReadySettleMs);
              log("Guest joined; clicking Ready for the host");
              const ready = await window.electronApi!.runAoe2LobbyCursorAction("host-ready");
              if (!ready.sent) throw new Error(ready.message);
              await services.matchmaking.reportHostLobbyReady(event.matchId);
              log("Host readied; guest notified to wait for custom map transfer");
              setState((previous) => ({
                ...previous,
                roomSetupMilestone: "Waiting for opponent file transfer"
              }));
            } catch (error) {
              const message = error instanceof Error ? error.message : "The host could not finalize the lobby.";
              log(`Automated host Ready failed: ${message}`);
              void handleLobbySetupFailure(queue, message, {
                criticalFailure: { code: "HOST_READY_FAILED", phase: "lobby_ready" }
              });
            }
          })();
        }
        if (event.type === "host_lobby_ready" && window.electronApi) {
          void window.electronApi.beginAoe2MatchAudioSuppression();
          auditLobbyPhase("host-ready");
          const customContentFlow = isCustomLobbyMap(matchedSessionRef.current?.selectedMap);
          setState((previous) => ({
            ...previous,
            roomSetupMilestone: customContentFlow ? "Receiving lobby files" : "Waiting for Ready"
          }));
          void (async () => {
            try {
              const deadline = Date.now() + lobbySetupTiming.customMapTransferTimeoutMs;
              let contentAcceptanceReported = false;
              let ready: { sent: boolean; message: string };
              do {
                await delayForLobbyInput(lobbySetupTiming.customMapTransferPollMs);
                ready = await window.electronApi!.runAoe2LobbyCursorAction("guest-ready");
                if (!ready.sent && customContentFlow && !contentAcceptanceReported) {
                  log("Guest Ready remains unavailable; checking for the unverified-content confirmation");
                  const confirmation = await window.electronApi!.runAoe2LobbyCursorAction("content-confirm");
                  if (!confirmation.sent) {
                    log("Unverified-content confirmation keys could not be sent");
                  } else {
                    await services.matchmaking.reportGuestContentAccepted(event.matchId);
                    contentAcceptanceReported = true;
                    log(`Content accepted; allowing ${customContentHostRecoveryMs} ms for the host to restore Ready`);
                    await delayForLobbyInput(customContentHostRecoveryMs);
                  }
                }
              } while (!ready.sent && Date.now() < deadline);
              if (!ready.sent) throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
              if (customContentFlow && !contentAcceptanceReported) {
                // With the AoE2 UGC warning disabled, download acceptance is
                // implicit and there is no dialog action to report. Reaching a
                // verified Ready state proves the transfer completed. Notify
                // the host so it can restore the Ready state that AoE2 clears
                // during every custom-content transfer.
                await services.matchmaking.reportGuestContentAccepted(event.matchId);
                contentAcceptanceReported = true;
                log(`Content transfer completed without a confirmation dialog; allowing ${customContentHostRecoveryMs} ms for the host to restore Ready`);
                await delayForLobbyInput(customContentHostRecoveryMs);
                ready = await window.electronApi!.runAoe2LobbyCursorAction("guest-ready");
                if (!ready.sent) throw new Error("Guest Ready did not remain available after host transfer recovery.");
              }
              log("Guest Ready verified; reporting readiness to the host");
              await services.matchmaking.reportGuestLobbyReady(event.matchId);
              clearRoomSetupWatchdog();
              setState((previous) => ({
                ...previous,
                roomSetupMilestone: "Ready. Waiting for the host to start..."
              }));
            } catch (error) {
              const message = error instanceof Error ? error.message : "Lobby file transfer did not complete.";
              log(`Guest file transfer or Ready failed: ${message}`);
              void handleLobbySetupFailure(queue, message, {
                criticalFailure: { code: "GUEST_READY_FAILED", phase: "lobby_ready" }
              });
            }
          })();
        }
        if (
          event.type === "guest_content_accepted"
          && window.electronApi
          && isCustomLobbyMap(matchedSessionRef.current?.selectedMap)
        ) {
          auditLobbyPhase("guest-content-accepted");
          setState((previous) => ({
            ...previous,
            roomSetupMilestone: "Opponent accepted lobby files. Confirming host readiness..."
          }));
          void (async () => {
            try {
              log("Guest accepted custom content; waiting for the lobby state to settle");
              await delayForLobbyInput(customContentHostRecoveryMs);
              const ready = await window.electronApi!.runAoe2LobbyCursorAction("host-ready");
              if (!ready.sent) throw new Error(ready.message);
              log("Host Ready verified again after guest content acceptance");
              setState((previous) => ({
                ...previous,
                roomSetupMilestone: "Waiting for opponent file transfer"
              }));
            } catch (error) {
              const message = error instanceof Error ? error.message : "The host could not resume the lobby file transfer.";
              log(`Second host Ready failed: ${message}`);
              void handleLobbySetupFailure(queue, message, {
                criticalFailure: { code: "HOST_RESUME_FAILED", phase: "lobby_ready" }
              });
            }
          })();
        }
        if (event.type === "guest_lobby_ready" && window.electronApi) {
          void window.electronApi.beginAoe2MatchAudioSuppression();
          auditLobbyPhase("guest-ready");
          setState((previous) => ({
            ...previous,
            roomSetupMilestone: "Opponent ready. Starting game..."
          }));
          void (async () => {
            // Arm listeners before input so a fast loading transition cannot
            // be missed, but do not spend the confirmation timeout on the
            // pre-click settling period or the main-process verification/retry.
            const startConfirmation = waitForAoe2StartSignal(20_000, 8_000);
            try {
              log("Guest reported ready; waiting for the Start button state to settle");
              await delayForLobbyInput(lobbySetupTiming.hostReadyToStartMs);
              await delayForLobbyInput(lobbySetupTiming.startGameSettleMs);
              log("Host readied; clicking Start Game");
              const start = await window.electronApi!.runAoe2LobbyCursorAction("start");
              if (!start.sent) throw new Error(start.message);
              setState((previous) => ({
                ...previous,
                roomSetupMilestone: "Confirming game start"
              }));
              await services.matchmaking.reportGameStartAttempted(event.matchId);
              const confirmed = await startConfirmation;
              if (!confirmed) {
                log("Start Game was clicked, but no loading-screen or replay signal was detected");
                await services.matchmaking.reportGameStartFailed(event.matchId);
                return;
              }
              clearRoomSetupWatchdog();
              await services.matchmaking.reportGameStarted(event.matchId);
              void revealAoe2AfterGameStart();
            } catch (error) {
              const message = error instanceof Error ? error.message : "The automated game start failed.";
              log(`Automated host start failed: ${message}`);
              void handleLobbySetupFailure(queue, message, {
                criticalFailure: { code: "HOST_GAME_START_FAILED", phase: "game_start" }
              });
            }
          })();
        }
        if (event.type === "game_start_attempted") {
          auditLobbyPhase("game-start-attempted");
          setState((previous) => ({ ...previous, roomSetupMilestone: "Confirming game start" }));
          log("Host clicked Start Game; watching AoE2 for the loading transition");
          void waitForAoe2StartSignal().then(async (confirmed) => {
            if (confirmed) {
              await services.matchmaking.reportGameStarted(event.matchId);
              void revealAoe2AfterGameStart();
              return;
            }
            log("Guest did not detect a loading-screen or replay signal after Start Game");
            await services.matchmaking.reportGameStartFailed(event.matchId);
          }).catch((error) => {
            void handleLobbySetupFailure(
              queue,
              error instanceof Error ? error.message : "Game start confirmation failed.",
              { criticalFailure: { code: "GAME_START_CONFIRMATION_FAILED", phase: "game_start" } }
            );
          });
        }
        if (event.type === "game_started") {
          auditLobbyPhase("game-started");
          clearRoomSetupWatchdog();
          setState((previous) => ({
            ...previous,
            queueStatus: "ready",
            gameStatus: "in_match",
            roomSetupMilestone: "Starting game",
            transitionInputLocked: true,
            activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "ready" } : null
          }));
          log("Host started the game");
          void revealAoe2AfterGameStart();
        }
        if (event.type === "result_verified" || event.type === "result_contested") {
          if (event.matchId !== stateRef.current.activeMatch?.id) return;
          completeResult(event.result);
        }
        if (event.type === "error") {
          if (event.code === "TICKET_NOT_FOUND") {
            queueJoinInFlightRef.current = false;
            matchedSessionRef.current = null;
            ticketRef.current = null;
            unsubscribeRef.current?.();
            unsubscribeRef.current = null;
            setState((previous) => ({
              ...previous,
              queueStatus: "cancelled",
              activeMatch: null,
              error: null
            }));
            notify("The matchmaking server restarted. Rejoining the queue…", "warning", {
              durationMs: 5000,
              dismissible: false
            });
            log("Queue ticket expired after a server restart; rejoining");
            window.setTimeout(() => void startQueue(queue), 0);
            return;
          }
          if (event.code === "GAME_START_FAILED") {
            log("Game start failed after the Start Game click; terminating AoE2");
            void handleLobbySetupFailure(queue, event.message);
            return;
          }
          if (event.code === "MATCH_SETUP_FAILED") {
            void handleLobbySetupFailure(queue, event.message, { showLocalFailureGuidance: false });
            return;
          }
          if (event.code === "MATCH_DISCONNECTED") {
            void handleLobbySetupFailure(queue, event.message);
            return;
          }
          if (event.code === "MATCH_DECLINED") {
            void window.electronApi?.stopMatchFoundAlert();
            clearRoomSetupWatchdog();
            queueJoinInFlightRef.current = false;
            matchedSessionRef.current = null;
            if (ticketRef.current) {
              void services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
              ticketRef.current = null;
            }
            unsubscribeRef.current?.();
            unsubscribeRef.current = null;
            setState((previous) => ({
              ...previous,
              queueStatus: "cancelled",
              activeMatch: null,
              error: null
            }));
            notify(event.message, "warning", { durationMs: 5000, dismissible: false });
            log("Opponent declined; returning to queue");
            window.setTimeout(() => void startQueue(queue), 0);
            return;
          }
          if (event.code === "MATCH_EXPIRED") {
            void window.electronApi?.stopMatchFoundAlert();
            clearRoomSetupWatchdog();
            queueJoinInFlightRef.current = false;
            matchedSessionRef.current = null;
            if (ticketRef.current) {
              void services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
              ticketRef.current = null;
            }
            unsubscribeRef.current?.();
            unsubscribeRef.current = null;
            setState((previous) => ({
              ...previous,
              queueStatus: "cancelled",
              activeMatch: null
            }));
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

  async function blockQueueForPendingUpdate(): Promise<boolean> {
    const update = await window.electronApi?.getPendingUpdate().catch(() => null);
    if (!update) return false;
    queueJoinInFlightRef.current = false;
    notify(`Empire League v${update.version} is ${update.status === "downloaded" ? "ready to install" : "downloading"}`, "warning", {
      detail: "Restart and install the required update before joining matchmaking.",
      durationMs: null
    });
    return true;
  }

  async function cancelQueue(): Promise<void> {
    clearRoomSetupWatchdog();
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    const ticketId = ticketRef.current;
    ticketRef.current = null;
    queueJoinInFlightRef.current = false;
    if (ticketId) {
      await services.matchmaking.leaveQueue(ticketId).catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "";
        if (message.toLowerCase().includes("ticket not found")) return;
        log(`Queue cancellation could not be confirmed: ${message || "Unknown error"}`);
        notify("The matchmaking server could not confirm cancellation", "danger", {
          detail: message || undefined,
          durationMs: null
        });
      });
    }
    setState((previous) => ({
      ...previous,
      queueStatus: "cancelled",
      selectedQueue: null,
      queueStartedAt: null,
      roomSetupStartedAt: null,
      roomSetupEstimateMs: null,
      roomSetupMilestone: null
    }));
    log("Queue cancelled");
  }

  async function updateActiveQueue(queue: QueueDefinition): Promise<void> {
    const ticketId = ticketRef.current;
    if (!ticketId || stateRef.current.queueStatus !== "searching") return;
    try {
      await services.matchmaking.updateQueue(ticketId, queue);
      if (stateRef.current.queueStatus !== "searching") return;
      setState((previous) => ({ ...previous, selectedQueue: queue }));
      log(`Updated active queue preferences: ${queue.civilizationPreference?.mode ?? "pick"}, ${queue.mapPool.length} maps`);
    } catch (error) {
      if (stateRef.current.queueStatus !== "searching") return;
      log(`Active queue preference update failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      notify("Your queue preferences could not be updated", "danger");
    }
  }

  async function acceptMatch(): Promise<void> {
    if (!state.activeMatch) return;
    void window.electronApi?.stopMatchFoundAlert();
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

  async function declineMatchById(matchId?: string): Promise<void> {
    void window.electronApi?.stopMatchFoundAlert();
    clearRoomSetupWatchdog();
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    try {
      if (matchId) await services.matchmaking.declineMatch(matchId);
    } finally {
      if (ticketRef.current) await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
      ticketRef.current = null;
      queueJoinInFlightRef.current = false;
      matchedSessionRef.current = null;
      setState((previous) => ({ ...previous, queueStatus: "cancelled", activeMatch: null }));
    }
    log("Match declined");
  }

  async function declineMatch(): Promise<void> {
    await declineMatchById(state.activeMatch?.id);
  }

  async function prepareLobby(matchOverride?: MatchSession): Promise<void> {
    const match = matchOverride ?? state.activeMatch;
    if (!match?.selectedMap) return;
    try {
      setPage("ranked");
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
        const automation = await (
          lobbyAutomationRef.current
          ?? window.electronApi.runAoe2CreateLobbySequence(
            getLobbyMapName(match.selectedMap),
            match.queue.format === "team" ? ((match.queue.teamSizes?.[0] ?? 2) * 2) as 4 | 8 : 2
          )
        );
        lobbyAutomationRef.current = null;
        if (!automation.sent) throw new Error(automation.message);
        if (!automation.lobbyUri) throw new Error("AoE2 did not copy a valid lobby URI.");
        log("AoE2 host-lobby sequence completed");
        startRoomSetupWatchdog();
        const preference = match.queue.civilizationPreference;
        const selection = aoe2SelectionForPreference(preference);
        if (selection) {
          log(`Selecting ${selection} for host lobby slot 1`);
          const selected = await window.electronApi.selectAoe2Civilization(
            selection,
            1
          );
          if (!selected.sent) throw new Error(selected.message);
          if (selected.usedRandomCivilizationFallback) {
            notify("The civilization you selected requires a DLC purchase. Choosing random instead.", "warning");
            log(`${selection} unavailable; Random selected in AoE2`);
          } else {
            log(`${selection} selected in AoE2`);
          }
        }
        if (match.queue.format === "team") {
          const lobbySlot = match.lobbySlot ?? 1;
          const team = match.team ?? 1;
          log(`Selecting Team ${team} for host lobby slot ${lobbySlot}`);
          const selectedTeam = await window.electronApi.selectAoe2Team(team, lobbySlot);
          if (!selectedTeam.sent) throw new Error(selectedTeam.message);
        }
        log(`Lobby URI discovered: ${automation.lobbyUri}`);
        const lobbyResult = await services.game.createLobby({
          matchId: match.id,
          hostProfileId: match.player.aoeProfileId,
          guestProfileId: match.opponent.aoeProfileId,
          map: match.selectedMap,
          playerCount: match.queue.format === "team"
            ? ((match.queue.teamSizes?.[0] ?? 2) * 2) as 4 | 8
            : 2
        });
        const discoveredLobby = { ...lobbyResult.lobby, platformLobbyId: automation.lobbyUri };
        log(`Lobby created: ${discoveredLobby.platformLobbyId}`);
        await services.matchmaking.publishLobby(match.id, discoveredLobby);
        log("Lobby details published to opponent");
        clearRoomSetupWatchdog();
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
        playerCount: match.queue.format === "team"
          ? ((match.queue.teamSizes?.[0] ?? 2) * 2) as 4 | 8
          : 2
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
      setState((previous) => ({
        ...previous,
        queueStatus: "ready",
        gameStatus: "in_lobby",
        activeMatch: previous.activeMatch
          ? { ...previous.activeMatch, lobby: verifiedLobby(lobbyResult.lobby), status: "ready" }
          : null
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not create the AoE2 lobby.";
      log(`Lobby preparation failed: ${message}`);
      const queue = match.queue;
      void handleLobbySetupFailure(queue, message, {
        criticalFailure: { code: "LOBBY_PREPARATION_FAILED", phase: "lobby_creation" }
      });
    }
  }

  async function openAoe2(): Promise<void> {
    if (window.electronApi) {
      const detection = await window.electronApi.startReplayEndDetection();
      if (!detection.started) log(`Replay detection unavailable: ${detection.message ?? "unknown error"}`);
    }
    await stopYouTubeShorts();
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
    replayResultInFlightRef.current = false;
    void window.electronApi?.stopReplayEndDetection();
    setState((previous) => {
      const activeMatch = previous.activeMatch ? { ...previous.activeMatch, result, status: "completed" as const } : null;
      const isTeamRating = result.ratingPool === "team";
      const wins = !isTeamRating && result.outcome === "win"
        ? previous.currentUser.wins + 1
        : previous.currentUser.wins;
      const losses = !isTeamRating && result.outcome === "loss"
        ? previous.currentUser.losses + 1
        : previous.currentUser.losses;
      const updatedUser = {
        ...previous.currentUser,
        rating: result.verified && !isTeamRating ? result.newRating : previous.currentUser.rating,
        peakRating: result.verified && !isTeamRating
          ? Math.max(previous.currentUser.peakRating, result.newRating)
          : previous.currentUser.peakRating,
        teamRating: result.verified && isTeamRating ? result.newRating : previous.currentUser.teamRating,
        teamPeakRating: result.verified && isTeamRating
          ? Math.max(previous.currentUser.teamPeakRating, result.newRating)
          : previous.currentUser.teamPeakRating,
        division: result.verified && !isTeamRating
          ? getDivisionForRating(result.newRating)
          : previous.currentUser.division,
        wins,
        losses,
        winRate: wins + losses > 0 ? Number(((wins / (wins + losses)) * 100).toFixed(1)) : 0,
        streak: isTeamRating
          ? previous.currentUser.streak
          : result.outcome === "win"
          ? Math.max(1, previous.currentUser.streak + 1)
          : result.outcome === "loss"
            ? Math.min(-1, previous.currentUser.streak - 1)
            : previous.currentUser.streak
      };
      const summary = activeMatch && result.verified
        ? {
            id: activeMatch.id,
            opponent: activeMatch.opponent.displayName,
            opponentId: activeMatch.opponent.id,
            opponentRating: isTeamRating
              ? activeMatch.opponent.teamRating
              : activeMatch.opponent.rating,
            outcome: result.outcome,
            map: activeMatch.selectedMap?.name ?? "Arabia",
            civilization: activeMatch.queue.civilizationPreference?.civilization ?? "",
            opponentCivilization: activeMatch.opponentCivilizationPreference?.civilization ?? "",
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
    if (result.verificationStatus === "contested") {
      log("Replay reports conflicted; result discarded");
      notify("Result contested. No rating change.", "warning");
    } else {
      log("Match result verified");
    }
  }

  async function returnToMatchmaking(): Promise<void> {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    if (ticketRef.current) {
      await services.matchmaking.leaveQueue(ticketRef.current).catch(() => undefined);
      ticketRef.current = null;
    }
    queueJoinInFlightRef.current = false;
    replayResultInFlightRef.current = false;
    matchedSessionRef.current = null;
    setState((previous) => ({
      ...previous,
      queueStatus: "idle",
      selectedQueue: null,
      queueStartedAt: null,
      activeMatch: null,
      error: null
    }));
    setPage("ranked");
  }

  function updateMockConfig(patch: Partial<MockServiceConfig>): void {
    setState((previous) => ({ ...previous, mockConfig: { ...previous.mockConfig, ...patch } }));
  }

  function waitForAoe2StartSignal(timeoutMs = 20_000, timeoutDelayMs = 0): Promise<boolean> {
    if (!window.electronApi) return Promise.resolve(false);
    if (gameStartSignalInFlightRef.current) return gameStartSignalInFlightRef.current;
    gameStartSignalInFlightRef.current = new Promise<boolean>((resolve) => {
      let settled = false;
      const finish = (confirmed: boolean) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        stopLoadingScreenListener();
        stopReplayStartedListener();
        resolve(confirmed);
      };
      const stopLoadingScreenListener = window.electronApi!.onLoadingScreen(() => finish(true));
      const stopReplayStartedListener = window.electronApi!.onReplayStarted(() => finish(true));
      const timeout = window.setTimeout(() => finish(false), timeoutDelayMs + timeoutMs);
      void window.electronApi!.startLoadingScreenWatch().catch(() => undefined);
      void window.electronApi!.startReplayEndDetection().catch(() => undefined);
    }).finally(() => {
      gameStartSignalInFlightRef.current = null;
    });
    return gameStartSignalInFlightRef.current;
  }

  async function revealAoe2AfterGameStart(): Promise<void> {
    if (!window.electronApi) return;
    const matchId = stateRef.current.activeMatch?.id;
    if (!matchId) return;
    if (gameRevealInFlightRef.current) return gameRevealInFlightRef.current;
    gameRevealInFlightRef.current = (async () => {
      auditLobbyPhase("game-reveal-start", true);
      const completedState = stateRef.current;
      if (completedState.activeMatch && completedState.roomSetupStartedAt) {
        recordLobbySetupDuration(
          completedState.activeMatch,
          Date.now() - new Date(completedState.roomSetupStartedAt).getTime()
        );
      }
      // Start confirmation controls the match lifecycle. Native foreground
      // focus is presentation only and must never prevent replay reporting or
      // leave the low-level lobby input guard active.
      setState((previous) => ({
        ...previous,
        queueStatus: "in_game",
        // Keep the preparation view mounted until the native foreground
        // handoff settles. The match lifecycle is already in-game, but
        // rendering ActiveMatch here causes it to flash before AoE2 appears.
        roomSetupMilestone: "Switching to game",
        transitionInputLocked: false,
        activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "in_game" } : null
      }));
      try {
        await window.electronApi!.setLobbyInputLock(false).catch(() => ({ locked: false }));
        await stopYouTubeShorts();
        let timeout: number | undefined;
        const handoff = await Promise.race([
          window.electronApi!.focusAoe2ForGameplay(matchId),
          new Promise<{ focused: false }>((resolve) => {
            timeout = window.setTimeout(() => resolve({ focused: false }), 8_000);
          })
        ]);
        if (timeout !== undefined) window.clearTimeout(timeout);
        if (handoff.focused) {
          log("Showing AoE2 after game start");
        } else {
          log("AoE2 gameplay focus was not confirmed; match lifecycle continued");
          notify("Switch to AoE2 to continue", "warning", {
            detail: "The game started, but Windows did not allow Empire League to bring it to the foreground.",
            durationMs: 10_000,
            dismissible: true
          });
        }
      } catch (error) {
        log(`AoE2 gameplay focus failed; match lifecycle continued: ${error instanceof Error ? error.message : String(error)}`);
        notify("Switch to AoE2 to continue", "warning", {
          detail: "The game started, but Empire League could not complete the foreground handoff.",
          durationMs: 10_000,
          dismissible: true
        });
      } finally {
        setState((previous) => ({
          ...previous,
          queueStatus: "in_game",
          roomSetupMilestone: null,
          transitionInputLocked: false,
          activeMatch: previous.activeMatch ? { ...previous.activeMatch, status: "in_game" } : null
        }));
        await window.electronApi!.setLobbyInputLock(false).catch(() => ({ locked: false }));
      }
    })().finally(() => {
      gameRevealInFlightRef.current = null;
    });
    return gameRevealInFlightRef.current;
  }

  function updateSettings(patch: Partial<UserSettings>): void {
    setState((previous) => {
      const settings = { ...previous.settings, ...patch };
      window.localStorage.setItem(settingsKey, JSON.stringify(settings));
      return { ...previous, settings };
    });
  }

  async function setAoe2LanguageOverride(languageId: number | null): Promise<void> {
    if (languageId !== null && !isAoe2LanguageId(languageId)) return;
    if (!window.electronApi) {
      updateSettings({ aoe2LanguageOverrideId: languageId });
      return;
    }
    try {
      const localization = await window.electronApi.setAoe2LanguageOverride(languageId);
      updateSettings({ aoe2LanguageOverrideId: languageId });
      setAoe2Localization(localization);
      log(`AOE2_LANGUAGE|Override=${languageId !== null}|Id=${localization.languageId ?? "none"}|Code=${localization.languageCode}|Name=${localization.languageName}`);
    } catch (error) {
      log(`AOE2_LANGUAGE|Override=failed|Error=${error instanceof Error ? error.message : "unknown"}`);
      notify("The AoE2 language could not be changed", "danger");
    }
  }

  function claimCustomLobbyAutomationStep(key: string): boolean {
    if (customLobbyAutomationStepsRef.current.has(key)) return false;
    customLobbyAutomationStepsRef.current.add(key);
    return true;
  }

  function releaseCustomLobbyAutomationStep(key: string): void {
    customLobbyAutomationStepsRef.current.delete(key);
  }

  function clearCustomLobbyAutomationSteps(roomId: string): void {
    const prefix = `${roomId}:`;
    for (const key of customLobbyAutomationStepsRef.current) {
      if (key.startsWith(prefix)) customLobbyAutomationStepsRef.current.delete(key);
    }
  }

  async function openExternalUrl(url: string): Promise<void> {
    if (lobbyAutomationActive || customLobbyAutomationActive || state.transitionInputLocked) {
      notify("External links are unavailable while the game is being prepared.", "warning", {
        detail: "Wait for the countdown and lobby automation to finish before opening this link."
      });
      return;
    }
    if (window.electronApi) {
      await window.electronApi.openExternalUrl(url);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const value: AppContextValue = {
    state,
    lobbyAutomationActive,
    setLobbyAutomationActive,
    customLobbyAutomationActive,
    setCustomLobbyAutomationActive,
    claimCustomLobbyAutomationStep,
    releaseCustomLobbyAutomationStep,
    clearCustomLobbyAutomationSteps,
    weeklyQueueActive,
    setWeeklyQueueActive,
    page,
    setPage,
    selectedProfileId,
    openPlayerProfile: (playerId) => {
      if (page !== "profile") {
        setProfileReturnPage(page);
        profileReturnScrollRef.current = document.querySelector<HTMLElement>(".main-area")?.scrollTop ?? 0;
      }
      setSelectedProfileId(playerId);
      setPage("profile");
    },
    returnFromPlayerProfile: () => {
      pendingScrollRestoreRef.current = {
        page: profileReturnPage,
        top: profileReturnScrollRef.current
      };
      setSelectedProfileId(null);
      setPage(profileReturnPage);
    },
    queues: queueDefinitions,
    aoe2Language: aoe2Localization.languageName,
    aoe2LanguageCode: aoe2Localization.languageCode,
    aoe2LanguageId: aoe2Localization.languageId,
    localizeAoe2Name: (canonicalName) => aoe2Localization.names[canonicalName] ?? canonicalName,
    localizeAoe2MapDescription: (canonicalName, fallback) => aoe2Localization.mapDescriptions[canonicalName] ?? fallback,
    getLocalizedAoe2CivilizationBonuses: (canonicalName) => aoe2Localization.civilizationBonuses[canonicalName],
    ensureAoe2Ready,
    startQueue,
    updateActiveQueue,
    cancelQueue,
    acceptMatch,
    declineMatch,
    prepareLobby,
    openAoe2,
    simulateMatchEnd,
    returnToMatchmaking,
    updateMockConfig,
    updateSettings,
    setAoe2LanguageOverride,
    openExternalUrl,
    notify,
    appendDiagnosticLog: log,
    dismissNotification: dismissNotificationById,
    clearError: () => setState((previous) => ({
      ...previous,
      error: null,
      queueStatus: "idle",
      notifications: previous.error?.notificationId
        ? previous.notifications.filter((item) => item.id !== previous.error?.notificationId)
        : previous.notifications
    })),
    authStatus,
    authError,
    signInWithSteam,
    signOut,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {incompatibleUiMods.length > 0 && (
        <div className="modal-backdrop ui-mod-warning-backdrop" role="presentation">
          <section className="match-modal ui-mod-warning-modal" role="alertdialog" aria-modal="true" aria-labelledby="ui-mod-warning-title">
            <div className="ui-mod-warning-icon"><AlertTriangle size={34} strokeWidth={2.4} aria-hidden="true" /></div>
            <span className="eyebrow danger">Lobby automation blocked</span>
            <h2 id="ui-mod-warning-title">These UI mods will break lobby automation</h2>
            <p>Empire League detected mods that replace the exact AoE2 menu screens or buttons it must control. Disable them before matchmaking.</p>
            <ul className="ui-mod-warning-list">
              {incompatibleUiMods.map((mod) => <li key={mod}>{mod}</li>)}
            </ul>
            <p className="ui-mod-warning-consequence">Continuing with these mods enabled can leave you or your opponent stuck during lobby setup.</p>
            <div className="modal-actions">
              <button className="primary" type="button" disabled={disablingUiMods} autoFocus onClick={() => void disableIncompatibleUiMods()}>
                {disablingUiMods && <Loader2 className="spin" size={17} aria-hidden="true" />}
                {disablingUiMods ? "Disabling…" : "Disable mods"}
              </button>
              <button className="secondary" type="button" disabled={disablingUiMods} onClick={() => setIncompatibleUiMods([])}>Continue anyway</button>
            </div>
          </section>
        </div>
      )}
    </AppContext.Provider>
  );
}

function authErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof TypeError && /failed to fetch|networkerror|network request failed/i.test(error.message)) {
    return "Error: Matchmaking server is down.";
  }
  return error instanceof Error ? error.message : fallback;
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

async function launchAoe2WithRetry(onRetry: (detail: string) => void): Promise<boolean> {
  if (!window.electronApi) return false;

  const firstLaunch = await window.electronApi.launchAoe2();
  if (!firstLaunch.launched) {
    throw new Error(firstLaunch.message ?? "Steam did not accept the AoE2 DE launch request.");
  }
  if (await waitForAoe2Window(aoe2LaunchAttemptTimeoutMs)) return true;

  const process = await window.electronApi.detectAoe2Process();
  if (process.running) {
    onRetry("AoE2 is still starting. Waiting another 30 seconds.");
  } else {
    onRetry("AoE2 did not start. Retrying the Steam launch once.");
    const retry = await window.electronApi.launchAoe2();
    if (!retry.launched) {
      throw new Error(retry.message ?? "Steam did not accept the AoE2 DE retry request.");
    }
  }

  return waitForAoe2Window(aoe2LaunchAttemptTimeoutMs);
}

function delayForStartup(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function delayForLobbyInput(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function getLobbyMapName(map?: MapDefinition): string {
  return (map && getCatalogMap(map.id)?.gameMapName) ?? mapCatalog.maps[0].gameMapName;
}

function isCustomLobbyMap(map?: MapDefinition): boolean {
  return map !== undefined
    && (aoe2UiManifest.mapPicker.customMapNames as readonly string[]).includes(getLobbyMapName(map));
}

function aoe2SelectionForPreference(
  preference: import("../../shared/contracts/matchmaking").CivilizationPreference | undefined
): import("../../shared/aoe2UiManifest").Aoe2CivilizationSelection | null {
  if (!preference) return null;
  if (preference.mode === "pick") {
    return (preference.civilization as import("../../shared/aoe2UiManifest").Aoe2Civilization | undefined) ?? null;
  }
  if (preference.mode === "random") return null;
  if (preference.mode === "mirror") return "Mirror";
  return null;
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
    if (!raw) return defaultSettings;
    const saved = JSON.parse(raw) as Partial<UserSettings>;
    return {
      launchAoe2OnStartup: typeof saved.launchAoe2OnStartup === "boolean"
        ? saved.launchAoe2OnStartup
        : defaultSettings.launchAoe2OnStartup,
      matchNotifications: typeof saved.matchNotifications === "boolean"
        ? saved.matchNotifications
        : defaultSettings.matchNotifications,
      autoRejectFamilySharing: typeof saved.autoRejectFamilySharing === "boolean"
        ? saved.autoRejectFamilySharing
        : defaultSettings.autoRejectFamilySharing,
      maximumLowerOpponentRatingGap: [0, 200, 300, 400, 500].includes(
        Number(saved.maximumLowerOpponentRatingGap)
      )
        ? Number(saved.maximumLowerOpponentRatingGap)
        : defaultSettings.maximumLowerOpponentRatingGap,
      aoe2LanguageOverrideId: isAoe2LanguageId(saved.aoe2LanguageOverrideId)
        ? saved.aoe2LanguageOverrideId
        : null
    };
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
