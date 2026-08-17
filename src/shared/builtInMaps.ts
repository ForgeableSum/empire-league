export function builtInMapNameFromFile(fileName: string): string {
  const withoutExtension = fileName.replace(/\.rms2?$/i, "");
  return withoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function isSelectableBuiltInMapFile(fileName: string): boolean {
  return /\.rms2?$/i.test(fileName)
    && !/^(?:br[ _-]|ctr[ _-]|em[ _-]|qs[ _-]|real[ _-]world[ _-]|special[ _-]map[ _-]|network[ _-]test)/i.test(fileName);
}
