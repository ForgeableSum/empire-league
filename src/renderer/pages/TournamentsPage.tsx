import { ArrowLeft, ChevronRight, Map as MapIcon, Plus, RefreshCw, Shield, Swords, Trophy, Users, X } from "lucide-react";
import { useCallback, useEffect, useState, type CSSProperties, type FormEvent } from "react";
import type { Tournament, TournamentEntry, TournamentCivilizationMode } from "../../shared/contracts/tournaments";
import { enabledMapCatalogEntries } from "../../shared/mapCatalog";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { previewSection } from "../previewMode";
import { tournamentService } from "../services/tournamentService";
import { useAppStore } from "../state/appStore";

type BracketPlayer = TournamentEntry | "open" | "tbd";

export function TournamentsPage() {
  const { state, notify } = useAppStore();
  const [creating, setCreating] = useState(previewSection === "create");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(previewSection === "detail" ? "arabia-open" : null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const [name, setName] = useState("Weekend Showdown");
  const [capacity, setCapacity] = useState("16");
  const [minimumElo, setMinimumElo] = useState("1000");
  const [beginsAt, setBeginsAt] = useState(() => formatDateTimeInput(Date.now() + 24 * 60 * 60_000));
  const [mapId, setMapId] = useState(enabledMapCatalogEntries.find((map) => map.id === "arabia")?.id ?? enabledMapCatalogEntries[0]?.id ?? "");
  const [civilizationMode, setCivilizationMode] = useState<TournamentCivilizationMode>("pick");

  const refreshTournaments = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const next = await tournamentService.list();
      setTournaments(next.sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt)));
    } catch (error) {
      notify("Tournaments could not be loaded.", "danger", { detail: messageFor(error) });
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void refreshTournaments(true);
    return tournamentService.onEvent(() => void refreshTournaments());
  }, [refreshTournaments]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  async function submitTournament(event: FormEvent) {
    event.preventDefault();
    setPendingAction("create");
    try {
      const tournament = await tournamentService.create({
        name: name.trim(),
        participantCapacity: Number(capacity),
        minimumElo: Number(minimumElo),
        mapId,
        civilizationMode,
        startsAt: new Date(beginsAt).toISOString()
      });
      setTournaments((current) => [...current.filter((item) => item.id !== tournament.id), tournament]
        .sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt)));
      setCreating(false);
      setSelectedTournamentId(tournament.id);
      notify("Tournament created.", "success", { detail: `${tournament.name} is open for registration.` });
    } catch (error) {
      notify("Tournament could not be created.", "danger", { detail: messageFor(error) });
    } finally {
      setPendingAction(null);
    }
  }

  async function toggleTournamentEntry(tournament: Tournament) {
    const joined = tournament.entries.some((entry) => entry.playerId === state.currentUser.id);
    setPendingAction(`entry:${tournament.id}`);
    try {
      const updated = joined
        ? await tournamentService.leave(tournament.id)
        : await tournamentService.join(tournament.id);
      setTournaments((current) => current.map((item) => item.id === updated.id ? updated : item));
      notify(joined ? "You left the tournament." : "You joined the tournament.", joined ? "info" : "success", {
        detail: joined ? undefined : "Your first-round bracket position is now reserved."
      });
    } catch (error) {
      notify(joined ? "Could not leave the tournament." : "Could not join the tournament.", "danger", { detail: messageFor(error) });
    } finally {
      setPendingAction(null);
    }
  }

  const selectedTournament = tournaments.find((tournament) => tournament.id === selectedTournamentId);
  if (selectedTournament) {
    return (
      <TournamentDetail
        tournament={selectedTournament}
        now={now}
        currentPlayerId={state.currentUser.id}
        currentPlayerRating={state.currentUser.rating}
        pending={pendingAction === `entry:${selectedTournament.id}`}
        onBack={() => setSelectedTournamentId(null)}
        onToggleJoin={() => void toggleTournamentEntry(selectedTournament)}
      />
    );
  }

  return (
    <section className="tournaments-page">
      <header className="tournaments-heading">
        <div>
          <span className="eyebrow">Single elimination</span>
          <h2>Community Tournaments</h2>
          <p>Join the next bracket or create a simple knockout tournament.</p>
        </div>
        {!creating && <button className="primary tournament-create-trigger" type="button" onClick={() => setCreating(true)}><Plus size={17} /> Create Tournament</button>}
      </header>

      {creating && (
        <form className="panel tournament-create-panel" onSubmit={(event) => void submitTournament(event)}>
          <div className="tournament-create-heading">
            <div><span className="eyebrow">New tournament</span><h2>Tournament settings</h2></div>
            <button className="tournament-close" type="button" aria-label="Close tournament form" disabled={pendingAction === "create"} onClick={() => setCreating(false)}><X size={20} /></button>
          </div>
          <div className="tournament-form-grid">
            <label className="tournament-name-field">Tournament name<input maxLength={64} value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Begins<input type="datetime-local" value={beginsAt} onChange={(event) => setBeginsAt(event.target.value)} /></label>
            <ThemedSelect label="Participants" value={capacity} onChange={setCapacity} options={[8, 16, 32, 64].map((count) => ({ value: String(count), label: `${count} players` }))} />
            <label>Minimum Elo<input min="0" max="5000" step="50" type="number" value={minimumElo} onChange={(event) => setMinimumElo(event.target.value)} /></label>
            <ThemedSelect label="Map" value={mapId} onChange={setMapId} options={enabledMapCatalogEntries.map((map) => ({ value: map.id, label: map.name }))} />
          </div>
          <fieldset className="tournament-civ-fieldset">
            <legend>Civilizations</legend>
            <div className="tournament-civ-options">
              <button className={civilizationMode === "pick" ? "selected" : ""} type="button" aria-pressed={civilizationMode === "pick"} onClick={() => setCivilizationMode("pick")}>
                <Shield size={20} /><span><strong>Players pick</strong><small>Each player chooses their civilization.</small></span>
              </button>
              <button className={civilizationMode === "random" ? "selected" : ""} type="button" aria-pressed={civilizationMode === "random"} onClick={() => setCivilizationMode("random")}>
                <Swords size={20} /><span><strong>Random civilizations</strong><small>Empire League assigns civilizations.</small></span>
              </button>
            </div>
          </fieldset>
          <div className="tournament-create-footer">
            <div><Trophy size={18} /><span><strong>Single elimination</strong><small>{capacity} players · {Math.max(0, Number(capacity) - 1)} matches</small></span></div>
            <div className="tournament-form-actions">
              <button className="secondary" type="button" disabled={pendingAction === "create"} onClick={() => setCreating(false)}>Cancel</button>
              <button className="primary" type="submit" disabled={pendingAction === "create" || !name.trim() || !mapId || !beginsAt || minimumElo === ""}>{pendingAction === "create" ? "Creating…" : "Create Tournament"}</button>
            </div>
          </div>
        </form>
      )}

      <div className="tournament-list-section">
        <div className="tournament-list-title">
          <div><h2>Upcoming tournaments</h2><p>Starting soonest first</p></div>
          <button className="tournament-refresh" type="button" disabled={loading} onClick={() => void refreshTournaments(true)}><RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh</button>
        </div>
        <div className="tournament-list">
          <div className="tournament-list-header" aria-hidden="true"><span>Tournament</span><span>Map</span><span>Rules</span><span>Players</span><span>Begins</span><span /></div>
          {tournaments.map((tournament, index) => (
            <button className="tournament-row" key={tournament.id} type="button" onClick={() => setSelectedTournamentId(tournament.id)}>
              <div className="tournament-identity"><span className="tournament-emblem"><Trophy size={18} /></span><span><strong>{tournament.name}</strong><small>{index === 0 ? "Next tournament" : `Hosted by ${tournament.creatorDisplayName}`}</small></span></div>
              <div><strong>{tournament.mapName}</strong><small>Fixed map</small></div>
              <div><strong>{tournament.civilizationMode === "pick" ? "Pick civilizations" : "Random civilizations"}</strong><small>{tournament.minimumElo > 0 ? `${tournament.minimumElo}+ Elo` : "Open rating"}</small></div>
              <div className="tournament-player-count"><Users size={16} /><span><strong>{tournament.entries.length}/{tournament.participantCapacity}</strong><small>{Math.max(0, tournament.participantCapacity - tournament.entries.length)} spots left</small></span></div>
              <div className="tournament-begins"><strong>{formatCountdown(Date.parse(tournament.startsAt) - now)}</strong><small>{formatStartTime(tournament.startsAt)}</small></div>
              <span className="tournament-row-action" aria-hidden="true"><ChevronRight size={20} /></span>
            </button>
          ))}
          {!loading && tournaments.length === 0 && <div className="tournament-empty"><Trophy size={25} /><strong>No upcoming tournaments</strong><span>Create the first bracket.</span></div>}
          {loading && tournaments.length === 0 && <div className="tournament-empty"><span className="medieval-loader" aria-label="Loading tournaments"><span /><span /><span /></span><strong>Loading tournaments…</strong></div>}
        </div>
      </div>
    </section>
  );
}

function TournamentDetail({ tournament, now, currentPlayerId, currentPlayerRating, pending, onBack, onToggleJoin }: {
  tournament: Tournament;
  now: number;
  currentPlayerId: string;
  currentPlayerRating: number;
  pending: boolean;
  onBack: () => void;
  onToggleJoin: () => void;
}) {
  const rounds = buildBracket(tournament);
  const joinedEntry = tournament.entries.find((entry) => entry.playerId === currentPlayerId);
  const spotsLeft = Math.max(0, tournament.participantCapacity - tournament.entries.length);
  const ratingEligible = currentPlayerRating >= tournament.minimumElo;

  return (
    <section className="tournament-detail-page">
      <button className="tournament-detail-back" type="button" onClick={onBack}><ArrowLeft size={16} /> All tournaments</button>
      <article className="panel tournament-detail-hero">
        <div className="tournament-detail-main">
          <div className="tournament-detail-status"><span /> Registration open</div>
          <span className="eyebrow">Single elimination · Hosted by {tournament.creatorDisplayName}</span>
          <h2>{tournament.name}</h2>
          <p>Win your match to advance. One loss eliminates you from the tournament.</p>
          <div className="tournament-detail-facts">
            <div><MapIcon size={18} /><span><small>Map</small><strong>{tournament.mapName}</strong></span></div>
            <div><Shield size={18} /><span><small>Civilizations</small><strong>{tournament.civilizationMode === "pick" ? "Players pick" : "Random"}</strong></span></div>
            <div><Swords size={18} /><span><small>Minimum Elo</small><strong>{tournament.minimumElo > 0 ? tournament.minimumElo : "Open"}</strong></span></div>
            <div><Users size={18} /><span><small>Entrants</small><strong>{tournament.entries.length}/{tournament.participantCapacity}</strong></span></div>
          </div>
        </div>
        <aside className="tournament-entry-card">
          <span>Begins in</span><strong>{formatCountdown(Date.parse(tournament.startsAt) - now)}</strong><small>{formatFullStartTime(tournament.startsAt)}</small>
          <div className="tournament-capacity-track"><span style={{ width: `${tournament.entries.length / tournament.participantCapacity * 100}%` }} /></div>
          <p>{joinedEntry ? `You are in bracket slot ${joinedEntry.bracketSlot}` : spotsLeft === 0 ? "Registration is full" : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} remaining`}</p>
          <button className={joinedEntry ? "secondary wide" : "primary wide"} type="button" disabled={pending || (!joinedEntry && (!spotsLeft || !ratingEligible))} onClick={onToggleJoin}>
            {pending ? "Updating…" : joinedEntry ? "Leave Tournament" : !ratingEligible ? `Requires ${tournament.minimumElo} Elo` : spotsLeft === 0 ? "Tournament Full" : "Join Tournament"}
          </button>
        </aside>
      </article>
      <section className="tournament-bracket-section">
        <div className="tournament-bracket-heading"><div><span className="eyebrow">The road to victory</span><h2>Bracket</h2></div><p>Players are placed into a random open starting slot.</p></div>
        <div className="tournament-bracket-scroll">
          <div className="tournament-bracket" style={{ "--bracket-rounds": rounds.length } as CSSProperties}>
            {rounds.map((round, roundIndex) => (
              <div className="tournament-bracket-round" key={round.name}>
                <div className="tournament-round-heading"><span>Round {roundIndex + 1}</span><strong>{round.name}</strong></div>
                <div className="tournament-round-matches">
                  {round.matches.map((match, matchIndex) => (
                    <article className="tournament-bracket-match" key={`${round.name}-${matchIndex}`}>
                      {match.map((player, playerIndex) => (
                        <div className={bracketPlayerClass(player, currentPlayerId)} key={playerIndex}>
                          <span>{typeof player === "object" ? player.bracketSlot : "—"}</span>
                          <strong>{typeof player === "object" ? player.displayName : player === "open" ? "Open spot" : "TBD"}</strong>
                          {typeof player === "object" && player.playerId === currentPlayerId && <em>You</em>}
                        </div>
                      ))}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

function buildBracket(tournament: Tournament): Array<{ name: string; matches: BracketPlayer[][] }> {
  const entrantsBySlot = new Map(tournament.entries.map((entry) => [entry.bracketSlot, entry]));
  const rounds: Array<{ name: string; matches: BracketPlayer[][] }> = [];
  for (let playersInRound = tournament.participantCapacity, roundIndex = 0; playersInRound >= 2; playersInRound /= 2, roundIndex += 1) {
    rounds.push({
      name: bracketRoundName(playersInRound),
      matches: Array.from({ length: playersInRound / 2 }, (_, matchIndex) => roundIndex === 0
        ? [entrantsBySlot.get(matchIndex * 2 + 1) ?? "open", entrantsBySlot.get(matchIndex * 2 + 2) ?? "open"]
        : ["tbd", "tbd"])
    });
  }
  return rounds;
}

function bracketRoundName(playersInRound: number): string {
  if (playersInRound === 2) return "Final";
  if (playersInRound === 4) return "Semifinals";
  if (playersInRound === 8) return "Quarterfinals";
  return `Round of ${playersInRound}`;
}

function bracketPlayerClass(player: BracketPlayer, currentPlayerId: string): string {
  if (player === "open") return "open";
  if (player === "tbd") return "pending";
  return player.playerId === currentPlayerId ? "mine" : "";
}

function formatCountdown(milliseconds: number): string {
  if (milliseconds <= 0) return "Starting";
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
}

function formatStartTime(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" }).format(new Date(timestamp));
}

function formatFullStartTime(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(timestamp));
}

function formatDateTimeInput(timestamp: number): string {
  const date = new Date(timestamp);
  return new Date(timestamp - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function messageFor(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
