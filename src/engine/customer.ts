import { Ingredient, FoodType} from './enums';
import rawBasicCustomers from './data/basicCustomers';
import rawSpecialCustomers from './data/specialCustomers';

import _ from 'lodash';

export interface Customer {
  id: string;
  food?: string;
  foodType?: FoodType;
  name?: string;
  special: boolean;
  veggie?: boolean;
  blogger?: boolean;
  ingredients: Ingredient[][];

  // Money gained when fulfilling order
  money: number;
}

export const basicCustomerCards: Customer[] = _.cloneDeep(rawBasicCustomers);
export const specialCustomerCards: Customer[] = _.cloneDeep(rawSpecialCustomers);

export function createCustomer(): Customer {
  return _.cloneDeep(rawBasicCustomers[0]);
}

// number of each different card
export function createBasicCustomerDeck() {
  const deckComposition = [7, 5, 7];
  const deck = [];
  for (let i = 0; i < deckComposition.length; i++) {
    deck.push(... [... new Array(deckComposition[i])].map(() => i));
  }
  // deckComposition.forEach( c => deck.splice( deck.length , 0, ...Array.from(Array(deckComposition[c]), x => c)));
  return deck;
}

// cards included
export const SpecialCustomerDeck = [0, 1, 2, 3, 4, 5, 6, 7];


