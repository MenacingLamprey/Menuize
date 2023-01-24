import { Request, Response } from "express";
import { Ingredient } from "../Models/Ingredient";

export const createIngredient = async (req : Request, res : Response) => {
    try {
        const { ingredient } = req.body
        const new_ingredient = await Ingredient.create(ingredient)
        res.status(201).send({error : false, res :new_ingredient})
    } catch (e) {
        console.log(e)
        res.status(500).send({error : true, res : "Error Creating Ingredient"})
    }
}

export const getAllUserIngredients = async (req: Request, res :Response) => {
    try {
        const {userId} =  req.params;
        const ingredients = await Ingredient.findAll({ where : {userId}});
        res.status(200).send({error : false, res : ingredients})
    } catch (e) {
        res.status(500).send({error : true, res : "Error Getting All Ingredients"})
    }
}