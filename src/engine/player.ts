import Context from './context';
import * as _ from 'lodash';

export interface Player {
  money: number;
  level: number;
  helpers: number;
}

export function createPlayer(ctx: Context): Player {
  return {
    money: 0,
    level: 1,
    helpers: [12, 10, 8][ctx.numPlayers - 2], // 12 for 2 players, 10 for 3, 8 for 4
  };
}


export namespace Player {
  export function beginRound(pl: Player) {
    pl.level = 1;
  }
}
