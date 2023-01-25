import { useState, useEffect, useContext } from "react"

import { fetchAllUserIngredients } from "../../apiServices/ingredientServices";
import { IIngredient } from "../../apiTypes";
import { UserContext } from "../../Contexts/UserContext";
import { IngredientForm } from "../IngredientForm";
import { IngredientList } from "../IngredientList";

const initialIngredient : IIngredient = {name : "", instructions :"", family :""}

export const IngredientPage = () => {
    const [ingredients, setIngredients] = useState([initialIngredient])
    const [currentUser] = useContext(UserContext);

    useEffect(() => {
        getUserIngredients();
    },[currentUser])

    const getUserIngredients = async () => {
        console.log(currentUser)
        if(currentUser){
            const result = await fetchAllUserIngredients(currentUser?.username)
            const ingredients = result.res;
            setIngredients(ingredients)
        }
    }

    return (<div>
        <h4>Here is a list of ingredients you've registered</h4>
        <IngredientList ingredients={ingredients} />
        <h4>Would you like to create new ingredients to your register?</h4>
        <IngredientForm />
    </div>)
}