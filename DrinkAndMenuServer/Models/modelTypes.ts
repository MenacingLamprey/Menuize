export interface IIngredient {
  id? : number
  name: string
  family ? : string
  drinks ? : IDrink[]
  userId ? : string
  DrinkIngredient? : IDrinkIngredient
  recipe? : IRecipe
  childIngredients? : IIngredient[]
  brands? : IBrand[]
  isPublic? : boolean
  isUnique? : boolean
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
  preferred : boolean
  amount : string
  ingredient? : IIngredient
  homeMadeRecipe ? : IRecipe
}

export interface IRecipe {
  id? : number
  instructions : string
  yield : string
  childIngredients? : IRecipeIngredient[]
  ingredientId? : number
}

export interface IRecipeIngredient {
  id? : number
  amount : number
  measurement : string
  childIngredient? : IIngredient
  childIngredientName : string
  recipe? : IRecipe
  recipeId? : number
}


export interface IMenu {
  userId? : string
  id : number
  title : string
  drinks?: IDrink[]
  ingredients? : IIngredient[]
  current : boolean
  inProgress : boolean
}