import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import ts from "typescript";

const sourceRoot = join(process.cwd(), "src");
const rendererRoot = join(sourceRoot, "renderer");
const outputPath = join(rendererRoot, "i18n", "en.json");
const translatedAttributeNames = new Set(["aria-label", "label", "placeholder", "title"]);
const translatedPropertyNames = new Set(["description", "detail", "eyebrow", "label", "message", "placeholder", "title"]);
const translatedCallNames = new Set(["Error", "notify"]);
const strings = new Set();
const knownRuntimeStrings = [
  "Portuguese (Brazil)", "German", "English", "Spanish", "French", "Hindi", "Italian", "Japanese",
  "Korean", "Malay", "Spanish (Latin America)", "Russian", "Turkish", "Chinese (Traditional)",
  "Vietnamese", "Chinese (Simplified)", "Polish",
  "Copper", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster",
  "online", "degraded", "offline", "idle", "searching", "match found", "accepting", "creating lobby",
  "waiting for opponent", "verifying lobby", "ready", "in game", "completed", "cancelled", "declined",
  "Online", "Offline", "Idle", "In game", "Looking for a match",
  "{0} minute ago", "{0} minutes ago", "{0} hour ago", "{0} hours ago", "{0} day ago", "{0} days ago"
];

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function add(value) {
  const normalized = normalize(value);
  if (/[A-Za-z]/.test(normalized) && normalized.length > 1) strings.add(normalized);
}

function templateText(node) {
  let result = node.head.text;
  node.templateSpans.forEach((span, index) => {
    result += `{${index}}${span.literal.text}`;
  });
  return result;
}

function propertyName(node) {
  const name = node.name;
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : "";
}

function callName(node) {
  if (ts.isIdentifier(node.expression)) return node.expression.text;
  if (ts.isPropertyAccessExpression(node.expression)) return node.expression.name.text;
  return "";
}

function isRenderedInJsx(node) {
  let current = node;
  for (let parent = node.parent; parent; current = parent, parent = parent.parent) {
    if (ts.isJsxExpression(parent)) return true;
    if (ts.isParenthesizedExpression(parent)) continue;
    if (ts.isConditionalExpression(parent) && (parent.whenTrue === current || parent.whenFalse === current)) continue;
    if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.PlusToken) continue;
    return false;
  }
  return false;
}

function isRuntimeDisplayValue(node) {
  let child = node;
  for (let current = node.parent; current; child = current, current = current.parent) {
    if (ts.isReturnStatement(current)) return true;
    const validReturnWrapper = ts.isParenthesizedExpression(current)
      || (ts.isConditionalExpression(current) && (current.whenTrue === child || current.whenFalse === child))
      || (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.PlusToken);
    if (!validReturnWrapper) break;
  }
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isVariableDeclaration(current)) {
      return ts.isIdentifier(current.name) && /(label|message|text)s?$/i.test(current.name.text);
    }
    if (ts.isFunctionLike(current) || ts.isStatement(current)) return false;
  }
  return false;
}

function inspect(sourceFile) {
  function visit(node) {
    if (ts.isJsxText(node)) add(node.text);

    if (ts.isJsxAttribute(node) && translatedAttributeNames.has(node.name.text)) {
      if (node.initializer && ts.isStringLiteral(node.initializer)) add(node.initializer.text);
    }

    if (ts.isStringLiteral(node)) {
      if (ts.isJsxExpression(node.parent) || isRenderedInJsx(node)) add(node.text);
      if (isRuntimeDisplayValue(node)) add(node.text);
      if (ts.isPropertyAssignment(node.parent) && translatedPropertyNames.has(propertyName(node.parent))) add(node.text);
      if (ts.isCallExpression(node.parent) && translatedCallNames.has(callName(node.parent))) add(node.text);
      if (ts.isNewExpression(node.parent) && translatedCallNames.has(callName(node.parent))) add(node.text);
    }

    if (ts.isTemplateExpression(node)) {
      if (isRenderedInJsx(node)) add(templateText(node));
      if (isRuntimeDisplayValue(node)) add(templateText(node));
      if (ts.isCallExpression(node.parent) && translatedCallNames.has(callName(node.parent))) add(templateText(node));
      if (ts.isNewExpression(node.parent) && translatedCallNames.has(callName(node.parent))) add(templateText(node));
    }

    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}

async function filesUnder(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(fullPath));
    else if (
      [".mjs", ".ts", ".tsx"].includes(extname(entry.name))
      && !fullPath.includes(`${join("renderer", "i18n")}`)
      && !fullPath.includes(`${join("renderer", "mocks")}`)
    ) files.push(fullPath);
  }
  return files;
}

knownRuntimeStrings.forEach(add);

for (const file of await filesUnder(sourceRoot)) {
  const source = await readFile(file, "utf8");
  inspect(ts.createSourceFile(relative(sourceRoot, file), source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX));
}

const sorted = [...strings].sort((left, right) => left.localeCompare(right));
const generated = `${JSON.stringify(Object.fromEntries(sorted.map((value) => [value, value])), null, 2)}\n`;
if (process.argv.includes("--write")) {
  await writeFile(outputPath, generated, "utf8");
}
if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8");
  if (current !== generated) {
    console.error("English UI catalog is stale. Run: node scripts/extract-ui-strings.mjs --write");
    process.exitCode = 1;
  }
}
console.log(`Found ${sorted.length} English UI strings${process.argv.includes("--write") ? ` and wrote ${relative(process.cwd(), outputPath)}` : ""}.`);
