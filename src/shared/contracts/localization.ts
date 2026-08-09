export interface Aoe2Localization {
  languageId: number | null;
  languageCode: string;
  languageName: string;
  names: Record<string, string>;
  mapDescriptions: Record<string, string>;
  civilizationBonuses: Record<string, {
    bonuses: string[];
    teamBonus: string;
  }>;
}
