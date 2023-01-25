export interface IIngredient {
    id : number
    name: string
    instructions? : string
    family : string
    recipe? : IIngredient[]
    drinks ? : IDrink[]
    userId ? : string
}

export interface IDrink {
    id : number
    name :string;
    description : string
    glass : string
    numOfIngredients : number
    ingredients? : IIngredient[]
    userId ? : string
}

export interface IUser {
    uid : string
    username: string;
    password : string;
    drinks? :IDrink[]
    ingredients? : IIngredient[]
}

export type IMeasurement = "oz" | "ml" | "bsp" | "tsp" | "tbsp" | "dash" 

export interface IDrinkIngredient {
    id : number
    amount : number
    measurement : IMeasurement
    DrinkId? : number
    IngredientId? :number
} 