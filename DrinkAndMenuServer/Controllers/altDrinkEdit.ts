import { RequestWithUser } from "../Middleware/auth"
import { Response } from "express";
import { Ingredient } from "../Models/Ingredient";
import { IIngredient } from "../Models/modelTypes";




export interface IFormIngredient {
  ingredient: string;
  amount: number;
  measurement: string
}

export type FormValues = {
  drinkName : string
  glass : string
  method : string
  ingredients: IFormIngredient[];
};

export const altEditDrink = async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    const { drink } : {drink : FormValues} = req.body
    const ingredients = drink.ingredients.map(ingredient => {
      return {name : ingredient.ingredient} satisfies IIngredient
    })

    // const recordedIngredients = await Ingredient.bulkCreate(ingredients, {
    //   fields : ['name'],
    //   ignoreDuplicates : true
    // })

    // console.log(recordedIngredients)
    // const recordedNames = recordedIngredients.map(ingredient => ingredient.getDataValue('name'))
    //await Drink.update(drink, {where : {name : drink.drinkName}, fields :['method','glass','numOfIngredients']})
    res.status(200).send({error : false, res : 'success'})
  } catch (e) {
    console.log(e)
  }
}