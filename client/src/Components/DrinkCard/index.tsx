import { IDrink } from "../../apiTypes"

interface IProps {
  drink : IDrink;
}

export const DrinkCard = ({drink} : IProps) => {
  return (<div>{drink.name}</div>)
}