import { useContext } from 'react';
import { useFieldArray, useForm, FormProvider} from 'react-hook-form'
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { FormValues } from './formTypes';

import { formatIngredients } from '../../utils/drinkFormating';
import { createDrink } from "../../apiServices/drinkServices"
import { IngredientContext } from '../../Contexts/IngredientContext';
import { DrinkContext } from '../../Contexts/DrinkContext';
import { DrinkIngredientForm } from "./DrinkIngredientForm";

import './styles.css'

export const DrinkForm = () => {
  const [potentialIngredients, setPotentialIngredients] = useContext(IngredientContext)
  const [userDrinks, setUserDrinks ] = useContext(DrinkContext)

  const methods  = useForm<FormValues>({
    defaultValues: {
      drinkName : "",
      glass : "",
      method : "",
      ingredients: [{ ingredient: "", amount: 0, measurement: 'oz' }]
    },
    mode: "onBlur"
  });

  const { register, control, reset, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});
  const ingredientFormProps = {fields, append, remove, potentialIngredients,register}

  const submit = async (data : FormValues) => {
    const {drinkName, glass, ingredients, method } = data
    const {drinkIngredients, measures, newIngredients} = formatIngredients(ingredients, potentialIngredients)
    const numOfIngredients = ingredients.length
    const accessToken = localStorage.getItem('accessToken') || ''
    const drink = {name:drinkName, glass, numOfIngredients, method, measures, Ingredients:drinkIngredients, newIngredients}
    const success = await createDrink(drink, accessToken)
    const updatedDrinks = [...userDrinks, drink]
    setUserDrinks(updatedDrinks)
    const updatedIngredients = [...potentialIngredients, ...newIngredients]
    setPotentialIngredients(updatedIngredients)
    reset()
  }

  return(<Container sx={{maxWidth:450, margin :5}}>
    <Typography component={'h1'} variant='h5'>Register Your New Drink</Typography>
    <FormProvider {...methods}>
    <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="drink-name"
      label="Drink Name"
      {...register(`drinkName` as const, {
        required: true
      })}
    />
      <TextField
      margin="normal"
      required
      fullWidth
      id="glass"
      label="Glass"
      {...register(`glass` as const, {
        required: true
      })}
    />
      <TextField
      margin="normal"
      required
      fullWidth
      id="method"
      label="Method"
      {...register(`method` as const, {
        required: true
      })}
    />
    <DrinkIngredientForm ingredientFormProps={ingredientFormProps}/>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Create Drink
    </Button>
  </Box>
  </FormProvider></Container>)
}