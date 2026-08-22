export function parseMatchmakerRequestUrl(requestUrl, hostHeader) {
  try {
    return new URL(requestUrl ?? "/", `http://${hostHeader ?? "127.0.0.1"}`);
  } catch {
    return null;
  }
}
