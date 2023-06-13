import { fetchAllUserIngredients } from "../apiServices"
import { QueryFunction } from "react-query";
import { IIngredient } from '../apiTypes'

interface IngredientsAPIResponse {
  res : IIngredient[]
}

export const getAllUserIngredients : QueryFunction<IngredientsAPIResponse, ["ingredients", string]> = async ({
  queryKey,
}) => {
  const username = queryKey[1];
  const apiRes = await fetchAllUserIngredients(username);
  if (!apiRes.ok) {
    throw new Error(`/ingredients fetch not ok`);
  }
  return apiRes.json();
};
