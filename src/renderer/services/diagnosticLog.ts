const maximumUploadedLogCharacters = 500_000;

export function buildDiagnosticLogSnapshot(eventLog: string[], finalMessage?: string): string {
  const environment = [
    "Empire League diagnostic log",
    `Captured: ${new Date().toISOString()}`,
    `OS/platform: ${navigator.platform || "unknown"}`,
    `Runtime: ${navigator.userAgent}`,
    `Locale/time zone: ${navigator.language} / ${Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown"}`,
    `Display: ${screen.width}x${screen.height} @ ${window.devicePixelRatio}x (${screen.colorDepth}-bit color)`,
    `CPU concurrency: ${navigator.hardwareConcurrency || "unknown"}`,
    `Online: ${navigator.onLine ? "yes" : "no"}`,
    ""
  ];
  const entries = eventLog.slice().reverse();
  if (finalMessage) entries.push(finalMessage);
  const contents = [...environment, ...entries].join("\n");
  return contents.length <= maximumUploadedLogCharacters
    ? contents
    : `${environment.join("\n")}\n[Earlier diagnostic entries omitted to fit the upload limit.]\n${contents.slice(-maximumUploadedLogCharacters)}`;
}
