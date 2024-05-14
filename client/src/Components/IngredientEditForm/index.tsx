import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { IBrand, IIngredient } from "../../apiTypes"
import { editIngredient } from "../../apiServices/ingredientServices"
import { BrandTable } from "../BrandTable"

export const IngredientEditForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const [thisIngredient] = useState<IIngredient>(useLocation().state.ingredient) 
  console.log(thisIngredient.brands)
  const [brands, setBrands] = useState<IBrand[]>(thisIngredient.brands || [])
  const [newFamily, setNewFamily] = useState<string>(thisIngredient.family || "")
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  interface IUpdates {newFamily : string, updatedbrands? : IBrand[]}
  const mutation = useMutation({
    mutationFn : (updates : IUpdates) => editIngredient(thisIngredient.name, updates, accessToken),
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
    const updates = {brands, newFamily}
    const result = await mutation.mutateAsync(updates)
    navigate(-1)
  }

  const editRecipe = () => {
    navigate(`/ingredients/add-recipe/`, {state:{ingredient :  thisIngredient}})
  }

  const addBrand = () => {
    navigate(`/brand-form/${thisIngredient.name}`)
  }

  console.log(brands)

  return(<Container 
      component={'form'} 
      maxWidth="xs"
      sx={{display : 'flex', flexDirection :'column', alignItems : 'center'}}>
    <Typography component={'h1'} variant="h4">{thisIngredient.name}</Typography>
    <Box sx ={{display : 'flex', flexDirection : 'column'}}>
    <TextField
      sx={{width :'60%', alignSelf :'center'}}
      margin="normal"
      id="family"
      label="Family"
      value={newFamily}
      onChange={(e) => setNewFamily(e.target.value)}
    />
    {thisIngredient.recipe?.childIngredients ? (<Box>
    <Box >
      Recipe: {thisIngredient.recipe?.childIngredients?.map(ingredient=> (
      <Typography key={ingredient.id}>{ingredient.childIngredient}</Typography>
    ))}
    </Box> 
    <Button onClick={editRecipe}>Edit Recipe</Button>
    </Box>): (
      <Button onClick={editRecipe}>Add Recipe</Button>
    )}
    {thisIngredient.brands && thisIngredient.brands.length > 0 && <Box>
      <BrandTable brandStates={brands} setBrandStates={setBrands}/>
    </Box>
    }
    <Button onClick ={addBrand}>Add Brands</Button>
    <Button onClick={submit}>Submit</Button>
    </Box>
  </Container>)
}