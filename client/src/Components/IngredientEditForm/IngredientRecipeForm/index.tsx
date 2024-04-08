import { useState } from 'react';
import { useFieldArray, useForm, FormProvider} from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { editRecipe } from '../../../apiServices/ingredientServices';
import { IFormIngredient } from '../../DrinkForm/formTypes';
import { DrinkIngredientForm } from '../../DrinkForm/DrinkIngredientForm';
import { IIngredient, IRecipe, IRecipeIngredient } from '../../../apiTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../../Queries/fetchProfile';

export type FormValues = {
  instructions: string;
  recipeYield: string;
  ingredients: IFormIngredient[];
}

export const IngredientRecipeForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const navigate = useNavigate()
  const [thisIngredient] = useState<IIngredient>(useLocation().state.ingredient) 
  const queryClient = useQueryClient()
  const results = useQuery({ queryKey: ['user', accessToken], queryFn: fetchProfile})

  const mutation = useMutation({mutationFn : (recipe : IRecipe) => {
    return editRecipe(accessToken, recipe, thisIngredient.id || -1, thisIngredient.recipe?.childIngredients.length! > 0 || false)
  }, 
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey :["ingredient", thisIngredient.name]});
      queryClient.invalidateQueries({queryKey :["user", accessToken]});
    }
  })

  const formatIngredientsForForm = (ingredients : IRecipeIngredient[]) => {
    return ingredients.map((ingredient)  => {
      return {
        amount : ingredient.amount,
        measurement : ingredient.measurement, 
        ingredient : ingredient.childIngredientName
      }
    })
  }
  

  const methods  = useForm<FormValues>({
    defaultValues: {
      instructions : thisIngredient.recipe?.instructions || "",
      recipeYield : thisIngredient.recipe?.yield,
      ingredients: formatIngredientsForForm(thisIngredient.recipe?.childIngredients || [])
    },
    mode: "onBlur"
  });

  const { register, control, handleSubmit} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

  if (mutation.isPending) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error</span>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const user = results?.data
  if (!user) {
    throw new Error("user not found");
  }
  const { ingredients } = user
  if (!ingredients) {
    throw new Error("drink not found");
  }

  const ingredientFormProps = {fields, append, remove, potentialIngredients : ingredients , register}

  const submit = async (data : FormValues) => {
    const { instructions, recipeYield, ingredients } = data
    const ingredientId = thisIngredient.id || -1

    const updatedChildIngredients : IRecipeIngredient[] = ingredients.map((ing) => {
      return {measurement : ing.measurement, amount : ing.amount, childIngredientName : ing.ingredient}
    })

    const recipe : IRecipe = {
      instructions, yield : recipeYield, childIngredients : updatedChildIngredients, ingredientId
    }

    const res = await mutation.mutateAsync(recipe)
    
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
      label="recipe yield"
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