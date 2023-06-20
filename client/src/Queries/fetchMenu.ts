import { QueryFunction } from "react-query";
import {fetchUserDrink} from "../apiServices/drinkServices"
import { IMenu } from '../apiTypes'
import { getCurrentMenu } from "../apiServices/menuServices";

interface MenuAPIResponse {
  res : IMenu 
}

export const fetchCurrentMenu: QueryFunction<MenuAPIResponse, "menu"> = async ({
  queryKey,
}) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const apiRes = await getCurrentMenu(accessToken);
  if (!apiRes.ok) {
    throw new Error(`current fetch not ok`);
  }
  return apiRes.json();
};
