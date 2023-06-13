export interface IIngredient {
  id? : number
  name: string
  instructions? : string | null
  family : string
  DrinkIngredient? :IDrinkIngredient
  recipe? : IIngredient[]
  Drinks ? : IDrink[]
  userId ? : string
  updatedAt? : string
  createdAt? :string
}

export interface IMemoryUser {
  username : string
  drinks : IDrink[]
  ingredients : IIngredient[]
}

export interface IDrink {
  id? : number
  name :string;
  description? : string
  method? :string
  glass : string
  measures? : IDrinkIngredient[]
  numOfIngredients : number
  Ingredients : IIngredient[]
  userId ? : string
  price? :number
}



export interface IUser {
  uid? : string
  username: string;
  password : string;
  drinks? :IDrink[]
  ingredients? : IIngredient[]
}

export type IMeasurement = "oz" | "ml" | "bsp" | "tsp" | "tbsp" | "dash" 

export interface IDrinkIngredient {
  id? : number
  amount : number
  measurement : string
  DrinkId? : number
  IngredientId? :number
} 
export interface IAuth {
    authenticated : boolean;
    login : Function;
    logout :Function;
    isAuthenticated : Function;
  }