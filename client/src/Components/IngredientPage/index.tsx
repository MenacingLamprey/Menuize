import {useContext} from "react"
import { useQuery } from "@tanstack/react-query";

import { IIngredient } from "../../apiTypes";
import { IngredientForm } from "../IngredientForm";
import { IngredientList } from "../IngredientList";
import { fetchIngredients } from "../../apiServices/fetchIngredients";
import { UserContext } from "../../Contexts/UserContext";


const initialIngredient : IIngredient = {name : "", instructions :"", family :""}

export const IngredientPage = () => {
    const [currentUser] = useContext(UserContext);
    const username = currentUser?.username || localStorage.getItem("username") || ""
    const results = useQuery(["ingredients", username], fetchIngredients);

    const ingredients = results?.data?.res || []

    return (<div>
        <h4>Here is a list of ingredients you've registered</h4>
        <IngredientList ingredients={ingredients} />
        <h4>Would you like to create new ingredients to your register?</h4>
        <IngredientForm />
    </div>)
}