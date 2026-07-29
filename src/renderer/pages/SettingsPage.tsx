import { useId, useState, type ReactNode } from "react";
import { CircleHelp } from "lucide-react";
import { useAppStore } from "../state/appStore";

export function SettingsPage() {
  const { state, updateSettings, signOut } = useAppStore();
  const settings = state.settings;

  return (
    <section className="settings-grid">
      <SettingsGroup title="Game">
        <Toggle
          label="Launch AoE2 when Empire League starts"
          checked={settings.launchAoe2OnStartup}
          onChange={(launchAoe2OnStartup) => updateSettings({ launchAoe2OnStartup })}
        />
      </SettingsGroup>

      <SettingsGroup title="Matchmaking">
        <label>
          Preferred server region
          <input
            value={settings.serverRegion}
            onChange={(event) => updateSettings({ serverRegion: event.target.value })}
          />
        </label>
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
        <label>
          <span className="setting-label">
            Maximum 1v1 opponent rating below yours
            <HelpTooltip text="This applies only to 1v1. Restricting lower-rated opponents may make matchmaking take longer." />
          </span>
          <select
            value={settings.maximumLowerOpponentRatingGap}
            onChange={(event) => updateSettings({ maximumLowerOpponentRatingGap: Number(event.target.value) })}
          >
            <option value={0}>Off</option>
            {[200, 300, 400, 500].map((rating) => (
              <option key={rating} value={rating}>{rating} Elo</option>
            ))}
          </select>
        </label>
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
        <button type="button" className="secondary" onClick={() => void signOut()}>Log Out</button>
      </SettingsGroup>
    </section>
  );
}

function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return <div className="panel settings-group"><h2>{title}</h2>{children}</div>;
}

function Toggle({
  label,
  helpText,
  checked,
  onChange
}: {
  label: string;
  helpText?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const inputId = useId();
  return (
    <div className="toggle-row">
      <span className="setting-label">
        <label htmlFor={inputId}>{label}</label>
        {helpText && <HelpTooltip text={helpText} />}
      </span>
      <input id={inputId} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
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
