export function createTournamentChatStore() {
  const histories = new Map();
  return {
    history(tournamentId) {
      return [...(histories.get(tournamentId) ?? [])];
    },
    add(tournamentId, message) {
      const history = histories.get(tournamentId) ?? [];
      history.push(message);
      histories.set(tournamentId, history);
      return message;
    },
    clear(tournamentId) {
      histories.delete(tournamentId);
    }
  };
}
