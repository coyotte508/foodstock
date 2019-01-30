import { Action } from './action';

export interface ActionBoard {
  id: string;
  gainCustomer?: Array<'red' | 'black' | 'any' | 'none'>;
  actions: Action[][];
}


const boards: ActionBoard[] = [
  // Board 1-1
  { id: "1-1",
    gainCustomer : ['red'],
    actions: [
      [
        {ingredients: ['beige']},
        {ingredients: ['beige', 'beige']},
        {ingredients: ['beige', 'beige', 'beige']}
      ],

      [
        {ingredients: ['brown', 'brown', 'brown']},
        {ingredients: ['brown', 'brown']},
        {ingredients: ['brown'], customers: ['black']},
      ],

      [
        {ingredients: ['beige'], customers: ['red']},
        {ingredients: ['beige'], customers: ['black']},
        {ingredients: ['brown'], customers: ['any']},
      ],

      [{cost: 1, customers: ['black']}],

      [{ingredients: ['brown', 'beige'], unlimitedHelpers: true, cost: 2}]
    ],
  },
  // Board 1-2
  { id: "1-2",
    gainCustomer : ['red'],
    actions: [
      [
        {ingredients: ['beige']},
        {ingredients: ['brown', 'brown']},
        {ingredients: ['beige', 'beige']},
      ],

      [
        {ingredients: ['brown', 'brown']},
        {ingredients: ['beige', 'beige']},
        {ingredients: ['brown', 'beige']},
      ],
    
      [
        {customers: ['black', 'red']},
        {customers: ['black']},
        {customers: ['black', 'black']},
      ],
    
      [{cost: 2, keepHelpers: true, specialActions: ['improvementCard'] }],
      [{cost: 2, unlimitedHelpers: true, ingredients: ['beige', 'beige', 'beige']}]
  ]},
  // Board 2-1
  { id: "2-1", actions: []},
  // Board 2-2
  { id: "2-2", actions: []},
  // Board 3-1
  { id: "3-1", actions: []},
  // Board 3-3
  { id: "3-2", actions: []},
  // Board 4-1
  { id: "4-1", actions: []},
  // Board 4-2
  { id: "4-2", actions: []},
  // Board 5-1
  { id: "5-1", actions: []},
  // Board 5-2
  { id: "5-2", actions: []},
  // Board 6-1
  { id: "6-1", actions: []},
  // Board 6-2
  { id: "6-2", actions: []},
];

// CLean up actions
for (const board of boards) {
  for (const actionChain of board.actions) {
    for (const action of actionChain) {
      action.helpers = [];
      action.unlimitedHelpers = action.unlimitedHelpers || false;
      action.customers = action.customers || [];
      action.ingredients = action.ingredients || [];
      action.cost = action.cost || 0;
      action.keepHelpers = action.keepHelpers || false;
      action.specialActions = action.specialActions || [];
    }
  }
}

export default boards;
