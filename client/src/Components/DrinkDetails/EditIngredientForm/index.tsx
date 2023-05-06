import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import { FieldArrayWithId, UseFormRegister, FieldErrors } from "react-hook-form";

import { IIngredient } from "../../../apiTypes";
import { IFormIngredient } from "../../DrinkForm/formTypes";

interface IProps {
  potentialIngredients : IIngredient[]
  register :  UseFormRegister<{ingredients : IFormIngredient[]}>
  errors :FieldErrors<{ingredients : IFormIngredient[]}>
  fields : FieldArrayWithId<{ingredients : IFormIngredient[]}>[]
  append : Function
  remove: Function
  setValue : Function
  setInputIngredients : Function
  inputIngredients : string[]
}

export const EditIngredientForm = (props : IProps) => {
  const [selectionIngredientList, setSelectionList] = useState([''])
  const [selectedInputIndex, setSelectedIndex] = useState(0)
  const {potentialIngredients, fields, append, remove, register, errors} = props

  const inputingIngredient = (index : number, textInput : string) => {
    setSelectedIndex(index)
    ingredientChange(textInput)
  }
  
  const ingredientChange = (textInput : string) => {
    const ingredientList = potentialIngredients.filter(potentialIngredient => {
      return potentialIngredient.name.toLowerCase().includes(textInput.toLowerCase())
    }).map(ingredient => ingredient.name)
    setSelectionList(ingredientList)
  }

  return (<Container id ={"ingredient-fields"}>
  <h4>Ingredients</h4>
  {fields.map((field, index) => {
    return (
      <Box key={field.id} >
        <section className={"section"} key={field.id}>
          <Box className={"ingredient-sub"}>
          <label>Amount</label>
          <div>
          <input
            placeholder="0"
            {...register(`ingredients.${index}.amount` as const, {
              valueAsNumber: true,
              required: true
            })}

          />
          </div>
          <Box>
          <TextField
            placeholder="oz"
            {...register(`ingredients.${index}.measurement` as const, {
              required: true
            })}
            className={errors?.ingredients?.[index]?.measurement ? "error" : ""} 
          />
          </Box> 
          </Box>  
          <div className={"ingredient-sub"}>
          <label>Name</label>
          <div>
          <input
            {...register(`ingredients.${index}.ingredient` as const, {
              required: true
            })}
            onChange={(e) => inputingIngredient(index, e.target.value)}
            placeholder="ingredient"
            className={errors?.ingredients?.[index]?.ingredient ? "error" : ""}
          />
          </div>
          <button type="button" className={"delete-ingredient"} onClick={() => remove(index)}>
            Delete
          </button>
          </div>
        </section>
      </Box>
    );
  })}
  <button 
    type="button"
    onClick={() => append({ingredient: "", amount: 0, measurement: 'oz'})}
    id ={"append-ingredient"}>
      append ingredient
  </button>
  </Container>)
}