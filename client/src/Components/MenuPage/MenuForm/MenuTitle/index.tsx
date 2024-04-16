import {useState} from 'react'
import { Button, Container, TextField, Typography } from "@mui/material"

interface IProps {
  menuTitleState: [string, React.Dispatch<React.SetStateAction<string>>]
}

export const MenuTitle = ({menuTitleState} : IProps) => {
  const [menuTitle, setMenuTitle] = menuTitleState
  const [addingTitle, setAddingTitle] = useState<boolean>(true)
  
  return(<Container sx={{display : 'flex'}}>
    {addingTitle ? (
    <TextField
      id="outlined-basic"
      label="Menu Title"
      variant="outlined"
      value={menuTitle}
      onChange={e => setMenuTitle(e.target.value)}
    /> ) : (
      <Typography variant ='h4'> {menuTitle}</Typography>
    )} 
    {addingTitle ? (
      <Button onClick={()=>setAddingTitle(!addingTitle)}>Set Title</Button> )
      : ( <Button onClick={()=>setAddingTitle(!addingTitle)}>edit</Button>
      )}
    </Container>
  )
}