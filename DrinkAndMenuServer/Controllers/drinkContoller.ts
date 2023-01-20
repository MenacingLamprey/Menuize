import { Request, Response } from "express";
import { Drink } from "../Models/Drink";

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
        const drinks = await Drink.findAll({});
        res.status(200).send({error :false, res : drinks})
    } catch (e) {
        res.status(500).send({error : true, res : "Error Getting All Drinks"})
    }
}

export const createDrink = async (req : Request, res :Response) => {
    try {
        const {drinkName} = req.body;
        const newDrink = await Drink.create({name :drinkName})
        res.status(201).send({error :false, res : newDrink})
    } catch (e) {
        console.log(e);
        res.status(500).send({error : true, res: 'Error Creating Drink'})
    }
}

