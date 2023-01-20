import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { DrinkList } from './Components/DrinkList';
import { fetchAllDrinks } from './apiServices/drinkServices';
import { DrinkForm } from './Components/DrinkForm';
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';

import { Auth } from './utils/Auth';
import { IDrink } from './apiTypes';

import './App.css';

const intitalDrinks : IDrink[] = [{name :'', id : -1}]

function App() {
  const [drinks , setDrinks] = useState(intitalDrinks);
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  // useEffect(() => {
  //   getDrinks()
  // },[])

  // const getDrinks = async () => {
  //   const coctails = await fetchAllDrinks();
  //   setDrinks(coctails);
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
