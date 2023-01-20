import { DrinkCard } from '../DrinkCard'

import { IDrink } from '../../apiTypes'

interface IProps {
    drinks : IDrink[]
} 

export const DrinkList = ({drinks} : IProps) => {
    return (<div>
        <ul>
            {drinks ? drinks.map(drink => <li key ={drink.id}><DrinkCard drink={drink}/></li>) : <p>No Drinks</p>}
        </ul>
    </div>)
}