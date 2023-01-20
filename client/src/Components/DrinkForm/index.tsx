import { useState } from "react"

import { createDrink } from "../../apiServices/drinkServices"

export const DrinkForm = () => {
    const [drinkName, setDrinkName] = useState('')

    const submit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setDrinkName('')
      createDrink(drinkName)
    }

    return(<form onSubmit={e => submit(e)}>
        <label>Drink Name</label>
        <input
          name ={drinkName}
          value = {drinkName}
          onChange = {(e) =>{setDrinkName(e.target.value)}}
        />
        <button type="submit">Submit</button>
    </form>)
}