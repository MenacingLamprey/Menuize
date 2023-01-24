import { useState } from "react"

import { createDrink } from "../../apiServices/drinkServices"
import { IDrink } from "../../apiTypes"

export const DrinkForm = () => {
    const [drinkName, setDrinkName] = useState('')
    const [description, setDescription] = useState('')
    const [method, setMethod] = useState('')
    const [glass, setGlass] = useState('')
    const [numOfIngredients, setNumIngredients] = useState(0)

    const clearFields = () => {
      setDrinkName('')
      setGlass('')
      setDescription('')
    }

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const drink : IDrink = {name : drinkName, description, glass, numOfIngredients}
      clearFields();
      const result = await createDrink(drink)
    }

    return(<form onSubmit={e => submit(e)}>
        <label>Drink Name</label>
        <input
          name ={drinkName}
          value = {drinkName}
          onChange = {(e) =>{setDrinkName(e.target.value)}}
        />
        <input
          name ={glass}
          value = {glass}
          onChange = {(e) =>{setGlass(e.target.value)}}
        />
        <input
          name ={description}
          value = {description}
          onChange = {(e) =>{setDescription(e.target.value)}}
        />
        <button type="submit">Submit</button>
    </form>)
}