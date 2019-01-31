export type Ingredient = 'white' | 'beige' | 'red' | 'brown' | 'pink' | 'yellow' | 'green' | 'grey';

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
    GreyIngredient = 'grey',
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
