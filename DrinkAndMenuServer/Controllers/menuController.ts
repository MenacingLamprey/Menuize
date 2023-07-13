import { Request, Response } from "express";
import { RequestWithUser } from "../Middleware/auth";
import { Menu } from "../Models/Menu"
import { Drink } from "../Models/Drink";
import { IDrink } from "../Models/modelTypes";

export const getCurrentMenu = async (req: RequestWithUser, res: Response) => {
  try{
    const uid = req.user!.getDataValue('uid')
    const menu = await Menu.findOne({
       where: { userId: uid, current: true }, 
       include: {model : Drink, as : 'drinks'} }
      )
    console.log(menu)
    res.status(200).send({res : menu, error : false})
  } catch (e) {
    console.log(e)
    res.status(500).send({error : true, res : 'Error Getting Current Menu'})
  }
}

export const createMenu = async (req: RequestWithUser, res: Response) => {
  try{
    const uid = req.user!.getDataValue('uid')
    const {title, drinks, speaciltyIngredients, current} = req.body
    const drinkIds = drinks.map((drink : IDrink) => drink.id)
    const completeDrinks = await Drink.findAll({where: {id: drinkIds}});
    if (current) {
      await Menu.update({current: false}, {where: {userId: uid}})
    }
    const menu = await Menu.create({title, speaciltyIngredients, userId : uid, current})
    await menu.addDrinks(completeDrinks)
    res.status(200).send({error: 'false' , res :menu})
  } catch (e) {
    console.log(e)
    res.status(500).send({error : true, res : 'Error Creating Menu'})
  }
}