import { IDrink, IIngredient } from "../../apiTypes";

function randomSalesGenerator(salesAmount : number, drinks: IDrink[]) {
  const tempDrinkMap:{[key: string]: number} ={};
  const drinkMap = drinks.reduce((list, drink) => {
    list[drink.name] = 0;
    return list
  },tempDrinkMap);

  let dollarCounter =0;
  const numDrinks = drinks.length
  while(dollarCounter < salesAmount) {
    const drinkIndex = Math.floor(numDrinks*Math.random());
    const drink = drinks[drinkIndex].name
    drinkMap[drink]+=1;
    dollarCounter+=15;
  }

  return drinkMap
}

interface IProps {
  drinks : IDrink[]
  ingredients : IIngredient[]
}

export const SalesAnalyzer = ({drinks} : IProps) => {
  const drinkMap = randomSalesGenerator(10000, drinks)

  const tempIngredientMap:{[key: string]: {amount :number, measurement :string}} = {};
  const ingredientMap = Object.keys(drinkMap).reduce((ingredientMap, drink) => {
    for (let cocktail of drinks){
      const numDrinks = drinkMap[cocktail.name]
      for(let ingredient of cocktail.Ingredients){
        const amount = ingredient.DrinkIngredient!.amount
        const measurement = ingredient.DrinkIngredient!.measurement
        if(ingredientMap[ingredient.name]){
          const currentAmount = ingredientMap[ingredient.name].amount
          const newAmount = currentAmount + amount
          ingredientMap[ingredient.name] = {amount : newAmount, measurement}
        } else {
          ingredientMap[ingredient.name] = {amount, measurement}
        }
      }
    }
    return tempIngredientMap
  },tempIngredientMap)
  console.log(ingredientMap)
  return(<div></div>)
}