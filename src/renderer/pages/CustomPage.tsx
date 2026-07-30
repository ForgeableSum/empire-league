import { Check, Crown, LogIn, MessageSquare, Plus, RefreshCw, Send, Shield, Users, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { civilizations } from "../../shared/civilizations";
import type { CustomLobbyRoom, LocalCustomContent, LocalCustomContentCatalog } from "../../shared/contracts/customLobby";
import { customLobbyService } from "../services/customLobbyService";
import { useAppStore } from "../state/appStore";

const emptyCatalog: LocalCustomContentCatalog = { maps: [], dataMods: [], scannedRoots: [], scannedAt: new Date(0).toISOString() };

export function CustomPage() {
  const { state, notify } = useAppStore();
  const [rooms, setRooms] = useState<CustomLobbyRoom[]>([]);
  const [catalog, setCatalog] = useState(emptyCatalog);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [lobbyName, setLobbyName] = useState(`${state.currentUser.displayName}'s Lobby`);
  const [mapId, setMapId] = useState("");
  const [dataModId, setDataModId] = useState("");
  const [pending, setPending] = useState(false);

  const activeRoom = rooms.find((room) => room.players.some((player) => player.id === state.currentUser.id));

  async function refresh() {
    setLoading(true);
    try {
      const [nextRooms, nextCatalog] = await Promise.all([
        customLobbyService.list(),
        window.electronApi?.scanLocalCustomContent() ?? Promise.resolve(emptyCatalog)
      ]);
      setRooms(nextRooms);
      setCatalog(nextCatalog);
    } catch (error) {
      notify("Custom lobbies could not be loaded.", "danger", { detail: messageFor(error) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    return customLobbyService.onEvent((event) => setRooms(event.rooms));
  }, []);

  async function createRoom() {
    setPending(true);
    try {
      await customLobbyService.create({
        name: lobbyName.trim(),
        map: catalog.maps.find((item) => item.id === mapId),
        dataMod: catalog.dataMods.find((item) => item.id === dataModId)
      });
      setCreating(false);
    } catch (error) {
      notify("The lobby could not be created.", "danger", { detail: messageFor(error) });
    } finally {
      setPending(false);
    }
  }

  if (activeRoom) {
    return <NetworkLobby room={activeRoom} currentPlayerId={state.currentUser.id} notify={notify} />;
  }

  return (
    <section className="custom-page">
      <div className="custom-intro">
        <div>
          <span className="eyebrow">Community games</span>
          <h2>Custom lobby browser</h2>
          <p>Browse live Empire League rooms or create one using content installed on your PC.</p>
        </div>
        <div className="button-row">
          <button className="secondary" type="button" onClick={() => void refresh()} disabled={loading}><RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh</button>
          <button className="primary" type="button" onClick={() => setCreating(true)}><Plus size={17} /> Create Lobby</button>
        </div>
      </div>

      {creating && (
        <article className="panel custom-create-card">
          <div className="custom-create-heading"><div><span className="eyebrow">New room</span><h2>Lobby settings</h2></div></div>
          <label>Lobby name<input value={lobbyName} maxLength={64} onChange={(event) => setLobbyName(event.target.value)} /></label>
          <ContentSelect label="Map or scenario (optional)" items={catalog.maps} value={mapId} onChange={setMapId} />
          <ContentSelect label="Data mod (optional)" items={catalog.dataMods} value={dataModId} onChange={setDataModId} />
          <div className="custom-scan-meta"><span>{catalog.maps.length} maps/scenarios</span><span>{catalog.dataMods.length} data mods</span><span>{catalog.scannedRoots.length} folders scanned</span></div>
          <div className="custom-create-actions">
            <button className="primary large" type="button" disabled={!lobbyName.trim() || pending} onClick={() => void createRoom()}>{pending ? "Creating…" : "Create Lobby"}</button>
            <button className="secondary large" type="button" disabled={pending} onClick={() => setCreating(false)}>Cancel</button>
          </div>
        </article>
      )}

      <div className="custom-room-list">
        <div className="custom-room-list-header"><span>Room</span><span>Content</span><span>Players</span><span>Status</span><span /></div>
        {rooms.map((room) => (
          <article className="custom-room-row" key={room.id}>
            <div><strong>{room.name}</strong><small>{room.demo ? "Demo room · " : ""}Hosted by {room.players.find((player) => player.host)?.displayName ?? "Unknown"}</small></div>
            <div><strong>{room.map?.name ?? "Standard map"}</strong><small>{room.dataMod?.name ?? "No data mod"}</small></div>
            <div className="room-player-count"><Users size={16} /> {room.players.length}/{room.maxPlayers}</div>
            <span className={`custom-room-status ${room.status}`}>{room.status}</span>
            <button className="secondary" type="button" disabled={room.status !== "open" || room.players.length >= room.maxPlayers || pending} onClick={() => {
              setPending(true);
              void customLobbyService.join(room.id).catch((error) => notify("Could not join the lobby.", "danger", { detail: messageFor(error) })).finally(() => setPending(false));
            }}><LogIn size={16} /> Join</button>
          </article>
        ))}
        {!loading && !rooms.length && <div className="panel empty-state">No custom rooms are open. Create the first one.</div>}
      </div>
    </section>
  );
}

function ContentSelect({ label, items, value, onChange }: { label: string; items: LocalCustomContent[]; value: string; onChange: (value: string) => void }) {
  return <label>{label}<select value={value} onChange={(event) => onChange(event.target.value)}><option value="">None / standard content</option>{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{value && <small>{items.find((item) => item.id === value)?.source}</small>}</label>;
}

function NetworkLobby({ room, currentPlayerId, notify }: {
  room: CustomLobbyRoom;
  currentPlayerId: string;
  notify: ReturnType<typeof useAppStore>["notify"];
}) {
  const [draft, setDraft] = useState("");
  const me = room.players.find((player) => player.id === currentPlayerId)!;
  const isHost = room.hostId === currentPlayerId;
  const slots = useMemo(() => Array.from({ length: room.maxPlayers }, (_, index) => room.players.find((player) => player.slot === index + 1)), [room]);

  const act = (promise: Promise<unknown>) => void promise.catch((error) => notify("Lobby update failed.", "danger", { detail: messageFor(error) }));
  function submitChat(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    act(customLobbyService.sendMessage(room.id, draft.trim()));
    setDraft("");
  }

  return (
    <section className="custom-lobby">
      <div className="custom-lobby-heading">
        <div><span className="eyebrow">Live custom lobby</span><h2>{room.name}</h2><p>{room.players.length}/{room.maxPlayers} players · {room.map?.name ?? "Standard map"} · {room.dataMod?.name ?? "No data mod"}</p></div>
        <button className="secondary" type="button" onClick={() => act(customLobbyService.leave(room.id))}><X size={16} /> Leave lobby</button>
      </div>
      <div className="custom-lobby-layout">
        <article className="panel lobby-roster">
          <div className="lobby-roster-header"><strong>Players</strong><span>Team</span><span>Civilization</span><span>Status</span></div>
          {slots.map((player, index) => (
            <div className={player ? "lobby-player-row occupied" : "lobby-player-row"} key={index}>
              <div className="lobby-player-name"><span className="lobby-slot-number">{index + 1}</span>{player ? <><Shield size={17} /><strong>{player.displayName}</strong>{player.host && <Crown size={15} />} {isHost && !player.host && <button className="lobby-kick" aria-label={`Remove ${player.displayName}`} onClick={() => act(customLobbyService.kick(room.id, player.id))}><X size={13} /></button>}</> : <span>Open slot</span>}</div>
              {player && (player.id === currentPlayerId ? <>
                <select value={player.team} onChange={(event) => act(customLobbyService.updatePlayer(room.id, { team: Number(event.target.value) }))}><option value={0}>—</option>{[1, 2, 3, 4].map((team) => <option value={team} key={team}>Team {team}</option>)}</select>
                <select value={player.civilization} onChange={(event) => act(customLobbyService.updatePlayer(room.id, { civilization: event.target.value }))}><option>Random</option>{civilizations.map((civilization) => <option key={civilization}>{civilization}</option>)}</select>
                <button className={player.ready ? "lobby-ready ready" : "lobby-ready"} onClick={() => act(customLobbyService.updatePlayer(room.id, { ready: !player.ready }))}>{player.ready && <Check size={16} />}{player.ready ? "Ready" : "Not ready"}</button>
              </> : <><span>Team {player.team || "—"}</span><span>{player.civilization}</span><span className={player.ready ? "success" : ""}>{player.ready ? "Ready" : "Not ready"}</span></>)}
            </div>
          ))}
        </article>
        <aside className="panel lobby-chat">
          <div className="lobby-chat-title"><MessageSquare size={18} /><strong>Lobby chat</strong></div>
          <div className="lobby-chat-messages" aria-live="polite">{room.messages.map((message) => <p className={message.system ? "system" : ""} key={message.id}><strong>{message.author}</strong><span>{message.text}</span></p>)}</div>
          <form onSubmit={submitChat}><input placeholder="Message lobby…" value={draft} onChange={(event) => setDraft(event.target.value)} /><button className="primary" aria-label="Send"><Send size={17} /></button></form>
        </aside>
      </div>
      <div className="custom-lobby-actions"><span>{room.status === "started" ? "Virtual game started. AoE2 launch is not connected yet." : room.players.every((player) => player.ready) ? "All players are ready." : "Waiting for players to ready up."}</span>{isHost && <button className="primary large" disabled={room.status !== "open" || !room.players.every((player) => player.ready)} onClick={() => act(customLobbyService.start(room.id))}>Start Game</button>}</div>
    </section>
  );
}

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}
