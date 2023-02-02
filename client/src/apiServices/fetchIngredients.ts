import { QueryFunction } from "@tanstack/react-query";
import { IIngredient, IMemoryUser} from '../apiTypes'
import { fetchAllUserIngredients } from './ingredientServices'

interface IngredientResponse {
  error : string
  res : IIngredient[]
}

export const fetchIngredients: QueryFunction<IngredientResponse, ["ingredients", string]> = async ({
  queryKey,
}) => {
  const username = queryKey[1];
  const apiRes = await fetchAllUserIngredients(username)
  if (apiRes.error) {
    throw new Error(`ingredients/${username} fetch failed`);
  }
  
  return apiRes
};