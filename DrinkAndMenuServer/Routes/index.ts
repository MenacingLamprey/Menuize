import Router from "express";
import { drinkRouter } from "./drinkRouter";
import { userRouter } from "./userRouter";

export const rootRouter = Router();

rootRouter.use('/drinks', drinkRouter)
rootRouter.use('/users', userRouter)