import { IDrink } from "../apiTypes";

const apiPort = process.env.REACT_APP_DRINK_API_URL || 3001

const apiUrl = `http://localhost:${apiPort}/drinks`;

export const fetchDrink =async (name :string) => {
  const res = await fetch(`${apiUrl}/${name}`)
  const data = await res.json()
  return data
}

export const fetchAllUserDrinks = async () => {
  const res = await fetch(`${apiUrl}/all`)
  const data = await res.json()
  return data.res
}

export const createDrink = async (drink : IDrink) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(drink)
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  const data = await res.json()
  return data.res
}