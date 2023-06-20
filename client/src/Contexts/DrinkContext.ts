import { createContext } from "react";
import { IDrink } from "../apiTypes";

export const DrinkContext = 
  createContext<[IDrink[], (ingredients: IDrink[] ) => void]>
  ([[{name :"", numOfIngredients:0, glass:'', Ingredients:[]}], () => {}]); 

export const CurrentDrinkContext = 
  createContext<[IDrink, (drink: IDrink ) => void]>
  ([{name :"", numOfIngredients:0, glass:'', Ingredients:[]}, () => {}]);