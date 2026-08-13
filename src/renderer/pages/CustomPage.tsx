import { Check, Crown, LogIn, MessageSquare, Plus, RefreshCw, Send, Shield, Users, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { civilizations } from "../../shared/civilizations";
import type { Aoe2CivilizationSelection } from "../../shared/aoe2UiManifest";
import { defaultCustomLobbyGameSettings, type CustomLobbyGameSettings, type CustomLobbyRoom, type LocalCustomContent, type LocalCustomContentCatalog } from "../../shared/contracts/customLobby";
import { enabledMapCatalogEntries } from "../../shared/mapCatalog";
import { customContentHostRecoveryMs, lobbySetupTiming } from "../../shared/runtimeConfig";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { customLobbyService } from "../services/customLobbyService";
import { estimateCustomLobbySetupMs } from "../services/lobbyTimingService";
import { replayHasEnded } from "../services/replayMetadataService";
import { stopYouTubeShorts } from "../services/shortsPlaybackService";
import { useAppStore } from "../state/appStore";

const emptyCatalog: LocalCustomContentCatalog = { maps: [], dataMods: [], scannedRoots: [], scannedAt: new Date(0).toISOString() };

export function CustomPage() {
  const { state, notify, ensureAoe2Ready, localizeAoe2Name } = useAppStore();
  const [rooms, setRooms] = useState<CustomLobbyRoom[]>([]);
  const [catalog, setCatalog] = useState(emptyCatalog);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [scanningContent, setScanningContent] = useState(true);
  const [creating, setCreating] = useState(false);
  const [lobbyName, setLobbyName] = useState(`${state.currentUser.displayName}'s Lobby`);
  const [contentKind, setContentKind] = useState<"map" | "scenario">("map");
  const [mapId, setMapId] = useState("");
  const [scenarioId, setScenarioId] = useState("");
  const [dataModId, setDataModId] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [pending, setPending] = useState(false);

  const customRooms = rooms.filter((room) => room.source !== "weekly");
  const activeRoom = customRooms.find((room) => room.players.some((player) => player.id === state.currentUser.id));
  const canEnterCustomLobby = ["idle", "cancelled", "completed"].includes(state.queueStatus)
    && (!state.activeMatch || state.queueStatus === "completed");

  function guardCustomLobbyEntry(): boolean {
    if (canEnterCustomLobby) return true;
    notify("Leave matchmaking before entering a custom lobby.", "warning");
    return false;
  }

  async function refreshRooms() {
    setLoadingRooms(true);
    try {
      setRooms(await customLobbyService.list());
    } catch (error) {
      notify("Custom lobbies could not be loaded.", "danger", { detail: messageFor(error) });
    } finally {
      setLoadingRooms(false);
    }
  }

  async function rescanContent() {
    setScanningContent(true);
    try {
      const nextCatalog = await (window.electronApi?.scanLocalCustomContent() ?? Promise.resolve(emptyCatalog));
      setCatalog(nextCatalog);
      setMapId((current) => nextCatalog.maps.some((item) => item.id === current) ? current : "");
      setScenarioId((current) => nextCatalog.maps.some((item) => item.id === current) ? current : "");
      setDataModId((current) => nextCatalog.dataMods.some((item) => item.id === current) ? current : "");
    } catch (error) {
      notify("Local content could not be scanned.", "danger", { detail: messageFor(error) });
    } finally {
      setScanningContent(false);
    }
  }

  useEffect(() => {
    void refreshRooms();
    void rescanContent();
    return customLobbyService.onEvent((event) => {
      setRooms((current) => {
        const closedRoom = event.closedRoomId
          ? current.find((room) => room.source !== "weekly"
            && room.id === event.closedRoomId
            && room.players.some((player) => player.id === state.currentUser.id))
          : undefined;
        if (closedRoom && event.closeReason) {
          notify("Custom lobby closed.", "warning", { detail: event.closeReason });
        }
        return event.rooms;
      });
    });
  }, []);

  async function createRoom() {
    if (!guardCustomLobbyEntry()) return;
    setPending(true);
    try {
      const contentId = contentKind === "map" ? mapId : scenarioId;
      await customLobbyService.create({
        name: lobbyName.trim(),
        maxPlayers,
        map: catalog.maps.find((item) => item.id === contentId),
        dataMod: catalog.dataMods.find((item) => item.id === dataModId)
      });
      setCreating(false);
    } catch (error) {
      notify("The lobby could not be created.", "danger", { detail: messageFor(error) });
    } finally {
      setPending(false);
    }
  }

  async function openCreateRoom() {
    if (!guardCustomLobbyEntry()) return;
    if (await ensureAoe2Ready("custom")) setCreating(true);
  }

  async function joinRoom(roomId: string) {
    if (!guardCustomLobbyEntry()) return;
    if (!(await ensureAoe2Ready("custom"))) return;
    setPending(true);
    try {
      const joinedRoom = await customLobbyService.join(roomId, {
        id: state.currentUser.id,
        displayName: state.currentUser.displayName
      });
      setRooms((current) => current.map((room) => room.id === joinedRoom.id ? joinedRoom : room));
    } catch (error) {
      notify("Could not join the lobby.", "danger", { detail: messageFor(error) });
    } finally {
      setPending(false);
    }
  }

  if (activeRoom) {
    return <NetworkLobby room={activeRoom} currentPlayerId={state.currentUser.id} notify={notify} />;
  }

  return (
    <section className="custom-page">
      {creating && (
        <article className="panel custom-create-card">
          <div className="custom-create-heading">
            <div><span className="eyebrow">New room</span><h2>Lobby settings</h2></div>
            <button className="secondary" type="button" onClick={() => void rescanContent()} disabled={scanningContent}><RefreshCw size={16} className={scanningContent ? "spin" : ""} /> {scanningContent ? "Scanning…" : "Rescan Content"}</button>
          </div>
          <label>Lobby name<input value={lobbyName} maxLength={64} onChange={(event) => setLobbyName(event.target.value)} /></label>
          <ThemedSelect
            label="Maximum players"
            value={String(maxPlayers)}
            onChange={(value) => setMaxPlayers(Number(value))}
            options={Array.from({ length: 7 }, (_, index) => {
              const count = index + 2;
              return { value: String(count), label: `${count} players` };
            })}
          />
          <div className="custom-content-kind-field">
            <span>Content type</span>
            <div className="custom-content-kind" role="group" aria-label="Content type">
              <button type="button" aria-pressed={contentKind === "map"} onClick={() => setContentKind("map")}>Map</button>
              <button type="button" aria-pressed={contentKind === "scenario"} onClick={() => setContentKind("scenario")}>Scenario</button>
            </div>
          </div>
          {contentKind === "map"
            ? <ContentSelect label="Map" items={catalog.maps.filter((item) => item.kind === "map")} value={mapId} onChange={setMapId} />
            : <ContentSelect label="Scenario" items={catalog.maps.filter((item) => item.kind === "scenario")} value={scenarioId} onChange={setScenarioId} />}
          <ContentSelect label="Data mod (optional)" items={catalog.dataMods} value={dataModId} onChange={setDataModId} />
          {[...catalog.maps, ...catalog.dataMods].some((item) => !item.enabled) && <small className="custom-disabled-mod-hint">Disabled mods must be enabled at the mods interface inside the game.</small>}
          <div className="custom-scan-meta"><span>{catalog.maps.length} maps/scenarios</span><span>{catalog.dataMods.length} data mods</span><span>{catalog.scannedRoots.length} folders scanned</span></div>
          <div className="custom-create-actions">
            <button className="primary" type="button" disabled={!lobbyName.trim() || !(contentKind === "map" ? mapId : scenarioId) || pending} onClick={() => void createRoom()}>{pending ? "Creating…" : "Create Lobby"}</button>
            <button className="secondary" type="button" disabled={pending} onClick={() => setCreating(false)}>Cancel</button>
          </div>
        </article>
      )}

      <div className="custom-room-section">
        <div className="custom-room-toolbar">
          {!creating && <button className="primary" type="button" disabled={state.gameStatus === "loading" || !canEnterCustomLobby} onClick={() => void openCreateRoom()}><Plus size={17} /> {state.gameStatus === "loading" ? "Launching AoE2…" : "New Lobby"}</button>}
          <button className="secondary" type="button" onClick={() => void refreshRooms()} disabled={loadingRooms}><RefreshCw size={16} className={loadingRooms ? "spin" : ""} /> {loadingRooms ? "Refreshing…" : "Refresh Rooms"}</button>
        </div>
        <div className="custom-room-list">
          <div className="custom-room-list-header"><span>Room</span><span>Content</span><span>Players</span><span>Status</span><span /></div>
          {customRooms.map((room) => (
            <article className="custom-room-row" key={room.id}>
              <div><strong data-ui-translation="off">{room.name}</strong><small>{room.demo ? "Demo room · " : ""}Hosted by <span data-ui-translation="off">{room.players.find((player) => player.host)?.displayName ?? "Unknown"}</span></small></div>
              <div><strong>{room.map?.name ?? "Standard map"}</strong><small>{room.dataMod?.name ?? "No data mod"}</small></div>
              <div className="room-player-count"><Users size={16} /> {room.players.length}/{room.maxPlayers}</div>
              <span className={`custom-room-status ${room.status}`}>{customRoomStatusLabel(room.status)}</span>
              <button className="secondary" type="button" disabled={room.status !== "open" || room.players.length >= room.maxPlayers || pending || state.gameStatus === "loading" || !canEnterCustomLobby} onClick={() => void joinRoom(room.id)}><LogIn size={16} /> {state.gameStatus === "loading" ? "Launching…" : "Join"}</button>
            </article>
          ))}
          {!loadingRooms && !customRooms.length && <div className="panel empty-state">No custom rooms are open. Create the first one.</div>}
        </div>
      </div>
    </section>
  );
}

function ContentSelect({ label, items, value, onChange }: { label: string; items: LocalCustomContent[]; value: string; onChange: (value: string) => void }) {
  const orderedItems = [
    ...items.filter((item) => item.enabled && !item.builtIn),
    ...items.filter((item) => !item.enabled && !item.builtIn),
    ...items.filter((item) => item.builtIn)
  ];
  return <div><ThemedSelect label={label} value={value} onChange={onChange} options={[{ value: "", label: `Choose ${label.toLowerCase()}…` }, ...orderedItems.map((item) => ({ value: item.id, label: `${item.name}${item.enabled ? "" : ` (Disabled: ${item.modName ?? "enable in AoE2 Mods"})`}`, disabled: !item.enabled }))]} />{value && <small>{items.find((item) => item.id === value)?.source}</small>}</div>;
}

export function NetworkLobby({ room, currentPlayerId, notify, weeklyView }: {
  room: CustomLobbyRoom;
  currentPlayerId: string;
  notify: ReturnType<typeof useAppStore>["notify"];
  weeklyView?: ReactNode;
}) {
  const {
    setLobbyAutomationActive,
    setCustomLobbyAutomationActive,
    claimCustomLobbyAutomationStep,
    releaseCustomLobbyAutomationStep,
    clearCustomLobbyAutomationSteps,
    localizeAoe2Name
  } = useAppStore();
  const [draft, setDraft] = useState("");
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const replayResultInFlight = useRef(false);
  const gameStartRevealRef = useRef<Promise<void> | null>(null);
  const activeAutomationAttemptRef = useRef(room.automationAttemptId);
  const startRequestInFlight = useRef(false);
  const [startRequestPending, setStartRequestPending] = useState(false);
  const me = room.players.find((player) => player.id === currentPlayerId)!;
  const isHost = room.hostId === currentPlayerId;
  activeAutomationAttemptRef.current = room.automationAttemptId;
  const slots = useMemo(() => Array.from({ length: room.maxPlayers }, (_, index) => room.players.find((player) => player.slot === index + 1)), [room]);
  const latestMessageId = room.messages.at(-1)?.id;

  const act = (promise: Promise<unknown>) => void promise.catch((error) => notify("Lobby update failed.", "danger", { detail: messageFor(error) }));

  useEffect(() => () => {
    activeAutomationAttemptRef.current = undefined;
  }, [room.id]);

  useEffect(() => {
    const messageList = chatMessagesRef.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  }, [room.id, latestMessageId]);

  useEffect(() => {
    const isCustomRoom = room.source !== "weekly";
    if (room.status !== "open") {
      startRequestInFlight.current = false;
      setStartRequestPending(false);
    }
    if (room.status === "launching") {
      setLobbyAutomationActive(true);
      if (isCustomRoom) setCustomLobbyAutomationActive(true);
      return;
    }
    if (room.status === "started") {
      setLobbyAutomationActive(true);
      if (isCustomRoom) setCustomLobbyAutomationActive(true);
      void armGameStartReveal().finally(() => {
        setLobbyAutomationActive(false);
        if (isCustomRoom) setCustomLobbyAutomationActive(false);
      });
      return;
    }
    setLobbyAutomationActive(false);
    if (isCustomRoom) setCustomLobbyAutomationActive(false);
  }, [room.source, room.status, setCustomLobbyAutomationActive, setLobbyAutomationActive]);

  async function startCustomGame() {
    if (startRequestInFlight.current || room.status !== "open") return;
    startRequestInFlight.current = true;
    setStartRequestPending(true);
    try {
      await customLobbyService.start(room.id);
    } catch (error) {
      startRequestInFlight.current = false;
      setStartRequestPending(false);
      throw error;
    }
  }

  useEffect(() => {
    if (room.status === "open") {
      clearCustomLobbyAutomationSteps(room.id);
      return;
    }
    if (room.status !== "launching" || !window.electronApi) return;
    const automationAttemptId = room.automationAttemptId;
    if (!automationAttemptId) return;
    const content = room.map;
    const customContentFlow = requiresCustomContentTransfer(room);
    const hostSetupKey = `${room.id}:host-setup`;
    if (isHost && !room.platformLobbyId && claimCustomLobbyAutomationStep(hostSetupKey)) {
      void (async () => {
        try {
          if (!content) throw new Error("Choose a map or scenario before starting.");
          await ensureAoe2Running();
          if (room.source === "weekly") {
            // Weekly rooms begin as soon as matchmaking fills. Give the queue
            // response, renderer transition, and AoE2 foreground guard the same
            // settle window used by ranked host automation before sending input.
            await new Promise((resolve) => window.setTimeout(resolve, lobbySetupTiming.hostLobbyAutomationSettleMs));
          }
          // Keep settings inside the original fourth argument so an app whose
          // preload has not hot-reloaded cannot silently discard them.
          const result = await window.electronApi!.runAoe2CreateLobbySequence(content.gameName, room.maxPlayers, content.kind === "scenario" ? "scenario" : "map", {
            context: "custom",
            gameSettings: room.gameSettings
          });
          if (activeAutomationAttemptRef.current !== automationAttemptId) return;
          if (!result.sent || !result.lobbyUri) throw new Error(result.message || "AoE2 lobby creation failed.");
          await customLobbyService.publish(room.id, result.lobbyUri, automationAttemptId);
        } catch (error) {
          await customLobbyService.failStart(room.id, messageFor(error), automationAttemptId);
          releaseCustomLobbyAutomationStep(hostSetupKey);
        }
      })();
      return;
    }

    const guestJoinKey = `${room.id}:guest-join:${room.platformLobbyId ?? "pending"}`;
    if (!isHost && room.platformLobbyId && !me.aoeJoined && claimCustomLobbyAutomationStep(guestJoinKey)) {
      void (async () => {
        try {
          const opened = await window.electronApi!.openAoe2Lobby(room.platformLobbyId!, customContentFlow);
          if (!opened.opened) throw new Error("AoE2 did not open the custom lobby.");
          if (content?.kind !== "scenario" || room.source === "weekly") await applyMapPlayerSettings(me);
          await customLobbyService.reportJoined(room.id);
        } catch (error) {
          notify("Could not join the AoE2 lobby.", "danger", { detail: messageFor(error), durationMs: null });
          releaseCustomLobbyAutomationStep(guestJoinKey);
        }
      })();
      return;
    }

    const hostPlayer = room.players.find((player) => player.host);
    const guestReadyKey = `${room.id}:guest-ready:${room.platformLobbyId ?? "pending"}`;
    if (!isHost && me.aoeJoined && hostPlayer?.aoeReady && !me.aoeReady && claimCustomLobbyAutomationStep(guestReadyKey)) {
      void (async () => {
        try {
          const deadline = Date.now() + lobbySetupTiming.customMapTransferTimeoutMs;
          let contentAcceptanceReported = false;
          let ready: Awaited<ReturnType<typeof window.electronApi.runAoe2LobbyCursorAction>>;
          do {
            await new Promise((resolve) => window.setTimeout(resolve, lobbySetupTiming.customMapTransferPollMs));
            ready = await window.electronApi!.runAoe2LobbyCursorAction("guest-ready", "custom");
            if (!ready.sent && customContentFlow && !contentAcceptanceReported) {
              const confirmation = await window.electronApi!.runAoe2LobbyCursorAction("content-confirm", "custom");
              if (confirmation.sent) {
                await customLobbyService.reportContentAccepted(room.id);
                contentAcceptanceReported = true;
                await new Promise((resolve) => window.setTimeout(resolve, customContentHostRecoveryMs));
              }
            }
          } while (!ready.sent && Date.now() < deadline);
          if (!ready.sent) {
            throw new Error("The guest Ready button remained unavailable after the file-transfer timeout.");
          }
          if (customContentFlow && !contentAcceptanceReported) {
            await customLobbyService.reportContentAccepted(room.id);
            contentAcceptanceReported = true;
            await new Promise((resolve) => window.setTimeout(resolve, customContentHostRecoveryMs));
            ready = await window.electronApi!.runAoe2LobbyCursorAction("guest-ready", "custom");
            if (!ready.sent) throw new Error("Guest Ready did not remain available after host transfer recovery.");
          }
          await customLobbyService.reportAoeReady(room.id);
        } catch (error) {
          notify("Could not ready in the AoE2 lobby.", "danger", { detail: messageFor(error), durationMs: null });
          releaseCustomLobbyAutomationStep(guestReadyKey);
        }
      })();
      return;
    }

    const guestsJoined = room.players.filter((player) => !player.host).every((player) => player.aoeJoined);
    const acceptedContentCount = room.players.filter((player) => !player.host && player.aoeContentAccepted).length;
    const hostReadyKey = `${room.id}:host-ready:${room.platformLobbyId ?? "pending"}:accepted-${acceptedContentCount}`;
    if (isHost && room.platformLobbyId && guestsJoined && !me.aoeReady && claimCustomLobbyAutomationStep(hostReadyKey)) {
      void (async () => {
        try {
          // Content acceptance temporarily removes the host's ready state.
          // The accepted-content phase in the step key permits this same
          // workflow to run again without introducing a second delayed task.
          if (acceptedContentCount > 0) {
            await new Promise((resolve) => window.setTimeout(resolve, customContentHostRecoveryMs));
          }
          if (activeAutomationAttemptRef.current !== automationAttemptId) return;
          // Player settings were applied before the host first readied. During
          // custom-content recovery AoE2 may leave that Ready state intact; in
          // that case trying to open the civilization picker is ignored and its
          // lobby-background pixels are misreported as a failed selection.
          // Recovery only needs to restore/verify Ready, not reapply settings.
          if (acceptedContentCount === 0 && (content?.kind !== "scenario" || room.source === "weekly")) {
            await applyMapPlayerSettings(me);
          }
          if (activeAutomationAttemptRef.current !== automationAttemptId) return;
          const ready = await window.electronApi!.runAoe2LobbyCursorAction("host-ready", "custom");
          if (activeAutomationAttemptRef.current !== automationAttemptId) return;
          if (!ready.sent) throw new Error(ready.message || "AoE2 could not ready the host.");
          await customLobbyService.reportAoeReady(room.id);
        } catch (error) {
          await customLobbyService.failStart(room.id, messageFor(error), automationAttemptId);
          releaseCustomLobbyAutomationStep(hostReadyKey);
        }
      })();
      return;
    }

    const allAoeReady = room.players.every((player) => player.aoeReady);
    if (allAoeReady) void armGameStartReveal();
    const startKey = `${room.id}:aoe-start`;
    if (isHost && allAoeReady && claimCustomLobbyAutomationStep(startKey)) {
      void (async () => {
        try {
          const started = await window.electronApi!.runAoe2LobbyCursorAction("start", "custom");
          if (!started.sent) throw new Error(started.message || "AoE2 could not start the game.");
          await customLobbyService.completeStart(
            room.id,
            new Date(Date.now() - lobbySetupTiming.startGameSettleMs).toISOString()
          );
        } catch (error) {
          await customLobbyService.failStart(room.id, messageFor(error), automationAttemptId);
          releaseCustomLobbyAutomationStep(startKey);
        }
      })();
    }
  }, [room, isHost, me, notify]);

  useEffect(() => {
    if (room.status !== "started" || !window.electronApi) return;
    void armGameStartReveal();
  }, [room.id, room.status]);

  useEffect(() => {
    if (room.status !== "started" || !window.electronApi) return;
    return window.electronApi.onReplayEnded((filePath) => {
      if (replayResultInFlight.current) return;
      replayResultInFlight.current = true;
      void replayHasEnded(filePath)
        .then(async (ended) => {
          if (!ended) {
            replayResultInFlight.current = false;
            return;
          }
          await window.electronApi!.confirmReplayEnded();
          await customLobbyService.finish(room.id);
        })
        .catch((error) => {
          replayResultInFlight.current = false;
          notify("The finished custom game could not be detected.", "danger", { detail: messageFor(error) });
        });
    });
  }, [room.id, room.status, notify]);

  async function ensureAoe2Running() {
    const process = await window.electronApi!.detectAoe2Process();
    if (process.running) return;
    const launched = await window.electronApi!.launchAoe2();
    if (!launched.launched) throw new Error(launched.message || "AoE2 could not be launched.");
    const deadline = Date.now() + 45_000;
    while (Date.now() < deadline) {
      await new Promise((resolve) => window.setTimeout(resolve, 1_000));
      if ((await window.electronApi!.detectAoe2Process()).windowReady) return;
    }
    throw new Error("AoE2 did not become ready in time.");
  }

  function armGameStartReveal(): Promise<void> {
    const api = window.electronApi;
    if (!api) return Promise.resolve();
    if (gameStartRevealRef.current) return gameStartRevealRef.current;
    gameStartRevealRef.current = new Promise<void>((resolve) => {
      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        window.clearTimeout(timer);
        stopLoadingScreenListener();
        stopReplayStartedListener();
        void (async () => {
          try {
            await stopYouTubeShorts();
            const handoff = await api.focusAoe2ForGameplay(`custom:${room.id}`);
            if (!handoff.focused) throw new Error("AoE2 could not be focused for gameplay.");
          } catch (error) {
            notify("AoE2 could not be revealed after game start.", "danger", { detail: messageFor(error) });
          } finally {
            await api.setLobbyInputLock(false);
            resolve();
          }
        })();
      };
      const stopLoadingScreenListener = api.onLoadingScreen(reveal);
      const stopReplayStartedListener = api.onReplayStarted(reveal);
      const timer = window.setTimeout(reveal, lobbySetupTiming.revealAfterStartMs);
      void api.startLoadingScreenWatch().then((watch) => {
        if (!watch.started) notify("Loading-screen detection could not be started.", "warning", { detail: watch.message });
      }).catch((error) => notify("Loading-screen detection could not be started.", "warning", { detail: messageFor(error) }));
      void api.startReplayEndDetection().then((detection) => {
        if (!detection.started) {
          notify("Post-game return detection could not be started.", "danger", {
            detail: detection.message || "Replay detection could not be started."
          });
        }
      }).catch((error) => notify("Post-game return detection could not be started.", "danger", { detail: messageFor(error) }));
    });
    return gameStartRevealRef.current;
  }

  async function applyMapPlayerSettings(player: CustomLobbyRoom["players"][number]) {
    // Fresh AoE2 lobbies already initialize every slot to Random. Opening the
    // picker just to re-select Random can leave the picker open and prevent the
    // guest from reporting that it joined, which stalls the host indefinitely.
    if (room.source === "weekly" && player.civilization === "Random") return;
    const civilization = await window.electronApi!.selectAoe2Civilization(player.civilization as Aoe2CivilizationSelection, player.slot, "custom");
    if (!civilization.sent) throw new Error(civilization.message);
    if (player.team === 1 || player.team === 2) {
      const team = await window.electronApi!.selectAoe2Team(player.team, player.slot, "custom");
      if (!team.sent) throw new Error(team.message);
    }
  }
  function submitChat(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    act(customLobbyService.sendMessage(room.id, draft.trim()));
    setDraft("");
  }

  if (room.source === "weekly") {
    return <>{weeklyView}</>;
  }

  return (
    <section className="custom-lobby">
      <div className="custom-lobby-heading">
        <div><span className="eyebrow">Live custom lobby</span><h2 data-ui-translation="off">{room.name}</h2><p>{room.players.length}/{room.maxPlayers} players · {room.map?.name ?? "Standard map"} · {room.dataMod?.name ?? "No data mod"}</p></div>
        <button className="secondary" type="button" onClick={() => act(customLobbyService.leave(room.id))}><X size={16} /> Leave lobby</button>
      </div>
      <div className="custom-lobby-layout">
        <article className="panel lobby-roster">
          {room.map?.kind === "scenario" && <p className="scenario-settings-note">This scenario defines its own player slots, civilizations, teams, and map.</p>}
          <div className="lobby-roster-header"><strong>Players</strong><span>Team</span><span>Civilization</span><span>Status</span></div>
          {slots.map((player, index) => (
            <div className={player ? "lobby-player-row occupied" : "lobby-player-row"} key={index}>
              <div className="lobby-player-name"><span className="lobby-slot-number">{index + 1}</span>{player ? <><Shield size={17} /><strong data-ui-translation="off">{player.displayName}</strong>{player.host && <Crown size={15} />} {isHost && !player.host && !room.locked && <button className="lobby-kick" aria-label={`Remove ${player.displayName}`} onClick={() => act(customLobbyService.kick(room.id, player.id))}><X size={13} /></button>}</> : <span>Open slot</span>}</div>
              {player && room.map?.kind === "scenario" ? <><span>Scenario</span><span>Scenario-defined</span>{player.id === currentPlayerId
                ? <button className={player.ready ? "lobby-ready ready" : "lobby-ready"} onClick={() => act(customLobbyService.updatePlayer(room.id, { ready: !player.ready }))}>{player.ready && <Check size={16} />}{player.ready ? "Ready" : "Not ready"}</button>
                : <span className={player.ready ? "success" : ""}>{player.ready ? "Ready" : "Not ready"}</span>}</> : player && (player.id === currentPlayerId ? <>
                <ThemedSelect className="lobby-inline-select" label="Team" value={String(player.team)} onChange={(team) => act(customLobbyService.updatePlayer(room.id, { team: Number(team) }))} options={[{ value: "0", label: "No team" }, ...[1, 2, 3, 4].map((team) => ({ value: String(team), label: `Team ${team}` }))]} />
                <ThemedSelect className="lobby-inline-select" label="Civilization" value={player.civilization} onChange={(civilization) => act(customLobbyService.updatePlayer(room.id, { civilization }))} options={["Random", ...civilizations].map((civilization) => ({ value: civilization, label: localizeAoe2Name(civilization) }))} />
                <button className={player.ready ? "lobby-ready ready" : "lobby-ready"} onClick={() => act(customLobbyService.updatePlayer(room.id, { ready: !player.ready }))}>{player.ready && <Check size={16} />}{player.ready ? "Ready" : "Not ready"}</button>
              </> : <><span>{player.team ? `Team ${player.team}` : "No team"}</span><span>{localizeAoe2Name(player.civilization)}</span><span className={player.ready ? "success" : ""}>{player.ready ? "Ready" : "Not ready"}</span></>)}
            </div>
          ))}
        </article>
        <aside className="panel lobby-chat">
          <div className="lobby-chat-title"><MessageSquare size={18} /><strong>Lobby chat</strong></div>
          <div className="lobby-chat-messages" aria-live="polite" ref={chatMessagesRef}>{room.messages.map((message) => <p className={message.system ? "system" : ""} data-ui-translation={message.system ? undefined : "off"} key={message.id}><strong>{message.author}</strong><span>{message.text}</span></p>)}</div>
          <form onSubmit={submitChat}><input placeholder="Message lobby…" value={draft} onChange={(event) => setDraft(event.target.value)} /><button className="primary" aria-label="Send"><Send size={17} /></button></form>
        </aside>
      </div>
      <LobbyGameSettings
        settings={room.gameSettings ?? defaultCustomLobbyGameSettings}
        editable={isHost && room.status === "open" && !room.locked}
        onChange={(key, checked) => act(customLobbyService.updateSettings(room.id, { [key]: checked }))}
      />
      <div className={`custom-lobby-actions${room.status !== "open" ? " launching" : ""}`}>
        <span>{room.status === "started" || room.status === "launching" ? <GameStartCountdown room={room} /> : room.automationError ? room.automationError : room.players.every((player) => player.ready) ? "All players are ready." : "Waiting for players to ready up."}</span>
        {isHost && <button className="primary large" disabled={startRequestPending || room.status !== "open" || !room.map || !room.players.every((player) => player.ready)} onClick={() => act(startCustomGame())}>{startRequestPending || room.status !== "open" ? <>Starting<AnimatedEllipsis /></> : "Start Game"}</button>}
      </div>
    </section>
  );
}

function requiresCustomContentTransfer(room: CustomLobbyRoom): boolean {
  if (room.dataMod || room.map?.kind === "scenario") return true;
  if (!room.map) return false;
  const catalogMap = enabledMapCatalogEntries.find((entry) =>
    entry.id === room.map?.id || entry.gameMapName === room.map?.gameName
  );
  // A map absent from the built-in/catalogued pool came from the local custom
  // content scan and should follow the same guarded UGC flow as ranked custom maps.
  return catalogMap ? Boolean(catalogMap.isCustomMap) : true;
}

const customLobbySettingLabels: Array<[keyof CustomLobbyGameSettings, string]> = [
  ["lockTeams", "Lock Teams"],
  ["teamTogether", "Team Together"],
  ["teamPositions", "Team Positions"],
  ["sharedExploration", "Shared Exploration"],
  ["lockSpeed", "Lock Speed"],
  ["allowHandicap", "Allow Handicap"],
  ["allowCheats", "Allow Cheats"],
  ["turboMode", "Turbo Mode"],
  ["fullTechTree", "Full Tech Tree"],
  ["empireWarsMode", "Empire Wars Mode"],
  ["suddenDeathMode", "Sudden Death Mode"],
  ["regicideMode", "Regicide Mode"],
  ["antiquityMode", "Antiquity Mode"]
];

function LobbyGameSettings({ settings, editable, onChange }: {
  settings: CustomLobbyGameSettings;
  editable: boolean;
  onChange: (key: keyof CustomLobbyGameSettings, checked: boolean) => void;
}) {
  return <article className="panel custom-game-settings">
    <div className="custom-game-settings-heading"><div><span className="eyebrow">Team & advanced settings</span><h3>Game options</h3></div><small>{editable ? "Host controls" : "Set by host"}</small></div>
    <div className="custom-game-settings-grid">{customLobbySettingLabels.map(([key, label]) => <label key={key} className={settings[key] ? "selected" : ""}>
      <input type="checkbox" checked={settings[key]} disabled={!editable} onChange={(event) => onChange(key, event.target.checked)} />
      <span>{label}</span>
    </label>)}
      <label className="selected required-setting" title="Empire League requires recorded games to verify results.">
        <input type="checkbox" checked disabled />
        <span>Record Game <small>Required</small></span>
      </label>
    </div>
  </article>;
}

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

function customRoomStatusLabel(status: CustomLobbyRoom["status"]): string {
  if (status === "open") return "Open";
  if (status === "launching") return "Starting";
  return "In Game";
}

export function AnimatedEllipsis() {
  return <span className="animated-ellipsis" aria-hidden="true"><i /><i /><i /></span>;
}

function GameStartCountdown({ room }: { room: CustomLobbyRoom }) {
  const [remaining, setRemaining] = useState(() => customGameCountdownRemaining(room));

  useEffect(() => {
    const update = () => setRemaining(customGameCountdownRemaining(room));
    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, [room.status, room.automationStartedAt, room.gameStartedAt]);

  return remaining > 0
    ? <span className="custom-game-countdown-label" aria-live="polite">Game starts in <strong className="custom-game-countdown">{remaining}</strong></span>
    : <>Entering game<AnimatedEllipsis /></>;
}

function customGameCountdownRemaining(room: CustomLobbyRoom): number {
  const startedAt = room.status === "launching" ? room.automationStartedAt : room.gameStartedAt;
  const countdownMs = room.status === "launching" ? estimateCustomLobbySetupMs(room) : 5_000;
  if (!startedAt) return Math.ceil(countdownMs / 1_000);
  const elapsedMs = Math.max(0, Date.now() - new Date(startedAt).getTime());
  return Math.max(0, Math.ceil((countdownMs - elapsedMs) / 1_000));
}
