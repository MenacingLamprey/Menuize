import { Link } from "react-router-dom";
import './styles.css'

interface IProps {
  drinkName : string;
}

export const DrinkLink = ({drinkName} : IProps) => {
  return (<Link to={`/drinks/${drinkName}`} className ={"drink-card"}>{drinkName}</Link>)
}