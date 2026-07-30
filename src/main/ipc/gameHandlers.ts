import { app, BrowserWindow, clipboard, ipcMain, screen, shell } from "electron";
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { access, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { CreateLobbyRequest, GameInputKey } from "../../shared/contracts/gameIntegration.js";
import type { SteamFamilyProbeResult } from "../../shared/contracts/electronApi.js";
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
import {
  closeAoe2NativeWindow,
  clearAoe2TextField,
  detectAoe2NativeProcess,
  focusAoe2NativeWindow,
  setWindowsInputBlocked,
  isAoe2NativeWindowForeground,
  keepAoe2NativeWindowBehind,
  postAoe2Enter,
  postAoe2DesignClick,
  readAoe2HostSetupState,
  readAoe2ReadyState,
  sendAoe2End,
  sendAoe2Down,
  sendAoe2Enter,
  sendAoe2Home,
  sendAoe2Tab,
  sendAoe2Text
} from "../aoe2Win32Automation.js";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const execFileAsync = promisify(execFile);
const aoe2AppId = "813780";
const currentDir = dirname(fileURLToPath(import.meta.url));
let launchRequested = false;
let ownedAoe2Pid: number | undefined;
let quittingAfterGameCleanup = false;
let tabTestProcess: ChildProcess | undefined;
let inputGuardProcess: ChildProcess | undefined;
let inputGuardWindow: BrowserWindow | undefined;
let inputGuardStopTimer: NodeJS.Timeout | undefined;
const guardedSenders = new WeakSet<object>();
let offscreenWindowProcess: ChildProcess | undefined;
let aoe2WindowMonitor: NodeJS.Timeout | undefined;
let aoe2WindowIsOffscreen = false;
let replayEndPoller: NodeJS.Timeout | undefined;
let replayFocusTimers: NodeJS.Timeout[] = [];
let returnToMenuPoller: NodeJS.Timeout | undefined;
let replayDetectionGeneration = 0;

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
  const maps: Array<{ id: string; name: string; gameName: string; kind: "map" | "scenario"; path: string; source: string; enabled: boolean; modName?: string }> = [];
  const dataMods: Array<{ id: string; name: string; gameName: string; kind: "data_mod"; path: string; source: string; enabled: boolean; modName?: string }> = [];
  const seen = new Set<string>();

  const add = (
    kind: "map" | "scenario" | "data_mod",
    path: string,
    source: string,
    label?: string,
    gameName?: string,
    availability: { enabled?: boolean; modName?: string } = {}
  ) => {
    const name = (label || basename(path, extname(path))).trim();
    const normalizedName = name.toLowerCase().replace(/\s+/g, " ");
    const key = `${kind}:${normalizedName}`;
    if (seen.has(key)) return;
    seen.add(key);
    const item = {
      id: Buffer.from(`${key}:${path.toLowerCase()}`).toString("base64url"),
      name,
      gameName: gameName ?? basename(path, extname(path)),
      kind,
      path,
      source,
      enabled: availability.enabled !== false,
      ...(availability.modName ? { modName: availability.modName } : {})
    };
    (kind === "data_mod" ? dataMods : maps).push(item as never);
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
      const scenarioFiles: Array<{ path: string; name: string; size: number }> = [];
      await walk(modRoot, source, { modRoot, modName: displayName, enabled: status?.enabled !== false, scenarioFiles });
      for (const scenario of selectScenarioVariants(modName, scenarioFiles)) {
        add(
          "scenario",
          scenario.path,
          source,
          `${modName} — ${scenario.variant}`,
          basename(scenario.path, extname(scenario.path)),
          { enabled: status?.enabled !== false, modName: displayName }
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

  const byName = <T extends { name: string }>(left: T, right: T) => left.name.localeCompare(right.name);
  return {
    maps: maps.sort(byName),
    dataMods: dataMods.sort(byName),
    scannedRoots: roots,
    scannedAt: new Date().toISOString()
  };
}

const replayPollIntervalMs = 1500;
const replayStartupWindowMs = 60_000;
const replayStartupStableForMs = 6_000;
const replayRunningStableForMs = 3_000;
const replayStartTimeoutMs = 30_000;

interface ReplaySnapshot {
  path: string;
  size: number;
  modifiedMs: number;
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
}

function clearReplayFocusTimers(): void {
  for (const timer of replayFocusTimers) clearTimeout(timer);
  replayFocusTimers = [];
}

function focusMainWindowAfterReplay(window: BrowserWindow): void {
  clearReplayFocusTimers();
  focusMainWindow(window);
  for (const delayMs of [250, 1000]) {
    const timer = setTimeout(() => {
      replayFocusTimers = replayFocusTimers.filter((candidate) => candidate !== timer);
      if (!window.isDestroyed()) focusMainWindow(window);
    }, delayMs);
    timer.unref();
    replayFocusTimers.push(timer);
  }
}

function stopReturnToMenuWatch(): void {
  if (returnToMenuPoller) clearTimeout(returnToMenuPoller);
  returnToMenuPoller = undefined;
  hideReturnToMenuOverlay();
}

function startReturnToMenuWatch(window: BrowserWindow): void {
  stopReturnToMenuWatch();
  showReturnToMenuOverlay();
  let consecutiveMainMenuReads = 0;

  const poll = (): void => {
    if (window.isDestroyed()) {
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
      const state = readAoe2HostSetupState(game.pid);
      consecutiveMainMenuReads = state.state === "main-menu"
        ? consecutiveMainMenuReads + 1
        : 0;
      if (consecutiveMainMenuReads >= 2) {
        stopReturnToMenuWatch();
        focusMainWindowAfterReplay(window);
        return;
      }
    }
    returnToMenuPoller = setTimeout(poll, 250);
    returnToMenuPoller.unref();
  };

  poll();
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
  let activeCreatedDuringWatch = false;
  let lastCandidateKey: string | undefined;

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

  const poll = async (): Promise<void> => {
    if (generation !== replayDetectionGeneration || window.isDestroyed()) return;
    try {
      const files = await findReplayFiles(configuredFolder);
      if (!active) {
        // Detection starts shortly after Start Game. Accept a recently-created file,
        // but require a subsequent write before it can ever signal completion.
        active = files
          .filter((file) => file.modifiedMs >= startedAt - 60_000)
          .sort((left, right) => right.modifiedMs - left.modifiedMs)[0];
        if (active) {
          activeCreatedDuringWatch = !initialFiles.some((file) => file.path === active?.path);
          lastGrowthAt = Date.now();
        }
      } else {
        const newest = files
          .filter((file) => file.modifiedMs >= startedAt - 60_000)
          .sort((left, right) => right.modifiedMs - left.modifiedMs)[0];
        if (!observedGrowth && newest && newest.path !== active.path && newest.modifiedMs > active.modifiedMs) {
          active = newest;
          activeCreatedDuringWatch = !initialFiles.some((file) => file.path === newest.path);
          lastGrowthAt = Date.now();
        }
        const current = files.find((file) => file.path === active?.path);
        if (current && (current.size !== active.size || current.modifiedMs !== active.modifiedMs)) {
          observedGrowth = true;
          lastGrowthAt = Date.now();
          active = current;
          if (!window.webContents.isDestroyed()) window.webContents.send("game:replay-ended", current.path);
        } else if (current && (observedGrowth || activeCreatedDuringWatch)) {
          const now = Date.now();
          const elapsedMs = now - startedAt;
          const stableForMs = elapsedMs < replayStartupWindowMs
            ? replayStartupStableForMs
            : replayRunningStableForMs;
          const candidateKey = `${current.path}|${current.size}|${current.modifiedMs}`;
          if (now - lastGrowthAt >= stableForMs && candidateKey !== lastCandidateKey) {
            lastCandidateKey = candidateKey;
            if (!window.webContents.isDestroyed()) window.webContents.send("game:replay-ended", current.path);
            console.info(
              `[AoE2 replay] INSPECT|Reason=QuietFallback|File=${current.path}|StableMs=${stableForMs}|ElapsedMs=${elapsedMs}`
            );
          }
        }
      }

      if (!observedGrowth && Date.now() - startedAt >= replayStartTimeoutMs) {
        stopReplayEndDetection();
        focusMainWindowAfterReplay(window);
        if (!window.webContents.isDestroyed()) {
          window.webContents.send(
            "game:replay-detection-failed",
            "The replay file did not start updating within 30 seconds of the match starting."
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

public static class AoeInputGuard {
  private const int WH_KEYBOARD_LL = 13;
  private const int WH_MOUSE_LL = 14;
  private const uint WM_QUIT = 0x0012;
  private const int VK_CONTROL = 0x11;
  private const int VK_SHIFT = 0x10;
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
  [DllImport("user32.dll")] private static extern int GetMessage(out Message message, IntPtr window, uint min, uint max);
  [DllImport("user32.dll")] private static extern bool PostThreadMessage(uint threadId, uint message, IntPtr wParam, IntPtr lParam);
  [DllImport("kernel32.dll")] private static extern uint GetCurrentThreadId();
  [DllImport("kernel32.dll")] private static extern IntPtr GetModuleHandle(string moduleName);

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

  public static int Run(uint processId) {
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

    Console.WriteLine("GUARD_READY");
    Console.Out.Flush();
    Message message;
    while (GetMessage(out message, IntPtr.Zero, 0, 0) > 0) { }
    Release();
    return 0;
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
      bool emergency = key == VK_F12
        && (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0
        && (GetAsyncKeyState(VK_SHIFT) & 0x8000) != 0;
      if (emergency) {
        PostThreadMessage(guardThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
      } else {
        uint message = unchecked((uint)wParam.ToInt64());
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
      if ((data.Flags & LLMHF_INJECTED) != 0) return new IntPtr(1);
      uint message = unchecked((uint)wParam.ToInt64());
      int wheel = unchecked((short)(data.MouseData >> 16));
      if (message == 0x0200) {
        virtualMouseX = Math.Max(virtualLeft, Math.Min(virtualRight, virtualMouseX + data.Point.X - mouseAnchor.X));
        virtualMouseY = Math.Max(virtualTop, Math.Min(virtualBottom, virtualMouseY + data.Point.Y - mouseAnchor.Y));
        SetCursorPos(mouseAnchor.X, mouseAnchor.Y);
      }
      Console.WriteLine("MOUSE|{0}|{1}|{2}|{3}", message, virtualMouseX, virtualMouseY, wheel);
      Console.Out.Flush();
      return new IntPtr(1);
    }
    return CallNextHookEx(mouseHook, code, wParam, lParam);
  }

  private static void Release() {
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
$exitCode = [AoeInputGuard]::Run([uint32]$game.Id)
exit $exitCode
`;

function stopInputGuard(): void {
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = undefined;
  const guard = inputGuardProcess;
  inputGuardProcess = undefined;
  inputGuardWindow = undefined;
  guard?.kill();
}

function scheduleInputGuardStop(): void {
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = setTimeout(stopInputGuard, 750);
}

async function startInputGuard(window?: BrowserWindow | null): Promise<boolean> {
  if (inputGuardStopTimer) clearTimeout(inputGuardStopTimer);
  inputGuardStopTimer = undefined;
  if (window && !window.isDestroyed()) inputGuardWindow = window;
  if (inputGuardProcess && !inputGuardProcess.killed) return true;
  const encodedScript = Buffer.from(inputGuardScript, "utf16le").toString("base64");
  const child = spawn("powershell.exe", [
    "-NoProfile", "-STA", "-OutputFormat", "Text", "-EncodedCommand", encodedScript
  ], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  inputGuardProcess = child;
  child.stderr?.on("data", (chunk: Buffer) => {
    console.error(`[AoE2 automation] INPUT_GUARD_ERROR|${chunk.toString().trim()}`);
  });
  child.once("exit", (code) => {
    if (inputGuardProcess === child) inputGuardProcess = undefined;
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
    child.once("exit", () => finish(false));
    child.stdout?.on("data", (chunk: Buffer) => {
      stdoutBuffer += chunk.toString();
      const messages = stdoutBuffer.split(/\r?\n/);
      stdoutBuffer = messages.pop() ?? "";
      messages.filter(Boolean).forEach((message) => {
        if (message.startsWith("KEY|") || message.startsWith("MOUSE|")) {
          forwardGuardedInput(message);
          return;
        }
        console.info(`[AoE2 automation] INPUT_GUARD|${message}`);
        if (message.includes("GUARD_READY")) finish(true);
        if (message.includes("GUARD_ERROR")) finish(false);
      });
    });
    child.once("exit", () => finish(false));
    setTimeout(() => finish(false), 5_000);
  });
}

function forwardGuardedInput(message: string): void {
  const window = inputGuardWindow;
  if (!window || window.isDestroyed()) return;
  const parts = message.split("|");
  if (parts[0] === "KEY") {
    const keyCode = electronKeyCode(Number(parts[2]));
    if (!keyCode) return;
    window.webContents.sendInputEvent({
      type: parts[1] === "UP" ? "keyUp" : "keyDown",
      keyCode
    });
    return;
  }
  if (parts[0] !== "MOUSE") return;
  const messageId = Number(parts[1]);
  const screenPoint = screen.screenToDipPoint({ x: Number(parts[2]), y: Number(parts[3]) });
  const bounds = window.getContentBounds();
  const x = Math.round(screenPoint.x - bounds.x);
  const y = Math.round(screenPoint.y - bounds.y);
  if (x < 0 || y < 0 || x >= bounds.width || y >= bounds.height) return;
  if (messageId === 0x0200) {
    window.webContents.send("game:lobby-guard-pointer", { x, y });
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
    0x2e: "Delete"
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
  ipcMain.handle("game:scan-local-custom-content", scanLocalCustomContent);
  ipcMain.handle("game:set-lobby-input-lock", async (event, locked: boolean) => {
    const requested = locked === true;
    const applied = setWindowsInputBlocked(requested);
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

  app.on("before-quit", (event) => {
    stopReplayEndDetection();
    if ((!ownedAoe2Pid && !launchRequested) || quittingAfterGameCleanup) return;
    event.preventDefault();
    quittingAfterGameCleanup = true;
    void (async () => {
      const pid = ownedAoe2Pid ?? (await detectAoe2Process()).pid;
      ownedAoe2Pid = undefined;
      if (pid) await forceCloseAoe2Process(pid);
    })().finally(() => app.quit());
  });

  ipcMain.handle("game:detect-installation", async () => {
    return detectAoe2Installation();
  });

  ipcMain.handle("game:detect-process", async () => {
    const status = await detectAoe2Process();
    if (launchRequested && status.running && status.pid && !ownedAoe2Pid) {
      ownedAoe2Pid = status.pid;
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
    if (!processStatus.running || !processStatus.pid) return { closed: true, running: false };

    restoreAoe2Window();
    if (force) {
      await forceCloseAoe2Process(processStatus.pid);
    } else {
      closeAoe2NativeWindow(processStatus.pid);
    }

    const closed = await waitForAoe2Exit(force ? 5000 : 8000);
    if (closed) {
      launchRequested = false;
      if (ownedAoe2Pid === processStatus.pid) ownedAoe2Pid = undefined;
    }
    return {
      closed,
      running: !closed,
      message: closed ? undefined : force ? "AoE2 is still running after forced termination." : "AoE2 did not respond to the close request."
    };
  });

  ipcMain.handle("game:launch", async (event) => {
    if (launchRequested) {
      return { launched: true, status: "running", message: "AoE2 DE launch was already requested." };
    }
    launchRequested = true;

    try {
      const installation = await detectAoe2Installation();
      if (!installation.installed) {
        launchRequested = false;
        return {
          launched: false,
          status: "not_detected",
          message: installation.message ?? "AoE2: Definitive Edition is not installed."
        };
      }

      const steamExecutable = await getSteamExecutable();
      if (!steamExecutable) {
        launchRequested = false;
        return { launched: false, status: "not_detected", message: "Steam could not be launched." };
      }

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
      restoreAoe2Window();
      launchRequested = false;
      throw error;
    }
  });

  ipcMain.handle("game:focus", async () => {
    if (cursorAutomationEnabled && process.platform === "win32") {
      hideMainWindowGameCover();
      const game = detectAoe2NativeProcess();
      return { focused: Boolean(game.pid) && focusAoe2NativeWindow(game.pid as number) };
    }
    restoreAoe2Window(true, true);
    return { focused: true };
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

  const registerCreateLobbySequence = (channel: string, isCustomAutomation: boolean) => ipcMain.handle(channel, async (
    event,
    mapName: string,
    playerCount: 2 | 4 | 8 = 2,
    contentKind: "map" | "scenario" = "map"
  ) => {
    stopTabTest();
    setMouseCoordinateOverlayEnabled(false);
    const normalizedMapName = typeof mapName === "string" ? mapName.trim() : "";
    if (process.platform !== "win32") {
      return { sent: false, message: "Lobby automation is only supported on Windows." };
    }
    if (!isCustomAutomation && !(normalizedMapName in aoe2UiManifest.mapPicker.entries)) {
      return { sent: false, message: "A supported AoE2 map name is required." };
    }
    if (isCustomAutomation && contentKind === "map" && !normalizedMapName) {
      return { sent: false, message: "A supported AoE2 map name is required." };
    }
    if (isCustomAutomation && contentKind === "scenario" && !normalizedMapName) {
      return { sent: false, message: "An AoE2 scenario name is required." };
    }
    if (![2, 4, 8].includes(playerCount)) {
      return { sent: false, message: "The lobby must contain 2, 4, or 8 players." };
    }

    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    let gameProcess = isCustomAutomation ? await detectAoe2Process() : undefined;
    if (isCustomAutomation && (!gameProcess?.running || !gameProcess.pid || !gameProcess.windowReady)) {
      return { sent: false, message: "The AoE2 game window was not ready." };
    }
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    let sequenceCompleted = false;
    let sequenceExpired = false;
    let sequenceSafetyTimer: NodeJS.Timeout | undefined;
    try {
      const inputBlocked = setWindowsInputBlocked(true);
      if (isCustomAutomation) {
        sequenceSafetyTimer = setTimeout(() => {
          sequenceExpired = true;
          setWindowsInputBlocked(false);
          stopInputGuard();
          emitLog("SAFETY_TIMEOUT|Source=CreateLobby|InputReleased=True");
        }, 60_000);
      }
      const inputGuardStarted = await startInputGuard(appWindow);
      if (!isCustomAutomation) {
        gameProcess = await detectAoe2Process();
        if (!gameProcess.running || !gameProcess.pid) {
          return { sent: false, message: "The AoE2 process was not found." };
        }
      }
      if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
      if (inputGuardStarted && !guardedSenders.has(event.sender)) {
        guardedSenders.add(event.sender);
        event.sender.once("destroyed", () => {
          setWindowsInputBlocked(false);
          stopInputGuard();
        });
      }
      emitLog(`INPUT_LOCK|Requested=True|BlockInput=${inputBlocked}|Guard=${inputGuardStarted}|Source=CreateLobby`);
      const gamePid = gameProcess?.pid;
      if (!gamePid) throw new Error("The AoE2 process was not found.");
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
          requireMove: timing?.requireMove ?? !isCustomAutomation
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
        const action = aoe2UiManifest.actions[actionName];
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
        if (!expectedState) return;
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
      };

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
      const firstPlayerCount = await sendAoe2Home(process.pid);
      emitLog(`STEP|Select Player Count Base|Key=HOME|${firstPlayerCount.detail}`);
      if (!firstPlayerCount.sent) throw new Error("The lobby player-count menu could not be reset.");
      for (let count = 2; count < playerCount; count += 1) {
        const nextPlayerCount = await sendAoe2Down(process.pid);
        emitLog(`STEP|Select ${count + 1} Players|Key=DOWN|${nextPlayerCount.detail}`);
        if (!nextPlayerCount.sent) throw new Error(`The ${playerCount}-player lobby size could not be selected.`);
        await delay(75);
      }
      await delay(100);
      const confirmPlayerCount = await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm 2 Players|Key=ENTER|${confirmPlayerCount.detail}`);
      if (!confirmPlayerCount.sent) throw new Error(`The ${playerCount}-player lobby size could not be confirmed.`);
      await delay(250);
      await actionStep("createLobby");
      await clickStep("Reset Settings", 3101, 1976);
      await delay(lobbySetupTiming.resetFocusMs);
      // Resetting custom content can briefly stall AoE2's window thread. Queue
      // this confirmation so a processed-but-timed-out SendMessage cannot abort
      // the otherwise successful lobby setup.
      const reset = isCustomAutomation
        ? await postAoe2Enter(process.pid)
        : await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm Reset|Key=ENTER|${reset.detail}`);
      if (!reset.sent) throw new Error(`The reset confirmation could not be ${isCustomAutomation ? "queued" : "sent"}.`);
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
          synchronous: !isCustomAutomation
        });
        if (isCustomAutomation) {
          let scenarioPickerState = readAoe2HostSetupState(process.pid);
          let scenarioPickerDeadline = Date.now() + 5_000;
          while (scenarioPickerState.state !== "content-picker" && Date.now() < scenarioPickerDeadline) {
            if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
            await delay(250);
            scenarioPickerState = readAoe2HostSetupState(process.pid);
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
              scenarioPickerState = readAoe2HostSetupState(process.pid);
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
        const knownMap = normalizedMapName in aoe2UiManifest.mapPicker.entries;
        const mapPoint = knownMap
          ? mapDesignPoint(normalizedMapName as Aoe2MapSelection)
          : [mapPicker.resultColumnCenters[0], mapPicker.resultRowCenters[0]] as const;
        // A reset can keep AoE2's window thread busy for several seconds while
        // custom content is reloaded. Queue the picker click behind that work,
        // then wait for the lobby pixels to change instead of requiring an
        // immediate synchronous response from the game.
        await clickStep("Open Map Picker", mapPicker.openPoint[0], mapPicker.openPoint[1], {
          synchronous: !isCustomAutomation
        });
        if (isCustomAutomation) {
          let mapPickerState = readAoe2HostSetupState(process.pid);
          const mapPickerDeadline = Date.now() + 15_000;
          while (mapPickerState.state !== "content-picker" && Date.now() < mapPickerDeadline) {
            if (sequenceExpired) throw new Error("Create Lobby exceeded its 60-second safety limit.");
            await delay(250);
            mapPickerState = readAoe2HostSetupState(process.pid);
          }
          emitLog(`STEP_VERIFY|Open Map Picker|Expected=content-picker|${mapPickerState.detail}`);
          if (mapPickerState.state !== "content-picker") {
            throw new Error("Open Map Picker did not open the content picker.");
          }
        }
        await delay(mapPicker.openSettleMs);
        const isCustomMap = !knownMap || (mapPicker.customMapNames as readonly string[]).includes(normalizedMapName);
        const mapStyle = isCustomMap ? "Custom" : "Standard";
        const mapStylePoint = isCustomMap ? mapPicker.customStylePoint : mapPicker.standardStylePoint;
        await clickStep("Open Map Style", mapPicker.mapStylePoint[0], mapPicker.mapStylePoint[1], { synchronous: true });
        await delay(mapPicker.styleMenuSettleMs);
        await clickStep(`Select ${mapStyle} Map Style`, mapStylePoint[0], mapStylePoint[1], { synchronous: true });
        await delay(mapPicker.styleSelectionSettleMs);
        await clickStep("Focus Map Search", mapPicker.searchPoint[0], mapPicker.searchPoint[1], { synchronous: true });
        const mapSearch = await sendAoe2Text(process.pid, normalizedMapName);
        emitLog(`MAP_SELECT|Step=Search|Map=${normalizedMapName}|${mapSearch.detail}`);
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
    }
  });
  registerCreateLobbySequence("game:run-create-lobby-sequence", false);
  registerCreateLobbySequence("game:run-custom-create-lobby-sequence", true);

  const registerLobbyCursorAction = (channel: string, isCustomAutomation: boolean) => ipcMain.handle(channel, async (
    event,
    target: "content-confirm" | "guest-ready" | "host-ready" | "start"
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
      const process = await detectAoe2Process();
      if (!process.running || !process.pid) {
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

      let result = readyState?.state === "ready"
        ? { sent: true, detail: "SKIPPED_ALREADY_READY" }
        : readyState?.state === "unknown"
          ? { sent: false, detail: "READY_STATE_UNKNOWN_BEFORE_INPUT" }
          : target === "content-confirm"
            ? await (async () => {
                const tab = await sendAoe2Tab(process.pid as number);
                if (!tab.sent) return tab;
                await delay(contentConfirmationKeyDelayMs);
                const enter = await sendAoe2Enter(process.pid as number);
                return {
                  sent: enter.sent,
                  detail: `Mode=WindowMessageTabEnter|Tab=${tab.detail}|Enter=${enter.detail}`
                };
              })()
            : await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
                hoverMs: "hoverMs" in action ? action.hoverMs : undefined,
                holdMs: "holdMs" in action ? action.holdMs : undefined,
                synchronous: !isCustomAutomation,
                requireMove: !isCustomAutomation
              });

      if (result.detail !== "SKIPPED_ALREADY_READY") await delay(action.settleMs);
      if (verifiesReady) {
        readyState = readAoe2ReadyState(process.pid, action.point[1]);
        emitVerification("1", readyState.detail);
        if (isCustomAutomation) {
          const readyVerificationDeadline = Date.now() + 10_000;
          while (readyState.state === "not-ready" && Date.now() < readyVerificationDeadline) {
            await delay(250);
            readyState = readAoe2ReadyState(process.pid, action.point[1]);
          }
          emitVerification("settled", readyState.detail);
        } else if (readyState.state === "not-ready") {
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
  registerLobbyCursorAction("game:run-lobby-cursor-action", false);
  registerLobbyCursorAction("game:run-custom-lobby-cursor-action", true);

  const registerCivilizationSelection = (channel: string) => ipcMain.handle(channel, async (
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
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    try {
      const gameProcess = await detectAoe2Process();
      if (!gameProcess.running || !gameProcess.pid) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const [slotX, slotY] = civilizationSlotDesignPoint(slot);
      const slotResult = await postAoe2DesignClick(gameProcess.pid, slotX, slotY, { synchronous: true });
      emitLog(`CIV_SELECT|Step=Open|Slot=${slot}|DesignPoint=${slotX},${slotY}|${slotResult.detail}`);
      if (!slotResult.sent) throw new Error(`Lobby slot ${slot} civilization button could not be opened.`);
      await delay(aoe2UiManifest.civilizationSlotButtons.settleMs);

      let civilizationX: number;
      let civilizationY: number;
      if (selection in aoe2UiManifest.civilizationGrid.entries) {
        const searchPoint = aoe2UiManifest.civilizationPicker.searchPoint;
        const searchFocus = await postAoe2DesignClick(
          gameProcess.pid,
          searchPoint[0],
          searchPoint[1],
          { synchronous: true }
        );
        emitLog(`CIV_SELECT|Step=SearchFocus|Selection=${selection}|${searchFocus.detail}`);
        if (!searchFocus.sent) throw new Error("The civilization search field could not be focused.");
        const searchText = await sendAoe2Text(gameProcess.pid, selection);
        emitLog(`CIV_SELECT|Step=SearchText|Selection=${selection}|${searchText.detail}`);
        if (!searchText.sent) throw new Error(`${selection} could not be entered in the civilization search.`);
        await delay(aoe2UiManifest.civilizationPicker.searchSettleMs);
        [civilizationX, civilizationY] = aoe2UiManifest.civilizationPicker.filteredCivilizationPoint;
      } else {
        [civilizationX, civilizationY] = civilizationDesignPoint(selection);
      }

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
      emitLog(`CIV_SELECT|Step=Tile|Selection=${selection}|DesignPoint=${civilizationX},${civilizationY}|${tileResult.detail}`);
      if (!tileResult.sent) throw new Error(`${selection} could not be selected.`);
      await delay(aoe2UiManifest.civilizationPicker.selectionSettleMs);

      const enter = await sendAoe2Enter(gameProcess.pid);
      emitLog(`CIV_SELECT|Step=ConfirmEnter|Selection=${selection}|${enter.detail}`);
      if (!enter.sent) throw new Error("Civilization confirmation Enter could not be sent.");
      await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);

      const lobbyState = readAoe2HostSetupState(gameProcess.pid);
      emitLog(`CIV_SELECT|Step=VerifyReturn|Selection=${selection}|${lobbyState.detail}`);
      if (lobbyState.state !== "lobby-room") {
        if (selection in aoe2UiManifest.civilizationGrid.entries) {
          const [randomX, randomY] = civilizationDesignPoint("Random");
          const randomTile = await postAoe2DesignClick(
            gameProcess.pid,
            randomX,
            randomY,
            {
              synchronous: true,
              hoverMs: aoe2UiManifest.civilizationGrid.hoverMs,
              holdMs: aoe2UiManifest.civilizationGrid.holdMs
            }
          );
          emitLog(
            `CIV_SELECT|Step=FallbackRandom|UnavailableSelection=${selection}`
            + `|DesignPoint=${randomX},${randomY}|${randomTile.detail}`
          );
          if (!randomTile.sent) throw new Error(`Random could not be selected after ${selection} was unavailable.`);
          await delay(aoe2UiManifest.civilizationPicker.selectionSettleMs);

          const randomEnter = await sendAoe2Enter(gameProcess.pid);
          emitLog(`CIV_SELECT|Step=FallbackConfirmEnter|UnavailableSelection=${selection}|${randomEnter.detail}`);
          if (!randomEnter.sent) throw new Error("Random civilization confirmation Enter could not be sent.");
          await delay(aoe2UiManifest.actions.confirmCivilization.settleMs);

          const fallbackLobbyState = readAoe2HostSetupState(gameProcess.pid);
          emitLog(
            `CIV_SELECT|Step=FallbackVerifyReturn|UnavailableSelection=${selection}|${fallbackLobbyState.detail}`
          );
          if (fallbackLobbyState.state === "lobby-room") {
            emitLog(`CIV_SELECT|Complete=True|Selection=Random|FallbackFrom=${selection}|Slot=${slot}`);
            return {
              sent: true,
              message: `${selection} was unavailable; Random selected for AoE2 lobby slot ${slot}.`,
              usedRandomCivilizationFallback: true
            };
          }
        }
        throw new Error(`${selection} selection did not return to the lobby room.`);
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
  registerCivilizationSelection("game:select-civilization");
  registerCivilizationSelection("game:select-custom-civilization");

  const registerTeamSelection = (channel: string, isCustomAutomation: boolean) => ipcMain.handle(channel, async (
    event,
    team: 1 | 2,
    slot: number
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
      const gameProcess = await detectAoe2Process();
      if (!gameProcess.running || !gameProcess.pid) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const [x, y] = teamSlotDesignPoint(slot);
      // AoE initializes the selector at "?": first click is "-", second is Team 1.
      const clicks = team + 1;
      for (let index = 0; index < clicks; index += 1) {
        const result = await postAoe2DesignClick(gameProcess.pid, x, y, {
          synchronous: !isCustomAutomation,
          hoverMs: 100,
          holdMs: 100,
          requireMove: !isCustomAutomation
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
  registerTeamSelection("game:select-team", false);
  registerTeamSelection("game:select-custom-team", true);

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
        serverRegion: request.serverRegion,
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

  ipcMain.handle("game:open-lobby", async (event, lobbyId: string) => {
    if (!/^aoe2de:\/\/0\/\d+$/.test(lobbyId)) {
      return { opened: false };
    }
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    const inputGuardStarted = await startInputGuard(appWindow);
    console.info(`[AoE2 automation] INPUT_LOCK|Requested=True|Guard=${inputGuardStarted}|Source=GuestOpenLobby`);
    await shell.openExternal(lobbyId);
    // Steam hands the URI to AoE2 asynchronously. Give the game time to
    // navigate to and finish joining the lobby before Ready automation.
    await delay(lobbySetupTiming.guestJoinMs);
    return { opened: true };
  });
}
