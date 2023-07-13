import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { IIngredient, IMemoryUser } from "../../apiTypes";
import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";

import { IngredientSearchBar } from "./IngredientSearchBar";

export const IngredientPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const ingredients = JSON.parse(localStorage.getItem('ingredients') || "") as IIngredient[]

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