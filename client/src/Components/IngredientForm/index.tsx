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
      const ingredient : IIngredient = {name : ingredientName, instructions, family}
      const result = await createIngredient(ingredient)
    }

    return(<form onSubmit={e => submit(e)}>
        <label>Drink Name</label>
        <input
          name ={ingredientName}
          value = {ingredientName}
          onChange = {(e) =>{setIngredientName(e.target.value)}}
        />
        <input
          name ={instructions}
          value = {instructions}
          onChange = {(e) =>{setInstructions(e.target.value)}}
        />
        <input
          name ={family}
          value = {family}
          onChange = {(e) =>{setFamily(e.target.value)}}
        />
        <button type="submit">Submit</button>
    </form>)
}