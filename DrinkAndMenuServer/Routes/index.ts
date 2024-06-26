import Router from "express";
import { drinkRouter } from "./drinkRouter";
import { userRouter } from "./userRouter";
import { ingredientRouter } from "./ingredientRouter";
import { menuRouter } from "./menuRouter";
import { brandRouter } from "./brandRouter";

export const rootRouter = Router();

rootRouter.use('/drinks', drinkRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/ingredients', ingredientRouter)
rootRouter.use('/menus', menuRouter)
rootRouter.use('/brands', brandRouter)