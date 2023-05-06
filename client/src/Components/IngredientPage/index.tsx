import { useContext, useEffect } from "react"

import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";
import { fetchAllUserIngredients } from '../../apiServices'
import { UserContext } from "../../Contexts/UserContext";
import { IngredientContext } from "../../Contexts/IngredientContext";

import './styles.css'

export const IngredientPage = () => {
  const [currentUser] = useContext(UserContext);
  const username = currentUser?.username || localStorage.getItem("username") || ""
  const [ingredients, setIngredients] = useContext(IngredientContext)

  useEffect(()=>{
    getUserIngredients(username)
  },[])

  const getUserIngredients = async (user : string) => {
    const userIngredients = await fetchAllUserIngredients(user);
    setIngredients(userIngredients.res)
  }

  return (<div id ={"ingredient-page"}>
    <h4>Here's a list of ingredients you've registered</h4>
    <IngredientList ingredients={ingredients} />
    <h4>Would you like to add a new ingredient to your register?</h4>
    <IngredientForm />
  </div>)
}