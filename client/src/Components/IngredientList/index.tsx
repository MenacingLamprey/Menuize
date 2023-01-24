import { DrinkCard } from '../DrinkCard'

import { IIngredient } from '../../apiTypes'

interface IProps {
    ingredients : IIngredient[]
} 

export const DrinkList = ({ingredients} : IProps) => {0
    return (<div>
        <ul>
            {ingredients ? ingredients.map(ingredient => <li key ={ingredient.id}>{ingredient.name}</li>) : <p>No Drinks</p>}
        </ul>
    </div>)
}