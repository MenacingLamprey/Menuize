export interface IIngredient {
  id? : number
  name: string
  recipe? : IRecipe
  family? : string
  brands? : IBrand[]
  Drinks ? : IDrink[]
  userId ? : string
  updatedAt? : string
  createdAt? :string
  familyId? : number
  DrinkIngredient? : IDrinkIngredient
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

export interface IMenu {
  title : string
  drinks: IDrink[]
  ingredients : IIngredient[]
  current : boolean
  inProgess : boolean
}

export interface IIngredientFamily {
  id? : number
  name : string
  parentFamilyId? : number
}

export interface IRecipe {
  ingredientId : number
  childIngredients : IRecipeIngredient[]
  yield : string
  instructions : string
}

export interface IRecipeIngredient {
  id? : number
  amount : number
  measurement : string
  childIngredient? : number
  childIngredientName : string
}


export interface IBrand {
  id? : number
  name : string
  price : number
  amount : string
  preferred : boolean
  ingredient? : IIngredient
  homeMadeRecipe ? : IRecipe
}