import { useState } from 'react';
import { useFieldArray, useForm, FormProvider} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';

import { FormValues } from './formTypes';

import { formatIngredients } from '../../utils/drinkFormating';
import { ExtendedDrink, createDrink } from "../../apiServices/drinkServices"
import { DrinkIngredientForm } from "./DrinkIngredientForm";

import { fetchProfile } from '../../Queries/fetchProfile';

import './styles.css'

export const DrinkForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [addToMenu, setAddToMenu]  = useState<boolean>(useLocation().state || false)
  const accessToken = localStorage.getItem('accessToken') || ''

  if (!accessToken) {
    throw new Error("no access token found");
  }

  const { data: user, error, isLoading } = useQuery({queryKey : ["user", accessToken], queryFn : fetchProfile});

  const methods  = useForm<FormValues>({
    defaultValues: {
      drinkName : "",
      glass : "",
      method : "",
      ingredients: [{ ingredient: "", amount: 0, measurement: 'oz' }]
    },
    mode: "onBlur"
  });

  const { register, control, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

  const mutation = useMutation({mutationFn : (extendedDrink  : ExtendedDrink,) => createDrink(extendedDrink, accessToken, addToMenu), 
    onSuccess : () => {queryClient.invalidateQueries({queryKey :["user", accessToken]});}
  })
  
  if (mutation.isPending) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error</span>;
  }

  if (mutation.isSuccess) {
    return (<div>
      <span>Post submitted!</span>
    </div>)
  }

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (error) {
    <div className="error-window">
        <h2 className="error">{error.message}</h2>
      </div>
  }

  if (!user) {
    throw new Error("user not found");
  }

  const { ingredients } = user
 
  const ingredientFormProps = {fields, append, remove, potentialIngredients : ingredients, register}

  const submit = async (data : FormValues) => {
    const {drinkName, glass, ingredients : usedIngredients, method } = data
    const {drinkIngredients, measures, newIngredients} = formatIngredients(usedIngredients,ingredients)
    const numOfIngredients = usedIngredients.length
    const drink = {name:drinkName, glass, numOfIngredients, method, measures, Ingredients:drinkIngredients, newIngredients}
    const success = await mutation.mutateAsync(drink)
    console.log(success)
    navigate(-1)
  }
  
  return(<Container sx={{ display : 'flex', flexDirection :'column', padding : '5%'}}>
    <Typography component={'h1'} variant='h5'>Register Your New Drink</Typography>
    <FormProvider {...methods}>
    <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }} id='form'>
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
    <FormControlLabel
      control={<Checkbox checked={addToMenu} onChange={e => setAddToMenu(!addToMenu)}/>}
      label="Add To Menu?" 
    />
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