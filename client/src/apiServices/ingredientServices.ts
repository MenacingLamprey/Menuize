import { IBrand, IIngredient, IRecipe } from "../apiTypes";

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
  const res = await fetch(`${apiUrl}/get/${name}`, fetchOptions)
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

interface IUpdates {newFamily : string, updatedBrands? : IBrand[]}
export const editIngredient = async (ingredientName : string, updates : IUpdates, accessToken : string) => {
  const fetchOptions = { 
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ingredientName, updates})
  }
  const res = await fetch(`${apiUrl}/edit/update`, fetchOptions)
  const data = await res.json()
  console.log(data)
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

export const editRecipe = async (accessToken : string, recipe : IRecipe, ingredientId : number, changed : boolean) => {
  if(!changed) return await addRecipeToIngredient(accessToken,recipe, ingredientId)
  return await editIngredientRecipe(accessToken, recipe, ingredientId)
}

export const addRecipeToIngredient = async (accessToken : string, recipe : IRecipe, ingredientId : number) => {
  const fetchOptions = { 
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({recipe})
  }
  const res = await fetch(`${apiUrl}/addRecipe/${ingredientId}`, fetchOptions)
  const data = await res.json()
  return data.res
}

export const editIngredientRecipe = async (
  accessToken : string, recipe : IRecipe, ingredientId : number) => {
    const fetchOptions = { 
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({recipe})
    }
    const res = await fetch(`${apiUrl}/editRecipe/${ingredientId}`, fetchOptions)
    const data = await res.json()
    return data.res
  }

export const fetchPublicIngredient = async (name : string) => {
  const res = await fetch(`${apiUrl}/public/${name}`)
  return res
}
