import { AlertTriangle, Power, RotateCcw } from "lucide-react";
import { useAppStore } from "../../state/appStore";

export function RoomSetupRecoveryPrompt() {
  const { roomSetupFailed, exitAfterRoomSetupFailure } = useAppStore();
  if (!roomSetupFailed) return null;

  return (
    <div className="modal-backdrop startup-game-prompt-backdrop" role="alertdialog" aria-modal="true" aria-labelledby="room-setup-failed-title">
      <div className="match-modal startup-game-prompt">
        <div className="startup-game-prompt__icon danger">
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <span className="eyebrow">Room setup failed</span>
        <h2 id="room-setup-failed-title">Something went wrong.</h2>
        <p>Empire League couldn’t finish setting up the game room within 45 seconds.</p>
        <div className="modal-actions">
          <button autoFocus className="primary" type="button" onClick={() => void exitAfterRoomSetupFailure(true)}>
            <RotateCcw size={18} /> Restart Empire League
          </button>
          <button className="secondary" type="button" onClick={() => void exitAfterRoomSetupFailure(false)}>
            <Power size={18} /> Quit
          </button>
        </div>
      </div>
    </div>
  );
}
