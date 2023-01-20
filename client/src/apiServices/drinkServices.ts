const apiPort = process.env.REACT_APP_DRINK_API_URL || 3001

const apiUrl = `http://localhost:${apiPort}/drinks`;

export const fetchDrink =async (name :string) => {
  const res = await fetch(`${apiUrl}/${name}`)
  const data = await res.json()
  return data
}

export const fetchAllDrinks = async () => {
  const res = await fetch(`${apiUrl}/all`)
  console.log(res)
  const data = await res.json()
  return data.res
}

export const createDrink = async (drinkName : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({drinkName})
  }
  const res = await fetch(`${apiUrl}/create`, fetchOptions)
  const data = await res.json()
  return data.res
}