import { Request, Response } from "express";
import { Ingredient } from "../Models/Ingredient";
import { User } from "../Models/User";

interface RequestWithUser extends Request {
    user?: User
}

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
        console.log(username)
        User.findOne({where : {username}})
        .then(data => data?.getIngredients())
        .then(ingredients => res.status(200).send({error : false, res : ingredients}))
        .catch(e=> res.status(500).send({error : true, res : e}))
    } catch (e) {
        res.status(500).send({error : true, res : "Error Getting All Ingredients"})
    }
}