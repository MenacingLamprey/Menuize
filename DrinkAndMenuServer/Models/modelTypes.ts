export interface IIngredient {
  id? : number
  name: string
  instructions? : string
  yield? : string
  family : string
  drinks ? : IDrink[]
  userId ? : string
  DrinkIngredient? : IDrinkIngredient
  RecipeIngredient? : IRecipeIngredient
  childIngredients? : IIngredient[]
  brands? : IBrand[]
  isPublic : boolean
}

export interface IDrink {
  id : number
  name :string;
  description? : string
  method? : string
  glass? : string
  numOfIngredients : number
  drinkIngredients? : IDrinkIngredient[]
  Ingredients? : IIngredient[]
  userId ? : string
  isPublic : boolean
}

export interface IUser {
  uid : string
  username: string;
  password : string;
  drinks? :IDrink[]
  ingredients? : IIngredient[]
}

export type IDrinkMeasurement = "oz" | "ml" | "bsp" | "tsp" | "tbsp" | "dash" 

export interface IDrinkIngredient {
  id : number
  amount : number
  measurement : IDrinkMeasurement
  DrinkId? : number
  IngredientId? :number
} 

export interface IIngredientFamily {
  id : number
  name : string
  parentFamilyId? : number
}

export interface IBrand {
  id : number
  name : string
  price : number
}

export interface IRecipeIngredient {
  ingredient : string
  id : number
  amount : number
  measurement : string
  IngredientId : number
  childIngredientId? : number
  family? : string
}

export interface IMenu {
  userId? : string
  id : number
  title : string
  drinks?: IDrink[]
  speaciltyIngredients? : IIngredient[]
  current : boolean
}