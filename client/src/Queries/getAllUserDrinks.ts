import { fetchAllUserDrinks } from "../apiServices"
import { QueryFunction } from "react-query";
import { IDrink } from '../apiTypes'

interface DrinksAPIResponse {
  res : IDrink[]
}

export const getAllUserDrinks : QueryFunction<DrinksAPIResponse, ["drinks", string]> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const apiRes = await fetchAllUserDrinks(accessToken);
  if (!apiRes.ok) {
    throw new Error(`drink/${name} fetch not ok`);
  }
  return apiRes.json();
};
