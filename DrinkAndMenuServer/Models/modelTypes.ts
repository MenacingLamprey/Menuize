export interface IIngredient {
    id : number
    name: string
    instructions : string
    family : string
    recipe? : IIngredient[]
    drinks ? : IDrink[]
    creater? : IUser
}

export interface IDrink {
    id : number
    name :string;
    description : string
    glass : string
    numOfIngredients : number
    ingredients? : IIngredient[]
}

export interface IUser {
    uid : string
    username: string;
    password : string;
    drinks? :IDrink[]
}

export type IMeasurement = "oz" | "ml" | "bsp" | "tsp" | "tbsp" | "dash" 

export interface IDrinkIngredient {
    id : number
    amount : number
    measurement : IMeasurement
    DrinkId? : number
    IngredientId? :number
} 