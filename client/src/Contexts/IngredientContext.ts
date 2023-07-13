import { createContext } from "react";
import { IIngredient } from "../apiTypes";

export const IngredientContext = 
  createContext<[IIngredient[], (ingredients: IIngredient[] ) => void]>
  ([[{name :"", family :"", id :-1}], () => {}]);
 
export const CurrentIngredientContext = 
  createContext<[IIngredient, (drink: IIngredient ) => void]>
  ([{name :"", family : '', id: -1}, () => {}]);