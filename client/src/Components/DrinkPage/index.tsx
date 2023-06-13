import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { IMemoryUser } from "../../apiTypes";
import { DrinkCarousel } from "./DrinkCarousel";
import { DrinkSearchBar } from "./DrinkSearchBar";
import { DrinkFinder } from "./DrinkFinder";
import { useQueryClient } from 'react-query';

import './styles.css'

export const DrinkPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  if(!accessToken){
    return new Error("No access token found")
  }
  const userData = queryClient.getQueryData<IMemoryUser>(["user",accessToken]);
  if(!userData){
    return new Error("User not found")
  }
  
  const {drinks, ingredients} = userData;
  
  return (<Container id={"drink-page"} component="main" maxWidth="xs">
    <Box>
      <Typography component="h1" variant="h5" maxWidth="xs">
        Here's a few of your recently created Drinks      
      </Typography>
      <DrinkCarousel drinks={drinks.slice(9)} />
    </Box>
    <Box>
      <Typography component="h1" variant ="h5" maxWidth="xs">
        Search for a Drink by Name
      </Typography>
      <DrinkSearchBar drinks={drinks} />
    </Box>
    <Box>
    <Typography component="h1" variant ="h5" maxWidth="xs">
      Search for a Drink by Ingredients
    </Typography>
    <DrinkFinder potentialIngredients={ingredients}/>
    </Box>
    <Box>
      <Button 
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={ e => navigate("/drink-form")}
        > 
          Create New Drink?
      </Button>
    </Box>
    {/* <SalesAnalyzer drinks={drinks} ingredients={ingredients}/> */}
  </Container>)
}