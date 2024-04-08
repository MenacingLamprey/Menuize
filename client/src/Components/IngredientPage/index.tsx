import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { IngredientSearchBar } from "./IngredientSearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../Queries/fetchProfile";

export const IngredientPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken') || ''
  
  if (!accessToken) {
    throw new Error("no access token found");
  }

  const results = useQuery({queryKey :["user", accessToken], queryFn:  fetchProfile});

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
  const {drinks, ingredients} = results.data

  return (<div id ={"ingredient-page"}>
    <Box>
      <Typography component="h1" variant ="h5" maxWidth="xs">
        Search for a Drink by Name
      </Typography>
      <IngredientSearchBar ingredients={ingredients} />
    </Box>
    <Box>
      <Button 
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={ e => navigate("/ingredient-form")}
        > 
          Create New Ingredient?
      </Button>
    </Box>
  </div>)
}