import { Container, Typography } from "@mui/material"
import { IDrink } from "../../../../apiTypes"
import { DrinkSearchBar } from "../../../DrinkPage/DrinkSearchBar"
import { useState } from "react"

interface IProps {
  menuDrinksState: [IDrink[], React.Dispatch<React.SetStateAction<IDrink[]>>]
}

export const DrinkCoral = ({menuDrinksState} : IProps) => {
  const [menuDrinks, setMenuDrinks] = menuDrinksState
  const allDrinks : IDrink[] = localStorage.getItem('drinks') ? JSON.parse(localStorage.getItem('drinks')!) : []
  const [searchableDrinks, setSearchableDrinks] = useState<IDrink[]>(allDrinks)

  const handleDrinkSelect = (drink : string) => {
    setMenuDrinks(prev => [...prev, allDrinks.find(d => d.name === drink)!])
    setSearchableDrinks(prev => prev.filter(d => d.name !== drink))
  }

  return (<Container>
    <Typography variant="h4">Drink Coral</Typography>
    <DrinkSearchBar drinks={searchableDrinks} onSelect={handleDrinkSelect}/>
  </Container>)
}