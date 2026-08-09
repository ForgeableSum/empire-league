import { readFile, readdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { app } from "electron";
import { aoe2Languages, isAoe2LanguageId } from "../shared/aoe2Languages.js";
import { civilizations } from "../shared/civilizations.js";
import { enabledMapCatalogEntries } from "../shared/mapCatalog.js";
import type { Aoe2Localization } from "../shared/contracts/localization.js";
import civBonuses from "../shared/civBonuses.json" with { type: "json" };

let rememberedLanguageId: number | null | undefined;
let languageOverrideId: number | null = null;

function validLanguageId(value: unknown): value is number {
  return isAoe2LanguageId(value);
}

async function readRememberedLanguageId(): Promise<number | null> {
  if (rememberedLanguageId !== undefined) return rememberedLanguageId;
  try {
    const stored = JSON.parse(await readFile(join(app.getPath("userData"), "aoe2-language.json"), "utf8")) as { languageId?: unknown };
    rememberedLanguageId = validLanguageId(stored.languageId) ? stored.languageId : null;
  } catch {
    rememberedLanguageId = null;
  }
  return rememberedLanguageId;
}

async function rememberLanguageId(languageId: number): Promise<void> {
  if (!validLanguageId(languageId) || rememberedLanguageId === languageId) return;
  rememberedLanguageId = languageId;
  try {
    await writeFile(
      join(app.getPath("userData"), "aoe2-language.json"),
      `${JSON.stringify({ languageId })}\n`,
      "utf8"
    );
  } catch { /* A read-only cache must never prevent localization or automation. */ }
}

function parseStrings(text: string): Map<string, string> {
  const result = new Map<string, string>();
  for (const rawLine of text.split(/\r?\n/)) {
    const match = rawLine.trim().match(/^(\d+|[A-Z][A-Z0-9_]*)\s+"(.*)"\s*(?:\/\/.*)?$/);
    if (match) result.set(match[1], match[2].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\t/g, " ").trim());
  }
  return result;
}

async function languageEntries(logPath: string): Promise<number[]> {
  try {
    const log = await readFile(logPath, "utf8");
    return [...log.matchAll(/Calling SetCurrentLanguage\((\d+)\)/g)].map((match) => Number(match[1]));
  } catch {
    return [];
  }
}

async function sessionFolders(logsRoot: string): Promise<string[]> {
  try {
    return (await readdir(logsRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory() && /^\d{4}\.\d{2}\.\d{2}-\d{4}\.\d{2}$/.test(entry.name))
      .map((entry) => entry.name)
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

async function activeLanguageId(currentSessionOnly: boolean): Promise<number | null> {
  const logsRoot = join(homedir(), "Games", "Age of Empires 2 DE", "logs");
  if (currentSessionOnly) {
    const newest = (await sessionFolders(logsRoot))[0];
    if (!newest) return null;
    const entries = await languageEntries(join(logsRoot, newest, "MainLog.txt"));
    // Complete startups log an OS fallback first and the saved profile
    // language after player-profile loading. Only the latter is authoritative.
    const languageId = entries.length >= 2 ? entries.at(-1)! : null;
    if (languageId !== null) await rememberLanguageId(languageId);
    return languageId;
  }

  for (const folder of await sessionFolders(logsRoot)) {
    const entries = await languageEntries(join(logsRoot, folder, "MainLog.txt"));
    // A single entry is AoE2's startup fallback, not the player's saved setting.
    // Skip incomplete sessions and retain the newest previously confirmed language.
    if (entries.length >= 2) {
      const languageId = entries.at(-1)!;
      await rememberLanguageId(languageId);
      return languageId;
    }
  }
  return readRememberedLanguageId();
}

export async function loadAoe2Localization(gamePath: string, currentSessionOnly = false): Promise<Aoe2Localization> {
  const detectedLanguageId = currentSessionOnly ? await activeLanguageId(true) : null;
  if (detectedLanguageId !== null && languageOverrideId !== null && detectedLanguageId !== languageOverrideId) {
    languageOverrideId = null;
  }
  const languageId = currentSessionOnly
    ? detectedLanguageId
    : languageOverrideId ?? await activeLanguageId(false);
  const language = aoe2Languages[languageId ?? 2] ?? aoe2Languages[2];
  const stringsPath = (code: string) => join(gamePath, "resources", code, "strings", "key-value", "key-value-strings-utf8.txt");
  try {
    const [englishText, localizedText] = await Promise.all([
      readFile(stringsPath("en"), "utf8"),
      readFile(stringsPath(language[0]), "utf8")
    ]);
    const english = parseStrings(englishText);
    const localized = parseStrings(localizedText);
    const wanted = new Set<string>([
      ...civilizations,
      "Random", "Full Random", "Mirror",
      ...enabledMapCatalogEntries.filter((map) => !map.isCustomMap).flatMap((map) => [map.name, map.gameMapName])
    ]);
    const englishLookupAliases: Record<string, string> = {
      // Empire League's canonical/server name is plural; AoE2's UI string is singular in English.
      Mayans: "Maya"
    };
    const keyByEnglish = new Map<string, string>();
    for (const [key, value] of english) if (wanted.has(value) && !keyByEnglish.has(value)) keyByEnglish.set(value, key);
    const names: Record<string, string> = {};
    for (const canonical of wanted) {
      const lookupName = englishLookupAliases[canonical] ?? canonical;
      const key = keyByEnglish.get(lookupName) ?? [...english].find(([, value]) => value === lookupName)?.[0];
      names[canonical] = (key && localized.get(key)) || canonical;
    }
    const mapDescriptions: Record<string, string> = {};
    for (const map of enabledMapCatalogEntries.filter((entry) => !entry.isCustomMap)) {
      const englishPrefix = `${map.gameMapName} - `;
      const descriptionEntry = [...english].find(([, value]) => value.startsWith(englishPrefix));
      const translated = descriptionEntry ? localized.get(descriptionEntry[0]) : undefined;
      const separator = translated?.match(/\s[-–—]\s/);
      if (translated && separator?.index !== undefined) {
        mapDescriptions[map.name] = translated.slice(separator.index + separator[0].length).trim();
      }
    }

    const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
    const civilizationBonuses: Aoe2Localization["civilizationBonuses"] = {};
    for (const [civilization, fallback] of Object.entries(civBonuses)) {
      const firstBonus = normalize(fallback.bonuses[0] ?? "");
      const teamBonus = normalize(fallback.teamBonus);
      const englishEntry = [...english].find(([key, value]) =>
        /^120\d+$/.test(key)
        && normalize(value).includes(firstBonus)
        && normalize(value).includes(teamBonus)
      );
      const translated = englishEntry ? localized.get(englishEntry[0]) : undefined;
      if (!translated) continue;
      const firstSection = translated.split(/\n\s*\n<b>/)[0];
      const bonuses = firstSection.split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("•"))
        .map((line) => line.slice(1).trim());
      const lastTag = translated.lastIndexOf("<b>");
      const localizedTeamBonus = lastTag >= 0 ? translated.slice(lastTag + 3).trim() : "";
      if (bonuses.length && localizedTeamBonus) {
        civilizationBonuses[civilization] = { bonuses, teamBonus: localizedTeamBonus };
      }
    }
    return { languageId, languageCode: language[0], languageName: language[1], names, mapDescriptions, civilizationBonuses };
  } catch {
    return { languageId, languageCode: "en", languageName: "English", names: {}, mapDescriptions: {}, civilizationBonuses: {} };
  }
}

export function setAoe2LanguageOverride(languageId: number | null): void {
  languageOverrideId = isAoe2LanguageId(languageId) ? languageId : null;
}
