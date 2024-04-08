import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { IMenu } from "../../apiTypes";
import { DrinkLink } from "../DrinkLink";
import './styles.css'
interface IProps {
  menu :IMenu
}

export const MenuDetails = ({menu} : IProps) => {
  const navigate = useNavigate()  

  const onSelect = (drink : string) => {
    navigate(`/drinks/${drink}`)
  }

  return (
    <Container id='menu-container'>
      <Typography variant="h6">{menu.title}</Typography>
      {menu.drinks.map(drink => (
        <DrinkLink drinkName={drink.name} />
      ))}
    </Container>
  );
}