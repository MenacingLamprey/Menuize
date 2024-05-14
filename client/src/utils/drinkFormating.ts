import { IDrinkIngredient, IIngredient } from "../apiTypes"
import { IFormIngredient } from "../Components/DrinkForm/formTypes"

interface IFormattedIngredients {
  drinkIngredients :IIngredient[],
  measures : IDrinkIngredient[],
  newIngredients: IIngredient[]
}

//define shape of return value and initialize values to empty lists

export const formatIngredients = (formIngredients : IFormIngredient[], potentialIngredients : IIngredient[]) => {
  const formattedIngredients : IFormattedIngredients= {drinkIngredients :[], measures :[], newIngredients:[]}
  formIngredients.forEach((ingredient, index) => {
    const measure = {amount: ingredient.amount, measurement : ingredient.measurement}    
    formattedIngredients.measures.push(measure)

    const existingIngredients = potentialIngredients.filter(existingIngredient => {
      return ingredient.ingredient === existingIngredient.name
    })

    if(existingIngredients.length === 0) {
      const newIngredient : IIngredient  = {name : ingredient.ingredient, family :'', DrinkIngredient : measure, brands :[]}
      formattedIngredients.newIngredients.push(newIngredient)
      formattedIngredients.drinkIngredients.push(newIngredient)
    } else {
      const updatedExistingIngredient : IIngredient = {...existingIngredients[0], DrinkIngredient : measure}
      formattedIngredients.drinkIngredients.push(updatedExistingIngredient)
    }
  })

  return formattedIngredients
}