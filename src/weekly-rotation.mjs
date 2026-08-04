export const weekMs = 7 * 24 * 60 * 60 * 1000;

// A global queue needs one unambiguous boundary. Rotations change at 00:00 UTC
// every Monday; this anchor is a Monday and keeps the sequence deterministic.
export const weeklyRotationAnchor = Date.parse("2026-08-03T00:00:00Z");

export const weeklyModes = [
  {
    id: "ffa-nomad", name: "FFA Nomad", description: "No town center. No teammates. Find your footing and outlast every rival.",
    details: ["8 players", "Free for all", "Nomad start"],
    map: { id: "land-nomad", name: "Land Nomad EL", gameName: "Land Nomad EL", kind: "map" }
  },
  {
    id: "ffa-arena", name: "FFA Arena", description: "Eight kingdoms begin behind stone walls. Boom, then choose when to strike.",
    details: ["8 players", "Free for all", "Arena"],
    map: { id: "arena", name: "Arena", gameName: "Arena", kind: "map" }
  },
  {
    id: "ffa-black-forest", name: "FFA Black Forest", description: "Eight rivals fight through narrow forest paths for control of the map.",
    details: ["8 players", "Free for all", "Black Forest"],
    map: { id: "black-forest", name: "Black Forest", gameName: "Black Forest", kind: "map" }
  }
];

export function currentWeeklyMode(now = Date.now(), playerCount = 8) {
  const week = Math.floor((now - weeklyRotationAnchor) / weekMs);
  const index = ((week % weeklyModes.length) + weeklyModes.length) % weeklyModes.length;
  const startsAt = weeklyRotationAnchor + week * weekMs;
  return {
    ...weeklyModes[index],
    rotationId: `${weeklyModes[index].id}:${new Date(startsAt).toISOString().slice(0, 10)}`,
    startsAt: new Date(startsAt).toISOString(),
    endsAt: new Date(startsAt + weekMs).toISOString(),
    playerCount
  };
}

export function weeklyRotation(now = Date.now(), playerCount = 8) {
  return [0, 1, 2].map((offset) => currentWeeklyMode(now + offset * weekMs, playerCount));
}
