import { useContext } from 'react';
import { useFieldArray, useForm, FormProvider} from 'react-hook-form'
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { addRecipeToIngredient, editIngredientRecipe } from '../../../apiServices/ingredientServices';
import { CurrentIngredientContext, IngredientContext } from '../../../Contexts/IngredientContext';
import { IFormIngredient } from '../../DrinkForm/formTypes';
import { DrinkIngredientForm } from '../../DrinkForm/DrinkIngredientForm';
import { IIngredient } from '../../../apiTypes';
import { useNavigate } from 'react-router-dom';

export type FormValues = {
  instructions: string;
  recipeYield: string;
  ingredients: IFormIngredient[];
}

export const IngredientRecipeForm = () => {
  const potentialIngredients = JSON.parse(localStorage.getItem('ingredients') || "") as IIngredient[] || useContext(IngredientContext)[0]
  const [editedIngredient, setEditedIngredient] = useContext(CurrentIngredientContext)
  const navigate = useNavigate()

  const methods  = useForm<FormValues>({
    defaultValues: {
      instructions : editedIngredient.instructions || "",
      recipeYield : '',
      ingredients: editedIngredient.childrenIngredients || []
    },
    mode: "onBlur"
  });

  const { register, control, reset, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});
  const ingredientFormProps = {fields, append, remove, potentialIngredients,register}

  const addFamily = (ingredient : IFormIngredient) => {
    const family = potentialIngredients.find((ing) => ing.name == ingredient.ingredient)?.family || ""
    console.log(potentialIngredients)
    return {...ingredient, family}
  }

  const submit = async (data : FormValues) => {
    const { instructions, recipeYield,ingredients } = data
    console.log(ingredients)
    const recipe = ingredients.map((ing) => addFamily(ing))
    const accessToken = localStorage.getItem('accessToken') || "" 
    const details = {instructions, recipeYield}
    let result : any;
    if(editedIngredient.childrenIngredients?.length){
      result = await editIngredientRecipe(accessToken,recipe,editedIngredient.id || 0, details)
    } else {
      result = await addRecipeToIngredient(accessToken, recipe, editedIngredient.id || 0, details)
    }
    setEditedIngredient({...editedIngredient, childrenIngredients : ingredients})
    navigate(-2)
  }

  return(<Container sx={{maxWidth:450, margin :5}}>
    <Typography component={'h1'} variant='h5'>Add Recipe</Typography>
    <FormProvider {...methods}>
    <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="instructions"
      label="instructions"
      {...register(`instructions` as const, {
        required: true
      })}
    />
    <DrinkIngredientForm ingredientFormProps={ingredientFormProps}/>
    <TextField
      margin="normal"
      required
      fullWidth
      id="recipeYield"
      label="recipeYield"
      {...register(`recipeYield` as const, {
        required: true
      })}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Submit Recipe
    </Button>
  </Box>
  </FormProvider></Container>)
}