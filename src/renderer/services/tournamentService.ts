import type { CreateTournamentInput, Tournament, TournamentChatMessage } from "../../shared/contracts/tournaments";
import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";

let previewTournaments: Tournament[] = createPreviewTournaments();
const previewPasswords = new Map<string, string>([["arena-night", "wololo"]]);

export const tournamentService = {
  async list(): Promise<Tournament[]> {
    if (isPreviewMode) return structuredClone(previewTournaments);
    return (await matchmakerTransport.request<{ tournaments: Tournament[] }>("/tournaments")).tournaments;
  },

  async get(tournamentId: string): Promise<Tournament> {
    if (isPreviewMode) return structuredClone(requirePreviewTournament(tournamentId));
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}`)).tournament;
  },

  async create(input: CreateTournamentInput): Promise<Tournament> {
    if (isPreviewMode) {
      const existing = previewTournaments.find((tournament) =>
        tournament.creatorPlayerId === "user-1"
        && (tournament.status === "started" || (tournament.status === "registration" && Date.parse(tournament.startsAt) > Date.now()))
      );
      if (existing) throw new Error(`You already have a tournament running: "${existing.name}". Cancel it before creating another.`);
      const tournament: Tournament = {
        id: `preview-${Date.now()}`,
        creatorPlayerId: "user-1",
        creatorDisplayName: "EmpireSum",
        name: input.name,
        format: "single_elimination",
        civilizationMode: input.civilizationMode,
        participantCapacity: input.participantCapacity,
        minimumElo: input.minimumElo,
        mapId: input.mapId,
        mapName: input.mapName,
        passwordProtected: Boolean(input.password),
        status: "registration",
        startsAt: input.startsAt,
        createdAt: new Date().toISOString(),
        entries: [],
        matches: []
      };
      if (input.password) previewPasswords.set(tournament.id, input.password);
      previewTournaments = [...previewTournaments, tournament];
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>("/tournaments", { method: "POST", body: input })).tournament;
  },

  async cancel(tournamentId: string): Promise<{ id: string; name: string; unregisteredPlayers: number }> {
    if (isPreviewMode) {
      const tournament = requirePreviewTournament(tournamentId);
      const cancelled = { id: tournament.id, name: tournament.name, unregisteredPlayers: tournament.entries.length };
      previewPasswords.delete(tournamentId);
      previewTournaments = previewTournaments.filter((item) => item.id !== tournamentId);
      return cancelled;
    }
    return (await matchmakerTransport.request<{ cancelled: { id: string; name: string; unregisteredPlayers: number } }>(
      `/tournaments/${encodeURIComponent(tournamentId)}`,
      { method: "DELETE" }
    )).cancelled;
  },

  async join(tournamentId: string, password?: string): Promise<Tournament> {
    if (isPreviewMode) {
      const tournament = requirePreviewTournament(tournamentId);
      if (tournament.passwordProtected && previewPasswords.get(tournamentId) !== password) {
        throw new Error("Incorrect tournament password.");
      }
      if (!tournament.entries.some((entry) => entry.playerId === "user-1")) {
        const occupied = new Set(tournament.entries.map((entry) => entry.bracketSlot));
        const bracketSlot = Array.from({ length: tournament.participantCapacity }, (_, index) => index + 1).find((slot) => !occupied.has(slot))!;
        tournament.entries.push({ playerId: "user-1", displayName: "EmpireSum", rating: 1426, ratingAtJoin: 1426, status: "active", bracketSlot, joinedAt: new Date().toISOString() });
      }
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}/join`, {
      method: "POST",
      body: { password }
    })).tournament;
  },

  async leave(tournamentId: string): Promise<Tournament> {
    if (isPreviewMode) {
      const tournament = requirePreviewTournament(tournamentId);
      tournament.entries = tournament.entries.filter((entry) => entry.playerId !== "user-1");
      return structuredClone(tournament);
    }
    return (await matchmakerTransport.request<{ tournament: Tournament }>(`/tournaments/${encodeURIComponent(tournamentId)}/join`, { method: "DELETE" })).tournament;
  },

  async messages(tournamentId: string): Promise<TournamentChatMessage[]> {
    if (isPreviewMode) return [...(previewChatMessages.get(tournamentId) ?? [])];
    return (await matchmakerTransport.request<{ messages: TournamentChatMessage[] }>(
      `/tournaments/${encodeURIComponent(tournamentId)}/messages`
    )).messages;
  },

  async sendMessage(tournamentId: string, text: string): Promise<TournamentChatMessage> {
    if (isPreviewMode) {
      const chatRecord = { id: `preview-chat-${Date.now()}`, playerId: "user-1", author: "EmpireSum", text, sentAt: new Date().toISOString() };
      previewChatMessages.set(tournamentId, [...(previewChatMessages.get(tournamentId) ?? []), chatRecord]);
      return chatRecord;
    }
    return (await matchmakerTransport.request<{ message: TournamentChatMessage }>(
      `/tournaments/${encodeURIComponent(tournamentId)}/messages`,
      { method: "POST", body: { text } }
    )).message;
  },

  onEvent(listener: Parameters<typeof matchmakerTransport.onTournamentEvent>[0]) {
    if (isPreviewMode) return () => undefined;
    return matchmakerTransport.onTournamentEvent(listener);
  }
};

const previewChatMessages = createPreviewTournamentChats();

function requirePreviewTournament(tournamentId: string): Tournament {
  const tournament = previewTournaments.find((item) => item.id === tournamentId);
  if (!tournament) throw new Error("Tournament not found.");
  return tournament;
}

function createPreviewTournaments(): Tournament[] {
  const activeEntries = previewEntries("empire-cup", [
    "WololoJoe", "CastleAge", "MangoShot", "BlueCoffee", "RelicHunter", "TownBell", "FastCastle", "Trebuchet"
  ], 1320);
  const completedEntries = previewEntries("forest-masters", [
    "MonkMicro", "StoneWall", "ScoutRush", "KingdomCome", "BoarPuller", "FarmReset", "GoldMiner", "LoomFirst"
  ], 1380).map((entry, index) => ({ ...entry, status: index === 0 ? "winner" as const : "eliminated" as const }));
  const olderCompletedEntries = previewEntries("golden-qualifier", [
    "StableSwitch", "QuickWall", "MarketAbuse", "DarkAgeDan", "BerryGuard", "CastleClick", "RelicRunner", "WallBuilder"
  ], 1100).map((entry, index) => ({ ...entry, status: index === 4 ? "winner" as const : "eliminated" as const }));
  return [
    {
      ...previewTournamentBase("empire-cup", "Empire Cup", "CupAdmin", 8, "arabia", "KotD6 Arabia EL", "pick", 1250),
      status: "started",
      startsAt: previewTime(-58),
      startedAt: previewTime(-58),
      entries: activeEntries,
      matches: previewEightPlayerMatches("empire-cup", false)
    },
    {
      ...previewTournamentBase("arabia-open", "Arabia Open", "TournamentHost", 16, "arabia", "KotD6 Arabia EL", "pick", 1200),
      status: "registration",
      startsAt: previewTime(42),
      entries: previewEntries("arabia-open", [
        "EmpireSum", "WololoJoe", "CastleAge", "MangoShot", "BlueCoffee", "RelicHunter",
        "TownBell", "FastCastle", "Trebuchet", "ScoutRush", "StoneWall", "MonkMicro"
      ], 1240, "user-1")
    },
    {
      ...previewTournamentBase("arena-night", "Arena Night", "WallBuilder27", 8, "arena", "Arena", "random", 1400),
      passwordProtected: true,
      status: "registration",
      startsAt: previewTime(210),
      entries: previewEntries("arena-night", ["MonkMicro42", "ClownPrince", "SiegeWorkshop", "CastleDrop", "Redemption"], 1410)
    },
    {
      ...previewTournamentBase("nomad-weekend", "Nomad Weekend", "RelicRunner18", 16, "land-nomad", "Land Nomad EL", "pick", 0),
      status: "registration",
      startsAt: previewTime(1_560),
      entries: previewEntries("nomad-weekend", [
        "BoarPuller16", "DockFirst", "TownBell", "ScoutRush34", "VillagerFight", "FishBoom", "TCFinder", "MangoShot", "MarketAbuse"
      ], 1020)
    },
    {
      ...previewTournamentBase("forest-masters", "Black Forest Masters", "BoomEnjoyer", 8, "black-forest", "Black Forest", "random", 1350),
      status: "completed",
      startsAt: previewTime(-300),
      startedAt: previewTime(-300),
      completedAt: previewTime(-74),
      entries: completedEntries,
      matches: previewEightPlayerMatches("forest-masters", true)
    },
    {
      ...previewTournamentBase("golden-qualifier", "Golden League Qualifier", "LeagueAdmin", 8, "gold-rush", "Gold Rush", "pick", 1000),
      status: "completed",
      startsAt: previewTime(-3_000),
      startedAt: previewTime(-3_000),
      completedAt: previewTime(-2_820),
      entries: olderCompletedEntries,
      matches: previewEightPlayerMatches("golden-qualifier", true, 4)
    }
  ];
}

function previewTournamentBase(
  id: string,
  name: string,
  creatorDisplayName: string,
  participantCapacity: number,
  mapId: string,
  mapName: string,
  civilizationMode: Tournament["civilizationMode"],
  minimumElo: number
): Tournament {
  return {
    id,
    creatorPlayerId: `${id}-organizer`,
    creatorDisplayName,
    name,
    format: "single_elimination",
    civilizationMode,
    participantCapacity,
    minimumElo,
    mapId,
    mapName,
    passwordProtected: false,
    status: "registration",
    startsAt: previewTime(60),
    createdAt: previewTime(-1_440),
    entries: [],
    matches: []
  };
}

function previewEntries(tournamentId: string, names: string[], baseRating: number, firstPlayerId?: string): Tournament["entries"] {
  return names.map((displayName, index) => ({
    playerId: index === 0 && firstPlayerId ? firstPlayerId : `${tournamentId}-player-${index + 1}`,
    displayName,
    rating: baseRating + index * 23,
    ratingAtJoin: baseRating + index * 23,
    status: "active",
    bracketSlot: index + 1,
    joinedAt: previewTime(-180 + index * 4)
  }));
}

function previewEightPlayerMatches(tournamentId: string, completed: boolean, championIndex = 0): Tournament["matches"] {
  const playerId = (index: number) => `${tournamentId}-player-${index + 1}`;
  const quarterfinalWinners = [0, 2, 4, 6];
  const semifinalWinners = [0, 4];
  const match = (
    roundNumber: number,
    matchPosition: number,
    playerOneIndex?: number,
    playerTwoIndex?: number,
    winnerIndex?: number,
    status: Tournament["matches"][number]["status"] = "completed"
  ): Tournament["matches"][number] => ({
    id: `${tournamentId}:r${roundNumber}:m${matchPosition}`,
    roundNumber,
    matchPosition,
    ...(playerOneIndex !== undefined ? { playerOneId: playerId(playerOneIndex) } : {}),
    ...(playerTwoIndex !== undefined ? { playerTwoId: playerId(playerTwoIndex) } : {}),
    playerOneReady: status !== "pending",
    playerTwoReady: status !== "pending",
    ...(winnerIndex !== undefined ? { winnerPlayerId: playerId(winnerIndex) } : {}),
    status,
    ...(status === "completed" ? { completedAt: previewTime(-110 + roundNumber * 20 + matchPosition) } : {})
  });
  const quarterfinals = [
    match(1, 1, 0, 1, quarterfinalWinners[0]), match(1, 2, 2, 3, quarterfinalWinners[1]),
    match(1, 3, 4, 5, quarterfinalWinners[2]), match(1, 4, 6, 7, quarterfinalWinners[3])
  ];
  if (completed) {
    return [
      ...quarterfinals,
      match(2, 1, 0, 2, semifinalWinners[0]), match(2, 2, 4, 6, semifinalWinners[1]),
      match(3, 1, 0, 4, championIndex)
    ];
  }
  return [
    ...quarterfinals,
    { ...match(2, 1, 0, 2, undefined, "in_progress"), spectatorUri: "aoe2de://0/preview-spectator" },
    { ...match(2, 2, 4, 6, undefined, "waiting"), readyDeadline: previewTime(4) },
    match(3, 1, undefined, undefined, undefined, "pending")
  ];
}

function createPreviewTournamentChats(): Map<string, TournamentChatMessage[]> {
  return new Map([["arabia-open", [
    { id: "preview-chat-1", playerId: "arabia-open-organizer", author: "TournamentHost", text: "Welcome! Check in a few minutes before the start.", sentAt: previewTime(-34) },
    { id: "preview-chat-2", playerId: "arabia-open-player-3", author: "CastleAge", text: "Good luck everyone.", sentAt: previewTime(-26) },
    { id: "preview-chat-3", playerId: "user-1", author: "EmpireSum", text: "Looking forward to it!", sentAt: previewTime(-19) },
    { id: "preview-chat-4", playerId: "arabia-open-organizer", author: "TournamentHost", text: "The fixed map is KotD6 Arabia EL.", sentAt: previewTime(-8) }
  ]]]);
}

function previewTime(minutesFromNow: number): string {
  return new Date(Date.now() + minutesFromNow * 60_000).toISOString();
}
