import type { PlayerProfile } from "../../shared/contracts/players";
import { matchmakerTransport } from "./matchmakerTransport";

let accessToken: string | null = null;

export const authService = {
  async restore(): Promise<PlayerProfile | null> {
    accessToken = await window.electronApi?.loadAuthToken() ?? null;
    if (!accessToken) return null;
    matchmakerTransport.setToken(accessToken);
    try {
      const player = (await matchmakerTransport.request<{ player: PlayerProfile }>("/auth/me")).player;
      return await this.reportSteamLicense(player);
    } catch {
      await this.logout(false);
      return null;
    }
  },

  async signIn(): Promise<PlayerProfile> {
    const start = await matchmakerTransport.request<{ attemptId: string; pollToken: string; loginUrl: string }>(
      "/auth/steam/start", { method: "POST" }
    );
    if (!window.electronApi) throw new Error("Steam sign-in requires the Electron app.");
    await window.electronApi.openSteamLogin(start.loginUrl);
    const deadline = Date.now() + 5 * 60 * 1000;
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
