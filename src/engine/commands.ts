import { GameState } from './engine';
import { Player } from './player';
import { Level, Resource } from './enums';
import Context from './context';
import { specialCustomerCards, basicCustomerCards } from './customer';
import * as _ from "lodash";

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

export function addCustomer(G: GameState, ctx: Context, card: number, special: boolean) {
  const deck = special ? G.customers.special : G.customers.basic;

  const pl = G.players[ctx.currentPlayer];

  const customer = _.cloneDeep(special ? specialCustomerCards[card] : basicCustomerCards[card]);
  // position the card shifting the existing ones
  pl.customers.waiting = [customer, ... pl.customers.waiting];

  while (pl.customers.waiting.length > 4) {
    const lastCustomer = pl.customers.waiting.pop();

    pl.money -= 2;
    deck.discard.push(+lastCustomer.id);
  }

  return G;
}
