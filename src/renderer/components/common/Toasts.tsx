import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, X, XCircle } from "lucide-react";
import { useAppStore } from "../../state/appStore";
import type { NotificationItem } from "../../state/types";

const toneIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  loading: Loader2
};

export function Toasts() {
  const { state, dismissNotification } = useAppStore();
  return (
    <div className="toasts" aria-live="polite">
      {state.notifications.map((item) => (
        <Toast key={`${item.id}-${item.tone}`} item={item} dismiss={() => dismissNotification(item.id)} />
      ))}
    </div>
  );
}

function Toast({ item, dismiss }: { item: NotificationItem; dismiss: () => void }) {
  const [remainingMs, setRemainingMs] = useState(item.durationMs ?? 0);
  const [paused, setPaused] = useState(false);
  const startedAtRef = useRef(Date.now());
  const Icon = toneIcons[item.tone];

  useEffect(() => {
    if (paused || item.durationMs === null) return;
    startedAtRef.current = Date.now();
    const timer = window.setTimeout(dismiss, remainingMs);
    return () => window.clearTimeout(timer);
  }, [dismiss, item.durationMs, paused, remainingMs]);

  function pauseTimer(): void {
    setRemainingMs((current) => Math.max(0, current - (Date.now() - startedAtRef.current)));
    setPaused(true);
  }

  const progressStyle = {
    "--toast-duration": `${remainingMs}ms`,
    "--toast-progress": item.durationMs ? remainingMs / item.durationMs : 1
  } as CSSProperties;

  return (
    <div className={`toast ${item.tone}`} onMouseEnter={pauseTimer} onMouseLeave={() => setPaused(false)}>
      <Icon className={`toast-icon${item.tone === "loading" ? " spin" : ""}`} size={20} aria-hidden="true" />
      <div className="toast-copy">
        <strong>{item.message}</strong>
        {item.detail && <span>{item.detail}</span>}
      </div>
      {item.tone !== "loading" && item.dismissible !== false && (
        <button type="button" onClick={dismiss} aria-label="Dismiss notification">
          <X size={16} />
        </button>
      )}
      {!paused && item.durationMs !== null && <i className="toast-progress" key={remainingMs} style={progressStyle} aria-hidden="true" />}
    </div>
  );
}
