import { useParams, useNavigate } from "react-router-dom"
import { useQueries, useMutation,useQueryClient } from "@tanstack/react-query"
import { Box, Button, Container, Typography } from "@mui/material"

import { IIngredient, IMemoryUser, IUser } from "../../apiTypes"
import { deleteIngredient } from "../../apiServices/ingredientServices"
import { fetchIngredient } from "../../Queries/fetchIngredient"
import { fetchProfile } from "../../Queries/fetchProfile"
import { BrandTable } from "../BrandTable"


export const IngredientDetails = () => {
  const nav = useNavigate()
  const { ingredientName } = useParams()
  const queryClient = useQueryClient()
  const accessToken = localStorage.getItem('accessToken') || ''
  let ingredient : IIngredient | undefined
  let user :  IMemoryUser | undefined

  if (!ingredientName) {
    throw new Error("no name provided to Drink");
  }

  const [ingredientResults, userResults] = useQueries({
    queries: [
      { queryKey: ['ingredient', ingredientName], queryFn: fetchIngredient },
      { queryKey: ['user', accessToken], queryFn: fetchProfile},
    ],
  })
  const mutation = useMutation({
    mutationFn : (ingredientName : string) => deleteIngredient(ingredientName, accessToken), 
    onSuccess : () => {queryClient.invalidateQueries({queryKey :["user", accessToken]});}
  })

  if (ingredientResults.isLoading || userResults.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

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
  
  ingredient = ingredientResults?.data?.res
  user = userResults?.data

  if (!ingredient) {
    throw new Error("ingredient not found");
  }
  console.log(ingredient)
  const { recipe, brands } = ingredient
  const childIngredients  = recipe?.childIngredients || []
  const editIngredient = () => {
    const ingredientRoute = `/ingredients/edit/${ingredientName}`
    nav(ingredientRoute, {state:{ingredient}})
  }

  const removeIngredient = async () => {
    const success = await mutation.mutateAsync(ingredientName)
    nav('/ingredients')
  }

  return (<Container>
    <Box sx={{display : 'flex', justifyContent:'center'}}>
      <Typography component={'h1'} variant="h4">{ingredient.name}</Typography>
      <Button sx={{fontSize: '1em'}} onClick={editIngredient}>✎</Button>
    </Box>
    <Typography component={'h2'} variant="h5">Family: {ingredient.family}</Typography>
    {recipe ? ( <Box>
      <Box>
        <h4>Recipe</h4> 
        {childIngredients.map(child => (
          <Typography key={child.id}>{child.amount} {child.measurement} {child.childIngredientName}</Typography>)
        )}
      </Box>
      <Typography >Recipe Yield: {recipe.yield}</Typography>
      <Typography >Instructions: {recipe.instructions}</Typography>
      </Box>)
      : (brands  && brands.length > 0 &&   
        <Box>
          <Typography variant ='h6'>Brands</Typography>
          <BrandTable brandStates={brands} />
        </Box>
      )
    }
        
    <Button onClick={removeIngredient}>Delete?</Button>
  </Container>)
}