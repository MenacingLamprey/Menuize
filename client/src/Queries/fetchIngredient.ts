import { QueryFunction } from "react-query";
import {fetchUserDrink} from "../apiServices/drinkServices"
import { IDrink, IIngredient } from '../apiTypes'
import { fetchUserIngredient } from "../apiServices/ingredientServices";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001

interface IngredientAPIResponse {
  res : IIngredient 
}

export const fetchIngredient: QueryFunction<IngredientAPIResponse, ["ingredient", string]> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const name = queryKey[1];
  const apiRes = await fetchUserIngredient(name, accessToken);
  console.log(apiRes)
  if (!apiRes.ok) {
    throw new Error(`ingredient/${name} fetch not ok`);
  }
  return apiRes.json();
};
