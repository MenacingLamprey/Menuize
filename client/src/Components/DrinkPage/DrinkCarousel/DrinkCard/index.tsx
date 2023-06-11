import { useNavigate } from 'react-router-dom';

import { Card, CardActionArea,CardHeader,Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { IDrink } from '../../../../apiTypes';
import { Button } from '@mui/material';

interface IProps {
  drink : IDrink
}

export const DrinkCard = ({drink} : IProps) => {
  const nav = useNavigate()
  return (
    <Card sx={{ minWidth: 100, maxWidth:200,  height : 125, alignSelf:'center'}} variant='outlined'>
      <CardActionArea sx={{ minWidth: 100,  height : 125}} onClick={e => nav(`/drinks/${drink.name}`)}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {drink.name.charAt(0)}
          </Avatar>
        }
        title={drink.name}
      />
      </CardActionArea>
    </Card>
  );
}