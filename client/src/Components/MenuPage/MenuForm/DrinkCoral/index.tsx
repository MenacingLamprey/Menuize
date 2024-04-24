import { useState } from "react"
import { Container, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import { IDrink } from "../../../../apiTypes"
import { DrinkSearchBar } from "../../../DrinkPage/DrinkSearchBar"
import { fetchProfile } from "../../../../Queries/fetchProfile"

interface IProps {
  menuDrinksState: [IDrink[], React.Dispatch<React.SetStateAction<IDrink[]>>]
}

export const DrinkCoral = ({menuDrinksState} : IProps) => {
  const [menuDrinks, setMenuDrinks] = menuDrinksState
  const [searchableDrinks, setSearchableDrinks] = useState<IDrink[]>([]) 
  const accessToken = localStorage.getItem('accessToken') || ''
  const results = useQuery({queryKey :["user", accessToken], queryFn : fetchProfile});

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
  const allDrinks = user.drinks

  const handleDrinkSelect = (drink : string) => {
    setMenuDrinks(prev => [...prev, allDrinks.find(d => d.name === drink)!])
    const searchDrinks = allDrinks.filter(drink => {
      return menuDrinks.map(menuDrink => {
        drink.name == drink.name
      }).length > 0
    })
    setSearchableDrinks(searchDrinks)
  } 

  return (<Container sx={{display : 'flex', flexDirection :'column', alignItems :'center'}}>
    <Typography variant="h5">Search</Typography>
    <DrinkSearchBar drinks={allDrinks} addDrink={drinkName => handleDrinkSelect(drinkName)}/>
  </Container>)
} 