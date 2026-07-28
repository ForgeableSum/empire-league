import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "../../state/appStore";

export function StartupGamePrompt() {
  const { startupGamePrompt, respondToStartupGamePrompt } = useAppStore();

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
        <div className="startup-game-prompt__icon danger">
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <span className="eyebrow">AoE2 is already running</span>
        <h2 id="startup-game-prompt-title">Close AoE2 before continuing</h2>
        <p>Quit Empire League, close AoE2 manually, then start Empire League again.</p>
        <div className="modal-actions">
          <button autoFocus className="primary" type="button" onClick={() => respondToStartupGamePrompt(false)}>
            <X size={18} /> Quit Empire League
          </button>
        </div>
      </div>
    </div>
  );
}
