import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const previewDirectory = resolve("landing/app-preview");
const indexPath = resolve(previewDirectory, "index.html");
let html = await readFile(indexPath, "utf8");

const scriptMatch = html.match(/<script type="module"[^>]*src="\.\/assets\/([^"]+)"[^>]*><\/script>/);
const styleMatch = html.match(/<link rel="stylesheet"[^>]*href="\.\/assets\/([^"]+)"[^>]*>/);

if (!scriptMatch || !styleMatch) {
  throw new Error("Could not find the generated preview script and stylesheet.");
}

let script = await readFile(resolve(previewDirectory, "assets", scriptMatch[1]), "utf8");
let style = await readFile(resolve(previewDirectory, "assets", styleMatch[1]), "utf8");

// The generated files normally live in assets/. Once inlined, relative asset
// references must retain that directory so file:// and HTTP previews behave alike.
script = script
  .replaceAll('new URL("', 'new URL("assets/')
  .replaceAll('import("./', 'import("./assets/')
  .replaceAll("</script", "<\\/script");
style = style
  .replaceAll("url(./", "url(assets/")
  .replaceAll("</style", "<\\/style");

html = html
  .replace(scriptMatch[0], () => `<script type="module">${script}</script>`)
  .replace(styleMatch[0], () => `<style>${style}</style>`);

await writeFile(indexPath, html, "utf8");
