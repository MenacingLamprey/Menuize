import { Link } from 'react-router-dom'
import { IIngredient } from '../../../apiTypes'

import './styles.css'

interface IProps {
  ingredients : IIngredient[]
} 

export const IngredientList = ({ingredients} : IProps) => {
  return (<div id = {'ingredient-list-container'}>
    <ul id = {'ingredient-list'}>
      {ingredients ? ingredients.map(ingredient => (
        <Link to={`/ingredients/${ingredient.name}`} key={ingredient.id} className ={'ingredient'}>{ingredient.name}</Link>)
      ) : (
        <p>No Ingredient</p>)}
    </ul>
  </div>)
}