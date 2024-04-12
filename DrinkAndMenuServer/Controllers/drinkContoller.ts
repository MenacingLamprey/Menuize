import { Request, Response } from "express";
import { RequestWithUser } from "../Middleware/auth";
import { Drink } from "../Models/Drink";
import { DrinkIngredient } from "../Models/DrinkIngredient";
import { Ingredient } from "../Models/Ingredient";
import { IIngredient } from "../Models/modelTypes";
import { User } from "../Models/User";
import { sequelize } from "../Models";
import { StrippedDrink } from "../Models/StrippedDrink";
import { Menu } from "../Models/Menu";

export const getPublicDrinks = async (req : Request, res : Response) => {
  try {
    const drinks = await Drink.findAll({where : {isPublic : true}, include : 'Ingredients'})
    res.status(200).send({error : false, res : drinks})
  } catch (e) {
    res.status(500).send({error : true, res : "Error Getting Public Drinks"})
  }
}

export const getUserDrink = async (req : RequestWithUser, res :Response) => {
  try{
    const { drinkName } = req.body
    const userId = req.user?.getDataValue('uid')
    const drink = await Drink.findOne({
      where : {name : drinkName, userId},
      include : [{model : Ingredient , attributes :['name', 'id']}],
      attributes :['name', 'glass', 'description', 'method', 'id']
    });
    console.log(drink)
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
    const {drink, addToMenu} = req.body;
    const {name:drinkName, glass, numOfIngredients, measures, method, Ingredients, isPublic} = drink
    const userId = req.user!.getDataValue('uid')
    const newDrink = await Drink.create(
      {name : drinkName, glass, numOfIngredients, method, userId, isPublic : true},
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
          (await Ingredient.create({...ingredient, userId, isPublic : true})).id
        )
      }
      await DrinkIngredient.create({...measures[index], DrinkId :newDrink.id, IngredientId : id})
    })
    if (addToMenu) {
      const menu = await Menu.findOne({where : {inProgress : true}})
      console.log(menu)
    }
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
    const {remove, add, changed} = ingredientChanges;
    let updatedIngredients : IIngredient[] = []
    if(remove.length){
     await DrinkIngredient.destroy({where:{id :remove}})
    }

    if (add.length){
      const newIngredients = add.filter((ingredient : any) => {
        return ingredient.IngredientId < 0
      }).map((ingredient : any) => {
        return {name : ingredient.ingredient, userId, family :''}
      })

      const addedIngredients = await Ingredient.bulkCreate(newIngredients)
      updatedIngredients = addedIngredients.map((ingredient : any) => {
        return {
          id : ingredient.id,
          name : ingredient.name,
          family : ingredient.family,
          isPublic : ingredient.isPublic || false,
          isUnique : ingredient.isUnique
        }
      })
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

    changed.forEach(async (ingredient : any) => {
      await DrinkIngredient.update(ingredient, {where : {IngredientId : ingredient.IngredientId, DrinkId : ingredient.DrinkId}})
    })

    const result = await Drink.findOne({where : {name}, include : 'Ingredients' })
    const updatedDrink = {
      name : result?.name,
      glass : result?.glass,
      method : result?.method,
      Ingredients : result?.Ingredients
    }
    res.status(200).send({error : false, res : {updatedDrink, updatedIngredients}})
  } catch (e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Editing Drink"})
  }
} 

const suitableCocktails = async(ingredientString : string) : Promise<Drink[] | undefined> => {
  try {
    console.log(ingredientString)
    const [results] = await sequelize.query(
      `SELECT d.name, d.id FROM drinks d
        JOIN "drinkIngredients" di ON di."DrinkId" = d.id
        JOIN ingredients i ON di."IngredientId" = i.id
        WHERE i.name = ANY (ARRAY[${ingredientString}])
        GROUP BY d.name, d.id
        HAVING COUNT(*) = d."numOfIngredients"`  
    )
    return results as Drink[]
  } catch(e) {
    console.log(e)
  }
}

const substituteCocktails = async(ingredientString : string) : Promise<Drink[] | undefined> => {
  try {
    const [results] = await sequelize.query(`
    SELECT * FROM (
      SELECT d.name, d.id, d."numOfIngredients",
      (d."numOfIngredients" - 
        (SELECT COUNT(DISTINCT CASE
          WHEN i.family IN (SELECT i.family 
            FROM ingredients i
            WHERE  
            (${ingredientString}) THEN i.name
          ELSE NULL
          END
        )
      FROM "drinkIngredients" di2
      JOIN ingredients i ON di2."IngredientId" = i.id
      WHERE di2."DrinkId" = d.id)
    ) AS substitution_count
  FROM drinks d
  JOIN "drinkIngredients" di ON di."DrinkId" = d.id
  JOIN ingredients i ON di."IngredientId" = i.id
  WHERE i.name = ANY(ARRAY[${ingredientString}])
     OR (
        i.family = ANY (
          SELECT DISTINCT i2.family
          FROM ingredients i2
           WHERE i2.name = ANY(ARRAY[${ingredientString}])
        )
     )
  GROUP BY d.name, d.id, d."numOfIngredients"
) subquery
WHERE substitution_count = 1;
  `)
  console.log(results)
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
    //const substitutes = await substituteCocktails(ingredientString);
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
    console.log(drinkName)
    const drink = await Drink.findOne({where :{name : drinkName}, include:"Ingredients"})
    console.log(drink)
    res.status(200).send(drink)
  } catch (e) {
    res.status(500).send({error : true, res:"Error Getting Drink"})
  }
}

export const getPublicDrink = async (req: Request, res : Response) => {
  try {
    const { drinkName } = req.params
    const drink = await Drink.findOne({where :{name : drinkName, isPublic : true}, include:"Ingredients"})
    res.status(200).send({error : false, res : drink})
  } catch (e) {
    res.status(500).send({error : true, res:"Error Getting Drink"})
  }
}

export const createTestDrinks = async (req : Request, res : Response) => {
  try {
    const { drinkName, ingredients } :{drinkName : string, ingredients : string[] } = req.body
    const drink = await StrippedDrink.create({drinkName, ingredients})
    res.status(200).send({error : false, res : drink})

  } catch (e) {
    res.status(500).send({error : true, res:"Error creating Drink"})
    console.log(e)
  }
}

export const getStrippedDrinks = async (req: Request, res : Response) => {
  try {
    const drinks = await StrippedDrink.findAll()
    res.status(200).send({error : false, res : drinks})

  } catch (e) {
    res.status(500).send({error : true, res:"Error creating Drink"})
    console.log(e)
  }
}