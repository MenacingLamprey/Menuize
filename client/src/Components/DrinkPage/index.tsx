import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { IDrink } from "../../apiTypes";
import { UserContext } from "../../Contexts/UserContext";
import { fetchAllUserDrinks, fetchAllUserIngredients } from "../../apiServices";
import { IngredientContext } from "../../Contexts/IngredientContext";

import './styles.css'
import { DrinkCarousel } from "./DrinkCarousel";
import { DrinkSearchBar } from "./DrinkSearchBar";
import { DrinkFinder } from "./DrinkFinder";
import { DrinkContext } from "../../Contexts/DrinkContext";

export const DrinkPage = () => {
  const [currentUser] = useContext(UserContext);
  const [ingredients, setIngredients] = useContext(IngredientContext)
  const [drinks,setDrinks] = useContext(DrinkContext)
  const navigate = useNavigate();
  const username = currentUser?.username || localStorage.getItem("username") || ""

  useEffect(()=>{
    getUserIngredients(username)
    getUserDrinks(username)
  },[])

  const getUserIngredients = async (user : string) => {
    const userIngredients = await fetchAllUserIngredients(user);
    setIngredients(userIngredients.res)
  }

  const getUserDrinks = async (user : string) => {
    const userDrinks = await fetchAllUserDrinks(user);
    setDrinks(userDrinks.res)
  }

  return (<Container id={"drink-page"} component="main" maxWidth="xs">
    <Box>
      <Typography component="h1" variant="h5" maxWidth="xs">
        Here's a few of your recently created Drinks      
      </Typography>
      <DrinkCarousel drinks={drinks.slice(9)} />
    </Box>
    <Box>
      <Typography component="h1" variant ="h5" maxWidth="xs">
        Search for a Drink by Name
      </Typography>
      <DrinkSearchBar drinks={drinks} />
    </Box>
    <Box>
    <Typography component="h1" variant ="h5" maxWidth="xs">
      Search for a Drink by Ingredients
    </Typography>
    <DrinkFinder potentialIngredients={ingredients}/>
    </Box>
    <Box>
      <Button 
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={ e => navigate("/drink-form")}
        > 
          Create New Drink?
      </Button>
    </Box>
    {/* <SalesAnalyzer drinks={drinks} ingredients={ingredients}/> */}
  </Container>)
}