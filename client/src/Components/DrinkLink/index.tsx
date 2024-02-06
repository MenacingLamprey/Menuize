import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css'
import { Typography } from '@mui/material';

interface IProps {
  drinkName : string;
}

export const DrinkLink = ({drinkName} : IProps) => {
  const navigate = useNavigate()
  let selectDrink :  (drink : string) => void
  selectDrink = navigate
  return (<Typography onClick={e => selectDrink(`${drinkName}`)} className ={"drink-card"}>{drinkName}</Typography>)
}