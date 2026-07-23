import { Minus, X } from "lucide-react";
import { useState } from "react";
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

const fontChoices = [
  { label: "System UI — Current", value: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif" },
  { label: "Inter — Clean", value: "\"Inter\", sans-serif" },
  { label: "Roboto Slab — Strong", value: "\"Roboto Slab\", serif" },
  { label: "Bitter — Sturdy", value: "\"Bitter\", serif" },
  { label: "Arvo — Blocky", value: "\"Arvo\", serif" },
  { label: "Domine — Authoritative", value: "\"Domine\", serif" },
  { label: "Merriweather — Substantial", value: "\"Merriweather\", serif" },
  { label: "Zilla Slab — Characterful", value: "\"Zilla Slab\", serif" },
  { label: "Bree Serif — Bold", value: "\"Bree Serif\", serif" },
  { label: "Vollkorn — Weighty", value: "\"Vollkorn\", serif" },
  { label: "Libre Baskerville — Editorial", value: "\"Libre Baskerville\", serif" },
  { label: "Lora — Modern Serif", value: "\"Lora\", serif" },
  { label: "Cinzel — Imperial", value: "\"Cinzel\", serif" },
  { label: "Marcellus — Roman", value: "\"Marcellus\", serif" },
  { label: "EB Garamond — Classic", value: "\"EB Garamond\", serif" },
  { label: "Cormorant — Elegant", value: "\"Cormorant Garamond\", serif" },
  { label: "Crimson Pro — Bookish", value: "\"Crimson Pro\", serif" },
  { label: "Spectral — Refined", value: "\"Spectral\", serif" },
  { label: "IM Fell — Historic", value: "\"IM Fell English\", serif" },
  { label: "Alegreya SC — Heraldic", value: "\"Alegreya Sans SC\", sans-serif" },
  { label: "Grenze Gotisch — Gothic", value: "\"Grenze Gotisch\", serif" },
  { label: "MedievalSharp — Medieval", value: "\"MedievalSharp\", fantasy" },
  { label: "Uncial Antiqua — Uncial", value: "\"Uncial Antiqua\", serif" }
] as const;

export function WindowControls() {
  const { state, notify } = useAppStore();
  const [previewFont, setPreviewFont] = useState<string>("\"Domine\", serif");

  function changePreviewFont(value: string): void {
    setPreviewFont(value);
    document.documentElement.style.setProperty("--preview-font", value);
  }

  async function minimizeToTaskbar(): Promise<void> {
    if (minimizeLockedStatuses.has(state.queueStatus)) {
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
      <select
        className="font-preview-select"
        value={previewFont}
        onChange={(event) => changePreviewFont(event.target.value)}
        aria-label="Preview UI font"
        title="Temporary UI font preview"
      >
        {fontChoices.map((font) => <option value={font.value} key={font.label}>{font.label}</option>)}
      </select>
      <button type="button" onClick={() => void minimizeToTaskbar()} aria-label="Minimize to taskbar" title="Minimize">
        <Minus size={17} aria-hidden="true" />
      </button>
      <button className="window-close" type="button" onClick={() => void window.electronApi?.quitApp()} aria-label="Close Empire League" title="Close">
        <X size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
