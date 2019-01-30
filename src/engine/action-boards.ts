import { Action } from './action';

interface Board {
  id: number;
  gainCustomer?: Array<'red' | 'black' | 'any' | 'none'>;
  actions: Action[];
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
      {cost: 1, customers: ['black']},
      {ingredients: ['brown', 'beige'], maxHelpers: 4, cost: 2},
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

      {cost: 2, keepHelpers: true, specialActions: ['improvementCard'] },
      {cost: 2, maxHelpers: 4, ingredients: ['beige', 'beige', 'beige']},
    ]},
    { id: 2, actions: []},
    { id: 3, actions: []},
    { id: 4, actions: []},
    { id: 5, actions: []},
];

// CLean up actions
for (const board of boards) {
  for (const action of board.actions) {
      action.helpers = [];
      action.maxHelpers = action.maxHelpers || 1;
      action.customers = action.customers || [];
      action.ingredients = action.ingredients || [];
      action.cost = action.cost || 0;
      action.keepHelpers = action.keepHelpers || false;
      action.specialActions = action.specialActions || [];
  }
}

export default boards;
