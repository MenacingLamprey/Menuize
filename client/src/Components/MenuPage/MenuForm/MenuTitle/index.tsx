import {useState} from 'react'
import { Button, Container, TextField } from "@mui/material"

interface IProps {
  menuTitleState: [string, React.Dispatch<React.SetStateAction<string>>]
}

export const MenuTitle = ({menuTitleState} : IProps) => {
  const [menuTitle, setMenuTitle] = menuTitleState
  const [addingTitle, setAddingTitle] = useState<boolean>(true)
  console.log(addingTitle)
  return(<Container sx={{display : 'flex'}}>
    {addingTitle ? (
    <TextField
      id="outlined-basic"
      label="Menu Title"
      variant="outlined"
      value={menuTitle}
      onChange={e => setMenuTitle(e.target.value)}
    /> ) : (
      <h1>{menuTitle}</h1>
    )} 
    {addingTitle ? (
      <Button onClick={()=>setAddingTitle(!addingTitle)}>Set Title</Button> )
      : ( <Button onClick={()=>setAddingTitle(!addingTitle)}>Edit Title</Button>
      )}
    </Container>
  )
}