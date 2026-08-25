import { createContext, useContext } from "react";
import type { PartySnapshot } from "../../shared/contracts/parties";
import { emptyPartySnapshot } from "../services/partyService";

export interface PartyContextValue {
  snapshot: PartySnapshot;
  invite: (playerId: string) => Promise<void>;
}

export const PartyContext = createContext<PartyContextValue>({
  snapshot: emptyPartySnapshot,
  invite: async () => undefined
});

export function useParty() {
  return useContext(PartyContext);
}
