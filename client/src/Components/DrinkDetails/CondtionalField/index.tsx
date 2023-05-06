import { Box, Button, Container, Typography } from "@mui/material"
import { SetStateAction } from "react"
import { DrinkEditInput } from "../DrinkEditInput.tsx"

interface IProps {
  adder : React.Dispatch<SetStateAction<boolean>>,
  addingState : boolean,
  inputSetter : React.Dispatch<SetStateAction<string>> ,
  initialInput : string
  inputState : string
  id :string
}

//renders fields for drinks conditionally, based on whether or not the user is editing
//a drink property and if the drink has the property intially

export const ConditonalField = (props : IProps) => {
  const {adder, addingState, inputSetter, initialInput , inputState , id} = props
  const setAdding = (
    adder : React.Dispatch<SetStateAction<boolean>>,
    addingState : boolean,
    inputSetter : React.Dispatch<SetStateAction<string>> ,
    initialInput : string
  ) => {
    //trigger rendering for given field
    adder(addingState)
    //give the field the initial value of the drinks original property
    inputSetter(initialInput)
  }

  return(<Container sx={{padding:"15px"}}>
    {addingState ? (
      <Box id={id}>
        <DrinkEditInput inputState={inputState} setInputState={inputSetter} />
        <Button onClick={e => adder(!addingState)}>✎</Button>
      </Box>) : 
    initialInput ? (
      <Box id={id}>
        <Typography>{initialInput}</Typography>
        <Button onClick={e => setAdding(adder, !addingState, inputSetter, initialInput || '')}>✎</Button>
      </Box> ) : (
      <Button onClick={e => adder(!addingState)}>Add {id}?</Button>
    )} 
  </Container>)
}