import { Link } from "react-router-dom";

interface IProps {
  ingredientName : string;
}

export const IngredientLink = ({ingredientName} : IProps) => {
  return (<Link to={`/ingredients/${ingredientName}`} className ={"ingredient-card"}>{ingredientName}</Link>)
}