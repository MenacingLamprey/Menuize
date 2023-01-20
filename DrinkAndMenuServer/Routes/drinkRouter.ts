import Router from 'express'

import { getDrink, createDrink, getAllDrinks } from '../Controllers/drinkContoller'

export const drinkRouter = Router()

drinkRouter.get('/all', getAllDrinks)
drinkRouter.get('/:name', getDrink)
drinkRouter.post('/create', createDrink)