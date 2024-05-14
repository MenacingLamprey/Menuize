import { Router } from "express";
import { addBrandToIngredinet } from "../Controllers/brandController";

export const brandRouter = Router()

brandRouter.use('/create', addBrandToIngredinet)