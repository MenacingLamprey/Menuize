import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';
import { IngredientPage } from './Components/IngredientPage';

import { Auth } from './utils/Auth';
import { UserContext } from './Contexts/UserContext';
import { IngredientContext } from './Contexts/IngredientContext';
import { IDrink, IIngredient, IMemoryUser } from './apiTypes';

import './App.css';
import { DrinkPage } from './Components/DrinkPage';
import { DrinkDetails } from './Components/DrinkDetails';
import { IngredientDetails } from './Components/IngredientDetails';
import { DrinkForm } from './Components/DrinkForm';
import { DrinkContext } from './Contexts/DrinkContext';
import { NavBar } from './Components/NavBar';
import { DrinkEditForm } from './Components/DrinkEditForm';

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
  const currentDrinks = useState<IDrink[]>([]);

  return (
    <div className="App">
      <div id='main'>
      <BrowserRouter>
      <NavBar />
      <UserContext.Provider value={currentUser}>
      <IngredientContext.Provider value={currentIngredients}>
      <DrinkContext.Provider value={currentDrinks}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path ="/ingredients" element={<IngredientPage />} />
          <Route path ='/drink-form' element ={<DrinkForm />} />
          <Route path ="/drinks" element={<DrinkPage />} />
          <Route path ="/drinks/:drinkName" element={<DrinkDetails />} />
          <Route path ="/drinks/edit/:drinkName" element={<DrinkEditForm />} />
          <Route path ="/ingredients/:ingredientName" element={<IngredientDetails />} />
        </Routes>
      </QueryClientProvider>
      </DrinkContext.Provider>
      </IngredientContext.Provider>
      </UserContext.Provider>
      </BrowserRouter >
      </div>
    </div>
  );
}

export default App;
