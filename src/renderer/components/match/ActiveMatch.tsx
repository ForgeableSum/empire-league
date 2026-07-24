import { Wrench } from "lucide-react";
import { useAppStore } from "../../state/appStore";

export function ActiveMatch() {
  const { state, simulateMatchEnd } = useAppStore();
  const match = state.activeMatch;
  if (!match) return null;
  return (
    <section className="match-focus">
      <span className="eyebrow">{state.queueStatus === "verifying_result" ? "Result verification" : "Match in progress"}</span>
      <h2>{match.player.displayName} vs {match.opponent.displayName}</h2>
      <div className="metrics-grid compact">
        <div><span>Map</span><strong>{match.selectedMap?.name}</strong></div>
        <div><span>Server</span><strong>{match.lobby?.serverRegion}</strong></div>
        <div><span>Lobby</span><strong>{match.lobby?.platformLobbyId}</strong></div>
        <div><span>Status</span><strong>{state.queueStatus.replaceAll("_", " ")}</strong></div>
      </div>
      <div className="button-row">
        <button className="secondary" type="button"><Wrench size={18} /> Report Technical Issue</button>
        {import.meta.env.DEV && <button className="secondary" type="button" onClick={() => void simulateMatchEnd()}>Simulate Match End</button>}
      </div>
    </section>
  );
}
