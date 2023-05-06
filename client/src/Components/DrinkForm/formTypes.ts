export interface IFormIngredient {
  ingredient: string;
  amount: number;
  measurement: string
}

export type FormValues = {
  drinkName : string
  glass : string
  method : string
  ingredients: IFormIngredient[];
};