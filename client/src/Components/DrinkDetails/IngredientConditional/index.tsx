import { Box, Button, Container, Typography } from "@mui/material"
import { SetStateAction, useState } from "react"
import { DrinkEditInput } from "../DrinkEditInput.tsx"
import { IngredientEditInput } from "./IngredientEditInput/index.js"

interface IProps {
  setAddingStates : React.Dispatch<SetStateAction<boolean[]>>,
  addingStates : boolean[],
  inputSetters : React.Dispatch<SetStateAction<string[]>> ,
  inputStates : string[]
  index: number
}

//renders fields for drinks conditionally, based on whether or not the user is editing
//a drink property and if the drink has the property intially

export const IngredientConditonal = (props : IProps) => {

  const {setAddingStates, addingStates, inputSetters , inputStates, index} = props
  const [isInputting, setIsinputting] = useState(false)
  console.log(inputStates)
  const setAdding = () => {
    //trigger rendering for given field
    const ingredientInputStates = [...addingStates]
    ingredientInputStates[index] = isInputting

    setAddingStates(ingredientInputStates)
    //give the field the initial value of the drinks original property
  }

  return(<Container sx={{padding:"15px"}}>
    {addingStates[index] ? (
      <Box>
        <IngredientEditInput inputStates={inputStates} setInputStates={inputSetters} index ={index}/>
        <Button onClick={setAdding}>✎</Button>
      </Box>) : 
    inputStates[index] && (
      <Box>
        <Typography>{inputStates[index]}</Typography>
        <Button onClick={setAdding}>✎</Button>
      </Box> 
    )
  }
  </Container>)
}