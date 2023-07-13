import { Router, Request, Response } from 'express'
import { authMiddleware } from '../Middleware/auth'
import { getCurrentMenu, createMenu } from '../Controllers/menuController'

export const menuRouter = Router()

menuRouter.get('/current', (req : Request, res : Response) => {
  authMiddleware(req, res, getCurrentMenu)
})

menuRouter.post('/create', (req : Request, res : Response) => {
  authMiddleware(req, res, createMenu)})
