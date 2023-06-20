import Router, {Request, Response} from 'express'

import { getUserDrink, createDrink, getAllDrinks, editDrink, searchCocktailsByIngredients, getDrink } from '../Controllers/drinkContoller'
import { authMiddleware } from '../Middleware/auth'

export const drinkRouter = Router()

drinkRouter.get('/all/:username', getAllDrinks);

drinkRouter.post('/getDrink',(req : Request, res : Response) => {
  authMiddleware(req, res, getUserDrink)
});

drinkRouter.post('/create', (req : Request, res : Response) => {
  authMiddleware(req, res, createDrink)
})

drinkRouter.patch('/edit', (req,res) => {
  authMiddleware(req, res, editDrink)
})

drinkRouter.post('/ingredient_search', (req,res) => {
  authMiddleware(req,res,searchCocktailsByIngredients)
})

drinkRouter.get('/drink/:drinkName', getDrink)