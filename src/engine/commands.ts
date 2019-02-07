import { GameState } from './engine';
import { Player } from './player';
import { Level, Resource, WaitingCustomerPosition } from './enums';
import Context from './context';
import { specialCustomerCards, basicCustomerCards } from './customer';
import * as _ from "lodash";
import Reward from './reward';

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

export function usePendingResource(G: GameState, resource: Resource) {
  G.pendingResources = Reward.merge(G.pendingResources, [new Reward(-1, resource)]);
}

export function addCustomer(G: GameState, ctx: Context, card: number, special: boolean) {
  const deck = special ? G.customers.special : G.customers.basic;

  const pl = G.players[ctx.currentPlayer];

  const customer = _.cloneDeep(special ? specialCustomerCards[card] : basicCustomerCards[card]);

  // Shift existing customers
  const shift = (pos: WaitingCustomerPosition) => {
    if (pl.customers[pos] === null) {
      return;
    }

    const shiftedCustomer = pl.customers[pos];
    pl.customers[pos] = null;

    if (pos === WaitingCustomerPosition.Last) {
      pl.money -= 2;
      deck.discard.push(+shiftedCustomer.id);
    } else {
      shift(pos + 1);
      pl.customers[pos + 1] = shiftedCustomer;
    }
  };

  shift(WaitingCustomerPosition.First);
  pl.customers[0] = customer;

  return G;
}
