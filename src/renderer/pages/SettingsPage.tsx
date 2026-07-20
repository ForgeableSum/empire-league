import { useEffect, useState, type ReactNode } from "react";
import type { GameInputKey } from "../../shared/contracts/gameIntegration";
import { useAppStore } from "../state/appStore";

type DetectionFeedback = { tone: "success" | "error"; message: string };

export function SettingsPage() {
  const { state, updateSettings } = useAppStore();
  const settings = state.settings;
  const [detecting, setDetecting] = useState(false);
  const [detectionFeedback, setDetectionFeedback] = useState<DetectionFeedback | null>(null);
  const [tabTestRunning, setTabTestRunning] = useState(false);
  const [lobbySequenceRunning, setLobbySequenceRunning] = useState(false);
  const [mouseCalibrationRunning, setMouseCalibrationRunning] = useState(false);

  useEffect(() => {
    return window.electronApi?.onAoe2AutomationLog((message) => {
      console.info("[AoE2 automation]", message);
    });
  }, []);

  async function testGameDetection(): Promise<void> {
    setDetecting(true);
    setDetectionFeedback(null);

    try {
      if (!window.electronApi) {
        throw new Error("Game detection is only available in the Electron app.");
      }

      const result = await window.electronApi.detectAoe2Installation();
      if (!result.installed || !result.path) {
        setDetectionFeedback({
          tone: "error",
          message: result.message ?? "AoE2: Definitive Edition could not be detected."
        });
        return;
      }

      updateSettings({ aoePath: result.path });
      setDetectionFeedback({
        tone: "success",
        message: result.message ?? "AoE2: Definitive Edition detected."
      });
    } catch (error) {
      setDetectionFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "Game detection failed unexpectedly."
      });
    } finally {
      setDetecting(false);
    }
  }

  async function toggleTabTest(): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Game input testing is only available in the Electron app." });
      return;
    }

    if (tabTestRunning) {
      await window.electronApi.stopAoe2TabTest();
      setTabTestRunning(false);
      setDetectionFeedback({ tone: "success", message: "Tab test stopped." });
      return;
    }

    const result = await window.electronApi.startAoe2TabTest();
    setDetectionFeedback({ tone: result.started ? "success" : "error", message: result.message });
    if (result.started) {
      setTabTestRunning(true);
      window.setTimeout(() => setTabTestRunning(false), 15_000);
    }
  }

  async function sendGameKey(key: GameInputKey): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Game input is only available in the Electron app." });
      return;
    }
    const result = await window.electronApi.sendAoe2Key(key);
    setDetectionFeedback({ tone: result.sent ? "success" : "error", message: result.message });
  }

  async function runCreateLobbySequence(): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Lobby automation is only available in the Electron app." });
      return;
    }
    setLobbySequenceRunning(true);
    setDetectionFeedback({ tone: "success", message: "Running ranked-lobby test…" });
    try {
      const result = await window.electronApi.runAoe2CreateLobbySequence();
      setDetectionFeedback({ tone: result.sent ? "success" : "error", message: result.message });
    } finally {
      setLobbySequenceRunning(false);
    }
  }

  async function testHostGameMouseClick(): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Mouse testing is only available in the Electron app." });
      return;
    }
    const result = await window.electronApi.testAoe2HostGameMouseClick();
    setDetectionFeedback({ tone: result.sent ? "success" : "error", message: result.message });
  }

  async function calibrateHostGameMouseClick(): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Mouse calibration is only available in the Electron app." });
      return;
    }
    setMouseCalibrationRunning(true);
    setDetectionFeedback({ tone: "success", message: "Move the cursor over Host Game and hold it there for five seconds." });
    try {
      const result = await window.electronApi.calibrateAoe2HostGameMouseClick();
      setDetectionFeedback({ tone: result.sent ? "success" : "error", message: result.message });
    } finally {
      setMouseCalibrationRunning(false);
    }
  }

  async function testFakeActivationMouseClick(): Promise<void> {
    if (!window.electronApi) {
      setDetectionFeedback({ tone: "error", message: "Fake-activation testing is only available in the Electron app." });
      return;
    }
    const result = await window.electronApi.testAoe2FakeActivationMouseClick();
    setDetectionFeedback({ tone: result.sent ? "success" : "error", message: result.message });
  }

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
        <button type="button" className="secondary" disabled={detecting} onClick={() => void testGameDetection()}>
          {detecting ? "Detecting…" : "Test Game Detection"}
        </button>
        <button type="button" className="secondary" onClick={() => void toggleTabTest()}>
          {tabTestRunning ? "Stop Tab Test" : "Run 15-second Tab Test"}
        </button>
        <div className="game-input-controls">
          <button type="button" className="secondary" onClick={() => void sendGameKey("TAB")}>Send Tab</button>
          <button type="button" className="secondary" onClick={() => void sendGameKey("ENTER")}>Send Enter</button>
        </div>
        <button type="button" className="primary" disabled={lobbySequenceRunning} onClick={() => void runCreateLobbySequence()}>
          {lobbySequenceRunning ? "Creating Ranked Lobby…" : "Test Ranked Lobby Sequence"}
        </button>
        <button type="button" className="secondary" onClick={() => void testHostGameMouseClick()}>
          Test Mouse Click: Host Game
        </button>
        <button type="button" className="secondary" disabled={mouseCalibrationRunning} onClick={() => void calibrateHostGameMouseClick()}>
          {mouseCalibrationRunning ? "Hover Over Host Game…" : "Calibrate Mouse: Host Game"}
        </button>
        <button type="button" className="secondary" onClick={() => void testFakeActivationMouseClick()}>
          Test Fake Activation: Host Game
        </button>
        {detectionFeedback && (
          <div className={`detection-feedback ${detectionFeedback.tone}`} role="status" aria-live="polite">
            {detectionFeedback.message}
          </div>
        )}
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
        <button type="button" className="secondary" onClick={() => void window.electronApi?.toggleTestOverlay()}>Show / Hide Test Overlay</button>
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
