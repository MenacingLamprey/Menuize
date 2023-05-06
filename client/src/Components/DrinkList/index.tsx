import { DrinkLink } from '../DrinkLink'
import { IDrink } from '../../apiTypes'

import './styles.css'

interface IProps {
    drinks : IDrink[]
} 

export const DrinkList = ({drinks} : IProps) => {
    return (<div id = {'drink-list-container'}>
        <ul id = {'drink-list'}>
            {drinks ? drinks.map(drink => <li key ={drink.id} className ={'drink'}> <DrinkLink drink={drink}/></li>) : <p>No Drinks</p>}
        </ul>
    </div>)
}