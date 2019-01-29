import {Game} from 'boardgame.io/core';
import Player from './player';

interface SetupData {
  nbPlayers: number;
}

interface GameState {
  secret: null;

  players: {
    [key: number]: Player,
  };
}

const Foodstock = Game({
  name: 'Foodstock',
  setup: (ctx, setupData: SetupData) => ({
    // Secret key only known to server
    secret: null,

    players: () => {
      const players = {};

      for (let i = 0; i < setupData.nbPlayers; i++) {
        players[i] = new Player();
      }
      return players;
    },
  }),
  moves: {
    // Todo: action that changes the state of the game, and returns NEW state
    action1: (G) => G,
    // State viewable by specific player (hide cards)
    // playerView: (G, ctx, playerId) => ({}),
  },

});


export default Foodstock;
