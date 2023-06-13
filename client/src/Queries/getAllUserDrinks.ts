import { fetchAllUserDrinks } from "../apiServices"
import { QueryFunction } from "react-query";
import { IDrink } from '../apiTypes'

interface DrinksAPIResponse {
  res : IDrink[]
}

export const getAllUserDrinks : QueryFunction<DrinksAPIResponse, ["drinks", string]> = async ({
  queryKey,
}) => {
  const username = queryKey[1];
  const apiRes = await fetchAllUserDrinks(username);
  if (!apiRes.ok) {
    throw new Error(`/drinks fetch not ok`);
  }
  return apiRes.json();
};
