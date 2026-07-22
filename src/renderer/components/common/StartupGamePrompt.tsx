import { AlertTriangle, RotateCcw, X } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "../../state/appStore";

export function StartupGamePrompt() {
  const { startupGamePrompt, respondToStartupGamePrompt } = useAppStore();
  const forceClose = startupGamePrompt === "force-close";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (startupGamePrompt && event.key === "Escape") respondToStartupGamePrompt(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [respondToStartupGamePrompt, startupGamePrompt]);

  if (!startupGamePrompt) return null;

  return (
    <div className="modal-backdrop startup-game-prompt-backdrop" role="dialog" aria-modal="true" aria-labelledby="startup-game-prompt-title">
      <div className="match-modal startup-game-prompt">
        <div className={`startup-game-prompt__icon${forceClose ? " danger" : ""}`}>
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <span className="eyebrow">AoE2 is already running</span>
        <h2 id="startup-game-prompt-title">{forceClose ? "Force close AoE2?" : "Restart AoE2 for Empire League?"}</h2>
        <p>
          {forceClose
            ? "AoE2 did not close normally. Forcing it to close may lose unsaved progress or end an active match."
            : "Empire League requires the game process to restart."}
        </p>
        <div className="modal-actions">
          <button autoFocus className={forceClose ? "danger" : "primary"} type="button" onClick={() => respondToStartupGamePrompt(true)}>
            <RotateCcw size={18} /> {forceClose ? "Force Close & Restart" : "Restart AoE2"}
          </button>
          <button className="secondary" type="button" onClick={() => respondToStartupGamePrompt(false)}>
            <X size={18} /> Quit Empire League
          </button>
        </div>
      </div>
    </div>
  );
}
