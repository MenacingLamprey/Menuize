import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { IMenu } from "../../apiTypes";
import { DrinkLink } from "../DrinkLink";
import './styles.css'
import { IngredientLink } from "../IngredientLink";
import { Add } from "@mui/icons-material";

interface IProps {
  menu :IMenu
}

export const MenuDetails = ({menu} : IProps) => {
  const navigate = useNavigate()
  
  const AddDrink = () : JSX.Element => {
    return (
      <Button onClick = {e => navigate('/drink-form', {state : true})} >Add Drink?</Button>
    )
  }
  console.log(menu)
  return (
    <Container id='menu-container'>
      <Typography variant="h6">{menu.title}</Typography>
      <Box id='items-container'>
      <Box>
      <Typography>Drinks</Typography>
      {menu.drinks.map(drink => (
        <DrinkLink drinkName={drink.name} />
      ))}
      </Box>
      <Box>
      <Typography>Ingredients</Typography>
      {menu.ingredients.map(ingredient => (
        <IngredientLink ingredientName={ingredient.name} />
      ))}
      </Box>
      </Box>
      <AddDrink />
    </Container>
  );
}