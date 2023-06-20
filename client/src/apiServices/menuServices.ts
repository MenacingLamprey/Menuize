const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001
const apiUrl = `http://localhost:${apiPort}/menus`;

export const getCurrentMenu = async (accessToken : string) => {
  const fetchOptions = { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const res = await fetch(`${apiUrl}/getCurrentMenu`, fetchOptions)
  return res
}