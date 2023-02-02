import { Request, Response } from "express";
import { Drink } from "../Models/Drink";
import { DrinkIngredient } from "../Models/DrinkIngredient";
import { User } from "../Models/User";

export const getDrink = async (req :Request , res : Response ) => {
    try{
        const { name } = req.params
        const drink = await Drink.findOne({where : {name}});
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
            .then(data => data?.getDrinks())
            .then(drinks => res.status(200).send({error : false, res : drinks}))
            .catch(e=> res.status(500).send({error : true, res : e}))
    } catch (e) {
        res.status(500).send({error : true, res : "Error Getting All Ingredients"})
    }
}

export const createDrink = async (req : Request, res :Response) => {
    try {
        const {drinkName, description, glass ,numOfIngredients} = req.body;
        const newDrink = await Drink.create({name :drinkName, description, glass, numOfIngredients})
        res.status(201).send({error :false, res : newDrink})
    } catch (e) {
        console.log(e);
        res.status(500).send({error : true, res: 'Error Creating Drink'})
    }
}

export const addIngredientsToDrink = async (req : Request , res: Response) => {
    try {
        const {drinkIngredients} = req.body
        const addedIngredient = await DrinkIngredient.bulkCreate(drinkIngredients)
    } catch (e) {
        console.log(e)
        res.status(500).send({error : true, res : "Error Adding Ingredients"})
    }
}