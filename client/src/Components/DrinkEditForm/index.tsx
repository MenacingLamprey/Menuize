import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { IDrink, IIngredient } from "../../apiTypes"
import { useContext, useState } from "react";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { FormValues, IFormIngredient } from "../DrinkForm/formTypes";
import { DrinkIngredientForm } from "../DrinkForm/DrinkIngredientForm";
import { editDrink } from "../../apiServices";
import { getDifferences } from "./findChanges"
import { CurrentDrinkContext } from "../../Contexts/DrinkContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../Queries/fetchProfile";

const formatIngredientsForForm = (ingredients : IIngredient[]) => {
  return ingredients.map((ingredient)  => {
    return {
      amount : ingredient.DrinkIngredient!.amount,
      measurement : ingredient.DrinkIngredient!.measurement, 
      ingredient : ingredient.name
    }
  })
}

export const DrinkEditForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const [thisDrink, setThisDrink] = useState<IDrink>(useLocation().state.drink)
  const [_, setEditedDrink] = useContext(CurrentDrinkContext)
  const navigate = useNavigate()

  const results = useQuery({queryKey :["user", accessToken], queryFn :fetchProfile});
  const methods  = useForm<FormValues>({
    defaultValues: {
      drinkName : thisDrink.name,
      glass : thisDrink.glass,
      method : thisDrink.method,
      ingredients: formatIngredientsForForm(thisDrink.Ingredients)
    },
    mode: "onBlur"
  });

  const { register, control, handleSubmit, getValues} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

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

  const { ingredients } = results.data

  const potentialIngredients = ingredients
  const ingredientFormProps = {fields, append, remove, potentialIngredients}

  const appendIngredientId = (ingredient : IFormIngredient)  => {
    const ingredientWithId = {...ingredient, IngredientId :-1, DrinkId : thisDrink.id}
    potentialIngredients.forEach(listedIngredient => {
      if(listedIngredient.name == ingredient.ingredient) {
        ingredientWithId['IngredientId']= listedIngredient.id as number 
      }
    })
    return ingredientWithId
  }

  const getDrinkIngredientIdsToRemove = (ingredient : IFormIngredient) => {
    const ids: number[] = []
    thisDrink.Ingredients.forEach(listedIngredient => {
      if(listedIngredient.name == ingredient.ingredient) {
        ids.push(listedIngredient!.DrinkIngredient!.id as number) 
      }
    })
    return ids
  }

  const getDrinkChanges = (data : FormValues) => {
    let {drinkName, glass, ingredients, method } = data
    const numOfIngredients = ingredients.length
    const returnObject :any = {name : drinkName, drinkId : thisDrink.id , numOfIngredients}
    if(thisDrink.method != method) returnObject['method'] = method
    if(thisDrink.glass != glass) returnObject['glass'] = glass
    const {add, remove, changed} = getDifferences(formatIngredientsForForm(thisDrink.Ingredients), ingredients, "ingredient")
    returnObject['add'] = add
    returnObject['remove']=remove
    returnObject['changed']=changed
    return returnObject
  }

  const submit = async (data : FormValues) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const differences = {name : data.drinkName, ...getDrinkChanges(data)}
    const {add, remove, changed} = differences
    console.log(add, remove, changed)
    const updatedAdd = add?.map((ingredient : IFormIngredient) => {
      return appendIngredientId(ingredient)
    })
    const updatedChanged = changed?.map((ingredient : IFormIngredient) => {
      return appendIngredientId(ingredient)
    })

    const updatedRemoved = remove?.map((ingredient : IFormIngredient) => {
      return getDrinkIngredientIdsToRemove(ingredient)
    })

    differences['ingredientChanges'] = {add : updatedAdd, remove:updatedRemoved, changed : updatedChanged}
    const results = (await editDrink(differences, accessToken)).res
    const {updatedDrink, updatedIngredients} = results
    const allIngredients = [...updatedIngredients, ...potentialIngredients]
    localStorage.setItem('ingredients', JSON.stringify(allIngredients))
    setEditedDrink(updatedDrink)
    navigate(-1)
  }

  return(
    <Container component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
      <Box  marginBottom="10px;" display={'flex'}>
        <Typography component={'h1'} variant={'h4'}>{thisDrink.name}</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }}>
      <FormProvider {...methods}>
      <TextField
        margin="normal"
        id="glass"
        label="Glass"
        {...register(`glass` as const, {
          required: true
        })}
      />
      <TextField
        margin="normal"
        id="method"
        label="Method"
        {...register(`method` as const, {
          required: true
        })}
      />
      <Typography component={'h1'} variant={'h6'} margin="10px;">Recipe</Typography>
      <DrinkIngredientForm ingredientFormProps={ingredientFormProps}/>
      </FormProvider>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
      Create Drink
    </Button>
    </Box>
    </Container>
  )
}