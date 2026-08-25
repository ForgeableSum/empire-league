import { CalendarDays, Check, Clock3, Shield, Sparkles, Swords, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { civilizations } from "../../shared/civilizations";
import type { CustomLobbyRoom } from "../../shared/contracts/customLobby";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { customLobbyService } from "../services/customLobbyService";
import { weeklyQueueService, type WeeklyQueueStatus } from "../services/weeklyQueueService";
import { useAppStore } from "../state/appStore";
import { useParty } from "../state/partyContext";
import { AnimatedEllipsis, NetworkLobby } from "./CustomPage";

export function WeeklyPage() {
  const {
    state, ensureAoe2Ready, notify, setWeeklyQueueActive, localizeAoe2Name,
    setLobbyAutomationActive, clearCustomLobbyAutomationSteps, retireCompletedRankedSession
  } = useAppStore();
  const [status, setStatus] = useState<WeeklyQueueStatus | null>(null);
  const [room, setRoom] = useState<CustomLobbyRoom>();
  const [civilization, setCivilization] = useState("Random");
  const [pending, setPending] = useState(false);
  const [now, setNow] = useState(Date.now());
  const activeRoomIdRef = useRef<string | undefined>(undefined);
  const { snapshot: partySnapshot } = useParty();

  activeRoomIdRef.current = room?.id;

  useEffect(() => {
    void weeklyQueueService.status().then((next) => {
      setStatus(next);
      setRoom(next.room);
    }).catch((error) => notify("Weekly queue could not be loaded.", "danger", { detail: messageFor(error) }));
    return customLobbyService.onEvent((event) => {
      const closedWeeklyRoomId = event.closedRoomId === activeRoomIdRef.current
        ? event.closedRoomId
        : undefined;
      if (closedWeeklyRoomId) {
        clearCustomLobbyAutomationSteps(closedWeeklyRoomId);
        setLobbyAutomationActive(false);
        notify("Weekly game cancelled.", "warning", {
          detail: event.closeReason ?? "The weekly lobby was closed because its host disconnected.",
          durationMs: null
        });
        void window.electronApi?.setLobbyInputLock(false).catch(() => ({ locked: false }));
        void window.electronApi?.closeAoe2(true).then((closed) => {
          if (!closed.closed) notify(closed.message ?? "AoE2 could not be terminated after the weekly game was cancelled.", "danger");
        }).catch(() => notify("AoE2 could not be terminated after the weekly game was cancelled.", "danger"));
      }
      const active = event.rooms.find((candidate) => candidate.source === "weekly"
        && candidate.players.some((player) => player.id === state.currentUser.id));
      if (active) {
        setRoom(active);
        setStatus((current) => current ? { ...current, queued: false, room: active } : current);
      } else {
        setRoom(undefined);
      }
    });
  }, [state.currentUser.id]);

  useEffect(() => {
    if (!status?.queued || room) return;
    const timer = window.setInterval(() => {
      void weeklyQueueService.status().then((next) => {
        setStatus(next);
        if (next.room) setRoom(next.room);
      }).catch(() => undefined);
    }, 2_000);
    return () => window.clearInterval(timer);
  }, [status?.queued, room]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!status?.mode.endsAt) return;
    const delay = Math.max(0, new Date(status.mode.endsAt).getTime() - Date.now()) + 250;
    const timer = window.setTimeout(() => {
      void weeklyQueueService.status().then((next) => {
        setStatus(next);
        setRoom(next.room);
      }).catch(() => undefined);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [status?.mode.rotationId, status?.mode.endsAt]);

  useEffect(() => {
    setWeeklyQueueActive(Boolean(status?.queued || room));
  }, [status?.queued, room, setWeeklyQueueActive]);

  useEffect(() => () => setWeeklyQueueActive(false), [setWeeklyQueueActive]);

  async function toggleQueue() {
    if (!status || pending) return;
    if (partySnapshot.party) {
      notify("The weekly queue is unavailable while you are in a party.", "warning", {
        detail: partySnapshot.party.isLeader ? "Disband the party first." : "Leave the party first. Your leader controls matchmaking."
      });
      return;
    }
    setPending(true);
    try {
      if (status.queued) {
        setStatus(await weeklyQueueService.leave());
      } else {
        const canEnterWeeklyQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
          && (!state.activeMatch || state.queueStatus === "completed");
        if (!canEnterWeeklyQueue) {
          notify("Leave matchmaking before entering the weekly queue.", "warning");
          return;
        }
        await retireCompletedRankedSession();
        if (!(await ensureAoe2Ready("custom"))) return;
        const next = await weeklyQueueService.join(civilization);
        setStatus(next);
        setRoom(next.room);
      }
    } catch (error) {
      notify("Weekly queue could not be updated.", "danger", { detail: messageFor(error) });
    } finally {
      setPending(false);
    }
  }

  const mode = status?.mode;
  const view = (
    <section className="weekly-page">
      <div className="weekly-hero">
        <div className="weekly-hero-copy">
          <span className="weekly-kicker"><Sparkles size={14} /> This week&apos;s game</span>
          <h2>{mode?.name ?? "Loading weekly game..."}</h2>
          <p>{mode?.description ?? "Fetching this week's rules from the server."}</p>
          <div className="weekly-mode-details">
            {(mode?.details ?? []).map((detail, index) => <span key={detail}>{index === 0 ? <Users size={15} /> : index === 1 ? <Swords size={15} /> : <Shield size={15} />}{detail}</span>)}
          </div>
        </div>
        <div className="weekly-queue-card">
          <span>Just for fun</span>
          <strong>Unranked · Weekly rules</strong>
          <ThemedSelect label="Civilization" value={civilization} onChange={setCivilization} disabled={Boolean(room) || status?.queued || pending} options={["Random", ...civilizations].map((value) => ({ value, label: localizeAoe2Name(value) }))} />
          <button className={room || status?.queued ? "weekly-join queued" : "weekly-join"} aria-label={status?.queued && !room ? "Leave weekly queue" : undefined} disabled={Boolean(room) || !status || pending} type="button" onClick={() => void toggleQueue()}>
            {room || status?.queued ? <Check size={18} /> : <Swords size={18} />}
            {room ? <>Preparing game<AnimatedEllipsis /></> : pending ? "Updating..." : status?.queued ? <>Finding players<AnimatedEllipsis /></> : "Join weekly queue"}
          </button>
          <small>{room ? `${room.players.length}/${room.maxPlayers} players · ${weeklySetupStatus(room, state.currentUser.id)}` : status?.queued ? `Queue position ${status.position ?? "—"} · Click to leave queue` : "Ratings are not affected"}</small>
        </div>
      </div>

      <div className="weekly-heading">
        <div><span className="eyebrow">Three-week rotation</span></div>
        <span className="weekly-reset"><Clock3 size={15} /> {mode ? `Monday 00:00 UTC · ${formatCountdown(new Date(mode.endsAt).getTime() - now)}` : "Changes every Monday"}</span>
      </div>
      <div className="weekly-rotation" aria-label="Weekly game rotation">
        {(status?.rotation ?? []).map((rotationMode, index) => (
          <article className={index === 0 ? "weekly-rotation-card current" : "weekly-rotation-card"} key={rotationMode.rotationId}>
            <div className="weekly-week-marker"><span>{index === 0 ? "Now" : `0${index + 1}`}</span></div>
            <div className="weekly-card-copy">
              <span className="weekly-timing">{index === 0 ? "Playing this week" : index === 1 ? "Next week" : "In 2 weeks"}</span>
              <h3>{rotationMode.name}</h3>
              <p>{rotationMode.description}</p>
              <div className="weekly-card-tags">{rotationMode.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
            </div>
            {index < 2 && <div className="weekly-connector" aria-hidden="true" />}
          </article>
        ))}
      </div>
      <div className="weekly-note"><CalendarDays size={18} /><p><strong>Same time, different battlefield.</strong> When the queue fills, everyone moves into a locked lobby. Choose a civilization, ready up, and Empire League handles the existing AoE2 lobby automation.</p></div>
    </section>
  );
  return room
    ? <NetworkLobby room={room} currentPlayerId={state.currentUser.id} notify={notify} weeklyView={view} />
    : view;
}

function weeklySetupStatus(room: CustomLobbyRoom, currentPlayerId: string): string {
  if (room.automationError) return room.automationError;
  if (room.status === "started") return "Starting game…";
  if (room.platformLobbyId) return "Joining and synchronizing the AoE2 lobby…";
  return room.hostId === currentPlayerId ? "Creating the AoE2 lobby…" : "Waiting for the host to create the AoE2 lobby…";
}

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

function formatCountdown(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1_000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}
