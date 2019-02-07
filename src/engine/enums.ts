export type Ingredient = 'white' | 'beige' | 'red' | 'brown' | 'pink' | 'yellow' | 'green' | 'gray';
export const ingredientTypes = ['beige', 'brown' , 'white', 'red' , 'pink' , 'yellow' , 'green', 'gray'];

export type SpecialAction = 'cookAssistant' | 'improvementCard';

export enum FoodType {
    Burger = 'burger',
    Taco = 'taco',
    Fries = 'fries',
    Pizza = 'pizza',
    HotDog = 'hotdog'
}

export enum CustomerType {
    Normal = 'normal',
    Special = 'special',
    Any = 'any'
}

export enum Resource {
    None = "~",
    WhiteIngredient = 'white',
    BeigeIngredient = 'beige',
    RedIngredient = 'red',
    BrownIngredient = 'brown',
    PinkIngredient = 'pink',
    YellowIngredient = 'yellow',
    GreenIngredient = 'green',
    GrayIngredient = 'gray',
    NormalCustomer = 'normal',
    SpecialCustomer = 'special',
    AnyCustomer = 'any',
    ImprovementCard = "improv",
    Cook = "cook",
    Recycle = "recycle",
    Fridge = "fridge",
    ObjectiveCard = "objective",
    Money = "dollar",
    SatisfyNormal = "satisfyN",
    SatisfySpecial = "satisfyS",
    RemoveCustomer= "remove"
}

export enum Level {
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
}

export enum CookingPlate {
    Plate1,
    Plate2,
    Plate3
}

export enum CardPosition {
    TopDeck = -1,
    First,
    Second,
    Third,
    Fourth,
    Fifth
}

export enum WaitingCustomerPosition {
    First,
    Second,
    Third,
    Fourth,
    Last = Fourth
}
