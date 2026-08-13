import { app } from "electron";
import { copyFile, mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export const empireLeagueMapsModName = "Empire League Maps";
export const empireLeagueSplashModName = "Empire League Splash";
const bundledMapFiles = [
  { source: "KotD6 Arabia EL.rms", target: ["resources", "_common", "random-map-scripts", "KotD6 Arabia EL.rms"] },
  { source: "KotD6 Arabia EL.png", target: ["resources", "_common", "random-map-scripts", "KotD6 Arabia EL.png"] },
  { source: "Land Nomad EL.rms", target: ["resources", "_common", "random-map-scripts", "Land Nomad EL.rms"] },
  { source: "Land Nomad EL.png", target: ["resources", "_common", "random-map-scripts", "Land Nomad EL.png"] }
] as const;
const bundledSplashFiles = [
  { source: "loading_slash.png", target: ["resources", "_common", "wpfg", "resources", "loading_slash.png"] },
  { source: "loading_slash.png", target: ["resources", "_common", "wpfg", "resources", "loading_slash_alt.png"] },
  { source: "aoe_logo_large.png", target: ["resources", "_common", "wpfg", "resources", "aoe_logo_large.png"] }
] as const;
const legacyMapFiles = ["KotD6, Arabia.rms", "KotD6, Arabia.png"] as const;
const legacySplashTargets = bundledSplashFiles.map((file) => file.target);

export interface Aoe2MapInstallResult {
  installedProfiles: string[];
  skippedProfiles: string[];
  enabledProfiles: string[];
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

async function setManagedModEnabled(profileRoot: string, modName: string, enabled: boolean): Promise<boolean> {
  const statusPath = join(profileRoot, "mods", "mod-status.json");
  let parsed: { Mods?: Array<{ Path?: string; Enabled?: boolean; Title?: string }> };
  try {
    parsed = JSON.parse(await readFile(statusPath, "utf8")) as typeof parsed;
  } catch {
    // AoE2 registers a newly installed local mod on its first launch.
    return false;
  }

  const managedMod = (parsed.Mods ?? []).find((mod) => {
    const folder = String(mod.Path ?? "").replace(/\\/g, "/").split("/").filter(Boolean).at(-1);
    return String(mod.Title ?? "").trim().toLowerCase() === modName.toLowerCase()
      || folder?.toLowerCase() === modName.toLowerCase();
  });
  if (!managedMod || managedMod.Enabled === enabled) return false;

  managedMod.Enabled = enabled;
  const temporaryPath = `${statusPath}.empire-league-tmp`;
  await copyFile(statusPath, `${statusPath}.empire-league-backup`);
  await writeFile(temporaryPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await rename(temporaryPath, statusPath);
  return true;
}

export async function ensureEmpireLeagueMapsEnabled(): Promise<string[]> {
  if (process.platform !== "win32") return [];
  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const entries = await readdir(profilesRoot, { withFileTypes: true }).catch(() => []);
  const enabledProfiles: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
    if (await setManagedModEnabled(join(profilesRoot, entry.name), empireLeagueMapsModName, true)) enabledProfiles.push(entry.name);
  }
  return enabledProfiles;
}

export async function setEmpireLeagueSplashEnabled(enabled: boolean): Promise<string[]> {
  if (process.platform !== "win32") return [];
  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const entries = await readdir(profilesRoot, { withFileTypes: true }).catch(() => []);
  const changedProfiles: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
    if (await setManagedModEnabled(join(profilesRoot, entry.name), empireLeagueSplashModName, enabled)) {
      changedProfiles.push(entry.name);
    }
  }
  return changedProfiles;
}

export async function disableEmpireLeagueSplash(): Promise<string[]> {
  if (process.platform !== "win32") return [];
  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const entries = await readdir(profilesRoot, { withFileTypes: true }).catch(() => []);
  const disabledProfiles: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
    const profileRoot = join(profilesRoot, entry.name);
    const statusChanged = await setManagedModEnabled(profileRoot, empireLeagueSplashModName, false);
    const splashRoot = join(profileRoot, "mods", "local", empireLeagueSplashModName);
    const splashInstalled = await filesMatch(
      join(bundledMapsDirectory(), bundledSplashFiles[0].source),
      join(splashRoot, ...bundledSplashFiles[0].target)
    );
    await rm(splashRoot, { recursive: true, force: true });
    if (statusChanged || splashInstalled) disabledProfiles.push(entry.name);
  }
  return disabledProfiles;
}

export async function installBundledAoe2Maps(): Promise<Aoe2MapInstallResult> {
  if (process.platform !== "win32") {
    return { installedProfiles: [], skippedProfiles: [], enabledProfiles: [] };
  }

  const profilesRoot = join(homedir(), "Games", "Age of Empires 2 DE");
  const entries = await readdir(profilesRoot, { withFileTypes: true }).catch(() => []);
  const profileIds = entries
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map((entry) => entry.name);
  const result: Aoe2MapInstallResult = { installedProfiles: [], skippedProfiles: [], enabledProfiles: [] };

  for (const profileId of profileIds) {
    const modRoot = join(profilesRoot, profileId, "mods", "local", empireLeagueMapsModName);
    const mapDirectory = join(modRoot, "resources", "_common", "random-map-scripts");
    await Promise.all(legacyMapFiles.map((fileName) => rm(
      join(mapDirectory, fileName),
      { force: true }
    )));
    await Promise.all(legacySplashTargets.map((target) => rm(join(modRoot, ...target), { force: true })));
    const current = await Promise.all(bundledMapFiles.map((file) => filesMatch(
      join(bundledMapsDirectory(), file.source),
      join(modRoot, ...file.target)
    )));
    await mkdir(modRoot, { recursive: true });
    await writeFile(join(modRoot, "info.json"), JSON.stringify({
      Author: "Empire League",
      Description: "Maps installed and maintained by Empire League.",
      Title: empireLeagueMapsModName
    }));
    if (current.every(Boolean)) {
      result.skippedProfiles.push(profileId);
    } else {
      await Promise.all(bundledMapFiles.map(async (file) => {
        const target = join(modRoot, ...file.target);
        await mkdir(dirname(target), { recursive: true });
        await copyFile(join(bundledMapsDirectory(), file.source), target);
      }));
      result.installedProfiles.push(profileId);
    }

    const splashRoot = join(profilesRoot, profileId, "mods", "local", empireLeagueSplashModName);
    const splashCurrent = await Promise.all(bundledSplashFiles.map((file) => filesMatch(
      join(bundledMapsDirectory(), file.source),
      join(splashRoot, ...file.target)
    )));
    await mkdir(splashRoot, { recursive: true });
    await writeFile(join(splashRoot, "info.json"), JSON.stringify({
      Author: "Empire League",
      Description: "Startup branding enabled while Empire League is running.",
      Title: empireLeagueSplashModName
    }));
    if (!splashCurrent.every(Boolean)) {
      await Promise.all(bundledSplashFiles.map(async (file) => {
        const target = join(splashRoot, ...file.target);
        await mkdir(dirname(target), { recursive: true });
        await copyFile(join(bundledMapsDirectory(), file.source), target);
      }));
    }
  }

  result.enabledProfiles = await ensureEmpireLeagueMapsEnabled();
  await setEmpireLeagueSplashEnabled(true);

  return result;
}
