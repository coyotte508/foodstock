import { GameState } from './engine';
import { Player } from './player';
import { Level, Resource } from './enums';
import Context from './context';

export type HelperPlacement = [Level, number, number];

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

export function isPendingResource(G: GameState, resource: Resource) {
  return G.pendingResources.some(rew => rew.count > 0 && rew.type === resource);
}

export function drawSpecialCustomers(G: GameState, num: number) {
  // discard current cards
  if ( G.availableSpecialCustomers.length > 0 ) {
    for (let i = 0; i < num; i++) {
      G.discardedSpecialCustomers.push( G.availableSpecialCustomers[0]);
      G.availableSpecialCustomers.splice(0, 1);
    }
  }

  for (let i = 0; i < num; i++) {
    G.availableSpecialCustomers.push( G.specialCustomers[0]);
    G.specialCustomers.splice(0, 1);
  }
  return true;
}

export function newCustomer(G: GameState, ctx: Context, card: number) {
    const pl = G.players[ctx.currentPlayer];
    // position the card shifting the existing ones
    pl.inlineCustomers = [card, ... pl.inlineCustomers];
    const shiftCard = pl.inlineCustomers.findIndex( c => c === -1 );
    if (shiftCard > -1) {
      pl.inlineCustomers.splice(shiftCard, 1);
    }
    // a customer has to exit
    if ( pl.inlineCustomers.length === 5) {
      // charge the player
      // clean up the inline
      pl.inlineCustomers.splice(5, 1);
    }
    return G;
}
