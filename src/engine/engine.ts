import {Game, TurnOrder, INVALID_MOVE} from 'boardgame.io/core';
import { Player, createPlayer } from './player';
import * as _ from 'lodash';
import { SpecialCustomerDeck, createBasicCustomerDeck } from './customer';
import Context from './context';
import boards, { ActionBoard } from './action-boards';
import { possibleHelperPlacements, HelperPlacement, addCustomer, isPendingResource, usePendingResource } from './commands';
import { Level, Ingredient, CookingPlate, CardPosition, Resource, CustomerType, ingredientTypes } from './enums';
import Reward from './reward';
import { DeckZone } from './deckzone';

interface SetupData {
  seed: 1;

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
  startingRoundOrder: string[];
  roundOrder: string[];
  passOrder: string[];
  round: number;
  lastRound: number;
  customers: {
    basic: DeckZone<number>;
    special: DeckZone<number>;
  };
}

const Foodstock = Game({
  name: 'Foodstock',
  seed : 1,
  setup: (ctx: Context, setupData: SetupData) => {
    const G: GameState = {
      players: {},
      nPlayers: ctx.numPlayers,
      // Secret key only known to server
      secret: null,
      customers: {
        basic: {deck: createBasicCustomerDeck(), discard: [], available: [], visible: 1},
        special: {deck: [...SpecialCustomerDeck], discard: [], available: [], visible: ctx.numPlayers + 1},
      },
      startingRoundOrder: [],
      roundOrder: [],
      passOrder: [],
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
        gray: 0
      }
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i] = createPlayer(ctx, '' + i);
      G.startingRoundOrder.push('' + i);
    }

    G.roundOrder = G.startingRoundOrder;
    G.customers.basic.deck = ctx.random.Shuffle(G.customers.basic.deck);
    G.customers.special.deck = ctx.random.Shuffle(G.customers.special.deck);

    DeckZone.show(G.customers.basic);
    DeckZone.show(G.customers.special);

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
          G.pendingResources.push(...rewards);
          ctx.events.endPhase({next: "gainResources"});
      }

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

    // PLayer can serve customers but wants to pass
    pass(G: GameState, ctx: Context) {
      ctx.events.endTurn();
      return G;
    },

    gainIngredient(G: GameState, ctx: Context, payload: {color: Ingredient, plate: CookingPlate}) {
      console.log("gain ingredient", payload);

      const color = payload.color;

      if (!ingredientTypes.includes(color)) {
        console.log("wrong color", color);
        return INVALID_MOVE;
      }

      let useGray = false;

      if (!isPendingResource(G, color as Resource)) {
        useGray = true;
      }

      if (useGray && !isPendingResource(G, Resource.GrayIngredient)) {
        return INVALID_MOVE;
      }

      console.log("merging resources", JSON.stringify(G.pendingResources), [new Reward(-1, useGray ? Resource.GrayIngredient : color as Resource)]);
      usePendingResource(G, useGray ? Resource.GrayIngredient : color as Resource);

      const pl = G.players[ctx.currentPlayer];
      const plate = pl.plates.find(pla => pla.id === payload.plate);
      plate.ingredients.push(payload.color);

      return G;
    },

    gainCustomer(G: GameState, ctx: Context, payload: {which: CardPosition, special: boolean}) {
      console.log("gain customer", payload);
      const {which, special} = payload;

      let usedResource = special ? Resource.SpecialCustomer : Resource.NormalCustomer;

      if (!isPendingResource(G, usedResource)) {
        usedResource = Resource.AnyCustomer;
      }

      if (!isPendingResource(G, usedResource)) {
        return INVALID_MOVE;
      }

      const deck = special ? G.customers.special : G.customers.basic;

      let card: number = null;

      if (payload.which === CardPosition.TopDeck) {
        [card] = DeckZone.draw(deck, 1);
      } else {
        card = DeckZone.pick(deck, which);

        if (deck.available.length === 0) {
          DeckZone.show(deck);
        }
      }

      addCustomer(G, ctx, card, special);

      usePendingResource(G, usedResource);

      ctx.events.endTurn();

      return G;
    },
    serveCustomer(G: GameState, ctx: Context, payload: {customerPos: number}) {
      const {customerPos} = payload;
      // check that there is a plate to serve the customer
      const pl = G.players[ctx.currentPlayer];
      const customer = pl.customers.waiting[customerPos];
      const plate = pl.plates.find(pla => pla.ingredients === customer.ingredients[0]);

      if (!plate) {
        return INVALID_MOVE;
      }

      plate.ingredients = [];
      pl.money += customer.money ;
      pl.money += customerPos === 0 && customer.blogger ? 2 : 0;
      pl.money += customerPos === 0  ? 2 : 0;
      pl.money -= customerPos === 3 && customer.blogger ? 2 : 0;

      pl.customers.served.push( pl.customers.waiting[customerPos] );
      pl.customers.waiting[customerPos] = null;
      return G;
    },

    cookHelper(G: GameState, ctx: Context, payload: {fromPlate: CookingPlate, fromPos: number, toPlate: CookingPlate, toPos: number}) {
      const {fromPlate, fromPos, toPlate, toPos} = payload;
      const pl = G.players[ctx.currentPlayer];

      if (!isPendingResource(G, Resource.Cook)) {
        return INVALID_MOVE;
      }

      const ingredient = pl.plates[fromPlate].ingredients[fromPos];
      pl.plates[fromPlate].ingredients.splice(fromPos, 1);
      pl.plates[toPlate].ingredients.splice(toPos, 1, ingredient);

      usePendingResource(G, Resource.Cook);
      return G;
    },
  },
  flow: {
    startingPhase: "main",

    phases: {
      turnOrder: TurnOrder.CUSTOM_FROM('roundOrder'),
      main: {
        allowedMoves: ["levelUp", "placeHelper", "serveCustomer", "pass"],
        onPhaseBegin(G: GameState, ctx: Context) {
          console.log("begin main phase: player:", ctx.currentPlayer);
          return G;
        },
        onPhaseEnd(G: GameState, ctx: Context) {
          console.log("end main phase");
          // const shouldEndRound = false;
          // if (shouldEndRound) {
          //   G.round += 1;

          //   if (G.round > G.lastRound) {
          //     return G;
          //   }

          //   // At the end of a round, reset board level
          //   _.forEach(G.players, Player.beginRound);
          // }
          // removes the player from the playOrder if he finished the helpers
          if ( G.players[ctx.currentPlayer].helpers <= 0 ) {
            G.roundOrder.splice(ctx.playOrderPos, 1);
          }
          return G;
        },
        onTurnBegin: (G: GameState, ctx: Context) => {
          console.log("onTurnBegin MainPhase", ctx.currentPlayer, ctx.playOrder);
          return G;
        },
        onTurnEnd: (G: GameState, ctx: Context) => {
          console.log("onTurnEnd MainPhase", ctx.currentPlayer, ctx.playOrder);
          return G;
        },
      },
      gainResources: {
        allowedMoves: ["gainIngredient", "gainCustomer", "cookHelper"],
        onPhaseBegin(G: GameState, ctx: Context) {
          console.log("begin gainResources phase", ctx.currentPlayer );
          return G;
        },
        onPhaseEnd(G: GameState, ctx: Context) {
          console.log("end gainResources phase", ctx.currentPlayer );

          // Replace special customer cards if some were taken
          if (G.customers.special.available.length < G.customers.special.visible) {
            DeckZone.clear(G.customers.special);
            DeckZone.show(G.customers.special);
          }
          return G;
        },
        endPhaseIf(G: GameState, ctx: Context) {

          console.log(G.pendingResources);
          if (G.pendingResources.length === 0) {
            console.log("gainResources.endPhaseIf");
            return true;
          }
        },
        next: 'main'
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
  },

  // State viewable by specific player (hide cards)
  playerView: (G: GameState, ctx, playerId) => {
    const secret = _.cloneDeep(G);

    // secret.customers.basic.deck = secret.customers.basic.deck.map(x => 0);
    // secret.customers.special.deck = secret.customers.special.deck.map(x => 0);

    return secret;
  },
});


export default Foodstock;
