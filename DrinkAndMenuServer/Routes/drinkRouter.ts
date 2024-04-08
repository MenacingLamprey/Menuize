import Router, {Request, Response} from 'express'

import { getUserDrink, createDrink, getAllDrinks, editDrink, searchCocktailsByIngredients, getDrink, getPublicDrink, getPublicDrinks, createTestDrinks, getStrippedDrinks } from '../Controllers/drinkContoller'
import { authMiddleware } from '../Middleware/auth'
import { altEditDrink } from '../Controllers/altDrinkEdit';

export const drinkRouter = Router()

drinkRouter.get('/all/:username', getAllDrinks);

drinkRouter.get('/public', getPublicDrinks)

drinkRouter.post('/getDrink',(req : Request, res : Response) => {
  authMiddleware(req, res, getUserDrink)
});

drinkRouter.post('/create', (req : Request, res : Response) => {
  authMiddleware(req, res, createDrink)
})

drinkRouter.patch('/edit', (req,res) => {
  authMiddleware(req, res, editDrink)
})

drinkRouter.patch('/altEdit', (req,res) => {
  authMiddleware(req, res, altEditDrink)
})

drinkRouter.post('/ingredient_search', (req,res) => {
  authMiddleware(req,res,searchCocktailsByIngredients)
})

drinkRouter.get('/drink/:drinkName', getDrink)

drinkRouter.get('/public/getTests', getStrippedDrinks)

drinkRouter.post('/public/createTest', createTestDrinks)