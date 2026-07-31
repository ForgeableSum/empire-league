import type { CustomLobbyRoom } from "../../shared/contracts/customLobby";
import type { MatchSummary } from "../../shared/contracts/matches";
import type { FriendRequest, SocialFriend } from "../pages/SocialPage";

export const previewMatches: MatchSummary[] = [
  ["match-1", "StoneGate21", 1452, "win", "Arabia", "Byzantines", "Franks", 16, 31],
  ["match-2", "RelicRunner18", 1438, "loss", "Arena", "Britons", "Bohemians", -15, 42],
  ["match-3", "ScoutRush34", 1409, "win", "Land Nomad", "Mongols", "Mayans", 14, 36],
  ["match-4", "WallBuilder27", 1471, "win", "Acropolis", "Lithuanians", "Japanese", 17, 28],
  ["match-5", "FastImp19", 1418, "loss", "Four Lakes", "Mayans", "Hindustanis", -14, 39],
  ["match-6", "MonkMicro42", 1397, "win", "Hideout", "Poles", "Aztecs", 13, 34],
  ["match-7", "BoarPuller16", 1444, "win", "Golden Swamp", "Japanese", "Byzantines", 16, 29]
].map(([id, opponent, opponentRating, outcome, map, civilization, opponentCivilization, ratingChange, durationMinutes], index) => ({
  id: String(id),
  opponentId: `preview-player-${index + 1}`,
  opponent: String(opponent),
  opponentRating: Number(opponentRating),
  outcome: outcome as MatchSummary["outcome"],
  map: String(map),
  civilization: String(civilization),
  opponentCivilization: String(opponentCivilization),
  ratingChange: Number(ratingChange),
  durationMinutes: Number(durationMinutes),
  timestamp: new Date(Date.now() - index * 86_400_000).toISOString(),
  verified: true,
  queueType: "Ranked 1v1 Random Map"
}));

export const previewCustomRooms: CustomLobbyRoom[] = [
  room("custom-1", "Friday Nomad FFA", "Land Nomad", 8, ["RelicRunner", "BoarPuller", "TownBell", "FastImp"]),
  room("custom-2", "CBA Practice", "CBA", 8, ["CastleClick", "FarmReset", "GoldMiner", "BerryGuard", "LoomFirst"]),
  room("custom-3", "Arena 2v2", "Arena", 4, ["MonkMicro", "WallBuilder", "StableSwitch"]),
  room("custom-4", "Michi No Rush", "Michi", 6, ["DarkAgeDan", "MarketAbuse"]),
  room("custom-5", "Community Megarandom", "Megarandom", 8, ["HillFort"])
];

export const previewFriends: SocialFriend[] = [
  { id: "friend-1", name: "StoneGate21", initials: "ST", rating: 1518, presence: "in_game", activity: "In game · Arabia", mapName: "Arabia", unread: 2, mutualFriends: 4 },
  { id: "friend-2", name: "RelicRunner18", initials: "RR", rating: 1438, presence: "online", activity: "Looking for a match", unread: 0, mutualFriends: 7 },
  { id: "friend-3", name: "ScoutRush34", initials: "SR", rating: 1409, presence: "idle", activity: "Idle", unread: 0, mutualFriends: 2 },
  { id: "friend-4", name: "WallBuilder27", initials: "WB", rating: 1471, presence: "online", activity: "Online", unread: 0, mutualFriends: 5 },
  { id: "friend-5", name: "MonkMicro42", initials: "MM", rating: 1397, presence: "offline", activity: "Offline", lastSeen: "2 hours ago", unread: 0, mutualFriends: 3 }
];

export const previewFriendRequests: FriendRequest[] = [
  { id: "request-1", connectionId: "connection-1", name: "CastleClick", initials: "CC", rating: 1464, mutualFriends: 3 }
];

function room(id: string, name: string, mapName: string, maxPlayers: number, names: string[]): CustomLobbyRoom {
  return {
    id,
    name,
    hostId: `${id}-player-1`,
    map: { id: mapName.toLowerCase().replaceAll(" ", "-"), name: mapName, gameName: mapName, kind: "map" },
    players: names.map((displayName, index) => ({
      id: `${id}-player-${index + 1}`,
      displayName,
      slot: index + 1,
      team: 0,
      civilization: "Random",
      ready: index < 2,
      host: index === 0
    })),
    messages: [],
    maxPlayers,
    status: "open",
    createdAt: new Date(Date.now() - names.length * 120_000).toISOString(),
    demo: true
  };
}
