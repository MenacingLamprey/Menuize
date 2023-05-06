import { IIngredient } from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/ingredients`;

export const fetchIngredient =async (name :string, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  }
  const res = await fetch(`${apiUrl}/${name}`, fetchOptions)
  const data = await res.json()
  return data.res
}

export const fetchAllUserIngredients = async (username : string) => {
  const res = await fetch(`${apiUrl}/all/${username}`)
  return await res.json()
}

export const createIngredient = async (ingredient : IIngredient, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ingredient})
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  const data = await res.json()
  return data.res
}

export const editIngredient = async (ingredientName : string, newFamily : string, accessToken : string) => {
  const fetchOptions = { 
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ingredientName, newFamily})
  }
  const res = await fetch(`${apiUrl}/edit`, fetchOptions)
  const data = await res.json()
  return data.res
}