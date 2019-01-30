import { Action } from './action';

interface Board {
  id: number;
  gainCustomer?: Array<'red' | 'black' | 'any' | 'none'>;
  actions?: Action[];
}


const boards: Board[] = [
    { id: 0,
      gainCustomer : ['red'],
      actions: [
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
      ],
    },
    { id: 1,
      gainCustomer : ['red'],
      actions: [
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
    ]},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
];

// CLean up actions
for (const board of boards) {
  for (const action of board) {
      action.helpers = [];
      action.maxHelpers = action.maxHelpers || 1;
      action.customers = action.customers || [];
      action.ingredients = action.ingredients || [];
    }
  }
}

export default boards;
