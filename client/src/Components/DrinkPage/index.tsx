import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { DrinkCarousel } from "./DrinkCarousel";
import { DrinkSearchBar } from "./DrinkSearchBar";
import { DrinkFinder } from "./DrinkFinder";

import './styles.css'
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../Queries/fetchProfile";



export const DrinkPage = () => {
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

  return (<Container id={"drink-page"} component="main" maxWidth="xs" sx={{padding : '5%'}}>
    <Box>
      <Typography component="h1" variant="h5" maxWidth="xs">
        Here's a few of your recently created Drinks      
      </Typography>
      <DrinkCarousel drinks={drinks} />
    </Box>
    <Box>
      <Typography component="h1" variant ="h5" maxWidth="xs">
        Search for a Drink by Name
      </Typography>
      <DrinkSearchBar drinks={drinks}/>
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