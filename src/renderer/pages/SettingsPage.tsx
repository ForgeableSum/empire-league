import { useEffect, useId, useState, type ReactNode } from "react";
import { CircleHelp, Radio, RefreshCw } from "lucide-react";
import type { ObsIntegrationStatus, ObsOutputStatus } from "../../shared/contracts/electronApi";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { useAppStore } from "../state/appStore";

export function SettingsPage() {
  const { state, updateSettings, signOut } = useAppStore();
  const settings = state.settings;
  const [loginItem, setLoginItem] = useState({ supported: false, openAtLogin: false });
  const [loginItemLoading, setLoginItemLoading] = useState(true);
  const [obsStatus, setObsStatus] = useState<ObsIntegrationStatus | null>(null);
  const [obsPassword, setObsPassword] = useState("");
  const [obsLoading, setObsLoading] = useState(true);
  const [obsOutput, setObsOutput] = useState<ObsOutputStatus | null>(null);
  const [obsOutputLoading, setObsOutputLoading] = useState(false);

  useEffect(() => {
    const electronApi = window.electronApi;
    if (!electronApi) {
      setLoginItemLoading(false);
      return;
    }
    let active = true;
    void electronApi.getLoginItemSettings()
      .then((value) => {
        if (active) setLoginItem(value);
      })
      .finally(() => {
        if (active) setLoginItemLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    void refreshObsStatus();
  }, []);

  useEffect(() => {
    if (obsStatus?.state !== "configured") return;
    void refreshObsOutput();
    const timer = window.setInterval(() => void refreshObsOutput(), 2_000);
    return () => window.clearInterval(timer);
  }, [obsStatus?.state]);

  async function refreshObsStatus(password?: string): Promise<void> {
    if (!window.electronApi) {
      setObsStatus({ state: "unavailable", message: "OBS setup is available in the desktop app." });
      setObsLoading(false);
      return;
    }
    setObsLoading(true);
    try {
      setObsStatus(await window.electronApi.getObsStatus(password));
    } finally {
      setObsLoading(false);
    }
  }

  async function configureObs(): Promise<void> {
    if (!window.electronApi) return;
    setObsLoading(true);
    try {
      const result = await window.electronApi.setupObs(obsPassword || undefined);
      if (result.ok) {
        setObsPassword("");
        await refreshObsStatus();
      } else {
        setObsStatus({ state: "error", message: result.message });
      }
    } finally {
      setObsLoading(false);
    }
  }

  async function refreshObsOutput(): Promise<void> {
    if (!window.electronApi) return;
    setObsOutput(await window.electronApi.getObsOutputStatus());
  }

  async function changeObsOutput(kind: "stream" | "record", active: boolean): Promise<void> {
    if (!window.electronApi || obsOutputLoading) return;
    setObsOutputLoading(true);
    try {
      const result = kind === "stream"
        ? await window.electronApi.setObsStreaming(active)
        : await window.electronApi.setObsRecording(active);
      setObsOutput(result);
    } finally {
      setObsOutputLoading(false);
    }
  }

  async function updateLoginItem(openAtLogin: boolean): Promise<void> {
    if (!window.electronApi || loginItemLoading) return;
    setLoginItemLoading(true);
    try {
      setLoginItem(await window.electronApi.setLoginItemOpenAtLogin(openAtLogin));
    } finally {
      setLoginItemLoading(false);
    }
  }

  return (
    <section className="settings-grid">
      <SettingsGroup title="Game">
        <Toggle
          label="Launch Empire League when I sign in"
          helpText={loginItem.supported
            ? "You can also manage this in Windows Startup Apps settings."
            : "Available in installed Windows builds."}
          checked={loginItem.openAtLogin}
          disabled={loginItemLoading || !loginItem.supported}
          onChange={(openAtLogin) => void updateLoginItem(openAtLogin)}
        />
        <Toggle
          label="Launch AoE2 when Empire League starts"
          checked={settings.launchAoe2OnStartup}
          onChange={(launchAoe2OnStartup) => updateSettings({ launchAoe2OnStartup })}
        />
      </SettingsGroup>

      <SettingsGroup title="Matchmaking">
        <Toggle
          label="Match-found notifications"
          helpText="Shows a Windows notification and flashes the taskbar icon when a match is found. The in-app match screen appears either way."
          checked={settings.matchNotifications}
          onChange={(matchNotifications) => updateSettings({ matchNotifications })}
        />
        <Toggle
          label="Automatically reject Family Share accounts"
          helpText="Family Share accounts have a higher likelihood of being smurfs."
          checked={settings.autoRejectFamilySharing}
          onChange={(autoRejectFamilySharing) => updateSettings({ autoRejectFamilySharing })}
        />
        <div>
          <span className="setting-label">
            Maximum 1v1 opponent rating below yours
            <HelpTooltip text="This applies only to 1v1. Restricting lower-rated opponents may make matchmaking take longer." />
          </span>
          <ThemedSelect
            label=""
            value={String(settings.maximumLowerOpponentRatingGap)}
            onChange={(value) => updateSettings({ maximumLowerOpponentRatingGap: Number(value) })}
            options={[{ value: "0", label: "Off" }, ...[200, 300, 400, 500].map((rating) => ({ value: String(rating), label: `${rating} Elo` }))]}
          />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Account">
        <div className="account-summary">
          <div className="avatar large-avatar">
            {state.currentUser.avatarUrl
              ? <img src={state.currentUser.avatarUrl} alt="" />
              : state.currentUser.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <strong>{state.currentUser.displayName}</strong>
            <span>Authenticated through Steam</span>
          </div>
        </div>
        <label>Steam display name<input value={state.currentUser.displayName} readOnly /></label>
        <label>Steam ID64<input value={state.currentUser.steamId ?? "Unavailable"} readOnly /></label>
        <label>Empire League player ID<input value={state.currentUser.id} readOnly /></label>
        <button type="button" className="secondary settings-logout" onClick={() => void signOut()}>Log Out</button>
      </SettingsGroup>

      <SettingsGroup title="Streaming">
        <div className={`obs-status obs-status-${obsStatus?.state ?? "unavailable"}`}>
          <Radio size={18} aria-hidden="true" />
          <div>
            <strong>{obsLoading ? "Checking OBS…" : obsStatusLabel(obsStatus?.state)}</strong>
            <span>{obsLoading ? "Looking for OBS on this computer." : obsStatus?.message}</span>
            {obsStatus?.obsVersion && <small>OBS Studio {obsStatus.obsVersion}</small>}
          </div>
        </div>
        {(obsStatus?.state === "auth_required" || obsStatus?.state === "error") && (
          <label>
            OBS WebSocket password
            <input
              type="password"
              value={obsPassword}
              autoComplete="off"
              placeholder="Paste the password from OBS"
              onChange={(event) => setObsPassword(event.target.value)}
            />
          </label>
        )}
        <p className="settings-note">In OBS, open Tools → WebSocket Server Settings and enable the server. Empire League connects only through localhost and stores the password using Windows encryption.</p>
        <div className="obs-actions">
          <button type="button" className={obsStatus?.state === "configured" ? "secondary" : "primary"} disabled={obsLoading || obsStatus?.state === "unavailable" || (obsStatus?.state === "auth_required" && !obsPassword)} onClick={() => void configureObs()}>
            {obsStatus?.state === "configured" ? "Repair OBS Scene" : "Set Up OBS Scene"}
          </button>
          <button type="button" className="secondary" disabled={obsLoading} onClick={() => void refreshObsStatus(obsPassword || undefined)}>
            <RefreshCw size={16} aria-hidden="true" /> Check Again
          </button>
        </div>
        {obsStatus?.state === "configured" && (
          <div className="obs-output-controls">
            {obsOutput?.outputWidth && obsOutput.outputHeight && <p className="obs-video-quality">OBS output: {obsOutput.outputWidth}×{obsOutput.outputHeight}{obsOutput.fps ? ` at ${obsOutput.fps} FPS` : ""}</p>}
            <div className="obs-output-row">
              <div><strong>Stream</strong><span>{obsOutput?.streaming ? `Live ${obsOutput.streamTimecode ?? ""}` : "Not live"}</span></div>
              <button
                type="button"
                className={`secondary ${obsOutput?.streaming ? "obs-action-stop" : "obs-action-go"}`}
                disabled={obsOutputLoading || !obsOutput?.connected}
                onClick={() => void changeObsOutput("stream", !obsOutput?.streaming)}
              >{obsOutput?.streaming ? "End Stream" : "Start Streaming"}</button>
            </div>
            <div className="obs-output-row">
              <div><strong>Recording</strong><span>{obsOutput?.recording ? `Recording ${obsOutput.recordTimecode ?? ""}` : "Not recording"}</span></div>
              <button
                type="button"
                className={`secondary ${obsOutput?.recording ? "obs-action-stop" : "obs-action-go"}`}
                disabled={obsOutputLoading || !obsOutput?.connected}
                onClick={() => void changeObsOutput("record", !obsOutput?.recording)}
              >{obsOutput?.recording ? "Stop Recording" : "Start Recording"}</button>
            </div>
            {obsOutput?.message && <p className="obs-output-error">{obsOutput.message}</p>}
            {obsOutput?.connected && !obsOutput.captureReady && <p className="obs-capture-waiting">OBS is waiting for the active Empire League capture window. Try Repair OBS Scene.</p>}
            <p className="settings-note">The stream shows Empire League during matchmaking and switches to AoE2 only after the game-start countdown. Start Recording is a safe local test.</p>
          </div>
        )}
      </SettingsGroup>
    </section>
  );
}

function obsStatusLabel(state?: ObsIntegrationStatus["state"]): string {
  if (state === "configured") return "OBS ready";
  if (state === "connected") return "OBS connected";
  if (state === "auth_required") return "Password required";
  if (state === "error") return "OBS connection problem";
  return "OBS not connected";
}

function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return <div className="panel settings-group"><h2>{title}</h2>{children}</div>;
}

function Toggle({
  label,
  helpText,
  checked,
  disabled = false,
  onChange
}: {
  label: string;
  helpText?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  const inputId = useId();
  return (
    <div className="toggle-row">
      <span className="setting-label">
        <label htmlFor={inputId}>{label}</label>
        {helpText && <HelpTooltip text={helpText} />}
      </span>
      <input id={inputId} type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
    </div>
  );
}

function HelpTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  return (
    <span className="help-tooltip" data-open={open || undefined}>
      <button
        type="button"
        className="help-tooltip-trigger"
        aria-label="More information"
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <CircleHelp size={16} aria-hidden="true" />
      </button>
      <span id={tooltipId} className="help-tooltip-content" role="tooltip">{text}</span>
    </span>
  );
}
