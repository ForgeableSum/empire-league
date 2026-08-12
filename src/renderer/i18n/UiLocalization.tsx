import { useEffect, useLayoutEffect, useState } from "react";
import { useAppStore } from "../state/appStore";

type Catalog = Record<string, string>;
type LocalizedValue = { source: string; rendered: string };

const catalogLoaders: Record<string, () => Promise<{ default: Catalog }>> = {
  br: () => import("./br.json"),
  de: () => import("./de.json"),
  es: () => import("./es.json"),
  fr: () => import("./fr.json"),
  hi: () => import("./hi.json"),
  it: () => import("./it.json"),
  jp: () => import("./jp.json"),
  ko: () => import("./ko.json"),
  ms: () => import("./ms.json"),
  mx: () => import("./mx.json"),
  pl: () => import("./pl.json"),
  ru: () => import("./ru.json"),
  tr: () => import("./tr.json"),
  tw: () => import("./tw.json"),
  vi: () => import("./vi.json"),
  zh: () => import("./zh.json")
};
const htmlLanguageCodes: Record<string, string> = {
  br: "pt-BR", de: "de", en: "en", es: "es", fr: "fr", hi: "hi", it: "it", jp: "ja",
  ko: "ko", ms: "ms", mx: "es-419", pl: "pl", ru: "ru", tr: "tr", tw: "zh-Hant",
  vi: "vi", zh: "zh-Hans"
};
const translatedAttributes = ["aria-label", "placeholder", "title"] as const;
const uiTranslationsEnabled = true;
const textValues = new WeakMap<Text, LocalizedValue>();
const attributeValues = new WeakMap<Element, Map<string, LocalizedValue>>();

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function templateTranslator(catalog: Catalog): (value: string) => string | null {
  const templates = Object.keys(catalog)
    .filter((key) => /\{\d+\}/.test(key))
    .map((key) => {
      const placeholderIndexes: number[] = [];
      const pattern = key.split(/(\{\d+\})/g).map((part) => {
        const match = part.match(/^\{(\d+)\}$/);
        if (!match) return escapeRegex(part);
        placeholderIndexes.push(Number(match[1]));
        return "(.+?)";
      }).join("");
      return { regex: new RegExp(`^${pattern}$`, "u"), placeholderIndexes, translated: catalog[key] };
    });

  return (value) => {
    for (const template of templates) {
      const match = value.match(template.regex);
      if (!match) continue;
      const replacements = new Map<number, string>();
      template.placeholderIndexes.forEach((placeholder, index) => replacements.set(placeholder, match[index + 1]));
      return template.translated.replace(/\{(\d+)\}/g, (_token, index: string) => replacements.get(Number(index)) ?? "");
    }
    return null;
  };
}

function localizerFor(catalog: Catalog): (value: string) => string {
  const translateTemplate = templateTranslator(catalog);
  return (value) => catalog[value] ?? translateTemplate(value) ?? value;
}

function translatePreservingSpace(value: string, localize: (value: string) => string): string {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const content = value.slice(leading.length, value.length - trailing.length);
  return content ? `${leading}${localize(content.replace(/\s+/g, " "))}${trailing}` : value;
}

function localizeText(node: Text, localize: (value: string) => string): void {
  const previous = textValues.get(node);
  const source = previous && node.data === previous.rendered ? previous.source : node.data;
  const rendered = translatePreservingSpace(source, localize);
  textValues.set(node, { source, rendered });
  if (node.data !== rendered) node.data = rendered;
}

function localizeElement(element: Element, localize: (value: string) => string): void {
  if (element.matches("script, style, [data-ui-translation='off']") || element.closest("[data-ui-translation='off']")) return;
  let values = attributeValues.get(element);
  if (!values) {
    values = new Map();
    attributeValues.set(element, values);
  }
  for (const attribute of translatedAttributes) {
    const value = element.getAttribute(attribute);
    if (value === null) continue;
    const previous = values.get(attribute);
    const source = previous && value === previous.rendered ? previous.source : value;
    const rendered = localize(source);
    values.set(attribute, { source, rendered });
    if (value !== rendered) element.setAttribute(attribute, rendered);
  }
}

function localizeTree(root: Node, localize: (value: string) => string): void {
  if (root instanceof Text) {
    if (root.parentElement && !root.parentElement.closest("script, style, [data-ui-translation='off']")) localizeText(root, localize);
    return;
  }
  if (!(root instanceof Element) && !(root instanceof Document)) return;
  if (root instanceof Element) localizeElement(root, localize);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node instanceof Text) {
      if (node.parentElement && !node.parentElement.closest("script, style, [data-ui-translation='off']")) localizeText(node, localize);
    } else if (node instanceof Element) {
      localizeElement(node, localize);
    }
  }
}

function restoreText(node: Text): void {
  const previous = textValues.get(node);
  if (!previous) return;
  if (node.data === previous.rendered) node.data = previous.source;
  textValues.delete(node);
}

function restoreElement(element: Element): void {
  const values = attributeValues.get(element);
  if (!values) return;
  for (const [attribute, previous] of values) {
    if (element.getAttribute(attribute) === previous.rendered) {
      element.setAttribute(attribute, previous.source);
    }
  }
  attributeValues.delete(element);
}

function restoreTree(root: Node): void {
  if (root instanceof Text) {
    restoreText(root);
    return;
  }
  if (!(root instanceof Element) && !(root instanceof Document)) return;
  if (root instanceof Element) restoreElement(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node instanceof Text) restoreText(node);
    else if (node instanceof Element) restoreElement(node);
  }
}

export function UiLocalization(): null {
  const { aoe2LanguageCode } = useAppStore();
  const [loadedCatalog, setLoadedCatalog] = useState<{ languageCode: string; catalog: Catalog }>({ languageCode: "en", catalog: {} });

  useEffect(() => {
    let cancelled = false;
    if (!uiTranslationsEnabled || aoe2LanguageCode === "en" || !catalogLoaders[aoe2LanguageCode]) {
      setLoadedCatalog({ languageCode: aoe2LanguageCode, catalog: {} });
      return;
    }
    void catalogLoaders[aoe2LanguageCode]().then((module) => {
      if (!cancelled) setLoadedCatalog({ languageCode: aoe2LanguageCode, catalog: module.default });
    });
    return () => {
      cancelled = true;
    };
  }, [aoe2LanguageCode]);

  useLayoutEffect(() => {
    if (loadedCatalog.languageCode !== aoe2LanguageCode) return;
    if (!uiTranslationsEnabled || aoe2LanguageCode === "en") {
      document.documentElement.lang = "en";
      restoreTree(document.body);
      return;
    }
    const localize = localizerFor(loadedCatalog.catalog);
    document.documentElement.lang = htmlLanguageCodes[aoe2LanguageCode] ?? "en";
    localizeTree(document.body, localize);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") localizeTree(mutation.target, localize);
        if (mutation.type === "attributes" && mutation.target instanceof Element) localizeElement(mutation.target, localize);
        mutation.addedNodes.forEach((node) => localizeTree(node, localize));
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatedAttributes]
    });
    return () => observer.disconnect();
  }, [aoe2LanguageCode, loadedCatalog]);

  return null;
}
