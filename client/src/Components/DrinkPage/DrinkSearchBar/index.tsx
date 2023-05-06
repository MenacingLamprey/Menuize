import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { IDrink } from "../../../apiTypes";
import './styles.css'
import { Container, List } from "@mui/material";
import { DrinkLink } from "../../DrinkLink";

interface IProps {
  drinks : IDrink[]
}

export const DrinkSearchBar = ({drinks} : IProps) => {
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
    <TextField
      id="search-bar"
      className="text"
      onChange={(e) => {
        setSearchQuery(e.target.value.toLowerCase());
      }}
      label="Enter your Drink Name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
  {SearchQuery.length > 1 && <List>
    {filterData(SearchQuery, drinks.map((drink) => drink.name)).map(item => (
      <li id={'drink-search-item'}><DrinkLink drinkName={item}/></li>)
    )}
  </List>}
  </Container>
  )
} 