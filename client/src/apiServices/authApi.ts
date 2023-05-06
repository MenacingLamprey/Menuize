import { IUser } from "../apiTypes";

const apiPort = import.meta.env.VITE_DRINK_API_URL || 3001

const apiUrl = `http://localhost:${apiPort}/users`;

export const register = (user :IUser) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const login = (user :IUser) => {
  console.log(`${apiUrl}/login`)
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const profile = async (accessToken : string) => {
  return fetch(`${apiUrl}/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
};

export const logout = (tokenName : string) => {
  // delete token from local storage here
  localStorage.removeItem(tokenName);
};
