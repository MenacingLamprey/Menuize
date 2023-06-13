import { IDrink, IIngredient } from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/drinks`;

export const fetchUserDrink =async (drinkName :string, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body : JSON.stringify({drinkName})
  }
  const res = await fetch(`${apiUrl}/getDrink`, fetchOptions)
  return res
}

export const fetchAllUserDrinks = async (username : string) => {
  const res = await fetch(`${apiUrl}/all/${username}`)
  return res
}

type extendedDrink = IDrink & {newIngredients : IIngredient[]}
export const createDrink = async (drink : extendedDrink, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(drink)
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  const data = await res.json()
  return data.res
}

interface FieldDifferences {
  name: string
  method : string
  glass : string
  ingredientChanges : any
}

export const editDrink = async (changes : FieldDifferences , accessToken : string) => {
  const fetchOptions = { 
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(changes)
  }
  const res = await fetch(`${apiUrl}/edit`, fetchOptions)
  const data = await res.json()
  return data
}

export const searchDrinksByIngredients = async (accessToken : string, ingredients : IIngredient[]) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ingredients})
  }
  const res = await fetch(`${apiUrl}/ingredient_search`, fetchOptions)
  const data = await res.json();
  return data.res
}