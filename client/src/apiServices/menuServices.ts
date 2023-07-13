import { IMenu } from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/menus`;

export const getCurrentMenu = async (accessToken : string) => {
  const fetchOptions = { 
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const res = await fetch(`${apiUrl}/current`, fetchOptions)
  return res
}

export const createMenu = async (accessToken : string, menu : IMenu) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(menu)
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  return res
}