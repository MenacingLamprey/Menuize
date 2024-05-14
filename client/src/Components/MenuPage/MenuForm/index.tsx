import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, TextField, Typography } from "@mui/material"

import { createMenu } from "../../../apiServices/menuServices"
import { IDrink, IMenu } from "../../../apiTypes"
import { MenuDrinks } from "./MenuDrinks"
import { MenuTitle } from "./MenuTitle"
import { DrinkCoral } from "./DrinkCoral"


export const MenuForm = () => {
  const navigate = useNavigate()
  const menuDrinksState = useState<IDrink[]>([])
  const menuTitleState = useState<string>('')

  const accessToken = localStorage.getItem('accessToken') || ''
  
  const mutation = useMutation({
    mutationKey : ['menu'],
    mutationFn : (menu : IMenu) => createMenu(accessToken, menu)
  })
  
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

  const onSubmit = async () => {
    const menu : IMenu= {
      title : menuTitleState[0],
      drinks : menuDrinksState[0],
      current : true,
      ingredients : [],
      inProgess : true
    }

    await mutation.mutateAsync(menu)

    navigate(-1)
  }

  return (<Container sx={{padding : 0}}> 
  <Typography variant ='h5'> Create Your Menu </Typography>
    <Box sx={{display : 'flex'}}>
      <Box sx ={{display :'flex', flexDirection : 'column'}}> 
        <MenuTitle menuTitleState={menuTitleState}/>
        {menuDrinksState[0].length> 0 && <Typography variant="h6">Drinks</Typography> }
        <MenuDrinks menuDrinksState={menuDrinksState} />
      </Box>  
      <Box sx={{}}>
        <DrinkCoral menuDrinksState={menuDrinksState} />
      </Box>
    </Box>
    <Button onClick={onSubmit}>Submit</Button>
  </Container>)
}