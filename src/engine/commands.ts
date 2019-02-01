import { GameState } from '.';
import { Player } from './player';

export type HelperPlacement = [number, number, number];

/** See where a player can put helpers. Returns a list of coordinates [board, chain, action] */
export function possibleHelperPlacements(G: GameState, pl: Player) {
  if (pl.helpers <= 0) {
    return [];
  }

  const board = G.actionBoards[pl.level];

  const ret: HelperPlacement[] = [];

  board.actions.forEach((chain, i) => {
    chain.every((action, j) => {
      if (action.helpers.length > 0 && !action.unlimited) {
        return true;
      }

      ret.push([pl.level, i, j]);
      return false;
    });
  });

  return ret;
}
