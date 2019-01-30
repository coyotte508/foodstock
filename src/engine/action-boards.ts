import { Action } from './action';

interface Board {
  id: number;
  gainCustomer?: Array<'red' | 'black' | 'any' | 'none'>;
  actions: Action[];
}


const boards: Board[] = [
  // Board 1-1
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
  // Board 1-2
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
  // Board 2-1
  { id: 2, actions: []},
  // Board 2-2
  { id: 3, actions: []},
  // Board 3-1
  { id: 4, actions: []},
  // Board 3-3
  { id: 5, actions: []},
  // Board 4-1
  { id: 6, actions: []},
  // Board 4-2
  { id: 7, actions: []},
  // Board 5-1
  { id: 8, actions: []},
  // Board 5-2
  { id: 9, actions: []},
  // Board 6-1
  { id: 10, actions: []},
  // Board 6-2
  { id: 11, actions: []},
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
