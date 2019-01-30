import { Ingredient } from './enums';

interface Customer {
  ingredients: Array<{
    type: Ingredient,
  }>;

  // Money gained when fulfilling order
  moneyGained: number;
  // Money lost when failing order
  moneyLost: number;
}

export function createCustomer(id: number) {
  // Todo: return customer based on id
  if (id < 5) {
    return {
      ingredients: [],
      moneyGained: 10,
      moneyLost: 10,
    };
  } else {
    return {
      ingredients: [],
      moneyGained: 20,
      moneyLost: 10,
    };
  }
}

export function createSpecialCustomer(id: number) {
  return {
    ingredients: [],
    moneyGained: 0,
    moneyLost: 0,
  };
}

export const numberOfCustomers = 58;
export const numberOfSpecialCustomers = 45;
