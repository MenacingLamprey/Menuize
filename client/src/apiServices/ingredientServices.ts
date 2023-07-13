import { Details } from "@mui/icons-material";
import { IIngredient } from "../apiTypes";
import { IFormIngredient } from "../Components/DrinkForm/formTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/ingredients`;

export const fetchUserIngredient =async (name :string, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  }
  const res = await fetch(`${apiUrl}/${name}`, fetchOptions)
  return res
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

export const deleteIngredient = async (ingredientName : string, accessToken : string) => {
  const fetchOptions = { 
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const res = await fetch(`${apiUrl}/delete/${ingredientName}`, fetchOptions)
  const data = await res.json()
  return data.res
}

interface IDetails {
  recipeYield : string
  instructions : string
}

export const addRecipeToIngredient = async (
  accessToken : string, recipe : IFormIngredient[], ingredientId : number, details : IDetails
  ) => {
  const fetchOptions = { 
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({recipe, details})
  }
  const res = await fetch(`${apiUrl}/addRecipe/${ingredientId}`, fetchOptions)
  const data = await res.json()
  return data.res
}

export const editIngredientRecipe = async (
  accessToken : string, recipe : IFormIngredient[], ingredientId : number, details : IDetails
  ) => {
    const fetchOptions = { 
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({recipe, details})
    }
    const res = await fetch(`${apiUrl}/editRecipe/${ingredientId}`, fetchOptions)
    const data = await res.json()
    return data.res
  }