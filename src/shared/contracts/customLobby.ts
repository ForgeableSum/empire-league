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
  aoeReady?: boolean;
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

export const defaultCustomLobbyGameSettings: CustomLobbyGameSettings = {
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
  messages: CustomLobbyMessage[];
  gameSettings: CustomLobbyGameSettings;
  maxPlayers: number;
  status: "open" | "launching" | "started";
  gameStartedAt?: string;
  platformLobbyId?: string;
  automationError?: string;
  createdAt: string;
  demo?: boolean;
}
