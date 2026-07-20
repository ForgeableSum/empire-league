import { ipcMain } from "electron";
import type { CreateLobbyRequest } from "../../shared/contracts/gameIntegration.js";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function registerGameHandlers(): void {
  ipcMain.handle("game:detect-installation", async () => {
    await delay(300);
    return { installed: true, path: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\AoE2DE" };
  });

  ipcMain.handle("game:detect-process", async () => {
    await delay(250);
    return { running: true, pid: 4242 };
  });

  ipcMain.handle("game:launch", async () => {
    await delay(450);
    return { launched: true, status: "running" };
  });

  ipcMain.handle("game:focus", async () => {
    await delay(180);
    return { focused: true };
  });

  ipcMain.handle("game:create-ranked-1v1-lobby", async (_event, request: CreateLobbyRequest) => {
    await delay(700);
    return {
      lobby: {
        platformLobbyId: `AOE-${Math.floor(100000 + Math.random() * 899999)}`,
        lobbyName: `Empire League ${request.matchId.slice(-4).toUpperCase()}`,
        password: "empire",
        hostProfileId: request.hostProfileId,
        guestProfileId: request.guestProfileId,
        map: request.map,
        serverRegion: request.serverRegion,
        settings: {
          playerCount: 2,
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
          correctSettings: true,
          cheatsDisabled: true,
          recordingEnabled: true,
          noUnexpectedPlayers: true
        }
      }
    };
  });

  ipcMain.handle("game:open-lobby", async () => {
    await delay(250);
    return { opened: true };
  });
}
