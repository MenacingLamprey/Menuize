import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { IIngredient } from "../../apiTypes"
import { editIngredient } from "../../apiServices/ingredientServices"

export const IngredientEditForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const [thisIngredient] = useState<IIngredient>(useLocation().state.ingredient) 
  const [newFamily, setNewFamily] = useState<string>(thisIngredient.family || "")
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn : (family : string) => editIngredient(thisIngredient.name, family, accessToken),
    onSuccess : () => {queryClient.invalidateQueries({queryKey :["ingredient", thisIngredient.name]});}
  },queryClient)

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

  const submit = async () => {
    const result = await mutation.mutateAsync(newFamily)
    navigate(-1)
  }

  const editRecipe = () => {
    console.log(thisIngredient)
    navigate(`/ingredients/add-recipe/`, {state:{ingredient :  thisIngredient}})
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
    {thisIngredient.recipe?.ingredients ? (<Box>
     <Box >
      Recipe: {thisIngredient.recipe?.ingredients?.map(ingredient=><Typography>{ingredient.childIngredient}</Typography>)}
    </Box> 
    <Button onClick={editRecipe}>Edit Recipe</Button>
    </Box>): (
      <Button onClick={editRecipe}>Add Recipe</Button>
    )}
    <Button onClick={submit}>Submit</Button>
  </Container>)
}