import { useEffect } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { IIngredient } from "../../../../apiTypes"
import { FormValues } from "../../formTypes"


interface IProps {
  potentialIngredients : IIngredient[]
  index : number
}

export const IngredientComplete = ( {potentialIngredients,index} : IProps) => {
  const {control, register, setValue} = useFormContext<FormValues>()

  useEffect(() => {
    register(`ingredients.${index}.ingredient`);
  })

  return (
  <Controller
    name={'ingredients'}
    control={control}
    render={({
      field: { ref, ...field },
      fieldState: { error, invalid }
    }) => {
      return (
        <Autocomplete
          options={potentialIngredients.flatMap(ingredient => ingredient.name) || []}
          getOptionLabel={(option) => option}
          freeSolo
          autoSelect
          renderInput={(params) => {
            return <TextField {...params} label="Ingredient" />
          }}
          onChange={(_,data) => setValue(`ingredients.${index}.ingredient`, data as string)}
        />
      )}
    }
   />
  )
}