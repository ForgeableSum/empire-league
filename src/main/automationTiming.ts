export type AutomationTimingLog = (message: string) => void;

let nextTraceId = 0;

export function createAutomationTimingLog(context: string, emit: AutomationTimingLog): AutomationTimingLog {
  const id = ++nextTraceId;
  const started = performance.now();
  const log: AutomationTimingLog = (message) => emit(
    `PREP_TIMING|Id=${id}|Context=${context}|ElapsedMs=${Math.round(performance.now() - started)}|${message}`
  );
  log("Phase=handler-entry|Event=Started");
  return log;
}

export async function timeAutomationPhase<T>(
  log: AutomationTimingLog | undefined,
  phase: string,
  work: () => T | Promise<T>
): Promise<T> {
  const started = performance.now();
  log?.(`Phase=${phase}|Event=Started`);
  try {
    const result = await work();
    log?.(`Phase=${phase}|Event=Complete|DurationMs=${Math.round(performance.now() - started)}`);
    return result;
  } catch (error) {
    log?.(`Phase=${phase}|Event=Failed|DurationMs=${Math.round(performance.now() - started)}`);
    throw error;
  }
}
