import { createContext } from "react";
import { IMemoryUser } from "../apiTypes";

export const UserContext = 
  createContext<[IMemoryUser | null, (user: IMemoryUser | null) => void]>
  ([{username : ""}, () => {}]);
