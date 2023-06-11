import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

import { IDrink } from '../../apiTypes';
import { IFormIngredient } from '../DrinkForm/formTypes';
import { fetchUserDrink, editDrink } from "../../apiServices/";
import { formatIngredients } from '../../utils/drinkFormating';
import { clearFields } from './utils';
import { EditIngredientForm } from './EditIngredientForm';
import { ConditonalField } from './CondtionalField';

import './styles.css'

const initialDrink : IDrink= { name :'', glass :'', numOfIngredients :0, Ingredients : [], id:-1}

export const DrinkDetails = () => {
  const [drink, setDrink] = useState(initialDrink)
  const [addingMethod, setAddingMethod] = useState(false)
  const [addingDescription, setAddingDescription] = useState(false)
  const [addingGlass, setAddingGlass] = useState(false)
  const [areIngredientsChanged, setIngredientsChanged] = useState(false)
  const [isEditingIngredients, setIsEditingIngredients] = useState(false)
  const [method, setMethod] = useState(drink.method || "")
  const [description, setDescription] = useState(drink.description || '')
  const [glass, setGlass] = useState(drink.glass)

  const { drinkName } = useParams()

  const {
    control,
    reset,
    handleSubmit,
  } = useForm<{ingredients : IFormIngredient[]}>({ 
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({name: "ingredients", control});
  const accessToken = localStorage.getItem('accessToken') || ''

  useEffect(()=>{
    getUserDrink()
  },[])

  const getUserDrink = async () => {
    const response = await fetchUserDrink(drinkName as string, accessToken)
    const drink : IDrink = response.res
    setDrink(drink)
  }

  const booleanSetters = [setAddingMethod, setAddingDescription, setAddingGlass]
  const inputSetters = [setGlass, setMethod, setDescription]

  //change shape of ingredients from a drink ingredient to a form ingredient
  const formatIngredientsForForm = () => {
    return drink.Ingredients?.map((ingredient)  => {
      return {
        amount : ingredient.DrinkIngredient!.amount,
        measurement : ingredient.DrinkIngredient!.measurement, 
        ingredient : ingredient.name
      }
    })
  }

  const submitChange = async (data: {ingredients: IFormIngredient[]}, drink : IDrink) => {
    //check which fields are being updated
    //if a field is being updated, record its input
    const { ingredients } = data
    const {drinkIngredients, measures} = formatIngredients(ingredients, drink.Ingredients)

    drinkIngredients.forEach((ingredient, index) => {
      ingredient.DrinkIngredient = measures[index]
    })
    //set field to updated field if being updated
    
    const fields = [
      {id : drink.id},
      addingDescription ? {description} :null,
      addingGlass ? {glass} : null,
      addingMethod ? {method} : null,
    ] 

    // include fields being updated when submitting the drink
    const displayDrink = fields.reduce((finalDrink, field ) => {
      return {...finalDrink, ...field}
    },{...drink})
    setDrink(displayDrink)
    const newDrink = await editDrink([{name : drinkName}, ...fields], accessToken)
    clearFields(booleanSetters, inputSetters)
  }

  return (<Container component={'main'} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
    <Typography component={'h1'} variant={'h5'} marginBottom="10px;">{drinkName}</Typography>
    <Box display={'flex'} alignItems={'center'}>
    <Typography>Glass:</Typography>
    <ConditonalField 
      adder={setAddingGlass}
      addingState={addingGlass}
      initialInput={drink.glass}
      inputSetter ={setGlass}
      inputState ={glass}
      id={'glass'}
    />
    </Box>
    <Box display={'flex'}>
    <Typography alignSelf={'center'}>Method:</Typography>
    <ConditonalField 
      adder={setAddingMethod}
      addingState={addingMethod}
      initialInput={drink.method || ""}
      inputSetter ={setMethod}
      inputState ={method}
      id={'method'}
    />
    </Box>
    <h5>Recipe</h5>
    <Box>
      {drink.Ingredients && formatIngredientsForForm()!.map((ingredient,index) => {
        return (<Box display={'flex'} justifyContent={'center'}>
          <Typography>{ingredient.amount} {ingredient.measurement} {ingredient.ingredient}</Typography>
          <Button>✎</Button>
        </Box>
        )
      })}
    </Box>
    <ConditonalField 
      adder={setAddingDescription}
      addingState={addingDescription}
      initialInput={drink.description || ""}
      inputSetter ={setDescription}
      inputState ={description}
      id={'description'}
    />
    <Button onClick={handleSubmit((data) => submitChange(data,drink))}>Submit Changes</Button>
  </Container>)
}