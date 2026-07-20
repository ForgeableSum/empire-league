import { ipcMain } from "electron";
import { execFile } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import type { CreateLobbyRequest } from "../../shared/contracts/gameIntegration.js";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const execFileAsync = promisify(execFile);
const aoe2AppId = "813780";

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readRegistryValue(key: string, value: string): Promise<string | undefined> {
  if (process.platform !== "win32") return undefined;

  try {
    const { stdout } = await execFileAsync("reg.exe", ["query", key, "/v", value], {
      windowsHide: true
    });
    const match = stdout.match(new RegExp(`${value}\\s+REG_\\w+\\s+(.+)$`, "im"));
    return match?.[1]?.trim();
  } catch {
    return undefined;
  }
}

async function getSteamRoots(): Promise<string[]> {
  const registryRoots = await Promise.all([
    readRegistryValue("HKCU\\Software\\Valve\\Steam", "SteamPath"),
    readRegistryValue("HKLM\\Software\\WOW6432Node\\Valve\\Steam", "InstallPath"),
    readRegistryValue("HKLM\\Software\\Valve\\Steam", "InstallPath")
  ]);
  const programFiles = process.env.ProgramFiles;
  const programFilesX86 = process.env["ProgramFiles(x86)"];

  return [...new Set([
    ...registryRoots,
    programFilesX86 ? join(programFilesX86, "Steam") : undefined,
    programFiles ? join(programFiles, "Steam") : undefined
  ].filter((path): path is string => Boolean(path)))];
}

async function getSteamAppsFolders(steamRoot: string): Promise<string[]> {
  const defaultSteamApps = join(steamRoot, "steamapps");
  const folders = [defaultSteamApps];

  try {
    const vdf = await readFile(join(defaultSteamApps, "libraryfolders.vdf"), "utf8");
    for (const match of vdf.matchAll(/"path"\s+"([^"]+)"/g)) {
      folders.push(join(match[1].replace(/\\\\/g, "\\"), "steamapps"));
    }
  } catch {
    // The default Steam library can still be checked without this file.
  }

  return [...new Set(folders)];
}

async function detectAoe2Installation() {
  if (process.platform !== "win32") {
    return { installed: false, message: "Automatic Steam detection is currently supported on Windows only." };
  }

  const steamRoots = await getSteamRoots();
  const steamAppsFolders = (await Promise.all(steamRoots.map(getSteamAppsFolders))).flat();

  for (const steamApps of [...new Set(steamAppsFolders)]) {
    const manifestPath = join(steamApps, `appmanifest_${aoe2AppId}.acf`);
    try {
      const manifest = await readFile(manifestPath, "utf8");
      const installDir = manifest.match(/"installdir"\s+"([^"]+)"/i)?.[1];
      if (!installDir) continue;

      const gamePath = join(steamApps, "common", installDir);
      const executablePath = join(gamePath, "AoE2DE_s.exe");
      if (await pathExists(executablePath)) {
        return { installed: true, path: gamePath, message: "AoE2: Definitive Edition was found through Steam." };
      }
    } catch {
      // This Steam library does not contain the AoE2 DE manifest.
    }
  }

  return {
    installed: false,
    message: steamRoots.length === 0
      ? "Steam was not detected. Make sure Steam is installed for this Windows user."
      : "Steam was found, but AoE2: Definitive Edition was not found in any configured Steam library. Verify the game is installed, then try again."
  };
}

export function registerGameHandlers(): void {
  ipcMain.handle("game:detect-installation", async () => {
    return detectAoe2Installation();
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
