import { Ingredient, SpecialAction } from './enums';

export interface Action {
  /** List of ingredients that can be gained by the action */
  ingredients?: Ingredient[];
  /** Maximum number of helpers that can do the action */
  maxHelpers?: number;
  /** helpers that already did the action */
  helpers?: string[];
  /** Customer */
  customers?: Array<'red' | 'black' | 'any'>;
  /** cost for action */
  cost?: number;
  /** keep helper at the end of the round */
  keepHelpers?: boolean;
  /** special action */
  specialActions?: SpecialAction[];

}
