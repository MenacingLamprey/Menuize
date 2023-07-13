import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { IDrink, IIngredient } from "../../../apiTypes";
import { Container, List } from "@mui/material";
import { DrinkLink } from "../../DrinkLink";
import { IngredientLink } from "../../IngredientLink";

interface IProps {
  ingredients : IIngredient[]
}

export const IngredientSearchBar = ({ingredients} : IProps) => {
  const [SearchQuery , setSearchQuery] = useState("")
 
  const filterData = (query : string, data : string[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  return (<Container>
  <form id="search-form">
    <TextField sx={{width :175}}
      id="search-bar"
      className="text"
      onChange={(e) => {
        setSearchQuery(e.target.value.toLowerCase());
      }}
      label="Ingredient Name"
      variant="outlined"
      placeholder="Search..."
    />
    <IconButton>
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
  {SearchQuery.length > 1 && <List>
    {filterData(SearchQuery, ingredients.map((ingredient) => ingredient.name)).map(item => (
      <li id={'drink-search-item'}><IngredientLink ingredientName={item}/></li>)
    )}
  </List>}
  </Container>
  )
} 