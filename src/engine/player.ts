import Context from './context';
import * as _ from 'lodash';
import { Level } from './enums';

export interface Player {
  id: string;

  money: number;
  level: Level;
  helpers: number;
}

export function createPlayer(ctx: Context, id: string): Player {
  return {
    id,
    money: 0,
    level: 0,
    helpers: [12, 10, 8][ctx.numPlayers - 2], // 12 for 2 players, 10 for 3, 8 for 4
  };
}


export namespace Player {
  export function beginRound(pl: Player) {
    pl.level = 0;
  }
}
