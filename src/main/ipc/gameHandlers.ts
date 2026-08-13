import { app, BrowserWindow, clipboard, ipcMain, screen, shell, type WebContents } from "electron";
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { access, appendFile, copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { CreateLobbyRequest, GameInputKey } from "../../shared/contracts/gameIntegration.js";
import {
  describeAoe2WindowCapture,
  hasFreshAoe2WindowCapture,
  startAoe2WindowCapture,
  stopAoe2WindowCapture,
  waitForFreshAoe2WindowCapture
} from "../aoe2WindowCapture.js";
import {
  empireLeagueMapsModName,
  ensureEmpireLeagueMapsEnabled,
  setEmpireLeagueSplashEnabled
} from "../aoe2MapInstaller.js";
import type { SteamFamilyProbeResult } from "../../shared/contracts/electronApi.js";
import { defaultCustomLobbyGameSettings, type CustomLobbyGameSettings } from "../../shared/contracts/customLobby.js";
import {
  aoe2UiManifest,
  civilizationDesignPoint,
  civilizationSlotDesignPoint,
  mapDesignPoint,
  teamSlotDesignPoint,
  type Aoe2ActionName,
  type Aoe2CivilizationSelection,
  type Aoe2MapSelection
} from "../../shared/aoe2UiManifest.js";
import {
  cursorAutomationEnabled,
  contentConfirmationKeyDelayMs,
  lobbySetupRetryTiming,
  lobbySetupTiming
} from "../../shared/runtimeConfig.js";
import {
  closeTestOverlay,
  hideReturnToMenuOverlay,
  hideMainWindowGameCover,
  focusMainWindow,
  restoreMainWindowFromGameCover,
  setMouseCoordinateOverlayEnabled,
  setMainWindowGameCoverClickThrough,
  setMainWindowGameCoverOverAoe,
  showMainWindowAsGameCover,
  showReturnToMenuOverlay
} from "../window.js";
import { setObsCaptureMode } from "../obsIntegration.js";
import { loadAoe2Localization, setAoe2LanguageOverride } from "../aoe2Localization.js";
import { isAoe2LanguageId } from "../../shared/aoe2Languages.js";
import {
  beginAoe2GameplayAudio,
  beginAoe2MatchAudioSuppression,
  endAoe2MatchAudioSuppression,
  restoreAoe2AudioOnShutdown
} from "../aoe2AudioSuppression.js";
import {
  closeAoe2NativeWindow,
  clearAoe2TextField,
  detectAoe2NativeProcess,
  focusAoe2NativeWindow,
  focusAoe2ForGameplayDetailed,
  getAoe2NativeWindowHandle,
  releaseAoe2GameplayTopmost,
  setWindowsInputBlocked,
  isAoe2NativeWindowForeground,
  keepAoe2NativeWindowBehind,
  postAoe2Enter,
  postAoe2DesignClick,
  readAoe2CivilizationPickerState,
  readAoe2CivilizationTileState,
  readAoe2ContentWarningState,
  readAoe2HostSetupState,
  readAoe2ReadyState,
  sendAoe2End,
  sendAoe2Digit,
  sendAoe2Enter,
  sendAoe2Escape,
  sendAoe2Home,
  sendAoe2Tab,
  sendAoe2Text,
  showAoe2NativeWindowBehind
} from "../aoe2Win32Automation.js";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const execFileAsync = promisify(execFile);
const aoe2AppId = "813780";
const currentDir = dirname(fileURLToPath(import.meta.url));
let launchRequested = false;
let launchRequestedAt = 0;
let ownedAoe2Pid: number | undefined;
let ownedAoe2WindowReady = false;
let quittingAfterGameCleanup = false;
let tabTestProcess: ChildProcess | undefined;
let inputGuardProcess: ChildProcess | undefined;
let inputGuardHeartbeatTimer: NodeJS.Timeout | undefined;
let inputGuardWindow: BrowserWindow | undefined;
let inputGuardStopTimer: NodeJS.Timeout | undefined;
let inputGuardFrameSequence = 0;
let inputGuardLastAcknowledgedFrame = 0;
let inputGuardFramesReceived = 0;
let inputGuardFramesSent = 0;
let inputGuardFramesDiscarded = 0;
let inputGuardLastAcknowledgedAt = 0;
const guardedModifiers = new Set<"shift" | "control" | "alt">();
const guardedSenders = new WeakSet<object>();
const loadingScreenWatchers = new WeakSet<WebContents>();
let offscreenWindowProcess: ChildProcess | undefined;
let aoe2WindowMonitor: NodeJS.Timeout | undefined;
let aoe2WindowIsOffscreen = false;
let replayEndPoller: NodeJS.Timeout | undefined;
let replayFocusTimers: NodeJS.Timeout[] = [];
let returnToMenuPoller: NodeJS.Timeout | undefined;
let returnToMenuWatchGeneration = 0;
let replayDetectionGeneration = 0;
const builtInGameMapNames = new Set<string>();
let createLobbySequenceCounter = 0;
let activeCreateLobbySequence: { id: number; context: "ranked" | "custom" } | undefined;

function startLoadingScreenWatch(processId: number, sender: WebContents): boolean {
  if (loadingScreenWatchers.has(sender)) return true;
  loadingScreenWatchers.add(sender);
  const deadline = Date.now() + 20_000;
  let consecutiveLoadingReads = 0;
  const poll = (): void => {
    if (sender.isDestroyed() || Date.now() >= deadline) {
      loadingScreenWatchers.delete(sender);
      return;
    }
    const screenState = readAoe2HostSetupState(processId);
    consecutiveLoadingReads = screenState.state === "loading-screen"
      ? consecutiveLoadingReads + 1
      : 0;
    if (consecutiveLoadingReads >= 2) {
      loadingScreenWatchers.delete(sender);
      sender.send("game:loading-screen");
      console.info(`[AoE2 automation] LOADING_SCREEN|Detected=True|${screenState.detail}`);
      return;
    }
    const timer = setTimeout(poll, 50);
    timer.unref();
  };
  poll();
  return true;
}

function normalizeContentName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function builtInMapName(fileName: string) {
  return basename(fileName, extname(fileName))
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function selectScenarioVariants(
  modName: string,
  files: Array<{ path: string; name: string; size: number }>
): Array<{ path: string; variant: string }> {
  const targetVersion = Number(modName.match(/\bv(\d+)\b/i)?.[1] ?? 0);
  const candidates = files
    .filter((file) => file.size > 10_000 && !/(test|working|detached)/i.test(file.name))
    .map((file) => {
      const version = Number(file.name.match(/v\D*(\d+)/i)?.[1] ?? 0);
      const variant = /random\s*position/i.test(file.name)
        ? "Random Position"
        : /team\s*free/i.test(file.name)
          ? "Team Free"
          : "Standard";
      return { ...file, version, variant };
    })
    .filter((file) => {
      if (file.variant !== "Standard") return true;
      const suffix = file.name.replace(/^.*?v\D*\d+/i, "");
      return !/[a-z]/i.test(suffix);
    });

  return ["Standard", "Random Position", "Team Free"].flatMap((variant) => {
    const matching = candidates.filter((file) => file.variant === variant);
    const exact = matching.filter((file) => file.version === targetVersion);
    const eligible = exact.length
      ? exact
      : matching.filter((file) => !targetVersion || file.version <= targetVersion);
    const selected = eligible.sort((left, right) => right.version - left.version || right.size - left.size)[0];
    return selected ? [{ path: selected.path, variant }] : [];
  });
}

async function scanLocalCustomContent() {
  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const roots: string[] = [];
  const maps: Array<{ id: string; name: string; gameName: string; kind: "map" | "scenario"; path: string; source: string; enabled: boolean; modName?: string; builtIn?: boolean }> = [];
  const dataMods: Array<{ id: string; name: string; gameName: string; kind: "data_mod"; path: string; source: string; enabled: boolean; modName?: string }> = [];
  const seen = new Set<string>();

  const add = (
    kind: "map" | "scenario" | "data_mod",
    path: string,
    source: string,
    label?: string,
    gameName?: string,
    availability: { enabled?: boolean; modName?: string; builtIn?: boolean } = {}
  ) => {
    const name = (label || basename(path, extname(path))).trim();
    const normalizedName = name.toLowerCase().replace(/\s+/g, " ");
    const key = `${kind}:${normalizedName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    const item = {
      id: Buffer.from(`${key}:${path.toLowerCase()}`).toString("base64url"),
      name,
      gameName: gameName ?? basename(path, extname(path)),
      kind,
      path,
      source,
      enabled: availability.enabled !== false,
      ...(availability.modName ? { modName: availability.modName } : {}),
      ...(availability.builtIn ? { builtIn: true } : {})
    };
    (kind === "data_mod" ? dataMods : maps).push(item as never);
    return true;
  };

  const walk = async (
    root: string,
    source: string,
    options: { modRoot?: string; modName?: string; enabled?: boolean; scenarioFiles?: Array<{ path: string; name: string; size: number }> } = {},
    depth = 0
  ): Promise<void> => {
    if (depth > 6) return;
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const path = join(root, entry.name);
      if (entry.isDirectory()) {
        await walk(path, source, options, depth + 1);
        continue;
      }
      const lower = entry.name.toLowerCase();
      if (lower.endsWith(".rms")) add("map", path, source, undefined, undefined, options);
      if (lower.endsWith(".aoe2scenario") && options.modRoot && options.scenarioFiles) {
        const details = await stat(path).catch(() => null);
        if (details) options.scenarioFiles.push({ path, name: basename(path, extname(path)), size: details.size });
      }
      if (lower.endsWith(".aoe2scenario") && !options.modRoot) add("scenario", path, source, undefined, undefined, options);
      if (lower === "empires2_x2_p1.dat" || lower === "empires2_x2_p1.json") {
        const modRoot = options.modRoot
          ?? path.slice(0, Math.max(0, path.toLowerCase().lastIndexOf(`${join("resources", "_common").toLowerCase()}`)));
        add("data_mod", modRoot || dirname(path), source, options.modName ?? basename(modRoot || dirname(path)), undefined, options);
      }
    }
  };

  const scanModsDirectory = async (
    modsRoot: string,
    source: string,
    modStatuses: Map<string, { enabled: boolean; title: string }>
  ): Promise<void> => {
    let modDirectories;
    try {
      modDirectories = await readdir(modsRoot, { withFileTypes: true });
    } catch {
      return;
    }
    roots.push(modsRoot);
    for (const mod of modDirectories) {
      if (!mod.isDirectory()) continue;
      const modRoot = join(modsRoot, mod.name);
      const modName = mod.name.replace(/^\d+_/, "").trim();
      const status = modStatuses.get(mod.name.toLowerCase());
      const displayName = status?.title || modName;
      // A subscribed folder can remain on disk even when AoE2 no longer
      // registers it. Require an explicit enabled status before offering it.
      const enabled = status?.enabled === true;
      const scenarioFiles: Array<{ path: string; name: string; size: number }> = [];
      await walk(modRoot, source, { modRoot, modName: displayName, enabled, scenarioFiles });
      for (const scenario of selectScenarioVariants(modName, scenarioFiles)) {
        add(
          "scenario",
          scenario.path,
          source,
          `${modName}: ${scenario.variant}`,
          basename(scenario.path, extname(scenario.path)),
          { enabled, modName: displayName }
        );
      }
    }
  };

  try {
    const profiles = (await readdir(profilesRoot, { withFileTypes: true }))
      .filter((profile) => profile.isDirectory() && /^\d{17}$/.test(profile.name));
    const profileActivity = await Promise.all(profiles.map(async (profile) => {
      const profileRoot = join(profilesRoot, profile.name);
      const status = await stat(join(profileRoot, "mods", "mod-status.json")).catch(() => null);
      return { profile, activityMs: status?.mtimeMs ?? 0 };
    }));
    const activeProfile = profileActivity.sort((left, right) => right.activityMs - left.activityMs)[0]?.profile;
    if (activeProfile) {
      const profile = activeProfile;
      const profileRoot = join(profilesRoot, profile.name);
      const modStatuses = new Map<string, { enabled: boolean; title: string }>();
      try {
        const parsed = JSON.parse(await readFile(join(profileRoot, "mods", "mod-status.json"), "utf8")) as {
          Mods?: Array<{ Path?: string; Enabled?: boolean; Title?: string }>;
        };
        for (const mod of parsed.Mods ?? []) {
          const folder = String(mod.Path ?? "").replace(/\\/g, "/").split("/").filter(Boolean).at(-1)?.toLowerCase();
          if (folder) modStatuses.set(folder, { enabled: mod.Enabled !== false, title: String(mod.Title ?? folder) });
        }
      } catch {
        // A missing status file means AoE2 has not recorded enablement for this profile.
      }
      for (const category of ["local", "subscribed"]) {
        await scanModsDirectory(
          join(profileRoot, "mods", category),
          `${profile.name}/mods/${category}`,
          modStatuses
        );
      }
      for (const candidate of [
        join(profileRoot, "resources", "_common", "random-map-scripts"),
        join(profileRoot, "resources", "_common", "scenario")
      ]) {
        try {
          if ((await stat(candidate)).isDirectory()) {
            roots.push(candidate);
            await walk(candidate, relative(profilesRoot, candidate));
          }
        } catch {
          // Custom content folders are optional.
        }
      }
    }
  } catch {
    // AoE2 has not created a local profile directory yet.
  }

  builtInGameMapNames.clear();
  const installation = await detectAoe2Installation();
  if (installation.installed && installation.path) {
    const gameMapsRoot = join(installation.path, "resources", "_common", "drs", "gamedata_x2");
    try {
      const entries = await readdir(gameMapsRoot, { withFileTypes: true });
      roots.push(gameMapsRoot);
      for (const entry of entries) {
        if (!entry.isFile() || !/\.rms2?$/i.test(entry.name)) continue;
        if (/^(?:br[ _-]|ctr[ _-]|em[ _-]|qs[ _-]|real[ _-]world[ _-]|special[ _-]map[ _-]|network[ _-]test)/i.test(entry.name)) continue;
        const name = builtInMapName(entry.name);
        if (add("map", join(gameMapsRoot, entry.name), "AoE2 built-in maps", name, name, { builtIn: true })) {
          builtInGameMapNames.add(normalizeContentName(name));
        }
      }
    } catch {
      // Some installations package built-in maps differently.
    }
  }

  const byName = <T extends { name: string }>(left: T, right: T) => left.name.localeCompare(right.name);
  return {
    maps: maps.sort((left, right) => Number(Boolean(left.builtIn)) - Number(Boolean(right.builtIn)) || byName(left, right)),
    dataMods: dataMods.sort(byName),
    scannedRoots: roots,
    scannedAt: new Date().toISOString()
  };
}

interface DetectedUiMods {
  mods: string[];
  profileId?: string;
  /** Exact mod-status paths, kept private to the main process for safe disabling. */
  modPaths?: string[];
}

const automationSensitiveWidgetUiFiles = new Set([
  "dialogcreatemultiplayergame.json",
  "dialoglobbysettings.json",
  "screenempireinvites.json",
  "screenmainmenu.json",
  "screenmapselection.json",
  "screenmultiplayerbrowser.json",
  "screenmultiplayerlobbyclient.json",
  "screenmultiplayerlobbyhost.json",
  "screenmultiplayerlobbyspectator.json",
  "screenmultiplayerlobbytransition.json",
  "screenselectscenario.json"
]);

function isAutomationSensitiveUiPath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/").toLowerCase();
  const fileName = normalized.split("/").at(-1) ?? "";

  // Fixed-coordinate automation operates only these menu/lobby layouts. Mods
  // that merely contain other widgetui files (HUDs, minimaps, etc.) are safe.
  if (normalized.includes("/widgetui/") && automationSensitiveWidgetUiFiles.has(fileName)) return true;

  // These images are sampled to recognize the main menu and Ready state. A
  // replacement can break verification even when it does not move a control.
  return normalized.includes("/widgetui/textures/menu/buttons/button_ready_")
    || normalized.includes("/widgetui/textures/menu/buttons/button_red_")
    || normalized.includes("/resources/_common/wpfg/resources/simplemainmenu/")
    || normalized.includes("/resources/_common/wpfg/resources/button_large/");
}

async function detectEnabledUiModsDetailed(): Promise<DetectedUiMods> {
  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  let profiles: Array<{ name: string; activityMs: number }>;
  try {
    const entries = (await readdir(profilesRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory() && /^\d{17}$/.test(entry.name));
    profiles = await Promise.all(entries.map(async (entry) => ({
      name: entry.name,
      activityMs: (await stat(join(profilesRoot, entry.name, "mods", "mod-status.json")).catch(() => null))?.mtimeMs ?? 0
    })));
  } catch {
    return { mods: [] };
  }

  const profile = profiles.sort((left, right) => right.activityMs - left.activityMs)[0];
  if (!profile) return { mods: [] };

  let statuses: Array<{ Path?: string; Enabled?: boolean; Title?: string }> = [];
  try {
    const parsed = JSON.parse(
      await readFile(join(profilesRoot, profile.name, "mods", "mod-status.json"), "utf8")
    ) as { Mods?: Array<{ Path?: string; Enabled?: boolean; Title?: string }> };
    statuses = parsed.Mods ?? [];
  } catch {
    return { mods: [], profileId: profile.name };
  }

  const containsAutomationSensitiveUi = async (root: string, depth = 0): Promise<boolean> => {
    if (depth > 8) return false;
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch {
      return false;
    }
    for (const entry of entries) {
      const absolutePath = join(root, entry.name);
      if (entry.isDirectory()) {
        if (await containsAutomationSensitiveUi(absolutePath, depth + 1)) return true;
      } else if (isAutomationSensitiveUiPath(absolutePath)) return true;
    }
    return false;
  };

  const detected = new Map<string, string>();
  for (const mod of statuses) {
    if (mod.Enabled === false || !mod.Path) continue;
    const pathParts = String(mod.Path).replace(/\\/g, "/").split("/").filter(Boolean);
    const folder = pathParts.at(-1);
    if (!folder) continue;
    const displayName = String(mod.Title || folder.replace(/^\d+_/, "")).trim();
    if (displayName.toLowerCase() === empireLeagueMapsModName.toLowerCase()) continue;
    const indicatedCategory = pathParts.find((part) => ["local", "subscribed"].includes(part.toLowerCase()))?.toLowerCase();
    const categories = indicatedCategory === "local" || indicatedCategory === "subscribed"
      ? [indicatedCategory]
      : ["local", "subscribed"];
    const hasSensitiveUi = (await Promise.all(categories.map((category) =>
      containsAutomationSensitiveUi(join(profilesRoot, profile.name, "mods", category, folder))
    ))).some(Boolean);
    if (hasSensitiveUi) {
      detected.set(String(mod.Path).replace(/\\/g, "/").toLowerCase(), displayName);
    }
  }

  const entries = [...detected.entries()].sort((left, right) => left[1].localeCompare(right[1]));
  return {
    mods: entries.map(([, displayName]) => displayName),
    profileId: profile.name,
    modPaths: entries.map(([path]) => path)
  };
}

async function detectEnabledUiMods(): Promise<{ mods: string[]; profileId?: string }> {
  const { mods, profileId } = await detectEnabledUiModsDetailed();
  return { mods, profileId };
}

async function disableEnabledUiMods(): Promise<{ disabled: string[] }> {
  const detected = await detectEnabledUiModsDetailed();
  if (!detected.profileId || !detected.mods.length) return { disabled: [] };

  const statusPath = join(homedir(), "Games", "Age of Empires 2 DE", detected.profileId, "mods", "mod-status.json");
  const parsed = JSON.parse(await readFile(statusPath, "utf8")) as {
    Mods?: Array<{ Path?: string; Enabled?: boolean; Title?: string }>;
  };
  const detectedPaths = new Set(detected.modPaths ?? []);
  const disabled: string[] = [];
  for (const mod of parsed.Mods ?? []) {
    const normalizedPath = String(mod.Path ?? "").replace(/\\/g, "/").toLowerCase();
    const folder = normalizedPath.split("/").filter(Boolean).at(-1) ?? "";
    const displayName = String(mod.Title || folder.replace(/^\d+_/, "")).trim();
    if (!detectedPaths.has(normalizedPath) || mod.Enabled === false) continue;
    mod.Enabled = false;
    disabled.push(displayName);
  }
  if (!disabled.length) return { disabled: [] };

  const temporaryPath = `${statusPath}.empire-league-tmp`;
  await copyFile(statusPath, `${statusPath}.empire-league-backup`);
  await writeFile(temporaryPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await rename(temporaryPath, statusPath);
  return { disabled };
}

const replayPollIntervalMs = 1500;
const replayStartupWindowMs = 60_000;
const replayStartupStableForMs = 6_000;
const replayRunningStableForMs = 3_000;
const replayStartWarningMs = 30_000;
const replayStartTimeoutMs = 60_000;

interface ReplaySnapshot {
  path: string;
  size: number;
  modifiedMs: number;
}

async function snapshotReplayFile(path: string): Promise<ReplaySnapshot | undefined> {
  try {
    const details = await stat(path);
    return { path, size: details.size, modifiedMs: details.mtimeMs };
  } catch {
    return undefined;
  }
}

async function findReplayFiles(configuredFolder?: string): Promise<ReplaySnapshot[]> {
  const roots: string[] = [];
  if (configuredFolder?.trim()) {
    roots.push(configuredFolder.trim());
  } else {
    const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
    try {
      for (const entry of await readdir(profilesRoot, { withFileTypes: true })) {
        if (entry.isDirectory()) roots.push(join(profilesRoot, entry.name, "savegame"));
      }
    } catch {
      return [];
    }
  }

  const files: ReplaySnapshot[] = [];
  for (const root of roots) {
    try {
      for (const entry of await readdir(root, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".aoe2record")) continue;
        const path = join(root, entry.name);
        const details = await stat(path);
        files.push({ path, size: details.size, modifiedMs: details.mtimeMs });
      }
    } catch {
      // A profile may not have a savegame directory yet.
    }
  }
  return files;
}

function stopReplayEndDetection(): void {
  replayDetectionGeneration += 1;
  if (replayEndPoller) clearTimeout(replayEndPoller);
  replayEndPoller = undefined;
  stopAoe2WindowCapture();
}

function clearReplayFocusTimers(): void {
  for (const timer of replayFocusTimers) clearTimeout(timer);
  replayFocusTimers = [];
}

function focusMainWindowAfterReplay(window: BrowserWindow, manageRunningGame = false): void {
  void setObsCaptureMode("app");
  clearReplayFocusTimers();
  const manageGameWindow = (): void => {
    if (!manageRunningGame) return;
    const game = detectAoe2NativeProcess();
    if (!game.pid || !game.windowReady) return;
    keepAoe2NativeWindowBehind(game.pid);
    console.info(`[AoE2 replay] WINDOW_MANAGED|Pid=${game.pid}|Taskbar=False|AltTab=False`);
  };
  // Restore Electron before lowering AoE2. Lowering the game first can expose
  // the desktop while a hidden/fullscreen BrowserWindow takes a moment to
  // become visible, leaving only the return-to-menu overlay on screen.
  focusMainWindow(window);
  manageGameWindow();
  for (const delayMs of [250, 1000]) {
    const timer = setTimeout(() => {
      replayFocusTimers = replayFocusTimers.filter((candidate) => candidate !== timer);
      if (!window.isDestroyed()) {
        focusMainWindow(window);
        manageGameWindow();
      }
    }, delayMs);
    timer.unref();
    replayFocusTimers.push(timer);
  }
}

function stopReturnToMenuWatch(): void {
  returnToMenuWatchGeneration += 1;
  if (returnToMenuPoller) clearTimeout(returnToMenuPoller);
  returnToMenuPoller = undefined;
  hideReturnToMenuOverlay();
}

function startReturnToMenuWatch(window: BrowserWindow): void {
  stopReturnToMenuWatch();
  const generation = returnToMenuWatchGeneration;
  showReturnToMenuOverlay();
  let consecutiveMainMenuReads = 0;
  let captureFailures = 0;

  const poll = async (): Promise<void> => {
    if (generation !== returnToMenuWatchGeneration || window.isDestroyed()) {
      stopReturnToMenuWatch();
      return;
    }
    const game = detectAoe2NativeProcess();
    if (!game.running) {
      stopReturnToMenuWatch();
      focusMainWindowAfterReplay(window);
      return;
    }
    if (game.pid && game.windowReady) {
      const gameWindow = getAoe2NativeWindowHandle(game.pid);
      if (!gameWindow) {
        captureFailures += 1;
        if (captureFailures === 1 || captureFailures % 5 === 0) {
          console.warn(`[AoE2 replay] MENU_CAPTURE|Ready=False|Reason=WindowNotFound|Attempt=${captureFailures}`);
        }
        if (generation === returnToMenuWatchGeneration) {
          returnToMenuPoller = setTimeout(() => void poll(), 1_000);
          returnToMenuPoller.unref();
        }
        return;
      }
      if (!hasFreshAoe2WindowCapture(gameWindow)) {
        const captureReady = await waitForFreshAoe2WindowCapture(gameWindow, 2_000);
        if (generation !== returnToMenuWatchGeneration) return;
        if (!captureReady) {
          captureFailures += 1;
          if (captureFailures === 1 || captureFailures % 5 === 0) {
            console.warn(
              `[AoE2 replay] MENU_CAPTURE|Ready=False|Attempt=${captureFailures}`
              + `|${describeAoe2WindowCapture(gameWindow)}`
            );
          }
          returnToMenuPoller = setTimeout(() => void poll(), 1_000);
          returnToMenuPoller.unref();
          return;
        }
        console.info(
          `[AoE2 replay] MENU_CAPTURE|Ready=True|Recovered=${captureFailures > 0}`
          + `|${describeAoe2WindowCapture(gameWindow)}`
        );
        captureFailures = 0;
      }
      const state = readAoe2HostSetupState(game.pid);
      consecutiveMainMenuReads = state.state === "main-menu"
        ? consecutiveMainMenuReads + 1
        : 0;
      if (consecutiveMainMenuReads >= 2) {
        stopReturnToMenuWatch();
        focusMainWindowAfterReplay(window, true);
        return;
      }
    }
    if (generation === returnToMenuWatchGeneration) {
      returnToMenuPoller = setTimeout(() => void poll(), 250);
      returnToMenuPoller.unref();
    }
  };

  void poll();
}

async function startReplayEndDetection(
  window: BrowserWindow,
  configuredFolder?: string
): Promise<{ started: boolean; message?: string }> {
  clearReplayFocusTimers();
  stopReplayEndDetection();
  const generation = replayDetectionGeneration;
  const startedAt = Date.now();
  let active: ReplaySnapshot | undefined;
  let lastGrowthAt = startedAt;
  let observedGrowth = false;
  let replayStartedEmitted = false;
  let activeCreatedDuringWatch = false;
  let lastCandidateKey: string | undefined;
  let observedInGameScreen = false;
  let consecutiveMainMenuReads = 0;
  let recoveredFromMainMenu = false;
  let observedGameProcess = false;
  let recoveredFromProcessExit = false;
  let replayStartWarningEmitted = false;

  const initialFiles = await findReplayFiles(configuredFolder);
  if (configuredFolder?.trim() && initialFiles.length === 0) {
    try {
      const details = await stat(configuredFolder.trim());
      if (!details.isDirectory()) {
        return { started: false, message: "The configured replay folder is not a directory." };
      }
    } catch {
      return { started: false, message: "The configured replay folder could not be found." };
    }
  }

  const emitReplayStarted = (replay: ReplaySnapshot): void => {
    if (replayStartedEmitted || window.webContents.isDestroyed()) return;
    replayStartedEmitted = true;
    window.webContents.send("game:replay-started", replay.path);
    console.info(`[AoE2 replay] STARTED|File=${replay.path}`);
  };

  const emitReplayEnded = (replay: ReplaySnapshot, reason: "FileGrowth" | "QuietFallback"): void => {
    if (window.webContents.isDestroyed()) {
      console.warn(
        `[AoE2 replay] NOTIFY_SKIPPED|Reason=${reason}|RendererDestroyed=True`
        + `|File=${replay.path}|Size=${replay.size}|ModifiedMs=${replay.modifiedMs}`
      );
      return;
    }
    window.webContents.send("game:replay-ended", replay.path);
    console.info(
      `[AoE2 replay] NOTIFY|Reason=${reason}|RendererDestroyed=False`
      + `|File=${replay.path}|Size=${replay.size}|ModifiedMs=${replay.modifiedMs}`
    );
  };

  const poll = async (): Promise<void> => {
    if (generation !== replayDetectionGeneration || window.isDestroyed()) return;
    try {
      // Replay writes are the source of truth for the result, but they can lag behind
      // a player who exits the post-game screen quickly. Keep a separate visual
      // fallback armed only after AoE2 has shown an unrecognized (in-game) screen so
      // the pre-game main menu cannot bring Empire League forward accidentally.
      const game = detectAoe2NativeProcess();
      if (game.running) observedGameProcess = true;
      if (observedGameProcess && !game.running && !recoveredFromProcessExit) {
        recoveredFromProcessExit = true;
        focusMainWindowAfterReplay(window);
        if (!window.webContents.isDestroyed()) window.webContents.send("game:process-exited");
        console.info("[AoE2 replay] RECOVER|Reason=ProcessExited");
      }
      // Once the replay is growing, file activity is the source of truth for the
      // active match. Do not keep capturing the game window throughout gameplay;
      // the return-to-menu watcher is armed after replay completion.
      if (!observedGrowth && game.pid && game.windowReady && !recoveredFromMainMenu) {
        const screen = readAoe2HostSetupState(game.pid);
        if (screen.state === "unknown" || screen.state === "loading-screen") observedInGameScreen = true;
        consecutiveMainMenuReads = observedInGameScreen && screen.state === "main-menu"
          ? consecutiveMainMenuReads + 1
          : 0;
        if (consecutiveMainMenuReads >= 2) {
          recoveredFromMainMenu = true;
          focusMainWindowAfterReplay(window, true);
          console.info("[AoE2 replay] RECOVER|Reason=MainMenuFallback");
        }
      }

      // Scan every replay only while discovering which file belongs to this
      // match. Once that file has actually grown, its path is authoritative and
      // subsequent polls only stat that one file.
      const files = !active || !observedGrowth
        ? await findReplayFiles(configuredFolder)
        : undefined;
      if (!active) {
        // Detection starts shortly after Start Game. Accept a recently-created file,
        // but require a subsequent write before it can ever signal completion.
        active = files!
          .filter((file) => file.modifiedMs >= startedAt - 60_000)
          .sort((left, right) => right.modifiedMs - left.modifiedMs)[0];
        if (active) {
          activeCreatedDuringWatch = !initialFiles.some((file) => file.path === active?.path);
          lastGrowthAt = Date.now();
          if (activeCreatedDuringWatch) emitReplayStarted(active);
        }
      } else {
        if (files) {
          const newest = files
            .filter((file) => file.modifiedMs >= startedAt - 60_000)
            .sort((left, right) => right.modifiedMs - left.modifiedMs)[0];
          if (newest && newest.path !== active.path && newest.modifiedMs > active.modifiedMs) {
            active = newest;
            activeCreatedDuringWatch = !initialFiles.some((file) => file.path === newest.path);
            lastGrowthAt = Date.now();
          }
        }
        const current = files
          ? files.find((file) => file.path === active?.path)
          : await snapshotReplayFile(active.path);
        if (current && (current.size !== active.size || current.modifiedMs !== active.modifiedMs)) {
          observedGrowth = true;
          lastGrowthAt = Date.now();
          active = current;
          emitReplayStarted(current);
          emitReplayEnded(current, "FileGrowth");
        } else if (current && (observedGrowth || activeCreatedDuringWatch)) {
          const now = Date.now();
          const elapsedMs = now - startedAt;
          const stableForMs = elapsedMs < replayStartupWindowMs
            ? replayStartupStableForMs
            : replayRunningStableForMs;
          const candidateKey = `${current.path}|${current.size}|${current.modifiedMs}`;
          if (now - lastGrowthAt >= stableForMs && candidateKey !== lastCandidateKey) {
            lastCandidateKey = candidateKey;
            emitReplayEnded(current, "QuietFallback");
            console.info(
              `[AoE2 replay] INSPECT|Reason=QuietFallback|File=${current.path}|StableMs=${stableForMs}|ElapsedMs=${elapsedMs}`
            );
          }
        }
      }

      const replayStartElapsedMs = Date.now() - startedAt;
      if (
        !replayStartedEmitted
        && !replayStartWarningEmitted
        && replayStartElapsedMs >= replayStartWarningMs
      ) {
        replayStartWarningEmitted = true;
        console.warn(
          `[AoE2 replay] START_DELAYED|WarningMs=${replayStartWarningMs}`
          + `|TimeoutMs=${replayStartTimeoutMs}`
        );
      }

      // A replay created during this watch is already proof that recording
      // started. Its first snapshot can remain unchanged for longer than the
      // startup deadline on slower machines, so observedGrowth alone is not a
      // safe startup signal. emitReplayStarted handles both valid cases: a new
      // replay discovered after Start Game, or a pre-existing candidate that
      // subsequently grows.
      if (!replayStartedEmitted && replayStartElapsedMs >= replayStartTimeoutMs) {
        stopReplayEndDetection();
        focusMainWindowAfterReplay(window);
        if (!window.webContents.isDestroyed()) {
          window.webContents.send(
            "game:replay-detection-failed",
            "The replay file did not start updating within 60 seconds of the match starting."
          );
        }
        console.warn(`[AoE2 replay] START_TIMEOUT|TimeoutMs=${replayStartTimeoutMs}`);
        return;
      }
    } catch (error) {
      console.error("[AoE2 replay] Poll failed", error);
    }
    if (generation === replayDetectionGeneration) {
      replayEndPoller = setTimeout(() => void poll(), replayPollIntervalMs);
    }
  };

  console.info(`[AoE2 replay] WATCH|Folder=${configuredFolder?.trim() || "auto"}|StartedAt=${new Date(startedAt).toISOString()}`);
  void poll();
  return { started: true };
}

async function detectAoe2Process(): Promise<{ running: boolean; pid?: number; windowReady?: boolean }> {
  if (process.platform !== "win32") return { running: false, windowReady: false };
  return detectAoe2NativeProcess();
}

async function prepareHiddenAoe2WindowBehind(): Promise<{ running: boolean; pid?: number; windowReady?: boolean }> {
  let status = await detectAoe2Process();
  if (!status.running || !status.pid || status.windowReady) return status;
  showAoe2NativeWindowBehind(status.pid);
  // ShowWindow is synchronous, but AoE2 may need a moment to publish a usable
  // client surface after being intentionally hidden with SW_HIDE.
  await delay(100);
  status = await detectAoe2Process();
  return status;
}

async function appendGameplayHandoffLog(entry: Record<string, unknown>): Promise<void> {
  try {
    const logDirectory = join(app.getPath("userData"), "logs");
    await mkdir(logDirectory, { recursive: true });
    await appendFile(
      join(logDirectory, "gameplay-handoff.jsonl"),
      `${JSON.stringify({ at: new Date().toISOString(), ...entry })}\n`,
      "utf8"
    );
  } catch {
    // Gameplay must never depend on diagnostics being writable.
  }
}

async function waitForAoe2Exit(timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!(await detectAoe2Process()).running) return true;
    await delay(250);
  }
  return !(await detectAoe2Process()).running;
}

async function forceCloseAoe2Process(pid: number): Promise<void> {
  await execFileAsync("taskkill.exe", ["/PID", String(pid), "/T", "/F"], { windowsHide: true }).catch(() => undefined);
}

function releaseCursorForElectron(): void {
  if (process.platform !== "win32" || !aoe2WindowIsOffscreen) return;
  const script = String.raw`
$signature = '[DllImport("user32.dll")] public static extern bool ClipCursor(IntPtr rectangle);'
$cursor = Add-Type -MemberDefinition $signature -Name CursorRelease -Namespace EmpireLeague -PassThru
$released = $cursor::ClipCursor([IntPtr]::Zero)
Write-Output "CURSOR|Released=$released"
`;
  const encodedScript = Buffer.from(script, "utf16le").toString("base64");
  const child = spawn("powershell.exe", [
    "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
  ], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  child.stdout?.on("data", (chunk: Buffer) => console.info(`[AoE2 automation] ${chunk.toString().trim()}`));
}

function moveAoe2WindowOffscreen(): void {
  if (process.platform !== "win32") return;
  startAoe2WindowCapture();
  offscreenWindowProcess?.kill();
  if (aoe2WindowMonitor) clearInterval(aoe2WindowMonitor);
  aoe2WindowMonitor = undefined;
  if (cursorAutomationEnabled) {
    let lastPid: number | undefined;
    let lastForeground = false;
    let sawGame = false;
    const fastGuardEndsAt = Date.now() + 30_000;
    aoe2WindowMonitor = setInterval(() => {
      if (Date.now() >= fastGuardEndsAt) {
        if (aoe2WindowMonitor) clearInterval(aoe2WindowMonitor);
        aoe2WindowMonitor = undefined;
        console.info("[AoE2 automation] STARTUP_WINDOW_GUARD|Stopped=True|ElapsedMs=30000");
        return;
      }
      const game = detectAoe2NativeProcess();
      if (game.running && game.pid) {
        sawGame = true;
        if (game.pid !== lastPid) {
          keepAoe2NativeWindowBehind(game.pid);
          console.info(`[AoE2 automation] WINDOW_FOUND|BehindElectron=True|Pid=${game.pid}|Mode=Koffi`);
          lastPid = game.pid;
        }
        const foreground = isAoe2NativeWindowForeground(game.pid);
        // AoE2 changes its window style and z-order more than once while booting.
        // Reassert HWND_BOTTOM whenever it steals the foreground; doing this only
        // on first discovery leaves a later fullscreen transition free to cover EL.
        if (foreground) keepAoe2NativeWindowBehind(game.pid);
        if (foreground !== lastForeground) {
          console.info(`[AoE2 automation] MOUSE_TEST|Foreground=${foreground}|Mode=Koffi`);
          setMainWindowGameCoverOverAoe(foreground);
          lastForeground = foreground;
        }
      } else if (sawGame) {
        console.info("[AoE2 automation] MOUSE_TEST|GameExited=True|Mode=Koffi");
        if (aoe2WindowMonitor) clearInterval(aoe2WindowMonitor);
        aoe2WindowMonitor = undefined;
        closeTestOverlay();
        restoreMainWindowFromGameCover();
      }
    }, 25);
    return;
  }
  const script = String.raw`
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeOffscreen {
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr window, int command);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr window, IntPtr insertAfter, int x, int y, int width, int height, uint flags);
}
'@
Add-Type -TypeDefinition $interop
$lastWindow = [IntPtr]::Zero
$attempt = 0
while ($true) {
  $attempt++
  $game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($game -and $game.MainWindowHandle -ne 0) {
    [AoeOffscreen]::ShowWindow($game.MainWindowHandle, 9) | Out-Null
    $moved = [AoeOffscreen]::SetWindowPos($game.MainWindowHandle, [IntPtr]::Zero, -32000, -32000, 0, 0, 0x0015)
    if ($game.MainWindowHandle -ne $lastWindow) {
      Write-Output "OFFSCREEN|Moved=$moved|Attempt=$attempt|GamePid=$($game.Id)|Window=$($game.MainWindowHandle)"
      $lastWindow = $game.MainWindowHandle
    }
  }
  Start-Sleep -Milliseconds 250
}
`;
  const encodedScript = Buffer.from(script, "utf16le").toString("base64");
  offscreenWindowProcess = spawn("powershell.exe", [
    "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
  ], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  offscreenWindowProcess.stdout?.on("data", (chunk: Buffer) => {
    const output = chunk.toString();
    if (output.includes("OFFSCREEN|Moved=True")) {
      aoe2WindowIsOffscreen = true;
      releaseCursorForElectron();
    }
    output.split(/\r?\n/).filter(Boolean).forEach((message) => console.info(`[AoE2 automation] ${message}`));
  });
  offscreenWindowProcess.stderr?.on("data", (chunk: Buffer) => console.error(`[AoE2 automation] ${chunk.toString().trim()}`));
  offscreenWindowProcess.once("exit", () => { offscreenWindowProcess = undefined; });
}

function restoreAoe2Window(focus = false, maximize = false): void {
  if (process.platform !== "win32") return;
  offscreenWindowProcess?.kill();
  offscreenWindowProcess = undefined;
  if (aoe2WindowMonitor) clearInterval(aoe2WindowMonitor);
  aoe2WindowMonitor = undefined;
  aoe2WindowIsOffscreen = false;
  if (cursorAutomationEnabled) {
    if (focus) {
      const game = detectAoe2NativeProcess();
      if (game.pid) focusAoe2NativeWindow(game.pid);
    }
    return;
  }
  const script = String.raw`
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeRestore {
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr window, IntPtr insertAfter, int x, int y, int width, int height, uint flags);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr window, int command);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr window);
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if ($game -and $game.MainWindowHandle -ne 0) {
  $restored = [AoeRestore]::SetWindowPos($game.MainWindowHandle, [IntPtr]::Zero, 0, 0, 0, 0, 0x0015)
  if (${focus ? "$true" : "$false"}) {
    [AoeRestore]::ShowWindow($game.MainWindowHandle, ${maximize ? 3 : 9}) | Out-Null
    [AoeRestore]::SetForegroundWindow($game.MainWindowHandle) | Out-Null
  }
  Write-Output "OFFSCREEN|Restored=$restored"
}
`;
  const encodedScript = Buffer.from(script, "utf16le").toString("base64");
  const child = spawn("powershell.exe", [
    "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
  ], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  child.stdout?.on("data", (chunk: Buffer) => console.info(`[AoE2 automation] ${chunk.toString().trim()}`));
}

const tabTestScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeWindow {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static bool SendTab(IntPtr window) {
    const uint WM_KEYDOWN = 0x0100;
    const uint WM_KEYUP = 0x0101;
    const int VK_TAB = 0x09;
    bool down = PostMessage(window, WM_KEYDOWN, new IntPtr(VK_TAB), new IntPtr(0x000F0001));
    bool up = PostMessage(window, WM_KEYUP, new IntPtr(VK_TAB), new IntPtr(unchecked((int)0xC00F0001)));
    return down && up;
  }
}
'@
Add-Type -TypeDefinition $interop
$deadline = [DateTime]::UtcNow.AddSeconds(15)
while ([DateTime]::UtcNow -lt $deadline) {
  $game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($game) {
    $window = [AoeWindow]::Find([uint32]$game.Id)
    if ($window -ne [IntPtr]::Zero) {
      $posted = [AoeWindow]::SendTab($window)
      Write-Output "TAB|BackgroundPost=$posted"
    } else {
      Write-Output "WAIT|AoE2 process found, but no visible window was found"
    }
  } else {
    Write-Output "WAIT|AoE2 process not found"
  }
  Start-Sleep -Milliseconds 500
}
`;

function createBackgroundKeyScript(virtualKey: number, scanCode: number): string {
  const downLParam = (scanCode << 16) | 1;
  const upLParam = (0xc0000000 | downLParam) >>> 0;
  return String.raw`
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeKeySender {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static bool Send(IntPtr window) {
    bool down = PostMessage(window, 0x0100, new IntPtr(${virtualKey}), new IntPtr(${downLParam}));
    bool up = PostMessage(window, 0x0101, new IntPtr(${virtualKey}), new IntPtr(unchecked((int)${upLParam})));
    return down && up;
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }
$window = [AoeKeySender]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'WINDOW_NOT_FOUND'; exit 3 }
if ([AoeKeySender]::Send($window)) { Write-Output 'SENT'; exit 0 }
Write-Output 'POST_FAILED'; exit 4
`;
}

const backgroundKeyDefinitions: Record<GameInputKey, { virtualKey: number; scanCode: number }> = {
  TAB: { virtualKey: 0x09, scanCode: 0x0f },
  ENTER: { virtualKey: 0x0d, scanCode: 0x1c }
};

const inputGuardScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;

public static class AoeInputGuard {
  private const int WH_KEYBOARD_LL = 13;
  private const int WH_MOUSE_LL = 14;
  private const uint WM_QUIT = 0x0012;
  private const int VK_CONTROL = 0x11;
  private const int VK_SHIFT = 0x10;
  private const int VK_MENU = 0x12;
  private const int VK_LMENU = 0xA4;
  private const int VK_RMENU = 0xA5;
  private const int VK_F4 = 0x73;
  private const int VK_F12 = 0x7B;
  private const uint GA_ROOT = 2;
  private const uint LLMHF_INJECTED = 0x00000001;

  private delegate IntPtr HookProc(int code, IntPtr wParam, IntPtr lParam);
  private delegate bool EnumWindowsProc(IntPtr window, IntPtr parameter);

  [StructLayout(LayoutKind.Sequential)]
  private struct Point { public int X; public int Y; }

  [StructLayout(LayoutKind.Sequential)]
  private struct MouseHookData {
    public Point Point;
    public uint MouseData;
    public uint Flags;
    public uint Time;
    public IntPtr ExtraInfo;
  }

  [StructLayout(LayoutKind.Sequential)]
  private struct Message {
    public IntPtr Window;
    public uint Id;
    public IntPtr WParam;
    public IntPtr LParam;
    public uint Time;
    public Point Location;
    public uint Private;
  }

  [DllImport("user32.dll")] private static extern IntPtr SetWindowsHookEx(int id, HookProc callback, IntPtr module, uint threadId);
  [DllImport("user32.dll")] private static extern bool UnhookWindowsHookEx(IntPtr hook);
  [DllImport("user32.dll")] private static extern IntPtr CallNextHookEx(IntPtr hook, int code, IntPtr wParam, IntPtr lParam);
  [DllImport("user32.dll")] private static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] private static extern bool GetCursorPos(out Point point);
  [DllImport("user32.dll")] private static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] private static extern int GetSystemMetrics(int index);
  [DllImport("user32.dll")] private static extern short GetAsyncKeyState(int key);
  [DllImport("user32.dll")] private static extern IntPtr WindowFromPoint(Point point);
  [DllImport("user32.dll")] private static extern IntPtr GetAncestor(IntPtr window, uint flags);
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr parameter);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr window, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr window);
  [DllImport("user32.dll")] private static extern bool GetWindowRect(IntPtr window, out Rect rect);
  [DllImport("user32.dll")] private static extern int GetMessage(out Message message, IntPtr window, uint min, uint max);
  [DllImport("user32.dll")] private static extern bool PostThreadMessage(uint threadId, uint message, IntPtr wParam, IntPtr lParam);
  [DllImport("kernel32.dll")] private static extern uint GetCurrentThreadId();
  [DllImport("kernel32.dll")] private static extern IntPtr GetModuleHandle(string moduleName);
  [DllImport("user32.dll")] private static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] private static extern bool SetProcessDpiAwarenessContext(IntPtr value);

  [StructLayout(LayoutKind.Sequential)]
  private struct Rect { public int Left; public int Top; public int Right; public int Bottom; }

  private static IntPtr targetWindow;
  private static IntPtr keyboardHook;
  private static IntPtr mouseHook;
  private static uint guardThreadId;
  private static HookProc keyboardCallback = OnKeyboard;
  private static HookProc mouseCallback = OnMouse;
  private static Point mouseAnchor;
  private static int virtualMouseX;
  private static int virtualMouseY;
  private static int virtualLeft;
  private static int virtualTop;
  private static int virtualRight;
  private static int virtualBottom;
  private static Timer movementPublishTimer;
  private static Timer healthPublishTimer;
  private static Timer processWatchTimer;
  private static Thread parentPipeWatchThread;
  private static int movementDirty;
  private static int movementPublishBusy;
  private static long physicalMoveEvents;
  private static long injectedMoveEvents;
  private static long ignoredRecenterEvents;
  private static long publishedMoveFrames;
  private static long setCursorFailures;
  private static long lastUsableMovementTimestamp;
  private static bool dpiAwarenessRequested;
  private static uint ownerProcessId;
  private static uint targetProcessId;
  private static int shutdownSignaled;
  private static int altPressed;
  private static long lastOwnerHeartbeatTimestamp;
  private static long guardStartedTimestamp;

  public static int Run(uint processId, uint parentProcessId) {
    if (!IsProcessAlive(parentProcessId) || !IsProcessAlive(processId)) return 5;
    ownerProcessId = parentProcessId;
    targetProcessId = processId;
    lastOwnerHeartbeatTimestamp = Stopwatch.GetTimestamp();
    guardStartedTimestamp = lastOwnerHeartbeatTimestamp;
    try {
      dpiAwarenessRequested = SetProcessDpiAwarenessContext(new IntPtr(-4));
    } catch (EntryPointNotFoundException) {
      dpiAwarenessRequested = SetProcessDPIAware();
    }
    targetWindow = FindWindow(processId);
    if (targetWindow == IntPtr.Zero) return 2;
    if (!GetCursorPos(out mouseAnchor)) return 4;
    virtualMouseX = mouseAnchor.X;
    virtualMouseY = mouseAnchor.Y;
    virtualLeft = GetSystemMetrics(76);
    virtualTop = GetSystemMetrics(77);
    virtualRight = virtualLeft + GetSystemMetrics(78) - 1;
    virtualBottom = virtualTop + GetSystemMetrics(79) - 1;
    guardThreadId = GetCurrentThreadId();
    IntPtr module = GetModuleHandle(null);
    keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, keyboardCallback, module, 0);
    mouseHook = SetWindowsHookEx(WH_MOUSE_LL, mouseCallback, module, 0);
    if (keyboardHook == IntPtr.Zero || mouseHook == IntPtr.Zero) {
      Release();
      return 3;
    }
    // The mouse hook can receive thousands of movement callbacks per second.
    // Keep those callbacks lightweight and publish only the newest position at
    // display cadence; buttons and wheel events remain immediate.
    movementPublishTimer = new Timer(PublishLatestMovement, null, 4, 4);
    lastUsableMovementTimestamp = Stopwatch.GetTimestamp();
    healthPublishTimer = new Timer(PublishHealth, null, 1000, 1000);
    processWatchTimer = new Timer(WatchProcesses, null, 100, 100);
    parentPipeWatchThread = new Thread(WatchParentPipe);
    parentPipeWatchThread.IsBackground = true;
    parentPipeWatchThread.Name = "EmpireLeagueInputGuardParentPipe";
    parentPipeWatchThread.Start();

    Rect targetRect;
    bool targetRectRead = GetWindowRect(targetWindow, out targetRect);
    Console.WriteLine(
      "GUARD_READY|DpiAwarenessRequested={0}|Anchor={1},{2}|VirtualBounds={3},{4},{5},{6}|TargetRect={7},{8},{9},{10}|TargetRectRead={11}",
      dpiAwarenessRequested,
      mouseAnchor.X,
      mouseAnchor.Y,
      virtualLeft,
      virtualTop,
      virtualRight,
      virtualBottom,
      targetRect.Left,
      targetRect.Top,
      targetRect.Right,
      targetRect.Bottom,
      targetRectRead
    );
    Console.Out.Flush();
    Message message;
    while (GetMessage(out message, IntPtr.Zero, 0, 0) > 0) { }
    Release();
    return 0;
  }

  private static bool IsProcessAlive(uint processId) {
    try {
      using (Process process = Process.GetProcessById(unchecked((int)processId))) {
        return !process.HasExited;
      }
    } catch {
      return false;
    }
  }

  private static void WatchProcesses(object state) {
    if (!IsProcessAlive(ownerProcessId)) {
      SignalShutdown("PARENT_PROCESS_EXIT");
    } else if (!IsProcessAlive(targetProcessId)) {
      SignalShutdown("AOE2_PROCESS_EXIT");
    } else {
      long heartbeat = Interlocked.Read(ref lastOwnerHeartbeatTimestamp);
      long heartbeatAgeMs = (long)((Stopwatch.GetTimestamp() - heartbeat) * 1000.0 / Stopwatch.Frequency);
      long guardAgeMs = (long)((Stopwatch.GetTimestamp() - guardStartedTimestamp) * 1000.0 / Stopwatch.Frequency);
      if (heartbeatAgeMs > 5000) SignalShutdown("PARENT_HEARTBEAT_TIMEOUT");
      else if (guardAgeMs > 300000) SignalShutdown("MAXIMUM_LIFETIME_TIMEOUT");
    }
  }

  private static void WatchParentPipe() {
    try {
      string line;
      while ((line = Console.In.ReadLine()) != null) {
        if (line == "PING") Interlocked.Exchange(ref lastOwnerHeartbeatTimestamp, Stopwatch.GetTimestamp());
      }
    } catch {
      // A broken parent pipe is equivalent to parent termination.
    }
    SignalShutdown("PARENT_PIPE_CLOSED");
  }

  private static void SignalShutdown(string reason) {
    if (Interlocked.Exchange(ref shutdownSignaled, 1) != 0) return;
    try {
      Console.WriteLine("GUARD_SHUTDOWN|Reason={0}", reason);
      Console.Out.Flush();
    } catch { }
    PostThreadMessage(guardThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
  }

  private static IntPtr FindWindow(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  private static IntPtr OnKeyboard(int code, IntPtr wParam, IntPtr lParam) {
    if (code >= 0) {
      int key = Marshal.ReadInt32(lParam);
      uint message = unchecked((uint)wParam.ToInt64());
      bool keyDown = message == 0x0100 || message == 0x0104;
      bool keyUp = message == 0x0101 || message == 0x0105;
      bool altKey = key == VK_MENU || key == VK_LMENU || key == VK_RMENU;
      if (altKey) {
        if (keyDown) Interlocked.Exchange(ref altPressed, 1);
        else if (keyUp) Interlocked.Exchange(ref altPressed, 0);
      }
      bool emergency = key == VK_F12
        && (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0
        && (GetAsyncKeyState(VK_SHIFT) & 0x8000) != 0;
      bool exitRequested = key == VK_F4
        && Interlocked.CompareExchange(ref altPressed, 0, 0) != 0
        && keyDown;
      if (emergency) {
        PostThreadMessage(guardThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
      } else if (exitRequested) {
        Console.WriteLine("EXIT_REQUEST");
        Console.Out.Flush();
        PostThreadMessage(guardThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
      } else {
        string action = message == 0x0101 || message == 0x0105 ? "UP" : "DOWN";
        Console.WriteLine("KEY|{0}|{1}", action, key);
        Console.Out.Flush();
        return new IntPtr(1);
      }
    }
    return CallNextHookEx(keyboardHook, code, wParam, lParam);
  }

  private static IntPtr OnMouse(int code, IntPtr wParam, IntPtr lParam) {
    if (code >= 0) {
      MouseHookData data = Marshal.PtrToStructure<MouseHookData>(lParam);
      uint message = unchecked((uint)wParam.ToInt64());
      int wheel = unchecked((short)(data.MouseData >> 16));
      if (message == 0x0200) {
        bool injected = (data.Flags & LLMHF_INJECTED) != 0;
        if (injected && data.Point.X == mouseAnchor.X && data.Point.Y == mouseAnchor.Y) {
          Interlocked.Increment(ref ignoredRecenterEvents);
          return new IntPtr(1);
        }
        if (injected) Interlocked.Increment(ref injectedMoveEvents);
        else Interlocked.Increment(ref physicalMoveEvents);
        virtualMouseX = Math.Max(virtualLeft, Math.Min(virtualRight, virtualMouseX + data.Point.X - mouseAnchor.X));
        virtualMouseY = Math.Max(virtualTop, Math.Min(virtualBottom, virtualMouseY + data.Point.Y - mouseAnchor.Y));
        Interlocked.Exchange(ref lastUsableMovementTimestamp, Stopwatch.GetTimestamp());
        if (!SetCursorPos(mouseAnchor.X, mouseAnchor.Y)) Interlocked.Increment(ref setCursorFailures);
        Interlocked.Exchange(ref movementDirty, 1);
        return new IntPtr(1);
      }
      // Suppress non-movement injected input so our own synthetic automation
      // and input forwarded by other software cannot bleed into AoE2.
      if ((data.Flags & LLMHF_INJECTED) != 0) return new IntPtr(1);
      Console.WriteLine("MOUSE|{0}|{1}|{2}|{3}", message, virtualMouseX, virtualMouseY, wheel);
      Console.Out.Flush();
      return new IntPtr(1);
    }
    return CallNextHookEx(mouseHook, code, wParam, lParam);
  }

  private static void PublishLatestMovement(object state) {
    if (Interlocked.Exchange(ref movementDirty, 0) == 0) return;
    if (Interlocked.CompareExchange(ref movementPublishBusy, 1, 0) != 0) {
      Interlocked.Exchange(ref movementDirty, 1);
      return;
    }
    try {
      Console.WriteLine("MOUSE|512|{0}|{1}|0", virtualMouseX, virtualMouseY);
      Console.Out.Flush();
      Interlocked.Increment(ref publishedMoveFrames);
    } finally {
      Interlocked.Exchange(ref movementPublishBusy, 0);
    }
  }

  private static void PublishHealth(object state) {
    long lastMovement = Interlocked.Read(ref lastUsableMovementTimestamp);
    long ageMs = lastMovement == 0
      ? -1
      : (long)((Stopwatch.GetTimestamp() - lastMovement) * 1000.0 / Stopwatch.Frequency);
    Console.WriteLine(
      "GUARD_HEALTH|PhysicalMoves={0}|InjectedMoves={1}|IgnoredRecenters={2}|PublishedFrames={3}|SetCursorFailures={4}|LastUsableMoveMs={5}|Virtual={6},{7}",
      Interlocked.Read(ref physicalMoveEvents),
      Interlocked.Read(ref injectedMoveEvents),
      Interlocked.Read(ref ignoredRecenterEvents),
      Interlocked.Read(ref publishedMoveFrames),
      Interlocked.Read(ref setCursorFailures),
      ageMs,
      virtualMouseX,
      virtualMouseY
    );
    Console.Out.Flush();
  }

  private static void Release() {
    Timer watcher = processWatchTimer;
    processWatchTimer = null;
    if (watcher != null) watcher.Dispose();
    Timer timer = movementPublishTimer;
    movementPublishTimer = null;
    if (timer != null) timer.Dispose();
    Timer healthTimer = healthPublishTimer;
    healthPublishTimer = null;
    if (healthTimer != null) healthTimer.Dispose();
    if (keyboardHook != IntPtr.Zero) UnhookWindowsHookEx(keyboardHook);
    if (mouseHook != IntPtr.Zero) UnhookWindowsHookEx(mouseHook);
    keyboardHook = IntPtr.Zero;
    mouseHook = IntPtr.Zero;
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'GUARD_ERROR|AoE2 process not found'; exit 2 }
$exitCode = [AoeInputGuard]::Run([uint32]$game.Id, [uint32]${process.pid})
exit $exitCode
`;

function stopInputGuard(): void {
  guardedModifiers.clear();
  if (inputGuardHeartbeatTimer) clearInterval(inputGuardHeartbeatTimer);
  inputGuardHeartbeatTimer = undefined;
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = undefined;
  const guard = inputGuardProcess;
  inputGuardProcess = undefined;
  inputGuardWindow = undefined;
  guard?.stdin?.end();
  guard?.kill();
}

function releaseAllInputSuppression(reason: string): void {
  setWindowsInputBlocked(false);
  stopInputGuard();
  console.info(`[AoE2 automation] INPUT_SAFETY_RELEASE|Reason=${reason}`);
}

function scheduleInputGuardStop(): void {
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = setTimeout(stopInputGuard, 750);
}

async function startInputGuard(window?: BrowserWindow | null): Promise<boolean> {
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = undefined;
  if (window && !window.isDestroyed()) {
    // Never swallow global physical input while another application owns the
    // foreground. Reassert the automation cover and give Windows a few event
    // turns to complete activation before starting (or reusing) the guard.
    for (let attempt = 1; !window.isFocused() && attempt <= 4; attempt += 1) {
      showMainWindowAsGameCover(window);
      await delay(50);
    }
    if (!window.isFocused()) {
      console.error("[AoE2 automation] INPUT_GUARD|FOREGROUND_REQUIRED|ElectronFocused=false");
      stopInputGuard();
      return false;
    }
    inputGuardWindow = window;
  }
  if (inputGuardProcess && !inputGuardProcess.killed) return true;
  inputGuardFrameSequence = 0;
  inputGuardLastAcknowledgedFrame = 0;
  inputGuardFramesReceived = 0;
  inputGuardFramesSent = 0;
  inputGuardFramesDiscarded = 0;
  inputGuardLastAcknowledgedAt = 0;
  const encodedScript = Buffer.from(inputGuardScript, "utf16le").toString("base64");
  const bootstrap = "[Text.Encoding]::Unicode.GetString([Convert]::FromBase64String([Console]::In.ReadLine())) | Invoke-Expression";
  const child = spawn("powershell.exe", [
    "-NoProfile", "-STA", "-OutputFormat", "Text", "-Command", bootstrap
  ], { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
  inputGuardProcess = child;
  const stdin = child.stdin;
  let heartbeatTimer: NodeJS.Timeout | undefined;
  let pipeFailed = false;
  const stopHeartbeat = () => {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (inputGuardHeartbeatTimer === heartbeatTimer) inputGuardHeartbeatTimer = undefined;
  };
  const failGuardPipe = (error: Error) => {
    if (pipeFailed) return;
    pipeFailed = true;
    stopHeartbeat();
    if (inputGuardProcess === child) inputGuardProcess = undefined;
    console.error(`[AoE2 automation] INPUT_GUARD_PIPE_ERROR|Code=${"code" in error ? String(error.code) : "unknown"}|${error.message}`);
    if (!child.killed) child.kill();
  };
  // Child-process errors and stdin errors are emitted by different streams.
  // Without this listener, a closed PowerShell pipe raises an uncaught EPIPE
  // from the heartbeat timer and terminates Electron's main process.
  stdin?.on("error", failGuardPipe);
  const sendHeartbeat = () => {
    if (pipeFailed || child.killed || !stdin || stdin.destroyed || stdin.writableEnded || !stdin.writable) {
      stopHeartbeat();
      return;
    }
    try {
      stdin.write("PING\n", (error) => {
        if (error) failGuardPipe(error);
      });
    } catch (error) {
      failGuardPipe(error instanceof Error ? error : new Error(String(error)));
    }
  };
  // Keep the large guard source off the Windows command line. The bootstrap
  // consumes this first line, then the running guard consumes heartbeat lines.
  try {
    stdin?.write(`${encodedScript}\n`, (error) => {
      if (error) failGuardPipe(error);
      else sendHeartbeat();
    });
  } catch (error) {
    failGuardPipe(error instanceof Error ? error : new Error(String(error)));
  }
  if (!pipeFailed) {
    heartbeatTimer = setInterval(sendHeartbeat, 500);
    heartbeatTimer.unref();
    inputGuardHeartbeatTimer = heartbeatTimer;
  }
  child.once("error", (error) => {
    stopHeartbeat();
    if (inputGuardProcess === child) inputGuardProcess = undefined;
    console.error(`[AoE2 automation] INPUT_GUARD_SPAWN_ERROR|${error.message}`);
  });
  child.stderr?.on("data", (chunk: Buffer) => {
    console.error(`[AoE2 automation] INPUT_GUARD_ERROR|${chunk.toString().trim()}`);
  });
  child.once("exit", (code) => {
    stopHeartbeat();
    if (inputGuardProcess === child) {
      inputGuardProcess = undefined;
    }
    console.info(`[AoE2 automation] INPUT_GUARD_EXIT|Code=${code ?? "null"}`);
  });
  return new Promise<boolean>((resolve) => {
    let settled = false;
    let stdoutBuffer = "";
    const finish = (ready: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ready);
    };
    if (pipeFailed) finish(false);
    child.once("error", () => finish(false));
    stdin?.once("error", () => finish(false));
    child.once("exit", () => finish(false));
    child.stdout?.on("data", (chunk: Buffer) => {
      stdoutBuffer += chunk.toString();
      const messages = stdoutBuffer.split(/\r?\n/);
      stdoutBuffer = messages.pop() ?? "";
      messages.filter(Boolean).forEach((message) => {
        if (message === "EXIT_REQUEST") {
          releaseAllInputSuppression("AltF4");
          app.quit();
          return;
        }
        if (message.startsWith("KEY|") || message.startsWith("MOUSE|")) {
          forwardGuardedInput(message);
          return;
        }
        const window = inputGuardWindow;
        let diagnostic = message;
        if (message.startsWith("GUARD_HEALTH|")) {
          const bounds = window && !window.isDestroyed() ? window.getContentBounds() : null;
          const display = bounds ? screen.getDisplayMatching(bounds) : null;
          diagnostic += `|MainReceived=${inputGuardFramesReceived}|MainSent=${inputGuardFramesSent}`
            + `|MainDiscarded=${inputGuardFramesDiscarded}|LastSequence=${inputGuardFrameSequence}`
            + `|RendererAck=${inputGuardLastAcknowledgedFrame}`
            + `|RendererAckAgeMs=${inputGuardLastAcknowledgedAt ? Date.now() - inputGuardLastAcknowledgedAt : -1}`
            + `|ElectronBounds=${bounds ? `${bounds.x},${bounds.y},${bounds.width},${bounds.height}` : "unavailable"}`
            + `|ScaleFactor=${display?.scaleFactor ?? "unknown"}`;
        }
        console.info(`[AoE2 automation] INPUT_GUARD|${diagnostic}`);
        if (window && !window.isDestroyed() && !window.webContents.isDestroyed()) {
          window.webContents.send("game:automation-log", `INPUT_GUARD|${diagnostic}`);
        }
        if (message.includes("GUARD_READY")) {
          const foregroundReady = !window || window.isDestroyed() ? false : window.isFocused();
          if (!foregroundReady) {
            console.error("[AoE2 automation] INPUT_GUARD|READY_FOREGROUND_LOST|ElectronFocused=false");
            stopInputGuard();
          }
          finish(foregroundReady);
        }
        if (message.includes("GUARD_ERROR")) finish(false);
      });
    });
    setTimeout(() => finish(false), 5_000);
  });
}

function forwardGuardedInput(message: string): void {
  const window = inputGuardWindow;
  if (!window || window.isDestroyed()) return;
  const parts = message.split("|");
  if (parts[0] === "KEY") {
    const action = parts[1];
    const virtualKey = Number(parts[2]);
    const modifier = guardedModifier(virtualKey);
    if (action === "DOWN" && modifier) guardedModifiers.add(modifier);
    const blockedEscapeShortcut = action === "DOWN" && (
      virtualKey === 0x1b
      || virtualKey === 0x5b
      || virtualKey === 0x5c
      || (virtualKey === 0x09 && guardedModifiers.has("alt"))
    );
    if (blockedEscapeShortcut) {
      window.webContents.send("game:lobby-guard-shortcut-blocked");
    }
    const keyCode = electronKeyCode(virtualKey);
    if (!keyCode) return;
    window.webContents.sendInputEvent({
      type: action === "UP" ? "keyUp" : "keyDown",
      keyCode,
      modifiers: [...guardedModifiers]
    });
    if (action === "DOWN") {
      const character = guardedCharacter(virtualKey, guardedModifiers.has("shift"));
      if (character && !guardedModifiers.has("control") && !guardedModifiers.has("alt")) {
        window.webContents.sendInputEvent({ type: "char", keyCode: character });
      }
    }
    if (action === "UP" && modifier) guardedModifiers.delete(modifier);
    return;
  }
  if (parts[0] !== "MOUSE") return;
  const messageId = Number(parts[1]);
  const screenPoint = screen.screenToDipPoint({ x: Number(parts[2]), y: Number(parts[3]) });
  const bounds = window.getContentBounds();
  const x = Math.round(screenPoint.x - bounds.x);
  const y = Math.round(screenPoint.y - bounds.y);
  if (messageId === 0x0200) inputGuardFramesReceived += 1;
  if (x < 0 || y < 0 || x >= bounds.width || y >= bounds.height) {
    if (messageId === 0x0200) inputGuardFramesDiscarded += 1;
    return;
  }
  if (messageId === 0x0200) {
    const sequence = ++inputGuardFrameSequence;
    window.webContents.send("game:lobby-guard-pointer", { x, y, sequence });
    inputGuardFramesSent += 1;
    window.webContents.sendInputEvent({ type: "mouseMove", x, y });
  } else if (messageId === 0x0201 || messageId === 0x0204 || messageId === 0x0207) {
    window.webContents.sendInputEvent({
      type: "mouseDown",
      x,
      y,
      button: messageId === 0x0201 ? "left" : messageId === 0x0204 ? "right" : "middle",
      clickCount: 1
    });
  } else if (messageId === 0x0202 || messageId === 0x0205 || messageId === 0x0208) {
    window.webContents.sendInputEvent({
      type: "mouseUp",
      x,
      y,
      button: messageId === 0x0202 ? "left" : messageId === 0x0205 ? "right" : "middle",
      clickCount: 1
    });
  } else if (messageId === 0x020a) {
    window.webContents.sendInputEvent({ type: "mouseWheel", x, y, deltaY: Number(parts[4]) });
  }
}

function guardedModifier(virtualKey: number): "shift" | "control" | "alt" | undefined {
  if (virtualKey === 0x10 || virtualKey === 0xa0 || virtualKey === 0xa1) return "shift";
  if (virtualKey === 0x11 || virtualKey === 0xa2 || virtualKey === 0xa3) return "control";
  if (virtualKey === 0x12 || virtualKey === 0xa4 || virtualKey === 0xa5) return "alt";
  return undefined;
}

function guardedCharacter(virtualKey: number, shifted: boolean): string | undefined {
  // Chromium expects the character phase of a native Return sequence before
  // applying the focused form control's default submit behavior.
  if (virtualKey === 0x0d) return "\r";
  if (virtualKey >= 0x41 && virtualKey <= 0x5a) {
    const letter = String.fromCharCode(virtualKey);
    return shifted ? letter : letter.toLowerCase();
  }
  if (virtualKey >= 0x30 && virtualKey <= 0x39) {
    return shifted ? ")!@#$%^&*("[virtualKey - 0x30] : String.fromCharCode(virtualKey);
  }
  if (virtualKey === 0x20) return " ";
  const pair = ({
    0xba: [";", ":"], 0xbb: ["=", "+"], 0xbc: [",", "<"], 0xbd: ["-", "_"],
    0xbe: [".", ">"], 0xbf: ["/", "?"], 0xc0: ["`", "~"], 0xdb: ["[", "{"],
    0xdc: ["\\", "|"], 0xdd: ["]", "}"], 0xde: ["'", "\""]
  } as Record<number, [string, string]>)[virtualKey];
  return pair?.[shifted ? 1 : 0];
}

function electronKeyCode(virtualKey: number): string | undefined {
  if (virtualKey >= 0x41 && virtualKey <= 0x5a) return String.fromCharCode(virtualKey);
  if (virtualKey >= 0x30 && virtualKey <= 0x39) return String.fromCharCode(virtualKey);
  const keys: Record<number, string> = {
    0x08: "Backspace",
    0x09: "Tab",
    0x0d: "Enter",
    0x10: "Shift",
    0x11: "Control",
    0x12: "Alt",
    0x1b: "Escape",
    0x20: "Space",
    0x21: "PageUp",
    0x22: "PageDown",
    0x23: "End",
    0x24: "Home",
    0x25: "Left",
    0x26: "Up",
    0x27: "Right",
    0x28: "Down",
    0x2e: "Delete",
    0x60: "num0", 0x61: "num1", 0x62: "num2", 0x63: "num3", 0x64: "num4",
    0x65: "num5", 0x66: "num6", 0x67: "num7", 0x68: "num8", 0x69: "num9",
    0x6a: "*", 0x6b: "+", 0x6d: "-", 0x6e: ".", 0x6f: "/",
    0xba: ";", 0xbb: "=", 0xbc: ",", 0xbd: "-", 0xbe: ".", 0xbf: "/",
    0xc0: "`", 0xdb: "[", 0xdc: "\\", 0xdd: "]", 0xde: "'"
  };
  return keys[virtualKey];
}

const createLobbySequenceScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeSequence {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);
  [DllImport("user32.dll")] private static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] private static extern bool ShowWindow(IntPtr hWnd, int command);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static bool Send(IntPtr window, int virtualKey, int downLParam, int upLParam) {
    bool down = PostMessage(window, 0x0100, new IntPtr(virtualKey), new IntPtr(downLParam));
    bool up = PostMessage(window, 0x0101, new IntPtr(virtualKey), new IntPtr(upLParam));
    return down && up;
  }

  public static bool Activate(IntPtr window) {
    ShowWindow(window, 9);
    SetForegroundWindow(window);
    return GetForegroundWindow() == window;
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'ERROR|AoE2 process not found'; exit 2 }
$window = [AoeSequence]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'ERROR|AoE2 window not found'; exit 3 }

function Send-Tab([int]$count, [string]$stage) {
  for ($index = 1; $index -le $count; $index++) {
    $sent = [AoeSequence]::Send($window, 0x09, 0x000F0001, [int]0xC00F0001)
    Write-Output "SEQUENCE|$stage|Tab=$index/$count|Sent=$sent"
    if (-not $sent) { exit 4 }
    Start-Sleep -Milliseconds 135
  }
}

function Send-Enter([string]$stage) {
  $sent = [AoeSequence]::Send($window, 0x0D, 0x001C0001, [int]0xC01C0001)
  Write-Output "SEQUENCE|$stage|Enter|Sent=$sent"
  if (-not $sent) { exit 5 }
}

Write-Output 'SEQUENCE|Start|ExpectedScreen=Main Menu'
Send-Tab 6 'Main Menu'
$activated = [AoeSequence]::Activate($window)
Write-Output "SEQUENCE|Main Menu|ActivateBeforeMultiplayer=$activated"
Start-Sleep -Milliseconds 188
Send-Enter 'Open Multiplayer'
Start-Sleep -Milliseconds 750
Send-Tab 5 'Multiplayer'
Send-Enter 'Open Host Game'
Start-Sleep -Milliseconds 1350
Send-Tab 11 'Lobby Settings'
Send-Enter 'Create Lobby'
Write-Output 'SEQUENCE|Lobby URI|Waiting=14000ms'
Start-Sleep -Seconds 14
Set-Clipboard -Value ''
Send-Tab 49 'Created Lobby'
Send-Enter 'Reset Lobby Settings'
Start-Sleep -Milliseconds 300
Send-Tab 2 'Reset or Copy Game ID'
Send-Enter 'Copy Game ID or Decline Reset Confirmation'
Start-Sleep -Milliseconds 600
$clipboard = Get-Clipboard -Raw
$lobbyUri = [regex]::Match([string]$clipboard, 'aoe2de://0/[0-9]+').Value
if (-not $lobbyUri) {
  Write-Output 'SEQUENCE|Reset Confirmation|Detected=True|Action=No|SettingsReset=True'
  Send-Tab 2 'Reset Lobby Settings Applied'
  Send-Enter 'Copy Game ID After Reset'
  Start-Sleep -Milliseconds 600
  $clipboard = Get-Clipboard -Raw
  $lobbyUri = [regex]::Match([string]$clipboard, 'aoe2de://0/[0-9]+').Value
  if (-not $lobbyUri) {
    Write-Output 'ERROR|Lobby URI was not copied after reset handling'
    exit 7
  }
}
Write-Output "LOBBY_URI|$lobbyUri"
Write-Output 'SEQUENCE|Complete=True'
`;

const hostGameMouseClickScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeMouseClick {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [StructLayout(LayoutKind.Sequential)] private struct Rect { public int Left, Top, Right, Bottom; }
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool GetClientRect(IntPtr hWnd, out Rect rect);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static string ClickDesignPoint(IntPtr window, int designX, int designY) {
    Rect rect;
    if (!GetClientRect(window, out rect)) return "CLIENT_RECT_FAILED";
    int width = rect.Right - rect.Left;
    int height = rect.Bottom - rect.Top;
    if (width <= 0 || height <= 0) return "INVALID_CLIENT_SIZE";
    int x = (int)Math.Round(designX * width / 3840.0);
    int y = (int)Math.Round(designY * height / 2160.0);
    IntPtr position = new IntPtr((y << 16) | (x & 0xffff));
    bool moved = PostMessage(window, 0x0200, IntPtr.Zero, position);
    bool down = PostMessage(window, 0x0201, new IntPtr(1), position);
    bool up = PostMessage(window, 0x0202, IntPtr.Zero, position);
    return String.Format("{0}|Client={1}x{2}|Point={3},{4}", moved && down && up ? "SENT" : "POST_FAILED", width, height, x, y);
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }
$window = [AoeMouseClick]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'WINDOW_NOT_FOUND'; exit 3 }
$result = [AoeMouseClick]::ClickDesignPoint($window, __DESIGN_X__, __DESIGN_Y__)
Write-Output $result
if ($result.StartsWith('SENT')) { exit 0 }
exit 4
`;

const foregroundPhysicalInputScriptTemplate = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
using System.Threading;
public static class AoeForegroundMouseClick {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [StructLayout(LayoutKind.Sequential)] private struct Rect { public int Left, Top, Right, Bottom; }
  [StructLayout(LayoutKind.Sequential)] private struct Point { public int X, Y; }
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool GetClientRect(IntPtr hWnd, out Rect rect);
  [DllImport("user32.dll")] private static extern bool ClientToScreen(IntPtr hWnd, ref Point point);
  [DllImport("user32.dll")] private static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] private static extern IntPtr WindowFromPoint(Point point);
  [DllImport("user32.dll")] private static extern IntPtr GetAncestor(IntPtr window, uint flags);
  [DllImport("user32.dll")] private static extern bool GetCursorPos(out Point point);
  [DllImport("user32.dll")] private static extern bool GetClipCursor(out Rect rect);
  [DllImport("user32.dll", EntryPoint = "ClipCursor")] private static extern bool ClipCursorRect(ref Rect rect);
  [DllImport("user32.dll", EntryPoint = "ClipCursor")] private static extern bool ReleaseCursorClip(IntPtr rect);
  [DllImport("user32.dll")] private static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] private static extern bool BlockInput(bool block);
  [DllImport("user32.dll")] private static extern void mouse_event(uint flags, uint dx, uint dy, uint data, UIntPtr extraInfo);
  [DllImport("user32.dll")] private static extern void keybd_event(byte virtualKey, byte scanCode, uint flags, UIntPtr extraInfo);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    long largestArea = 0;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        Rect rect;
        if (GetClientRect(window, out rect)) {
          long area = (long)(rect.Right - rect.Left) * (rect.Bottom - rect.Top);
          if (area > largestArea) {
            largestArea = area;
            found = window;
          }
        }
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static string ClickDesignPoint(IntPtr window, int designX, int designY) {
    Rect rect;
    if (!GetClientRect(window, out rect)) return "CLIENT_RECT_FAILED";
    int width = rect.Right - rect.Left;
    int height = rect.Bottom - rect.Top;
    if (width <= 0 || height <= 0) return "INVALID_CLIENT_SIZE";
    Point point = new Point {
      X = (int)Math.Round(designX * width / 3840.0),
      Y = (int)Math.Round(designY * height / 2160.0)
    };
    if (!ClientToScreen(window, ref point)) return "SCREEN_POINT_FAILED";
    uint targetProcessId;
    GetWindowThreadProcessId(window, out targetProcessId);
    bool alreadyForeground = GetForegroundWindow() == window;
    bool focused = alreadyForeground || SetForegroundWindow(window);
    DateTime focusDeadline = DateTime.UtcNow.AddMilliseconds(1500);
    while (GetForegroundWindow() != window && DateTime.UtcNow < focusDeadline) {
      SetForegroundWindow(window);
      Thread.Sleep(25);
    }
    bool foregroundVerified = GetForegroundWindow() == window;
    if (!foregroundVerified) {
      return String.Format("FOREGROUND_NOT_READY|Focused={0}|ExpectedWindow={1}|ActualWindow={2}",
        focused, window, GetForegroundWindow());
    }
    if (!alreadyForeground) Thread.Sleep(300);
    Point original;
    if (!GetCursorPos(out original)) return "CURSOR_POSITION_FAILED";
    Rect originalClip;
    bool hadOriginalClip = GetClipCursor(out originalClip);
    Rect targetClip = new Rect {
      Left = point.X,
      Top = point.Y,
      Right = point.X + 1,
      Bottom = point.Y + 1
    };
    bool clipped = ClipCursorRect(ref targetClip);
    bool blocked = BlockInput(true);
    bool moved = false;
    bool restored = false;
    uint hitProcessId = 0;
    bool hitVerified = false;
    try {
      moved = SetCursorPos(point.X, point.Y);
      Thread.Sleep(25);
      DateTime hitDeadline = DateTime.UtcNow.AddMilliseconds(500);
      do {
        IntPtr hitWindow = GetAncestor(WindowFromPoint(point), 2);
        GetWindowThreadProcessId(hitWindow, out hitProcessId);
        hitVerified = hitProcessId == targetProcessId && GetForegroundWindow() == window;
        if (!hitVerified) Thread.Sleep(25);
      } while (!hitVerified && DateTime.UtcNow < hitDeadline);
      if (!hitVerified) {
        return String.Format("CLICK_TARGET_NOT_READY|ForegroundVerified={0}|TargetPid={1}|HitPid={2}|ExpectedWindow={3}|ActualForeground={4}",
          GetForegroundWindow() == window, targetProcessId, hitProcessId, window, GetForegroundWindow());
      }
      mouse_event(0x0002, 0, 0, 0, UIntPtr.Zero);
      Thread.Sleep(15);
      mouse_event(0x0004, 0, 0, 0, UIntPtr.Zero);
    } finally {
      if (blocked) BlockInput(false);
      if (hadOriginalClip) {
        ClipCursorRect(ref originalClip);
      } else {
        ReleaseCursorClip(IntPtr.Zero);
      }
      restored = SetCursorPos(original.X, original.Y);
    }
    return String.Format("SENT|Mode=ForegroundPhysicalRestore|Focused={0}|ForegroundVerified={1}|TargetPid={2}|HitPid={3}|CursorClipped={4}|InputBlocked={5}|Moved={6}|Restored={7}|Client={8}x{9}|ScreenPoint={10},{11}|OriginalPoint={12},{13}",
      focused, foregroundVerified, targetProcessId, hitProcessId, clipped, blocked, moved, restored,
      width, height, point.X, point.Y, original.X, original.Y);
  }

  public static string SendEnter(IntPtr window) {
    bool focused = SetForegroundWindow(window);
    bool blocked = BlockInput(true);
    try {
      Thread.Sleep(25);
      keybd_event(0x0D, 0x1C, 0, UIntPtr.Zero);
      Thread.Sleep(15);
      keybd_event(0x0D, 0x1C, 0x0002, UIntPtr.Zero);
    } finally {
      if (blocked) BlockInput(false);
    }
    return String.Format("SENT|Mode=ForegroundPhysicalKey|Key=ENTER|Focused={0}|InputBlocked={1}", focused, blocked);
  }
}
'@
Add-Type -TypeDefinition $interop
__ACTION_SCRIPT__
`;

const createLobbyCursorSequenceScript = foregroundPhysicalInputScriptTemplate.replace("__ACTION_SCRIPT__", String.raw`
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }

function Click-Step([string]$name, [int]$x, [int]$y, [int]$exitCode) {
  $window = [AoeForegroundMouseClick]::Find([uint32]$game.Id)
  if ($window -eq [IntPtr]::Zero) { Write-Output "STEP|$name|WINDOW_NOT_FOUND"; exit 3 }
  $result = [AoeForegroundMouseClick]::ClickDesignPoint($window, $x, $y)
  Write-Output "STEP|$name|DesignPoint=$x,$y|$result"
  if (-not $result.StartsWith('SENT')) { exit $exitCode }
}

Click-Step 'Multiplayer' 734 1085 4
Start-Sleep -Milliseconds ${lobbySetupTiming.multiplayerMenuMs}
Click-Step 'Host Game' 2774 1202 5
Start-Sleep -Milliseconds ${lobbySetupTiming.hostGameMenuMs}
Click-Step 'Create Lobby' 1688 1614 6
Start-Sleep -Milliseconds ${lobbySetupTiming.lobbyCreationMs}
Click-Step 'Reset Settings' 3101 1976 7
Start-Sleep -Milliseconds ${lobbySetupTiming.resetFocusMs}
$window = [AoeForegroundMouseClick]::Find([uint32]$game.Id)
$confirmReset = [AoeForegroundMouseClick]::SendEnter($window)
Write-Output "STEP|Confirm Reset|Key=ENTER|$confirmReset"
Start-Sleep -Milliseconds ${lobbySetupTiming.resetConfirmationMs}
Set-Clipboard -Value 'EL_CURSOR_COPY_PENDING'
Click-Step 'Copy Game ID' 3245 372 8
Start-Sleep -Milliseconds ${lobbySetupTiming.clipboardReadMs}
$clipboard = Get-Clipboard -Raw
$lobbyUri = [regex]::Match([string]$clipboard, 'aoe2de://0/[0-9]+').Value
if (-not $lobbyUri) {
  Start-Sleep -Milliseconds ${lobbySetupRetryTiming.beforeClipboardRetryMs}
  Click-Step 'Copy Game ID Retry' 3245 372 9
  Start-Sleep -Milliseconds ${lobbySetupRetryTiming.clipboardReadMs}
  $clipboard = Get-Clipboard -Raw
  $lobbyUri = [regex]::Match([string]$clipboard, 'aoe2de://0/[0-9]+').Value
}
if (-not $lobbyUri) { Write-Output 'ERROR|Lobby URI was not copied'; exit 10 }
Write-Output "LOBBY_URI|$lobbyUri"
Write-Output 'SEQUENCE|Complete=True|Mode=Cursor'
exit 0
`);

function createLobbyCursorActionScript(target: "content-confirm" | "guest-ready" | "host-ready" | "start"): string {
  const action = target === "content-confirm"
    ? { label: "Accept Unverified Lobby Content", x: 1600, y: 1400 }
    : target === "guest-ready"
    ? { label: "Guest Ready", x: 1413, y: 1875 }
    : target === "host-ready"
      ? { label: "Host Ready", x: 1388, y: 1979 }
      : { label: "Start Game", x: 1974, y: 1979 };
  return foregroundPhysicalInputScriptTemplate.replace("__ACTION_SCRIPT__", String.raw`
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }
$window = [AoeForegroundMouseClick]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'WINDOW_NOT_FOUND'; exit 3 }
$result = [AoeForegroundMouseClick]::ClickDesignPoint($window, ${action.x}, ${action.y})
Write-Output "STEP|${action.label}|DesignPoint=${action.x},${action.y}|$result"
if ($result.StartsWith('SENT')) { exit 0 }
exit 4
`);
}

const hostGameMouseCalibrationScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
public static class AoeMouseCalibration {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [StructLayout(LayoutKind.Sequential)] private struct Rect { public int Left, Top, Right, Bottom; }
  [StructLayout(LayoutKind.Sequential)] private struct Point { public int X, Y; }
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool GetClientRect(IntPtr hWnd, out Rect rect);
  [DllImport("user32.dll")] private static extern bool GetCursorPos(out Point point);
  [DllImport("user32.dll")] private static extern bool ScreenToClient(IntPtr hWnd, ref Point point);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static string ClickCursorPoint(IntPtr window) {
    Rect rect;
    Point point;
    if (!GetClientRect(window, out rect) || !GetCursorPos(out point) || !ScreenToClient(window, ref point)) return "COORDINATE_FAILED";
    int width = rect.Right - rect.Left;
    int height = rect.Bottom - rect.Top;
    if (point.X < 0 || point.Y < 0 || point.X >= width || point.Y >= height) {
      return String.Format("CURSOR_OUTSIDE|Client={0}x{1}|Point={2},{3}", width, height, point.X, point.Y);
    }
    IntPtr position = new IntPtr((point.Y << 16) | (point.X & 0xffff));
    bool moved = PostMessage(window, 0x0200, IntPtr.Zero, position);
    bool down = PostMessage(window, 0x0201, new IntPtr(1), position);
    bool up = PostMessage(window, 0x0202, IntPtr.Zero, position);
    int designX = (int)Math.Round(point.X * 3840.0 / width);
    int designY = (int)Math.Round(point.Y * 2160.0 / height);
    return String.Format("{0}|Client={1}x{2}|Point={3},{4}|DesignPoint={5},{6}", moved && down && up ? "SENT" : "POST_FAILED", width, height, point.X, point.Y, designX, designY);
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }
$window = [AoeMouseCalibration]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'WINDOW_NOT_FOUND'; exit 3 }
Start-Sleep -Seconds 5
$result = [AoeMouseCalibration]::ClickCursorPoint($window)
Write-Output $result
if ($result.StartsWith('SENT')) { exit 0 }
exit 4
`;

const fakeActivationMouseClickScript = String.raw`
$ProgressPreference = 'SilentlyContinue'
$interop = @'
using System;
using System.Runtime.InteropServices;
using System.Threading;
public static class AoeFakeActivationClick {
  private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [StructLayout(LayoutKind.Sequential)] private struct Rect { public int Left, Top, Right, Bottom; }
  [DllImport("user32.dll")] private static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] private static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] private static extern bool GetClientRect(IntPtr hWnd, out Rect rect);
  [DllImport("user32.dll")] private static extern bool PostMessage(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam);

  public static IntPtr Find(uint targetProcessId) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((window, _) => {
      uint processId;
      GetWindowThreadProcessId(window, out processId);
      if (processId == targetProcessId && IsWindowVisible(window)) {
        found = window;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }

  public static string Click(IntPtr window, int designX, int designY) {
    Rect rect;
    if (!GetClientRect(window, out rect)) return "CLIENT_RECT_FAILED";
    int width = rect.Right - rect.Left;
    int height = rect.Bottom - rect.Top;
    int x = (int)Math.Round(designX * width / 3840.0);
    int y = (int)Math.Round(designY * height / 2160.0);
    IntPtr position = new IntPtr((y << 16) | (x & 0xffff));

    bool activate = PostMessage(window, 0x0006, new IntPtr(1), IntPtr.Zero);
    bool focus = PostMessage(window, 0x0007, IntPtr.Zero, IntPtr.Zero);
    bool mouseActivate = PostMessage(window, 0x0021, window, new IntPtr(0x02010001));
    Thread.Sleep(100);
    bool moved = PostMessage(window, 0x0200, IntPtr.Zero, position);
    bool down = PostMessage(window, 0x0201, new IntPtr(1), position);
    bool up = PostMessage(window, 0x0202, IntPtr.Zero, position);
    Thread.Sleep(100);
    bool blur = PostMessage(window, 0x0008, IntPtr.Zero, IntPtr.Zero);
    bool deactivate = PostMessage(window, 0x0006, IntPtr.Zero, IntPtr.Zero);

    bool sent = activate && focus && mouseActivate && moved && down && up && blur && deactivate;
    return String.Format("{0}|Client={1}x{2}|Point={3},{4}|DesignPoint={5},{6}|Activate={7}|Focus={8}|MouseActivate={9}|Move={10}|Down={11}|Up={12}|Blur={13}|Deactivate={14}",
      sent ? "SENT" : "POST_FAILED", width, height, x, y, designX, designY,
      activate, focus, mouseActivate, moved, down, up, blur, deactivate);
  }
}
'@
Add-Type -TypeDefinition $interop
$game = Get-Process -Name 'AoE2DE_s' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $game) { Write-Output 'PROCESS_NOT_FOUND'; exit 2 }
$window = [AoeFakeActivationClick]::Find([uint32]$game.Id)
if ($window -eq [IntPtr]::Zero) { Write-Output 'WINDOW_NOT_FOUND'; exit 3 }
$result = [AoeFakeActivationClick]::Click($window, 2760, 795)
Write-Output $result
if ($result.StartsWith('SENT')) { exit 0 }
exit 4
`;

function stopTabTest(): void {
  if (tabTestProcess && !tabTestProcess.killed) tabTestProcess.kill();
  tabTestProcess = undefined;
}

process.once("exit", stopTabTest);

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readRegistryValue(key: string, value: string): Promise<string | undefined> {
  if (process.platform !== "win32") return undefined;

  try {
    const { stdout } = await execFileAsync("reg.exe", ["query", key, "/v", value], {
      windowsHide: true
    });
    const match = stdout.match(new RegExp(`${value}\\s+REG_\\w+\\s+(.+)$`, "im"));
    return match?.[1]?.trim();
  } catch {
    return undefined;
  }
}

async function getSteamRoots(): Promise<string[]> {
  const registryRoots = await Promise.all([
    readRegistryValue("HKCU\\Software\\Valve\\Steam", "SteamPath"),
    readRegistryValue("HKLM\\Software\\WOW6432Node\\Valve\\Steam", "InstallPath"),
    readRegistryValue("HKLM\\Software\\Valve\\Steam", "InstallPath")
  ]);
  const programFiles = process.env.ProgramFiles;
  const programFilesX86 = process.env["ProgramFiles(x86)"];

  return [...new Set([
    ...registryRoots,
    programFilesX86 ? join(programFilesX86, "Steam") : undefined,
    programFiles ? join(programFiles, "Steam") : undefined
  ].filter((path): path is string => Boolean(path)))];
}

async function getSteamExecutable(): Promise<string | undefined> {
  for (const steamRoot of await getSteamRoots()) {
    const executablePath = join(steamRoot, "steam.exe");
    if (await pathExists(executablePath)) return executablePath;
  }
  return undefined;
}

async function getAoeUrlHelperExecutable(gamePath?: string): Promise<string | undefined> {
  const programFiles = process.env.ProgramFiles;
  const programFilesX86 = process.env["ProgramFiles(x86)"];
  const candidates = [
    gamePath ? join(gamePath, "Tools_Builds", "AOEURLHelper.exe") : undefined,
    programFilesX86 ? join(programFilesX86, "AOE URL Helper", "AOEURLHelper.exe") : undefined,
    programFiles ? join(programFiles, "AOE URL Helper", "AOEURLHelper.exe") : undefined
  ].filter((path): path is string => Boolean(path));
  for (const executablePath of candidates) {
    if (await pathExists(executablePath)) return executablePath;
  }
  return undefined;
}

async function getSteamAppsFolders(steamRoot: string): Promise<string[]> {
  const defaultSteamApps = join(steamRoot, "steamapps");
  const folders = [defaultSteamApps];

  try {
    const vdf = await readFile(join(defaultSteamApps, "libraryfolders.vdf"), "utf8");
    for (const match of vdf.matchAll(/"path"\s+"([^"]+)"/g)) {
      folders.push(join(match[1].replace(/\\\\/g, "\\"), "steamapps"));
    }
  } catch {
    // The default Steam library can still be checked without this file.
  }

  return [...new Set(folders)];
}

async function detectAoe2Installation() {
  if (process.platform !== "win32") {
    return { installed: false, message: "Automatic Steam detection is currently supported on Windows only." };
  }

  const steamRoots = await getSteamRoots();
  const steamAppsFolders = (await Promise.all(steamRoots.map(getSteamAppsFolders))).flat();

  for (const steamApps of [...new Set(steamAppsFolders)]) {
    const manifestPath = join(steamApps, `appmanifest_${aoe2AppId}.acf`);
    try {
      const manifest = await readFile(manifestPath, "utf8");
      const installDir = manifest.match(/"installdir"\s+"([^"]+)"/i)?.[1];
      if (!installDir) continue;

      const gamePath = join(steamApps, "common", installDir);
      const executablePath = join(gamePath, "AoE2DE_s.exe");
      if (await pathExists(executablePath)) {
        return { installed: true, path: gamePath, message: "AoE2: Definitive Edition was found through Steam." };
      }
    } catch {
      // This Steam library does not contain the AoE2 DE manifest.
    }
  }

  return {
    installed: false,
    message: steamRoots.length === 0
      ? "Steam was not detected. Make sure Steam is installed for this Windows user."
      : "Steam was found, but AoE2: Definitive Edition was not found in any configured Steam library. Verify the game is installed, then try again."
  };
}

async function runSteamFamilyProbe(expectedSteamId?: string): Promise<SteamFamilyProbeResult> {
  const events: SteamFamilyProbeResult["events"] = [];
  const startedAt = new Date();
  const logDirectory = join(app.getPath("userData"), "logs", "steam-family-probe");
  const logPath = join(logDirectory, `${startedAt.toISOString().replace(/[:.]/g, "-")}.jsonl`);

  if (process.platform !== "win32") {
    return {
      status: "unknown",
      exitCode: null,
      logPath,
      events,
      message: "The Steam family probe currently supports Windows only."
    };
  }
  if (expectedSteamId && !/^\d{17}$/.test(expectedSteamId)) {
    throw new Error("The expected Steam ID must be a 17-digit SteamID64.");
  }

  const installation = await detectAoe2Installation();
  if (!installation.installed || !installation.path) {
    return {
      status: "unknown",
      exitCode: null,
      logPath,
      events,
      message: installation.message ?? "AoE2 could not be located."
    };
  }

  const dllPath = join(installation.path, "steam_api64.dll");
  if (!(await pathExists(dllPath))) {
    return {
      status: "unknown",
      exitCode: null,
      logPath,
      events,
      message: `Steamworks library was not found at ${dllPath}.`
    };
  }

  const probeScript = join(currentDir, "..", "steamFamilyProbe.js");
  const processStatus = await detectAoe2Process();
  const mainEvent = {
    at: new Date().toISOString(),
    level: "info" as const,
    event: "electron_probe_context",
    data: {
      electronPid: process.pid,
      aoe2Running: processStatus.running,
      aoe2Pid: processStatus.pid,
      installationPath: installation.path,
      probeScript,
      dllPath
    }
  };

  const childResult = await new Promise<{ exitCode: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = execFile(
      process.execPath,
      [probeScript, dllPath, expectedSteamId ?? ""],
      {
        cwd: installation.path,
        env: {
          ...process.env,
          ELECTRON_RUN_AS_NODE: "1",
          SteamAppId: aoe2AppId,
          SteamGameId: aoe2AppId,
          SteamOverlayGameId: aoe2AppId
        },
        timeout: 20_000,
        windowsHide: true,
        maxBuffer: 2 * 1024 * 1024
      },
      (error, stdout, stderr) => {
        const exitCode = error && "code" in error && typeof error.code === "number" ? error.code : child.exitCode;
        resolve({ exitCode, stdout, stderr });
      }
    );
  });

  events.push(mainEvent);
  for (const line of childResult.stdout.split(/\r?\n/).filter(Boolean)) {
    try {
      events.push(JSON.parse(line) as SteamFamilyProbeResult["events"][number]);
    } catch {
      events.push({
        at: new Date().toISOString(),
        level: "warn",
        event: "unparsed_stdout",
        data: { line }
      });
    }
  }
  if (childResult.stderr.trim()) {
    events.push({
      at: new Date().toISOString(),
      level: "error",
      event: "probe_stderr",
      data: { text: childResult.stderr.trim() }
    });
  }

  await mkdir(logDirectory, { recursive: true });
  await writeFile(logPath, `${events.map((event) => JSON.stringify(event)).join("\n")}\n`, "utf8");

  const finished = [...events].reverse().find((event) => event.event === "probe_finished");
  const rawStatus = finished?.data?.status;
  const status: SteamFamilyProbeResult["status"] =
    rawStatus === "owned" || rawStatus === "family_shared" ? rawStatus : "unknown";
  const currentSteamId = typeof finished?.data?.currentSteamId === "string"
    ? finished.data.currentSteamId
    : undefined;
  const ownerSteamId = typeof finished?.data?.ownerSteamId === "string"
    ? finished.data.ownerSteamId
    : undefined;
  const familySharedFlag = typeof finished?.data?.familySharedFlag === "boolean"
    ? finished.data.familySharedFlag
    : undefined;
  const identityMatchesLogin = typeof finished?.data?.identityMatchesLogin === "boolean"
    ? finished.data.identityMatchesLogin
    : undefined;
  const message = status === "family_shared"
    ? `Family sharing detected. Raw diagnostics saved to ${logPath}`
    : status === "owned"
      ? `Steam reports that this account owns the selected AoE2 license. Raw diagnostics saved to ${logPath}`
      : `Steam could not determine AoE2 license ownership from the companion process. Raw diagnostics saved to ${logPath}`;

  return {
    status,
    currentSteamId,
    ownerSteamId,
    familySharedFlag,
    identityMatchesLogin,
    exitCode: childResult.exitCode,
    logPath,
    events,
    message
  };
}

type UiWidget = Record<string, unknown>;

function decodeLocalizedText(value: string): string {
  return value
    .replace(/\\n/g, " ")
    .replace(/\\r/g, "")
    .replace(/\\t/g, " ")
    .replace(/\\"/g, '"')
    .replace(/Î“Ã‡Ã–/g, "'")
    .trim();
}

async function inspectCreateLobbyUi(gamePath: string): Promise<string[]> {
  const widgetUiPath = join(gamePath, "widgetui");
  const screenPath = join(widgetUiPath, "dialogcreatemultiplayergame.json");
  const stringReferencePath = join(widgetUiPath, "stringreference.json");
  const localizationPath = join(gamePath, "resources", "en", "strings", "key-value", "key-value-strings-utf8.txt");
  const [screenText, stringReferenceText, localizationText] = await Promise.all([
    readFile(screenPath, "utf8"),
    readFile(stringReferencePath, "utf8"),
    readFile(localizationPath, "utf8")
  ]);

  const screen = JSON.parse(screenText) as { Collection?: UiWidget };
  const stringReferences = JSON.parse(stringReferenceText) as Record<string, number>;
  const localizedStrings = new Map<string, string>();

  for (const rawLine of localizationText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//")) continue;
    const match = line.match(/^(\d+|[A-Z][A-Z0-9_]*)\s+"(.*)"\s*(?:\/\/.*)?$/);
    if (match) localizedStrings.set(match[1], decodeLocalizedText(match[2]));
  }

  function resolveString(value: unknown): string | undefined {
    if (typeof value !== "string" && typeof value !== "number") return undefined;
    const key = String(value);
    const direct = localizedStrings.get(key);
    if (direct) return direct;
    const numericReference = stringReferences[key];
    if (numericReference !== undefined) return localizedStrings.get(String(numericReference));
    return typeof value === "string" && !value.startsWith("IDS_") ? value : undefined;
  }

  const widgets = new Map<string, UiWidget>();
  function collectWidgets(value: unknown): void {
    if (Array.isArray(value)) {
      value.forEach(collectWidgets);
      return;
    }
    if (!value || typeof value !== "object") return;
    const object = value as UiWidget;
    if (typeof object.Name === "string" && typeof object.Type === "string") {
      widgets.set(object.Name, object);
    }
    Object.values(object).forEach(collectWidgets);
  }
  collectWidgets(screen.Collection);

  const collectionName = typeof screen.Collection?.Name === "string"
    ? screen.Collection.Name
    : "Unknown screen";
  const tabOrder = Array.isArray(screen.Collection?.TabOrder)
    ? screen.Collection.TabOrder as Array<{ Tab?: unknown }>
    : [];
  const lines = [
    `INSPECT|Screen=${collectionName}|File=dialogcreatemultiplayergame.json`,
    `INSPECT|Widgets=${widgets.size}|TabStops=${tabOrder.length}|Language=en`
  ];

  const tabWidgetNames = new Set<string>();
  function inferTabLabel(path: string, name: string, widget: UiWidget): string {
    const direct = resolveString(widget.AccessibilityName ?? widget.AccessibilityTextOverride)
      ?? resolveString(widget.Text);
    if (direct) return direct;

    const parentName = path.split("/").at(-2);
    if (parentName?.endsWith("Anchor")) {
      const siblingLabel = widgets.get(`${parentName.slice(0, -"Anchor".length)}Label`);
      const siblingText = siblingLabel
        ? resolveString(siblingLabel.AccessibilityName ?? siblingLabel.AccessibilityTextOverride)
          ?? resolveString(siblingLabel.Text)
        : undefined;
      if (siblingText) return siblingText;
    }

    return name
      .replace(/InputField|InputBox|CheckBox|DropDown|Button/g, "")
      .replace(/^Min(?=[A-Z])/, "Minimum")
      .replace(/^Max(?=[A-Z])/, "Maximum")
      .replace(/Civ$/, "Civilizations")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .trim() || "Unknown";
  }

  tabOrder.forEach((entry, index) => {
    const path = typeof entry.Tab === "string" ? entry.Tab : "";
    const name = path.split("/").at(-1) ?? path;
    tabWidgetNames.add(name);
    const widget = widgets.get(name);
    if (!widget) {
      lines.push(`TAB_ORDER|${index + 1}|Path=${path}|Widget=Not found`);
      return;
    }
    const label = inferTabLabel(path, name, widget);
    const help = resolveString(widget.Help);
    lines.push([
      `TAB_ORDER|${index + 1}`,
      `Name=${name}`,
      `Type=${String(widget.Type)}`,
      `Label=${label}`,
      `Help=${help ?? ""}`,
      `Path=${path}`
    ].join("|"));
  });

  const semanticWidgets = [...widgets.values()]
    .filter((widget) => widget.AccessibilityName !== undefined
      || widget.AccessibilityTextOverride !== undefined
      || widget.Text !== undefined
      || widget.Help !== undefined)
    .sort((left, right) => String(left.Name).localeCompare(String(right.Name)));

  for (const widget of semanticWidgets) {
    const name = String(widget.Name);
    if (tabWidgetNames.has(name)) continue;
    const accessibility = resolveString(widget.AccessibilityName ?? widget.AccessibilityTextOverride);
    const text = resolveString(widget.Text);
    const help = resolveString(widget.Help);
    lines.push([
      "CONTROL",
      `Name=${name}`,
      `Type=${String(widget.Type)}`,
      `Label=${accessibility ?? text ?? "Unknown"}`,
      `Help=${help ?? ""}`
    ].join("|"));
  }

  lines.push(`INSPECT|SemanticControls=${semanticWidgets.length}|Complete=True`);
  return lines;
}

export function registerGameHandlers(): void {
  ipcMain.handle("game:begin-match-audio-suppression", () => {
    beginAoe2MatchAudioSuppression();
  });
  ipcMain.handle("game:get-localization", async (_event, currentSessionOnly = false) => {
    const installation = await detectAoe2Installation();
    if (!installation.installed || !installation.path) {
      return { languageId: null, languageCode: "en", languageName: "English", names: {}, mapDescriptions: {}, civilizationBonuses: {} };
    }
    return loadAoe2Localization(installation.path, currentSessionOnly === true);
  });
  ipcMain.handle("game:set-language-override", async (_event, languageId: number | null) => {
    const installation = await detectAoe2Installation();
    if (!installation.installed || !installation.path) {
      return { languageId: null, languageCode: "en", languageName: "English", names: {}, mapDescriptions: {}, civilizationBonuses: {} };
    }
    setAoe2LanguageOverride(isAoe2LanguageId(languageId) ? languageId : null);
    return loadAoe2Localization(installation.path);
  });
  ipcMain.handle("game:scan-local-custom-content", scanLocalCustomContent);
  ipcMain.handle("game:detect-enabled-ui-mods", detectEnabledUiMods);
  ipcMain.handle("game:disable-enabled-ui-mods", disableEnabledUiMods);
  ipcMain.handle("game:set-lobby-input-lock", async (event, locked: boolean) => {
    const requested = locked === true;
    // The hook remains able to observe and selectively route physical input;
    // BlockInput would also make the Electron chat surface unusable.
    const applied = requested ? false : setWindowsInputBlocked(false);
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    const guardApplied = requested ? await startInputGuard(appWindow) : (scheduleInputGuardStop(), false);
    console.info(`[AoE2 automation] INPUT_LOCK|Requested=${requested}|BlockInput=${applied}|Guard=${guardApplied}|Source=Renderer`);
    if (requested && (applied || guardApplied) && !guardedSenders.has(event.sender)) {
      guardedSenders.add(event.sender);
      event.sender.once("destroyed", () => {
        setWindowsInputBlocked(false);
        stopInputGuard();
      });
    }
    return { locked: requested && (applied || guardApplied) };
  });
  ipcMain.on("game:lobby-guard-pointer-ack", (_event, sequence: number) => {
    if (!Number.isInteger(sequence) || sequence < inputGuardLastAcknowledgedFrame) return;
    inputGuardLastAcknowledgedFrame = sequence;
    inputGuardLastAcknowledgedAt = Date.now();
  });

  app.on("before-quit", (event) => {
    releaseAllInputSuppression("BeforeQuit");
    stopReplayEndDetection();
    if (quittingAfterGameCleanup) return;
    event.preventDefault();
    quittingAfterGameCleanup = true;
    void (async () => {
      try {
        await restoreAoe2AudioOnShutdown();
        if (!ownedAoe2Pid || !ownedAoe2WindowReady) {
          if ((ownedAoe2Pid || launchRequested) && !ownedAoe2WindowReady) {
            console.info("[AoE2 process] SHUTDOWN_CLEANUP_SKIPPED|Reason=WindowNotReady");
          }
          return;
        }
        const pid = ownedAoe2Pid;
        ownedAoe2Pid = undefined;
        ownedAoe2WindowReady = false;
        if (pid) await forceCloseAoe2Process(pid);
      } finally {
        const disabledProfiles = await setEmpireLeagueSplashEnabled(false);
        console.info(`[AoE2 splash] Disabled=${disabledProfiles.join(",") || "none"}`);
      }
    })().catch((error) => {
      console.error("[AoE2 shutdown] Cleanup failed", error);
    }).finally(() => app.quit());
  });
  app.on("will-quit", () => releaseAllInputSuppression("WillQuit"));
  process.once("exit", () => {
    setWindowsInputBlocked(false);
    stopInputGuard();
  });
  process.on("uncaughtExceptionMonitor", () => releaseAllInputSuppression("UncaughtException"));

  ipcMain.handle("game:detect-installation", async () => {
    return detectAoe2Installation();
  });

  ipcMain.handle("game:detect-process", async () => {
    const status = await detectAoe2Process();
    if (ownedAoe2Pid && (!status.running || status.pid !== ownedAoe2Pid)) {
      console.info(
        `[AoE2 process] OWNERSHIP_CLEARED|PreviousPid=${ownedAoe2Pid}`
        + `|CurrentPid=${status.pid ?? "none"}|Running=${status.running}`
      );
      ownedAoe2Pid = undefined;
      ownedAoe2WindowReady = false;
    }
    if (launchRequested && status.running && status.pid && !ownedAoe2Pid) {
      ownedAoe2Pid = status.pid;
      ownedAoe2WindowReady = status.windowReady === true;
      launchRequested = false;
      launchRequestedAt = 0;
      console.info(`[AoE2 process] OWNERSHIP_ACQUIRED|Pid=${status.pid}`);
    }
    if (ownedAoe2Pid === status.pid && status.windowReady) {
      ownedAoe2WindowReady = true;
    }
    return {
      ...status,
      owned: Boolean(status.pid && status.pid === ownedAoe2Pid)
    };
  });

  ipcMain.handle("game:probe-steam-family", async (_event, expectedSteamId?: string) => {
    return runSteamFamilyProbe(expectedSteamId);
  });

  ipcMain.handle("game:close", async (_event, force: boolean) => {
    const processStatus = await detectAoe2Process();
    if (!processStatus.running || !processStatus.pid) {
      endAoe2MatchAudioSuppression();
      return { closed: true, running: false };
    }

    restoreAoe2Window();
    if (force) {
      await forceCloseAoe2Process(processStatus.pid);
    } else {
      closeAoe2NativeWindow(processStatus.pid);
    }

    const closed = await waitForAoe2Exit(force ? 5000 : 8000);
    if (closed) {
      endAoe2MatchAudioSuppression();
      launchRequested = false;
      launchRequestedAt = 0;
      if (ownedAoe2Pid === processStatus.pid) {
        ownedAoe2Pid = undefined;
        ownedAoe2WindowReady = false;
      }
    }
    return {
      closed,
      running: !closed,
      message: closed ? undefined : force ? "AoE2 is still running after forced termination." : "AoE2 did not respond to the close request."
    };
  });

  ipcMain.handle("game:launch", async (event) => {
    // A managed AoE2 session is silent from launch through matchmaking and
    // lobby automation. Game-start is the sole path that restores its audio.
    beginAoe2MatchAudioSuppression();
    const existing = await detectAoe2Process();
    if (existing.running) {
      if (existing.pid && !existing.windowReady) {
        showAoe2NativeWindowBehind(existing.pid);
      }
      return {
        launched: true,
        status: "running",
        message: "AoE2 DE is already running."
      };
    }
    if (launchRequested) {
      const status = await detectAoe2Process();
      if (status.running || Date.now() - launchRequestedAt < 30_000) {
        return { launched: true, status: "running", message: "AoE2 DE launch was already requested." };
      }
      // Steam accepted the previous request, but no AoE2 process appeared
      // within the renderer's startup window. Permit one fresh request.
      launchRequested = false;
    }
    launchRequested = true;
    launchRequestedAt = Date.now();

    try {
      const installation = await detectAoe2Installation();
      if (!installation.installed) {
        endAoe2MatchAudioSuppression();
        launchRequested = false;
        launchRequestedAt = 0;
        return {
          launched: false,
          status: "not_detected",
          message: installation.message ?? "AoE2: Definitive Edition is not installed."
        };
      }

      const steamExecutable = await getSteamExecutable();
      if (!steamExecutable) {
        endAoe2MatchAudioSuppression();
        launchRequested = false;
        launchRequestedAt = 0;
        return { launched: false, status: "not_detected", message: "Steam could not be launched." };
      }

      await ensureEmpireLeagueMapsEnabled();

      const appWindow = BrowserWindow.fromWebContents(event.sender);
      // Arm both layers before Steam is allowed to create the game window. The
      // old ordering left an unavoidable interval where AoE2 could paint first.
      if (cursorAutomationEnabled && appWindow) showMainWindowAsGameCover(appWindow);
      moveAoe2WindowOffscreen();

      const gameProcess = spawn(steamExecutable, ["-applaunch", aoe2AppId, "SKIPINTRO"], {
        detached: true,
        stdio: "ignore",
        windowsHide: false
      });
      gameProcess.unref();
      appWindow?.on("focus", releaseCursorForElectron);
      appWindow?.once("closed", restoreAoe2Window);
      return { launched: true, status: "running", message: "Launching AoE2 DE." };
    } catch (error) {
      endAoe2MatchAudioSuppression();
      restoreAoe2Window();
      launchRequested = false;
      launchRequestedAt = 0;
      throw error;
    }
  });

  ipcMain.handle("game:focus", async () => {
    if (cursorAutomationEnabled && process.platform === "win32") {
      // Stop the startup z-order guard before revealing the game. Otherwise
      // its 25 ms callback can race this handoff and push AoE2 behind another
      // window while AoE2 is completing its fullscreen transition.
      // The cursor-automation branch does not restore or resize the game.
      restoreAoe2Window();
      const game = detectAoe2NativeProcess();
      const focused = Boolean(game.pid) && focusAoe2NativeWindow(game.pid as number);
      if (focused) hideMainWindowGameCover();
      return { focused };
    }
    restoreAoe2Window(true, true);
    return { focused: true };
  });

  ipcMain.handle("game:focus-for-gameplay", async (_event, matchId: string) => {
    if (typeof matchId !== "string" || !matchId.trim()) {
      throw new Error("A match ID is required for the gameplay handoff.");
    }
    const startedAt = Date.now();
    let gameplayAudioVerificationPending = false;
    const beginGameplayAudioInBackground = (phase: "initial" | "post-handoff") => {
      if (gameplayAudioVerificationPending) return;
      gameplayAudioVerificationPending = true;
      void beginAoe2GameplayAudio().then((audioResult) => {
        console.info(`[AoE2 audio] GAMEPLAY_VERIFY|Match=${matchId}|Phase=${phase}|${audioResult}`);
        if (!_event.sender.isDestroyed()) {
          _event.sender.send(
            "game:automation-log",
            `AUDIO|Phase=Gameplay|HandoffPhase=${phase}|Match=${matchId}|${audioResult}`
          );
        }
        if (!audioResult.includes("Verified=True") || !audioResult.includes("ResultingMuted=0")) {
          console.warn(`[AoE2 audio] GAMEPLAY_VERIFY_FAILED|Match=${matchId}|Phase=${phase}|${audioResult}`);
        }
      }).catch((error) => {
        console.warn(
          `[AoE2 audio] GAMEPLAY_VERIFY_ERROR|Match=${matchId}|Phase=${phase}`
          + `|${error instanceof Error ? error.message : String(error)}`
        );
      }).finally(() => {
        gameplayAudioVerificationPending = false;
      });
    };
    // Audio-session discovery can take several seconds while AoE2 transitions
    // through loading. It is useful recovery work, but must never gate the
    // cover removal or the vital Windows foreground handoff.
    beginGameplayAudioInBackground("initial");
    void setObsCaptureMode("game");
    let focused = false;
    let lastPid: number | undefined;
    let raisedPid: number | undefined;
    try {
      // A new gameplay handoff supersedes every delayed post-game recovery.
      // Do not stop replay detection: result monitoring is independent from
      // whether Windows grants foreground focus.
      clearReplayFocusTimers();
      stopReturnToMenuWatch();
      restoreAoe2Window();
      const retryDelays = [0, 250, 500, 1_000] as const;
      for (let index = 0; index < retryDelays.length && !focused; index += 1) {
        if (retryDelays[index] > 0) await delay(retryDelays[index]);
        const attemptStartedAt = Date.now();
        const game = detectAoe2NativeProcess();
        lastPid = game.pid;
        const native = game.pid
          ? focusAoe2ForGameplayDetailed(game.pid, false)
          : {
              focused: false,
              windowFound: false,
              raised: false,
              foregroundRequested: false,
              foregroundVerified: false,
              releasedTopmost: false
            };
        if (game.pid && native.raised) raisedPid = game.pid;
        focused = native.focused;
        console.info(
          `[AoE2 automation] GAMEPLAY_HANDOFF|Match=${matchId}|Attempt=${index + 1}`
          + `|Pid=${game.pid ?? "none"}|Focused=${focused}|WindowFound=${native.windowFound}`
          + `|Raised=${native.raised}|ForegroundRequested=${native.foregroundRequested}`
          + `|ForegroundVerified=${native.foregroundVerified}|ReleasedTopmost=${native.releasedTopmost}`
        );
        await appendGameplayHandoffLog({
          matchId,
          phase: "attempt",
          attempt: index + 1,
          pid: game.pid ?? null,
          windowReady: game.windowReady,
          elapsedMs: Date.now() - attemptStartedAt,
          ...native
        });
      }
      if (raisedPid) {
        // AoE2 remains topmost while Electron is removed underneath it, so
        // neither the desktop nor another application is exposed between the
        // cover and gameplay. Release topmost only after that atomic handoff.
        hideMainWindowGameCover();
        const releasedTopmost = releaseAoe2GameplayTopmost(raisedPid);
        focused = focused && releasedTopmost;
        console.info(
          `[AoE2 automation] GAMEPLAY_HANDOFF_RELEASE|Match=${matchId}`
          + `|Pid=${raisedPid}|ReleasedTopmost=${releasedTopmost}`
        );
      }
      return { focused };
    } catch (error) {
      await appendGameplayHandoffLog({
        matchId,
        phase: "error",
        pid: lastPid ?? null,
        elapsedMs: Date.now() - startedAt,
        error: error instanceof Error ? error.stack ?? error.message : String(error)
      });
      if (raisedPid) {
        hideMainWindowGameCover();
        releaseAoe2GameplayTopmost(raisedPid);
      }
      return { focused: false };
    } finally {
      releaseAllInputSuppression("GameplayHandoff");
      // Electron can briefly regain focus while its fullscreen cover is being
      // removed. That focus event intentionally remutes AoE2, so make the
      // completed explicit gameplay handoff the final audio authority after
      // every focus/topmost transition has settled.
      beginGameplayAudioInBackground("post-handoff");
      await appendGameplayHandoffLog({
        matchId,
        phase: "complete",
        pid: lastPid ?? null,
        focused,
        inputSuppressionReleased: true,
        elapsedMs: Date.now() - startedAt
      });
    }
  });

  ipcMain.handle("game:start-loading-screen-watch", async (event) => {
    const game = detectAoe2NativeProcess();
    if (!game.pid || !game.windowReady) {
      return { started: false, message: "The AoE2 game window was not found." };
    }
    return { started: startLoadingScreenWatch(game.pid, event.sender) };
  });

  ipcMain.handle("game:start-replay-end-detection", async (event, replayFolder?: string) => {
    stopReturnToMenuWatch();
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return { started: false, message: "The Empire League window was not found." };
    return startReplayEndDetection(window, replayFolder);
  });

  ipcMain.handle("game:stop-replay-end-detection", async () => {
    stopReplayEndDetection();
  });

  ipcMain.handle("game:confirm-replay-ended", async (event) => {
    stopReplayEndDetection();
    const window = BrowserWindow.fromWebContents(event.sender);
    console.info(
      `[AoE2 replay] CONFIRM|RendererDestroyed=${event.sender.isDestroyed()}`
      + `|WindowFound=${Boolean(window)}|ReturnWatchStarted=${Boolean(window)}`
    );
    if (window) startReturnToMenuWatch(window);
  });

  ipcMain.handle("game:test-return-to-menu-recovery", async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const game = detectAoe2NativeProcess();
    if (!window || !game.pid || !game.windowReady) {
      return { started: false, message: "A ready AoE2 window was not found." };
    }
    window.hide();
    focusAoe2NativeWindow(game.pid);
    startReturnToMenuWatch(window);
    return { started: true };
  });

  ipcMain.handle("game:read-replay-file", async (_event, filePath: string) => {
    if (typeof filePath !== "string" || !filePath.toLowerCase().endsWith(".aoe2record")) {
      throw new Error("A valid AoE2 replay path is required.");
    }
    return new Uint8Array(await readFile(filePath));
  });

  ipcMain.handle("game:reveal-replay-file", async (_event, filePath: string) => {
    if (typeof filePath !== "string" || !filePath.toLowerCase().endsWith(".aoe2record")) {
      throw new Error("A valid AoE2 replay path is required.");
    }
    await access(filePath);
    shell.showItemInFolder(filePath);
  });

  ipcMain.handle("game:start-mouse-test-mode", async () => {
    setMouseCoordinateOverlayEnabled(true);
    return { focused: true };
  });

  ipcMain.handle("game:stop-mouse-test-mode", async () => {
    setMouseCoordinateOverlayEnabled(false);
  });

  ipcMain.handle("game:show-fullscreen-after-delay", async (event) => {
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    await delay(5000);
    restoreAoe2Window(true, true);
    console.info("[AoE2 automation] FULLSCREEN_TEST|Delay=5000ms|Mode=Maximized|Focused=True");
    await delay(5000);
    moveAoe2WindowOffscreen();
    if (appWindow && !appWindow.isDestroyed()) {
      appWindow.show();
      appWindow.focus();
    }
    console.info("[AoE2 automation] VICTORY_TEST|DelayAfterFullscreen=5000ms|GameOffscreen=True|ElectronFocused=True");
    return { focused: true };
  });

  ipcMain.handle("game:start-tab-test", async (event) => {
    stopTabTest();
    if (process.platform !== "win32") {
      return { started: false, message: "The Tab test is only supported on Windows." };
    }

    const installation = await detectAoe2Installation();
    if (!installation.installed) {
      return { started: false, message: "AoE2 DE is not installed." };
    }

    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    try {
      const inspectionLines = await inspectCreateLobbyUi(installation.path as string);
      inspectionLines.forEach(emitLog);
    } catch (error) {
      emitLog(`INSPECT|Complete=False|Error=${error instanceof Error ? error.message : "Unknown error"}`);
    }

    const encodedScript = Buffer.from(tabTestScript, "utf16le").toString("base64");
    tabTestProcess = spawn("powershell.exe", ["-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    const sendLog = (chunk: Buffer) => {
      for (const message of chunk.toString().split(/\r?\n/).filter(Boolean)) {
        emitLog(message);
      }
    };
    tabTestProcess.stdout?.on("data", sendLog);
    tabTestProcess.stderr?.on("data", sendLog);
    tabTestProcess.once("exit", () => {
      tabTestProcess = undefined;
    });
    return { started: true, message: "Sending Tab to AoE2 DE twice per second for 15 seconds." };
  });

  ipcMain.handle("game:stop-tab-test", async () => {
    stopTabTest();
  });

  ipcMain.handle("game:send-background-key", async (event, key: GameInputKey) => {
    const definition = backgroundKeyDefinitions[key];
    if (!definition || process.platform !== "win32") {
      return { sent: false, message: "That game input is not supported." };
    }

    const script = createBackgroundKeyScript(definition.virtualKey, definition.scanCode);
    const encodedScript = Buffer.from(script, "utf16le").toString("base64");
    try {
      const { stdout } = await execFileAsync("powershell.exe", [
        "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
      ], { windowsHide: true });
      const sent = stdout.includes("SENT");
      const message = sent ? `${key} sent to AoE2 DE.` : `${key} could not be sent to AoE2 DE.`;
      console.info(`[AoE2 automation] KEY|${key}|Sent=${sent}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", `KEY|${key}|Sent=${sent}`);
      return { sent, message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Background input failed.";
      console.error(`[AoE2 automation] KEY|${key}|Sent=False|Error=${message}`);
      return { sent: false, message: `${key} could not be sent to AoE2 DE.` };
    }
  });

  ipcMain.handle("game:run-create-lobby-sequence", async (
    event,
    mapName: string,
    playerCount = 2,
    contentKind: "map" | "scenario" = "map",
    automationRequest: "ranked" | "custom" | { context: "custom"; gameSettings: CustomLobbyGameSettings } = "ranked",
    requestedGameSettings?: CustomLobbyGameSettings
  ) => {
    stopTabTest();
    setMouseCoordinateOverlayEnabled(false);
    const normalizedMapName = typeof mapName === "string" ? mapName.trim() : "";
    const automationContext = typeof automationRequest === "object" ? automationRequest.context : automationRequest;
    requestedGameSettings = typeof automationRequest === "object" ? automationRequest.gameSettings : requestedGameSettings;
    const isCustomAutomation = automationContext === "custom";
    if (process.platform !== "win32") {
      return { sent: false, message: "Lobby automation is only supported on Windows." };
    }
    if (contentKind === "map" && !normalizedMapName) {
      return { sent: false, message: "A supported AoE2 map name is required." };
    }
    if (contentKind === "scenario" && !normalizedMapName) {
      return { sent: false, message: "An AoE2 scenario name is required." };
    }
    if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 8) {
      return { sent: false, message: "The lobby must contain between 2 and 8 players." };
    }
    const installation = await detectAoe2Installation();
    const localization = installation.installed && installation.path
      ? await loadAoe2Localization(installation.path)
      : { languageCode: "en", names: {} as Record<string, string> };
    const localizedMapName = localization.names[normalizedMapName] ?? normalizedMapName;

    const sequenceId = ++createLobbySequenceCounter;
    if (activeCreateLobbySequence) {
      const message = `SEQUENCE|Id=${sequenceId}|Context=${automationContext}|Rejected=AlreadyRunning|ActiveId=${activeCreateLobbySequence.id}|ActiveContext=${activeCreateLobbySequence.context}`;
      console.warn(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
      return { sent: false, message: "Lobby creation is already in progress." };
    }
    activeCreateLobbySequence = { id: sequenceId, context: automationContext };

    const sequenceStartedAt = performance.now();
    let previousLogAt = sequenceStartedAt;
    const emitLog = (message: string) => {
      const loggedAt = performance.now();
      const elapsedMs = Math.round(loggedAt - sequenceStartedAt);
      const sincePreviousMs = Math.round(loggedAt - previousLogAt);
      previousLogAt = loggedAt;
      const sequencedMessage = `SEQUENCE|Id=${sequenceId}|Context=${automationContext}|ElapsedMs=${elapsedMs}|SincePreviousMs=${sincePreviousMs}|${message}`;
      console.info(`[AoE2 automation] ${sequencedMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", sequencedMessage);
    };
    emitLog("Started=True");
    emitLog(`PLAYER_COUNT_REQUEST|Value=${playerCount}`);
    emitLog(`GAME_SETTINGS_PAYLOAD|${JSON.stringify(requestedGameSettings ?? null)}`);
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    let gameProcess: Awaited<ReturnType<typeof detectAoe2Process>>;
    try {
      gameProcess = await prepareHiddenAoe2WindowBehind();
    } catch (error) {
      emitLog(`ERROR|${error instanceof Error ? error.message : "AoE2 process detection failed."}`);
      activeCreateLobbySequence = undefined;
      return { sent: false, message: "The AoE2 game window could not be detected." };
    }
    if (!gameProcess.running || !gameProcess.pid || !gameProcess.windowReady) {
      emitLog("Complete=False|Reason=GameWindowNotReady");
      activeCreateLobbySequence = undefined;
      return { sent: false, message: "The AoE2 game window was not ready." };
    }
    const gamePid: number = gameProcess.pid;
    setMainWindowGameCoverClickThrough(false);
    let sequenceCompleted = false;
    let sequenceExpired = false;
    let sequenceSafetyTimer: NodeJS.Timeout | undefined;
    try {
      const gameWindow = getAoe2NativeWindowHandle(gamePid);
      if (!gameWindow) throw new Error("The AoE2 game window could not be resolved for window capture.");
      const captureReady = await waitForFreshAoe2WindowCapture(gameWindow);
      emitLog(`WINDOW_CAPTURE_WAIT|Ready=${captureReady}|${describeAoe2WindowCapture(gameWindow)}`);
      if (!captureReady) throw new Error("A fresh AoE2 window capture was not available.");
      // The swallowing low-level guard protects AoE2 while approved physical
      // keyboard events remain available to Electron chat.
      const inputBlocked = false;
      if (isCustomAutomation) {
        sequenceSafetyTimer = setTimeout(() => {
          sequenceExpired = true;
          setWindowsInputBlocked(false);
          stopInputGuard();
          emitLog("SAFETY_TIMEOUT|Source=CreateLobby|InputReleased=True");
        }, 60_000);
      }
      const inputGuardStarted = await startInputGuard(appWindow);
      if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
      if (inputGuardStarted && !guardedSenders.has(event.sender)) {
        guardedSenders.add(event.sender);
        event.sender.once("destroyed", () => {
          setWindowsInputBlocked(false);
          stopInputGuard();
        });
      }
      emitLog(`INPUT_LOCK|Requested=True|BlockInput=${inputBlocked}|Guard=${inputGuardStarted}|Source=CreateLobby`);
      emitLog(`ACTION_WINDOW|Target=create-lobby|CoverHidden=False|ClickThrough=False|ElectronFocused=${appWindow?.isFocused() ?? false}|AoeForeground=${isAoe2NativeWindowForeground(gamePid)}`);
      const process = { ...gameProcess, pid: gamePid };
      const clickStep = async (
        name: string,
        x: number,
        y: number,
        timing?: { hoverMs?: number; holdMs?: number; synchronous?: boolean; primeMove?: boolean; requireMove?: boolean }
      ) => {
        if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
        const result = await postAoe2DesignClick(process.pid as number, x, y, {
          ...timing,
          // Ranked and custom lobbies render the same AoE2 controls. Keep one
          // input contract for both: a click is successful only when its move,
          // down, and up messages were all dispatched.
          requireMove: timing?.requireMove ?? true
        });
        if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
        emitLog(`STEP|${name}|DesignPoint=${x},${y}|${result.detail}`);
        if (!result.sent) throw new Error(`${name} could not be clicked.`);
      };
      const expectedHostState: Partial<Record<Aoe2ActionName, ReturnType<typeof readAoe2HostSetupState>["state"]>> = {
        multiplayer: "multiplayer-menu",
        hostGame: "create-lobby-dialog",
        createLobby: "lobby-room"
      };
      const actionStep = async (actionName: Aoe2ActionName) => {
        const actionStartedAt = performance.now();
        const action = aoe2UiManifest.actions[actionName];
        const expectedActionMs = ("hoverMs" in action ? action.hoverMs : 100)
          + ("holdMs" in action ? action.holdMs : 120)
          + action.settleMs + (action.activation === "clickEnter" ? 500 : 0);
        const expectedState = expectedHostState[actionName];
        const performAction = async (attempt: number) => {
          await clickStep(action.label, action.point[0], action.point[1], {
            hoverMs: "hoverMs" in action ? action.hoverMs : undefined,
            holdMs: "holdMs" in action ? action.holdMs : undefined,
            synchronous: action.activation === "click"
          });
          if (action.activation === "clickEnter") {
            await delay(500);
            const enter = await sendAoe2Enter(process.pid as number);
            emitLog(`STEP|${action.label}|Attempt=${attempt}|Key=ENTER|${enter.detail}`);
            if (!enter.sent) throw new Error(`${action.label} could not be activated.`);
          }
          await delay(action.settleMs);
        };

        await performAction(1);
        if (!expectedState) {
          emitLog(`STEP_TIMING|Action=${actionName}|DurationMs=${Math.round(performance.now() - actionStartedAt)}|ExpectedMs=${expectedActionMs}`);
          return;
        }
        let verification = readAoe2HostSetupState(process.pid as number);
        const verificationDeadline = Date.now() + 15_000;
        while (verification.state !== expectedState && Date.now() < verificationDeadline) {
          await delay(250);
          verification = readAoe2HostSetupState(process.pid as number);
        }
        emitLog(`STEP_VERIFY|${action.label}|Attempt=1|Expected=${expectedState}|${verification.detail}`);
        if (verification.state === "unknown") {
          throw new Error(`${action.label} could not be verified after waiting for AoE2; no retry input was sent.`);
        }
        if (verification.state !== expectedState) {
          await performAction(2);
          verification = readAoe2HostSetupState(process.pid as number);
          const retryVerificationDeadline = Date.now() + 15_000;
          while (verification.state !== expectedState && Date.now() < retryVerificationDeadline) {
            await delay(250);
            verification = readAoe2HostSetupState(process.pid as number);
          }
          emitLog(`STEP_VERIFY|${action.label}|Attempt=2|Expected=${expectedState}|${verification.detail}`);
        }
        if (verification.state !== expectedState) {
          throw new Error(`${action.label} did not reach ${expectedState}.`);
        }
        emitLog(`STEP_TIMING|Action=${actionName}|DurationMs=${Math.round(performance.now() - actionStartedAt)}|ExpectedMs=${expectedActionMs}`);
      };

      // AoE2 can open its News panel automatically on top of the main menu
      // once per game session. Do not blindly dismiss it: Escape on the plain
      // main menu can open an unrelated exit prompt. The normal main menu has
      // a stable rendered signature, so only use Escape when that signature is
      // absent, then require it to appear before sending the first menu click.
      let initialState = readAoe2HostSetupState(process.pid as number);
      emitLog(`STEP_VERIFY|Initial Main Menu|Expected=main-menu|${initialState.detail}`);
      if (initialState.state === "main-menu-news") {
        const dismissStartupOverlay = await sendAoe2Escape(process.pid as number);
        emitLog(`STEP|Dismiss Startup Overlay|Key=ESCAPE|${dismissStartupOverlay.detail}`);
        if (!dismissStartupOverlay.sent) {
          throw new Error("The AoE2 startup overlay could not be dismissed.");
        }
        const mainMenuDeadline = Date.now() + 5_000;
        do {
          await delay(250);
          initialState = readAoe2HostSetupState(process.pid as number);
        } while (initialState.state !== "main-menu" && Date.now() < mainMenuDeadline);
        emitLog(`STEP_VERIFY|Dismiss Startup Overlay|Expected=main-menu|${initialState.detail}`);
        if (initialState.state !== "main-menu") {
          throw new Error("AoE2 did not reach the main menu after dismissing its startup overlay.");
        }
      } else if (initialState.state !== "main-menu") {
        throw new Error(`AoE2 was expected at the main menu, but its state was ${initialState.state}.`);
      }

      await actionStep("multiplayer");
      await actionStep("hostGame");
      await actionStep("lobbyVisibility");
      const privateVisibility = await sendAoe2End(process.pid);
      emitLog(`STEP|Select Private Visibility|Key=END|${privateVisibility.detail}`);
      if (!privateVisibility.sent) throw new Error("Private lobby visibility could not be selected.");
      await delay(100);
      const confirmVisibility = await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm Private Visibility|Key=ENTER|${confirmVisibility.detail}`);
      if (!confirmVisibility.sent) throw new Error("Private lobby visibility could not be confirmed.");
      await delay(250);
      await actionStep("playerCount");
      if (playerCount === 8) {
        // END commits the final entry and closes this AoE2 dropdown.
        const lastPlayerCount = await sendAoe2End(process.pid);
        emitLog(`STEP|Select 8 Players|Key=END|${lastPlayerCount.detail}`);
        if (!lastPlayerCount.sent) throw new Error("The 8-player lobby size could not be selected.");
      } else {
        const requestedPlayerCount = await sendAoe2Digit(process.pid, playerCount);
        emitLog(`STEP|Select ${playerCount} Players|Key=${playerCount}|${requestedPlayerCount.detail}`);
        if (!requestedPlayerCount.sent) throw new Error(`The ${playerCount}-player lobby size could not be selected.`);
      }
      await delay(300);
      const confirmPlayerCount = await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm ${playerCount} Players|Key=ENTER|${confirmPlayerCount.detail}`);
      if (!confirmPlayerCount.sent) throw new Error(`The ${playerCount}-player lobby size could not be confirmed.`);
      await delay(250);
      await actionStep("createLobby");
      await clickStep("Reset Settings", 3101, 1976);
      await delay(lobbySetupTiming.resetFocusMs);
      // Use the same verified keyboard path as ranked. Custom-only settling and
      // state verification remain below, but input dispatch must not diverge.
      const reset = await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm Reset|Key=ENTER|${reset.detail}`);
      if (!reset.sent) throw new Error("The reset confirmation could not be sent.");
      await delay(lobbySetupTiming.resetConfirmationMs);

      if (contentKind === "scenario") {
        const picker = aoe2UiManifest.scenarioPicker;
        await clickStep("Open Game Mode", picker.gameModePoint[0], picker.gameModePoint[1], { synchronous: true });
        await delay(picker.modeMenuSettleMs);
        const lastGameMode = await sendAoe2End(process.pid);
        emitLog(`SCENARIO_SELECT|Step=CustomScenario|Key=END|${lastGameMode.detail}`);
        if (!lastGameMode.sent) throw new Error("Custom Scenario could not be selected.");
        const confirmGameMode = await sendAoe2Enter(process.pid);
        if (!confirmGameMode.sent) throw new Error("Custom Scenario could not be confirmed.");
        await delay(picker.recommendedSettingsSettleMs);
        const acceptRecommended = await sendAoe2Enter(process.pid);
        emitLog(`SCENARIO_SELECT|Step=RecommendedSettings|Key=ENTER|${acceptRecommended.detail}`);
        if (!acceptRecommended.sent) throw new Error("Recommended scenario settings could not be accepted.");
        await delay(picker.recommendedSettingsSettleMs);
        await clickStep("Set Scenario", picker.setScenarioPoint[0], picker.setScenarioPoint[1], {
          synchronous: true
        });
        if (isCustomAutomation) {
          let scenarioPickerState = readAoe2HostSetupState(process.pid, { contentPickerExpected: true });
          let scenarioPickerDeadline = Date.now() + 5_000;
          while (scenarioPickerState.state !== "content-picker" && Date.now() < scenarioPickerDeadline) {
            if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
            await delay(250);
            scenarioPickerState = readAoe2HostSetupState(process.pid, { contentPickerExpected: true });
          }
          if (scenarioPickerState.state !== "content-picker") {
            emitLog(`STEP_RETRY|Set Scenario|Reason=ControlNotReady|${scenarioPickerState.detail}`);
            await clickStep("Set Scenario Retry", picker.setScenarioPoint[0], picker.setScenarioPoint[1], {
              synchronous: true
            });
            scenarioPickerDeadline = Date.now() + 10_000;
            while (scenarioPickerState.state !== "content-picker" && Date.now() < scenarioPickerDeadline) {
              if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
              await delay(250);
              scenarioPickerState = readAoe2HostSetupState(process.pid, { contentPickerExpected: true });
            }
          }
          emitLog(`STEP_VERIFY|Set Scenario|Expected=content-picker|${scenarioPickerState.detail}`);
          if (scenarioPickerState.state !== "content-picker") {
            throw new Error("Set Scenario did not open the scenario picker.");
          }
        }
        await delay(picker.openSettleMs);
        await clickStep("Focus Scenario Search", picker.searchPoint[0], picker.searchPoint[1], { synchronous: true });
        const clearScenarioSearch = await clearAoe2TextField(process.pid);
        emitLog(`SCENARIO_SELECT|Step=ClearSearch|${clearScenarioSearch.detail}`);
        if (!clearScenarioSearch.sent) throw new Error("The previous scenario search could not be cleared.");
        const scenarioSearch = await sendAoe2Text(process.pid, normalizedMapName, { triggerKeyEvents: true });
        emitLog(`SCENARIO_SELECT|Step=Search|Scenario=${normalizedMapName}|${scenarioSearch.detail}`);
        if (!scenarioSearch.sent) throw new Error(`${normalizedMapName} could not be entered in scenario search.`);
        await delay(picker.searchSettleMs);
        await clickStep(`Select ${normalizedMapName}`, picker.firstResultPoint[0], picker.firstResultPoint[1], { synchronous: true });
        await delay(picker.selectionSettleMs);
        await clickStep("Load Scenario", picker.loadScenarioPoint[0], picker.loadScenarioPoint[1], { synchronous: true });
        await delay(picker.loadSettleMs);
        emitLog(`SCENARIO_SELECT|Complete=True|Scenario=${normalizedMapName}`);
      } else {
        const mapPicker = aoe2UiManifest.mapPicker;
        const modePicker = aoe2UiManifest.scenarioPicker;
        const knownMap = normalizedMapName in aoe2UiManifest.mapPicker.entries;
        const mapPoint = knownMap
          ? mapDesignPoint(normalizedMapName as Aoe2MapSelection)
          : [mapPicker.resultColumnCenters[0], mapPicker.resultRowCenters[0]] as const;
        await clickStep("Open Game Mode", modePicker.gameModePoint[0], modePicker.gameModePoint[1], { synchronous: true });
        await delay(modePicker.modeMenuSettleMs);
        const firstGameMode = await sendAoe2Home(process.pid);
        emitLog(`MAP_SELECT|Step=RandomMap|Key=HOME|${firstGameMode.detail}`);
        if (!firstGameMode.sent) throw new Error("Random Map game mode could not be selected.");
        const confirmGameMode = await sendAoe2Enter(process.pid);
        if (!confirmGameMode.sent) throw new Error("Random Map game mode could not be confirmed.");
        await delay(modePicker.recommendedSettingsSettleMs);
        const acceptRecommended = await sendAoe2Enter(process.pid);
        emitLog(`MAP_SELECT|Step=RecommendedSettings|Key=ENTER|${acceptRecommended.detail}`);
        if (!acceptRecommended.sent) throw new Error("Recommended random-map settings could not be accepted.");
        await delay(modePicker.recommendedSettingsSettleMs);
        // Ranked and custom use the same synchronous picker activation. Custom
        // keeps the additional state wait below for slow UGC reloads.
        await clickStep("Open Map Picker", mapPicker.openPoint[0], mapPicker.openPoint[1], {
          synchronous: true
        });
        if (isCustomAutomation) {
          let mapPickerState = readAoe2HostSetupState(process.pid, { contentPickerExpected: true });
          const mapPickerDeadline = Date.now() + 15_000;
          while (mapPickerState.state !== "content-picker" && Date.now() < mapPickerDeadline) {
            if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
            await delay(250);
            mapPickerState = readAoe2HostSetupState(process.pid, { contentPickerExpected: true });
          }
          emitLog(`STEP_VERIFY|Open Map Picker|Expected=content-picker|${mapPickerState.detail}`);
          if (mapPickerState.state !== "content-picker") {
            throw new Error("Open Map Picker did not open the content picker.");
          }
        }
        await delay(mapPicker.openSettleMs);
        const isBuiltInMap = builtInGameMapNames.has(normalizeContentName(normalizedMapName));
        const isCustomMap = !isBuiltInMap && (!knownMap || (mapPicker.customMapNames as readonly string[]).includes(normalizedMapName));
        const mapStyle = isCustomMap ? "Custom" : "Standard";
        const mapStylePoint = isCustomMap ? mapPicker.customStylePoint : mapPicker.standardStylePoint;
        await clickStep("Open Map Style", mapPicker.mapStylePoint[0], mapPicker.mapStylePoint[1], { synchronous: true });
        await delay(mapPicker.styleMenuSettleMs);
        await clickStep(`Select ${mapStyle} Map Style`, mapStylePoint[0], mapStylePoint[1], { synchronous: true });
        await delay(mapPicker.styleSelectionSettleMs);
        await clickStep("Focus Map Search", mapPicker.searchPoint[0], mapPicker.searchPoint[1], { synchronous: true });
        const clearMapSearch = await clearAoe2TextField(process.pid);
        emitLog(`MAP_SELECT|Step=ClearSearch|${clearMapSearch.detail}`);
        if (!clearMapSearch.sent) throw new Error("The previous map search could not be cleared.");
        const mapSearchText = isCustomMap ? normalizedMapName : localizedMapName;
        const mapSearch = await sendAoe2Text(process.pid, mapSearchText);
        emitLog(`MAP_SELECT|Step=Search|Map=${normalizedMapName}|Localized=${mapSearchText}|Language=${localization.languageCode}|${mapSearch.detail}`);
        if (!mapSearch.sent) throw new Error(`${normalizedMapName} could not be entered in the map search.`);
        await delay(mapPicker.searchSettleMs);
        await clickStep(`Select ${normalizedMapName}`, mapPoint[0], mapPoint[1], { synchronous: true });
        await delay(mapPicker.selectionSettleMs);
        emitLog(`MAP_SELECT|Complete=True|Map=${normalizedMapName}`);
      }
      let contentLobbyState = readAoe2HostSetupState(process.pid);
      if (isCustomAutomation) {
        const contentLobbyDeadline = Date.now() + 15_000;
        while (contentLobbyState.state !== "lobby-room" && Date.now() < contentLobbyDeadline) {
          if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
          await delay(250);
          contentLobbyState = readAoe2HostSetupState(process.pid);
        }
        emitLog(`STEP_VERIFY|Content Selection|Expected=lobby-room|${contentLobbyState.detail}`);
      }
      if (contentLobbyState.state !== "lobby-room") {
        throw new Error(`${normalizedMapName} selection did not return to the lobby room.`);
      }

      if (isCustomAutomation) {
        const settings = { ...defaultCustomLobbyGameSettings, ...(requestedGameSettings ?? {}), recordGame: true };
        const defaults = defaultCustomLobbyGameSettings;
        const points = aoe2UiManifest.advancedSettings.points;
        for (const key of Object.keys(points) as Array<keyof CustomLobbyGameSettings>) {
          if (settings[key] === defaults[key]) continue;
          const point = points[key];
          await clickStep(`${settings[key] ? "Enable" : "Disable"} ${key}`, point[0], point[1], { synchronous: true });
          await delay(aoe2UiManifest.advancedSettings.settleMs);
          emitLog(`GAME_SETTING|${key}=${settings[key]}`);
        }
      }

      clipboard.writeText("EL_CURSOR_COPY_PENDING");
      await actionStep("copyLobbyUri");
      await delay(lobbySetupTiming.clipboardReadMs);
      let lobbyUri = clipboard.readText().match(/aoe2de:\/\/0\/\d+/)?.[0];
      if (!lobbyUri) {
        await delay(lobbySetupRetryTiming.beforeClipboardRetryMs);
        await actionStep("copyLobbyUri");
        await delay(lobbySetupRetryTiming.clipboardReadMs);
        lobbyUri = clipboard.readText().match(/aoe2de:\/\/0\/\d+/)?.[0];
      }
      if (!lobbyUri) throw new Error("Lobby URI was not copied.");
      emitLog(`LOBBY_URI|${lobbyUri}`);
      emitLog("SEQUENCE|Complete=True|Mode=WindowMessage");
      sequenceCompleted = true;
      return { sent: true, message: "Cursor lobby creation completed.", lobbyUri };
    } catch (error) {
      emitLog(`ERROR|${error instanceof Error ? error.message : "Native lobby automation failed."}`);
      return { sent: false, message: "The Create Lobby sequence stopped before completion." };
    } finally {
      if (sequenceSafetyTimer) clearTimeout(sequenceSafetyTimer);
      setMainWindowGameCoverClickThrough(false);
      if (!sequenceCompleted) {
        setWindowsInputBlocked(false);
        stopInputGuard();
        emitLog("INPUT_LOCK|Requested=False|Source=CreateLobbyCleanup");
      }
      if (activeCreateLobbySequence?.id === sequenceId) {
        activeCreateLobbySequence = undefined;
        emitLog(`Released=True|Complete=${sequenceCompleted}`);
      }
    }
  });

  ipcMain.handle("game:run-lobby-cursor-action", async (
    event,
    target: "content-confirm" | "guest-ready" | "host-ready" | "start",
    automationContext: "ranked" | "custom" = "ranked"
  ) => {
    if (process.platform !== "win32" || !["content-confirm", "guest-ready", "host-ready", "start"].includes(target)) {
      return { sent: false, message: "That lobby cursor action is not supported." };
    }
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    try {
      const inputGuardStarted = await startInputGuard(appWindow);
      if (inputGuardStarted && !guardedSenders.has(event.sender)) {
        guardedSenders.add(event.sender);
        event.sender.once("destroyed", () => {
          setWindowsInputBlocked(false);
          stopInputGuard();
        });
      }
      console.info(`[AoE2 automation] INPUT_LOCK|Requested=True|Guard=${inputGuardStarted}|Source=LobbyAction|Target=${target}`);
      const process = await prepareHiddenAoe2WindowBehind();
      if (!process.running || !process.pid || !process.windowReady) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const visibilityMessage = `ACTION_WINDOW|Target=${target}|CoverHidden=False|ClickThrough=False|ElectronFocused=${appWindow?.isFocused() ?? false}|AoeForeground=${isAoe2NativeWindowForeground(process.pid)}`;
      console.info(`[AoE2 automation] ${visibilityMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", visibilityMessage);
      const actionName = target === "content-confirm"
        ? "confirmGuestContent"
        : target === "guest-ready"
          ? "guestReady"
        : target === "host-ready"
          ? "hostReady"
          : "startGame";
      const action = aoe2UiManifest.actions[actionName];
      const emitVerification = (attempt: string, detail: string) => {
        const verificationMessage = `READY_VERIFY|Target=${target}|Attempt=${attempt}|${detail}`;
        console.info(`[AoE2 automation] ${verificationMessage}`);
        if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", verificationMessage);
      };
      const verifiesReady = target === "guest-ready" || target === "host-ready";
      let readyState = verifiesReady ? readAoe2ReadyState(process.pid, action.point[1]) : null;
      if (readyState) emitVerification("before", readyState.detail);
      if (target === "host-ready" && readyState?.state === "unknown") {
        // Accepting transferred custom content temporarily disables the host's
        // Ready button and renders it neutral gray. That is a settling state,
        // not evidence that the lobby is broken. Wait for AoE2 to restore the
        // red/green actionable state before deciding whether input is needed.
        const hostReadyDeadline = Date.now() + 10_000;
        while (readyState.state === "unknown" && Date.now() < hostReadyDeadline) {
          await delay(250);
          readyState = readAoe2ReadyState(process.pid, action.point[1]);
        }
        emitVerification("before-settled", readyState.detail);
      }

      let result = readyState?.state === "ready"
        ? { sent: true, detail: "SKIPPED_ALREADY_READY" }
        : readyState?.state === "unknown"
          ? { sent: false, detail: "READY_STATE_UNKNOWN_BEFORE_INPUT" }
          : target === "content-confirm"
            ? await (async () => {
                const warningBefore = readAoe2ContentWarningState(process.pid as number);
                const detectionMessage = `UGC_CONFIRM|Step=Detect|${warningBefore.detail}`;
                console.info(`[AoE2 automation] ${detectionMessage}`);
                if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", detectionMessage);
                if (warningBefore.state !== "visible") {
                  return {
                    sent: false,
                    detail: `SKIPPED_WARNING_${warningBefore.state.toUpperCase()}|${warningBefore.detail}`
                  };
                }
                const tab = await sendAoe2Tab(process.pid as number);
                if (!tab.sent) return tab;
                await delay(contentConfirmationKeyDelayMs);
                const enter = await sendAoe2Enter(process.pid as number);
                await delay(action.settleMs);
                const warningAfter = readAoe2ContentWarningState(process.pid as number);
                return {
                  sent: enter.sent && warningAfter.state !== "visible",
                  detail: `Mode=WindowMessageTabEnter|Tab=${tab.detail}|Enter=${enter.detail}|After=${warningAfter.detail}`
                };
              })()
            : await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
                hoverMs: "hoverMs" in action ? action.hoverMs : undefined,
                holdMs: "holdMs" in action ? action.holdMs : undefined,
                synchronous: true,
                requireMove: true
              });

      if (target === "start" && result.sent) startLoadingScreenWatch(process.pid, event.sender);

      if (result.detail !== "SKIPPED_ALREADY_READY") await delay(action.settleMs);
      if (target === "start" && result.sent) {
        let startState = readAoe2HostSetupState(process.pid);
        const emitStartVerification = (attempt: number) => {
          const verificationMessage = `START_VERIFY|Attempt=${attempt}|${startState.detail}`;
          console.info(`[AoE2 automation] ${verificationMessage}`);
          if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", verificationMessage);
        };
        emitStartVerification(1);
        // A dispatched window message only proves that Windows accepted it. If
        // AoE2 is positively still showing the lobby, retry once after the
        // first settle period. Never retry on an unknown/loading state because
        // that may already be the transition into the match.
        if (startState.state === "lobby-room") {
          result = await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
            hoverMs: "hoverMs" in action ? action.hoverMs : undefined,
            holdMs: "holdMs" in action ? action.holdMs : undefined,
            synchronous: true
          });
          const retryMessage = `START_RETRY|Reason=StillInLobby|${result.detail}`;
          console.info(`[AoE2 automation] ${retryMessage}`);
          if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", retryMessage);
          if (result.sent) {
            startLoadingScreenWatch(process.pid, event.sender);
            await delay(action.settleMs);
            startState = readAoe2HostSetupState(process.pid);
            emitStartVerification(2);
          }
        }
      }
      if (verifiesReady) {
        readyState = readAoe2ReadyState(process.pid, action.point[1]);
        emitVerification("1", readyState.detail);
        if (readyState.state === "not-ready") {
          result = await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
            hoverMs: "hoverMs" in action ? action.hoverMs : undefined,
            holdMs: "holdMs" in action ? action.holdMs : undefined,
            synchronous: true
          });
          await delay(action.settleMs);
          readyState = readAoe2ReadyState(process.pid, action.point[1]);
          emitVerification("2", readyState.detail);
        }
      }
      const message = `CURSOR_ACTION|Target=${target}|Label=${action.label}|DesignPoint=${action.point[0]},${action.point[1]}|${result.detail}`;
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
      const sent = result.sent && (!verifiesReady || readyState?.state === "ready");
      if (!sent) {
        setWindowsInputBlocked(false);
        stopInputGuard();
        console.info(`[AoE2 automation] INPUT_LOCK|Requested=False|Source=LobbyActionUnverified|Target=${target}`);
      }
      return {
        sent,
        message: sent
          ? `${target} ready state verified.`
          : `${target} ready state could not be verified.`
      };
    } catch (error) {
      console.error(`[AoE2 automation] Cursor action ${target} failed`, error);
      setWindowsInputBlocked(false);
      stopInputGuard();
      console.info(`[AoE2 automation] INPUT_LOCK|Requested=False|Source=LobbyActionFailure|Target=${target}`);
      return { sent: false, message: `${target} cursor action failed.` };
    } finally {
      setMainWindowGameCoverClickThrough(false);
    }
  });

  ipcMain.handle("game:select-civilization", async (
    event,
    selection: Aoe2CivilizationSelection,
    slot: number
  ) => {
    if (process.platform !== "win32"
      || !Number.isInteger(slot)
      || slot < 1
      || slot > aoe2UiManifest.civilizationSlotButtons.rowCenters.length
      || (!(selection in aoe2UiManifest.civilizationGrid.entries)
        && !(selection in aoe2UiManifest.civilizationGrid.selectorEntries))) {
      return { sent: false, message: "That civilization selection is not supported." };
    }

    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    const installation = await detectAoe2Installation();
    const localization = installation.installed && installation.path
      ? await loadAoe2Localization(installation.path)
      : { languageCode: "en", names: {} as Record<string, string> };
    const localizedSelection = localization.names[selection] ?? selection;
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    try {
      const gameProcess = await prepareHiddenAoe2WindowBehind();
      if (!gameProcess.running || !gameProcess.pid || !gameProcess.windowReady) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const [slotX, slotY] = civilizationSlotDesignPoint(slot);
      const slotResult = await postAoe2DesignClick(gameProcess.pid, slotX, slotY, { synchronous: true });
      emitLog(`CIV_SELECT|Step=Open|Slot=${slot}|DesignPoint=${slotX},${slotY}|${slotResult.detail}`);
      if (!slotResult.sent) throw new Error(`Lobby slot ${slot} civilization button could not be opened.`);
      await delay(aoe2UiManifest.civilizationSlotButtons.settleMs);

      let civilizationX: number;
      let civilizationY: number;
      const usesFilteredPicker = selection in aoe2UiManifest.civilizationGrid.entries;
      const confirmPoint = aoe2UiManifest.actions.confirmCivilization.point;
      const selectRandomFallback = async (reason: "TileUnavailable" | "ConfirmationFailed") => {
        const searchPoint = aoe2UiManifest.civilizationPicker.searchPoint;
        const fallbackSearchFocus = await postAoe2DesignClick(
          gameProcess.pid!,
          searchPoint[0],
          searchPoint[1],
          { synchronous: true }
        );
        emitLog(
          `CIV_SELECT|Step=FallbackSearchFocus|Selection=${selection}|Reason=${reason}`
          + `|${fallbackSearchFocus.detail}`
        );
        if (!fallbackSearchFocus.sent) throw new Error("The civilization search could not be focused for fallback.");
        const fallbackSearchClear = await clearAoe2TextField(gameProcess.pid!);
        emitLog(
          `CIV_SELECT|Step=FallbackSearchClear|Selection=${selection}|Reason=${reason}`
          + `|${fallbackSearchClear.detail}`
        );
        if (!fallbackSearchClear.sent) throw new Error("The civilization search could not be cleared for fallback.");
        await delay(aoe2UiManifest.civilizationPicker.searchSettleMs);

        const [randomX, randomY] = civilizationDesignPoint("Random");
        let randomSelected = false;
        for (let attempt = 1; attempt <= 1 && !randomSelected; attempt += 1) {
          const randomTile = await postAoe2DesignClick(
            gameProcess.pid!,
            randomX,
            randomY,
            {
              synchronous: true,
              hoverMs: aoe2UiManifest.civilizationGrid.hoverMs,
              holdMs: aoe2UiManifest.civilizationGrid.holdMs
            }
          );
          emitLog(
            `CIV_SELECT|Step=FallbackRandom|FailedSelection=${selection}|Reason=${reason}|Attempt=${attempt}`
            + `|DesignPoint=${randomX},${randomY}|${randomTile.detail}`
          );
          if (!randomTile.sent) continue;
          await delay(aoe2UiManifest.civilizationPicker.selectionSettleMs);
          let randomState = readAoe2CivilizationTileState(gameProcess.pid!, randomX, randomY);
          emitLog(
            `CIV_SELECT|Step=FallbackRandomVerify|FailedSelection=${selection}|Reason=${reason}`
            + `|Attempt=${attempt}|${randomState.detail}`
          );
          randomSelected = randomState.state === "selected";
          if (!randomSelected && randomState.state === "not-selected") {
            const randomEnter = await sendAoe2Enter(gameProcess.pid!);
            emitLog(
              `CIV_SELECT|Step=FallbackRandomEnter|FailedSelection=${selection}|Reason=${reason}`
              + `|Attempt=${attempt}|${randomEnter.detail}`
            );
            if (!randomEnter.sent) continue;
            await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);
            const enterPickerState = readAoe2CivilizationPickerState(gameProcess.pid!);
            emitLog(
              `CIV_SELECT|Step=FallbackRandomEnterVerify|FailedSelection=${selection}|Reason=${reason}`
              + `|Attempt=${attempt}|${enterPickerState.detail}`
            );
            if (enterPickerState.state === "closed") {
              emitLog(`CIV_SELECT|Complete=True|Selection=Random|FallbackFrom=${selection}|Slot=${slot}|Reason=${reason}`);
              return {
                sent: true,
                message: `${selection} could not be selected; Random selected for AoE2 lobby slot ${slot}.`,
                usedRandomCivilizationFallback: true
              };
            }
            randomState = readAoe2CivilizationTileState(gameProcess.pid!, randomX, randomY);
            randomSelected = randomState.state === "selected";
          }
        }
        if (!randomSelected) {
          throw new Error(`Random selection could not be verified after ${selection} failed.`);
        }

        const randomConfirm = await postAoe2DesignClick(
          gameProcess.pid!,
          confirmPoint[0],
          confirmPoint[1],
          { synchronous: true }
        );
        emitLog(
          `CIV_SELECT|Step=FallbackConfirmClick|FailedSelection=${selection}|Reason=${reason}`
          + `|${randomConfirm.detail}`
        );
        if (!randomConfirm.sent) throw new Error("Random civilization confirmation could not be clicked.");
        await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);

        let fallbackPickerState = readAoe2CivilizationPickerState(gameProcess.pid!);
        emitLog(
          `CIV_SELECT|Step=FallbackVerifyReturn|FailedSelection=${selection}|Reason=${reason}`
          + `|${fallbackPickerState.detail}`
        );
        if (fallbackPickerState.state === "open") {
          const randomEnter = await sendAoe2Enter(gameProcess.pid!);
          emitLog(
            `CIV_SELECT|Step=FallbackConfirmEnter|FailedSelection=${selection}|Reason=${reason}`
            + `|${randomEnter.detail}`
          );
          if (!randomEnter.sent) throw new Error("Random civilization confirmation Enter could not be sent.");
          await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);
          fallbackPickerState = readAoe2CivilizationPickerState(gameProcess.pid!);
        }
        if (fallbackPickerState.state !== "closed") {
          throw new Error(`Random selection did not close the civilization picker after ${selection} failed.`);
        }
        emitLog(`CIV_SELECT|Complete=True|Selection=Random|FallbackFrom=${selection}|Slot=${slot}|Reason=${reason}`);
        return {
          sent: true,
          message: `${selection} could not be selected; Random selected for AoE2 lobby slot ${slot}.`,
          usedRandomCivilizationFallback: true
        };
      };
      if (usesFilteredPicker) {
        const searchPoint = aoe2UiManifest.civilizationPicker.searchPoint;
        const searchFocus = await postAoe2DesignClick(
          gameProcess.pid,
          searchPoint[0],
          searchPoint[1],
          { synchronous: true }
        );
        emitLog(`CIV_SELECT|Step=SearchFocus|Selection=${selection}|${searchFocus.detail}`);
        if (!searchFocus.sent) throw new Error("The civilization search field could not be focused.");
        const clearSearch = await clearAoe2TextField(gameProcess.pid);
        emitLog(`CIV_SELECT|Step=SearchClear|Selection=${selection}|${clearSearch.detail}`);
        if (!clearSearch.sent) throw new Error("The civilization search field could not be cleared.");
        const searchText = await sendAoe2Text(gameProcess.pid, localizedSelection);
        emitLog(`CIV_SELECT|Step=SearchText|Selection=${selection}|Localized=${localizedSelection}|Language=${localization.languageCode}|${searchText.detail}`);
        if (!searchText.sent) throw new Error(`${selection} could not be entered in the civilization search.`);
        await delay(aoe2UiManifest.civilizationPicker.searchSettleMs);
        [civilizationX, civilizationY] = aoe2UiManifest.civilizationPicker.filteredCivilizationPoint;
      } else {
        [civilizationX, civilizationY] = civilizationDesignPoint(selection);
      }

      let tileSelected = false;
      for (let attempt = 1; attempt <= 1 && !tileSelected; attempt += 1) {
        const tileResult = await postAoe2DesignClick(
          gameProcess.pid,
          civilizationX,
          civilizationY,
          {
            synchronous: true,
            hoverMs: aoe2UiManifest.civilizationGrid.hoverMs,
            holdMs: aoe2UiManifest.civilizationGrid.holdMs
          }
        );
        emitLog(
          `CIV_SELECT|Step=Tile|Selection=${selection}|Attempt=${attempt}`
          + `|DesignPoint=${civilizationX},${civilizationY}|${tileResult.detail}`
        );
        if (!tileResult.sent) continue;
        await delay(aoe2UiManifest.civilizationPicker.selectionSettleMs);
        const tileState = readAoe2CivilizationTileState(gameProcess.pid, civilizationX, civilizationY);
        emitLog(`CIV_SELECT|Step=TileVerify|Selection=${selection}|Attempt=${attempt}|${tileState.detail}`);
        tileSelected = tileState.state === "selected";
        if (!tileSelected && tileState.state === "not-selected") {
          // Background window-message clicks reliably establish AoE2's gray
          // hover/focus outline, but some builds defer tile activation until
          // Enter. Only use this path after verifying that the requested tile,
          // rather than an unrelated red/unhovered area, acquired focus.
          const tileEnter = await sendAoe2Enter(gameProcess.pid);
          emitLog(`CIV_SELECT|Step=TileEnter|Selection=${selection}|Attempt=${attempt}|${tileEnter.detail}`);
          if (!tileEnter.sent) continue;
          await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);
          const enterPickerState = usesFilteredPicker
            ? readAoe2CivilizationPickerState(gameProcess.pid)
            : null;
          const enterLobbyState = enterPickerState ? null : readAoe2HostSetupState(gameProcess.pid);
          emitLog(
            `CIV_SELECT|Step=TileEnterVerify|Selection=${selection}|Attempt=${attempt}`
            + `|${enterPickerState?.detail ?? enterLobbyState?.detail ?? "State=unknown"}`
          );
          if (enterPickerState?.state === "closed" || enterLobbyState?.state === "lobby-room") {
            emitLog(`CIV_SELECT|Complete=True|Selection=${selection}|Slot=${slot}|Activation=TileEnter`);
            return { sent: true, message: `${selection} selected for AoE2 lobby slot ${slot}.` };
          }
          const afterEnterTileState = readAoe2CivilizationTileState(
            gameProcess.pid,
            civilizationX,
            civilizationY
          );
          emitLog(
            `CIV_SELECT|Step=TileEnterSelectionVerify|Selection=${selection}`
            + `|Attempt=${attempt}|${afterEnterTileState.detail}`
          );
          tileSelected = afterEnterTileState.state === "selected";
        }
      }
      if (!tileSelected) {
        if (usesFilteredPicker) return await selectRandomFallback("TileUnavailable");
        throw new Error(`${selection} could not be visibly selected.`);
      }

      const confirmClick = await postAoe2DesignClick(
        gameProcess.pid,
        confirmPoint[0],
        confirmPoint[1],
        { synchronous: true }
      );
      emitLog(`CIV_SELECT|Step=ConfirmClick|Selection=${selection}|${confirmClick.detail}`);
      if (!confirmClick.sent) throw new Error("The civilization Confirm button could not be clicked.");
      await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);

      const pickerState = usesFilteredPicker
        ? readAoe2CivilizationPickerState(gameProcess.pid)
        : null;
      const lobbyState = pickerState ? null : readAoe2HostSetupState(gameProcess.pid);
      emitLog(
        `CIV_SELECT|Step=VerifyReturn|Selection=${selection}`
        + `|${pickerState?.detail ?? lobbyState?.detail ?? "State=unknown"}`
      );
      const selectionVerified = pickerState
        ? pickerState.state === "closed"
        : lobbyState?.state === "lobby-room";
      if (!selectionVerified) {
        const enter = await sendAoe2Enter(gameProcess.pid);
        emitLog(`CIV_SELECT|Step=ConfirmEnterFallback|Selection=${selection}|${enter.detail}`);
        if (!enter.sent) throw new Error("Civilization confirmation Enter could not be sent.");
        await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);
        const enterPickerState = usesFilteredPicker
          ? readAoe2CivilizationPickerState(gameProcess.pid)
          : null;
        const enterLobbyState = enterPickerState ? null : readAoe2HostSetupState(gameProcess.pid);
        emitLog(
          `CIV_SELECT|Step=VerifyEnterFallback|Selection=${selection}`
          + `|${enterPickerState?.detail ?? enterLobbyState?.detail ?? "State=unknown"}`
        );
        if (enterPickerState?.state === "closed" || enterLobbyState?.state === "lobby-room") {
          emitLog(`CIV_SELECT|Complete=True|Selection=${selection}|Slot=${slot}`);
          return { sent: true, message: `${selection} selected for AoE2 lobby slot ${slot}.` };
        }
        if (enterPickerState?.state === "open" && usesFilteredPicker) {
          return await selectRandomFallback("ConfirmationFailed");
        }
        throw new Error(
          pickerState?.state === "unknown"
            ? `${selection} picker state could not be verified after selection.`
            : `${selection} selection did not close the civilization picker.`
        );
      }
      emitLog(`CIV_SELECT|Complete=True|Selection=${selection}|Slot=${slot}`);
      return { sent: true, message: `${selection} selected for AoE2 lobby slot ${slot}.` };
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Civilization selection failed.";
      emitLog(`CIV_SELECT|Complete=False|Error=${detail}`);
      setWindowsInputBlocked(false);
      stopInputGuard();
      emitLog("INPUT_LOCK|Requested=False|Source=CivilizationSelectionFailure");
      return { sent: false, message: detail };
    } finally {
      setMainWindowGameCoverClickThrough(false);
    }
  });

  ipcMain.handle("game:select-team", async (
    event,
    team: 1 | 2,
    slot: number,
    automationContext: "ranked" | "custom" = "ranked"
  ) => {
    if (process.platform !== "win32"
      || (team !== 1 && team !== 2)
      || !Number.isInteger(slot)
      || slot < 1
      || slot > aoe2UiManifest.teamSlotButtons.rowCenters.length) {
      return { sent: false, message: "That team selection is not supported." };
    }
    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    try {
      const gameProcess = await prepareHiddenAoe2WindowBehind();
      if (!gameProcess.running || !gameProcess.pid || !gameProcess.windowReady) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const [x, y] = teamSlotDesignPoint(slot);
      // AoE initializes the selector at "?": first click is "-", second is Team 1.
      const clicks = team + 1;
      for (let index = 0; index < clicks; index += 1) {
        const result = await postAoe2DesignClick(gameProcess.pid, x, y, {
          synchronous: true,
          hoverMs: 100,
          holdMs: 100,
          requireMove: true
        });
        emitLog(`TEAM_SELECT|Slot=${slot}|Team=${team}|Click=${index + 1}/${clicks}|${result.detail}`);
        if (!result.sent) throw new Error(`Team ${team} could not be selected for lobby slot ${slot}.`);
        await delay(150);
      }
      return { sent: true, message: `Team ${team} selected for AoE2 lobby slot ${slot}.` };
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Team selection failed.";
      emitLog(`TEAM_SELECT|Complete=False|Error=${detail}`);
      setWindowsInputBlocked(false);
      stopInputGuard();
      emitLog("INPUT_LOCK|Requested=False|Source=TeamSelectionFailure");
      return { sent: false, message: detail };
    } finally {
      setMainWindowGameCoverClickThrough(false);
    }
  });

  ipcMain.handle("game:test-host-game-mouse-click", async (event) => {
    if (process.platform !== "win32") {
      return { sent: false, message: "Background mouse testing is only supported on Windows." };
    }
    const script = hostGameMouseClickScript
      .replace("__DESIGN_X__", "1905")
      .replace("__DESIGN_Y__", "1855");
    const encodedScript = Buffer.from(script, "utf16le").toString("base64");
    try {
      const { stdout } = await execFileAsync("powershell.exe", [
        "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
      ], { windowsHide: true });
      const result = stdout.trim();
      const sent = result.startsWith("SENT");
      const logMessage = `MOUSE|Target=Host Game|DesignPoint=1905,1855|${result}`;
      console.info(`[AoE2 automation] ${logMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", logMessage);
      return {
        sent,
        message: sent ? "Background click sent to Host Game." : "The Host Game click could not be sent."
      };
    } catch (error) {
      console.error("[AoE2 automation] Host Game mouse test failed", error);
      return { sent: false, message: "The Host Game mouse test failed." };
    }
  });

  ipcMain.handle("game:calibrate-host-game-mouse-click", async (event) => {
    if (process.platform !== "win32") {
      return { sent: false, message: "Mouse calibration is only supported on Windows." };
    }
    const encodedScript = Buffer.from(hostGameMouseCalibrationScript, "utf16le").toString("base64");
    try {
      const { stdout } = await execFileAsync("powershell.exe", [
        "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
      ], { windowsHide: true });
      const result = stdout.trim();
      const sent = result.startsWith("SENT");
      const logMessage = `MOUSE_CALIBRATION|Target=Host Game|${result}`;
      console.info(`[AoE2 automation] ${logMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", logMessage);
      return {
        sent,
        message: sent ? "Calibrated background click sent at the cursor position." : "Mouse calibration did not complete."
      };
    } catch (error) {
      console.error("[AoE2 automation] Host Game mouse calibration failed", error);
      return { sent: false, message: "Mouse calibration failed. Keep the cursor over Host Game for the full countdown." };
    }
  });

  ipcMain.handle("game:test-fake-activation-mouse-click", async (event) => {
    if (process.platform !== "win32") {
      return { sent: false, message: "Fake-activation mouse testing is only supported on Windows." };
    }
    const encodedScript = Buffer.from(fakeActivationMouseClickScript, "utf16le").toString("base64");
    try {
      const { stdout } = await execFileAsync("powershell.exe", [
        "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
      ], { windowsHide: true });
      const result = stdout.trim();
      const sent = result.startsWith("SENT");
      const logMessage = `MOUSE_FAKE_ACTIVATION|Target=Host Game|${result}`;
      console.info(`[AoE2 automation] ${logMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", logMessage);
      return {
        sent,
        message: sent ? "Fake-activation click sent to Host Game." : "The fake-activation click could not be sent."
      };
    } catch (error) {
      console.error("[AoE2 automation] Fake-activation mouse test failed", error);
      return { sent: false, message: "The fake-activation mouse test failed." };
    }
  });

  ipcMain.handle("game:create-ranked-1v1-lobby", async (_event, request: CreateLobbyRequest) => {
    await delay(lobbySetupTiming.lobbyMetadataMs);
    return {
      lobby: {
        platformLobbyId: `AOE-${Math.floor(100000 + Math.random() * 899999)}`,
        lobbyName: `Empire League ${request.matchId.slice(-4).toUpperCase()}`,
        password: "empire",
        hostProfileId: request.hostProfileId,
        guestProfileId: request.guestProfileId,
        map: request.map,
        settings: {
          playerCount: request.playerCount,
          gameMode: "Random Map",
          speed: "Normal",
          startingAge: "Dark Age",
          startingResources: "Standard",
          populationLimit: 200,
          victoryCondition: "Conquest",
          cheatsEnabled: false,
          recordGame: true,
          spectatorsAllowed: true,
          hiddenCivilizations: false
        },
        verification: {
          correctPlayers: true,
          correctMap: true,
          correctSettings: true,
          cheatsDisabled: true,
          recordingEnabled: true,
          noUnexpectedPlayers: true
        }
      }
    };
  });

  ipcMain.handle("game:open-lobby", async (
    event,
    lobbyId: string,
    _allowCustomContentPrompt = false
  ) => {
    if (!/^aoe2de:\/\/0\/\d+$/.test(lobbyId)) {
      return { opened: false };
    }
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    const game = await prepareHiddenAoe2WindowBehind();
    if (!game.running || !game.pid || !game.windowReady) {
      return { opened: false };
    }
    const gameWindow = getAoe2NativeWindowHandle(game.pid);
    if (!gameWindow) return { opened: false };
    const captureReady = await waitForFreshAoe2WindowCapture(gameWindow);
    console.info(
      `[AoE2 automation] WINDOW_CAPTURE_WAIT|Context=GuestOpenLobby|Ready=${captureReady}`
      + `|${describeAoe2WindowCapture(gameWindow)}`
    );
    if (!captureReady) return { opened: false };
    const inputGuardStarted = await startInputGuard(appWindow);
    console.info(`[AoE2 automation] INPUT_LOCK|Requested=True|Guard=${inputGuardStarted}|Source=GuestOpenLobby`);
    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    // Steam activates AoE2 asynchronously while handing off the lobby URI.
    // Keep reasserting the non-activating bottom z-order throughout that handoff
    // so the game cannot escape above the Electron automation cover.
    const keepGameBehind = setInterval(() => {
      if (isAoe2NativeWindowForeground(game.pid!)) {
        keepAoe2NativeWindowBehind(game.pid!);
        if (appWindow && !appWindow.isDestroyed()) showMainWindowAsGameCover(appWindow);
      }
    }, 25);
    keepGameBehind.unref();
    try {
      const installation = await detectAoe2Installation();
      const helperExecutable = await getAoeUrlHelperExecutable(installation.path);
      if (!helperExecutable) {
        emitLog("LOBBY_HANDOFF|Method=AoeUrlHelperExecutable|Accepted=False|Reason=HELPER_NOT_FOUND");
        return { opened: false };
      }
      // Invoke AoE2's bundled URL helper directly instead of asking Windows
      // to resolve the aoe2de:// protocol. This is the same Microsoft helper
      // the protocol registration normally calls, and it performs the Steam
      // handoff that `steam.exe -applaunch` alone does not forward to an
      // already-running game.
      const handoff = spawn(
        helperExecutable,
        [lobbyId],
        { detached: true, stdio: "ignore", windowsHide: false }
      );
      const handoffStarted = await new Promise<boolean>((resolve) => {
        handoff.once("spawn", () => resolve(true));
        handoff.once("error", (error) => {
          emitLog(
            `LOBBY_HANDOFF|Method=AoeUrlHelperExecutable|Accepted=False`
            + `|Reason=SPAWN_FAILED|Error=${error.message.replaceAll("|", "/")}`
          );
          resolve(false);
        });
      });
      if (!handoffStarted) return { opened: false };
      handoff.unref();
      emitLog(
        `LOBBY_HANDOFF|Method=AoeUrlHelperExecutable|Accepted=True`
        + `|Pid=${handoff.pid ?? "unknown"}|Uri=${lobbyId}`
      );
      keepAoe2NativeWindowBehind(game.pid);
      // The URL helper hands the URI to an already-running game asynchronously.
      // Preserve the historically stable settle period instead of rejecting a
      // successful join based on screen pixels that vary by resolution and UI
      // state. Custom-content confirmation remains in the guest Ready flow.
      await delay(lobbySetupTiming.guestJoinMs);
      keepAoe2NativeWindowBehind(game.pid);
      emitLog(
        `LOBBY_HANDOFF_WAIT|Method=AoeUrlHelperExecutable`
        + `|Completed=True|SettleMs=${lobbySetupTiming.guestJoinMs}`
      );
    } finally {
      clearInterval(keepGameBehind);
      keepAoe2NativeWindowBehind(game.pid);
    }
    return { opened: true };
  });
}
