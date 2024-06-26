import { IDrink } from '../../apiTypes'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import fetchDrink from '../../Queries/fetchDrink'
import { IngredientLink } from '../IngredientLink'

import './styles.css'

export const DrinkDetails = () => {
  const { drinkName } = useParams()
  const nav = useNavigate()

  if(!drinkName){
    return <div>No Drink Selected</div>
  }

    const results = useQuery({queryKey : ["drink", drinkName], queryFn :fetchDrink});
    if (results.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      );
    }
    const drink = results?.data?.res

  if (!drink) {
    throw new Error("drink not found");
  }

  const formatIngredientsForForm = (drink : IDrink) => {
    return drink.Ingredients?.map((ingredient)  => {
      return {
        amount : ingredient.DrinkIngredient!.amount,
        measurement : ingredient.DrinkIngredient!.measurement, 
        ingredient : ingredient.name
      }
    })
  }

  const editDrink = () => {
    const drinkRoute = `/drinks/edit/${drinkName}`
    nav(drinkRoute, {state:{drink}})
  }

  return(
    <Container id ='drink-details' component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
      <Box  id = 'drink-name' marginBottom="10px;" display={'flex'}>
        <Typography component={'h1'} variant={'h4'}>{drinkName}</Typography>
        <Button sx={{fontSize: '1em'}} onClick={editDrink}>✎</Button>
      </Box>
      <Box id ='drink-info' display={'flex'} alignItems={'center'}>
      <Typography>Glass: {drink.glass}</Typography>
      <Typography>Method: {drink.method}</Typography>
      </Box>
      <Typography variant='h6'>Recipe</Typography>
      <Box id='drink-recipe'>
        {drink.Ingredients && formatIngredientsForForm(drink)!.map((ingredient,index) => {
          return (<Box display={'flex'} justifyContent={'center'}>
            <Typography id='drink-ingredient'>
              {ingredient.amount} {ingredient.measurement} <IngredientLink ingredientName={ingredient.ingredient}/>
            </Typography>
          </Box>
          )
        })}
      </Box>
    </Container>
  )
} 