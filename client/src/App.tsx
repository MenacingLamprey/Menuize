import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material';

import { LandingPage } from './Components/LandingPage';
import { Profile } from './Components/Profile';
import { IngredientPage } from './Components/IngredientPage';

import { Auth } from './utils/Auth';
import { IDrink, IIngredient, IMemoryUser } from './apiTypes';

import './App.css';
import { DrinkPage } from './Components/DrinkPage';
import { DrinkDetails } from './Components/DrinkDetails';
import { IngredientDetails } from './Components/IngredientDetails';
import { DrinkForm } from './Components/DrinkForm';
import { NavBar } from './Components/NavBar';
import { DrinkEditForm } from './Components/DrinkEditForm';
import { IngredientEditForm } from './Components/IngredientEditForm';
import { IngredientRecipeForm } from './Components/IngredientEditForm/IngredientRecipeForm';
import { MenuPage } from './Components/MenuPage';
import { MenuForm } from './Components/MenuPage/MenuForm';
import { GuestPage } from './Components/GuestPage';
import { IngredientForm } from './Components/IngredientPage/IngredientForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    },
  },
});

const theme = createTheme({      
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  components : {
    MuiButton : {
      styleOverrides: {
        root: {
          lineHeight : 1
        }
      }
    }
  }
});


function App() {
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App">
      <div id='main'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path ="/guest" element ={<GuestPage/>} />
          <Route path ="/ingredients" element={<IngredientPage />} />
          <Route path ='ingredient-form' element={<IngredientForm />} />
          <Route path ='/drink-form' element ={<DrinkForm />} />
          <Route path ='/menu-form' element ={<MenuForm />} />
          <Route path ="/drinks" element={<DrinkPage />} />
          <Route path ="/menus" element={<MenuPage />} />
          <Route path ="/drinks/:drinkName" element={<DrinkDetails />} />
          <Route path ="/drinks/edit/:drinkName" element={<DrinkEditForm />} />
          <Route path ="/ingredients/edit/:ingredientName" element={<IngredientEditForm />} />
          <Route path ="/ingredients/:ingredientName" element={<IngredientDetails />} />
          <Route path ="/ingredients/add-recipe/" element={<IngredientRecipeForm />} />
        </Routes>
      </QueryClientProvider>
      </ThemeProvider>
      </BrowserRouter >
      </div>
    </div>
  );
}

export default App;
