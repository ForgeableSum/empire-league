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
let retiringWorker: Promise<number> | undefined;
let diagnosticSink: ((message: string) => void) | undefined;
let lastFrameDiagnosticAt = 0;
let lastTimerTickAt = 0;
let timerLagMs = 0;
let readSnapshot: { frame?: CaptureFrame; checkedAt: number } | undefined;
let captureRequestId = 0;
const captureRequests = new Map<number, {
  generation: number;
  startedAt: number;
  timer: NodeJS.Timeout;
  resolve: (frame?: CaptureFrame) => void;
}>();

export function setAoe2CaptureDiagnosticSink(sink: (message: string) => void): void {
  diagnosticSink = sink;
}

function diagnostic(message: string): void {
  const line = `CAPTURE_PIPELINE|${message}`;
  console.info(`[AoE2 automation] ${line}`);
  diagnosticSink?.(line);
}

// A synchronous multi-pixel check must use one frame and one freshness decision.
export function withAoe2CaptureSnapshot<T>(read: () => T): T {
  const previous = readSnapshot;
  readSnapshot = previous ?? { frame: captureFrame, checkedAt: Date.now() };
  try { return read(); } finally { readSnapshot = previous; }
}

const captureIntervalMs = 500;
// Lobby state transitions intentionally pause for up to several seconds. Keep
// the worker warm across those pauses so the next verification does not begin
// with an empty capture cache.
const captureIdleTimeoutMs = 10_000;

export function startAoe2WindowCapture(): void {
  if (process.platform !== "win32") return;
  captureLastRequestedAt = Date.now();
  if (captureTimer) return;
  lastTimerTickAt = Date.now();
  captureTimer = setInterval(() => {
    const now = Date.now();
    timerLagMs = Math.max(0, now - lastTimerTickAt - captureIntervalMs);
    lastTimerTickAt = now;
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
  // Do not clear the in-flight state while the worker still owns a request.
  // Its generation is invalid now, so it cannot publish a frame, but allowing
  // another request to overlap would let the older request's finally block
  // reset the newer request's state.
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
    // A worker request has its own recovery deadline. Do not let it overrun
    // this caller's shorter deadline while waiting for a frame.
    void refreshCaptureFrame();
    if (isFreshMatchingFrame(windowHandle)) return true;
    await new Promise((resolve) => setTimeout(resolve, Math.min(100, Math.max(0, deadline - Date.now()))));
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
  const frame = readSnapshot ? readSnapshot.frame : captureFrame;
  const checkedAt = readSnapshot?.checkedAt ?? Date.now();
  if (!frame || checkedAt - frame.capturedAt > 1_000) return null;
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
    ageMs: checkedAt - frame.capturedAt,
    sourceId: frame.sourceId
  };
}

export function describeAoe2WindowCapture(windowHandle: string): string {
  const frame = readSnapshot ? readSnapshot.frame : captureFrame;
  if (!frame) return "WindowCapture=Unavailable";
  const ageMs = (readSnapshot?.checkedAt ?? Date.now()) - frame.capturedAt;
  const state = !sourceMatchesHandle(frame.sourceId, windowHandle)
    ? "HandleMismatch"
    : ageMs > 1_000 ? "Stale" : "Ready";
  return `WindowCapture=${state}`
    + `|WindowCaptureAgeMs=${ageMs}|WindowCaptureSource=${frame.sourceId}`
    + `|WindowCaptureSize=${frame.width}x${frame.height}`
    + `|CaptureInFlight=${captureInFlight}|CaptureTimerLagMs=${timerLagMs}`;
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
  // Never accumulate replacement workers behind a native call that won't exit.
  if (retiringWorker) return Promise.resolve(undefined);
  const worker = ensureCaptureWorker();
  const id = ++captureRequestId;
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const timer = setTimeout(() => {
      if (!captureRequests.delete(id)) return;
      diagnostic(`Event=RequestTimeout|Id=${id}|ElapsedMs=${Date.now() - startedAt}|TimerLagMs=${timerLagMs}`);
      if (captureWorker === worker) {
        captureWorker = undefined;
        retiringWorker = worker.terminate();
        void retiringWorker.then(() => {
          retiringWorker = undefined;
          diagnostic("Event=WorkerRetired|Recovery=RestartOnNextRequest");
        }, () => {
          retiringWorker = undefined;
          diagnostic("Event=WorkerRetirementFailed");
        });
      }
      resolve(undefined);
    }, 4000);
    timer.unref();
    captureRequests.set(id, { generation, startedAt, timer, resolve });
    try { worker.postMessage({ id, windowHandle }); }
    catch (error) {
      clearTimeout(timer);
      captureRequests.delete(id);
      resolve(undefined);
      diagnostic("Event=RequestDispatchFailed");
    }
  });
}

function ensureCaptureWorker(): Worker {
  if (captureWorker) return captureWorker;
  const worker = new Worker(new URL("./aoe2WindowCaptureWorker.js", import.meta.url));
  worker.unref();
  diagnostic("Event=WorkerStarted");
  worker.on("message", (message: { id: number; startedAt?: number; finishedAt?: number; renderMs?: number; copyMs?: number; frame?: Omit<CaptureFrame, "bitmap"> & { bitmap: Uint8Array }; error?: string }) => {
    if (captureWorker !== worker) return;
    const request = captureRequests.get(message.id);
    if (!request) return;
    captureRequests.delete(message.id);
    clearTimeout(request.timer);
    const now = Date.now();
    if (now - lastFrameDiagnosticAt >= 1000 || message.error) {
      lastFrameDiagnosticAt = now;
      diagnostic(`Event=${message.frame ? "FrameReceived" : "CaptureFailed"}|Id=${message.id}`
        + `|TotalMs=${now - request.startedAt}|QueueMs=${message.startedAt === undefined ? -1 : message.startedAt - request.startedAt}`
        + `|CaptureMs=${message.finishedAt === undefined || message.startedAt === undefined ? -1 : message.finishedAt - message.startedAt}`
        + `|RenderMs=${message.renderMs ?? -1}|CopyMs=${message.copyMs ?? -1}`
        + `|DeliveryMs=${message.finishedAt === undefined ? -1 : now - message.finishedAt}`
        + `|FrameAgeMs=${message.frame ? now - message.frame.capturedAt : -1}|TimerLagMs=${timerLagMs}`);
    }
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
    for (const request of captureRequests.values()) {
      clearTimeout(request.timer);
      request.resolve();
    }
    captureRequests.clear();
    diagnostic(`Event=WorkerExit|Error=${error.message}`);
  };
  worker.on("error", fail);
  worker.on("exit", (code) => {
    fail(new Error(`ExitCode=${code}`));
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
