import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css'
import { Typography } from '@mui/material';

interface IProps {
  drinkName : string;
  addDrink? : (drinkName : string) => void
}

export const DrinkLink = ({drinkName, addDrink} : IProps) => {
  const navigate = useNavigate()
  let selectDrink :  (drink : string) => void
  addDrink ? selectDrink = addDrink : selectDrink = navigate  

  return (<Typography onClick={e => selectDrink(`/drinks/${drinkName}`)} className ={"drink-card"}>{drinkName}</Typography>)
}