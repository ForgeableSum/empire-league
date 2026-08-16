import { ArrowLeft, CalendarClock, ChevronRight, Map as MapIcon, Plus, Shield, Swords, Trophy, Users, X } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { enabledMapCatalogEntries } from "../../shared/mapCatalog";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { previewSection } from "../previewMode";
import { useAppStore } from "../state/appStore";

type CivilizationMode = "pick" | "random";

interface MockTournament {
  id: string;
  name: string;
  map: string;
  civilizationMode: CivilizationMode;
  minimumElo: number;
  participants: number;
  capacity: number;
  beginsAt: number;
}

const mockTournamentTemplates: Array<Omit<MockTournament, "beginsAt"> & { beginsInMs: number }> = [
  { id: "arabia-open", name: "Arabia Open", map: "Arabia", civilizationMode: "pick", minimumElo: 1200, participants: 13, capacity: 16, beginsInMs: 42 * 60_000 + 18_000 },
  { id: "arena-clash", name: "Arena Clash", map: "Arena", civilizationMode: "random", minimumElo: 1000, participants: 8, capacity: 8, beginsInMs: 3 * 60 * 60_000 + 14 * 60_000 },
  { id: "nomad-cup", name: "Nomad Cup", map: "Land Nomad", civilizationMode: "random", minimumElo: 1400, participants: 21, capacity: 32, beginsInMs: 26 * 60 * 60_000 + 8 * 60_000 },
  { id: "rookie-rumble", name: "Rookie Rumble", map: "Four Lakes", civilizationMode: "pick", minimumElo: 0, participants: 7, capacity: 16, beginsInMs: 3 * 24 * 60 * 60_000 + 5 * 60 * 60_000 }
];

const mockEntrants = [
  "EmpireSum", "WololoJoe", "CastleAge", "MangoShot", "BlueCoffee", "RelicHunter", "TownBell", "FastCastle",
  "Trebuchet", "ScoutRush", "StoneWall", "KingdomCome", "MonkMicro", "BoarLurer", "GoldMiner", "FeudalFire",
  "SiegeWorks", "NomadKing", "WoodPlease", "MarketAbuse", "VillagerTwo", "TheCartographer", "DarkAge", "Longbow"
];

export function TournamentsPage() {
  const { notify } = useAppStore();
  const [creating, setCreating] = useState(previewSection === "create");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(previewSection === "detail" ? "arabia-open" : null);
  const [joinedTournamentIds, setJoinedTournamentIds] = useState<string[]>([]);
  const [now, setNow] = useState(Date.now());
  const [name, setName] = useState("Weekend Showdown");
  const [capacity, setCapacity] = useState("16");
  const [minimumElo, setMinimumElo] = useState("1000");
  const [beginsAt, setBeginsAt] = useState(() => formatDateTimeInput(Date.now() + 24 * 60 * 60_000));
  const [mapId, setMapId] = useState(enabledMapCatalogEntries.find((map) => map.name === "Arabia")?.id ?? enabledMapCatalogEntries[0]?.id ?? "");
  const [civilizationMode, setCivilizationMode] = useState<CivilizationMode>("pick");
  const tournaments = useMemo(() => {
    const createdAt = Date.now();
    return mockTournamentTemplates
      .map(({ beginsInMs, ...tournament }) => ({ ...tournament, beginsAt: createdAt + beginsInMs }))
      .sort((left, right) => left.beginsAt - right.beginsAt);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function submitMockTournament(event: FormEvent) {
    event.preventDefault();
    notify("Tournament creation is a visual mockup.", "info", { detail: "No tournament was published or saved." });
  }

  const selectedTournament = tournaments.find((tournament) => tournament.id === selectedTournamentId);
  if (selectedTournament) {
    return (
      <TournamentDetail
        tournament={selectedTournament}
        now={now}
        joined={joinedTournamentIds.includes(selectedTournament.id)}
        onBack={() => setSelectedTournamentId(null)}
        onToggleJoin={() => setJoinedTournamentIds((current) => current.includes(selectedTournament.id)
          ? current.filter((id) => id !== selectedTournament.id)
          : [...current, selectedTournament.id])}
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
        <form className="panel tournament-create-panel" onSubmit={submitMockTournament}>
          <div className="tournament-create-heading">
            <div><span className="eyebrow">New tournament</span><h2>Tournament settings</h2></div>
            <button className="tournament-close" type="button" aria-label="Close tournament form" onClick={() => setCreating(false)}><X size={20} /></button>
          </div>

          <div className="tournament-form-grid">
            <label className="tournament-name-field">Tournament name<input maxLength={64} value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Begins<input type="datetime-local" value={beginsAt} onChange={(event) => setBeginsAt(event.target.value)} /></label>
            <ThemedSelect label="Participants" value={capacity} onChange={setCapacity} options={[8, 16, 32, 64].map((count) => ({ value: String(count), label: `${count} players` }))} />
            <label>Minimum Elo<input min="0" max="3000" step="50" type="number" value={minimumElo} onChange={(event) => setMinimumElo(event.target.value)} /></label>
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
              <button className="secondary" type="button" onClick={() => setCreating(false)}>Cancel</button>
              <button className="primary" type="submit" disabled={!name.trim() || !mapId || !beginsAt || minimumElo === ""}>Create Tournament</button>
            </div>
          </div>
        </form>
      )}

      <div className="tournament-list-section">
        <div className="tournament-list-title">
          <div><h2>Upcoming tournaments</h2><p>Starting soonest first</p></div>
          <span><CalendarClock size={15} /> Times shown locally</span>
        </div>
        <div className="tournament-list">
          <div className="tournament-list-header" aria-hidden="true">
            <span>Tournament</span><span>Map</span><span>Rules</span><span>Players</span><span>Begins</span><span />
          </div>
          {tournaments.map((tournament, index) => (
            <button className="tournament-row" key={tournament.id} type="button" onClick={() => setSelectedTournamentId(tournament.id)}>
              <div className="tournament-identity">
                <span className="tournament-emblem"><Trophy size={18} /></span>
                <span><strong>{tournament.name}</strong><small>{index === 0 ? "Next tournament" : "Single elimination"}</small></span>
              </div>
              <div><strong>{tournament.map}</strong><small>Fixed map</small></div>
              <div><strong>{tournament.civilizationMode === "pick" ? "Pick civilizations" : "Random civilizations"}</strong><small>{tournament.minimumElo > 0 ? `${tournament.minimumElo}+ Elo` : "Open rating"}</small></div>
              <div className="tournament-player-count"><Users size={16} /><span><strong>{tournament.participants}/{tournament.capacity}</strong><small>{tournament.capacity - tournament.participants} spots left</small></span></div>
              <div className="tournament-begins"><strong>{formatCountdown(tournament.beginsAt - now)}</strong><small>{formatStartTime(tournament.beginsAt)}</small></div>
              <span className="tournament-row-action" aria-hidden="true"><ChevronRight size={20} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TournamentDetail({ tournament, now, joined, onBack, onToggleJoin }: {
  tournament: MockTournament;
  now: number;
  joined: boolean;
  onBack: () => void;
  onToggleJoin: () => void;
}) {
  const rounds = buildBracket(tournament.capacity, tournament.participants);
  const spotsLeft = Math.max(0, tournament.capacity - tournament.participants - Number(joined));
  const displayedParticipants = Math.min(tournament.capacity, tournament.participants + Number(joined));

  return (
    <section className="tournament-detail-page">
      <button className="tournament-detail-back" type="button" onClick={onBack}><ArrowLeft size={16} /> All tournaments</button>

      <article className="panel tournament-detail-hero">
        <div className="tournament-detail-main">
          <div className="tournament-detail-status"><span /> Registration open</div>
          <span className="eyebrow">Single elimination</span>
          <h2>{tournament.name}</h2>
          <p>Win your match to advance. One loss eliminates you from the tournament.</p>
          <div className="tournament-detail-facts">
            <div><MapIcon size={18} /><span><small>Map</small><strong>{tournament.map}</strong></span></div>
            <div><Shield size={18} /><span><small>Civilizations</small><strong>{tournament.civilizationMode === "pick" ? "Players pick" : "Random"}</strong></span></div>
            <div><Swords size={18} /><span><small>Minimum Elo</small><strong>{tournament.minimumElo > 0 ? tournament.minimumElo : "Open"}</strong></span></div>
            <div><Users size={18} /><span><small>Entrants</small><strong>{displayedParticipants}/{tournament.capacity}</strong></span></div>
          </div>
        </div>

        <aside className="tournament-entry-card">
          <span>Begins in</span>
          <strong>{formatCountdown(tournament.beginsAt - now)}</strong>
          <small>{formatFullStartTime(tournament.beginsAt)}</small>
          <div className="tournament-capacity-track"><span style={{ width: `${displayedParticipants / tournament.capacity * 100}%` }} /></div>
          <p>{spotsLeft === 0 ? "Registration is full" : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} remaining`}</p>
          <button className={joined ? "secondary wide" : "primary wide"} type="button" disabled={!joined && spotsLeft === 0} onClick={onToggleJoin}>
            {joined ? "Leave Tournament" : spotsLeft === 0 ? "Tournament Full" : "Join Tournament"}
          </button>
        </aside>
      </article>

      <section className="tournament-bracket-section">
        <div className="tournament-bracket-heading">
          <div><span className="eyebrow">The road to victory</span><h2>Bracket</h2></div>
          <p>Seeds are finalized when registration closes.</p>
        </div>
        <div className="tournament-bracket-scroll">
          <div className="tournament-bracket" style={{ "--bracket-rounds": rounds.length } as CSSProperties}>
            {rounds.map((round, roundIndex) => (
              <div className="tournament-bracket-round" key={round.name}>
                <div className="tournament-round-heading"><span>Round {roundIndex + 1}</span><strong>{round.name}</strong></div>
                <div className="tournament-round-matches">
                  {round.matches.map((match, matchIndex) => (
                    <article className="tournament-bracket-match" key={`${round.name}-${matchIndex}`}>
                      {match.map((player, playerIndex) => (
                        <div className={player === "Open spot" ? "open" : player === "TBD" ? "pending" : ""} key={playerIndex}>
                          <span>{player === "Open spot" || player === "TBD" ? "—" : seedFor(roundIndex, matchIndex, playerIndex)}</span>
                          <strong>{player}</strong>
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

function buildBracket(capacity: number, participants: number): Array<{ name: string; matches: string[][] }> {
  const normalizedCapacity = Math.max(2, 2 ** Math.ceil(Math.log2(capacity)));
  const playerSlots = Array.from({ length: normalizedCapacity }, (_, index) => index < participants
    ? mockEntrants[index % mockEntrants.length]
    : "Open spot");
  const rounds: Array<{ name: string; matches: string[][] }> = [];

  for (let playersInRound = normalizedCapacity, roundIndex = 0; playersInRound >= 2; playersInRound /= 2, roundIndex += 1) {
    const matchCount = playersInRound / 2;
    rounds.push({
      name: bracketRoundName(playersInRound),
      matches: Array.from({ length: matchCount }, (_, matchIndex) => roundIndex === 0
        ? [playerSlots[matchIndex * 2], playerSlots[matchIndex * 2 + 1]]
        : ["TBD", "TBD"])
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

function seedFor(roundIndex: number, matchIndex: number, playerIndex: number): number {
  return roundIndex === 0 ? matchIndex * 2 + playerIndex + 1 : 0;
}

function formatCountdown(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
}

function formatStartTime(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" }).format(timestamp);
}

function formatFullStartTime(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(timestamp);
}

function formatDateTimeInput(timestamp: number): string {
  const date = new Date(timestamp);
  const localTimestamp = timestamp - date.getTimezoneOffset() * 60_000;
  return new Date(localTimestamp).toISOString().slice(0, 16);
}
