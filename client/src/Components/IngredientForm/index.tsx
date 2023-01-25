import { useState } from "react"

import { createIngredient } from "../../apiServices/ingredientServices"
import { IIngredient } from "../../apiTypes"

export const IngredientForm = () => {
    const [ingredientName, setIngredientName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [family, setFamily] = useState('')

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIngredientName('')
      setInstructions('')
      setFamily('')
      const ingredient : IIngredient = {name : ingredientName, family}
      const accessToken = localStorage.getItem('accessToken')
      const result = accessToken && await createIngredient(ingredient, accessToken)
    }

    return(<form onSubmit={e => submit(e)}>
        <label>Ingredient Name</label>
        <input
          name ={ingredientName}
          value = {ingredientName}
          onChange = {(e) =>{setIngredientName(e.target.value)}}
        />
        {/* <label>Instructions</label>
        <input
          name ={instructions}
          value = {instructions}
          onChange = {(e) =>{setInstructions(e.target.value)}}
        /> */}
        <label>Family</label>
        <input
          name ={family}
          value = {family}
          onChange = {(e) =>{setFamily(e.target.value)}}
        />
        <button type="submit">Submit</button>
    </form>)
}