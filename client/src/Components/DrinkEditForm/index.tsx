import { useLocation } from "react-router-dom"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { IDrink, IIngredient } from "../../apiTypes"
import { useContext, useEffect, useState } from "react";
import { IngredientContext } from "../../Contexts/IngredientContext";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { FormValues } from "../DrinkForm/formTypes";
import { DrinkIngredientForm } from "../DrinkForm/DrinkIngredientForm";

export const DrinkEditForm = () => {
  const [thisDrink, setThisDrink] = useState<IDrink>(useLocation().state.drink)
  const [potentialIngredients, setPotentialIngredients] = useContext(IngredientContext)

  const formatIngredientsForForm = () => {
    console.log(thisDrink.Ingredients)
    return thisDrink.Ingredients?.map((ingredient)  => {
      return {
        amount : ingredient.DrinkIngredient!.amount,
        measurement : ingredient.DrinkIngredient!.measurement, 
        ingredient : ingredient.name
      }
    })
  }

  const methods  = useForm<FormValues>({
    defaultValues: {
      drinkName : "",
      glass : thisDrink.glass,
      method : thisDrink.method,
      ingredients: formatIngredientsForForm()
    },
    mode: "onBlur"
  });

  const { register, control, reset, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

  const ingredientFormProps = {fields, append, remove, potentialIngredients}

  type drinkProperty = 'glass' | 'method' | 'Ingredients'
  const updateDrink = (property : drinkProperty, updatedValue : string | Array<IIngredient>) => {
    const updatedField = {property : updatedValue}
    const updatedDrink : IDrink = {...thisDrink, ...updatedField}
    setThisDrink(updatedDrink) 
  }

  return(
  <Container component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
    <Box  marginBottom="10px;" display={'flex'}>
      <Typography component={'h1'} variant={'h4'}>{thisDrink.name}</Typography>
    </Box>
    <Box display={'flex'} alignItems={'center'}> </Box>
    <FormProvider {...methods}>
    <Typography>Glass:</Typography>
    <TextField
      margin="normal"
      id="glass"
      label="Glass"
      {...register(`glass` as const, {
        required: true
      })}
    />
    <Typography>
      Method: 
    </Typography>
    <TextField
      margin="normal"
      id="method"
      label="Method"
      {...register(`method` as const, {
        required: true
      })}
    />
    <Typography component={'h1'} variant={'h6'} margin="10px;">Recipe</Typography>
    <DrinkIngredientForm 
      ingredientFormProps={ingredientFormProps}
      initialIngredients={formatIngredientsForForm()}
    />
    </FormProvider>
  </Container>
  )
}