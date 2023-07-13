import { QueryFunction } from "react-query";
import { IIngredientFamily } from '../apiTypes'

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/drinks`;

interface IngredientFamiliesAPIResponse {
  res : IIngredientFamily
}

export const fetchFamilies: QueryFunction<IngredientFamiliesAPIResponse, ["ingredient family", string]> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const apiRes = await fetch(`${apiUrl}/ingredients/families/all`)
  if (!apiRes.ok) {
    throw new Error(`ingredient-families fetch not ok`);
  }
  return apiRes.json();
};

