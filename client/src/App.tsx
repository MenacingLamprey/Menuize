import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';

import { Auth } from './utils/Auth';
import { UserContext } from './Contexts/UserContext';
import { IMemoryUser } from './Contexts/UserContext';

import './App.css';
import { IngredientForm } from './Components/IngredientForm';
import { DrinkForm } from './Components/DrinkForm';
import { IngredientPage } from './Components/IngredientPage';

function App() {
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const currentUser = useState(null as IMemoryUser | null)
  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/create" element={<IngredientForm />} />
          <Route path="/drinks/create" element={<DrinkForm />} />
          <Route path ="/ingredients" element={<IngredientPage />} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter >
    </div>
  );
}

export default App;
