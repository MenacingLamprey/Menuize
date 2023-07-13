import Router, {Request, Response} from 'express'

import { authMiddleware } from '../Middleware/auth';
import { User } from "../Models/User";

import {  createUser, guest, login, profile } from '../Controllers/userController'

interface RequestWithUser extends Request {
    user?: User
}

export const userRouter = Router()

userRouter.post('/register', createUser)
userRouter.post('/login', login);
userRouter.get('/profile', (req : Request,res : Response) => {
    authMiddleware(req as RequestWithUser, res, profile)
});
userRouter.get('/guest', guest)