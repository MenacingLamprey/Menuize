import { useContext, useState, useEffect } from "react"
import { Container, Typography } from "@mui/material";

import { IDrink } from "../../apiTypes";
import { UserContext } from "../../Contexts/UserContext";
import { DrinkForm } from "../DrinkForm";
import { fetchAllUserDrinks, fetchAllUserIngredients } from "../../apiServices";
import { IngredientContext } from "../../Contexts/IngredientContext";

import './styles.css'
import { DrinkCarousel } from "./DrinkCarousel";
import { DrinkSearchBar } from "./DrinkSearchBar";

const initialDrink : IDrink = {name : "", description :"", numOfIngredients :0, glass :"" , Ingredients : []}

export const DrinkPage = () => {
  const [currentUser] = useContext(UserContext);
  const [_, setIngredients] = useContext(IngredientContext)
  const [drinks,setDrinks] = useState([initialDrink])
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
    <Typography component="h1" variant="h5">
      Here's a few of your recently created Drinks      
    </Typography>
    <DrinkCarousel drinks={drinks} />
    <Typography component="h1" variant ="h5">
      Search for a Drink by Name
    </Typography>
    <DrinkSearchBar drinks={drinks} />
    <Typography component="h1" variant="h5">
      Would you like to add a new drink to your register?
    </Typography>
    <DrinkForm userDrinks={drinks} setUserDrinks={setDrinks}/>
  </Container>)
}