import { IIngredient } from '../../apiTypes'

interface IProps {
    ingredients : IIngredient[]
} 

export const IngredientList = ({ingredients} : IProps) => {
    return (<div>
        <ul>
            {ingredients ? ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>) : <p>No Drinks</p>}
        </ul>
    </div>)
}