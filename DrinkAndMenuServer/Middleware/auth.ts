import { Request, Response } from "express";
import { User } from './../Models/User';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'A key, which is secret';

export interface RequestWithUser extends Request {
  user?: User
 }

 interface JWTWithId extends jwt.JwtPayload {
  uid : string
 }

export const authMiddleware = async (req : RequestWithUser, res :Response, next :Function) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    // verify & decode token payload,
    const verified = jwt.verify(token, SECRET_KEY) as JWTWithId;
    const { _id } = verified

    // attempt to find user object and set to req
    const user = await User.findOne({where : {uid:_id}})
    if (!user) return res.sendStatus(401);
    req.user = user;

    next(req,res);
  } catch (error) {
    res.sendStatus(401);
  }
};