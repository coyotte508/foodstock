import Reward from './reward';

export interface Action {
  /** List of ingredients that can be gained by the action */
  rewards?: Reward[];
  /** Maximum number of helpers that can do the action */
  unlimited?: boolean;
  /** helpers that already did the action */
  helpers?: string[];
  /** cost for action */
  cost?: Reward[];
  /** keep helper at the end of the round */
  keep?: boolean;
  /** Number of times the action can be executed */
  repeat?: number;
}

export type SimpleAction = string | {
  /** List of ingredients that can be gained by the action */
  rewards?: string;
  /** Maximum number of helpers that can do the action */
  unlimited?: boolean;
  /** helpers that already did the action */
  helpers?: string[];
  /** cost for action */
  cost?: string;
  /** keep helper at the end of the round */
  keep?: boolean;
  /** Number of times the action can be executed */
  repeat?: number;
};

export namespace Action {
  export function parse(elem: SimpleAction) {
    if (typeof elem === "string") {
      return {rewards: Reward.parse(elem)} as Action;
    } else {
      return {
        ...elem,
        cost: elem.cost ? Reward.parse(elem.cost) : [],
        rewards: elem.rewards ? Reward.parse(elem.rewards) : []
      } as Action;
    }
  }
}
