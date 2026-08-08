import koffi from "koffi";
import { aoe2PhysicalClickSettleMs } from "../shared/runtimeConfig.js";
import {
  describeAoe2WindowCapture,
  readAoe2CapturedClientPixel
} from "./aoe2WindowCapture.js";

const user32 = process.platform === "win32" ? koffi.load("user32.dll") : null;
const kernel32 = process.platform === "win32" ? koffi.load("kernel32.dll") : null;

const HANDLE = koffi.pointer("HANDLE", koffi.opaque());
const HWND = koffi.alias("HWND", HANDLE);
const RECT = koffi.struct("EL_RECT", {
  left: "int32_t",
  top: "int32_t",
  right: "int32_t",
  bottom: "int32_t"
});
const POINT = koffi.struct("EL_POINT", {
  x: "int32_t",
  y: "int32_t"
});
const PROCESSENTRY32W = koffi.struct("EL_PROCESSENTRY32W", {
  dwSize: "uint32_t",
  cntUsage: "uint32_t",
  th32ProcessID: "uint32_t",
  th32DefaultHeapID: "uintptr_t",
  th32ModuleID: "uint32_t",
  cntThreads: "uint32_t",
  th32ParentProcessID: "uint32_t",
  pcPriClassBase: "int32_t",
  dwFlags: "uint32_t",
  szExeFile: koffi.array("char16_t", 260, "String")
});
const EnumWindowsProc = koffi.proto("bool __stdcall EL_EnumWindowsProc(HWND hwnd, intptr_t lParam)");

const EnumWindows = user32?.func("bool __stdcall EnumWindows(EL_EnumWindowsProc *callback, intptr_t lParam)");
const GetWindowThreadProcessId = user32?.func("uint32_t __stdcall GetWindowThreadProcessId(HWND hwnd, _Out_ uint32_t *pid)");
const IsWindow = user32?.func("bool __stdcall IsWindow(HWND hwnd)");
const IsWindowVisible = user32?.func("bool __stdcall IsWindowVisible(HWND hwnd)");
const IsWindowEnabled = user32?.func("bool __stdcall IsWindowEnabled(HWND hwnd)");
const IsIconic = user32?.func("bool __stdcall IsIconic(HWND hwnd)");
const GetClientRect = user32?.func("bool __stdcall GetClientRect(HWND hwnd, _Out_ EL_RECT *rect)");
const GetWindowRect = user32?.func("bool __stdcall GetWindowRect(HWND hwnd, _Out_ EL_RECT *rect)");
const ClientToScreen = user32?.func("bool __stdcall ClientToScreen(HWND hwnd, _Inout_ EL_POINT *point)");
const ShowWindow = user32?.func("bool __stdcall ShowWindow(HWND hwnd, int32_t command)");
const SetWindowPos = user32?.func("bool __stdcall SetWindowPos(HWND hwnd, HWND insertAfter, int32_t x, int32_t y, int32_t width, int32_t height, uint32_t flags)");
const GetWindowLongW = user32?.func("int32_t __stdcall GetWindowLongW(HWND hwnd, int32_t index)");
const SetWindowLongW = user32?.func("int32_t __stdcall SetWindowLongW(HWND hwnd, int32_t index, int32_t value)");
const SetForegroundWindow = user32?.func("bool __stdcall SetForegroundWindow(HWND hwnd)");
const GetForegroundWindow = user32?.func("HWND __stdcall GetForegroundWindow()");
const WindowFromPoint = user32?.func("HWND __stdcall WindowFromPoint(EL_POINT point)");
const GetAncestor = user32?.func("HWND __stdcall GetAncestor(HWND hwnd, uint32_t flags)");
const GetCursorPos = user32?.func("bool __stdcall GetCursorPos(_Out_ EL_POINT *point)");
const GetClipCursor = user32?.func("bool __stdcall GetClipCursor(_Out_ EL_RECT *rect)");
const ClipCursor = user32?.func("bool __stdcall ClipCursor(const EL_RECT *rect)");
const SetCursorPos = user32?.func("bool __stdcall SetCursorPos(int x, int y)");
const BlockInput = user32?.func("bool __stdcall BlockInput(bool block)");
const MouseEvent = user32?.func("void __stdcall mouse_event(uint32_t flags, uint32_t dx, uint32_t dy, uint32_t data, uintptr_t extraInfo)");
const KeybdEvent = user32?.func("void __stdcall keybd_event(uint8_t virtualKey, uint8_t scanCode, uint32_t flags, uintptr_t extraInfo)");
const IsHungAppWindow = user32?.func("bool __stdcall IsHungAppWindow(HWND hwnd)");
const PostMessageW = user32?.func("bool __stdcall PostMessageW(HWND hwnd, uint32_t message, uintptr_t wParam, intptr_t lParam)");
const SendMessageTimeoutW = user32?.func(
  "intptr_t __stdcall SendMessageTimeoutW(HWND hwnd, uint32_t message, uintptr_t wParam, intptr_t lParam, uint32_t flags, uint32_t timeoutMs, _Out_ uintptr_t *result)"
);
const Sleep = kernel32?.func("void __stdcall Sleep(uint32_t milliseconds)");
const GetLastError = kernel32?.func("uint32_t __stdcall GetLastError()");
const SetLastError = kernel32?.func("void __stdcall SetLastError(uint32_t errorCode)");
const VkKeyScanW = user32?.func("int16_t __stdcall VkKeyScanW(char16_t character)");
const CreateToolhelp32Snapshot = kernel32?.func("HANDLE __stdcall CreateToolhelp32Snapshot(uint32_t flags, uint32_t processId)");
const Process32FirstW = kernel32?.func("bool __stdcall Process32FirstW(HANDLE snapshot, _Inout_ EL_PROCESSENTRY32W *entry)");
const Process32NextW = kernel32?.func("bool __stdcall Process32NextW(HANDLE snapshot, _Inout_ EL_PROCESSENTRY32W *entry)");
const CloseHandle = kernel32?.func("bool __stdcall CloseHandle(HANDLE handle)");

type NativeHandle = bigint | null;
type Point = { x: number; y: number };
type Rect = { left: number; top: number; right: number; bottom: number };
type DesignTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
  viewportWidth: number;
  viewportHeight: number;
};

const aoe2DesignWidth = 3840;
const aoe2DesignHeight = 2160;
let lastPixelSource: "WindowCapture" | "Unavailable" = "Unavailable";
const managedWindowStyles = new Map<number, { handle: string; extendedStyle: number }>();

const extendedStyleIndex = -20; // GWL_EXSTYLE
const appWindowStyle = 0x00040000; // WS_EX_APPWINDOW
const toolWindowStyle = 0x00000080; // WS_EX_TOOLWINDOW
const refreshWindowStyleFlags = 0x0037; // FRAMECHANGED | NOACTIVATE | NOMOVE | NOSIZE | NOZORDER

function excludeManagedWindowFromShell(processId: number, window: NativeHandle): void {
  if (!window || !GetWindowLongW || !SetWindowLongW || !SetWindowPos) return;
  const handle = String(window);
  const currentStyle = GetWindowLongW(window, extendedStyleIndex) as number;
  const saved = managedWindowStyles.get(processId);
  if (!saved || saved.handle !== handle) {
    managedWindowStyles.set(processId, { handle, extendedStyle: currentStyle });
  }
  const managedStyle = ((currentStyle | toolWindowStyle) & ~appWindowStyle) | 0;
  if (managedStyle === currentStyle) return;
  SetWindowLongW(window, extendedStyleIndex, managedStyle);
  SetWindowPos(window, 0n, 0, 0, 0, 0, refreshWindowStyleFlags);
}

function restoreManagedWindowToShell(processId: number, window: NativeHandle): void {
  if (!window || !SetWindowLongW || !SetWindowPos) return;
  const saved = managedWindowStyles.get(processId);
  if (!saved) return;
  managedWindowStyles.delete(processId);
  if (saved.handle !== String(window)) return;
  SetWindowLongW(window, extendedStyleIndex, saved.extendedStyle);
  SetWindowPos(window, 0n, 0, 0, 0, 0, refreshWindowStyleFlags);
}

export interface NativeInputResult {
  sent: boolean;
  detail: string;
}

export interface NativeContentWarningStateResult {
  state: "visible" | "absent" | "unknown";
  detail: string;
}

export interface NativeProcessStatus {
  running: boolean;
  pid?: number;
  windowReady: boolean;
}

export interface NativeReadyStateResult {
  state: "ready" | "not-ready" | "unknown";
  detail: string;
}

export interface NativeCivilizationPickerStateResult {
  state: "open" | "closed" | "unknown";
  detail: string;
}

export interface NativeCivilizationTileStateResult {
  state: "selected" | "not-selected" | "unknown";
  detail: string;
}

export interface NativeGameplayFocusResult {
  focused: boolean;
  windowFound: boolean;
  raised: boolean;
  foregroundRequested: boolean;
  foregroundVerified: boolean;
  releasedTopmost: boolean;
  windowHandle?: string;
}

export interface NativeHostSetupStateResult {
  state: "main-menu" | "main-menu-news" | "multiplayer-menu" | "create-lobby-dialog" | "lobby-room" | "content-picker" | "loading-screen" | "unknown";
  detail: string;
}

export function detectAoe2NativeProcess(): NativeProcessStatus {
  ensureWindowsBindings();
  const snapshot = CreateToolhelp32Snapshot!(0x00000002, 0) as NativeHandle;
  if (!snapshot || String(snapshot) === "-1" || String(snapshot) === "18446744073709551615") {
    return { running: false, windowReady: false };
  }
  try {
    const entry = { dwSize: koffi.sizeof(PROCESSENTRY32W) } as {
      dwSize: number;
      th32ProcessID: number;
      szExeFile: string;
    };
    let fallbackProcessId: number | undefined;
    let hasEntry = Boolean(Process32FirstW!(snapshot, entry));
    while (hasEntry) {
      if (entry.szExeFile?.toLowerCase() === "aoe2de_s.exe") {
        fallbackProcessId ??= entry.th32ProcessID;
        const window = findLargestProcessWindow(entry.th32ProcessID);
        if (window && !IsHungAppWindow!(window)) {
          return {
            running: true,
            pid: entry.th32ProcessID,
            windowReady: true
          };
        }
      }
      hasEntry = Boolean(Process32NextW!(snapshot, entry));
    }
    return fallbackProcessId
      ? { running: true, pid: fallbackProcessId, windowReady: false }
      : { running: false, windowReady: false };
  } finally {
    CloseHandle!(snapshot);
  }
}

export function focusAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findRecoverableProcessWindow(processId);
  if (!window) return false;
  restoreManagedWindowToShell(processId, window);
  // Explicit focus is the only path that reveals a game window hidden while
  // the Empire League shell is minimized.
  ShowWindow!(window, 5); // SW_SHOW
  return Boolean(SetForegroundWindow!(window));
}

// Raise only AoE2 instead of enumerating and minimizing unrelated windows.
// Toggling topmost is more forceful than SetForegroundWindow by itself, but
// removing topmost immediately keeps the game from covering later dialogs.
export function focusAoe2ForGameplay(processId: number): boolean {
  return focusAoe2ForGameplayDetailed(processId).focused;
}

export function focusAoe2ForGameplayDetailed(
  processId: number,
  releaseTopmost = true
): NativeGameplayFocusResult {
  ensureWindowsBindings();
  const window = findRecoverableProcessWindow(processId);
  if (!window) {
    return {
      focused: false,
      windowFound: false,
      raised: false,
      foregroundRequested: false,
      foregroundVerified: false,
      releasedTopmost: false
    };
  }
  restoreManagedWindowToShell(processId, window);
  // The game may have been minimized while running borderless fullscreen.
  // SW_RESTORE can bring it back as a normal window, which also invalidates
  // the design-space click layout. Maximize it before raising it instead.
  ShowWindow!(window, 3); // SW_MAXIMIZE
  Sleep!(150);
  const raised = Boolean(SetWindowPos!(window, -1n, 0, 0, 0, 0, 0x0003)); // HWND_TOPMOST
  const foregroundRequested = Boolean(SetForegroundWindow!(window));
  Sleep!(50);
  const foregroundVerified = sameHandle(GetForegroundWindow!(), window);
  const releasedTopmost = releaseTopmost
    ? Boolean(SetWindowPos!(window, -2n, 0, 0, 0, 0, 0x0003)) // HWND_NOTOPMOST
    : false;
  return {
    focused: raised && foregroundVerified && (!releaseTopmost || releasedTopmost),
    windowFound: true,
    raised,
    foregroundRequested,
    foregroundVerified,
    releasedTopmost,
    windowHandle: String(window)
  };
}

export function releaseAoe2GameplayTopmost(processId: number): boolean {
  ensureWindowsBindings();
  const window = findRecoverableProcessWindow(processId);
  return Boolean(window) && Boolean(SetWindowPos!(window, -2n, 0, 0, 0, 0, 0x0003)); // HWND_NOTOPMOST
}

export function isAoe2NativeWindowForeground(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return Boolean(window) && sameHandle(GetForegroundWindow!(), window);
}

export function closeAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findRecoverableProcessWindow(processId);
  return Boolean(window) && Boolean(PostMessageW!(window, 0x0010, 0, 0));
}

export function hideAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return false;
  excludeManagedWindowFromShell(processId, window);
  // Hiding preserves the game's current size/state. In particular, it avoids
  // the minimize/restore messages that make borderless DirectX rebuild its
  // client area and race the later gameplay focus handoff.
  ShowWindow!(window, 0); // SW_HIDE
  return true;
}

export function showAoe2NativeWindowBehind(processId: number): boolean {
  ensureWindowsBindings();
  const window = findRecoverableProcessWindow(processId);
  if (!window) return false;
  excludeManagedWindowFromShell(processId, window);
  // Reveal the existing surface without restoring/maximizing or activating it.
  // This makes it ready for automation while the Electron cover remains above.
  ShowWindow!(window, 5); // SW_SHOW
  return Boolean(SetWindowPos!(window, 1n, 0, 0, 0, 0, 0x0013)); // HWND_BOTTOM | SWP_NOACTIVATE
}

export function setWindowsInputBlocked(blocked: boolean): boolean {
  if (process.platform !== "win32" || !BlockInput) return false;
  return Boolean(BlockInput(blocked));
}

export function keepAoe2NativeWindowBehind(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return false;
  excludeManagedWindowFromShell(processId, window);
  // HWND_BOTTOM plus SWP_NOACTIVATE keeps the game below the Electron shell.
  // Passing null here means HWND_TOP, which allowed AoE2 to cover Electron.
  return Boolean(SetWindowPos!(window, 1n, 0, 0, 0, 0, 0x0013));
}

export async function clickAoe2DesignPoint(
  processId: number,
  designX: number,
  designY: number
): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { sent: false, detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { sent: false, detail: "INVALID_CLIENT_SIZE" };

  const transform = designTransform(width, height);
  const point = transformDesignPoint(designX, designY, transform);
  if (!ClientToScreen!(window, point)) return { sent: false, detail: "SCREEN_POINT_FAILED" };

  const alreadyForeground = sameHandle(GetForegroundWindow!(), window);
  const focused = alreadyForeground || Boolean(SetForegroundWindow!(window));
  const focusDeadline = Date.now() + 1500;
  while (!sameHandle(GetForegroundWindow!(), window) && Date.now() < focusDeadline) {
    SetForegroundWindow!(window);
    Sleep!(25);
  }
  const foregroundVerified = sameHandle(GetForegroundWindow!(), window);
  if (!foregroundVerified) {
    return { sent: false, detail: `FOREGROUND_NOT_READY|Focused=${focused}` };
  }
  if (!alreadyForeground) await delay(300);

  const original = {} as Point;
  if (!GetCursorPos!(original)) return { sent: false, detail: "CURSOR_POSITION_FAILED" };
  const originalClip = {} as Rect;
  const hadOriginalClip = Boolean(GetClipCursor!(originalClip));
  const targetClip: Rect = { left: point.x, top: point.y, right: point.x + 1, bottom: point.y + 1 };
  const clipped = Boolean(ClipCursor!(targetClip));
  const blocked = Boolean(BlockInput!(true));
  let moved = false;
  let restored = false;
  let hitProcessId = 0;

  try {
    moved = Boolean(SetCursorPos!(point.x, point.y));
    Sleep!(25);
    const hitDeadline = Date.now() + 500;
    let hitVerified = false;
    do {
      const hitWindow = GetAncestor!(WindowFromPoint!(point), 2);
      hitProcessId = processIdForWindow(hitWindow);
      hitVerified = hitProcessId === processId && sameHandle(GetForegroundWindow!(), window);
      if (!hitVerified) Sleep!(25);
    } while (!hitVerified && Date.now() < hitDeadline);
    if (!hitVerified) {
      return {
        sent: false,
        detail: `CLICK_TARGET_NOT_READY|TargetPid=${processId}|HitPid=${hitProcessId}`
      };
    }
    MouseEvent!(0x0002, 0, 0, 0, 0);
    Sleep!(15);
    MouseEvent!(0x0004, 0, 0, 0, 0);
  } finally {
    if (blocked) BlockInput!(false);
    ClipCursor!(hadOriginalClip ? originalClip : null);
    restored = Boolean(SetCursorPos!(original.x, original.y));
  }

  await delay(aoe2PhysicalClickSettleMs);

  return {
    sent: true,
    detail: [
      "SENT",
      "Mode=KoffiForegroundPhysicalRestore",
      "PostClickCoverSettleMs=500",
      `Focused=${focused}`,
      `ForegroundVerified=${foregroundVerified}`,
      `TargetPid=${processId}`,
      `HitPid=${hitProcessId}`,
      `CursorClipped=${clipped}`,
      `InputBlocked=${blocked}`,
      `Moved=${moved}`,
      `Restored=${restored}`,
      `Client=${width}x${height}`,
      `Viewport=${formatViewport(transform)}`,
      `ScreenPoint=${point.x},${point.y}`,
      `OriginalPoint=${original.x},${original.y}`
    ].join("|")
  };
}

export async function postAoe2DesignClick(
  processId: number,
  designX: number,
  designY: number,
  timing: { hoverMs?: number; holdMs?: number; synchronous?: boolean; primeMove?: boolean; requireMove?: boolean } = {}
): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { sent: false, detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { sent: false, detail: "INVALID_CLIENT_SIZE" };

  const transform = designTransform(width, height);
  const { x, y } = transformDesignPoint(designX, designY, transform);
  const position = (y << 16) | (x & 0xffff);
  const hoverMs = timing.hoverMs ?? 100;
  const holdMs = timing.holdMs ?? 120;
  const synchronous = timing.synchronous ?? false;
  const primeMove = timing.primeMove ?? false;
  const requireMove = timing.requireMove ?? true;
  const windowRect = {} as Rect;
  const hasWindowRect = Boolean(GetWindowRect!(window, windowRect));
  const ownerPid: [number | null] = [null];
  const ownerThread = Number(GetWindowThreadProcessId!(window, ownerPid));
  const foregroundAtStart = GetForegroundWindow!() as NativeHandle;
  const pixelBefore = readWindowRgb(window, x, y);
  const send = synchronous
    ? (message: number, wParam: number, messagePosition = position) => sendMouseMessage(window, message, wParam, messagePosition)
    : (message: number, wParam: number, messagePosition = position) => postMouseMessage(window, message, wParam, messagePosition);
  const prime = primeMove ? send(0x0200, 0, (1 << 16) | 1) : null;
  if (prime) await delay(50);
  const moved = send(0x0200, 0);
  await delay(hoverMs);
  const pixelAfterMove = readWindowRgb(window, x, y);
  const down = send(0x0201, 1);
  await delay(holdMs);
  const pixelAfterDown = readWindowRgb(window, x, y);
  const up = send(0x0202, 0);
  const pixelAfterUp = readWindowRgb(window, x, y);
  const sent = (!requireMove || moved.dispatched) && down.dispatched && up.dispatched;

  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      `Mode=${synchronous ? "WindowMessageSync" : "WindowMessage"}`,
      `Client=${width}x${height}`,
      `Viewport=${formatViewport(transform)}`,
      `ClientPoint=${x},${y}`,
      `DesignPoint=${designX},${designY}`,
      `HoverMs=${hoverMs}`,
      `HoldMs=${holdMs}`,
      `PrimeMove=${primeMove}`,
      `RequireMove=${requireMove}`,
      `Window=${String(window)}`,
      `TargetPid=${processId}`,
      `WindowPid=${ownerPid[0] ?? 0}`,
      `WindowThread=${ownerThread}`,
      `IsWindow=${Boolean(IsWindow!(window))}`,
      `Visible=${Boolean(IsWindowVisible!(window))}`,
      `Enabled=${Boolean(IsWindowEnabled!(window))}`,
      `Hung=${Boolean(IsHungAppWindow!(window))}`,
      `ForegroundStart=${String(foregroundAtStart)}`,
      `TargetForegroundStart=${sameHandle(foregroundAtStart, window)}`,
      `ClientRect=${rect.left},${rect.top},${rect.right},${rect.bottom}`,
      `WindowRect=${hasWindowRect ? `${windowRect.left},${windowRect.top},${windowRect.right},${windowRect.bottom}` : "FAILED"}`,
      `TargetRGB=${formatRgb(pixelBefore)},${formatRgb(pixelAfterMove)},${formatRgb(pixelAfterDown)},${formatRgb(pixelAfterUp)}`,
      describePixelRead(window),
      `Prime=${prime?.dispatched ?? "skipped"}`,
      `PrimeMs=${prime?.elapsedMs ?? 0}`,
      `PrimeResult=${prime?.result ?? "skipped"}`,
      `PrimeError=${prime?.error ?? 0}`,
      `PrimeForeground=${prime?.foreground ?? "skipped"}`,
      `Move=${moved.dispatched}`,
      `MoveMs=${moved.elapsedMs}`,
      `MoveResult=${moved.result}`,
      `MoveError=${moved.error}`,
      `MoveForeground=${moved.foreground}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `DownResult=${down.result}`,
      `DownError=${down.error}`,
      `DownForeground=${down.foreground}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`,
      `UpResult=${up.result}`,
      `UpError=${up.error}`,
      `UpForeground=${up.foreground}`
    ].join("|")
  };
}

export async function sendAoe2Enter(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x0d, 0x001c0001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x0d, -1071906815);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=ENTER",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function sendAoe2Escape(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x1b, 0x00010001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x1b, -1073676287);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=ESCAPE",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function postAoe2Enter(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = postMouseMessage(window, 0x0100, 0x0d, 0x001c0001);
  await delay(15);
  const up = postMouseMessage(window, 0x0101, 0x0d, -1071906815);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageQueued",
      "Key=ENTER",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function sendAoe2Home(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x24, 0x01470001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x24, -1052311551);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=HOME",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function sendAoe2End(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x23, 0x014f0001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x23, -1051787263);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=END",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function sendAoe2Down(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x28, 0x01500001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x28, -1051721727);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=DOWN",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`
    ].join("|")
  };
}

export async function sendAoe2Tab(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  const down = sendWindowMessage(window, 0x0100, 0x09, 0x000f0001);
  await delay(15);
  const up = sendWindowMessage(window, 0x0101, 0x09, -1072758783);
  const sent = down.dispatched && up.dispatched;
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      "Mode=WindowMessageSync",
      "Key=TAB",
      `Window=${String(window)}`,
      `Down=${down.dispatched}`,
      `DownMs=${down.elapsedMs}`,
      `DownResult=${down.result}`,
      `DownError=${down.error}`,
      `DownForeground=${down.foreground}`,
      `Up=${up.dispatched}`,
      `UpMs=${up.elapsedMs}`,
      `UpResult=${up.result}`,
      `UpError=${up.error}`,
      `UpForeground=${up.foreground}`
    ].join("|")
  };
}

export async function sendAoe2Text(
  processId: number,
  text: string,
  options: { triggerKeyEvents?: boolean } = {}
): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };
  if (!text || /[^\x20-\x7e]/.test(text)) {
    return { sent: false, detail: "TEXT_NOT_SUPPORTED" };
  }

  const results = [];
  for (const character of text) {
    if (options.triggerKeyEvents) {
      const keyMapping = Number(VkKeyScanW!(character.charCodeAt(0)));
      if (keyMapping === -1) return { sent: false, detail: `KEY_MAPPING_NOT_FOUND|Character=${character}` };
      const virtualKey = keyMapping & 0xff;
      const shiftRequired = (keyMapping & 0x0100) !== 0;
      if (shiftRequired) sendWindowMessage(window, 0x0100, 0x10, 1);
      sendWindowMessage(window, 0x0100, virtualKey, 1);
      const characterResult = sendWindowMessage(window, 0x0102, character.charCodeAt(0), 1);
      sendWindowMessage(window, 0x0101, virtualKey, -2147483647);
      if (shiftRequired) sendWindowMessage(window, 0x0101, 0x10, -2147483647);
      results.push(characterResult);
      if (!characterResult.dispatched) break;
      await delay(15);
      continue;
    }
    const result = sendWindowMessage(window, 0x0102, character.charCodeAt(0), 1);
    results.push(result);
    if (!result.dispatched) break;
    await delay(15);
  }
  const sent = results.length === text.length && results.every((result) => result.dispatched);
  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      `Mode=${options.triggerKeyEvents ? "WindowMessageKeyText" : "WindowMessageText"}`,
      `Characters=${results.length}/${text.length}`,
      `ElapsedMs=${results.reduce((total, result) => total + result.elapsedMs, 0).toFixed(1)}`
    ].join("|")
  };
}

export async function clearAoe2TextField(processId: number): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };

  const events = [
    sendWindowMessage(window, 0x0100, 0x24, 1),
    sendWindowMessage(window, 0x0101, 0x24, -2147483647)
  ];
  for (let index = 0; index < 256; index += 1) {
    events.push(sendWindowMessage(window, 0x0100, 0x2e, 1));
    events.push(sendWindowMessage(window, 0x0101, 0x2e, -2147483647));
    if (index % 16 === 15) await delay(10);
  }
  const sent = events.every((event) => event.dispatched);
  await delay(150);
  return {
    sent,
    detail: `${sent ? "SENT" : "SEND_FAILED"}|Mode=WindowMessageKeyText|Action=HomeDelete|DeleteCount=256`
  };
}

export function readAoe2ReadyState(processId: number, designY: number): NativeReadyStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  // Sample a small patch inside the Ready button. A single pixel is not safe
  // here: localized labels (for example German "Ich bin bereit!") can cover
  // the nominal sample point with beige text/antialiasing even though the
  // surrounding button is red or green.
  const transform = designTransform(width, height);
  const sampleDesignPoints = [
    [1300, designY - 15], [1500, designY - 15], [1640, designY - 15],
    [1300, designY], [1500, designY], [1640, designY],
    [1300, designY + 15], [1500, designY + 15], [1640, designY + 15]
  ] as const;
  const samples = sampleDesignPoints.map(([designX, sampleDesignY]) => {
    const point = transformDesignPoint(designX, sampleDesignY, transform);
    return { ...point, rgb: readWindowRgb(window, point.x, point.y) };
  });
  const readableSamples = samples.filter((sample): sample is typeof sample & { rgb: [number, number, number] } => Boolean(sample.rgb));
  if (readableSamples.length === 0) {
    return { state: "unknown", detail: `PIXEL_READ_FAILED|${describePixelRead(window)}` };
  }
  const redVotes = readableSamples.filter(({ rgb: [red, green] }) => red > green * 2).length;
  const greenVotes = readableSamples.filter(({ rgb: [red, green] }) => green > red * 2).length;
  const state = greenVotes > redVotes && greenVotes >= 2
    ? "ready"
    : redVotes > greenVotes && redVotes >= 2
      ? "not-ready"
      : "unknown";
  const center = samples[4];
  return {
    state,
    detail: [
      `State=${state}`,
      `Window=${String(window)}`,
      `Viewport=${formatViewport(transform)}`,
      `ClientPoint=${center.x},${center.y}`,
      `RGB=${center.rgb?.join(",") ?? "unavailable"}`,
      `ReadyVotes=${greenVotes}`,
      `NotReadyVotes=${redVotes}`,
      `Samples=${readableSamples.map(({ x, y, rgb }) => `${x},${y}:${rgb.join(".")}`).join(";")}`,
      describePixelRead(window)
    ].join("|")
  };
}

export function readAoe2ContentWarningState(processId: number): NativeContentWarningStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  // The optional UGC warning has a large black panel with a bright gold frame.
  // These samples deliberately avoid all warning text and controls so the
  // signature remains stable across content names and localized clients.
  const transform = designTransform(width, height);
  const borderDesignPoints = [
    [1219, 938], [1219, 1313], [1500, 609], [1688, 1548]
  ] as const;
  const interiorDesignPoints = [
    [1313, 1313], [2532, 1313], [1875, 1275]
  ] as const;
  const sample = ([designX, designY]: readonly [number, number]) => {
    const point = transformDesignPoint(designX, designY, transform);
    return { ...point, rgb: readWindowRgb(window, point.x, point.y) };
  };
  const borderSamples = borderDesignPoints.map(sample);
  const interiorSamples = interiorDesignPoints.map(sample);
  const readable = [...borderSamples, ...interiorSamples]
    .filter((entry): entry is typeof entry & { rgb: [number, number, number] } => Boolean(entry.rgb));
  if (readable.length < 5) {
    return { state: "unknown", detail: `PIXEL_READ_FAILED|${describePixelRead(window)}` };
  }

  const goldVotes = borderSamples.filter(({ rgb }) => rgb
    && rgb[0] > 220 && rgb[1] >= 120 && rgb[1] <= 210 && rgb[2] < 45).length;
  const darkVotes = interiorSamples.filter(({ rgb }) => rgb && Math.max(...rgb) < 35).length;
  // On ultrawide viewports the warning's right and lower frame samples land
  // inside dark panel chrome, while the two left-frame samples remain the
  // exact warning gold. Requiring three gold votes therefore rejects the real
  // dialog and leaves the guest waiting forever. All three dark interior
  // samples keep the two-gold signature specific enough for safe key input.
  const state = goldVotes >= 2 && darkVotes === interiorSamples.length ? "visible" : "absent";
  return {
    state,
    detail: [
      `State=${state}`,
      `Window=${String(window)}`,
      `Viewport=${formatViewport(transform)}`,
      `GoldVotes=${goldVotes}/${borderSamples.length}`,
      `DarkVotes=${darkVotes}/${interiorSamples.length}`,
      `BorderSamples=${borderSamples.map(({ x, y, rgb }) => `${x},${y}:${formatRgb(rgb)}`).join(";")}`,
      `InteriorSamples=${interiorSamples.map(({ x, y, rgb }) => `${x},${y}:${formatRgb(rgb)}`).join(";")}`,
      describePixelRead(window)
    ].join("|")
  };
}

export function readAoe2CivilizationPickerState(processId: number): NativeCivilizationPickerStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  const transform = designTransform(width, height);
  const searchPoint = transformDesignPoint(375, 300, transform);
  const filteredTilePoint = transformDesignPoint(1259, 515, transform);
  const search = readWindowRgb(window, searchPoint.x, searchPoint.y);
  const filteredTile = readWindowRgb(window, filteredTilePoint.x, filteredTilePoint.y);
  if (!search || !filteredTile) return { state: "unknown", detail: "PIXEL_READ_FAILED" };

  const searchIsBlack = Math.max(...search) <= 25;
  const tileChroma = Math.max(...filteredTile) - Math.min(...filteredTile);
  const hasFilteredTile = Math.max(...filteredTile) >= 60 && tileChroma >= 35;
  // The search field is part of the picker chrome and remains black whether
  // the filter resolves to an owned civilization, a dimmed DLC civilization,
  // or no usable result. Do not require a colorful result tile here: locked
  // civilizations are intentionally dark, and doing so misclassified the
  // still-open picker as closed after Enter. Callers could then report either
  // the requested civilization or the Random fallback as selected when AoE2
  // had not actually returned to the lobby.
  const state = searchIsBlack ? "open" : "closed";
  return {
    state,
    detail: [
      `State=${state}`,
      `Window=${String(window)}`,
      `Viewport=${formatViewport(transform)}`,
      `SearchRGB=${search.join(",")}`,
      `FilteredTileRGB=${filteredTile.join(",")}`,
      `FilteredTileChroma=${tileChroma}`,
      `HasFilteredTile=${hasFilteredTile}`,
      describePixelRead(window)
    ].join("|")
  };
}

export function readAoe2CivilizationTileState(
  processId: number,
  tileDesignX: number,
  tileDesignY: number
): NativeCivilizationTileStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "State=unknown|Reason=WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) {
    return { state: "unknown", detail: "State=unknown|Reason=CLIENT_RECT_FAILED" };
  }
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) {
    return { state: "unknown", detail: "State=unknown|Reason=INVALID_CLIENT_SIZE" };
  }

  // AoE2 draws a stable white outline around the selected tile. A gray outline
  // only indicates hover, so sample several text-free points on the top and left
  // borders and require more than one bright neutral hit before accepting it.
  const sampleDesignPoints = [
    [tileDesignX - 80, tileDesignY - 118],
    [tileDesignX, tileDesignY - 118],
    [tileDesignX + 80, tileDesignY - 118],
    [tileDesignX - 118, tileDesignY - 80],
    [tileDesignX - 118, tileDesignY],
    [tileDesignX - 118, tileDesignY + 80]
  ] as const;
  const samples = sampleDesignPoints
    .map(([designX, designY]) => {
      const x = Math.round(designX * width / aoe2DesignWidth);
      const y = Math.round(designY * height / aoe2DesignHeight);
      return { x, y, rgb: readWindowRgb(window, x, y) };
    })
    .filter((sample): sample is { x: number; y: number; rgb: [number, number, number] } => Boolean(sample.rgb));
  if (samples.length === 0) {
    return { state: "unknown", detail: "State=unknown|Reason=PIXEL_READ_FAILED" };
  }

  const neutralBrightness = samples.map(({ rgb }) => {
    const spread = Math.max(...rgb) - Math.min(...rgb);
    return spread <= 12 ? (rgb[0] + rgb[1] + rgb[2]) / 3 : 0;
  });
  const brightSamples = neutralBrightness.filter((brightness) => brightness >= 190).length;
  const graySamples = neutralBrightness.filter((brightness) => brightness >= 35 && brightness <= 165).length;
  const state = brightSamples >= 2
    ? "selected"
    : graySamples >= 2
      ? "not-selected"
      : "unknown";
  return {
    state,
    detail: `State=${state}|BrightSamples=${brightSamples}|GraySamples=${graySamples}`
      + `|Samples=${samples.map(({ x, y, rgb }) => `${x},${y}:${formatRgb(rgb)}`).join(";")}`
  };
}

export function readAoe2HostSetupState(
  processId: number,
  options: { contentPickerExpected?: boolean } = {}
): NativeHostSetupStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  const transform = designTransform(width, height);
  const upperLeftPoint = transformDesignPoint(825, 383, transform);
  const upperCenterPoint = transformDesignPoint(1920, 495, transform);
  const multiplayerPanelPoint = transformDesignPoint(2000, 1040, transform);
  const lowerButtonPoint = transformDesignPoint(1500, 1979, transform);
  const guestReadyButtonPoint = transformDesignPoint(1500, 1875, transform);
  const mainMenuButtonPoints = [
    transformDesignPoint(375, 680, transform),
    transformDesignPoint(1050, 680, transform),
    transformDesignPoint(375, 1265, transform),
    transformDesignPoint(1050, 1265, transform),
    transformDesignPoint(375, 2030, transform),
    transformDesignPoint(1050, 2030, transform)
  ];
  const upperLeft = readWindowRgb(window, upperLeftPoint.x, upperLeftPoint.y);
  const upperCenter = readWindowRgb(window, upperCenterPoint.x, upperCenterPoint.y);
  const multiplayerPanel = readWindowRgb(window, multiplayerPanelPoint.x, multiplayerPanelPoint.y);
  const lowerButton = readWindowRgb(window, lowerButtonPoint.x, lowerButtonPoint.y);
  const guestReadyButton = readWindowRgb(window, guestReadyButtonPoint.x, guestReadyButtonPoint.y);
  const mainMenuButtons = mainMenuButtonPoints.map((point) => readWindowRgb(window, point.x, point.y));
  if (!upperLeft || !upperCenter || !multiplayerPanel || !lowerButton || !guestReadyButton
    || mainMenuButtons.some((sample) => !sample)) {
    return { state: "unknown", detail: "PIXEL_READ_FAILED" };
  }

  const [leftRed, leftGreen, leftBlue] = upperLeft;
  const [centerRed, centerGreen, centerBlue] = upperCenter;
  const [panelRed, panelGreen, panelBlue] = multiplayerPanel;
  const [buttonRed, buttonGreen, buttonBlue] = lowerButton;
  const [guestButtonRed, guestButtonGreen] = guestReadyButton;
  const isReadyButtonColor = (red: number, green: number) =>
    (red > green * 2 && red > 80) || (green > red * 2 && green > 80);
  const hasReadyButton = isReadyButtonColor(buttonRed, buttonGreen)
    || isReadyButtonColor(guestButtonRed, guestButtonGreen);
  const hasLobbyParchment = leftRed > 150 && leftGreen > 110 && leftBlue > 70
    && centerRed > 140 && centerGreen > 110 && centerBlue > 70;
  const hasMultiplayerPanel = panelRed > 180 && panelGreen > 180 && panelBlue > 160;
  // Content pickers retain parchment in the upper samples. Scenario selection
  // uses a dark center-right panel, while the random-map picker uses parchment
  // there and replaces the lobby's red lower button with a tan control.
  const hasDarkContentPicker = hasLobbyParchment
    && panelRed < 50 && panelGreen < 50 && panelBlue < 50;
  // The map grid occupies the panel sample point, so its color changes with
  // the visible map thumbnail (for example, Graveyard samples green there).
  // The surrounding parchment and tan lower control are stable picker cues.
  const hasMapContentPicker = hasLobbyParchment
    && buttonRed > 170 && buttonGreen > 120 && buttonBlue > 80;
  const hasContentPicker = hasDarkContentPicker || hasMapContentPicker;
  // The transition out of the lobby begins with a nearly black frame. Loading
  // artwork may populate one sample shortly afterward, while the other four
  // remain black. Requiring four dark samples avoids mistaking lobby controls
  // or ordinary dark panels for the loading screen.
  const darkSamples = [upperLeft, upperCenter, multiplayerPanel, lowerButton, guestReadyButton]
    .filter((sample) => Math.max(...sample) <= 30).length;
  // The once-per-session News panel darkens the menu while retaining a muted
  // brown strip at upper-left and a neutral gray header across upper-center.
  // These bounds were calibrated against build 101.103.48987.0 at 2560x1440.
  // Keep this separate from generic unknown screens so recovery never sends
  // Escape unless the News overlay itself is positively identified.
  const centerChroma = Math.max(...upperCenter) - Math.min(...upperCenter);
  const hasMainMenuNews = leftRed >= 60 && leftRed <= 150
    && leftGreen >= 45 && leftGreen <= 120
    && leftBlue >= 30 && leftBlue <= 100
    && centerRed >= 50 && centerRed <= 130
    && centerGreen >= 50 && centerGreen <= 130
    && centerBlue >= 50 && centerBlue <= 130
    && centerChroma <= 25
    && Math.max(...multiplayerPanel) <= 40
    && Math.max(...guestReadyButton) <= 40
    && Math.max(...lowerButton) >= 30
    && Math.max(...lowerButton) <= 80;
  const isMainMenuRed = ([red, green, blue]: [number, number, number]) =>
    red >= 35 && red <= 180
    && green <= 45 && blue <= 45
    && red >= green * 2.5 && red >= blue * 2.5;
  // Sample text-free interiors at both ends of Single Player, Multiplayer,
  // and Exit. These controls are unaffected by the animated main-menu
  // background. Five of six permits one hovered/obscured point without
  // allowing an ordinary bright in-game parchment panel to impersonate the
  // main menu.
  const mainMenuRedMatches = (mainMenuButtons as Array<[number, number, number]>)
    .filter(isMainMenuRed).length;
  const hasMainMenuButtons = mainMenuRedMatches >= 5;
  const state = darkSamples >= 4
    ? "loading-screen"
    : hasMainMenuNews
      ? "main-menu-news"
    : options.contentPickerExpected && hasContentPicker
    ? "content-picker"
    : hasReadyButton
      ? "lobby-room"
      : hasContentPicker
      ? "content-picker"
      : hasLobbyParchment
        ? "lobby-room"
    : hasMultiplayerPanel
      ? "multiplayer-menu"
    : hasMainMenuButtons
        ? "main-menu"
        : centerRed > 120 && centerGreen > 100 && centerBlue > 70
          && leftRed < 100 && leftGreen < 80 && leftBlue < 70
          ? "create-lobby-dialog"
          : "unknown";
  return {
    state,
    detail: [
      `State=${state}`,
      `ContentPickerExpected=${options.contentPickerExpected ?? false}`,
      `Window=${String(window)}`,
      `Viewport=${formatViewport(transform)}`,
      `UpperLeftRGB=${upperLeft.join(",")}`,
      `UpperCenterRGB=${upperCenter.join(",")}`,
      `MultiplayerPanelRGB=${multiplayerPanel.join(",")}`,
      `LowerButtonRGB=${lowerButton.join(",")}`,
      `GuestReadyButtonRGB=${guestReadyButton.join(",")}`,
      `MainMenuRedMatches=${mainMenuRedMatches}/6`,
      `MainMenuButtonsRGB=${mainMenuButtons.map((sample) => sample?.join(",") ?? "FAILED").join(";")}`,
      describePixelRead(window)
    ].join("|")
  };
}

function readWindowRgb(window: NativeHandle, x: number, y: number): [number, number, number] | null {
  const windowRect = {} as Rect;
  const clientOrigin = { x: 0, y: 0 };
  if (GetWindowRect!(window, windowRect) && ClientToScreen!(window, clientOrigin)) {
    const captured = readAoe2CapturedClientPixel(String(window), x, y, windowRect, clientOrigin);
    if (captured) {
      lastPixelSource = "WindowCapture";
      return captured.rgb;
    }
  }
  lastPixelSource = "Unavailable";
  return null;
}

export function getAoe2NativeWindowHandle(processId: number): string | undefined {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return window ? String(window) : undefined;
}

function describePixelRead(window: NativeHandle): string {
  return `PixelSource=${lastPixelSource}|${describeAoe2WindowCapture(String(window))}`;
}

function formatRgb(rgb: [number, number, number] | null): string {
  return rgb ? rgb.join(".") : "FAILED";
}

export function designTransform(clientWidth: number, clientHeight: number): DesignTransform {
  const scale = Math.min(clientWidth / aoe2DesignWidth, clientHeight / aoe2DesignHeight);
  const viewportWidth = aoe2DesignWidth * scale;
  const viewportHeight = aoe2DesignHeight * scale;
  return {
    scale,
    offsetX: (clientWidth - viewportWidth) / 2,
    offsetY: (clientHeight - viewportHeight) / 2,
    viewportWidth,
    viewportHeight
  };
}

function transformDesignPoint(designX: number, designY: number, transform: DesignTransform): Point {
  return {
    x: Math.round(transform.offsetX + designX * transform.scale),
    y: Math.round(transform.offsetY + designY * transform.scale)
  };
}

function formatViewport(transform: DesignTransform): string {
  return [
    Math.round(transform.offsetX),
    Math.round(transform.offsetY),
    Math.round(transform.viewportWidth),
    Math.round(transform.viewportHeight)
  ].join(",");
}

function findLargestProcessWindow(processId: number): NativeHandle {
  let found: NativeHandle = null;
  let largestArea = 0;
  EnumWindows!((window: NativeHandle) => {
    if (processIdForWindow(window) !== processId || !IsWindowVisible!(window)) return true;
    const rect = {} as Rect;
    if (!GetClientRect!(window, rect)) return true;
    const area = (rect.right - rect.left) * (rect.bottom - rect.top);
    if (area > largestArea) {
      largestArea = area;
      found = window;
    }
    return true;
  }, 0);
  return found;
}

function findRecoverableProcessWindow(processId: number): NativeHandle {
  let found: NativeHandle = null;
  let largestArea = 0;
  EnumWindows!((window: NativeHandle) => {
    if (processIdForWindow(window) !== processId) return true;
    const rect = {} as Rect;
    if (!GetWindowRect!(window, rect)) return true;
    const area = Math.max(1, rect.right - rect.left) * Math.max(1, rect.bottom - rect.top);
    if (area > largestArea) {
      largestArea = area;
      found = window;
    }
    return true;
  }, 0);
  return found;
}

function processIdForWindow(window: NativeHandle): number {
  if (!window) return 0;
  const output: [number | null] = [null];
  GetWindowThreadProcessId!(window, output);
  return output[0] ?? 0;
}

function sameHandle(first: NativeHandle, second: NativeHandle): boolean {
  return first === second || String(first) === String(second);
}

function postMouseMessage(
  window: NativeHandle,
  message: number,
  wParam: number,
  lParam: number
): MessageDispatchResult {
  const started = performance.now();
  SetLastError!(0);
  const dispatched = Boolean(PostMessageW!(window, message, wParam, lParam));
  const error = Number(GetLastError!());
  return {
    dispatched,
    elapsedMs: Math.round((performance.now() - started) * 10) / 10,
    result: "queued",
    error,
    foreground: sameHandle(GetForegroundWindow!(), window)
  };
}

function sendMouseMessage(
  window: NativeHandle,
  message: number,
  wParam: number,
  lParam: number
): MessageDispatchResult {
  return sendWindowMessage(window, message, wParam, lParam);
}

function sendWindowMessage(
  window: NativeHandle,
  message: number,
  wParam: number,
  lParam: number
): MessageDispatchResult {
  const result: [number | null] = [null];
  const started = performance.now();
  SetLastError!(0);
  const dispatched = Boolean(SendMessageTimeoutW!(
    window,
    message,
    wParam,
    lParam,
    0x0002,
    1000,
    result
  ));
  const error = Number(GetLastError!());
  return {
    dispatched,
    elapsedMs: Math.round((performance.now() - started) * 10) / 10,
    result: String(result[0] ?? 0),
    error,
    foreground: sameHandle(GetForegroundWindow!(), window)
  };
}

interface MessageDispatchResult {
  dispatched: boolean;
  elapsedMs: number;
  result: string;
  error: number;
  foreground: boolean;
}

function ensureWindowsBindings(): void {
  if (!user32 || !kernel32) throw new Error("Native AoE2 automation is only supported on Windows.");
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
