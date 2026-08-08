import type { PlayerProfile } from "../../shared/contracts/players";
import { MatchmakerTransportError, matchmakerTransport } from "./matchmakerTransport";

let accessToken: string | null = null;

export const authService = {
  async restore(): Promise<PlayerProfile | null> {
    accessToken = await window.electronApi?.loadAuthToken() ?? null;
    if (!accessToken) return null;
    matchmakerTransport.setToken(accessToken);
    const retryDelaysMs = [0, 500, 1_000, 2_000, 4_000, 8_000];
    for (let attempt = 0; attempt < retryDelaysMs.length; attempt += 1) {
      if (retryDelaysMs[attempt]) {
        await new Promise((resolve) => window.setTimeout(resolve, retryDelaysMs[attempt]));
      }
      try {
        const player = (await matchmakerTransport.request<{ player: PlayerProfile }>("/auth/me")).player;
        return await this.reportSteamLicense(player);
      } catch (error) {
        if (isAuthenticationRejection(error)) {
          await this.logout(false);
          return null;
        }
        if (attempt === retryDelaysMs.length - 1) throw error;
      }
    }
    return null;
  },

  async signIn(): Promise<PlayerProfile> {
    const start = await matchmakerTransport.request<{ attemptId: string; pollToken: string; loginUrl: string }>(
      "/auth/steam/start", { method: "POST" }
    );
    if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
    await window.electronApi.openSteamLogin(start.loginUrl);
    const deadline = Date.now() + 5 * 60 * 1000;
    try {
      while (Date.now() < deadline) {
        await new Promise((resolve) => window.setTimeout(resolve, 1000));
        const status = await matchmakerTransport.request<{ status: string; token?: string }>(
          `/auth/steam/status?attempt=${encodeURIComponent(start.attemptId)}&token=${encodeURIComponent(start.pollToken)}`
        );
        if (status.status === "pending") continue;
        if (status.status !== "authenticated" || !status.token) throw new Error(`Steam sign-in ${status.status}.`);
        accessToken = status.token;
        await window.electronApi.storeAuthToken(status.token);
        matchmakerTransport.setToken(status.token);
        const me = await matchmakerTransport.request<{ player: PlayerProfile }>("/auth/me");
        return await this.reportSteamLicense(me.player);
      }
      throw new Error("Steam sign-in timed out.");
    } finally {
      await window.electronApi.completeSteamLogin();
    }
  },

  async reportSteamLicense(player: PlayerProfile): Promise<PlayerProfile> {
    if (!window.electronApi || !player.steamId) return player;
    const probe = await window.electronApi.runSteamFamilyProbe(player.steamId).catch(() => null);
    if (!probe || probe.status === "unknown" || !probe.currentSteamId || !probe.ownerSteamId) return player;
    const response = await matchmakerTransport.request<{ player: PlayerProfile; updated: boolean }>(
      "/auth/steam-license",
      {
        method: "POST",
        body: {
          status: probe.status,
          currentSteamId: probe.currentSteamId,
          ownerSteamId: probe.ownerSteamId
        }
      }
    ).catch(() => null);
    return response?.player ?? player;
  },

  async logout(notifyServer = true): Promise<void> {
    if (notifyServer && accessToken) {
      await matchmakerTransport.request("/auth/logout", { method: "POST" }).catch(() => undefined);
    }
    accessToken = null;
    matchmakerTransport.setToken(null);
    await window.electronApi?.clearAuthToken();
  }
};

function isAuthenticationRejection(error: unknown): boolean {
  return error instanceof MatchmakerTransportError && (
    error.status === 401
    || error.status === 403
    || error.code === "AUTHENTICATION_FAILED"
    || error.code === "AUTHENTICATION_REQUIRED"
  );
}
