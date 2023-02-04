import { IIngredient } from "../../../../apiTypes";
import useComponentVisible from "../../../../hooks/useComponentVisible";
import { UseFormGetValues, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { useEffect } from "react";

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
  visible : boolean
  index : number
  setValue : Function
  inputIngredient : string
  getValues : UseFormGetValues<FormValues>
  trigger: UseFormTrigger<FormValues>
  selectionIngredientList : string[]
}

export const IngredientSelector = (props : IProps) => {
  const { potentialIngredients, visible, index, setValue, inputIngredient, selectionIngredientList } = props
  const { ref } = useComponentVisible(true);

  const selectFromList = (ingredient : string, index : number) => {
    setValue(`ingredients.${index}.ingredient`, ingredient)
  }
  
  return (<div ref={ref}>
    <ul className="ingredient-list" >
      {selectionIngredientList.map(ingredient  => (
        <li className = 'ingredient-choice' onClick={e => selectFromList(ingredient, index)}>{ingredient}</li>)
      )}
    </ul>
  </div>
)}