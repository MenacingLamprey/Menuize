import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

import { IIngredient } from "../../../apiTypes";
import { FormValues } from "../formTypes";

import { IngredientComplete } from "./IngredientComplete";
import './styles.css' 

interface IChildrenProps {
  potentialIngredients : IIngredient[]
  fields : FieldArrayWithId<FormValues, "ingredients", "id">[]
  append : Function
  remove: Function
}

interface IProps {
  ingredientFormProps: IChildrenProps
}

export const DrinkIngredientForm = ({ingredientFormProps} : IProps) => {
  const {potentialIngredients, fields, append, remove} = ingredientFormProps
  const { register } = useFormContext()
  return (<Box>
    <Typography component="p" >Ingredients</Typography>
      {fields.map((field,index) => (
        <Box key={field.id}>
        <Box sx={{display :'flex', flexDirection :"row"}}>
        <TextField 
          label="amount"
          key={field.id+'A'} 
          {...register(`ingredients.${index}.amount` as const, {
            valueAsNumber: true,
            required: true
          })}
        /> 
        <TextField  
          label="measurement"
          defaultValue="oz"
          key={field.id+'M'} 
          {...register(`ingredients.${index}.measurement` as const, {
            required: true
          })}
        />
        </Box>
          <IngredientComplete
            key={field.id+'I'}
            index={index}
            potentialIngredients={potentialIngredients}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
      </Box>
      ))}
    <Button onClick ={() => append({amount :0, measurement: '', ingredient :''})}>Add Ingredient</Button>
  </Box>)
}