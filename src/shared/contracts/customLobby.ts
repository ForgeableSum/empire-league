export type CustomContentKind = "map" | "scenario" | "data_mod";

export interface LocalCustomContent {
  id: string;
  name: string;
  gameName: string;
  kind: CustomContentKind;
  path: string;
  source: string;
  enabled: boolean;
  modName?: string;
  builtIn?: boolean;
}

export interface LocalCustomContentCatalog {
  maps: LocalCustomContent[];
  dataMods: LocalCustomContent[];
  scannedRoots: string[];
  scannedAt: string;
}

export interface EnabledUiModsResult {
  mods: string[];
  profileId?: string;
}

export interface DisableUiModsResult {
  disabled: string[];
}

export interface CustomLobbyPlayer {
  id: string;
  displayName: string;
  avatarUrl?: string;
  slot: number;
  team: number;
  civilization: string;
  ready: boolean;
  host: boolean;
  aoeJoined?: boolean;
  aoeContentAccepted?: boolean;
  aoeReady?: boolean;
}

export interface CustomLobbyAiSlot {
  slot: number;
  team: number;
  civilization: string;
}

export interface CustomLobbyMessage {
  id: string;
  playerId?: string;
  author: string;
  text: string;
  sentAt: string;
  system?: boolean;
}

export interface CustomLobbyGameSettings {
  mapSize: typeof customLobbyMapSizes[number];
  aiDifficulty: typeof customLobbyAiDifficulties[number];
  startingResources: typeof customLobbyStartingResources[number];
  populationLimit: typeof customLobbyPopulationLimits[number];
  gameSpeed: typeof customLobbyGameSpeeds[number];
  revealMap: typeof customLobbyRevealMapOptions[number];
  startingAge: typeof customLobbyStartingAges[number];
  endingAge: typeof customLobbyEndingAges[number];
  treatyLength: typeof customLobbyTreatyLengths[number];
  victoryCondition: typeof customLobbyVictoryConditions[number];
  lockTeams: boolean;
  teamTogether: boolean;
  teamPositions: boolean;
  sharedExploration: boolean;
  lockSpeed: boolean;
  allowHandicap: boolean;
  allowCheats: boolean;
  turboMode: boolean;
  fullTechTree: boolean;
  empireWarsMode: boolean;
  suddenDeathMode: boolean;
  regicideMode: boolean;
  antiquityMode: boolean;
  recordGame: boolean;
}

export const customLobbyMapSizes = [
  "Tiny (2 player) [120]",
  "Small (3 player) [144]",
  "Medium (4 player) [168]",
  "Normal (6 player) [200]",
  "Large (8 player) [220]",
  "Huge [240]",
  "Ludicrous [480]"
] as const;

export const customLobbyAiDifficulties = ["Easiest", "Standard", "Moderate", "Hard", "Hardest", "Extreme"] as const;
export const customLobbyStartingResources = ["Standard", "Low", "Medium", "High", "Ultra High", "Infinite", "Random"] as const;
export const customLobbyPopulationLimits = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 300, 400, 500] as const;
export const customLobbyGameSpeeds = ["Slow", "Casual", "Normal", "Fast"] as const;
export const customLobbyRevealMapOptions = ["Normal", "Explored", "All Visible"] as const;
export const customLobbyStartingAges = ["Standard", "Dark Age", "Feudal Age", "Castle Age", "Imperial Age", "Post-Imperial Age"] as const;
export const customLobbyEndingAges = ["Standard", "Dark Age", "Feudal Age", "Castle Age", "Imperial Age"] as const;
export const customLobbyTreatyLengths = [
  "None",
  "5 Minutes",
  "10 Minutes",
  "15 Minutes",
  "20 Minutes",
  "25 Minutes",
  "30 Minutes",
  "35 Minutes",
  "40 Minutes",
  "45 Minutes",
  "50 Minutes",
  "55 Minutes",
  "60 Minutes",
  "90 Minutes"
] as const;
export const customLobbyVictoryConditions = ["Standard", "Conquest", "Time Limit", "Score", "Last Man Standing"] as const;

export const defaultCustomLobbyGameSettings: CustomLobbyGameSettings = {
  mapSize: "Tiny (2 player) [120]",
  aiDifficulty: "Standard",
  startingResources: "Standard",
  populationLimit: 200,
  gameSpeed: "Normal",
  revealMap: "Normal",
  startingAge: "Standard",
  endingAge: "Standard",
  treatyLength: "None",
  victoryCondition: "Standard",
  lockTeams: true,
  teamTogether: true,
  teamPositions: false,
  sharedExploration: false,
  lockSpeed: true,
  allowHandicap: false,
  allowCheats: false,
  turboMode: false,
  fullTechTree: false,
  empireWarsMode: false,
  suddenDeathMode: false,
  regicideMode: false,
  antiquityMode: false,
  recordGame: true
};

export interface CustomLobbyRoom {
  id: string;
  name: string;
  hostId: string;
  map?: Pick<LocalCustomContent, "id" | "name" | "gameName" | "kind">;
  dataMod?: Pick<LocalCustomContent, "id" | "name" | "kind">;
  players: CustomLobbyPlayer[];
  aiSlots: CustomLobbyAiSlot[];
  messages: CustomLobbyMessage[];
  gameSettings: CustomLobbyGameSettings;
  maxPlayers: number;
  status: "open" | "launching" | "started";
  automationAttemptId?: string;
  automationStartedAt?: string;
  gameStartedAt?: string;
  gamePlayerCount?: number;
  platformLobbyId?: string;
  automationError?: string;
  createdAt: string;
  demo?: boolean;
  source?: "custom" | "weekly";
  locked?: boolean;
  weeklyModeId?: string;
}
