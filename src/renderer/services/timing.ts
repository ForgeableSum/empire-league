export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function nowLog(message: string): string {
  return `[${new Date().toLocaleTimeString([], { hour12: false })}] ${message}`;
}
