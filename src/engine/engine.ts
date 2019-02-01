import {Game, INVALID_MOVE} from 'boardgame.io/core';
import { Player, createPlayer } from './player';
import * as _ from 'lodash';
import { NormalCustomerDeck, SpecialCustomerDeck } from './customer';
import Context from './context';
import boards, { ActionBoard } from './action-boards';
import { possibleHelperPlacements, HelperPlacement } from './commands';
import { Level } from './enums';

interface SetupData {

}

export interface GameState {
  secret: null;

  players: {
    [key: string]: Player,
  };

  actionBoards: ActionBoard [];

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

      customers: [...NormalCustomerDeck],
      specialCustomers: [...SpecialCustomerDeck],
      round: 1,
      lastRound: ctx.numPlayers <= 3 ? 3 : 4,

      actionBoards:
        _.cloneDeep([
          boards["1-1"],
          boards["2-1"],
          boards["3-1"],
          boards["4-1"],
          boards["5-1"],
          boards["6-1"],
        ]),
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

      if (pl.level >= Level.Level6) {
        return INVALID_MOVE;
      }

      pl.level += 1;

      ctx.events.endTurn();
      return G;
    },

    // When placing a helper
    placeHelper(G: GameState, ctx: Context, payload: HelperPlacement) {
      const pl = G.players[ctx.currentPlayer];
      const placements = possibleHelperPlacements(G, pl);

      if (!placements.find(el => el.join(",") === payload.join(","))) {
        console.log("Impossible to place helper at", payload, placements);
        return INVALID_MOVE;
      }

      pl.helpers --;
      const action = G.actionBoards[payload[0]].actions[payload[1]][payload[2]];

      action.helpers.push(pl.id);

      ctx.events.endTurn();
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
