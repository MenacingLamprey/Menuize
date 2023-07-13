import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { IIngredient } from "../../apiTypes"
import { deleteIngredient } from "../../apiServices/ingredientServices"
import { Box, Button, Container, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { fetchIngredient } from "../../Queries/fetchIngredient"
import { CurrentIngredientContext } from "../../Contexts/IngredientContext"

export const IngredientDetails = () => {
  const nav = useNavigate()
  const { ingredientName } = useParams()
  const [editedIngredient] = useContext(CurrentIngredientContext)

  let ingredient : IIngredient | undefined
  if(editedIngredient.name != ingredientName) {
    if (!ingredientName) {
      throw new Error("no name provided to Drink");
    }

    const results = useQuery(["ingredient", ingredientName], fetchIngredient);
    if (results.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      );
    }

    ingredient = results?.data?.res
  } else {
    ingredient = editedIngredient
  }

  if (!ingredient) {
    throw new Error("ingredient not found");
  }

  const editIngredient = () => {
    const ingredientRoute = `/ingredients/edit/${ingredientName}`
    nav(ingredientRoute, {state:{ingredient}})
  }

  const removeIngredient = async () => {
    await deleteIngredient(ingredientName, localStorage.getItem('accessToken') as string || "")
    const allIngredients = JSON.parse(localStorage.getItem('ingredients') || "[]") as IIngredient[]
    const newIngredients = allIngredients.filter((ing) => ing.name != ingredientName)
    localStorage.setItem('ingredients', JSON.stringify(newIngredients))
    nav('/ingredients')
  }



  return (<Container>
    <Box sx={{display : 'flex', justifyContent:'center'}}>
      <Typography component={'h1'} variant="h4">{ingredient.name}</Typography>
      <Button sx={{fontSize: '1em'}} onClick={editIngredient}>✎</Button>
    </Box>
    <Typography component={'h2'} variant="h5">Family: {ingredient.family}</Typography>
    {ingredient.childrenIngredients?.length ? ( <Box>
      <Box>
        <h4>Recipe</h4> 
        {ingredient.childrenIngredients.map(child => (
          <Typography key={child.id}>{child.amount} {child.measurement} {child.ingredient}</Typography>)
        )}
      </Box>
      <Typography >Recipe Yield: {ingredient.yield}</Typography>
      <Typography >Instructions: {ingredient.instructions}</Typography>
      </Box>)
      : (<Typography/>)
      }
    <Button onClick={removeIngredient}>Delete?</Button>
  </Container>)
}