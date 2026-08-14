import { Worker } from "node:worker_threads";

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
let captureInFlightPromise: Promise<void> | undefined;
let captureFrame: CaptureFrame | undefined;
let captureTargetHandle: string | undefined;
let captureLastRequestedAt = 0;
let captureGeneration = 0;
let captureWorker: Worker | undefined;
let captureRequestId = 0;
const captureRequests = new Map<number, {
  generation: number;
  resolve: (frame?: CaptureFrame) => void;
}>();

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
  captureInFlight = false;
  captureInFlightPromise = undefined;
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
  if (captureInFlight) return captureInFlightPromise;
  const targetHandle = captureTargetHandle;
  const generation = captureGeneration;
  if (!targetHandle) return;
  captureInFlight = true;
  captureInFlightPromise = (async () => {
    try {
      const frame = await requestCapture(targetHandle, generation);
    if (frame && generation === captureGeneration && targetHandle === captureTargetHandle) {
      captureFrame = frame;
    }
    } catch (error) {
      console.error(`[AoE2 automation] WINDOW_CAPTURE_ERROR|${error instanceof Error ? error.message : String(error)}`);
    } finally {
      captureInFlight = false;
      captureInFlightPromise = undefined;
    }
  })();
  return captureInFlightPromise;
}

function requestCapture(windowHandle: string, generation: number): Promise<CaptureFrame | undefined> {
  const worker = ensureCaptureWorker();
  const id = ++captureRequestId;
  return new Promise((resolve) => {
    captureRequests.set(id, { generation, resolve });
    worker.postMessage({ id, windowHandle });
  });
}

function ensureCaptureWorker(): Worker {
  if (captureWorker) return captureWorker;
  const worker = new Worker(new URL("./aoe2WindowCaptureWorker.js", import.meta.url));
  worker.unref();
  worker.on("message", (message: { id: number; frame?: Omit<CaptureFrame, "bitmap"> & { bitmap: Uint8Array }; error?: string }) => {
    const request = captureRequests.get(message.id);
    if (!request) return;
    captureRequests.delete(message.id);
    if (message.error) {
      request.resolve();
      console.error(`[AoE2 automation] WINDOW_CAPTURE_WORKER_ERROR|${message.error}`);
      return;
    }
    const frame = message.frame;
    request.resolve(frame ? { ...frame, bitmap: Buffer.from(frame.bitmap.buffer, frame.bitmap.byteOffset, frame.bitmap.byteLength) } : undefined);
  });
  const fail = (error: Error) => {
    if (captureWorker !== worker) return;
    captureWorker = undefined;
    for (const request of captureRequests.values()) request.resolve();
    captureRequests.clear();
    console.error(`[AoE2 automation] WINDOW_CAPTURE_WORKER_EXIT|${error.message}`);
  };
  worker.on("error", fail);
  worker.on("exit", (code) => {
    if (code !== 0) fail(new Error(`ExitCode=${code}`));
  });
  captureWorker = worker;
  return worker;
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
