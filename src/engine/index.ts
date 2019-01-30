import {Game, INVALID_MOVE} from 'boardgame.io/core';
import { Player, createPlayer } from './player';
import * as _ from 'lodash';
import { numberOfCustomers, numberOfSpecialCustomers } from './customer';
import Context from './context';
import boards from './action-boards';

interface SetupData {

}

interface GameState {
  secret: null;

  players: {
    [key: string]: Player,
  };

  actionBoards: any [];

  nPlayers: number;
  round: number;
  lastRound: number;

  customers: number[];
  specialCustomers: number[];
}

const Foodstock = Game({
  name: 'Foodstock',
  setup: (ctx: Context, setupData: SetupData) => {
    const G: GameState = {
      players: {},
      nPlayers: ctx.numPlayers,
      // Secret key only known to server
      secret: null,

      customers: _.range(0, numberOfCustomers),
      specialCustomers: _.range(0, numberOfSpecialCustomers),
      round: 1,
      lastRound: ctx.numPlayers <= 3 ? 3 : 4,

      actionBoards: [
        _.cloneDeep([
          boards[0],
          boards[2],
          boards[4],
          boards[6],
          boards[8],
          boards[10],
        ]),
      ],
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i] = createPlayer(ctx, '' + i);
    }

    ctx.random.Shuffle(G.customers);
    ctx.random.Shuffle(G.specialCustomers);

    return G;
   },
  moves: {
    // When moving to the next board
    levelUp(G: GameState, ctx: Context, payload: any) {
      console.log("level up");
      const pl = G.players[ctx.currentPlayer];

      if (pl.level >= 6) {
        return INVALID_MOVE;
      }

      pl.level += 1;

      ctx.events.endTurn();
      return G;
    },

    // When placing a helper
    placeHelper(G: GameState, ctx: Context, payload: any) {
      return G;
    },
  },

  flow: {
    // End condition of the game
    endGameIf: (G: GameState, ctx: Context) => {
      if (G.round > G.lastRound) {
        const players = _.values(G.players);

        return {
          winner: _.maxBy(_.values(G.players), 'money').id,
        };
      }
    },

    onTurnEnd: (G: GameState, ctx: Context) => {
      console.log("onTurnEnd", ctx.currentPlayer);
      const shouldEndRound = false;
      if (shouldEndRound) {
        G.round += 1;

        if (G.round > G.lastRound) {
          return G;
        }

        // At the end of a round, reset board level
        _.forEach(G.players, Player.beginRound);
      }

      return G;
    },
  },

  // State viewable by specific player (hide cards)
  // playerView: (G, ctx, playerId) => ({}),
});


export default Foodstock;
