import Router, {Request, Response} from 'express'

import { authMiddleware } from '../Middleware/auth';
import { User } from "../Models/User";

import {  createIngredient, editIngredient, getAllUserIngredients, getIngredient } from '../Controllers/ingredientController'

interface RequestWithUser extends Request {
    user?: User
}

export const ingredientRouter = Router()

ingredientRouter.post('/create', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, createIngredient)
})

ingredientRouter.post('/:ingredientName', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, getIngredient)
})

ingredientRouter.patch('/edit', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, editIngredient)
})

ingredientRouter.get('/all/:username',  getAllUserIngredients)