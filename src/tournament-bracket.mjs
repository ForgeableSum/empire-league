export function chooseRandomBracketSlot(capacity, occupiedSlots, random = Math.random) {
  if (!Number.isInteger(capacity) || capacity < 2) throw new Error("Tournament capacity must be at least 2.");
  const occupied = new Set(occupiedSlots);
  const available = Array.from({ length: capacity }, (_, index) => index + 1)
    .filter((slot) => !occupied.has(slot));
  if (!available.length) return null;
  const opponentSlots = [...occupied]
    .map((slot) => slot % 2 === 0 ? slot - 1 : slot + 1)
    .filter((slot) => available.includes(slot));
  const candidates = opponentSlots.length ? opponentSlots : available;
  const randomIndex = Math.min(candidates.length - 1, Math.floor(Math.max(0, random()) * candidates.length));
  return candidates[randomIndex];
}
