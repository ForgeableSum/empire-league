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
let captureInFlight = false;
let captureFrame: CaptureFrame | undefined;

export function startAoe2WindowCapture(): void {
  if (process.platform !== "win32" || captureTimer) return;
  void refreshCaptureFrame();
  captureTimer = setInterval(() => void refreshCaptureFrame(), 200);
  captureTimer.unref();
}

export function stopAoe2WindowCapture(): void {
  if (captureTimer) clearInterval(captureTimer);
  captureTimer = undefined;
  captureFrame = undefined;
}

export function readAoe2CapturedClientPixel(
  windowHandle: string,
  clientX: number,
  clientY: number,
  windowRect: { left: number; top: number; right: number; bottom: number },
  clientOrigin: { x: number; y: number }
): CapturedPixel | null {
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
  return `WindowCapture=${sourceMatchesHandle(frame.sourceId, windowHandle) ? "Ready" : "HandleMismatch"}`
    + `|WindowCaptureAgeMs=${Date.now() - frame.capturedAt}|WindowCaptureSource=${frame.sourceId}`
    + `|WindowCaptureSize=${frame.width}x${frame.height}`;
}

async function refreshCaptureFrame(): Promise<void> {
  if (captureInFlight) return;
  captureInFlight = true;
  try {
    const sources = await desktopCapturer.getSources({
      types: ["window"],
      thumbnailSize: { width: 1920, height: 1080 },
      fetchWindowIcons: false
    });
    const source = sources.find((candidate) => {
      const name = candidate.name.toLowerCase();
      return name.includes("age of empires ii") || name.includes("aoe2");
    });
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
  } finally {
    captureInFlight = false;
  }
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
