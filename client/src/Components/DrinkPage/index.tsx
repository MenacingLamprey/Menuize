import { useContext } from "react"

import { IDrink } from "../../apiTypes";
import { UserContext } from "../../Contexts/UserContext";
import { DrinkList } from "../DrinkList";
import { DrinkForm } from "../DrinkForm";
import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "../../apiServices/fetchIngredients";
import { fetchDrinks } from "../../apiServices/QueryFetches/fetchDrinks";

const initialDrink : IDrink = {name : "", description :"", numOfIngredients :0, glass :""}

export const DrinkPage = () => {
    const [currentUser] = useContext(UserContext);
    const username = currentUser?.username || localStorage.getItem("username") || ""
    const ingredientResults = useQuery(["ingredients", username], fetchIngredients);
    const drinksResults = useQuery(["drinks", username], fetchDrinks);

    const ingredients = ingredientResults?.data?.res || []
    const drinks = drinksResults?.data?.res || []

    return (<div>
      <h4>Here is a list of ingredients you've registered</h4>
      <DrinkList drinks={drinks} />
      <h4>Would you like to create new ingredients to your register?</h4>
      <DrinkForm potentialIngredients={ingredients}/>
    </div>)
}