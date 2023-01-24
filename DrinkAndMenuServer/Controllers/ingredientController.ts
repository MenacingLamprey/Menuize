import { Request, Response } from "express";
import { Ingredient } from "../Models/Ingredient";

export const createIngredient = async (req : Request, res : Response) => {
    const { ingredient } = req.body
    const new_ingredient = await Ingredient.create(ingredient)  
}