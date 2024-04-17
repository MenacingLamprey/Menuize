import { Request, Response  } from "express"
import { Brand } from "../Models/Brand"
import { IBrand } from "../Models/modelTypes"
import { Ingredient } from "../Models/Ingredient"
import { Recipe } from "../Models/Recipe"

export const addBrandToIngredinet = async ( req : Request, res : Response) => {
  try {
    const { ingredientName } = req.params 
    const { brand } : {brand :IBrand}= req.body
    //find the brand, or create one with a name
    const [savedBrand,created] = await Brand.findOrCreate({where : { name : brand.name }})
    //update the brand with the rest of it's details
    await savedBrand.update(brand)

    //find the ingredient, or send an error to the client
    const ingredient = await Ingredient.findOne({where : {name : ingredientName}})
    if(!ingredient) return res.status(404).send({error : true, res : 'Ingredient Not Found'})
    
    //if recipe is attached, find recipe, update it with details, associate brand with recipe
    //and associate recipe with ingredient
    const { recipe } = brand
    if (recipe) {
      const [savedrecipe] = await Recipe.findOrCreate({where :{ingredientId :ingredient.id}})
      await savedrecipe.update(recipe)
      await savedBrand.setRecipe(savedrecipe)
      await ingredient.setRecipe(savedrecipe)
    }
    //annd brand to ingredient
    await ingredient.addBrand(savedBrand)
    return res.status(201).send({error : false , res : {ingredient, brand, recipe}})
  } catch (e) { 
    return res.status(500).send({error : true, res : "Error Adding Brand To Recipe"})
  }
} 