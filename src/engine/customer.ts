import { Ingredient, FoodType, CustomerType} from './enums';

interface Customer {
  foodName: string;
  foodType: FoodType;
  name: string;
  customerType: CustomerType;
  veggie?: boolean;
  blogger?: boolean;
  ingredients: Array<{
    type: Ingredient,
  }>;

  // Money gained when fulfilling order
  moneyGained: number;

}

export const CustomerCards = [
  {
    foodName: 'Kebab',
    type: FoodType.Taco,
    customerName: 'Doner',
    customerType: CustomerType.Normal,
    ingredients: ['beige','brown','green','white'],
    moneyGained: 3,
  },
  {
      ingredients: [],
      moneyGained: 20,
  }
];


export const NormalCustomerDeck = [0,0,0,0,0,1,1];
export const SpecialCustomerDeck = [2,2,2,2,2,2];


