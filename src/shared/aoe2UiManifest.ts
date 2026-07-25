export type Aoe2Activation = "click" | "clickEnter";

export interface Aoe2UiAction {
  label: string;
  point: readonly [x: number, y: number];
  activation: Aoe2Activation;
  settleMs: number;
  hoverMs?: number;
  holdMs?: number;
}

export const aoe2UiManifest = {
  schemaVersion: 1,
  sourceGameVersion: "101.103.48987.0",
  designResolution: [3840, 2160] as const,
  actions: {
    multiplayer: {
      label: "Multiplayer",
      point: [734, 1085],
      activation: "clickEnter",
      settleMs: 2_000
    },
    hostGame: {
      label: "Host Game",
      point: [2774, 1202],
      activation: "clickEnter",
      settleMs: 2_000
    },
    createLobby: {
      label: "Create Lobby",
      point: [1688, 1614],
      activation: "click",
      settleMs: 8_000
    },
    hostInvite: {
      label: "Invite",
      point: [804, 1343],
      activation: "clickEnter",
      settleMs: 1_000
    },
    copyLobbyUri: {
      label: "Copy Game ID",
      point: [3245, 372],
      activation: "click",
      settleMs: 1_000
    },
    guestReady: {
      label: "Guest Ready",
      point: [1413, 1875],
      activation: "click",
      settleMs: 1_000,
      hoverMs: 250,
      holdMs: 250
    },
    hostReady: {
      label: "Host Ready",
      point: [1388, 1979],
      activation: "click",
      settleMs: 1_000,
      hoverMs: 250,
      holdMs: 250
    },
    startGame: {
      label: "Start Game",
      point: [1974, 1979],
      activation: "click",
      settleMs: 2_000,
      hoverMs: 250,
      holdMs: 250
    },
    confirmCivilization: {
      label: "Confirm Civilization",
      point: [1316, 2019],
      activation: "clickEnter",
      settleMs: 1_000
    }
  } satisfies Record<string, Aoe2UiAction>,
  civilizationSlotButtons: {
    x: 1778,
    rowCenters: [555, 645, 735, 825, 915, 1005, 1095, 1185],
    activation: "click",
    settleMs: 500
  },
  civilizationGrid: {
    columns: 9,
    columnCenters: [248, 501, 755, 1007, 1259, 1512, 1764, 2018, 2271],
    rowCenters: [515, 767, 1020, 1272, 1524, 1776],
    selectorEntries: {
      Random: [0, 0],
      "Full Random": [1, 0],
      Mirror: [2, 0]
    } satisfies Record<string, readonly [column: number, row: number]>,
    entries: {
      Bengalis: [4, 0],
      Bohemians: [5, 0],
      Goths: [6, 0],
      Gurjaras: [7, 0],
      Italians: [8, 0],
      Magyars: [0, 1],
      Malay: [1, 1],
      Vikings: [2, 1],
      Armenians: [3, 1],
      Aztecs: [4, 1],
      Berbers: [5, 1],
      Britons: [6, 1],
      Bulgarians: [7, 1],
      Burgundians: [8, 1],
      Burmese: [0, 2],
      Byzantines: [1, 2],
      Celts: [2, 2],
      Chinese: [3, 2],
      Cumans: [4, 2],
      Dravidians: [5, 2],
      Ethiopians: [6, 2],
      Franks: [7, 2],
      Georgians: [8, 2],
      Hindustanis: [0, 3],
      Huns: [1, 3],
      Incas: [2, 3],
      Japanese: [3, 3],
      Jurchens: [4, 3],
      Khitans: [5, 3],
      Khmer: [6, 3],
      Koreans: [7, 3],
      Lithuanians: [8, 3],
      Malians: [0, 4],
      Mayans: [1, 4],
      Mongols: [2, 4],
      Persians: [3, 4],
      Poles: [4, 4],
      Portuguese: [5, 4],
      Romans: [6, 4],
      Saracens: [7, 4],
      Shu: [8, 4],
      Sicilians: [0, 5],
      Slavs: [1, 5],
      Spanish: [2, 5],
      Tatars: [3, 5],
      Teutons: [4, 5],
      Turks: [5, 5],
      Vietnamese: [6, 5],
      Wei: [7, 5],
      Wu: [8, 5]
    } satisfies Record<string, readonly [column: number, row: number]>
  }
} as const;

export type Aoe2ActionName = keyof typeof aoe2UiManifest.actions;
export type Aoe2Civilization = keyof typeof aoe2UiManifest.civilizationGrid.entries;
export type Aoe2CivilizationSelector = keyof typeof aoe2UiManifest.civilizationGrid.selectorEntries;
export type Aoe2CivilizationSelection = Aoe2Civilization | Aoe2CivilizationSelector;

export function civilizationDesignPoint(selection: Aoe2CivilizationSelection): readonly [number, number] {
  const gridEntries: Record<string, readonly [number, number]> = {
    ...aoe2UiManifest.civilizationGrid.selectorEntries,
    ...aoe2UiManifest.civilizationGrid.entries
  };
  const [column, row] = gridEntries[selection];
  return [
    aoe2UiManifest.civilizationGrid.columnCenters[column],
    aoe2UiManifest.civilizationGrid.rowCenters[row]
  ];
}

export function civilizationSlotDesignPoint(slot: number): readonly [number, number] {
  const y = aoe2UiManifest.civilizationSlotButtons.rowCenters[slot - 1];
  if (y === undefined) throw new Error(`AoE2 lobby slot ${slot} is outside the supported 1-8 range.`);
  return [aoe2UiManifest.civilizationSlotButtons.x, y];
}
