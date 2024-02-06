import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { User } from "../Models/User";
import { Drink } from "../Models/Drink";
import { Ingredient } from "../Models/Ingredient";

interface RequestWithUser extends Request {
  user?: User
}

const SECRET_KEY = process.env.SECRET_KEY || 'A key, which is secret';

export const guest = async (req : Request, res : Response) => {
	try {
		const drinks = await Drink.findAll({where : {isPublic : true}})
		const ingredients = await Ingredient.findAll({where : {isPublic : true}})
    console.log(drinks, ingredients)
    const publicItems = {drinks, ingredients}
		res.status(200).send({error : false, res : publicItems})
	} catch (error) {
		res.status(500).send({error : true, res : 'Error getting guest data'})
	}
}

export const createUser = async (req : Request, res :Response) => {
    const {username, password} = req.body
    const user = await User.findOne({ where :{ username }});
    if (user) {
        return res
        .status(409)
        .send({ error: '409', res: 'User already exists' });
    }
    try {
        if (password === '') return res.status(400).send({ error : true, res: 'Password has no length' });
        const hash = await bcrypt.hash(password, 10);
        const uid = uuid.v4();

        await User.create({
          username, password : hash, uid
        });

        const accessToken = jwt.sign({  _id: uid }, SECRET_KEY);
        res.status(201).send({ accessToken });
    } catch (e) {
        console.log(e)
        res.status(500).send({error : true, res : "Error Creating User"})
    }
}

export const profile = async (req : RequestWithUser, res : Response) => {
	try {
    if (req.user){
			const { uid } = req.user;
			const user = await User.findOne({
        where : { uid },
        include : [
          {model : Drink, as : 'drinks', attributes : ['name', 'id']}, 
          {model : Ingredient, as : 'ingredients', attributes : ['name', 'id', 'family']}
        ] });

			if (!user) {
				return res.status(404).send({ error : true, res: 'Profile not found' }); 
			}

      const publicIngredients = await Ingredient.findAll({where : {"isPublic" : true}, attributes :['name', 'id', 'family']})
			
      const { username,drinks,ingredients } = user
      
      //merges list of users ingredients with list of public ingredients, removing duplicates
      const merge = (a : Ingredient[], b : Ingredient[], predicate = (a : Ingredient, b : Ingredient) => a.id === b.id) => {
        const c = [...a]; // copy to avoid side effects
        // add all items from B to copy C if they're not already present
        b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
        return c;
      }
      
      const allIngredients = merge(publicIngredients, ingredients)
      console.log(allIngredients.length)
      return res.status(200).send({username, drinks : drinks , ingredients : allIngredients});
    }
    res.status(404).send({ error : true, res: 'Resource not found' });
	} catch (error){
		return res.status(500).send({error : true, res: 'Error getting profile'})
	}
}

export const login = async (req : Request, res : Response) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where :{ username }});
      if(user) {
        const validatedPass = await bcrypt.compare(password, user.password);
        if (!validatedPass) {
          return res
            .status(401)
            .send({ error: true, res: 'Password is incorrect' });
        }
        const accessToken = jwt.sign({ _id: user.uid }, SECRET_KEY);
        return res.status(200).send({ accessToken });
      }
      res.status(400).send({error : true, res : 'No such User'})
    } catch (error) {
      res
        .status(500)
        .send({ error: true, res: 'Error logging user in' });
    }
}