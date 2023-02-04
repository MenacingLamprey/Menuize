import { useState } from "react";
import { FieldArrayWithId, UseFormRegister, FieldErrors, UseFormGetValues, UseFormTrigger, UseFieldArrayUpdate } from "react-hook-form";

import { IIngredient } from "../../../apiTypes";
import useComponentVisible from "../../../hooks/useComponentVisible";
import { IngredientSelector } from "./IngredientSelector";

import './style.css' 

type FormValues = {
  drinkName : string
  glass : string
  ingredients: {
    ingredient: string;
    amount: number;
    measurement: string;
  }[];
};

interface IProps {
  potentialIngredients : IIngredient[]
  register :  UseFormRegister<FormValues>
  errors :FieldErrors<FormValues>
  fields : FieldArrayWithId<FormValues, "ingredients", "id">[]
  append : Function
  remove: Function
  setValue : Function
  getValues : UseFormGetValues<FormValues>
  trigger: UseFormTrigger<FormValues>
  update: UseFieldArrayUpdate<FormValues>
}

export const DrinkIngredientForm = (props : IProps) => {
  const [inputIngredients, setInputIngredients] = useState([''])
  const [selectionIngredientList, setSelectionList] = useState([''])
  const {isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  const {potentialIngredients, fields, append, remove, register, errors, setValue, getValues, trigger} = props

  const inputingIngredient = (index : number, textInput : string) => {
    setIsComponentVisible(true)
    const updatedIngredients = [...inputIngredients]
    updatedIngredients[index] = textInput 
    setInputIngredients(updatedIngredients)

    setSelectionList([])
    console.log(selectionIngredientList)
  }

  return ( <div>
  {fields.map((field, index) => {
    return (
      <div key={field.id}>
        <section className={"section"} key={field.id}>
          <input
            placeholder="0"
            {...register(`ingredients.${index}.amount` as const, {
              valueAsNumber: true,
              required: true
            })}
            className={errors?.ingredients?.[index]?.amount ? "error" : ""}
          />
          <input
            placeholder="oz"
            {...register(`ingredients.${index}.measurement` as const, {
              required: true
            })}
            className={errors?.ingredients?.[index]?.measurement ? "error" : ""} 
          />
          <input
            value={inputIngredients[index]}
            {...register(`ingredients.${index}.ingredient` as const, {
              required: true
            })}
            onChange={(e) => inputingIngredient(index, e.target.value)}
            placeholder="ingredient"
            className={errors?.ingredients?.[index]?.ingredient ? "error" : ""}
          />
          <IngredientSelector 
            potentialIngredients={potentialIngredients}
            visible={isComponentVisible}
            index={index}
            setValue={setValue}
            getValues={getValues}
            inputIngredient={inputIngredients[index]}
            trigger={trigger}
            selectionIngredientList = {selectionIngredientList}
          />
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </section>
      </div>
    );
  })}
  <button type="button" onClick={() => append({ingredient: "", amount: 0, measurement: 'oz'})}>
    append ingredient
  </button>
  </div>)
}