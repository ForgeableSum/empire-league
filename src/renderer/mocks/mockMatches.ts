import type { MatchSummary } from "../../shared/contracts/matches";
import { civilizations, maps } from "./mockPlayers";

const opponents = [
  "MangoLine24",
  "RelicRunner18",
  "TownBell31",
  "CastleClick44",
  "ScoutRush29",
  "WallBuilder66",
  "FastImp21",
  "MonkMicro73",
  "FarmReset50",
  "GoldMiner41",
  "HillFort15",
  "DockDrop37",
  "StableSwitch59",
  "ArcherSplit28",
  "BerryGuard63"
];

export const mockMatches: MatchSummary[] = opponents.map((opponent, index) => {
  const won = index % 3 !== 1;
  return {
    id: `match-${index + 1}`,
    opponent,
    opponentRating: 1360 + index * 13,
    outcome: won ? "win" : "loss",
    map: maps[index % maps.length].name,
    civilization: civilizations[index % civilizations.length],
    opponentCivilization: civilizations[(index + 5) % civilizations.length],
    ratingChange: won ? 14 + (index % 4) : -13 - (index % 5),
    durationMinutes: 18 + (index % 12),
    timestamp: new Date(Date.now() - index * 86400000).toISOString(),
    verified: index !== 6,
    queueType: "Ranked 1v1 Random Map"
  };
});
