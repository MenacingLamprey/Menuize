import Router, {Request, Response} from 'express'

import { authMiddleware } from '../Middleware/auth';
import { User } from "../Models/User";

import {  
    createIngredient,
    editIngredient,
    getAllFamilies,
    getAllUserIngredients,
    getIngredient,
    deleteIngredient,
    addRecipeToIngredient,
    editIngredientRecipe,
    getPublicIngredient
} from '../Controllers/ingredientController'

interface RequestWithUser extends Request {
    user?: User
}

export const ingredientRouter = Router()

ingredientRouter.post('/create', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, createIngredient)
})

ingredientRouter.post('/get/:ingredientName', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, getIngredient)
})

ingredientRouter.patch('/edit/Family', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, editIngredient)
})

ingredientRouter.get('all/:username',  getAllUserIngredients)

ingredientRouter.get('families/all', getAllFamilies)

ingredientRouter.delete('/delete/:ingredientName', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, deleteIngredient)
})

ingredientRouter.patch('/addRecipe/:ingredientId', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, addRecipeToIngredient)
})

ingredientRouter.patch('/editRecipe/:ingredientId', (req : Request, res : Response) => {
    authMiddleware(req as RequestWithUser, res, editIngredientRecipe)
})

ingredientRouter.get('/public/:ingredientName', getPublicIngredient)