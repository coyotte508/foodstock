import { Action } from './action';
import { CustomerType } from './enums';

export interface ActionBoard {
  id: string;
  gainCustomer?: CustomerType[];
  actions: Action[][];
}


const boards: ActionBoard[] = [
  // Board 1-1
  { id: "1-1",
    gainCustomer : [CustomerType.Normal],
    actions: [
      [
        {ingredients: ['beige']},
        {ingredients: ['beige', 'beige']},
        {ingredients: ['beige', 'beige', 'beige']}
      ],

      [
        {ingredients: ['brown', 'brown', 'brown']},
        {ingredients: ['brown', 'brown']},
        {ingredients: ['brown'], customers: [CustomerType.Special]},
      ],

      [
        {ingredients: ['beige'], customers: [CustomerType.Normal]},
        {ingredients: ['beige'], customers: [CustomerType.Special]},
        {ingredients: ['brown'], customers: [CustomerType.Any]},
      ],

      [{cost: 1, customers: [CustomerType.Special]}],

      [{ingredients: ['brown', 'beige'], unlimitedHelpers: true, cost: 2}]
    ],
  },
  // Board 1-2
  { id: "1-2",
    gainCustomer : [CustomerType.Normal],
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
        {customers: [CustomerType.Special, CustomerType.Normal]},
        {customers: [CustomerType.Special]},
        {customers: [CustomerType.Special, CustomerType.Special]},
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
