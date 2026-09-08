export async function verifyCivilizationCapture<T extends { detail: string }>(options: {
  read: () => T;
  assertActive: () => void;
  log: (message: string) => void;
  phase: string;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
}): Promise<T> {
  const now = options.now ?? (() => performance.now());
  const sleep = options.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  const started = now();
  const timeoutMs = 5000;
  let attempts = 0;
  while (true) {
    options.assertActive();
    // The pixel reader requests a fresh worker capture when its cache is stale.
    // Poll the reader rather than await the worker: PrintWindow can itself hang.
    const result = options.read();
    attempts += 1;
    if (!result.detail.includes("PIXEL_READ_FAILED")) {
      if (attempts > 1) options.log(`CIV_CAPTURE|Phase=${options.phase}|Event=Recovered|Attempts=${attempts}|ElapsedMs=${Math.round(now() - started)}`);
      return result;
    }
    const elapsed = now() - started;
    if (attempts === 1) options.log(`CIV_CAPTURE|Phase=${options.phase}|Event=Waiting|TimeoutMs=${timeoutMs}`);
    if (elapsed >= timeoutMs) {
      options.log(`CIV_CAPTURE|Phase=${options.phase}|Event=Timeout|Attempts=${attempts}|ElapsedMs=${Math.round(elapsed)}`);
      throw new Error("Civilization selection could not be verified because screen capture failed.");
    }
    await sleep(Math.min(100, timeoutMs - elapsed));
  }
}
