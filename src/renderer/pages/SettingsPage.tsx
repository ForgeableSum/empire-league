import type { ReactNode } from "react";
import { useAppStore } from "../state/appStore";

export function SettingsPage() {
  const { state, updateSettings, signOut } = useAppStore();
  const settings = state.settings;

  return (
    <section className="settings-grid">
      <SettingsGroup title="Game">
        <Toggle
          label="Launch game automatically"
          checked={settings.autoLaunch}
          onChange={(autoLaunch) => updateSettings({ autoLaunch })}
        />
        <Toggle
          label="Enable replay detection"
          checked={settings.replayDetection}
          onChange={(replayDetection) => updateSettings({ replayDetection })}
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
          checked={settings.matchNotifications}
          onChange={(matchNotifications) => updateSettings({ matchNotifications })}
        />
        <div className="setting-with-note">
          <Toggle
            label="Automatically reject Family Share accounts"
            checked={settings.autoRejectFamilySharing}
            onChange={(autoRejectFamilySharing) => updateSettings({ autoRejectFamilySharing })}
          />
          <small>Family Share accounts have a higher likelihood of being smurfs.</small>
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
        <button type="button" className="secondary" onClick={() => void signOut()}>Log Out</button>
      </SettingsGroup>
    </section>
  );
}

function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return <div className="panel settings-group"><h2>{title}</h2>{children}</div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
