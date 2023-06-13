import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { fetchIngredient,editIngredient } from '../../apiServices/ingredientServices'
import { IIngredient } from "../../apiTypes"
import { Button, Container, Typography } from "@mui/material"

const initialIngredient : IIngredient = {name :'', family : ''}

export const IngredientDetails = () => {
  const { ingredientName } = useParams()
  const [ingredient, setIngredient] = useState(initialIngredient)
  const [isEditingFamily, setIsEditingFamily] = useState(false)
  const [family, setFamily] = useState(ingredient.family || '')
  const accessToken = localStorage.getItem('accessToken') || ''

  useEffect(() => {
    getIngredient()
  },[])

  const getIngredient = async () => {
    if(ingredientName) {
      const fetchedIngredient = await fetchIngredient(ingredientName, accessToken) 
      setIngredient(fetchedIngredient)
    }
  }

  const updateIngredient = async () => {
    console.log(family)
    await editIngredient(ingredientName || '', family, accessToken)   
  }

  return (<Container>
    <Typography component={'h1'} variant="h4">{ingredient.name}</Typography>  
    <Typography component={'h2'} variant="h5">Family: {ingredient.family}</Typography>
    <Button onClick={updateIngredient} >Submit Changes</Button>
  </Container>)
}