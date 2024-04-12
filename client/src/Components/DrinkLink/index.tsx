import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import './styles.css'

interface IProps {
  drinkName : string;
  addDrink? : (drinkName : string) => void
}

export const DrinkLink = ({drinkName, addDrink} : IProps) => {
  const navigate = useNavigate()
  let selectDrink :  (drink : string) => void
  let actionString = ''
  if(addDrink) {
    selectDrink = addDrink
  } else {
    selectDrink = navigate
    actionString = '/drinks/'
  }

  return (
    <Button
      onClick={e => selectDrink(`${actionString}${drinkName}`)}
      className ={"drink-card"}>
        {drinkName}
    </Button>
  )
}