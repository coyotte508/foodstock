import {Game, INVALID_MOVE} from 'boardgame.io/core';
import { Player, createPlayer } from './player';
import * as _ from 'lodash';
import { numberOfCustomers, numberOfSpecialCustomers } from './customer';

interface SetupData {

}

interface Context {
  numPlayers: number;
  random: {
    Shuffle: <T>(deck: T[]) => T[],
  };
  events: {
    endTurn: () => void,
    endPhase: () => void,
  };
  currentPlayer: string;
  /** Player that just moved */
  playerID: string;
  turn: number;
}

interface GameState {
  secret: null;

  players: {
    [key: string]: Player,
  };

  nPlayers: number;
  round: number;

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
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i] = createPlayer();
    }

    ctx.random.Shuffle(G.customers);
    ctx.random.Shuffle(G.specialCustomers);

    return G;
   },
  moves: {
    // When moving to the next board
    levelUp: (G: GameState, ctx: Context, payload: any) => {
      const pl = G.players[ctx.currentPlayer];

      if (pl.level >= 6) {
        return INVALID_MOVE;
      }

      pl.level += 1;
      ctx.events.endTurn();
      return G;
    },

    // When placing a helper
    placeHelper: (G: GameState, ctx: Context, payload: any) => {
      ctx.events.endTurn();
      return G;
    },
  },

  flow: {
    // End condition of the game
    endGameIf: (G: GameState, ctx: Context) => {
      return (G.nPlayers < 4 && G.round >= 4) || G.round >= 5;
    },
  },

  // State viewable by specific player (hide cards)
  // playerView: (G, ctx, playerId) => ({}),
});


export default Foodstock;
