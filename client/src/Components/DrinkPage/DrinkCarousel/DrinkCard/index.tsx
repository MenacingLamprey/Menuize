import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { IDrink } from '../../../../apiTypes';
import { Button } from '@mui/material';

interface IProps {
  drink : IDrink
}

export const DrinkCard = ({drink} : IProps) => {
  const nav = useNavigate()
  return (
    <Card sx={{ maxWidth: 345,  height : 120}} variant='outlined'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {drink.name.charAt(0)}
          </Avatar>
        }
        title={drink.name}
      />
      <Button onClick={e => nav(`/drinks/${drink.name}`)}>Go To</Button>
    </Card>
  );
}