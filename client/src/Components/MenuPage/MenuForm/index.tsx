import { useState } from "react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { createMenu } from "../../../apiServices/menuServices"
import { IDrink, IIngredient, IMenu } from "../../../apiTypes"
import { MenuDrinks } from "./MenuDrinks"
import { DrinkCoral } from "./DrinkCoral"
import { MenuTitle } from "./MenuTitle"

export const MenuForm = () => {
  const menuDrinksState = useState<IDrink[]>([])
  const menuTitleState = useState<string>('')

  const onSubmit = () => {
    const accessToken = localStorage.getItem('accessToken')
    const menu : IMenu= {
      title : menuTitleState[0],
      drinks : menuDrinksState[0],
      current : true,
      specialtyIngredients : []
    }

    createMenu(accessToken!, menu)
  }

  return (<Container> 
  <h1>Menu Form</h1>
    <Box sx={{display : 'flex'}}>
    <Box> 
    <MenuTitle menuTitleState={menuTitleState}/>
    <Typography variant="h4">Menu</Typography>
    <MenuDrinks menuDrinksState={menuDrinksState} />
    </Box>
    <DrinkCoral menuDrinksState={menuDrinksState} />
    </Box>
    <Button onClick={onSubmit}>Submit</Button>
  </Container>)
}