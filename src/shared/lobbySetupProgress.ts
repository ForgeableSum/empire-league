// Completed inputs count as progress; health and verification polling do not.
export function lobbySetupProgressKey(message: string): string | null {
  if (!message.includes("|SENT|")) return null;
  const step = message.match(/\|STEP\|([^|]+)/);
  if (step) return "step:" + step[1];
  const picker = message.match(/(MAP_SELECT|CIV_SELECT|TEAM_SELECT)\|Step=([^|]+)/);
  return picker ? picker[1] + ":" + picker[2] : null;
}
export class LobbySetupProgressGate {
  private seen = new Set<string>();
  private lastSentAt = -Infinity;
  accept(message: string, now: number): boolean {
    const key = lobbySetupProgressKey(message);
    if (!key || this.seen.has(key)) return false;
    this.seen.add(key);
    if (now - this.lastSentAt < 5000) return false;
    this.lastSentAt = now;
    return true;
  }
}
