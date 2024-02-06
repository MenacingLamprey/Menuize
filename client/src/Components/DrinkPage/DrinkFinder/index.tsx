import { useState } from "react";

import { Autocomplete, TextField, Stack, IconButton, Typography} from "@mui/material"
import { searchDrinksByIngredients } from '../../../apiServices/drinkServices'
import { IDrink, IIngredient } from "../../../apiTypes"

import { DrinkList } from "../../DrinkList";

interface IProps {
  potentialIngredients : IIngredient[]
}

export const DrinkFinder = ({ potentialIngredients } : IProps) => {
  const accessToken = localStorage.getItem('accessToken') || ''; 
  const [drinks,setDrinks] = useState<IDrink[]>([])
  const handleChange = async (e :  React.SyntheticEvent<Element, Event>, values : IIngredient[]) => {
    if(values.length > 2) {
      const drinks = await searchDrinksByIngredients(accessToken,values)
      setDrinks(drinks)
      console.log(drinks)
    }
  }

  return ( <Stack spacing={3} sx={{minWidth:300 }}>
  <Autocomplete
    multiple
    id="tags-outlined"
    options={potentialIngredients}
    getOptionLabel={(option) => option.name}
    filterSelectedOptions
    onChange={handleChange}
    renderInput={(params) => {
      return <TextField
          {...params}
        label="Select Ingredients"
        placeholder="Ingredient"
      />
    }}
  />
  {drinks.length > 0 &&
  <Typography component={'h1'} variant="h5">Here Are The Drinks You Can Make With Your Ingredients</Typography> &&
  <DrinkList drinks={drinks}/>
  }
  </Stack>)
}