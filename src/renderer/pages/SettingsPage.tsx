import { useEffect, useId, useState, type ReactNode } from "react";
import { CircleHelp, Radio, RefreshCw } from "lucide-react";
import { aoe2Languages } from "../../shared/aoe2Languages";
import type { ObsIntegrationStatus, ObsOutputStatus } from "../../shared/contracts/electronApi";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { useAppStore } from "../state/appStore";

export function SettingsPage() {
  const { state, aoe2Language, updateSettings, setAoe2LanguageOverride, signOut } = useAppStore();
  const settings = state.settings;
  const [loginItem, setLoginItem] = useState({ supported: false, openAtLogin: false });
  const [loginItemLoading, setLoginItemLoading] = useState(true);
  const [obsStatus, setObsStatus] = useState<ObsIntegrationStatus | null>(null);
  const [obsPassword, setObsPassword] = useState("");
  const [obsLoading, setObsLoading] = useState(true);
  const [obsOutput, setObsOutput] = useState<ObsOutputStatus | null>(null);
  const [obsOutputLoading, setObsOutputLoading] = useState(false);
  const [pendingLanguageId, setPendingLanguageId] = useState<number | null>(null);
  const pendingLanguage = pendingLanguageId === null ? null : aoe2Languages[pendingLanguageId];

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

  function changeAoe2Language(value: string): void {
    if (value === "auto") {
      void setAoe2LanguageOverride(null);
      return;
    }
    const languageId = Number(value);
    const language = aoe2Languages[languageId];
    if (!language) return;
    setPendingLanguageId(languageId);
  }

  return (
    <>
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
        <div>
          <span className="setting-label">
            Age of Empires II language
            <HelpTooltip text="Detected automatically from AoE2. You can override it, but it must match the Game Language selected inside AoE2 for lobby automation to work." />
          </span>
          <ThemedSelect
            label=""
            value={settings.aoe2LanguageOverrideId === null ? "auto" : String(settings.aoe2LanguageOverrideId)}
            onChange={changeAoe2Language}
            options={[
              { value: "auto", label: `Automatic (${aoe2Language})` },
              ...aoe2Languages.map((language, languageId) => ({ value: String(languageId), label: language[1] }))
            ]}
          />
          <p className="settings-note">
            {settings.aoe2LanguageOverrideId === null
              ? `Currently using ${aoe2Language}. AoE2 detections update this automatically.`
              : `Manual override: ${aoe2Language}. A different language detected from AoE2 will replace it.`}
          </p>
        </div>
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
      {pendingLanguage && pendingLanguageId !== null && (
        <div className="modal-backdrop settings-language-backdrop" role="presentation" onPointerDown={() => setPendingLanguageId(null)}>
          <section className="match-modal settings-language-modal" role="alertdialog" aria-modal="true" aria-labelledby="language-confirm-title" onPointerDown={(event) => event.stopPropagation()}>
            <span className="eyebrow">Lobby automation</span>
            <h2 id="language-confirm-title">Use {pendingLanguage[1]} for AoE2?</h2>
            <p>This must match the Game Language selected inside Age of Empires II. If the languages do not match, Empire League may be unable to select maps and civilizations during lobby automation.</p>
            <div className="modal-actions">
              <button className="secondary" type="button" onClick={() => setPendingLanguageId(null)}>Cancel</button>
              <button className="primary" type="button" autoFocus onClick={() => {
                const languageId = pendingLanguageId;
                setPendingLanguageId(null);
                void setAoe2LanguageOverride(languageId);
              }}>Use {pendingLanguage[1]}</button>
            </div>
          </section>
        </div>
      )}
    </>
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
