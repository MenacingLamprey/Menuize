import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { IDrink, IIngredient } from "../../apiTypes"
import { useContext, useState } from "react";
import { IngredientContext } from "../../Contexts/IngredientContext";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { FormValues, IFormIngredient } from "../DrinkForm/formTypes";
import { DrinkIngredientForm } from "../DrinkForm/DrinkIngredientForm";
import { formatIngredients } from "../../utils/drinkFormating";
import { editDrink } from "../../apiServices";
import { IngredientList } from "../IngredientPage/IngredientList";
import { difference } from "./findChanges";

export const DrinkEditForm = () => {
  const [thisDrink, setThisDrink] = useState<IDrink>(useLocation().state.drink)
  const [potentialIngredients, setPotentialIngredients] = useContext(IngredientContext)
  const navigate = useNavigate()
  const formatIngredientsForForm = () => {
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
      drinkName : thisDrink.name,
      glass : thisDrink.glass,
      method : thisDrink.method,
      ingredients: formatIngredientsForForm()
    },
    mode: "onBlur"
  });

  const { register, control, reset, handleSubmit, getValues} = methods
  const { fields, append, remove } = useFieldArray({name: "ingredients", control});

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
    const returnObject :any = {name : drinkName, drinkId : thisDrink.id}
    if(thisDrink.method != method) returnObject['method'] = method
    if(thisDrink.glass != glass) returnObject['glass'] = glass
    const {add, remove} = difference(formatIngredientsForForm(), ingredients, "ingredient")
    returnObject['add'] = add
    returnObject['remove']=remove
    return returnObject
  }

  const submit = async (data : FormValues) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const changes = {name : data.drinkName, ...getDrinkChanges(data)}
    const {add, remove} = changes

    const updatedAdd = add?.map((ingredient : IFormIngredient) => {
      return appendIngredientId(ingredient)
    })

    const updatedRemoved = remove?.map((ingredient : IFormIngredient) => {
      return getDrinkIngredientIdsToRemove(ingredient)
    })

    changes['ingredientChanges'] = {add : updatedAdd, remove:updatedRemoved}
     await editDrink(changes, accessToken)
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