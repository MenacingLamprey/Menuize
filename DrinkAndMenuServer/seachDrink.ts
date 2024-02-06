import { sequelize } from "./Models";
import { Drink } from "./Models/Drink";

const ingredients = process.argv.filter((_, index) =>  index > 1)
const ingredientArrayToString = (ingredientArray : string[]) => {
  return ingredientArray.reduce((ingredientStr, ingredient ) => {
    return ingredientStr + `'${ingredient}', `
  },'').slice(0,-2)
};

const suitableCocktails = async(ingredientString : string, userId : string) : Promise<Drink[] | undefined> => {
  try {
    const [results] = await sequelize.query(
      `SELECT d.name as drink, i.name as ingredient, d.id, d."numOfIngredients" FROM drinks d
        JOIN "drinkIngredients" di ON di."DrinkId" = d.id
        JOIN ingredients i ON di."IngredientId" = i.id
        WHERE i.name = ANY (ARRAY[${ingredientString}]) AND ((d."isPublic" = 't') OR (d."userId" ='${userId}'))
        GROUP BY drink, d.id, ingredient, d."numOfIngredients"`  
    )
    console.log(results)
    return results as Drink[]
  } catch(e) {
    console.log(e)
  }
}

const ingString =  ingredientArrayToString(ingredients)
const martiniId = '0f9bd59e-2d16-413d-bd8b-5e6f8a9a73c9'
const drinks = suitableCocktails(ingString, '')