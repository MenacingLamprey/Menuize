import { Box, TextField } from "@mui/material"


interface IProps { 
  inputStates : string[],
  index : number
  setInputStates : React.Dispatch<React.SetStateAction<string[]>>,
} 

//input for editing drink properties
export const IngredientEditInput =  (props : IProps) => {
  const {inputStates, setInputStates, index} = props

  const changeInput = (input : string) => {
    const inputs = [...inputStates]
    inputs[index] = input
    setInputStates(inputs)
  }

  return(<Box>
    <TextField sx={{height:'5px'}}
      id="drink-edit"
      defaultValue={inputStates[index]}
      autoFocus
      onChange={e=>{changeInput(e.target.value)}}
    />
  </Box>)
}