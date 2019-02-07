import {Game, INVALID_MOVE} from 'boardgame.io/core';
import { Player, createPlayer } from './player';
import * as _ from 'lodash';
import { SpecialCustomerDeck, createBasicCustomerDeck } from './customer';
import Context from './context';
import boards, { ActionBoard } from './action-boards';
import { possibleHelperPlacements, HelperPlacement, drawSpecialCustomers, newCustomer } from './commands';
import { Level, Ingredient, CookingPlate, CardPosition, Resource, CustomerType } from './enums';
import Reward from './reward';

interface SetupData {

}

export interface GameState {
  secret: null;

  players: {
    [key: string]: Player,
  };

  ingredients: {
    [key in Ingredient]: number
  };

  /** Resources to gain */
  pendingResources: Reward[];
  actionBoards: ActionBoard [];

  nPlayers: number;
  round: number;
  lastRound: number;

  customers: number[];
  specialCustomers: number[];
  availableCustomers: number[];
  availableSpecialCustomers: number[];
  discardedCustomers: number[];
  discardedSpecialCustomers: number[];
  visibleCustomers: number;
  visibleSpecialCustomers: number;

}

const Foodstock = Game({
  name: 'Foodstock',
  setup: (ctx: Context, setupData: SetupData) => {
    const G: GameState = {
      players: {},
      nPlayers: ctx.numPlayers,
      // Secret key only known to server
      secret: null,

      customers: [...createBasicCustomerDeck()],
      specialCustomers: [...SpecialCustomerDeck],
      availableCustomers: [],
      availableSpecialCustomers: [],
      discardedCustomers: [],
      discardedSpecialCustomers: [],
      visibleCustomers: 1,
      visibleSpecialCustomers: 4,


      round: 1,
      lastRound: ctx.numPlayers <= 3 ? 3 : 4,

      pendingResources: [],

      actionBoards:
        _.cloneDeep([
          boards["1-1"],
          boards["2-1"],
          boards["3-1"],
          boards["4-1"],
          boards["5-1"],
          boards["6-1"],
        ]),

      ingredients: {
        beige: 40,
        brown: 30,
        green: 20,
        red: 20,
        white: 20,
        pink: 20,
        yellow: 20,
        grey: 0
      }
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i] = createPlayer(ctx, '' + i);
    }

    G.customers = ctx.random.Shuffle(G.customers);
    G.specialCustomers = ctx.random.Shuffle(G.specialCustomers);
    drawSpecialCustomers(G, G.visibleSpecialCustomers);


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
      const rewards = G.actionBoards[pl.level].rewards;
      if (rewards) {
        if (rewards[0].type === Resource.NormalCustomer ) {
          ctx.events.endPhase({next: "gainNormalCustomer"});
        }
      }

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
      G.pendingResources.push(...action.rewards);
      ctx.events.endPhase({next: "gainResources"});
      return G;
    },

    gainIngredient(G: GameState, ctx: Context, payload: {color: Ingredient, plate: CookingPlate}) {
      console.log("gain ingredient", payload);
      let useGray = false;

      if (!Reward.includes(G.pendingResources, [new Reward(1, payload.color as Resource)])) {
        useGray = true;
      }

      if (useGray && !Reward.includes(G.pendingResources, [new Reward(1, Resource.GreyIngredient)])) {
        return INVALID_MOVE;
      }

      G.pendingResources = Reward.merge(G.pendingResources, [new Reward(-1, useGray ? Resource.GreyIngredient : payload.color as Resource)]);
      const pl = G.players[ctx.currentPlayer];
      const plate = pl.plates.find(pla => pla.id === payload.plate);
      plate.ingredients.push(payload.color);
      return G;
    },

    gainBasicCustomer(G: GameState, ctx: Context, payload: {which: CardPosition}) {
      const pl = G.players[ctx.currentPlayer];
      const card =  payload.which === CardPosition.TopDeck ? G.customers[payload.which] : G.availableCustomers[0] ;
      newCustomer(G, ctx, card);
      ctx.events.endPhase();
      return G;
    },

    gainSpecialCustomer(G: GameState, ctx: Context, payload: {which: CardPosition}) {
      const pl = G.players[ctx.currentPlayer];
      const card =  G.availableSpecialCustomers[payload.which] ;
      newCustomer(G, ctx, card);
      ctx.events.endPhase();
      return G;
    }
  },

  flow: {
    startingPhase: "main",

    phases: {
      main: {
        allowedMoves: ["levelUp", "placeHelper"],
        onPhaseBegin(G, ctx) {
          console.log("begin main phase");
          return G;
        },
        onPhaseEnd(G, ctx) {
          console.log("end main phase");
          return G;
        }
      },
      gainResources: {
        allowedMoves: ["gainIngredient", "gainCustomer"],
        onPhaseBegin(G, ctx) {
          console.log("begin resource phase");
          return G;
        },
        onPhaseEnd(G, ctx) {
          console.log("end resource phase");
          return G;
        },
        endPhaseIf(G: GameState, ctx: Context) {
          console.log("gainResources.endPhaseIf");
          if (G.pendingResources.length === 0) {
            ctx.events.endTurn();
            return true;
          }
        },
        next: 'main'
      },
      gainBasicCustomer: {
        allowedMoves: ["gainBasicCustomer"],
        onPhaseBegin(G, ctx) {
          console.log("begin get basic Customer card phase");
          return G;
        },
        onPhaseEnd(G, ctx) {
          console.log("end get basic Customer card phase");
          return G;
        },
      },
      gainSpecialCustomer: {
        allowedMoves: ["gainSpecialCustomer"],
        onPhaseBegin(G, ctx) {
          console.log("begin get basic Customer card phase");
          return G;
        },
        onPhaseEnd(G, ctx) {
          console.log("end get basic Customer card phase");
          return G;
        },
      },
    },

    // End condition of the game
    endGameIf(G: GameState, ctx: Context) {
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
