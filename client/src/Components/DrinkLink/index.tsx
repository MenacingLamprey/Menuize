import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './styles.css'
import { Typography } from '@mui/material';

interface IProps {
  drinkName : string;
  onSelect : (drink : string) => void
}

export const DrinkLink = ({drinkName, onSelect} : IProps) => {

  return (<Typography onClick={e => onSelect(drinkName)} className ={"drink-card"}>{drinkName}</Typography>)
}