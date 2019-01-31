import { Action, SimpleAction } from './action';
import Reward from './reward';
import _ from 'lodash';

export interface ActionBoard {
  id: string;
  actions: Action[][];
  rewards?: Reward[];
}

const arr = (...chains: Array<SimpleAction | SimpleAction[]>) => {
  return chains.map(chain => {
    if (! Array.isArray(chain)) {
      return [Action.parse(chain)];
    }
    return chain.map(elem => Action.parse(elem));
  });
};

const boards: ActionBoard[] = [
  // Board 1-1
  { id: "1-1",
    actions: arr(
      ["beige", "2brown", "2beige"],
      ["2brown", "2beige", "2brown"],
      ["special,normal", "special", "2special"],
      {cost: "2dollar", rewards: "improv", keep: true},
      {cost: "3dollar", unlimited: true, rewards: "gray"}
    ),
  },
  // Board 1-2
  { id: "1-2", actions: []},
  // Board 2-1
  {
    id: "2-1",
    actions: arr(
      {cost: "1dollar", rewards: "cook", unlimited: true},
      {keep: true, rewards: "satisfyS"},
      ["green", "2yellow", "yellow,green,normal"],
      ["yellow", "2green", "yellow,green,normal"],
      {keep: true, rewards: "recycle,objective"},
      "gray,normal"
    ),
    rewards: Reward.parse("normal")
  },
  // Board 2-2
  { id: "2-2", actions: []},
  // Board 3-1
  {
    id: "3-1",
    actions: arr(
      ['2brown', {keep: true, rewards: '3grey,special'}, '2beige,brown'],
      ["2beige", "2brown", "2gray"],
      ["grey", "2grey,normal", "2grey"],
      ["normal,any", {repeat: -1, cost: "gray", rewards: "gray,normal"}],
      ["cook"]
    )
  },
  // Board 3-3
  { id: "3-2", actions: []},
  // Board 4-1
  {
    id: "4-1",
    actions: arr(
      ["white,yellow", "green,white", "2gray,normal"],
      ["pink,white", "red,yellow", "2gray,normal"],
      ["red,pink", "red,white", "2gray,normal"],
      ["yellow,green", "yellow,pink", "2gray,normal"],
      ["green,red", "green,pink", "2gray,normal"],
    )
  },
  // Board 4-2
  { id: "4-2", actions: []},
  // Board 5-1
  {
    id: "5-1",
    actions: arr(
      {keep: true, cost: "beige", rewards: "gray", repeat: -1},
      {keep: true, rewards: "2satisfyN"},
      {keep: true, rewards: "1000cook,special"},
      {unlimited: true, cost: "6dollar", rewards: "improv,recycle"},
      {keep: true, cost: "dollar", rewards: "gray", repeat: 3},
      {keep: true, cost: "dollar", rewards: "gray", repeat: 5},
      {keep: true, cost: "dollar", rewards: "2gray", repeat: 2}
    )
  },
  // Board 5-2
  { id: "5-2", actions: [] },
  // Board 6-1
  {
    id: "6-1",
    actions: arr(
      {unlimited: true, cost: "dollar", rewards: "remove"},
      {unlimited: true, rewards: "fridge"},
      {unlimited: true, cost: "gray", rewards: "special"},
    )
  },
  // Board 6-2
  { id: "6-2", actions: [] },
];

// CLean up actions
for (const board of boards) {
  board.rewards = board.rewards || [];
  for (const actionChain of board.actions) {
    for (const action of actionChain) {
      action.helpers = [];
      action.unlimited = action.unlimited || false;
      action.rewards = action.rewards || [];
      action.cost = action.cost || [];
      action.keep = action.keep || false;
    }
  }
}

export default _.keyBy(boards, "id");
