import { Customer } from '../customer';
import { FoodType } from '../enums';

// ingredients are bottom to top
export default [
  {
    id: '0',
    food: "Veggie Burger",
    foodType: FoodType.Burger,
    name: "Vincent Vegan",
    special: true,
    veggie: true,
    ingredients: [
      ["beige", "brown", "red", "green", "beige"]
    ],
    money: 7
  },
  {
    id: '1',
    food: "The Challenge!",
    foodType: FoodType.Burger,
    name: "Alan Richman",
    special: true,
    blogger: true,
    ingredients: [
      ["beige", "brown", "yellow", "beige"], ["beige", "brown", "yellow", "beige"], ["beige", "brown", "yellow", "beige"]
    ],
    money: 15
  },
  {
    id: '2',
    food: "BBQ Pizza",
    foodType: FoodType.Pizza,
    name: "Paolo",
    special: true,
    ingredients: [
      ["beige", "red", "white", "brown"]
    ],
    money: 6
  }

] as Customer[];
