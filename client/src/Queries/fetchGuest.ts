import { QueryFunction } from "@tanstack/react-query";
import { IDrink, IIngredient}from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/users/guest`;

interface IResponse {
  drinks : IDrink[]
  ingredients : IIngredient[]
}

interface guestAPIResponse {
  res : IResponse
}

export const fetchPublicItems: QueryFunction<guestAPIResponse> = async ({
  queryKey,
}) => {
  const apiRes = await fetch(`${apiUrl}`);
  if (!apiRes.ok) {
    throw new Error(`guest fetch not ok`);
  }
  return apiRes.json();
};
