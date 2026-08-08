import koffi from "koffi";

const user32 = process.platform === "win32" ? koffi.load("user32.dll") : null;
const gdi32 = process.platform === "win32" ? koffi.load("gdi32.dll") : null;
const HANDLE = koffi.pointer("EL_CAPTURE_HANDLE", koffi.opaque());
const HWND = koffi.alias("EL_CAPTURE_HWND", HANDLE);
const HDC = koffi.alias("EL_CAPTURE_HDC", HANDLE);
const HGDIOBJ = koffi.alias("EL_CAPTURE_HGDIOBJ", HANDLE);
const HBITMAP = koffi.alias("EL_CAPTURE_HBITMAP", HANDLE);
const RECT = koffi.struct("EL_CAPTURE_RECT", {
  left: "int32_t",
  top: "int32_t",
  right: "int32_t",
  bottom: "int32_t"
});

const GetWindowRect = user32?.func("bool __stdcall GetWindowRect(EL_CAPTURE_HWND hwnd, _Out_ EL_CAPTURE_RECT *rect)");
const GetWindowDC = user32?.func("EL_CAPTURE_HDC __stdcall GetWindowDC(EL_CAPTURE_HWND hwnd)");
const ReleaseDC = user32?.func("int32_t __stdcall ReleaseDC(EL_CAPTURE_HWND hwnd, EL_CAPTURE_HDC dc)");
const PrintWindow = user32?.func("bool __stdcall PrintWindow(EL_CAPTURE_HWND hwnd, EL_CAPTURE_HDC dc, uint32_t flags)");
const CreateCompatibleDC = gdi32?.func("EL_CAPTURE_HDC __stdcall CreateCompatibleDC(EL_CAPTURE_HDC dc)");
const CreateCompatibleBitmap = gdi32?.func("EL_CAPTURE_HBITMAP __stdcall CreateCompatibleBitmap(EL_CAPTURE_HDC dc, int32_t width, int32_t height)");
const SelectObject = gdi32?.func("EL_CAPTURE_HGDIOBJ __stdcall SelectObject(EL_CAPTURE_HDC dc, EL_CAPTURE_HGDIOBJ object)");
const BitBlt = gdi32?.func("bool __stdcall BitBlt(EL_CAPTURE_HDC dest, int32_t x, int32_t y, int32_t width, int32_t height, EL_CAPTURE_HDC source, int32_t sourceX, int32_t sourceY, uint32_t operation)");
const GetDIBits = gdi32?.func("int32_t __stdcall GetDIBits(EL_CAPTURE_HDC dc, EL_CAPTURE_HBITMAP bitmap, uint32_t start, uint32_t lines, _Out_ void *bits, _Inout_ void *info, uint32_t usage)");
const DeleteObject = gdi32?.func("bool __stdcall DeleteObject(EL_CAPTURE_HGDIOBJ object)");
const DeleteDC = gdi32?.func("bool __stdcall DeleteDC(EL_CAPTURE_HDC dc)");

type CaptureFrame = {
  bitmap: Buffer;
  capturedAt: number;
  height: number;
  sourceId: string;
  width: number;
};

export type CapturedPixel = {
  ageMs: number;
  rgb: [number, number, number];
  sourceId: string;
};

let captureTimer: NodeJS.Timeout | undefined;
let captureInFlight = false;
let captureFrame: CaptureFrame | undefined;
let captureTargetHandle: string | undefined;
let captureLastRequestedAt = 0;
let captureGeneration = 0;

const captureIntervalMs = 500;
const captureIdleTimeoutMs = 2_000;

export function startAoe2WindowCapture(): void {
  if (process.platform !== "win32") return;
  captureLastRequestedAt = Date.now();
  if (captureTimer) return;
  captureTimer = setInterval(() => {
    if (Date.now() - captureLastRequestedAt >= captureIdleTimeoutMs) {
      stopAoe2WindowCapture();
      return;
    }
    void refreshCaptureFrame();
  }, captureIntervalMs);
  captureTimer.unref();
}

export function stopAoe2WindowCapture(): void {
  captureGeneration += 1;
  if (captureTimer) clearInterval(captureTimer);
  captureTimer = undefined;
  captureTargetHandle = undefined;
  captureFrame = undefined;
}

export function hasFreshAoe2WindowCapture(windowHandle: string): boolean {
  return isFreshMatchingFrame(windowHandle);
}

export async function waitForFreshAoe2WindowCapture(windowHandle: string, timeoutMs = 10_000): Promise<boolean> {
  if (process.platform !== "win32") return false;
  startAoe2WindowCapture();
  captureTargetHandle = windowHandle;
  if (captureFrame && !sourceMatchesHandle(captureFrame.sourceId, windowHandle)) captureFrame = undefined;
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    captureLastRequestedAt = Date.now();
    await refreshCaptureFrame();
    if (isFreshMatchingFrame(windowHandle)) return true;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return isFreshMatchingFrame(windowHandle);
}

export function readAoe2CapturedClientPixel(
  windowHandle: string,
  clientX: number,
  clientY: number,
  windowRect: { left: number; top: number; right: number; bottom: number },
  clientOrigin: { x: number; y: number }
): CapturedPixel | null {
  // Make every read self-healing so a stopped capture service is restarted and
  // begins acquiring the requested AoE2 HWND immediately; the caller receives
  // null until that frame is fresh.
  startAoe2WindowCapture();
  captureTargetHandle = windowHandle;
  void refreshCaptureFrame();
  const frame = captureFrame;
  if (!frame || Date.now() - frame.capturedAt > 1_000) return null;
  if (!sourceMatchesHandle(frame.sourceId, windowHandle)) return null;
  const windowWidth = windowRect.right - windowRect.left;
  const windowHeight = windowRect.bottom - windowRect.top;
  if (windowWidth <= 0 || windowHeight <= 0 || frame.width <= 0 || frame.height <= 0) return null;

  const outerX = clientOrigin.x - windowRect.left + clientX;
  const outerY = clientOrigin.y - windowRect.top + clientY;
  const bitmapX = Math.max(0, Math.min(frame.width - 1, Math.floor(outerX * frame.width / windowWidth)));
  const bitmapY = Math.max(0, Math.min(frame.height - 1, Math.floor(outerY * frame.height / windowHeight)));
  const offset = (bitmapY * frame.width + bitmapX) * 4;
  if (offset < 0 || offset + 3 >= frame.bitmap.length) return null;
  return {
    // The 32-bit top-down DIB is BGRA.
    rgb: [frame.bitmap[offset + 2], frame.bitmap[offset + 1], frame.bitmap[offset]],
    ageMs: Date.now() - frame.capturedAt,
    sourceId: frame.sourceId
  };
}

export function describeAoe2WindowCapture(windowHandle: string): string {
  const frame = captureFrame;
  if (!frame) return "WindowCapture=Unavailable";
  const ageMs = Date.now() - frame.capturedAt;
  const state = !sourceMatchesHandle(frame.sourceId, windowHandle)
    ? "HandleMismatch"
    : ageMs > 1_000 ? "Stale" : "Ready";
  return `WindowCapture=${state}`
    + `|WindowCaptureAgeMs=${ageMs}|WindowCaptureSource=${frame.sourceId}`
    + `|WindowCaptureSize=${frame.width}x${frame.height}`;
}

async function refreshCaptureFrame(): Promise<void> {
  if (captureInFlight) return;
  const targetHandle = captureTargetHandle;
  const generation = captureGeneration;
  if (!targetHandle) return;
  captureInFlight = true;
  try {
    const frame = captureWindow(targetHandle);
    if (frame && generation === captureGeneration && targetHandle === captureTargetHandle) {
      captureFrame = frame;
    }
  } catch (error) {
    console.error(`[AoE2 automation] WINDOW_CAPTURE_ERROR|${error instanceof Error ? error.message : String(error)}`);
  } finally {
    captureInFlight = false;
  }
}

function captureWindow(windowHandle: string): CaptureFrame | undefined {
  if (!GetWindowRect || !GetWindowDC || !ReleaseDC || !PrintWindow || !CreateCompatibleDC
    || !CreateCompatibleBitmap || !SelectObject || !BitBlt || !GetDIBits || !DeleteObject || !DeleteDC) return;
  const window = BigInt(windowHandle);
  const rect = {} as { left: number; top: number; right: number; bottom: number };
  if (!GetWindowRect(window, rect)) return;
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0 || width > 16_384 || height > 16_384) return;

  const windowDc = GetWindowDC(window) as bigint | null;
  if (!windowDc) return;
  let memoryDc: bigint | null = null;
  let bitmap: bigint | null = null;
  let previousObject: bigint | null = null;
  try {
    memoryDc = CreateCompatibleDC(windowDc) as bigint | null;
    if (!memoryDc) return;
    bitmap = CreateCompatibleBitmap(windowDc, width, height) as bigint | null;
    if (!bitmap) return;
    previousObject = SelectObject(memoryDc, bitmap) as bigint | null;
    if (!previousObject) return;

    // PrintWindow targets this HWND only. BitBlt is a compatibility fallback for
    // game builds that do not implement WM_PRINT while their window is visible.
    const rendered = Boolean(PrintWindow(window, memoryDc, 0x00000002))
      || Boolean(BitBlt(memoryDc, 0, 0, width, height, windowDc, 0, 0, 0x00cc0020));
    if (!rendered) return;

    const pixels = Buffer.allocUnsafe(width * height * 4);
    const bitmapInfo = Buffer.alloc(40);
    bitmapInfo.writeUInt32LE(40, 0);
    bitmapInfo.writeInt32LE(width, 4);
    bitmapInfo.writeInt32LE(-height, 8); // top-down BGRA rows
    bitmapInfo.writeUInt16LE(1, 12);
    bitmapInfo.writeUInt16LE(32, 14);
    if (Number(GetDIBits(memoryDc, bitmap, 0, height, pixels, bitmapInfo, 0)) !== height) return;
    return { bitmap: pixels, capturedAt: Date.now(), height, sourceId: `window:${windowHandle}`, width };
  } finally {
    if (memoryDc && previousObject) SelectObject(memoryDc, previousObject);
    if (bitmap) DeleteObject(bitmap);
    if (memoryDc) DeleteDC(memoryDc);
    ReleaseDC(window, windowDc);
  }
}

function isFreshMatchingFrame(windowHandle: string): boolean {
  return Boolean(captureFrame
    && Date.now() - captureFrame.capturedAt <= 1_000
    && sourceMatchesHandle(captureFrame.sourceId, windowHandle));
}

function sourceMatchesHandle(sourceId: string, windowHandle: string): boolean {
  const sourceHandle = sourceId.split(":")[1];
  if (!sourceHandle) return false;
  try {
    return BigInt(sourceHandle) === BigInt(windowHandle);
  } catch {
    return sourceHandle.toLowerCase() === windowHandle.toLowerCase();
  }
}
