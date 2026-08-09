import { readFile, readdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { civilizations } from "../shared/civilizations.js";
import { enabledMapCatalogEntries } from "../shared/mapCatalog.js";
import type { Aoe2Localization } from "../shared/contracts/localization.js";
import civBonuses from "../shared/civBonuses.json" with { type: "json" };

// This is the zero-based order used by AoE2's Game Language dropdown.
const languages = [
  ["br", "Portuguese (Brazil)"], ["de", "German"], ["en", "English"],
  ["es", "Spanish"], ["fr", "French"], ["hi", "Hindi"], ["it", "Italian"],
  ["jp", "Japanese"], ["ko", "Korean"], ["ms", "Malay"],
  ["mx", "Spanish (Latin America)"], ["pl", "Polish"], ["ru", "Russian"],
  ["tr", "Turkish"], ["tw", "Chinese (Traditional)"], ["vi", "Vietnamese"],
  ["zh", "Chinese (Simplified)"]
] as const;

function parseStrings(text: string): Map<string, string> {
  const result = new Map<string, string>();
  for (const rawLine of text.split(/\r?\n/)) {
    const match = rawLine.trim().match(/^(\d+|[A-Z][A-Z0-9_]*)\s+"(.*)"\s*(?:\/\/.*)?$/);
    if (match) result.set(match[1], match[2].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\t/g, " ").trim());
  }
  return result;
}

async function activeLanguageId(): Promise<number | null> {
  const logsRoot = join(homedir(), "Games", "Age of Empires 2 DE", "logs");
  try {
    const folders = (await readdir(logsRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory() && /^\d{4}\.\d{2}\.\d{2}-\d{4}\.\d{2}$/.test(entry.name))
      .map((entry) => entry.name)
      .sort()
      .reverse();
    for (const [index, folder] of folders.entries()) {
      try {
        const logPath = join(logsRoot, folder, "MainLog.txt");
        let log = await readFile(logPath, "utf8");
        let matches = [...log.matchAll(/Calling SetCurrentLanguage\((\d+)\)/g)];
        // A new session first logs an OS fallback, then the saved profile language.
        // Give the newest actively-written log a bounded chance to reach that second phase.
        if (index === 0 && matches.length === 1 && Date.now() - (await stat(logPath)).mtimeMs < 60_000) {
          for (let attempt = 0; attempt < 10 && matches.length === 1; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            log = await readFile(logPath, "utf8");
            matches = [...log.matchAll(/Calling SetCurrentLanguage\((\d+)\)/g)];
          }
        }
        if (matches.length) return Number(matches.at(-1)![1]);
      } catch { /* Try the next retained session. */ }
    }
  } catch { /* AoE2 has not created logs for this Windows user yet. */ }
  return null;
}

export async function loadAoe2Localization(gamePath: string): Promise<Aoe2Localization> {
  const languageId = await activeLanguageId();
  const language = languages[languageId ?? 2] ?? languages[2];
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
