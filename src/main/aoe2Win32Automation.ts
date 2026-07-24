import koffi from "koffi";

const user32 = process.platform === "win32" ? koffi.load("user32.dll") : null;
const kernel32 = process.platform === "win32" ? koffi.load("kernel32.dll") : null;
const gdi32 = process.platform === "win32" ? koffi.load("gdi32.dll") : null;

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
const GetClientRect = user32?.func("bool __stdcall GetClientRect(HWND hwnd, _Out_ EL_RECT *rect)");
const GetWindowRect = user32?.func("bool __stdcall GetWindowRect(HWND hwnd, _Out_ EL_RECT *rect)");
const ClientToScreen = user32?.func("bool __stdcall ClientToScreen(HWND hwnd, _Inout_ EL_POINT *point)");
const ShowWindow = user32?.func("bool __stdcall ShowWindow(HWND hwnd, int32_t command)");
const SetWindowPos = user32?.func("bool __stdcall SetWindowPos(HWND hwnd, HWND insertAfter, int32_t x, int32_t y, int32_t width, int32_t height, uint32_t flags)");
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
const GetDC = user32?.func("HANDLE __stdcall GetDC(HWND hwnd)");
const ReleaseDC = user32?.func("int32_t __stdcall ReleaseDC(HWND hwnd, HANDLE dc)");
const SendMessageTimeoutW = user32?.func(
  "intptr_t __stdcall SendMessageTimeoutW(HWND hwnd, uint32_t message, uintptr_t wParam, intptr_t lParam, uint32_t flags, uint32_t timeoutMs, _Out_ uintptr_t *result)"
);
const GetPixel = gdi32?.func("uint32_t __stdcall GetPixel(HANDLE dc, int32_t x, int32_t y)");
const Sleep = kernel32?.func("void __stdcall Sleep(uint32_t milliseconds)");
const GetLastError = kernel32?.func("uint32_t __stdcall GetLastError()");
const SetLastError = kernel32?.func("void __stdcall SetLastError(uint32_t errorCode)");
const CreateToolhelp32Snapshot = kernel32?.func("HANDLE __stdcall CreateToolhelp32Snapshot(uint32_t flags, uint32_t processId)");
const Process32FirstW = kernel32?.func("bool __stdcall Process32FirstW(HANDLE snapshot, _Inout_ EL_PROCESSENTRY32W *entry)");
const Process32NextW = kernel32?.func("bool __stdcall Process32NextW(HANDLE snapshot, _Inout_ EL_PROCESSENTRY32W *entry)");
const CloseHandle = kernel32?.func("bool __stdcall CloseHandle(HANDLE handle)");

type NativeHandle = bigint | null;
type Point = { x: number; y: number };
type Rect = { left: number; top: number; right: number; bottom: number };

export interface NativeInputResult {
  sent: boolean;
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

export interface NativeHostSetupStateResult {
  state: "main-menu" | "multiplayer-menu" | "create-lobby-dialog" | "lobby-room" | "unknown";
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
    let hasEntry = Boolean(Process32FirstW!(snapshot, entry));
    while (hasEntry) {
      if (entry.szExeFile?.toLowerCase() === "aoe2de_s.exe") {
        const window = findLargestProcessWindow(entry.th32ProcessID);
        return {
          running: true,
          pid: entry.th32ProcessID,
          windowReady: Boolean(window) && !IsHungAppWindow!(window)
        };
      }
      hasEntry = Boolean(Process32NextW!(snapshot, entry));
    }
    return { running: false, windowReady: false };
  } finally {
    CloseHandle!(snapshot);
  }
}

export function focusAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return Boolean(window) && Boolean(SetForegroundWindow!(window));
}

export function isAoe2NativeWindowForeground(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return Boolean(window) && sameHandle(GetForegroundWindow!(), window);
}

export function closeAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return Boolean(window) && Boolean(PostMessageW!(window, 0x0010, 0, 0));
}

export function minimizeAoe2NativeWindow(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  return Boolean(window) && Boolean(ShowWindow!(window, 6));
}

export function restoreAoe2NativeWindowBehind(processId: number): boolean {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return false;
  ShowWindow!(window, 9);
  SetWindowPos!(window, null, 0, 0, 0, 0, 0x0015);
  return true;
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

  const point: Point = {
    x: Math.round(designX * width / 3840),
    y: Math.round(designY * height / 2160)
  };
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

  await delay(500);

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
      `ScreenPoint=${point.x},${point.y}`,
      `OriginalPoint=${original.x},${original.y}`
    ].join("|")
  };
}

export async function postAoe2DesignClick(
  processId: number,
  designX: number,
  designY: number,
  timing: { hoverMs?: number; holdMs?: number; synchronous?: boolean } = {}
): Promise<NativeInputResult> {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { sent: false, detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { sent: false, detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { sent: false, detail: "INVALID_CLIENT_SIZE" };

  const x = Math.round(designX * width / 3840);
  const y = Math.round(designY * height / 2160);
  const position = (y << 16) | (x & 0xffff);
  const hoverMs = timing.hoverMs ?? 100;
  const holdMs = timing.holdMs ?? 120;
  const synchronous = timing.synchronous ?? false;
  const windowRect = {} as Rect;
  const hasWindowRect = Boolean(GetWindowRect!(window, windowRect));
  const ownerPid: [number | null] = [null];
  const ownerThread = Number(GetWindowThreadProcessId!(window, ownerPid));
  const foregroundAtStart = GetForegroundWindow!() as NativeHandle;
  const pixelBefore = readWindowRgb(window, x, y);
  const send = synchronous
    ? (message: number, wParam: number) => sendMouseMessage(window, message, wParam, position)
    : (message: number, wParam: number) => postMouseMessage(window, message, wParam, position);
  const moved = send(0x0200, 0);
  await delay(hoverMs);
  const pixelAfterMove = readWindowRgb(window, x, y);
  const down = send(0x0201, 1);
  await delay(holdMs);
  const pixelAfterDown = readWindowRgb(window, x, y);
  const up = send(0x0202, 0);
  const pixelAfterUp = readWindowRgb(window, x, y);
  const sent = moved.dispatched && down.dispatched && up.dispatched;

  return {
    sent,
    detail: [
      sent ? "SENT" : "SEND_FAILED",
      `Mode=${synchronous ? "WindowMessageSync" : "WindowMessage"}`,
      `Client=${width}x${height}`,
      `ClientPoint=${x},${y}`,
      `DesignPoint=${designX},${designY}`,
      `HoverMs=${hoverMs}`,
      `HoldMs=${holdMs}`,
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

export function readAoe2ReadyState(processId: number, designY: number): NativeReadyStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  // Sample a text-free area inside the Ready button. The button is green when
  // selected and red when unselected in both host and guest lobby layouts.
  const x = Math.round(1500 * width / 3840);
  const y = Math.round(designY * height / 2160);
  const dc = GetDC!(window) as NativeHandle;
  if (!dc) return { state: "unknown", detail: "WINDOW_DC_FAILED" };
  let color: number;
  try {
    color = Number(GetPixel!(dc, x, y));
  } finally {
    ReleaseDC!(window, dc);
  }
  if (color === 0xffffffff) return { state: "unknown", detail: "PIXEL_READ_FAILED" };

  const red = color & 0xff;
  const green = (color >> 8) & 0xff;
  const blue = (color >> 16) & 0xff;
  const state = green > red * 2
    ? "ready"
    : red > green * 2
      ? "not-ready"
      : "unknown";
  return {
    state,
    detail: `State=${state}|Window=${String(window)}|ClientPoint=${x},${y}|RGB=${red},${green},${blue}`
  };
}

export function readAoe2HostSetupState(processId: number): NativeHostSetupStateResult {
  ensureWindowsBindings();
  const window = findLargestProcessWindow(processId);
  if (!window) return { state: "unknown", detail: "WINDOW_NOT_FOUND" };

  const rect = {} as Rect;
  if (!GetClientRect!(window, rect)) return { state: "unknown", detail: "CLIENT_RECT_FAILED" };
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0) return { state: "unknown", detail: "INVALID_CLIENT_SIZE" };

  const dc = GetDC!(window) as NativeHandle;
  if (!dc) return { state: "unknown", detail: "WINDOW_DC_FAILED" };
  let upperLeft: [number, number, number] | null;
  let upperCenter: [number, number, number] | null;
  let lowerButton: [number, number, number] | null;
  try {
    upperLeft = readRgb(dc, Math.round(825 * width / 3840), Math.round(383 * height / 2160));
    upperCenter = readRgb(dc, Math.round(1920 * width / 3840), Math.round(495 * height / 2160));
    lowerButton = readRgb(dc, Math.round(1500 * width / 3840), Math.round(1979 * height / 2160));
  } finally {
    ReleaseDC!(window, dc);
  }
  if (!upperLeft || !upperCenter || !lowerButton) {
    return { state: "unknown", detail: "PIXEL_READ_FAILED" };
  }

  const [leftRed, leftGreen, leftBlue] = upperLeft;
  const [centerRed, centerGreen, centerBlue] = upperCenter;
  const [buttonRed, buttonGreen] = lowerButton;
  const hasReadyButton = (buttonRed > buttonGreen * 2 && buttonRed > 80)
    || (buttonGreen > buttonRed * 2 && buttonGreen > 80);
  const state = hasReadyButton
    ? "lobby-room"
    : centerRed < 50 && centerGreen < 50 && centerBlue < 50
      && leftRed > 100 && leftGreen > 50 && leftBlue < 30
      ? "multiplayer-menu"
      : centerRed > 120 && centerGreen > 100 && centerBlue > 70
        && leftRed < 100 && leftGreen < 80 && leftBlue < 70
        ? "create-lobby-dialog"
        : centerRed > 150 && centerGreen > 150 && centerBlue > 140
          ? "main-menu"
          : "unknown";
  return {
    state,
    detail: [
      `State=${state}`,
      `Window=${String(window)}`,
      `UpperLeftRGB=${upperLeft.join(",")}`,
      `UpperCenterRGB=${upperCenter.join(",")}`,
      `LowerButtonRGB=${lowerButton.join(",")}`
    ].join("|")
  };
}

function readRgb(dc: NativeHandle, x: number, y: number): [number, number, number] | null {
  const color = Number(GetPixel!(dc, x, y));
  if (color === 0xffffffff) return null;
  return [color & 0xff, (color >> 8) & 0xff, (color >> 16) & 0xff];
}

function readWindowRgb(window: NativeHandle, x: number, y: number): [number, number, number] | null {
  const dc = GetDC!(window) as NativeHandle;
  if (!dc) return null;
  try {
    return readRgb(dc, x, y);
  } finally {
    ReleaseDC!(window, dc);
  }
}

function formatRgb(rgb: [number, number, number] | null): string {
  return rgb ? rgb.join(".") : "FAILED";
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
  if (!user32 || !kernel32 || !gdi32) throw new Error("Native AoE2 automation is only supported on Windows.");
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
