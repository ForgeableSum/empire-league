import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Eye, Lock, Map as MapIcon, Minus, Plus, RefreshCw, Send, Shield, Swords, Trash2, Trophy, Users, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import type { Tournament, TournamentChatMessage, TournamentEntry, TournamentCivilizationMode } from "../../shared/contracts/tournaments";
import { builtInTournamentMapId } from "../../tournament-map.mjs";
import { civilizations } from "../../shared/civilizations";
import { enabledMapCatalogEntries } from "../../shared/mapCatalog";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { previewSection } from "../previewMode";
import { tournamentService } from "../services/tournamentService";
import { useAppStore } from "../state/appStore";

type BracketPlayer = TournamentEntry | "open" | "tbd";
type TournamentMapOption = { id: string; gameName: string };
type BracketMatch = {
  id: string;
  players: BracketPlayer[];
  playerIds: Array<string | undefined>;
  spectatorUri?: string;
};

const fallbackTournamentMaps: TournamentMapOption[] = enabledMapCatalogEntries.map((map) => ({
  id: map.id,
  gameName: map.gameMapName
}));

export function TournamentsPage({ tournamentToOpen, onTournamentOpened }: {
  tournamentToOpen?: string | null;
  onTournamentOpened?: () => void;
}) {
  const { state, notify, startQueue, localizeAoe2Name } = useAppStore();
  const [creating, setCreating] = useState(previewSection === "create");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(previewSection === "detail" ? "arabia-open" : null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [pendingCancellation, setPendingCancellation] = useState<Tournament | null>(null);
  const [now, setNow] = useState(Date.now());
  const [name, setName] = useState("Weekend Showdown");
  const [capacity, setCapacity] = useState("16");
  const [minimumElo, setMinimumElo] = useState("1000");
  const [maximumElo, setMaximumElo] = useState("4000");
  const [beginsAt, setBeginsAt] = useState(() => formatDateTimeInput(Date.now() + 24 * 60 * 60_000));
  const [tournamentMaps, setTournamentMaps] = useState<TournamentMapOption[]>(fallbackTournamentMaps);
  const [mapId, setMapId] = useState(enabledMapCatalogEntries.find((map) => map.id === "arabia")?.id ?? fallbackTournamentMaps[0]?.id ?? "");
  const [civilizationMode, setCivilizationMode] = useState<TournamentCivilizationMode>("pick");
  const [matchCivilization, setMatchCivilization] = useState<string>(civilizations[0] ?? "Britons");
  const [createPassword, setCreatePassword] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const refreshTournaments = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const next = await tournamentService.list();
      setTournaments(next.sort(compareTournaments));
    } catch (error) {
      notify("Tournaments could not be loaded.", "danger", { detail: messageFor(error) });
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void refreshTournaments(true);
    return tournamentService.onEvent((event) => {
      if (event.type === "tournaments_changed") void refreshTournaments();
    });
  }, [refreshTournaments]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => setJoinPassword(""), [selectedTournamentId]);

  useEffect(() => {
    if (!tournamentToOpen) return;
    setSelectedTournamentId(tournamentToOpen);
    onTournamentOpened?.();
  }, [tournamentToOpen, onTournamentOpened]);

  useEffect(() => {
    if (!window.electronApi) return;
    void window.electronApi.scanLocalCustomContent().then((catalog) => {
      const byGameName = new Map(fallbackTournamentMaps.map((map) => [map.gameName.toLocaleLowerCase("en"), map]));
      for (const map of catalog.maps) {
        if (map.kind !== "map" || !map.builtIn || !map.enabled) continue;
        const key = map.gameName.toLocaleLowerCase("en");
        if (!byGameName.has(key)) byGameName.set(key, { id: builtInTournamentMapId(map.gameName), gameName: map.gameName });
      }
      const nextMaps = [...byGameName.values()];
      setTournamentMaps(nextMaps);
      setMapId((current) => nextMaps.some((map) => map.id === current)
        ? current
        : nextMaps.find((map) => map.gameName.toLocaleLowerCase("en") === "arabia")?.id ?? nextMaps[0]?.id ?? "");
    }).catch(() => undefined);
  }, []);

  async function submitTournament(event: FormEvent) {
    event.preventDefault();
    const selectedMap = tournamentMaps.find((map) => map.id === mapId);
    if (!selectedMap) {
      notify("Choose an available tournament map.", "warning");
      return;
    }
    setPendingAction("create");
    try {
      const tournament = await tournamentService.create({
        name: name.trim(),
        participantCapacity: Number(capacity),
        minimumElo: Number(minimumElo),
        maximumElo: Number(maximumElo),
        mapId,
        mapName: selectedMap.gameName,
        civilizationMode,
        startsAt: new Date(beginsAt).toISOString(),
        password: createPassword || undefined
      });
      setTournaments((current) => [...current.filter((item) => item.id !== tournament.id), tournament]
        .sort(compareTournaments));
      setCreating(false);
      setCreatePassword("");
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
    if (!joined && tournament.passwordProtected && !joinPassword) {
      notify("Enter the tournament password to join.", "warning");
      return;
    }
    setPendingAction(`entry:${tournament.id}`);
    try {
      const updated = joined
        ? await tournamentService.leave(tournament.id)
        : await tournamentService.join(tournament.id, tournament.passwordProtected ? joinPassword : undefined);
      setTournaments((current) => current.map((item) => item.id === updated.id ? updated : item));
      notify(joined ? "You left the tournament." : "You joined the tournament.", joined ? "info" : "success", {
        detail: joined ? undefined : "Your first-round bracket position is now reserved."
      });
      if (!joined) setJoinPassword("");
    } catch (error) {
      notify(joined ? "Could not leave the tournament." : "Could not join the tournament.", "danger", { detail: messageFor(error) });
    } finally {
      setPendingAction(null);
    }
  }

  function beginCreating() {
    const existing = tournaments.find((tournament) =>
      tournament.creatorPlayerId === state.currentUser.id
      && (tournament.status === "started" || (tournament.status === "registration" && Date.parse(tournament.startsAt) > Date.now()))
    );
    if (existing) {
      notify("You already have a tournament running.", "warning", {
        detail: `Cancel ${existing.name} before creating another.`
      });
      setSelectedTournamentId(existing.id);
      return;
    }
    setCreating(true);
  }

  async function cancelOwnedTournament(tournament: Tournament) {
    setPendingAction(`cancel:${tournament.id}`);
    try {
      const cancelled = await tournamentService.cancel(tournament.id);
      setTournaments((current) => current.filter((item) => item.id !== tournament.id));
      setSelectedTournamentId(null);
      notify("Tournament canceled.", "warning", {
        detail: `${cancelled.name} was deleted and ${cancelled.unregisteredPlayers} ${cancelled.unregisteredPlayers === 1 ? "player was" : "players were"} unregistered.`
      });
    } catch (error) {
      notify("Tournament could not be canceled.", "danger", { detail: messageFor(error) });
    } finally {
      setPendingCancellation(null);
      setPendingAction(null);
    }
  }

  async function readyForTournamentMatch(tournament: Tournament) {
    const catalogMap = enabledMapCatalogEntries.find((candidate) => candidate.id === tournament.mapId);
    await startQueue({
      id: `tournament:${tournament.id}`,
      name: `${tournament.name} Tournament`,
      description: "Single-elimination tournament match.",
      format: "1v1",
      ruleset: "Random Map",
      mapPool: [{ id: tournament.mapId, name: tournament.mapName, style: catalogMap?.style ?? "open", thumbnailUrl: "" }],
      civilizationPreference: tournament.civilizationMode === "pick"
        ? { mode: "pick", civilization: matchCivilization }
        : { mode: "random" },
      ranked: false,
      estimatedWaitSeconds: 0,
      playersSearching: 0,
      tournamentId: tournament.id
    });
  }

  async function watchTournamentMatch(spectatorUri: string) {
    if (!window.electronApi) {
      notify("Live spectating requires the Empire League desktop app.", "warning");
      return;
    }
    setPendingAction(`spectate:${spectatorUri}`);
    try {
      const result = await window.electronApi.openAoe2Spectator(spectatorUri);
      if (!result.opened) throw new Error(result.message ?? "The live match could not be opened.");
      notify(
        result.captureAgeLaunched ? "Opening live tournament match." : "Opening spectator mode in AoE2.",
        result.captureAgeLaunched ? "success" : "warning",
        { detail: result.message }
      );
    } catch (error) {
      notify("The live match could not be opened.", "danger", { detail: messageFor(error) });
    } finally {
      setPendingAction(null);
    }
  }

  const selectedTournament = tournaments.find((tournament) => tournament.id === selectedTournamentId);
  if (selectedTournament) {
    const cancelling = pendingAction === `cancel:${selectedTournament.id}`;
    return (
      <>
        <TournamentDetail
          tournament={selectedTournament}
          now={now}
          currentPlayerId={state.currentUser.id}
          currentPlayerRating={state.currentUser.rating}
          pending={pendingAction === `entry:${selectedTournament.id}`}
          cancelling={cancelling}
          queueStatus={state.queueStatus}
          mapDisplayName={localizeAoe2Name(selectedTournament.mapName)}
          selectedCivilization={matchCivilization}
          joinPassword={joinPassword}
          spectatingUri={pendingAction?.startsWith("spectate:") ? pendingAction.slice("spectate:".length) : undefined}
          civilizationOptions={civilizations.map((name) => ({ value: name, label: localizeAoe2Name(name) }))}
          onCivilizationChange={setMatchCivilization}
          onJoinPasswordChange={setJoinPassword}
          onBack={() => setSelectedTournamentId(null)}
          onToggleJoin={() => void toggleTournamentEntry(selectedTournament)}
          onReady={() => void readyForTournamentMatch(selectedTournament)}
          onWatch={(spectatorUri) => void watchTournamentMatch(spectatorUri)}
          onCancel={() => setPendingCancellation(selectedTournament)}
        />
        {pendingCancellation && (
          <TournamentCancelConfirmation
            tournament={pendingCancellation}
            pending={cancelling}
            onDismiss={() => setPendingCancellation(null)}
            onConfirm={() => void cancelOwnedTournament(pendingCancellation)}
          />
        )}
      </>
    );
  }

  const nextRegistrationId = tournaments.find((tournament) => tournament.status === "registration")?.id;
  return (
    <section className="tournaments-page">
      {creating && (
        <form className="panel tournament-create-panel" onSubmit={(event) => void submitTournament(event)}>
          <div className="tournament-create-heading">
            <div><span className="eyebrow">New tournament</span><h2>Tournament settings</h2></div>
            <button className="tournament-close" type="button" aria-label="Close tournament form" disabled={pendingAction === "create"} onClick={() => setCreating(false)}><X size={20} /></button>
          </div>
          <div className="tournament-form-grid">
            <label className="tournament-name-field">Tournament name<input maxLength={64} value={name} onChange={(event) => setName(event.target.value)} /></label>
            <TournamentDateTimePicker value={beginsAt} onChange={setBeginsAt} />
            <ThemedSelect label="Participants" value={capacity} onChange={setCapacity} options={[8, 16, 32, 64].map((count) => ({ value: String(count), label: `${count} players` }))} />
            <label>Minimum Elo<input min="0" max="5000" step="50" type="number" value={minimumElo} onChange={(event) => setMinimumElo(event.target.value)} /></label>
            <label>Maximum Elo<input min={minimumElo || "0"} max="5000" step="50" type="number" value={maximumElo} onChange={(event) => setMaximumElo(event.target.value)} /></label>
            <ThemedSelect label="Map" value={mapId} onChange={setMapId} options={tournamentMaps
              .map((map) => ({ value: map.id, label: localizeAoe2Name(map.gameName) }))
              .sort((left, right) => left.label.localeCompare(right.label))} />
          </div>
          <label className="tournament-create-password"><span>Tournament password <small>Optional</small></span><input type="password" maxLength={64} autoComplete="new-password" value={createPassword} onChange={(event) => setCreatePassword(event.target.value)} /></label>
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
              <button className="primary" type="submit" disabled={pendingAction === "create" || !name.trim() || !mapId || !beginsAt || minimumElo === "" || maximumElo === "" || Number(maximumElo) < Number(minimumElo)}>{pendingAction === "create" ? "Creating…" : "Create Tournament"}</button>
            </div>
          </div>
        </form>
      )}

      <div className="tournament-list-section">
        <div className="tournament-list-toolbar">
          {!creating && <button className="primary" type="button" onClick={beginCreating}><Plus size={17} /> Create Tournament</button>}
          <button className="secondary" type="button" disabled={loading} onClick={() => void refreshTournaments(true)}><RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh</button>
        </div>
        <div className="tournament-list">
          <div className="tournament-list-header" aria-hidden="true"><span>Tournament</span><span>Map</span><span>Rules</span><span>Players</span><span>Status</span><span /></div>
          {tournaments.map((tournament) => (
            <button className="tournament-row" key={tournament.id} type="button" onClick={() => setSelectedTournamentId(tournament.id)}>
              <div className="tournament-identity"><span className="tournament-emblem"><Trophy size={18} /></span><span><strong>{tournament.name}</strong><small>{tournament.id === nextRegistrationId ? "Next tournament" : `Hosted by ${tournament.creatorDisplayName}`}</small></span></div>
              <div><strong>{localizeAoe2Name(tournament.mapName)}</strong><small>Fixed map</small></div>
              <div><strong>{tournament.civilizationMode === "pick" ? "Pick civilizations" : "Random civilizations"}</strong><small>{tournamentAccessLabel(tournament)}</small></div>
              <div className="tournament-player-count"><Users size={16} /><span><strong>{tournament.entries.length}/{tournament.participantCapacity}</strong><small>{Math.max(0, tournament.participantCapacity - tournament.entries.length)} spots left</small></span></div>
              <div className={`tournament-status-cell ${tournament.status}`}>
                <strong>{tournamentListStatusLabel(tournament.status)}</strong>
                <small>{tournament.status === "registration"
                  ? `Begins in ${formatCountdown(Date.parse(tournament.startsAt) - now)}`
                  : tournament.status === "completed"
                    ? `Finished ${formatStartTime(tournament.completedAt ?? tournament.startsAt)}`
                    : tournament.status === "started"
                      ? `Began ${formatStartTime(tournament.startedAt ?? tournament.startsAt)}`
                      : "Cancelled"}</small>
              </div>
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

function TournamentCancelConfirmation({ tournament, pending, onDismiss, onConfirm }: {
  tournament: Tournament;
  pending: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal-backdrop tournament-confirm-backdrop" role="presentation" onPointerDown={() => !pending && onDismiss()}>
      <section className="tournament-confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="cancel-tournament-title" onPointerDown={(event) => event.stopPropagation()}>
        <div className="tournament-confirm-icon"><Trash2 size={24} /></div>
        <div>
          <span className="eyebrow">Cancel tournament</span>
          <h2 id="cancel-tournament-title">Cancel {tournament.name}?</h2>
        </div>
        <p>All {tournament.entries.length} registered {tournament.entries.length === 1 ? "player" : "players"} will be removed and the tournament will be permanently deleted.</p>
        <div className="tournament-confirm-actions">
          <button className="tournament-confirm-remove" type="button" disabled={pending} onClick={onConfirm}>
            <Trash2 size={16} /> {pending ? "Canceling…" : "Cancel Tournament"}
          </button>
          <button className="secondary" type="button" disabled={pending} autoFocus onClick={onDismiss}>Keep Tournament</button>
        </div>
      </section>
    </div>
  );
}

function TournamentDetail({ tournament, now, currentPlayerId, currentPlayerRating, pending, cancelling, queueStatus, mapDisplayName, selectedCivilization, joinPassword, spectatingUri, civilizationOptions, onCivilizationChange, onJoinPasswordChange, onBack, onToggleJoin, onReady, onWatch, onCancel }: {
  tournament: Tournament;
  now: number;
  currentPlayerId: string;
  currentPlayerRating: number;
  pending: boolean;
  cancelling: boolean;
  queueStatus: string;
  mapDisplayName: string;
  selectedCivilization: string;
  joinPassword: string;
  spectatingUri?: string;
  civilizationOptions: Array<{ value: string; label: string }>;
  onCivilizationChange: (civilization: string) => void;
  onJoinPasswordChange: (password: string) => void;
  onBack: () => void;
  onToggleJoin: () => void;
  onReady: () => void;
  onWatch: (spectatorUri: string) => void;
  onCancel: () => void;
}) {
  const rounds = buildBracket(tournament);
  const joinedEntry = tournament.entries.find((entry) => entry.playerId === currentPlayerId);
  const spotsLeft = Math.max(0, tournament.participantCapacity - tournament.entries.length);
  const ratingEligible = currentPlayerRating >= tournament.minimumElo
    && (tournament.maximumElo === undefined || currentPlayerRating <= tournament.maximumElo);
  const currentMatch = tournament.matches.find((match) =>
    ["waiting", "in_progress"].includes(match.status)
    && (match.playerOneId === currentPlayerId || match.playerTwoId === currentPlayerId)
  );
  const currentPlayerReady = currentMatch
    ? currentMatch.playerOneId === currentPlayerId ? currentMatch.playerOneReady : currentMatch.playerTwoReady
    : false;
  const entryStatus = joinedEntry?.status;
  const queueAvailable = ["idle", "cancelled", "completed"].includes(queueStatus);
  const finalRoundNumber = Math.log2(tournament.participantCapacity);
  const finalWinnerId = tournament.matches.find((match) =>
    match.roundNumber === finalRoundNumber && match.matchPosition === 1
  )?.winnerPlayerId;
  const champion = tournament.entries.find((entry) => entry.playerId === finalWinnerId)
    ?? tournament.entries.find((entry) => entry.status === "winner");

  return (
    <section className="tournament-detail-page">
      <button className="tournament-detail-back" type="button" onClick={onBack}><ArrowLeft size={16} /> All tournaments</button>
      <article className="panel tournament-detail-hero">
        <div className="tournament-detail-main">
          <div className={`tournament-detail-status ${tournament.status}`}><span /> {tournamentStatusLabel(tournament.status)}</div>
          <span className="eyebrow">Single elimination · Hosted by {tournament.creatorDisplayName}</span>
          <h2>{tournament.name}</h2>
          <p>Win your match to advance. One loss eliminates you from the tournament.</p>
          {tournament.status === "completed" && (
            <div className={`tournament-champion${champion ? "" : " empty"}`}>
              <Trophy size={27} />
              <span>
                <small>{champion ? "Tournament champion" : "Tournament complete"}</small>
                <strong>{champion?.displayName ?? "No champion awarded"}</strong>
              </span>
            </div>
          )}
          <div className="tournament-detail-facts">
            <div><MapIcon size={18} /><span><small>Map</small><strong>{mapDisplayName}</strong></span></div>
            <div><Shield size={18} /><span><small>Civilizations</small><strong>{tournament.civilizationMode === "pick" ? "Players pick" : "Random"}</strong></span></div>
            <div><Swords size={18} /><span><small>Elo range</small><strong>{tournamentEloRange(tournament)}</strong></span></div>
            <div><Users size={18} /><span><small>Entrants</small><strong>{tournament.entries.length}/{tournament.participantCapacity}</strong></span></div>
          </div>
        </div>
        <aside className="tournament-entry-card">
          <span>{tournament.status === "registration" ? "Begins in" : tournament.status === "started" ? "Tournament" : tournament.status === "completed" ? "Champion" : "Status"}</span>
          <strong>{tournament.status === "registration" ? formatCountdown(Date.parse(tournament.startsAt) - now) : tournament.status === "started" ? "In progress" : tournament.status === "completed" ? champion?.displayName ?? "No winner" : "Canceled"}</strong>
          <small>{tournament.status === "completed" ? champion ? "Tournament winner" : "No champion was awarded" : tournament.status === "registration" ? formatFullStartTime(tournament.startsAt) : currentMatch?.readyDeadline ? `Ready by ${formatStartTime(currentMatch.readyDeadline)}` : formatFullStartTime(tournament.startsAt)}</small>
          <div className="tournament-capacity-track"><span style={{ width: `${tournament.entries.length / tournament.participantCapacity * 100}%` }} /></div>
          {tournament.status === "registration" ? (
            <>
              <p>{joinedEntry ? `You are in bracket slot ${joinedEntry.bracketSlot}` : spotsLeft === 0 ? "Registration is full" : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} remaining`}</p>
              {!joinedEntry && tournament.passwordProtected && (
                <label className="tournament-join-password"><span><Lock size={14} /> Tournament password</span><input type="password" maxLength={64} autoComplete="current-password" value={joinPassword} disabled={pending} onChange={(event) => onJoinPasswordChange(event.target.value)} /></label>
              )}
              <button className={joinedEntry ? "secondary wide" : "primary wide"} type="button" disabled={pending || cancelling || (!joinedEntry && (!spotsLeft || !ratingEligible))} onClick={onToggleJoin}>
                {pending ? "Updating…" : joinedEntry ? "Leave Tournament" : !ratingEligible ? tournamentRatingRequirement(tournament, currentPlayerRating) : spotsLeft === 0 ? "Tournament Full" : "Join Tournament"}
              </button>
            </>
          ) : tournament.status === "started" && currentMatch?.status === "waiting" ? (
            <>
              <p>{currentPlayerReady ? "You are ready. Waiting for your opponent." : `Your opponent is ${tournamentPlayerName(tournament, currentMatch.playerOneId === currentPlayerId ? currentMatch.playerTwoId : currentMatch.playerOneId)}.`}</p>
              {!currentPlayerReady && tournament.civilizationMode === "pick" && <ThemedSelect label="Your civilization" value={selectedCivilization} onChange={onCivilizationChange} options={civilizationOptions} />}
              <button className="primary wide tournament-ready-button" type="button" disabled={!queueAvailable} onClick={onReady}>
                {!queueAvailable ? (currentPlayerReady ? "Waiting for Opponent" : "Finish Current Activity") : currentPlayerReady ? "Resume Ready Check" : "Ready for Match"}
              </button>
            </>
          ) : tournament.status === "started" && currentMatch?.status === "in_progress" ? (
            <p>Your tournament match is currently in progress.</p>
          ) : tournament.status === "started" && entryStatus === "active" ? (
            <p>You advanced. Waiting for your next opponent.</p>
          ) : tournament.status === "completed" && entryStatus === "winner" ? (
            <p>You won the tournament.</p>
          ) : tournament.status === "completed" ? (
            <p>{champion ? `${champion.displayName} won the tournament.` : "The tournament ended without a winner."}</p>
          ) : joinedEntry ? (
            <p>Your tournament run has ended.</p>
          ) : (
            <p>Registration has closed.</p>
          )}
          {tournament.status === "registration" && tournament.creatorPlayerId === currentPlayerId && (
            <button className="tournament-cancel-button wide" type="button" disabled={pending || cancelling} onClick={onCancel}>
              <Trash2 size={15} /> {cancelling ? "Canceling…" : "Cancel Tournament"}
            </button>
          )}
        </aside>
      </article>
      <div className="tournament-detail-content">
        <section className="tournament-bracket-section">
          <div className="tournament-bracket-scroll">
            <div className="tournament-bracket" style={{ "--bracket-rounds": rounds.length } as CSSProperties}>
              {rounds.map((round, roundIndex) => (
                <div className="tournament-bracket-round" key={round.name}>
                  <div className="tournament-round-heading"><span>Round {roundIndex + 1}</span><strong>{round.name}</strong></div>
                  <div className="tournament-round-matches">
                    {round.matches.map((match, matchIndex) => {
                      const isPlayingInMatch = match.playerIds.includes(currentPlayerId);
                      return (
                        <article className={`tournament-bracket-match${match.spectatorUri ? " live" : ""}`} key={match.id || `${round.name}-${matchIndex}`}>
                          {match.players.map((player, playerIndex) => (
                            <div className={bracketPlayerClass(player, currentPlayerId)} key={playerIndex}>
                              <span>{typeof player === "object" ? player.bracketSlot : "—"}</span>
                              <strong>{typeof player === "object" ? player.displayName : player === "open" ? "Open spot" : "TBD"}</strong>
                              {typeof player === "object" && player.playerId === currentPlayerId && <em>You</em>}
                            </div>
                          ))}
                          {match.spectatorUri && (
                            <button className="tournament-watch-live" type="button" disabled={isPlayingInMatch || !queueAvailable || spectatingUri === match.spectatorUri} onClick={() => onWatch(match.spectatorUri!)}>
                              <Eye size={13} />
                              {isPlayingInMatch ? "Your match is live" : !queueAvailable ? "Finish current activity" : spectatingUri === match.spectatorUri ? "Opening live match…" : "Watch live"}
                            </button>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <TournamentChat tournament={tournament} currentPlayerId={currentPlayerId} />
      </div>
    </section>
  );
}

function TournamentChat({ tournament, currentPlayerId }: { tournament: Tournament; currentPlayerId: string }) {
  const { notify } = useAppStore();
  const [messages, setMessages] = useState<TournamentChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [minimized, setMinimized] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const hasAccess = tournament.creatorPlayerId === currentPlayerId
    || tournament.entries.some((entry) => entry.playerId === currentPlayerId);
  const latestMessageId = messages.at(-1)?.id;

  useEffect(() => {
    setMessages([]);
    setLoadError(null);
    if (!hasAccess) return undefined;
    let active = true;
    setLoading(true);
    void tournamentService.messages(tournament.id).then((history) => {
      if (active) setMessages((current) => mergeTournamentMessages(history, current));
    }).catch((error) => {
      if (active) setLoadError(messageFor(error));
    }).finally(() => {
      if (active) setLoading(false);
    });
    const unsubscribe = tournamentService.onEvent((event) => {
      if (active && event.type === "chat_message" && event.tournamentId === tournament.id) {
        setMessages((current) => mergeTournamentMessages(current, [event.message]));
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [hasAccess, tournament.id]);

  useEffect(() => {
    const list = messagesRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [latestMessageId, minimized]);

  async function submitMessage(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const message = await tournamentService.sendMessage(tournament.id, text);
      setMessages((current) => mergeTournamentMessages(current, [message]));
      setDraft("");
    } catch (error) {
      notify("Tournament message could not be sent.", "danger", { detail: messageFor(error) });
    } finally {
      setSending(false);
    }
  }

  if (!hasAccess) return null;

  if (minimized) {
    return (
      <button className="chat-minimized tournament-chat-minimized" type="button" onClick={() => setMinimized(false)}>
        <span className="tournament-chat-mark"><Trophy size={16} /></span>
        <span><strong>Tournament chat</strong><small data-ui-translation="off">{tournament.name}</small></span>
      </button>
    );
  }

  return (
    <section className="chat-window tournament-chat-window">
      <header className="chat-header tournament-chat-header">
        <button className="chat-person" type="button" onClick={() => setMinimized(true)}>
          <span className="tournament-chat-mark"><Trophy size={17} /></span>
          <span><strong>Tournament chat</strong><small data-ui-translation="off">{tournament.name}</small></span>
        </button>
        <div><button type="button" aria-label="Minimize tournament chat" onClick={() => setMinimized(true)}><Minus size={16} /></button></div>
      </header>
      <div className="chat-messages tournament-chat-messages" aria-live="polite" ref={messagesRef}>
        {loading && messages.length === 0 && <p className="tournament-chat-state">Loading chat history…</p>}
        {loadError && <p className="tournament-chat-state danger">{loadError}</p>}
        {!loading && !loadError && messages.length === 0 && <p className="tournament-chat-state">No messages yet. Start the conversation.</p>}
        {messages.map((message) => (
          <div className={`chat-message tournament-chat-message${message.playerId === currentPlayerId ? " me" : ""}`} key={message.id}>
            <small className="tournament-chat-author"><strong data-ui-translation="off">{message.author}</strong> · {formatChatTime(message.sentAt)}</small>
            <span data-ui-translation="off">{message.text}</span>
          </div>
        ))}
      </div>
      <form className="chat-compose tournament-chat-compose" onSubmit={(event) => void submitMessage(event)}>
        <input maxLength={500} placeholder="Message tournament…" value={draft} disabled={sending} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit" aria-label="Send tournament message" disabled={sending || !draft.trim()}><Send size={16} /></button>
      </form>
    </section>
  );
}

function mergeTournamentMessages(...groups: TournamentChatMessage[][]): TournamentChatMessage[] {
  const messages = new Map<string, TournamentChatMessage>();
  for (const group of groups) for (const message of group) messages.set(message.id, message);
  return [...messages.values()].sort((left, right) =>
    Date.parse(left.sentAt) - Date.parse(right.sentAt) || left.id.localeCompare(right.id));
}

function buildBracket(tournament: Tournament): Array<{ name: string; matches: BracketMatch[] }> {
  const entrantsBySlot = new Map(tournament.entries.map((entry) => [entry.bracketSlot, entry]));
  const entrantsById = new Map(tournament.entries.map((entry) => [entry.playerId, entry]));
  const rounds: Array<{ name: string; matches: BracketMatch[] }> = [];
  for (let playersInRound = tournament.participantCapacity, roundIndex = 0; playersInRound >= 2; playersInRound /= 2, roundIndex += 1) {
    const persistedMatches = tournament.matches.filter((match) => match.roundNumber === roundIndex + 1);
    rounds.push({
      name: bracketRoundName(playersInRound),
      matches: Array.from({ length: playersInRound / 2 }, (_, matchIndex) => {
        const persisted = persistedMatches.find((match) => match.matchPosition === matchIndex + 1);
        if (persisted) {
          const playerIds = [persisted.playerOneId, persisted.playerTwoId];
          return {
            id: persisted.id,
            playerIds,
            ...(persisted.spectatorUri ? { spectatorUri: persisted.spectatorUri } : {}),
            players: playerIds.map((playerId) =>
              playerId ? entrantsById.get(playerId) ?? "tbd" : roundIndex === 0 ? "open" : "tbd"
            )
          };
        }
        return {
          id: `${roundIndex + 1}:${matchIndex + 1}`,
          playerIds: [],
          players: roundIndex === 0
            ? [entrantsBySlot.get(matchIndex * 2 + 1) ?? "open", entrantsBySlot.get(matchIndex * 2 + 2) ?? "open"]
            : ["tbd", "tbd"]
        };
      })
    });
  }
  return rounds;
}

function tournamentStatusLabel(status: Tournament["status"]): string {
  if (status === "registration") return "Registration open";
  if (status === "started") return "Tournament in progress";
  if (status === "completed") return "Tournament complete";
  return "Tournament canceled";
}

function tournamentListStatusLabel(status: Tournament["status"]): string {
  if (status === "registration") return "Registration Open";
  if (status === "started") return "In Progress";
  if (status === "completed") return "Complete";
  return "Cancelled";
}

function tournamentPlayerName(tournament: Tournament, playerId?: string): string {
  return tournament.entries.find((entry) => entry.playerId === playerId)?.displayName ?? "TBD";
}

function compareTournaments(left: Tournament, right: Tournament): number {
  const order: Record<Tournament["status"], number> = { started: 0, registration: 1, completed: 2, cancelled: 3 };
  const statusDifference = order[left.status] - order[right.status];
  if (statusDifference) return statusDifference;
  if (left.status === "completed" && right.status === "completed") {
    return Date.parse(right.completedAt ?? right.startsAt) - Date.parse(left.completedAt ?? left.startsAt)
      || Date.parse(right.createdAt) - Date.parse(left.createdAt);
  }
  return Date.parse(left.startsAt) - Date.parse(right.startsAt)
    || Date.parse(left.createdAt) - Date.parse(right.createdAt);
}

function tournamentAccessLabel(tournament: Tournament): string {
  const rating = tournamentEloRange(tournament);
  return tournament.passwordProtected ? `Password · ${rating}` : rating;
}

function tournamentEloRange(tournament: Tournament): string {
  if (tournament.maximumElo === undefined) return tournament.minimumElo > 0 ? `${tournament.minimumElo}+ Elo` : "Open rating";
  return `${tournament.minimumElo}–${tournament.maximumElo} Elo`;
}

function tournamentRatingRequirement(tournament: Tournament, playerRating: number): string {
  if (playerRating < tournament.minimumElo) return `Requires at least ${tournament.minimumElo} Elo`;
  return `Requires at most ${tournament.maximumElo} Elo`;
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

function formatChatTime(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(timestamp));
}

function TournamentDateTimePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selected = parseDateTimeInput(value);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
  const rootRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const hour24 = selected.getHours();
  const hour12 = hour24 % 12 || 12;
  const minute = selected.getMinutes();
  const period = hour24 >= 12 ? "PM" : "AM";
  const firstGridDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1 - visibleMonth.getDay());
  const days = Array.from({ length: 42 }, (_, index) => new Date(
    firstGridDay.getFullYear(),
    firstGridDay.getMonth(),
    firstGridDay.getDate() + index
  ));
  const weekdayLabels = Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(undefined, { weekday: "narrow" })
    .format(new Date(2024, 0, 7 + index)));

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideInteraction = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideInteraction);
    return () => document.removeEventListener("pointerdown", closeOnOutsideInteraction);
  }, [open]);

  function chooseDay(day: Date) {
    onChange(formatDateTimeInput(new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      selected.getHours(),
      selected.getMinutes()
    ).getTime()));
  }

  function changeTimePart(next: { hour?: string; minute?: string; period?: string }) {
    const nextHour12 = Number(next.hour ?? hour12);
    const nextMinute = Number(next.minute ?? minute);
    const nextPeriod = next.period ?? period;
    const nextHour24 = nextHour12 % 12 + (nextPeriod === "PM" ? 12 : 0);
    onChange(formatDateTimeInput(new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      nextHour24,
      nextMinute
    ).getTime()));
  }

  return (
    <div className="tournament-datetime-field" ref={rootRef}>
      <span>Begins</span>
      <div className={`tournament-datetime-picker${open ? " open" : ""}`}>
        <button className="tournament-datetime-trigger" type="button" aria-expanded={open} onClick={() => {
          setVisibleMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
          setOpen((current) => !current);
        }}>
          <span>{new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(selected)}</span>
          <CalendarDays size={16} />
        </button>
        {open && (
          <div className="tournament-calendar" role="dialog" aria-label="Choose tournament start date and time">
            <header>
              <button type="button" aria-label="Previous month" onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={16} /></button>
              <strong>{new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(visibleMonth)}</strong>
              <button type="button" aria-label="Next month" onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={16} /></button>
            </header>
            <div className="tournament-calendar-weekdays" aria-hidden="true">{weekdayLabels.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
            <div className="tournament-calendar-days">
              {days.map((day) => {
                const isSelected = sameCalendarDay(day, selected);
                const isToday = sameCalendarDay(day, today);
                return (
                  <button
                    className={`${day.getMonth() === visibleMonth.getMonth() ? "" : "outside"}${isToday ? " today" : ""}${isSelected ? " selected" : ""}`}
                    type="button"
                    aria-pressed={isSelected}
                    key={formatDateKey(day)}
                    onClick={() => chooseDay(day)}
                  >{day.getDate()}</button>
                );
              })}
            </div>
            <footer>
              <div className="tournament-time-controls">
                <ThemedSelect label="Hour" value={String(hour12)} onChange={(hour) => changeTimePart({ hour })} options={Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }))} />
                <ThemedSelect label="Minute" value={String(minute)} onChange={(nextMinute) => changeTimePart({ minute: nextMinute })} options={Array.from({ length: 60 }, (_, index) => ({ value: String(index), label: String(index).padStart(2, "0") }))} />
                <ThemedSelect label="AM/PM" value={period} onChange={(nextPeriod) => changeTimePart({ period: nextPeriod })} options={[{ value: "AM", label: "AM" }, { value: "PM", label: "PM" }]} />
              </div>
              <button className="primary" type="button" onClick={() => setOpen(false)}>Done</button>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

function parseDateTimeInput(value: string): Date {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  return match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]))
    : new Date();
}

function sameCalendarDay(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatDateTimeInput(timestamp: number): string {
  const date = new Date(timestamp);
  return new Date(timestamp - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function messageFor(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
