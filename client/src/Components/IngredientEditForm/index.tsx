import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IIngredient } from "../../apiTypes"
import { CurrentIngredientContext } from "../../Contexts/IngredientContext"
import { editIngredient } from "../../apiServices/ingredientServices"

export const IngredientEditForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const [editedIngredient, setEditedIngredient] = useContext(CurrentIngredientContext)
  const [thisIngredient] = useState<IIngredient>(useLocation().state.ingredient || editedIngredient) 
  const [newFamily, setNewFamily] = useState<string>(thisIngredient.family || "")
  const navigate = useNavigate()

  const submit = async () => {
    const result = await editIngredient(thisIngredient.name, newFamily, accessToken)
    if (result == 1) { 
      setEditedIngredient({name: thisIngredient.name, family: newFamily})
      navigate(-1)
    }
  }

  const editRecipe = () => {
    setEditedIngredient(thisIngredient)
    navigate(`/ingredients/add-recipe/`)
  }

  return(<Container component={'form'}>
    <Typography component={'h1'} variant="h4">{thisIngredient.name}</Typography>
    <TextField
      margin="normal"
      id="family"
      label="Family"
      value={newFamily}
      onChange={(e) => setNewFamily(e.target.value)}
    />
    {thisIngredient.childrenIngredients ? (<Box>
     <Box >
      Recipe: {thisIngredient.childrenIngredients?.map(ingredient=><Typography>{ingredient.ingredient}</Typography>)}
    </Box> 
    <Button onClick={editRecipe}>Edit Recipe</Button>
    </Box>): (
      <Button onClick={editRecipe}>Add Recipe</Button>
    )}
    <Button onClick={submit}>Submit</Button>
  </Container>)
}