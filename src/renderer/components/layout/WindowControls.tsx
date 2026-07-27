import { Minus, X } from "lucide-react";
import type { QueueStatus } from "../../../shared/contracts/matchmaking";
import { useAppStore } from "../../state/appStore";

const minimizeLockedStatuses = new Set<QueueStatus>([
  "searching",
  "match_found",
  "accepting",
  "creating_lobby",
  "waiting_for_opponent",
  "verifying_lobby",
  "ready",
  "in_game",
  "verifying_result"
]);
const independentWindowMinimize = import.meta.env.VITE_INDEPENDENT_WINDOW_MINIMIZE === "true";

export function WindowControls() {
  const { state, notify } = useAppStore();

  async function minimizeToTaskbar(): Promise<void> {
    if (!independentWindowMinimize && minimizeLockedStatuses.has(state.queueStatus)) {
      notify(
        "Empire League cannot be minimized during an active match.",
        "danger",
        { detail: "Cancel matchmaking or finish the current match before minimizing." }
      );
      return;
    }
    await window.electronApi?.minimizeToTaskbar();
  }

  return (
    <div className="window-controls" aria-label="Window controls">
      <button type="button" onClick={() => void minimizeToTaskbar()} aria-label="Minimize to taskbar" title="Minimize">
        <Minus size={17} aria-hidden="true" />
      </button>
      <button className="window-close" type="button" onClick={() => void window.electronApi?.quitApp()} aria-label="Close Empire League" title="Close">
        <X size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
