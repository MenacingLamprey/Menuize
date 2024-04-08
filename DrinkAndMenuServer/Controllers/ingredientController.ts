import { Request, Response, raw } from "express";
import { Ingredient } from "../Models/Ingredient";
import { RequestWithUser } from "../Middleware/auth";
import { User } from "../Models/User";
import { IngredientFamily } from "../Models/IngredientFamily";
import { IIngredient, IRecipe, IRecipeIngredient } from "../Models/modelTypes";
import { RecipeIngredient } from "../Models/RecipeIngredient";
import { Recipe } from "../Models/Recipe";


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
      where : {name:ingredientName, isPublic : true},
      include : [{
        model : Recipe, as : 'recipe', 
        include : [{
          model :RecipeIngredient, as : 'childIngredients'
        }]
      }]
    });
    console.log('get ingredient')
    console.log(rawIngredient)
    const {id, name, family, recipe } = rawIngredient!.dataValues
    const ingredient = {id, name, family, recipe}
    console.log(recipe)
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
    const { recipe } : {recipe : IRecipe}  = req.body
    const {childIngredients} = recipe
    const IngredientId = parseInt(ingredientId)
    const parentIngredient = await Ingredient.findByPk(ingredientId, {include : ['recipe']}) 
    if(!parentIngredient) {
      return res.status(403).send({error : true, res :`Ingredient With Id ${ingredientId}, Could Not Be Found`})
    }
    if(parentIngredient.recipe) return res.status(400).send({error : true , res : "Ingredient Already Has Recipe"})

    const savedRecipe = await Recipe.create(recipe)
    let savedChildIngredients : RecipeIngredient[] = []

    if(childIngredients) {
      savedChildIngredients = await RecipeIngredient.bulkCreate(childIngredients)

      savedChildIngredients.forEach(async (ingredient) => {
        const [child] = await Ingredient.findOrCreate({where: {name : ingredient.childIngredientName}})
        await ingredient.setChildIngredient(child)
      })
      await savedRecipe.addChildIngredients(savedChildIngredients)
      await parentIngredient.setRecipe(savedRecipe)
    }
    
    const retunRecipe :IRecipe = {...savedRecipe, childIngredients : savedChildIngredients, ingredientId: IngredientId}
    console.log(retunRecipe)
    return res.status(200).send({error : false, res : retunRecipe})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Adding Recipe To Ingredient"})
  }
}

export const editIngredientRecipe = async (req : RequestWithUser, res : Response) => {
  try{
    const userId = req.user!.getDataValue('uid')
    const { ingredientId } = req.params
    const { recipe }  = req.body
   
    const savedParentIngredient = await Ingredient.findByPk(ingredientId, {
      include : [{ 
        model : Recipe,
        as :'recipe',
        include : [{
          model : RecipeIngredient,
          as : 'childIngredients'
        }]
      }]
    })
    if(!savedParentIngredient) return res.status(403).send({error : true, res : "Couldn't find Ingredient"})
    const {recipe : savedRecipe} = {...savedParentIngredient}
    if(!savedRecipe) return res.status(403).send({error : true, res : "No Recipe Found"})
    await savedRecipe.update(recipe)
    await RecipeIngredient.destroy({where: {recipeId : savedRecipe.id}})

    const savedChildIngredients = await RecipeIngredient.bulkCreate(recipe.childIngredients)

    savedChildIngredients.forEach(async (ingredient) => {
      const [child] = await Ingredient.findOrCreate({where: {name : ingredient.childIngredientName}})
      await ingredient.setChildIngredient(child)
    })
    savedRecipe.addChildIngredients(savedChildIngredients)
    await savedParentIngredient.setRecipe(savedRecipe)
    console.log(savedParentIngredient)
    res.status(201).send({error : false, res : savedParentIngredient.recipe})

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