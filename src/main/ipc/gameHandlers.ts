import { app, BrowserWindow, clipboard, ipcMain, screen, shell } from "electron";
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import type { CreateLobbyRequest, GameInputKey } from "../../shared/contracts/gameIntegration.js";
import {
  aoe2UiManifest,
  type Aoe2ActionName
} from "../../shared/aoe2UiManifest.js";
import {
  cursorAutomationEnabled,
  lobbySetupRetryTiming,
  lobbySetupTiming
} from "../../shared/runtimeConfig.js";
import {
  closeTestOverlay,
  hideMainWindowGameCover,
  focusMainWindow,
  restoreMainWindowFromGameCover,
  setMouseCoordinateOverlayEnabled,
  setMainWindowGameCoverClickThrough,
  setMainWindowGameCoverOverAoe,
  showMainWindowAsGameCover
} from "../window.js";
import {
  closeAoe2NativeWindow,
  detectAoe2NativeProcess,
  focusAoe2NativeWindow,
  isAoe2NativeWindowForeground,
  postAoe2DesignClick,
  readAoe2HostSetupState,
  readAoe2ReadyState,
  sendAoe2Enter,
  sendAoe2Tab
} from "../aoe2Win32Automation.js";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const execFileAsync = promisify(execFile);
const aoe2AppId = "813780";
let launchRequested = false;
let ownedAoe2Pid: number | undefined;
let quittingAfterGameCleanup = false;
let tabTestProcess: ChildProcess | undefined;
let offscreenWindowProcess: ChildProcess | undefined;
let aoe2WindowMonitor: NodeJS.Timeout | undefined;
let aoe2WindowIsOffscreen = false;
let replayEndPoller: NodeJS.Timeout | undefined;
let replayDetectionGeneration = 0;

const replayPollIntervalMs = 1500;
const replayStableForMs = 3_000;

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

async function startReplayEndDetection(
  window: BrowserWindow,
  configuredFolder?: string
): Promise<{ started: boolean; message?: string }> {
  stopReplayEndDetection();
  const generation = replayDetectionGeneration;
  const startedAt = Date.now();
  let active: ReplaySnapshot | undefined;
  let lastGrowthAt = startedAt;
  let observedGrowth = false;

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
        if (active) lastGrowthAt = Date.now();
      } else {
        const newest = files
          .filter((file) => file.modifiedMs >= startedAt - 60_000)
          .sort((left, right) => right.modifiedMs - left.modifiedMs)[0];
        if (!observedGrowth && newest && newest.path !== active.path && newest.modifiedMs > active.modifiedMs) {
          active = newest;
          lastGrowthAt = Date.now();
        }
        const current = files.find((file) => file.path === active?.path);
        if (current && (current.size !== active.size || current.modifiedMs !== active.modifiedMs)) {
          observedGrowth = true;
          lastGrowthAt = Date.now();
          active = current;
        } else if (current && observedGrowth && Date.now() - lastGrowthAt >= replayStableForMs) {
          stopReplayEndDetection();
          focusMainWindow(window);
          if (!window.webContents.isDestroyed()) window.webContents.send("game:replay-ended", current.path);
          console.info(`[AoE2 replay] END|File=${current.path}|StableMs=${replayStableForMs}`);
          return;
        }
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
    aoe2WindowMonitor = setInterval(() => {
      const game = detectAoe2NativeProcess();
      if (game.running && game.pid && game.windowReady) {
        sawGame = true;
        if (game.pid !== lastPid) {
          focusAoe2NativeWindow(game.pid);
          console.info(`[AoE2 automation] MOUSE_TEST|Visible=True|DefaultWindowState=True|Pid=${game.pid}|Mode=Koffi`);
          lastPid = game.pid;
        }
        const foreground = isAoe2NativeWindowForeground(game.pid);
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
    }, 250);
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
  private const uint LLKHF_INJECTED = 0x10;
  private const uint LLMHF_INJECTED = 0x01;
  private const uint WM_MOUSEMOVE = 0x0200;

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
  private struct KeyboardHookData {
    public uint VirtualKey;
    public uint ScanCode;
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

  public static int Run(uint processId) {
    targetWindow = FindWindow(processId);
    if (targetWindow == IntPtr.Zero) return 2;
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
      KeyboardHookData data = Marshal.PtrToStructure<KeyboardHookData>(lParam);
      bool emergency = data.VirtualKey == VK_F12
        && (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0
        && (GetAsyncKeyState(VK_SHIFT) & 0x8000) != 0;
      if (emergency) {
        PostThreadMessage(guardThreadId, WM_QUIT, IntPtr.Zero, IntPtr.Zero);
      } else if ((data.Flags & LLKHF_INJECTED) == 0 && GetForegroundWindow() == targetWindow) {
        return new IntPtr(1);
      }
    }
    return CallNextHookEx(keyboardHook, code, wParam, lParam);
  }

  private static IntPtr OnMouse(int code, IntPtr wParam, IntPtr lParam) {
    if (code >= 0) {
      MouseHookData data = Marshal.PtrToStructure<MouseHookData>(lParam);
      if ((data.Flags & LLMHF_INJECTED) != 0) {
        return CallNextHookEx(mouseHook, code, wParam, lParam);
      }
      // Keep ordinary pointer movement working. Suppress physical buttons,
      // wheels, and horizontal wheels globally so a gesture that begins over
      // Electron cannot bleed through to AoE2 between down and up.
      if (unchecked((uint)wParam.ToInt64()) != WM_MOUSEMOVE) return new IntPtr(1);
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

function createLobbyCursorActionScript(target: "guest-ready" | "host-ready" | "start"): string {
  const action = target === "guest-ready"
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

      const gameProcess = spawn(steamExecutable, ["-applaunch", aoe2AppId, "SKIPINTRO"], {
        detached: true,
        stdio: "ignore",
        windowsHide: false
      });
      gameProcess.unref();
      const appWindow = BrowserWindow.fromWebContents(event.sender);
      if (cursorAutomationEnabled && appWindow) showMainWindowAsGameCover(appWindow);
      moveAoe2WindowOffscreen();
      appWindow?.on("focus", releaseCursorForElectron);
      appWindow?.once("closed", restoreAoe2Window);
      return { launched: true, status: "running", message: "Launching AoE2 DE." };
    } catch (error) {
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
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return { started: false, message: "The Empire League window was not found." };
    return startReplayEndDetection(window, replayFolder);
  });

  ipcMain.handle("game:stop-replay-end-detection", async () => {
    stopReplayEndDetection();
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

  ipcMain.handle("game:run-create-lobby-sequence", async (event) => {
    stopTabTest();
    if (process.platform !== "win32") {
      return { sent: false, message: "Lobby automation is only supported on Windows." };
    }

    const emitLog = (message: string) => {
      console.info(`[AoE2 automation] ${message}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", message);
    };
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    let rendererInputGuardActive = false;
    try {
      const process = await detectAoe2Process();
      if (!process.running || !process.pid) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      emitLog(`ACTION_WINDOW|Target=create-lobby|CoverHidden=False|ClickThrough=False|ElectronFocused=${appWindow?.isFocused() ?? false}|AoeForeground=${isAoe2NativeWindowForeground(process.pid)}`);
      const clickStep = async (
        name: string,
        x: number,
        y: number,
        timing?: { hoverMs?: number; holdMs?: number; synchronous?: boolean; primeMove?: boolean }
      ) => {
        const result = await postAoe2DesignClick(process.pid as number, x, y, timing);
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
          if (actionName === "multiplayer") {
            for (let index = 1; index <= 6; index += 1) {
              const tab = await sendAoe2Tab(process.pid as number);
              emitLog(`STEP|${action.label}|Attempt=${attempt}|Tab=${index}/6|${tab.detail}`);
              if (!tab.sent) throw new Error(`${action.label} could not be selected with Tab.`);
              await delay(100);
            }
            const enter = await sendAoe2Enter(process.pid as number);
            emitLog(`STEP|${action.label}|Attempt=${attempt}|Key=ENTER|${enter.detail}`);
            if (!enter.sent) throw new Error(`${action.label} could not be activated.`);
            await delay(action.settleMs);
            return;
          }
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
        emitLog(`STEP_VERIFY|${action.label}|Attempt=1|Expected=${expectedState}|${verification.detail}`);
        if (verification.state !== expectedState) {
          await performAction(2);
          verification = readAoe2HostSetupState(process.pid as number);
          emitLog(`STEP_VERIFY|${action.label}|Attempt=2|Expected=${expectedState}|${verification.detail}`);
        }
        if (verification.state !== expectedState) {
          throw new Error(`${action.label} did not reach ${expectedState}.`);
        }
      };

      await actionStep("multiplayer");
      event.sender.send("game:setup-input-guard", true);
      rendererInputGuardActive = true;
      emitLog(`INPUT_GUARD|Active=True|Mode=ElectronCapture|Target=post-multiplayer|AoePid=${process.pid}`);
      await actionStep("hostGame");
      await actionStep("createLobby");
      await clickStep("Reset Settings", 3101, 1976);
      await delay(lobbySetupTiming.resetFocusMs);
      const reset = await sendAoe2Enter(process.pid);
      emitLog(`STEP|Confirm Reset|Key=ENTER|${reset.detail}`);
      if (!reset.sent) throw new Error("The reset confirmation could not be sent.");
      await delay(lobbySetupTiming.resetConfirmationMs);

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
      return { sent: true, message: "Cursor lobby creation completed.", lobbyUri };
    } catch (error) {
      emitLog(`ERROR|${error instanceof Error ? error.message : "Native lobby automation failed."}`);
      return { sent: false, message: "The Create Lobby sequence stopped before completion." };
    } finally {
      if (rendererInputGuardActive && !event.sender.isDestroyed()) {
        event.sender.send("game:setup-input-guard", false);
      }
      if (rendererInputGuardActive) {
        emitLog("INPUT_GUARD|Active=False|Mode=ElectronCapture|Target=post-multiplayer");
      }
      setMainWindowGameCoverClickThrough(false);
    }
  });

  ipcMain.handle("game:run-lobby-cursor-action", async (
    event,
    target: "guest-ready" | "host-ready" | "start"
  ) => {
    if (process.platform !== "win32" || !["guest-ready", "host-ready", "start"].includes(target)) {
      return { sent: false, message: "That lobby cursor action is not supported." };
    }
    const appWindow = BrowserWindow.fromWebContents(event.sender);
    if (appWindow) showMainWindowAsGameCover(appWindow);
    setMainWindowGameCoverClickThrough(false);
    event.sender.send("game:setup-input-guard", true);
    try {
      const process = await detectAoe2Process();
      if (!process.running || !process.pid) {
        return { sent: false, message: "The AoE2 process was not found." };
      }
      const visibilityMessage = `ACTION_WINDOW|Target=${target}|CoverHidden=False|ClickThrough=False|ElectronFocused=${appWindow?.isFocused() ?? false}|AoeForeground=${isAoe2NativeWindowForeground(process.pid)}`;
      console.info(`[AoE2 automation] ${visibilityMessage}`);
      if (!event.sender.isDestroyed()) event.sender.send("game:automation-log", visibilityMessage);
      const actionName = target === "guest-ready"
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
          : await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
              hoverMs: action.hoverMs,
              holdMs: action.holdMs,
              synchronous: true
            });

      if (result.detail !== "SKIPPED_ALREADY_READY") await delay(action.settleMs);
      if (verifiesReady) {
        readyState = readAoe2ReadyState(process.pid, action.point[1]);
        emitVerification("1", readyState.detail);
        if (readyState.state === "not-ready") {
          result = await postAoe2DesignClick(process.pid, action.point[0], action.point[1], {
            hoverMs: action.hoverMs,
            holdMs: action.holdMs,
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
      if (target === "start" && sent) {
        hideMainWindowGameCover();
        focusAoe2NativeWindow(process.pid);
      }
      return {
        sent,
        message: sent
          ? `${target} ready state verified.`
          : `${target} ready state could not be verified.`
      };
    } catch (error) {
      console.error(`[AoE2 automation] Cursor action ${target} failed`, error);
      return { sent: false, message: `${target} cursor action failed.` };
    } finally {
      if (!event.sender.isDestroyed()) event.sender.send("game:setup-input-guard", false);
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
        serverRegion: request.serverRegion,
        settings: {
          playerCount: 2,
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
    event.sender.send("game:setup-input-guard", true);
    try {
      const process = await detectAoe2Process();
      if (!process.running || !process.pid) return { opened: false };
      console.info(`[AoE2 automation] INPUT_GUARD|Active=True|Mode=ElectronCapture|Target=join-lobby|AoePid=${process.pid}`);
      await shell.openExternal(lobbyId);
      // Steam hands the URI to AoE2 asynchronously. Give the game time to
      // navigate to and finish joining the lobby before Ready automation.
      await delay(lobbySetupTiming.guestJoinMs);
      return { opened: true };
    } finally {
      if (!event.sender.isDestroyed()) event.sender.send("game:setup-input-guard", false);
      console.info("[AoE2 automation] INPUT_GUARD|Active=False|Mode=ElectronCapture|Target=join-lobby");
    }
  });
}
