import { IMemoryUser } from "../../apiTypes";
import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";

import './styles.css'
import { useQueryClient } from "react-query";

export const IngredientPage = () => {
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  if(!accessToken){
    console.log(new Error("No access token found"));
    return <div>No Access Token Provided</div>
  }
  const userData = queryClient.getQueryData<IMemoryUser>(["user",accessToken]);
  if(!userData){
    console.log(new Error("User not found"))
    return <div>User not found</div>
  }

  const {ingredients} = userData;

  return (<div id ={"ingredient-page"}>
    <h4>Here's a list of ingredients you've registered</h4>
    <IngredientList ingredients={ingredients} />
    <h4>Would you like to add a new ingredient to your register?</h4>
    <IngredientForm />
  </div>)
}