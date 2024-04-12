import { Request, Response } from "express";
import { RequestWithUser } from "../Middleware/auth";
import { Menu } from "../Models/Menu"
import { Drink } from "../Models/Drink";
import { IDrink } from "../Models/modelTypes";

import { Ingredient } from "../Models/Ingredient";

export const getCurrentMenu = async (req: RequestWithUser, res: Response) => {
  try{
    const uid = req.user!.getDataValue('uid')
    const menu = await Menu.findOne({
       where: { userId: uid, current: true }, 
       include: [
        { model : Drink, as : 'drinks', attributes : ['name', 'id'], through: {attributes: []} },
        { model : Ingredient, as : 'ingredients', attributes : ['name', 'id'], through: {attributes: []} }
      ]
    })
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
    const {title, drinks, current, inProgress}  = req.body
    const drinkIds = drinks.map((drink : IDrink) => drink.id)

    const completeDrinks = await Drink.findAll({
      where: {id: drinkIds},
      include : [{
        model : Ingredient,
        where : {isUnique : true},
        attributes : ['name', 'id'],
        through : {attributes : []}
      }],
        attributes : ['name', 'id']
    });


    //select all specialty ingredients and remove duplicates
    const specialtyIngredients = completeDrinks.reduce((ingredients : Ingredient[], drink) => {
      return ingredients.concat(drink.Ingredients || [])
    }, []).filter((ingredient, index, self) => {
      return index === self.findIndex(t => {
        return t.name === ingredient.name
      })
    })

    if (current) {
      await Menu.update({current: false}, {where: {userId: uid}})
    }

    const menu = await Menu.create({title, userId : uid, current, inProgress})
    await menu.addDrinks(completeDrinks)
    await menu.addIngredients(specialtyIngredients)

    res.status(200).send({error: 'false' , res :menu})
  } catch (e) {
    console.log(e)
    res.status(500).send({error : true, res : 'Error Creating Menu'})
  }
}