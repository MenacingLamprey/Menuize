import { QueryFunction } from "react-query";
import {fetchUserDrink} from "../apiServices/drinkServices"
import { IDrink } from '../apiTypes'

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/drinks`;

interface DrinkAPIResponse {
  res : IDrink 
}

const fetchDrink: QueryFunction<DrinkAPIResponse, ["drink", string]> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const name = queryKey[1];
  const apiRes = await fetchUserDrink(name, accessToken);
  if (!apiRes.ok) {
    throw new Error(`drink/${name} fetch not ok`);
  }
  return apiRes.json();
};

export default fetchDrink;
