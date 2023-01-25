import { createContext } from "react";

export interface IMemoryUser {
  username : string
}

export const UserContext = 
  createContext<[IMemoryUser | null, (user: IMemoryUser | null) => void]>
  ([{username : ""}, () => {}]);
