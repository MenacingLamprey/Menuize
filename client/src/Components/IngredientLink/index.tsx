import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface IProps {
  ingredientName : string;
}

export const IngredientLink = ({ingredientName} : IProps) => {
  const navigate = useNavigate()
  return (
    <Button
      sx={{}}
      onClick={e => navigate(`/ingredients/${ingredientName}`)}
      className ={"ingredient-card"}
    > 
      {ingredientName} 
    </Button>)
}