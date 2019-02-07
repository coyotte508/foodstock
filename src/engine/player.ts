import Context from './context';
import * as _ from 'lodash';
import { Level, Ingredient, CookingPlate } from './enums';
import { Customer } from './customer';

export interface Plate {
  id: CookingPlate;
  ingredients: Ingredient[];
  active?: boolean;
}

export interface Player {
  id: string;

  money: number;
  level: Level;
  helpers: number;
  plates: Plate[];

  customers: {
    waiting: Customer[],
    served: Customer[]
  };
}

export function createPlayer(ctx: Context, id: string): Player {
  return {
    id,
    money: 0,
    level: 0,
    helpers: [12, 10, 8][ctx.numPlayers - 2], // 12 for 2 players, 10 for 3, 8 for 4
    plates: [{id: CookingPlate.Plate1, ingredients: []}, {id: CookingPlate.Plate2, ingredients: []}, {id: CookingPlate.Plate3, ingredients: []}],
    customers: {
      waiting: [null, null, null, null],
      served: []
    }
  };
}


export namespace Player {
  export function beginRound(pl: Player) {
    pl.level = 0;
  }
}
