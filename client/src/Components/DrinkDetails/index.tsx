import { IDrink } from '../../apiTypes'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import fetchDrink from '../../Queries/fetchDrink'
import { CurrentDrinkContext } from '../../Contexts/DrinkContext'
import { useContext } from 'react'

export const DrinkDetails = () => {
  const { drinkName } = useParams()
  const [editedDrink, setEditedDrink ] = useContext(CurrentDrinkContext)
  const nav = useNavigate()

  let drink : IDrink | undefined
  if(editedDrink.name != drinkName) {
    if (!drinkName) {
      throw new Error("no name provided to Drink");
    }

    const results = useQuery(["drink", drinkName], fetchDrink);
    if (results.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      );
    }

    drink = results?.data?.res

  } else {
    drink = editedDrink
  }

  if (!drink) {
    throw new Error("drink not found");
  }

  console.log(drink)
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
    <Container component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
      <Box  marginBottom="10px;" display={'flex'}>
        <Typography component={'h1'} variant={'h4'}>{drinkName}</Typography>
        <Button sx={{fontSize: '1em'}} onClick={editDrink}>✎</Button>
      </Box>
      <Box display={'flex'} alignItems={'center'}> </Box>
      <Typography>Glass: {drink.glass}</Typography>
      <Typography>Method: {drink.method}</Typography>
      <h4>Recipe</h4>
      <Box>
        {drink.Ingredients && formatIngredientsForForm(drink)!.map((ingredient,index) => {
          return (<Box display={'flex'} justifyContent={'center'}>
            <Typography>{ingredient.amount} {ingredient.measurement} {ingredient.ingredient}</Typography>
          </Box>
          )
        })}
      </Box>
    </Container>
  )
} 