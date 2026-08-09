// Zero-based order used by AoE2's Game Language dropdown and MainLog language IDs.
export const aoe2Languages = [
  ["br", "Portuguese (Brazil)"], ["de", "German"], ["en", "English"],
  ["es", "Spanish"], ["fr", "French"], ["hi", "Hindi"], ["it", "Italian"],
  ["jp", "Japanese"], ["ko", "Korean"], ["ms", "Malay"],
  ["mx", "Spanish (Latin America)"], ["ru", "Russian"], ["tr", "Turkish"],
  ["tw", "Chinese (Traditional)"], ["vi", "Vietnamese"],
  ["zh", "Chinese (Simplified)"], ["pl", "Polish"]
] as const;

export function isAoe2LanguageId(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) < aoe2Languages.length;
}
