import { Customer } from '../customer';
import { FoodType } from '../enums';

// ingredients are bottom to top
export default [
  {
    id: '0',
    food: "Double Burger",
    foodType: FoodType.Burger,
    name: "Carl",
    ingredients: [
      ["beige", "brown", "brown",  "beige"]
    ],
    money: 2
  },
  {
    id: '1',
    food: "Hot Dog",
    foodType: FoodType.HotDog,
    name: "Lenny",
    blogger: true,
    ingredients: [
      ["beige", "brown", "yellow", "red"]
    ],
    money: 2
  },
  {
    id: '2',
    food: "Chicke Taco",
    foodType: FoodType.Taco,
    name: "Pablo",
    ingredients: [
      ["beige", "white", "green"]
    ],
    money: 3
  }

] as Customer[];
