import { Request, Response } from "express";
import { RequestWithUser } from "../Middleware/auth";
import { Drink } from "../Models/Drink";
import { DrinkIngredient } from "../Models/DrinkIngredient";
import { Ingredient } from "../Models/Ingredient";
import { IIngredient } from "../Models/modelTypes";
import { User } from "../Models/User";
import { sequelize } from "../Models";
import { drinkRouter } from "../Routes/drinkRouter";

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
    res.status(500).send({error : true, res : "Error Getting All Drinks"})
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

export const editDrink = async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    const { name, method ,glass, ingredientChanges, numOfIngredients } = req.body
    await Drink.update({method, glass, numOfIngredients}, {where : {name}, fields :['method','glass','numOfIngredients']})
    const {remove, add} = ingredientChanges;

    if(remove.length){
     await DrinkIngredient.destroy({where:{id :remove}})
    }

    if (add.length){
      const newIngredients = add.filter((ingredient : any) => {
        console.log(ingredient)
        return ingredient.IngredientId < 0
      }).map((ingredient : any) => {
        return {name : ingredient.ingredient, userId, family :''}
      })

      const updatedIngredients = await Ingredient.bulkCreate(newIngredients)
      const createdIds = updatedIngredients.map((record) => ({id: record.id, name : record.name}));
      add.forEach((ingredient:any)=> {
        if(ingredient.IngredientId < 0) {
          createdIds.forEach((id) => {
            if(ingredient.ingredient == id.name) ingredient['IngredientId'] =  id.id
          })
        }
      })
    }

    await DrinkIngredient.bulkCreate(add)
    const result = await Drink.findOne({where : {name}, include : 'Ingredients' })
    const updatedDrink = {
      name : result?.name,
      glass : result?.glass,
      method : result?.method,
      Ingredients : result?.Ingredients
    }

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

export const getDrink = async (req: Request, res : Response) => {
  try {
    const { drinkName } = req.params
    const drink = await Drink.findOne({where :{name : drinkName}, include:"Ingredients"})
    console.log(drink)
    res.status(200).send(drink)
  } catch (e) {
    res.status(500).send({error : true, res:"Error Getting Drink"})
  }

}