import { AlertTriangle, Power, RotateCcw } from "lucide-react";
import { useAppStore } from "../../state/appStore";

export function RoomSetupRecoveryPrompt() {
  const { roomSetupFailed, roomSetupFailureReason, exitAfterRoomSetupFailure } = useAppStore();
  if (!roomSetupFailed) return null;

  const gameNotRunning = roomSetupFailureReason === "game_not_running";
  const gameNotOwned = roomSetupFailureReason === "game_not_owned";

  return (
    <div className="modal-backdrop startup-game-prompt-backdrop" role="alertdialog" aria-modal="true" aria-labelledby="room-setup-failed-title">
      <div className="match-modal startup-game-prompt">
        <div className="startup-game-prompt__icon danger">
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <span className="eyebrow">{gameNotRunning || gameNotOwned ? "Game restart required" : "Room setup failed"}</span>
        <h2 id="room-setup-failed-title">
          {gameNotRunning || gameNotOwned ? "Restart Empire League manually" : "Something went wrong."}
        </h2>
        <p>
          {gameNotRunning || gameNotOwned
            ? "Quit Empire League, make sure AoE2 is fully closed, then start Empire League again."
            : "Empire League stopped making progress while setting up the game room for 65 seconds."}
        </p>
        <div className="modal-actions">
          {!gameNotRunning && !gameNotOwned && (
            <button autoFocus className="primary" type="button" onClick={() => void exitAfterRoomSetupFailure(true)}>
              <RotateCcw size={18} /> Restart
            </button>
          )}
          <button
            autoFocus={gameNotRunning || gameNotOwned}
            className={gameNotRunning || gameNotOwned ? "primary" : "secondary"}
            type="button"
            onClick={() => void exitAfterRoomSetupFailure(false)}
          >
            <Power size={18} /> Quit
          </button>
        </div>
      </div>
    </div>
  );
}
