import { QueryFunction } from "@tanstack/react-query";
import { IDrink, IMemoryUser} from '../../apiTypes'
import { fetchAllUserDrinks } from '../drinkServices'

interface DrinkResponse {
  error : string
  res : IDrink[]
}

export const fetchDrinks: QueryFunction<DrinkResponse, ["drinks", string]> = async ({
  queryKey,
}) => {
  const username = queryKey[1];
  const apiRes = await fetchAllUserDrinks(username)
  if (apiRes.error) {
    throw new Error(`drinks/${username} fetch failed`);
  }
  
  return apiRes
};