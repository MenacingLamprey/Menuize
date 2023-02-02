import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form";  

import { createDrink } from "../../apiServices/drinkServices"
import { IDrink, IIngredient } from "../../apiTypes"
import useComponentVisible from "../../hooks/useComponentVisible";

import './style.css' 

type FormValues = {
  ingredients: {
    ingredient: string;
    amount: number;
    measurement: string;
  }[];
};

interface IProps {
  potentialIngredients : IIngredient[]
}

export const DrinkForm = ({potentialIngredients} : IProps) => {
  const [drinkName, setDrinkName] = useState('')
  const [description, setDescription] = useState('')
  const [glass, setGlass] = useState('')
  const [numOfIngredients, setNumIngredients] = useState(0)
  const [ingredient, setIngredient] = useState('')
  const [ingredientList, setIngredientList] = useState<IIngredient[]>([])
  const { ref, isComponentVisible,setIsComponentVisible } = useComponentVisible(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      ingredients: [{ ingredient: "ingredient", amount: 0, measurement: 'oz' }]
    },
    mode: "onBlur"
  });
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control
  });

  const clearFields = () => {
    setDrinkName('')
    setGlass('')
    setDescription('')
  }

  const submit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const drink : IDrink = {name : drinkName, description, glass, numOfIngredients}
    clearFields();
    const result = await createDrink(drink)
  }

  const ingredientChange = (textInput : string) => {
    console.log('click')
    setIsComponentVisible(true)
    setIngredient(textInput);
    const ingredientList = potentialIngredients.filter(potentialIngredient => {
      return potentialIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
    })
    setIngredientList(ingredientList)
  }
  
  return(<form id ={'drink-form'} onSubmit={e => submit(e)}>
    <label>Drink Name</label>
    <input
      name ={drinkName}
      value = {drinkName}
      onChange = {(e) =>{setDrinkName(e.target.value)}}
    />
    <label>Glassware</label>
    <input
      name ={glass}
      value = {glass}
      onChange = {(e) =>{setGlass(e.target.value)}}
    />
    <label>Description</label>
    <input
      name ={description}
      value = {description}
      onChange = {(e) =>{setDescription(e.target.value)}}
    />
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
              value = {ingredient}
              onChange={e => ingredientChange(e.target.value)}
              placeholder="ingredient"
              className={errors?.ingredients?.[index]?.ingredient ? "error" : ""}
            />
            <div ref={ref}>
              <ul className="ingredient-list">
                {isComponentVisible && ingredientList.map(ingredient => (
                  <li className = 'ingredient-choice' onClick={e => ingredientChange(ingredient.name)}>{ingredient.name}</li>)
                )}
              </ul>
            </div>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </section>
        </div>
      );
    })}
    <button
      type="button"
      onClick={() =>
        append({
          ingredient: "",
          amount: 0,
          measurement: 'oz'
        })
      }
    >
      append ingredient
    </button>
    <button type="submit">Submit</button>
  </form>)
}