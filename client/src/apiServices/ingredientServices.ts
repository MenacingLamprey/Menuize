import { IIngredient } from "../apiTypes";

const apiPort = process.env.REACT_APP_DRINK_API_URL || 3001

const apiUrl = `http://localhost:${apiPort}/ingredients`;

export const fetchIngredient =async (name :string) => {
  const res = await fetch(`${apiUrl}/${name}`)
  const data = await res.json()
  return data
}

export const fetchAllUserIngredients = async () => {
  const res = await fetch(`${apiUrl}/all`)
  console.log(res)
  const data = await res.json()
  return data.res
}

export const createIngredient = async (ingredient : IIngredient) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient)
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  const data = await res.json()
  return data.res
}