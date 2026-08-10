import { readFile, writeFile } from "node:fs/promises";
import { get } from "node:https";
import { join } from "node:path";

const localeTargets = {
  br: "pt",
  de: "de",
  es: "es",
  fr: "fr",
  hi: "hi",
  it: "it",
  jp: "ja",
  ko: "ko",
  ms: "ms",
  mx: "es",
  ru: "ru",
  tr: "tr",
  tw: "zh-TW",
  vi: "vi",
  zh: "zh-CN",
  pl: "pl"
};
const refreshProtected = process.argv.includes("--refresh-protected");
const refreshContextual = process.argv.includes("--refresh-contextual");
const requestedLocales = process.argv.slice(2).filter((value) => !value.startsWith("--"));
const locales = requestedLocales.length ? requestedLocales : Object.keys(localeTargets);
const i18nRoot = join(process.cwd(), "src", "renderer", "i18n");
const overridesRoot = join(process.cwd(), "scripts", "ui-translation-overrides");
const english = JSON.parse(await readFile(join(i18nRoot, "en.json"), "utf8"));
const phrases = Object.keys(english);
const separator = "\n[[[EL_SPLIT_7F3A]]]\n";
const protectedTerms = [
  ["Age of Empires II", "ZXQ000QXZ"],
  ["Empire League", "ZXQ111QXZ"],
  ["AoE2:DE", "ZXQ222QXZ"],
  ["AoE2", "ZXQ333QXZ"],
  ["YouTube", "ZXQ444QXZ"],
  ["Discord", "ZXQ555QXZ"],
  ["Steam", "ZXQ666QXZ"],
  ["OBS", "ZXQ777QXZ"],
  ["Elo", "ZXQ888QXZ"]
];

function protectTerms(value) {
  return protectedTerms.reduce((result, [term, token]) => result.replaceAll(term, token), value);
}

function restoreTerms(value) {
  return protectedTerms.reduce((result, [term, token]) => result.replaceAll(token, term), value);
}

function translateRequest(text, target) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        if (response.statusCode !== 200) {
          reject(new Error(`Translation request failed with HTTP ${response.statusCode}: ${body.slice(0, 160)}`));
          return;
        }
        try {
          const result = JSON.parse(body);
          resolve(result[0].map((part) => part[0]).join(""));
        } catch (error) {
          reject(new Error(`Invalid translation response: ${error instanceof Error ? error.message : String(error)}`));
        }
      });
    }).on("error", reject);
  });
}

function chunksOf(values, maxCharacters = 2600, extraCharactersPerValue = 0) {
  const chunks = [];
  let current = [];
  let length = 0;
  for (const value of values) {
    const addedLength = value.length + extraCharactersPerValue + (current.length ? separator.length : 0);
    if (current.length && length + addedLength > maxCharacters) {
      chunks.push(current);
      current = [];
      length = 0;
    }
    current.push(value);
    length += addedLength;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

const contextDescriptions = {
  navigation: "sidebar navigation and page titles in a desktop app; use concise standard menu terminology",
  video: "controls for short-form gaming videos; 'short' means a short video, not a brief amount of time",
  social: "friends, invitations, presence, and chat in a friendly gaming community",
  settings: "desktop-app settings, language selection, updates, sign-in, and OBS streaming integration",
  lobby: "an Age of Empires II multiplayer lobby; civilization means a playable faction, map means a battleground, ready is a player readiness state, and room means a game lobby",
  matchmaking: "competitive video-game matchmaking; match means a played game, queue means the matchmaking queue, and rating means a player's competitive skill rating",
  diagnostic: "a clear actionable error or diagnostic message in a desktop gaming app",
  general: "a friendly modern desktop gaming app; use natural concise interface language and a friendly direct tone rather than overly formal wording"
};

function contextFor(phrase) {
  if (/^(Home|Ranked|Weekly|Custom|Match History|Leaderboard|Profile|Social|Settings|Back|Next|Previous|Continue)$/i.test(phrase)) return "navigation";
  if (/short|video|fullscreen|playback|mute|youtube/i.test(phrase)) return "video";
  if (/friend|chat|message|invite|social|presence|network/i.test(phrase)) return "social";
  if (/OBS|WebSocket|language|update|download|sign[ -]?in|Steam|startup|recording|streaming/i.test(phrase)) return "settings";
  if (/lobby|civilization|\bciv\b|map|scenario|ready|\bteam\b|host|guest|slot|room/i.test(phrase)) return "lobby";
  if (/match|queue|opponent|rating|rank|\bElo\b|searching|victory|defeat|\bwin|\bloss/i.test(phrase)) return "matchmaking";
  if (/could not|failed|not found|required|invalid|unsupported|timed out|error|rejected|unavailable/i.test(phrase)) return "diagnostic";
  return "general";
}

function contextualChunks(values) {
  const groups = new Map();
  for (const value of values) {
    const context = contextFor(value);
    const group = groups.get(context) ?? [];
    group.push(value);
    groups.set(context, group);
  }
  return [...groups].flatMap(([context, group]) =>
    chunksOf(group, 2600, contextDescriptions[context].length + 75).map((phrases) => ({ context, phrases }))
  );
}

const contextualResultMarker = "ZXQ999QXZ";

function contextualize(phrase, context) {
  return `Translate this text from ${contextDescriptions[context]}. Use natural wording appropriate for that exact UI context.\n${contextualResultMarker}\n${protectTerms(phrase)}`;
}

function extractContextualResult(value) {
  const markerIndex = value.indexOf(contextualResultMarker);
  return markerIndex >= 0 ? value.slice(markerIndex + contextualResultMarker.length).trim() : "";
}

function placeholders(value) {
  return [...value.matchAll(/\{\d+\}/g)].map((match) => match[0]).sort().join("|");
}

for (const locale of locales) {
  const target = localeTargets[locale];
  if (!target) throw new Error(`Unknown UI locale: ${locale}`);
  let existing = {};
  try {
    existing = JSON.parse(await readFile(join(i18nRoot, `${locale}.json`), "utf8"));
  } catch { /* A missing catalog is generated from scratch. */ }
  const output = Object.fromEntries(phrases.filter((phrase) => typeof existing[phrase] === "string").map((phrase) => [phrase, existing[phrase]]));
  const pendingPhrases = phrases.filter((phrase) =>
    !(phrase in output)
    || refreshContextual
    || (refreshProtected && protectedTerms.some(([term]) => phrase.includes(term)))
  );
  const chunks = contextualChunks(pendingPhrases);
  console.log(`Generating ${locale} (${target}): ${pendingPhrases.length} pending strings in ${chunks.length} batches...`);

  for (let index = 0; index < chunks.length; index += 1) {
    const { context, phrases: chunk } = chunks[index];
    const translatedBatch = await translateRequest(chunk.map((phrase) => contextualize(phrase, context)).join(separator), target);
    const translatedParts = translatedBatch.split(separator);
    let translations = translatedParts.length === chunk.length ? translatedParts.map(extractContextualResult) : [];
    if (translations.length !== chunk.length || translations.some((translation) => !translation)) {
      console.warn(`Batch ${index + 1} did not preserve contextual separators; retrying ${chunk.length} strings individually.`);
      translations = [];
      for (const phrase of chunk) {
        const retry = await translateRequest(contextualize(phrase, context), target);
        translations.push(extractContextualResult(retry));
      }
    }
    chunk.forEach((phrase, phraseIndex) => {
      const translated = restoreTerms(translations[phraseIndex]?.trim() || phrase);
      output[phrase] = placeholders(translated) === placeholders(phrase) && !/ZXQ.*QXZ/.test(translated) ? translated : phrase;
    });
    process.stdout.write(`\r${locale}: ${index + 1}/${chunks.length}`);
  }
  process.stdout.write("\n");
  try {
    const overrides = JSON.parse(await readFile(join(overridesRoot, `${locale}.json`), "utf8"));
    for (const [phrase, translation] of Object.entries(overrides)) {
      if (!(phrase in english)) throw new Error(`${locale} override references an unknown English string: ${phrase}`);
      if (typeof translation !== "string" || !translation.trim()) throw new Error(`${locale} override is empty: ${phrase}`);
      output[phrase] = translation;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  await writeFile(join(i18nRoot, `${locale}.json`), `${JSON.stringify(output, null, 2)}\n`, "utf8");
}
