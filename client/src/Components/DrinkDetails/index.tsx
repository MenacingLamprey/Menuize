import {useState, useEffect} from 'react'
import { fetchUserDrink } from '../../apiServices'
import { IDrink } from '../../apiTypes'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'


const initialDrink : IDrink= { name :'', glass :'', numOfIngredients :0, Ingredients : [], id:-1}
export const DrinkDetails = () => {
  const [drink, setDrink] = useState(initialDrink)

  const { drinkName } = useParams()
  const nav = useNavigate()
  const accessToken = localStorage.getItem('accessToken') || ''

  useEffect(()=>{
    getUserDrink()
  },[])

  const getUserDrink = async () => {
    const response = await fetchUserDrink(drinkName as string, accessToken)
    const drink : IDrink = response.res
    setDrink(drink)
  }

  const formatIngredientsForForm = () => {
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

  return(<Container component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
    <Box  marginBottom="10px;" display={'flex'}>
      <Typography component={'h1'} variant={'h4'}>{drinkName}</Typography>
      <Button sx={{fontSize: '1em'}} onClick={editDrink}>✎</Button>
    </Box>
    <Box display={'flex'} alignItems={'center'}> </Box>
    <Typography>Glass: {drink.glass}</Typography>
    <Typography>Method: {drink.method}</Typography>
    <Typography component={'h1'} variant={'h6'} margin="10px;">Recipe</Typography>
    <Box>
      {drink.Ingredients && formatIngredientsForForm()!.map((ingredient,index) => {
        return (<Box display={'flex'} justifyContent={'center'}>
          <Typography>{ingredient.amount} {ingredient.measurement} {ingredient.ingredient}</Typography>
        </Box>
        )
      })}
    </Box>
  </Container>
  )
} 