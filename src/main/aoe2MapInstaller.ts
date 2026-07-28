import { app } from "electron";
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const localModName = "Empire League Maps";
const bundledFiles = [
  { source: "KotD6 Arabia EL.rms", target: ["resources", "_common", "random-map-scripts", "KotD6 Arabia EL.rms"] },
  { source: "KotD6 Arabia EL.png", target: ["resources", "_common", "random-map-scripts", "KotD6 Arabia EL.png"] },
  { source: "Land Nomad EL.rms", target: ["resources", "_common", "random-map-scripts", "Land Nomad EL.rms"] },
  { source: "Land Nomad EL.png", target: ["resources", "_common", "random-map-scripts", "Land Nomad EL.png"] },
  { source: "loading_slash.png", target: ["resources", "_common", "wpfg", "resources", "loading_slash.png"] },
  { source: "loading_slash.png", target: ["resources", "_common", "wpfg", "resources", "loading_slash_alt.png"] },
  { source: "aoe_logo_large.png", target: ["resources", "_common", "wpfg", "resources", "aoe_logo_large.png"] }
] as const;
const legacyMapFiles = ["KotD6, Arabia.rms", "KotD6, Arabia.png"] as const;

export interface Aoe2MapInstallResult {
  installedProfiles: string[];
  skippedProfiles: string[];
}

function bundledMapsDirectory(): string {
  return app.isPackaged
    ? join(process.resourcesPath, "aoe2-maps")
    : join(app.getAppPath(), "assets", "aoe2-maps");
}

async function filesMatch(left: string, right: string): Promise<boolean> {
  try {
    const [leftBytes, rightBytes] = await Promise.all([readFile(left), readFile(right)]);
    return leftBytes.equals(rightBytes);
  } catch {
    return false;
  }
}

export async function installBundledAoe2Maps(): Promise<Aoe2MapInstallResult> {
  if (process.platform !== "win32") {
    return { installedProfiles: [], skippedProfiles: [] };
  }

  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const entries = await readdir(profilesRoot, { withFileTypes: true }).catch(() => []);
  const profileIds = entries
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map((entry) => entry.name);
  const result: Aoe2MapInstallResult = { installedProfiles: [], skippedProfiles: [] };

  for (const profileId of profileIds) {
    const modRoot = join(profilesRoot, profileId, "mods", "local", localModName);
    const mapDirectory = join(modRoot, "resources", "_common", "random-map-scripts");
    await Promise.all(legacyMapFiles.map((fileName) => rm(
      join(mapDirectory, fileName),
      { force: true }
    )));
    const current = await Promise.all(bundledFiles.map((file) => filesMatch(
      join(bundledMapsDirectory(), file.source),
      join(modRoot, ...file.target)
    )));
    await mkdir(modRoot, { recursive: true });
    await writeFile(join(modRoot, "info.json"), JSON.stringify({
      Author: "Empire League",
      Description: "Maps installed and maintained by Empire League.",
      Title: localModName
    }));
    if (current.every(Boolean)) {
      result.skippedProfiles.push(profileId);
      continue;
    }

    await Promise.all(bundledFiles.map(async (file) => {
      const target = join(modRoot, ...file.target);
      await mkdir(dirname(target), { recursive: true });
      await copyFile(join(bundledMapsDirectory(), file.source), target);
    }));
    result.installedProfiles.push(profileId);
  }

  return result;
}
