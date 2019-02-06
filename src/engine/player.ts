import Context from './context';
import * as _ from 'lodash';
import { Level, Ingredient, CookingPlate } from './enums';

export interface Plate {
  id: CookingPlate;
  ingredients?: Ingredient[];
  active?: boolean;
}

export interface Player {
  id: string;

  money: number;
  level: Level;
  helpers: number;
  plates: Plate[];
  inlineCustomers: number[];
  servedCustomers: number[];
}

export function createPlayer(ctx: Context, id: string): Player {
  return {
    id,
    money: 0,
    level: 0,
    helpers: [12, 10, 8][ctx.numPlayers - 2], // 12 for 2 players, 10 for 3, 8 for 4
    plates: [{id: CookingPlate.Plate1}, {id: CookingPlate.Plate2}, {id: CookingPlate.Plate3}],
    inlineCustomers: [-1, -1, -1, -1],
    servedCustomers: []
  };
}


export namespace Player {
  export function beginRound(pl: Player) {
    pl.level = 0;
  }
}
