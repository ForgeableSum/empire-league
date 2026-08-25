import { enabledMapCatalogEntries } from "./mapCatalog.js";

export type Aoe2Activation = "click" | "clickEnter";

export interface Aoe2UiAction {
  label: string;
  point: readonly [x: number, y: number];
  activation: Aoe2Activation;
  settleMs: number;
  hoverMs?: number;
  holdMs?: number;
}

const mapPickerEntries: Record<string, number> = Object.fromEntries(
  enabledMapCatalogEntries.flatMap((map) => [
    [map.gameMapName, map.lobbyPickerResultIndex],
    ...(map.teamGameMapName
      ? [[map.teamGameMapName, map.teamGameLobbyPickerResultIndex ?? map.lobbyPickerResultIndex] as const]
      : [])
  ])
);

const customMapNames = enabledMapCatalogEntries
  .filter((map) => map.isCustomMap)
  .map((map) => map.gameMapName);

const teamGameMapSizes = {
  4: { label: "Medium (4 player) [168]", optionIndex: 2 },
  6: { label: "Normal (6 player) [200]", optionIndex: 3 },
  8: { label: "Large (8 player) [220]", optionIndex: 4 }
} as const;

export function teamGameMapSizeSelection(playerCount: number) {
  return teamGameMapSizes[playerCount as keyof typeof teamGameMapSizes];
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
    lobbyVisibility: {
      label: "Open Lobby Visibility",
      point: [2133, 869],
      activation: "click",
      settleMs: 250
    },
    playerCount: {
      label: "Open Player Count",
      point: [2133, 949],
      activation: "click",
      settleMs: 250
    },
    allowSpectators: {
      label: "Allow Spectators",
      point: [1530, 1264],
      activation: "click",
      settleMs: 250
    },
    lobbyPassword: {
      label: "Set Lobby Password",
      point: [2133, 1189],
      activation: "click",
      settleMs: 100
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
    },
    confirmGuestContent: {
      label: "Accept Unverified Lobby Content",
      point: [1600, 1400],
      activation: "click",
      settleMs: 750
    }
  } satisfies Record<string, Aoe2UiAction>,
  civilizationSlotButtons: {
    x: 1778,
    rowCenters: [555, 645, 735, 825, 915, 1005, 1095, 1185],
    activation: "click",
    settleMs: 1_500
  },
  playerTypeSlotDropdowns: {
    // NameDropDown in screenmultiplayerlobbyhost.json. The value box occupies
    // the left portion of each player row and opens reliably from its center.
    x: 1120,
    rowCenters: [555, 645, 735, 825, 915, 1005, 1095, 1185],
    // Live selection established consecutive Open and Closed row centers at
    // +77 and +118 from the slot center. Normal DE AI is the following row.
    // Target that row directly; legacy CD/HD and custom AIs follow it.
    optionX: 1120,
    normalAiOptionOffsetY: 159,
    openSettleMs: 500,
    selectionSettleMs: 700
  },
  teamSlotButtons: {
    hostX: 2093,
    guestX: 2042,
    rowCenters: [555, 645, 735, 825, 915, 1005, 1095, 1185],
    initialSelection: "?",
    cycle: ["?", "-", "1", "2", "3", "4"]
  },
  civilizationPicker: {
    searchPoint: [375, 300] as const,
    filteredCivilizationPoint: [1259, 515] as const,
    // Allow filtered civilization results to populate before selecting the tile.
    searchSettleMs: 1_500,
    selectionSettleMs: 1_000
  },
  mapPicker: {
    openPoint: [3049, 725] as const,
    searchPoint: [1040, 431] as const,
    mapStylePoint: [2755, 429] as const,
    standardStylePoint: [2609, 487] as const,
    customStylePoint: [2609, 613] as const,
    customMapNames,
    resultColumnCenters: [738, 1064, 1390, 1715, 2040, 2365] as const,
    resultRowCenters: [665, 989, 1313, 1637] as const,
    entries: mapPickerEntries,
    openSettleMs: 1_000,
    styleMenuSettleMs: 500,
    styleSelectionSettleMs: 1_000,
    searchSettleMs: 750,
    selectionSettleMs: 1_000
  },
  scenarioPicker: {
    gameModePoint: [3049, 658] as const,
    setScenarioPoint: [3045, 725] as const,
    searchPoint: [1035, 489] as const,
    firstResultPoint: [738, 667] as const,
    loadScenarioPoint: [1907, 1857] as const,
    modeMenuSettleMs: 300,
    recommendedSettingsSettleMs: 750,
    openSettleMs: 1_000,
    searchSettleMs: 750,
    selectionSettleMs: 300,
    loadSettleMs: 2_000
  },
  passwordPrompt: {
    inputPoint: [1920, 1070] as const,
    confirmPoint: [1671, 1255] as const,
    inputSettleMs: 100,
    confirmSettleMs: 5_000
  },
  advancedSettings: {
    // Measured from the native 2560x1440 PNG pixel grid (not the inspection
    // viewer's scaled preview), then converted to 3840x2160 design space.
    points: {
      lockTeams: [2447, 1554],
      teamTogether: [2447, 1598],
      teamPositions: [2447, 1643],
      sharedExploration: [2447, 1689],
      allowHandicap: [2447, 1734],
      lockSpeed: [2916, 1554],
      allowCheats: [2916, 1598],
      turboMode: [2916, 1643],
      fullTechTree: [2916, 1689],
      empireWarsMode: [2916, 1734],
      suddenDeathMode: [2916, 1779],
      regicideMode: [2916, 1824],
      antiquityMode: [2916, 1869],
      recordGame: [2916, 1914]
    },
    settleMs: 120
  },
  lobbySelectSettings: {
    points: {
      mapSize: [3049, 788],
      aiDifficulty: [3049, 853],
      startingResources: [3049, 918],
      populationLimit: [3049, 983],
      gameSpeed: [3049, 1048],
      revealMap: [3049, 1113],
      startingAge: [3049, 1178],
      endingAge: [3049, 1243],
      treatyLength: [3049, 1308],
      victoryCondition: [3049, 1373]
    },
    // Measured from the live lobby and corroborated by each DropDownListBox in
    // screenmultiplayerlobbyhost.json (40-unit rows). Directional key messages
    // are ignored by these controls, so select rows directly. Long lists show
    // eight rows and advance one row per scroll-down button click.
    optionX: 2875,
    firstOptionOffsetY: 58,
    optionRowStepY: 42,
    visibleRows: 8,
    scrollDownX: 3253,
    scrollDownOffsetY: 369,
    openSettleMs: 500,
    scrollSettleMs: 350,
    selectionSettleMs: 700
  },
  civilizationGrid: {
    columns: 9,
    columnCenters: [248, 501, 755, 1007, 1259, 1512, 1764, 2018, 2271],
    rowCenters: [515, 767, 1020, 1272, 1524, 1776, 2028],
    hoverMs: 250,
    holdMs: 250,
    selectionSettleMs: 1_000,
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
      Mapuche: [1, 4],
      Mayans: [2, 4],
      Mongols: [3, 4],
      Muisca: [4, 4],
      Persians: [5, 4],
      Poles: [6, 4],
      Portuguese: [7, 4],
      Romans: [8, 4],
      Saracens: [0, 5],
      Shu: [1, 5],
      Sicilians: [2, 5],
      Slavs: [3, 5],
      Spanish: [4, 5],
      Tatars: [5, 5],
      Teutons: [6, 5],
      Tupi: [7, 5],
      Turks: [8, 5],
      Vietnamese: [0, 6],
      Wei: [1, 6],
      Wu: [2, 6]
    } satisfies Record<string, readonly [column: number, row: number]>
  }
} as const;

export type Aoe2ActionName = keyof typeof aoe2UiManifest.actions;
export type Aoe2Civilization = keyof typeof aoe2UiManifest.civilizationGrid.entries;
export type Aoe2CivilizationSelector = keyof typeof aoe2UiManifest.civilizationGrid.selectorEntries;
export type Aoe2CivilizationSelection = Aoe2Civilization | Aoe2CivilizationSelector;
export type Aoe2MapSelection = keyof typeof aoe2UiManifest.mapPicker.entries;

export function mapDesignPoint(selection: Aoe2MapSelection): readonly [number, number] {
  const index = aoe2UiManifest.mapPicker.entries[selection];
  const columns = aoe2UiManifest.mapPicker.resultColumnCenters.length;
  const x = aoe2UiManifest.mapPicker.resultColumnCenters[index % columns];
  const y = aoe2UiManifest.mapPicker.resultRowCenters[Math.floor(index / columns)];
  if (x === undefined || y === undefined) {
    throw new Error(`AoE2 map ${selection} is outside the supported result grid.`);
  }
  return [x, y];
}

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

export function playerTypeSlotDesignPoint(slot: number): readonly [number, number] {
  const y = aoe2UiManifest.playerTypeSlotDropdowns.rowCenters[slot - 1];
  if (y === undefined) throw new Error(`AoE2 lobby slot ${slot} is outside the supported 1-8 range.`);
  return [aoe2UiManifest.playerTypeSlotDropdowns.x, y];
}

export function teamSlotDesignPoint(slot: number, useHostLayout = slot === 1): readonly [number, number] {
  const y = aoe2UiManifest.teamSlotButtons.rowCenters[slot - 1];
  if (y === undefined) throw new Error(`AoE2 lobby slot ${slot} is outside the supported 1-8 range.`);
  // AoE2's host lobby uses a working increment hitbox farther right than the
  // selector on a guest's client layout. AI rows are configured by the host,
  // so their slot number alone cannot determine which X coordinate to use.
  const x = useHostLayout
    ? aoe2UiManifest.teamSlotButtons.hostX
    : aoe2UiManifest.teamSlotButtons.guestX;
  return [x, y];
}
