import { readFile } from "node:fs/promises";
import { join } from "node:path";

const i18nRoot = join(process.cwd(), "src", "renderer", "i18n");
const locales = ["br", "de", "es", "fr", "hi", "it", "jp", "ko", "ms", "mx", "pl", "ru", "tr", "tw", "vi", "zh"];
const english = JSON.parse(await readFile(join(i18nRoot, "en.json"), "utf8"));
const englishKeys = Object.keys(english);
let failed = false;

function placeholders(value) {
  return [...value.matchAll(/\{\d+\}/g)].map((match) => match[0]).sort().join("|");
}

for (const locale of locales) {
  const catalog = JSON.parse(await readFile(join(i18nRoot, `${locale}.json`), "utf8"));
  const missing = englishKeys.filter((key) => typeof catalog[key] !== "string" || !catalog[key].trim());
  const stale = Object.keys(catalog).filter((key) => !(key in english));
  const invalidPlaceholders = englishKeys.filter((key) => placeholders(key) !== placeholders(catalog[key] ?? ""));
  const leakedSentinels = englishKeys.filter((key) => /ZXQ.*QXZ|EL_SPLIT/.test(catalog[key] ?? ""));
  if (missing.length || stale.length || invalidPlaceholders.length || leakedSentinels.length) {
    failed = true;
    console.error(`${locale}: ${missing.length} missing, ${stale.length} stale, ${invalidPlaceholders.length} placeholder mismatches, ${leakedSentinels.length} leaked sentinels`);
  } else {
    console.log(`${locale}: ${englishKeys.length} strings complete`);
  }
}

if (failed) process.exitCode = 1;
