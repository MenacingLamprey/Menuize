import { Model, Optional, DataTypes, Association } from "sequelize";

import { sequelize } from ".";
import { IRecipeIngredient } from './modelTypes';
import { Ingredient } from "./Ingredient";

type RecipeIngredientCreationAttributes = Optional<IRecipeIngredient, "id">;

export class RecipeIngredient extends Model<IRecipeIngredient, RecipeIngredientCreationAttributes> {
  public id!: number;
  public measurement! :string
  public amount! : number
  public ingredient! : string
  public IngredientId! : number


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    Ingredient: Association<Ingredient, RecipeIngredient>;
  }

}
  
RecipeIngredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  measurement: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  ingredient : {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  IngredientId : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
  {
    sequelize,
    tableName: "recipeIngredients",
  }
);
