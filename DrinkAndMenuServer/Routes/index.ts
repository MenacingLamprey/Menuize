import Router from "express";
import { drinkRouter } from "./drinkRouter";
import { userRouter } from "./userRouter";
import { ingredientRouter } from "./ingredientRouter";

export const rootRouter = Router();

rootRouter.use('/drinks', drinkRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/ingredients', ingredientRouter)