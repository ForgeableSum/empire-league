import { currentUser } from "../mocks/mockPlayers";

export const playerService = {
  getCurrentUser: () => Promise.resolve(currentUser)
};
