import type { PlayerProfile } from "../../shared/contracts/players";

export const matchmakerUrl = (import.meta.env.VITE_MATCHMAKER_URL ?? "http://127.0.0.1:4317").replace(/\/$/, "");
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export const authService = {
  async restore(): Promise<PlayerProfile | null> {
    accessToken = await window.electronApi?.loadAuthToken() ?? null;
    if (!accessToken) return null;
    const response = await fetch(`${matchmakerUrl}/auth/me`, { headers: authorizationHeaders() });
    if (!response.ok) {
      await this.logout(false);
      return null;
    }
    return (await response.json()).player;
  },

  async signIn(): Promise<PlayerProfile> {
    const start = await readJson<{ attemptId: string; pollToken: string; loginUrl: string }>(
      await fetch(`${matchmakerUrl}/auth/steam/start`, { method: "POST" })
    );
    if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
    await window.electronApi.openSteamLogin(start.loginUrl);
    const deadline = Date.now() + 5 * 60 * 1000;
    while (Date.now() < deadline) {
      await new Promise((resolve) => window.setTimeout(resolve, 1000));
      const status = await readJson<{ status: string; token?: string }>(
        await fetch(`${matchmakerUrl}/auth/steam/status?attempt=${encodeURIComponent(start.attemptId)}&token=${encodeURIComponent(start.pollToken)}`)
      );
      if (status.status === "pending") continue;
      if (status.status !== "authenticated" || !status.token) throw new Error(`Steam sign-in ${status.status}.`);
      accessToken = status.token;
      await window.electronApi.storeAuthToken(status.token);
      const me = await readJson<{ player: PlayerProfile }>(
        await fetch(`${matchmakerUrl}/auth/me`, { headers: authorizationHeaders() })
      );
      return me.player;
    }
    throw new Error("Steam sign-in timed out.");
  },

  async logout(notifyServer = true): Promise<void> {
    if (notifyServer && accessToken) {
      await fetch(`${matchmakerUrl}/auth/logout`, { method: "POST", headers: authorizationHeaders() }).catch(() => undefined);
    }
    accessToken = null;
    await window.electronApi?.clearAuthToken();
  }
};

export function authorizationHeaders(): Record<string, string> {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function readJson<T>(response: Response): Promise<T> {
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`);
  return body as T;
}
