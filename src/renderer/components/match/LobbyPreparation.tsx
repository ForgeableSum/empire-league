import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useAppStore } from "../../state/appStore";

const steps = [
  ["accepting", "Match accepted"],
  ["creating_lobby", "AoE2 installation detected"],
  ["creating_lobby", "AoE2 process found"],
  ["creating_lobby", "Opening multiplayer menu"],
  ["creating_lobby", "Creating private lobby"],
  ["waiting_for_opponent", "Lobby ID discovered"],
  ["waiting_for_opponent", "Opponent invited"],
  ["verifying_lobby", "Opponent joined"],
  ["verifying_lobby", "Lobby settings verified"],
  ["ready", "Waiting for both players"]
] as const;

const order = ["accepting", "creating_lobby", "waiting_for_opponent", "verifying_lobby", "ready"];

export function LobbyPreparation() {
  const { state, openAoe2, prepareLobby } = useAppStore();
  const index = order.indexOf(state.queueStatus);
  return (
    <section className="lobby-layout">
      <div className="panel">
        <span className="eyebrow">Lobby preparation</span>
        <h2>{state.queueStatus === "ready" ? "Lobby Ready" : "Creating AoE2 Lobby"}</h2>
        <div className="progress-list">
          {steps.map(([status, label], stepIndex) => {
            const complete = order.indexOf(status) < index || state.queueStatus === "ready";
            const active = order.indexOf(status) === index && !complete;
            return (
              <div className={active ? "progress-row active" : "progress-row"} key={`${status}-${label}`}>
                {complete ? <CheckCircle2 size={18} /> : active ? <Loader2 size={18} className="spin" /> : <Circle size={18} />}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        {state.error && (
          <div className="error-panel">
            <strong>{state.error.message}</strong>
            <span>{state.error.technicalDetails}</span>
            <button type="button" onClick={() => void prepareLobby()}>Try Again</button>
          </div>
        )}
      </div>
      <div className="panel">
        <h2>Lobby Configuration</h2>
        <div className="status-list">
          <div><span>Map</span><strong>{state.activeMatch?.selectedMap?.name ?? "Pending"}</strong></div>
          <div><span>Server</span><strong>{state.activeMatch?.lobby?.serverRegion ?? state.settings.serverRegion}</strong></div>
          <div><span>Population</span><strong>200</strong></div>
          <div><span>Victory</span><strong>Conquest</strong></div>
          <div><span>Recording</span><strong>Enabled</strong></div>
        </div>
        {state.queueStatus === "ready" && (
          <button className="primary wide" type="button" onClick={() => void openAoe2()}>Open AoE2</button>
        )}
      </div>
    </section>
  );
}
