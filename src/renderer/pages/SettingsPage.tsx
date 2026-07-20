import type { ReactNode } from "react";
import { useAppStore } from "../state/appStore";

export function SettingsPage() {
  const { state, updateSettings } = useAppStore();
  const settings = state.settings;
  return (
    <section className="settings-grid">
      <SettingsGroup title="Game">
        <label>AoE2 installation path<input value={settings.aoePath} onChange={(event) => updateSettings({ aoePath: event.target.value })} /></label>
        <Toggle label="Auto-detect installation" checked={settings.autoDetect} onChange={(autoDetect) => updateSettings({ autoDetect })} />
        <Toggle label="Launch game automatically" checked={settings.autoLaunch} onChange={(autoLaunch) => updateSettings({ autoLaunch })} />
        <Toggle label="Focus game when lobby is ready" checked={settings.focusWhenReady} onChange={(focusWhenReady) => updateSettings({ focusWhenReady })} />
        <label>Preferred display mode<select value={settings.displayMode} onChange={(event) => updateSettings({ displayMode: event.target.value as typeof settings.displayMode })}><option>Borderless</option><option>Fullscreen</option><option>Windowed</option></select></label>
        <Toggle label="Enable replay detection" checked={settings.replayDetection} onChange={(replayDetection) => updateSettings({ replayDetection })} />
        <label>Recorded-game folder<input value={settings.replayFolder} onChange={(event) => updateSettings({ replayFolder: event.target.value })} placeholder="Not configured" /></label>
        <button type="button" className="secondary">Test Game Detection</button>
      </SettingsGroup>
      <SettingsGroup title="Matchmaking">
        <label>Preferred server region<input value={settings.serverRegion} onChange={(event) => updateSettings({ serverRegion: event.target.value })} /></label>
        <Toggle label="Accept sound" checked={settings.acceptSound} onChange={(acceptSound) => updateSettings({ acceptSound })} />
        <Toggle label="Match-found notifications" checked={settings.matchNotifications} onChange={(matchNotifications) => updateSettings({ matchNotifications })} />
        <label>Maximum initial rating range<input type="number" value={settings.maxInitialRange} onChange={(event) => updateSettings({ maxInitialRange: Number(event.target.value) })} /></label>
        <Toggle label="Automatically expand search range" checked={settings.autoExpandRange} onChange={(autoExpandRange) => updateSettings({ autoExpandRange })} />
        <Toggle label="Allow rematch offers" checked={settings.rematchOffers} onChange={(rematchOffers) => updateSettings({ rematchOffers })} />
      </SettingsGroup>
      <SettingsGroup title="Interface">
        <label>Sound volume<input type="range" min="0" max="100" value={settings.soundVolume} onChange={(event) => updateSettings({ soundVolume: Number(event.target.value) })} /></label>
        <Toggle label="Reduced motion" checked={settings.reducedMotion} onChange={(reducedMotion) => updateSettings({ reducedMotion })} />
        <Toggle label="Compact layout" checked={settings.compactLayout} onChange={(compactLayout) => updateSettings({ compactLayout })} />
        <Toggle label="Minimize client when match starts" checked={settings.minimizeOnStart} onChange={(minimizeOnStart) => updateSettings({ minimizeOnStart })} />
        <Toggle label="Start client with Windows" checked={settings.startWithWindows} onChange={(startWithWindows) => updateSettings({ startWithWindows })} />
      </SettingsGroup>
      <SettingsGroup title="Account">
        <label>Linked AoE profile ID<input value={state.currentUser.aoeProfileId} readOnly /></label>
        <label>Linked identity<input value={settings.linkedIdentity} onChange={(event) => updateSettings({ linkedIdentity: event.target.value })} /></label>
        <label>Display name<input value={settings.displayName} onChange={(event) => updateSettings({ displayName: event.target.value })} /></label>
        <button type="button" className="secondary">Log Out</button>
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
