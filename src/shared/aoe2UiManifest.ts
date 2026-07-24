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
      activation: "clickEnter",
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
    hostCivilization: {
      label: "Host Civilization",
      point: [1778, 555],
      activation: "click",
      settleMs: 500
    },
    confirmCivilization: {
      label: "Confirm Civilization",
      point: [1316, 2019],
      activation: "clickEnter",
      settleMs: 1_000
    }
  } satisfies Record<string, Aoe2UiAction>,
  civilizationGrid: {
    columns: 9,
    columnCenters: [248, 501, 755, 1007, 1259, 1512, 1764, 2018, 2271],
    rowCenters: [515, 767, 1020, 1272, 1524, 1776],
    entries: {
      Bengalis: [4, 0],
      Bohemians: [5, 0],
      Gurjaras: [6, 0],
      Italians: [7, 0],
      Magyars: [8, 0],
      Malay: [0, 1],
      Vikings: [1, 1],
      Armenians: [2, 1],
      Aztecs: [3, 1],
      Berbers: [4, 1],
      Britons: [5, 1],
      Bulgarians: [6, 1],
      Burgundians: [7, 1],
      Burmese: [8, 1],
      Byzantines: [0, 2],
      Celts: [1, 2],
      Chinese: [2, 2],
      Cumans: [3, 2],
      Dravidians: [4, 2],
      Ethiopians: [5, 2],
      Franks: [6, 2],
      Georgians: [7, 2],
      Goths: [8, 2],
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

export function civilizationDesignPoint(civilization: Aoe2Civilization): readonly [number, number] {
  const [column, row] = aoe2UiManifest.civilizationGrid.entries[civilization];
  return [
    aoe2UiManifest.civilizationGrid.columnCenters[column],
    aoe2UiManifest.civilizationGrid.rowCenters[row]
  ];
}
