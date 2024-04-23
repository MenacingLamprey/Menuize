import { IBrand } from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/brands`;

export const createBrand = async(brand : IBrand, ingredientName : string, accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body : JSON.stringify({ingredientName, brand})
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  return res
}