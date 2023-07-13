import { QueryFunction } from "react-query";
import { fetchPublicDrink, fetchUserDrink} from "../apiServices/drinkServices"
import { IDrink } from '../apiTypes'

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/drinks`;

interface DrinkAPIResponse {
  res : IDrink 
}

const fetchDrink: QueryFunction<DrinkAPIResponse, ["drink", string]> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "guest";
  console.log(accessToken)
  const name = queryKey[1];
  let apiRes : Response
  if (accessToken === "guest") {
    apiRes = await fetchPublicDrink(name);
  }else {
    apiRes = await fetchUserDrink(name, accessToken);
  }
  console.log(apiRes)
  if (!apiRes.ok) {
    throw new Error(`drink/${name} fetch not ok`);
  }
  return apiRes.json();
};

export default fetchDrink;
