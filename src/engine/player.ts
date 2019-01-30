import Context from './context';
import boards from './player-boards';
import * as _ from 'lodash';

export interface Player {
  money: number;
  level: number;
  helpers: number;
}

export function createPlayer(ctx: Context) {
  return {
    money: 0,
    level: 1,
    helpers: [12, 10, 8][ctx.numPlayers - 2], // 12 for 2 players, 10 for 3, 8 for 4
    board: _.cloneDeep([
      boards[0][ctx.random.D2()],
      boards[1][ctx.random.D2()],
      boards[2][ctx.random.D2()],
      boards[3][ctx.random.D2()],
      boards[4][ctx.random.D2()],
      boards[5][ctx.random.D2()],
    ]),
  };
}
