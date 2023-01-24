import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';

import { Auth } from './utils/Auth';
import { IDrink } from './apiTypes';

import './App.css';
import { IngredientForm } from './Components/IngredientForm';
import { DrinkForm } from './Components/DrinkForm';

function App() {
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/create" element={<IngredientForm />} />
          <Route path="/drinks/create" element={<DrinkForm />} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
