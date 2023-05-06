import { Box, TextField } from "@mui/material"


interface IProps { 
  inputState : string,
  setInputState : React.Dispatch<React.SetStateAction<string>>,
} 

//input for editing drink properties
export const DrinkEditInput =  (props : IProps) => {
  const {inputState, setInputState} = props

  return(<Box>
    <TextField sx={{height:'5px'}}
      id="drink-edit"
      defaultValue={inputState}
      onChange={e=>{setInputState(e.target.value)}}
    />
  </Box>)
}