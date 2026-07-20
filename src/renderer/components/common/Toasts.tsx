import { X } from "lucide-react";
import { useAppStore } from "../../state/appStore";

export function Toasts() {
  const { state, dismissNotification } = useAppStore();
  return (
    <div className="toasts" aria-live="polite">
      {state.notifications.map((item) => (
        <div className={`toast ${item.tone}`} key={item.id}>
          <span>{item.message}</span>
          <button type="button" onClick={() => dismissNotification(item.id)} aria-label="Dismiss notification">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
