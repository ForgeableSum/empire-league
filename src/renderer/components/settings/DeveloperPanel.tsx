import { useAppStore } from "../../state/appStore";
import type { MockServiceConfig } from "../../state/types";
import { ThemedSelect } from "../common/ThemedSelect";

export function DeveloperPanel() {
  const { state, updateMockConfig, simulateMatchEnd } = useAppStore();

  async function testMenuRecovery(): Promise<void> {
    const result = await window.electronApi?.testReturnToMenuRecovery();
    if (result && !result.started) window.alert(result.message ?? "AoE2 recovery could not start.");
  }
  const config = state.mockConfig;
  return (
    <aside className="dev-panel">
      <h2>Simulation</h2>
      <label>Queue wait<input type="number" value={config.queueWaitMs} onChange={(event) => updateMockConfig({ queueWaitMs: Number(event.target.value) })} /></label>
      <label>Opponent accept<input type="number" value={config.opponentAcceptDelayMs} onChange={(event) => updateMockConfig({ opponentAcceptDelayMs: Number(event.target.value) })} /></label>
      <label>Lobby delay<input type="number" value={config.lobbyCreationDelayMs} onChange={(event) => updateMockConfig({ lobbyCreationDelayMs: Number(event.target.value) })} /></label>
      <label>Result delay<input type="number" value={config.resultVerificationDelayMs} onChange={(event) => updateMockConfig({ resultVerificationDelayMs: Number(event.target.value) })} /></label>
      {([
        ["forceQueueFailure", "Queue failure"],
        ["forceOpponentDecline", "Opponent decline"],
        ["forceGameNotInstalled", "Game missing"],
        ["forceGameLaunchFailure", "Launch failure"],
        ["forceLobbyCreationFailure", "Lobby failure"],
        ["forceLobbyVerificationFailure", "Bad settings"],
        ["forceOpponentJoinTimeout", "Join timeout"],
        ["forceResultVerificationFailure", "Result failure"]
      ] satisfies Array<[keyof MockServiceConfig, string]>).map(([key, label]) => (
        <label className="toggle-row compact-toggle" key={key}>
          <span>{label}</span>
          <input
            type="checkbox"
            checked={Boolean(config[key as keyof typeof config])}
            onChange={(event) => updateMockConfig({ [key]: event.target.checked })}
          />
        </label>
      ))}
      <ThemedSelect
        label="Forced result"
        options={[
          { value: "", label: "Random" },
          { value: "win", label: "Player wins" },
          { value: "loss", label: "Opponent wins" },
          { value: "no_contest", label: "No contest" }
        ]}
        value={config.forcedResult ?? ""}
        onChange={(forcedResult) => updateMockConfig({
          forcedResult: forcedResult === "" ? undefined : forcedResult as "win" | "loss" | "no_contest"
        })}
      />
      <button className="secondary wide" type="button" onClick={() => void simulateMatchEnd()}>Simulate Match End</button>
      <button className="secondary wide" type="button" onClick={() => void testMenuRecovery()}>
        Test Post-Game Menu Recovery
      </button>
      <h2>Event Log</h2>
      <div className="event-log">{state.eventLog.map((entry) => <code key={entry}>{entry}</code>)}</div>
    </aside>
  );
}
