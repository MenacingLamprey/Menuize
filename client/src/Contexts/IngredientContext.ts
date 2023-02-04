import { createContext } from "react";
import { IIngredient } from "../apiTypes";

export const IngredientContext = 
  createContext<[IIngredient[], (ingredients: IIngredient[] ) => void]>
  ([[{name :"", family :""}], () => {}]);
 