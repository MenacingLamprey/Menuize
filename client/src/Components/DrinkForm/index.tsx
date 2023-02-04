import { useFieldArray, useForm} from 'react-hook-form'

import { createDrink } from "../../apiServices/drinkServices"
import { IDrink, IIngredient } from "../../apiTypes"
import { DrinkIngredientForm } from "./DrinkIngredientForm";

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
}

export const DrinkForm = ({potentialIngredients} : IProps) => {

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      drinkName : "",
      glass : "",
      ingredients: [{ ingredient: "", amount: 0, measurement: 'oz' }]
    },
    mode: "onBlur"
  });

  const { fields, append, remove, update } = useFieldArray({name: "ingredients", control});

  const submit = async (data : FormValues) => {
    console.log(data)
    reset()
  }
  return(<form id ={'drink-form'} onSubmit={handleSubmit((data) => submit(data))} >
    <label>Drink Name</label>
    <input
      placeholder="name"
      {...register(`drinkName` as const, {
        required: true
      })}
      className={errors?.drinkName ? "error" : ""}
    />
    <label>Glassware</label>
    <input
      placeholder="glass"
      {...register(`glass` as const, {
        required: true
      })}
      className={errors?.glass ? "error" : ""}
    />
    <DrinkIngredientForm
      potentialIngredients={potentialIngredients}
      fields={fields}
      append={append}
      remove={remove}
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      trigger={trigger}
      update={update}
      />
    <button type="submit">Submit</button>
  </form>)
}