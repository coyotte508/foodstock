import { Action } from './action';

type Board = Action[];


const boards: Array<[Board, Board]> = [
  // Boards with 1 dice
  [
    [
      {ingredients: ['beige']},
      {ingredients: ['beige', 'beige']},
      {ingredients: ['beige', 'beige', 'beige']},

      {ingredients: ['brown', 'brown', 'brown']},
      {ingredients: ['brown', 'brown']},
      {ingredients: ['brown'], customers: ['black']},

      {ingredients: ['beige'], customers: ['red']},
      {ingredients: ['beige'], customers: ['black']},
      {ingredients: ['brown'], customers: ['any']},
      {},
      {ingredients: ['brown', 'beige'], maxHelpers: 4},
    ], [
      {ingredients: ['beige']},
      {ingredients: ['brown', 'brown']},
      {ingredients: ['beige', 'beige']},

      {ingredients: ['brown', 'brown']},
      {ingredients: ['beige', 'beige']},
      {ingredients: ['brown', 'beige']},

      {customers: ['black', 'red']},
      {customers: ['black']},
      {customers: ['black', 'black']},

      {},
      {maxHelpers: 4, ingredients: ['beige', 'beige', 'beige']},
    ],
  ],
  // Boards with 2 dice
  [[], []],
  // Boards with 3 dice
  [[], []],
  // Boards with 4 dice
  [[], []],
  // Boards with 5 dice
  [[], []],
  // Boards with 6 dice
  [[], []],
];

// CLean up actions
for (const boardGroup of boards) {
  for (const board of boardGroup) {
    for (const action of board) {
      action.helpers = [];
      action.maxHelpers = action.maxHelpers || 1;
      action.customers = action.customers || [];
      action.ingredients = action.ingredients || [];
    }
  }
}

export default boards;
