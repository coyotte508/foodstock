import {Game} from 'boardgame.io/core';
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
}

interface GameState {
  secret: null;

  players: {
    [key: number]: Player,
  };

  customers: number[];
  specialCustomers: number[];
}

const Foodstock = Game({
  name: 'Foodstock',
  setup: (ctx: Context, setupData: SetupData) => {
    const G: GameState = {
      players: {},
      // Secret key only known to server
      secret: null,

      customers: _.range(0, numberOfCustomers),
      specialCustomers: _.range(0, numberOfSpecialCustomers),
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i] = createPlayer();
    }

    ctx.random.Shuffle(G.customers);
    ctx.random.Shuffle(G.specialCustomers);

    return G;
   },
  moves: {
    // Todo: action that changes the state of the game, and returns NEW state
    action1: (G) => G,
    // State viewable by specific player (hide cards)
    // playerView: (G, ctx, playerId) => ({}),
  },

});


export default Foodstock;
