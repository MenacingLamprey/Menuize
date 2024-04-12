import { useState } from "react"

import { createIngredient } from "../../../apiServices/ingredientServices"
import { IIngredient } from "../../../apiTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import "./styles.css"

export const IngredientForm = () => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const queryClient = useQueryClient();
  const [ingredientName, setIngredientName] = useState('')
  const [family, setFamily] = useState('')

  const mutation = useMutation({
    mutationFn : (newIngredient  : IIngredient,) => createIngredient(newIngredient, accessToken), 
    onSuccess : () => {queryClient.invalidateQueries({queryKey :["user", accessToken]});}
  })
  
  if (mutation.isPending) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error</span>;
  }

  if (mutation.isSuccess) {
    return (<div>
      <span>Post submitted!</span>
    </div>)
  }

  const submit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIngredientName('')
    setFamily(family)
    const ingredient : IIngredient = {name : ingredientName, family}
    const accessToken = localStorage.getItem('accessToken')
    const result = accessToken && await createIngredient(ingredient, accessToken)
  }

  const validateForm = ()  => {
    return (
      ingredientName.length < 2  
    );
  };

  return(<form id ={"ingredient-form"} onSubmit={e => submit(e)}>
    <label>Ingredient Name</label>
    <input
      className={"ingredient-input"}
      name ={ingredientName}
      value = {ingredientName}
      onChange = {(e) =>{setIngredientName(e.target.value)}}
    />
    <label>Family</label>
    <input
      className={"ingredient-input"}
      name ={family}
      value = {family}
      onChange = {(e) =>{setFamily(e.target.value)}}
    />
    <button id ={"ingredient-submit"} type="submit" disabled={validateForm()}>Submit</button>
  </form>)
}