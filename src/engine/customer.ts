import { Ingredient, FoodType} from './enums';
import rawCustomers from './data/customers';
import _ from 'lodash';

export interface Customer {
  id: string;
  food?: string;
  foodType?: FoodType;
  name?: string;
  special: boolean;
  veggie?: boolean;
  blogger?: boolean;
  ingredients: Ingredient[][];

  // Money gained when fulfilling order
  money: number;
}

export const customerCards: Customer[] = _.cloneDeep(rawCustomers);

export function createCustomer(): Customer {
  return _.cloneDeep(rawCustomers[0]);
}


export const NormalCustomerDeck = [0, 0, 0, 0, 0, 1, 1];
export const SpecialCustomerDeck = [0, 1, 2];


