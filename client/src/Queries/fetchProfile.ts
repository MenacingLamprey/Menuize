import { QueryFunction } from "@tanstack/react-query";
import {profile} from "../apiServices/authApi"
import { IMemoryUser } from '../apiTypes'

export const fetchProfile: QueryFunction<IMemoryUser, ["user", string]> = async ({
  queryKey,
}) : Promise<IMemoryUser> => {
  const accessToken = queryKey[1];
  const apiRes = await profile(accessToken);
  if (!apiRes.ok) {
    throw new Error(`profile catch fetch not ok`);
  }
  return apiRes.json() ;
};
