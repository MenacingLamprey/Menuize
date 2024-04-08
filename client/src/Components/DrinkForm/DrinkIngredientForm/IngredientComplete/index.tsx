import { useEffect } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { IIngredient } from "../../../../apiTypes"
import { FormValues } from "../../formTypes"


interface IProps {
  potentialIngredients : IIngredient[]
  index : number
}

export const IngredientComplete = ( {index, potentialIngredients} : IProps) => {
  const { register, setValue, getValues} = useFormContext<FormValues>()

  useEffect(() => {
    register(`ingredients.${index}.ingredient`);
  },[])

  const selectE = (index : number) => {
    const value = getValues().ingredients[index].ingredient
    console.log(value)
  }

  return (
        <Autocomplete
          defaultValue={getValues().ingredients[index].ingredient}
          options={potentialIngredients.flatMap(ingredient => ingredient.name) || []}
          getOptionLabel={(option) => option}
          freeSolo
          autoSelect
          onSelect={e => selectE(index)}
          renderInput={(params) => {
            return <TextField {...params} label="Ingredient" />
          }}
          onChange={(_,data) => setValue(`ingredients.${index}.ingredient`, data as string)}
        />
  )
}