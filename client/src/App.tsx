import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';
import { IngredientPage } from './Components/IngredientPage';

import { Auth } from './utils/Auth';
import { UserContext } from './Contexts/UserContext';
import { IngredientContext } from './Contexts/IngredientContext';
import { IIngredient, IMemoryUser } from './apiTypes';

import './App.css';
import { DrinkPage } from './Components/DrinkPage';
import { DrinkDetails } from './Components/DrinkDetails';
import { IngredientDetails } from './Components/IngredientDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const currentUser = useState(null as IMemoryUser | null)
  const currentIngredients = useState<IIngredient[]>([]);

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={currentUser}>
      <IngredientContext.Provider value={currentIngredients}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path ="/ingredients" element={<IngredientPage />} />
          <Route path ="/drinks" element={<DrinkPage />} />
          <Route path ="/drinks/:drinkName" element={<DrinkDetails />} />
          <Route path ="/ingredients/:ingredientName" element={<IngredientDetails />} />
        </Routes>
      </QueryClientProvider>
      </IngredientContext.Provider>
      </UserContext.Provider>
      </BrowserRouter >
    </div>
  );
}

export default App;
