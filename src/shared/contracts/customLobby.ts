export type CustomContentKind = "map" | "data_mod";

export interface LocalCustomContent {
  id: string;
  name: string;
  kind: CustomContentKind;
  path: string;
  source: string;
}

export interface LocalCustomContentCatalog {
  maps: LocalCustomContent[];
  dataMods: LocalCustomContent[];
  scannedRoots: string[];
  scannedAt: string;
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
}

export interface CustomLobbyMessage {
  id: string;
  playerId?: string;
  author: string;
  text: string;
  sentAt: string;
  system?: boolean;
}

export interface CustomLobbyRoom {
  id: string;
  name: string;
  hostId: string;
  map?: Pick<LocalCustomContent, "id" | "name" | "kind">;
  dataMod?: Pick<LocalCustomContent, "id" | "name" | "kind">;
  players: CustomLobbyPlayer[];
  messages: CustomLobbyMessage[];
  maxPlayers: number;
  status: "open" | "started";
  createdAt: string;
  demo?: boolean;
}
