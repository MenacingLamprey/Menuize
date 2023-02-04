import { useState, useContext } from "react"

import { createIngredient } from "../../apiServices/ingredientServices"
import { IIngredient } from "../../apiTypes"
import { IngredientContext } from "../../Contexts/IngredientContext";

export const IngredientForm = () => {
  const [ingredients, setIngredients] = useContext(IngredientContext);
  const [ingredientName, setIngredientName] = useState('')
  const [family, setFamily] = useState('')

  const submit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIngredientName('')
    setFamily('')
    const ingredient : IIngredient = {name : ingredientName, family}
    const accessToken = localStorage.getItem('accessToken')
    const result = accessToken && await createIngredient(ingredient, accessToken)
    ingredients && setIngredients([...ingredients, ingredient])
  }

  return(<form onSubmit={e => submit(e)}>
    <label>Ingredient Name</label>
    <input
      name ={ingredientName}
      value = {ingredientName}
      onChange = {(e) =>{setIngredientName(e.target.value)}}
    />
    <label>Family</label>
    <input
      name ={family}
      value = {family}
      onChange = {(e) =>{setFamily(e.target.value)}}
    />
    <button type="submit">Submit</button>
  </form>)
}