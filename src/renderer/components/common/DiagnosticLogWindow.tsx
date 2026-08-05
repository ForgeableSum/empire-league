import { Download, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "../../state/appStore";

function formatConsoleValue(value: unknown): string {
  if (value instanceof Error) return value.stack ?? value.message;
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function DiagnosticLogWindow() {
  const { state, appendDiagnosticLog } = useAppStore();
  const [open, setOpen] = useState(false);
  const [appVersion, setAppVersion] = useState("unknown");
  const logRef = useRef<HTMLPreElement>(null);
  const sessionStartedAt = useRef(new Date().toISOString());

  useEffect(() => {
    void window.electronApi?.getAppVersion().then(setAppVersion).catch(() => undefined);
  }, []);

  useEffect(() => {
    const originalConsoleError = console.error;
    const toggle = (event: KeyboardEvent) => {
      if (event.key !== "F10") return;
      event.preventDefault();
      setOpen((current) => !current);
    };
    const recordError = (event: ErrorEvent) => {
      appendDiagnosticLog(`[Client error] ${event.message}${event.filename ? ` (${event.filename}:${event.lineno})` : ""}`);
    };
    const recordRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason instanceof Error ? event.reason.stack ?? event.reason.message : String(event.reason);
      appendDiagnosticLog(`[Unhandled promise] ${reason}`);
    };
    console.error = (...values: unknown[]) => {
      originalConsoleError(...values);
      appendDiagnosticLog(`[Console error] ${values.map(formatConsoleValue).join(" ")}`);
    };
    window.addEventListener("keydown", toggle);
    window.addEventListener("error", recordError);
    window.addEventListener("unhandledrejection", recordRejection);
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener("keydown", toggle);
      window.removeEventListener("error", recordError);
      window.removeEventListener("unhandledrejection", recordRejection);
    };
  }, []);

  useEffect(() => {
    if (open) logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [open, state.eventLog.length]);

  const environment = useMemo(() => [
    "Empire League diagnostic log",
    `App version: ${appVersion}`,
    `Session started: ${sessionStartedAt.current}`,
    `OS/platform: ${navigator.platform || "unknown"}`,
    `Runtime: ${navigator.userAgent}`,
    `Locale/time zone: ${navigator.language} / ${Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown"}`,
    `Display: ${screen.width}x${screen.height} @ ${window.devicePixelRatio}x (${screen.colorDepth}-bit color)`,
    `CPU concurrency: ${navigator.hardwareConcurrency || "unknown"}`,
    `Online: ${navigator.onLine ? "yes" : "no"}`
  ], [appVersion]);

  const contents = useMemo(() => [
    ...environment,
    `Downloaded: ${new Date().toISOString()}`,
    "",
    ...state.eventLog.slice().reverse()
  ].join("\n"), [environment, state.eventLog]);

  const downloadUrl = useMemo(() => URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" })), [contents]);
  useEffect(() => () => URL.revokeObjectURL(downloadUrl), [downloadUrl]);

  if (!open) return null;
  const fileDate = new Date().toISOString().replace(/[:.]/g, "-");
  return (
    <div className="diagnostic-log-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <section className="diagnostic-log-window" role="dialog" aria-modal="true" aria-labelledby="diagnostic-log-title">
        <header>
          <div>
            <h2 id="diagnostic-log-title">Diagnostic Log</h2>
          </div>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close diagnostic log"><X size={20} /></button>
        </header>
        <p className="diagnostic-log-help">If you’re having an issue, download this log and share the file on Discord with <strong>Forgeable</strong> to help diagnose it.</p>
        <pre ref={logRef}>{[
          ...environment,
          "",
          ...(state.eventLog.length ? state.eventLog.slice().reverse() : ["No diagnostic events have been recorded yet."])
        ].join("\n")}</pre>
        <footer>
          <span>Press <kbd>F10</kbd> to close or reopen this window.</span>
          <a className="primary diagnostic-log-download" href={downloadUrl} download={`empire-league-log-${fileDate}.txt`}><Download size={17} /> Download log</a>
        </footer>
      </section>
    </div>
  );
}
