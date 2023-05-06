import { Request, Response } from "express";
import { Ingredient } from "../Models/Ingredient";
import { RequestWithUser } from "../Middleware/auth";
import { User } from "../Models/User";


export const createIngredient = async (req : RequestWithUser, res : Response) => {
  try {
    if (req.user){
      const { ingredient } = req.body
      const userId = req.user.getDataValue('uid')
      const new_ingredient = await Ingredient.create({...ingredient, userId})
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
    const ingredient = await Ingredient.findOne({where : {userId, name:ingredientName} })
    return res.status(200).send({error : false, res : ingredient})
  } catch(e) {
    console.log(e)
    res.status(500).send({error : true, res : "Error Getting Ingredient"})
  }
}