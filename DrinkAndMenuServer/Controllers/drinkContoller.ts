import { Request, Response } from "express";
import { RequestWithUser } from "../Middleware/auth";
import { Drink } from "../Models/Drink";
import { DrinkIngredient } from "../Models/DrinkIngredient";
import { Ingredient } from "../Models/Ingredient";
import { IDrinkIngredient, IIngredient } from "../Models/modelTypes";
import { User } from "../Models/User";
import { sequelize } from "../Models";

export const getUserDrink = async (req : RequestWithUser, res :Response) => {
  try{
    const { drinkName } = req.body
    const userId = req.user!.getDataValue('uid')
    const drink = await Drink.findOne({
      where : {name : drinkName, userId},
      include : [{model : Ingredient , attributes :['name', 'id']}],
      attributes :['name', 'glass', 'description', 'method', 'id']
    });
    res.status(200).send({error : false , res : drink})
  } catch (e) {
    console.log(e);
    res.status(500).send({error : true, res :'Error Getting Drink'})
  }
}

export const getAllDrinks =async (req :Request, res :Response) => {
  try {
    const { username } = req.params
      User.findOne({where : {username}})
      .then(data => data?.getDrinks({include : 'Ingredients'}))
      .then(drinks => res.status(200).send({error : false, res : drinks}))
      .catch(e=> res.status(500).send({error : true, res : e}))
  } catch (e) {
    res.status(500).send({error : true, res : "Error Getting All Ingredients"})
  }
}

export const createDrink = async (req : RequestWithUser, res :Response) => {
  try {
    const {name:drinkName, glass, numOfIngredients, measures, method, Ingredients} = req.body;
    const userId = req.user!.getDataValue('uid')
    const newDrink = await Drink.create(
      {name : drinkName, glass, numOfIngredients, method, userId},
    ) 

    await Ingredients.map(async (ingredient : IIngredient, index:number) => {
      //if an id is less than 0, it hasn't been created yet
      //if an id dosen't exist, it may or may not have been registered
      let id: number = ingredient.id || 0
      if(id < 0) {
        ({id} = await Ingredient.create({...ingredient, userId}))
      } else if (id ===0) {
        id = (
          (await Ingredient.findOne({where : {name : ingredient.name}}))?.id || 
          (await Ingredient.create({...ingredient, userId})).id
        )
      }
      await DrinkIngredient.create({...measures[index], DrinkId :newDrink.id, IngredientId : id})
    })
    
    res.status(201).send({error :false, res : newDrink})
  } catch (e) {
    console.log(e);
    res.status(500).send({error : true, res: 'Error Creating Drink'})
  }
}

//utility to strip not edited value fields from response
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const editDrink =async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    //convert array of updated drink fields into a drink object (with potentially missing fields)
    const updatedDrinkFields : Drink  = req.body.filter(notEmpty).reduce((reducedDrink : Drink, field : any) => {
      return {...reducedDrink, ...field}
    },{})

    const { name, Ingredients, id : drinkId } = updatedDrinkFields
    await Drink.update({...updatedDrinkFields}, {where : {name, userId} })
    Ingredients && await DrinkIngredient.destroy({where : {DrinkId : drinkId}}) 
    Ingredients?.forEach(async (ingredient : IIngredient, index : number) => {
      let id: number | undefined = ingredient.id
      const { amount, measurement } = ingredient.DrinkIngredient!
      //if ingredient dosen't already exist, create the ingredient and extract the id
      if(ingredient.id && ingredient.id <= 0){
        const {name, family} = ingredient;
        ({ id } = await Ingredient.create({name, family, userId}))
      }
      DrinkIngredient.create({amount, measurement, DrinkId : drinkId, IngredientId : id })
    })
    const updatedDrink = await Drink.findByPk(drinkId, {include : 'Ingredients'})
    res.status(200).send({error : false, res : updatedDrink})
  } catch (e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Editing Drink"})
  }
} 

const suitableCocktails = async(ingredientString : string) : Promise<Drink[] | undefined> => {
  try {
    const [results] = await sequelize.query(
      `select d.name, d.id from drinks d join
      "drinkIngredients" di
      on di."DrinkId" = d.id join
      ingredients i
      on di."IngredientId" = i.id
      where i.name = any(array[${ingredientString}])
      group by d.name, d.id
      having count(*) =d."numOfIngredients"`   
    )
    return results as Drink[]
  } catch(e) {
    console.log(e)
  }
}

const ingredientArrayToString = (ingredientArray : IIngredient[]) => {
  return ingredientArray.reduce((ingredientStr, ingredient) => {
    return ingredientStr + `'${ingredient.name}', `
  },'').slice(0,-2)
}

export const searchCocktailsByIngredients = async (req : RequestWithUser, res : Response) => {
  try{
    const {ingredients} = req.body
    const ingredientString = ingredientArrayToString(ingredients)
    console.log(ingredientString)
    const drinks = await suitableCocktails(ingredientString);
    if(drinks===undefined) res.status(500).send({error : true, res:'Error in Query'})
    res.status(200).send({error: false, res :drinks})
  } catch(e) {
    res.status(500).send({error : true, res :"Error Searching Cocktails by Ingredients"})
    console.log(e)
  }
}