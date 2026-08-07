import { desktopCapturer } from "electron";

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
let captureInFlight: Promise<void> | undefined;
let captureFrame: CaptureFrame | undefined;
let captureTargetHandle: string | undefined;

export function startAoe2WindowCapture(): void {
  if (process.platform !== "win32" || captureTimer) return;
  captureTimer = setInterval(() => void refreshCaptureFrame(), 200);
  captureTimer.unref();
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
  // Pixel verification has no GDI fallback. Make every read self-healing so a
  // stopped capture service is restarted and begins acquiring the requested
  // AoE2 window immediately; the caller receives null until that frame is fresh.
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
    // NativeImage bitmap data is BGRA on Windows.
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

function refreshCaptureFrame(): Promise<void> {
  if (captureInFlight) return captureInFlight;
  captureInFlight = (async () => {
    const targetHandle = captureTargetHandle;
    if (!targetHandle) return;
    try {
    const sources = await desktopCapturer.getSources({
      types: ["window"],
      thumbnailSize: { width: 1920, height: 1080 },
      fetchWindowIcons: false
    });
    const source = sources.find((candidate) => sourceMatchesHandle(candidate.id, targetHandle));
    if (!source || source.thumbnail.isEmpty()) return;
    const size = source.thumbnail.getSize();
    captureFrame = {
      bitmap: source.thumbnail.toBitmap(),
      capturedAt: Date.now(),
      height: size.height,
      sourceId: source.id,
      width: size.width
    };
    } catch (error) {
      console.error(`[AoE2 automation] WINDOW_CAPTURE_ERROR|${error instanceof Error ? error.message : String(error)}`);
    }
  })().finally(() => { captureInFlight = undefined; });
  return captureInFlight;
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
