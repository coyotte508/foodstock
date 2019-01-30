export default interface Context {
  numPlayers: number;
  random: {
    Shuffle: <T>(deck: T[]) => T[],
    D2: () => 1 | 0,
  };
  events: {
    endTurn: (nextPlayer?: string) => void,
    endPhase: () => void,
  };
  currentPlayer: string;
  /** Player that just moved */
  playerID: string;
  turn: number;
}
