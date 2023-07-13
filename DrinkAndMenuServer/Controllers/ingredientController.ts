import { Request, Response, raw } from "express";
import { Ingredient } from "../Models/Ingredient";
import { RequestWithUser } from "../Middleware/auth";
import { User } from "../Models/User";
import { IngredientFamily } from "../Models/IngredientFamily";
import { IIngredient, IRecipeIngredient } from "../Models/modelTypes";
import { RecipeIngredient } from "../Models/RecipeIngredient";


export const createIngredient = async (req : RequestWithUser, res : Response) => {
  try {
    if (req.user){
      const { ingredient } = req.body
      const {family} = ingredient
      const userId = req.user.getDataValue('uid')
      const new_ingredient = await Ingredient.create({...ingredient, userId})
      await IngredientFamily.findCreateFind({where : {name : family}})
      return res.status(201).send({error : false, res :new_ingredient})
    }
      res.status(404).send({ error : true, res: 'Resource not found' });
    } catch (e){
      console.log(e)
      res.status(500).send({error : true, res : "Error Creating Ingredient"})
    }
}

export const getAllUserIngredients = async (req: Request, res :Response) => {
  try {
    const { username } = req.params
    User.findOne({where : {username}})
    .then(data => {
      console.log(data)
      return data?.getIngredients({attributes :["name", "family", "id"]})
    })
    .then(ingredients => {
      res.status(200).send({error : false, res : ingredients})
    })
    .catch(e=> res.status(500).send({error : true, res : e}))
  } catch (e) {
    res.status(500).send({error : true, res : "Error Getting All Ingredients"})
  }
}

export const editIngredient = async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    const { ingredientName, newFamily } = req.body
    console.log(ingredientName, newFamily)
    const updatedIngredient = await Ingredient.update({family : newFamily}, {where : {userId, name :ingredientName}})
    IngredientFamily.findCreateFind({where : {name : newFamily}})
    return res.status(200).send({error : false, res : updatedIngredient})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Editing Ingredient"})
  }
}

export const getIngredient = async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    const { ingredientName } = req.params

    const rawIngredient = await Ingredient.findOne({
      where : {name:ingredientName, userId},
      include : [{model : Ingredient, as : 'childIngredients', attributes : ['name', 'id']}]
    });
    const {id, name, family, instructions, yield : recipeYield} = rawIngredient!.dataValues
    const childrenIngredients = rawIngredient?.dataValues?.childIngredients?.map((child : IIngredient) => {
      return {
        ingredient : child.name,
        measurement : child.RecipeIngredient?.measurement,
        amount : child.RecipeIngredient?.amount
      }
    })
    console.log(recipeYield)
    const ingredient = {id, name, family, instructions, childrenIngredients, yield : recipeYield}
    return res.status(200).send({error : false, res : ingredient })
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Getting Ingredient"})
  }
}

export const getAllFamilies = async (req : Request, res : Response) => {
  try{
    const families = await IngredientFamily.findAll();
    return res.status(200).send({error : false, res : families})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Getting All Families"})
  }
}

export const deleteIngredient = async (req : RequestWithUser, res : Response) => {
  try{
    const userId = req.user!.getDataValue('uid')
    const { ingredientName } = req.params
    console.log(req.params)
    const deletedIngredient = await Ingredient.destroy({where : {userId, name : ingredientName}})
    return res.status(200).send({error : false, res : deletedIngredient})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Deleting Ingredient"})
  }
}

export const addRecipeToIngredient = async (req : RequestWithUser, res : Response) => {
  try {
    const userId = req.user!.getDataValue('uid')
    const { ingredientId } = req.params
    const { recipe, details }  = req.body
    const { recipeYield, instructions } = details
    
    await Ingredient.update({instructions, yield : recipeYield}, {where : {userId, id : ingredientId}})
    const savedRecipes = await Promise.all(recipe.map(async (ingredient : IRecipeIngredient, index:number) => {
      const [storedIngredient] = await Ingredient.findOrCreate({where : {name : ingredient.ingredient, family : ingredient.family}})
      const { id } = storedIngredient
      return {...ingredient, childIngredientId : id, IngredientId : parseInt(ingredientId)}
    }))

    await RecipeIngredient.bulkCreate(savedRecipes)
    return res.status(200).send({error : false, res : []})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Adding Recipe To Ingredient"})
  }
}

export const editIngredientRecipe = async (req : RequestWithUser, res : Response) => {
  try{
    const userId = req.user!.getDataValue('uid')
    const { ingredientId } = req.params
    const { recipe, details }  = req.body
    const { recipeYield, instructions } = details
    const result = await Ingredient.update({instructions, yield : recipeYield}, {where : {userId, id : ingredientId}})
    console.log(result)
    const updatedIngredient = await Ingredient.findOne({where : {userId, id : ingredientId}})
    console.log(updatedIngredient)
    const savedRecipes = await Promise.all(recipe.map(async (ingredient : IRecipeIngredient, index:number) => {
      const [storedIngredient] = await Ingredient.findOrCreate({where : {name : ingredient.ingredient, family : ingredient.family}})
      const { id } = storedIngredient
      return {...ingredient, childIngredientId : id, IngredientId : parseInt(ingredientId)}
    }
    ))
    await RecipeIngredient.destroy({where : {IngredientId : parseInt(ingredientId)}})
    await RecipeIngredient.bulkCreate(savedRecipes)
    return res.status(200).send({error : false, res : []})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Editing Ingredient Recipe"})
  }
}

export const getPublicIngredient = async (req : Request, res : Response) => {
  try {
    const { ingredientName } = req.params
    const ingredient = await Ingredient.findOne({where : {name : ingredientName, isPublic : true}})
    return res.status(200).send({error : false, res : ingredient})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Getting Public Ingredient"})
  }
}