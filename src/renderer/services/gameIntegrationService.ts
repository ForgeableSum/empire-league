import type {
  CreateLobbyRequest,
  CreateLobbyResult,
  DiscoverLobbyRequest,
  DiscoverLobbyResult,
  GameEndResult,
  GameFocusResult,
  GameInstallationStatus,
  GameIntegrationService,
  GameLaunchResult,
  GameProcessStatus,
  GameStartResult,
  LobbyVerificationResult,
  OpenLobbyResult
} from "../../shared/contracts/gameIntegration";
import type { MockServiceConfig } from "../state/types";
import { delay } from "./timing";

export class MockGameIntegrationService implements GameIntegrationService {
  constructor(private readonly getConfig: () => MockServiceConfig) {}

  async detectInstallation(): Promise<GameInstallationStatus> {
    await delay(650);
    if (this.getConfig().forceGameNotInstalled) {
      return { installed: false };
    }
    return { installed: true, path: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\AoE2DE" };
  }

  async detectRunningGame(): Promise<GameProcessStatus> {
    await delay(500);
    return { running: true, pid: 4242, owned: true };
  }

  async launchGame(): Promise<GameLaunchResult> {
    await delay(700);
    if (this.getConfig().forceGameLaunchFailure) {
      throw new Error("Game failed to launch.");
    }
    return { launched: true, status: "running" };
  }

  async focusGame(): Promise<GameFocusResult> {
    await delay(250);
    return { focused: true };
  }

  async createLobby(config: CreateLobbyRequest): Promise<CreateLobbyResult> {
    await delay(this.getConfig().lobbyCreationDelayMs);
    if (this.getConfig().forceLobbyCreationFailure) {
      throw new Error("Lobby creation timed out.");
    }
    return {
      lobby: {
        platformLobbyId: `AOE-${Math.floor(100000 + Math.random() * 899999)}`,
        lobbyName: `Empire League ${config.matchId.slice(-4).toUpperCase()}`,
        password: "empire",
        hostProfileId: config.hostProfileId,
        guestProfileId: config.guestProfileId,
        map: config.map,
        serverRegion: config.serverRegion,
        settings: {
          playerCount: config.playerCount,
          gameMode: "Random Map",
          speed: "Normal",
          startingAge: "Dark Age",
          startingResources: "Standard",
          populationLimit: 200,
          victoryCondition: "Conquest",
          cheatsEnabled: false,
          recordGame: true,
          spectatorsAllowed: true,
          hiddenCivilizations: false
        },
        verification: {
          correctPlayers: true,
          correctMap: true,
          correctSettings: !this.getConfig().forceLobbyVerificationFailure,
          cheatsDisabled: true,
          recordingEnabled: true,
          noUnexpectedPlayers: true
        }
      }
    };
  }

  async discoverLobby(_request: DiscoverLobbyRequest): Promise<DiscoverLobbyResult> {
    await delay(500);
    return { lobbyId: `AOE-${Math.floor(100000 + Math.random() * 899999)}` };
  }

  async openLobby(_lobbyId: string): Promise<OpenLobbyResult> {
    await delay(250);
    return { opened: true };
  }

  async verifyLobby(_lobbyId: string): Promise<LobbyVerificationResult> {
    await delay(this.getConfig().lobbyVerificationDelayMs);
    if (this.getConfig().forceLobbyVerificationFailure) {
      throw new Error("Lobby settings do not match the ranked ruleset.");
    }
    return {
      verification: {
        correctPlayers: true,
        correctMap: true,
        correctSettings: true,
        cheatsDisabled: true,
        recordingEnabled: true,
        noUnexpectedPlayers: true
      }
    };
  }

  async waitForGameStart(_lobbyId: string): Promise<GameStartResult> {
    await delay(this.getConfig().forceOpponentJoinTimeout ? 5000 : this.getConfig().opponentJoinDelayMs);
    if (this.getConfig().forceOpponentJoinTimeout) {
      throw new Error("Opponent failed to join the lobby.");
    }
    return { started: true, startedAt: new Date().toISOString() };
  }

  async detectGameEnd(_matchId: string): Promise<GameEndResult> {
    await delay(this.getConfig().matchDurationMs);
    return { ended: true, endedAt: new Date().toISOString() };
  }
}
