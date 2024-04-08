import { Model, Optional, DataTypes, Association, HasOneSetAssociationMixin } from "sequelize";

import { sequelize } from ".";
import { IRecipeIngredient } from './modelTypes';
import { Ingredient } from "./Ingredient";

type RecipeIngredientCreationAttributes = Optional<IRecipeIngredient, "id">;

export class RecipeIngredient extends Model<IRecipeIngredient, RecipeIngredientCreationAttributes> {
  public id!: number;
  public measurement! :string
  public amount! : number
  public childIngredient! : Ingredient
  declare childIngredientName : string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    childIngredient: Association<Ingredient, RecipeIngredient>;
  }

  declare setChildIngredient : HasOneSetAssociationMixin<IRecipeIngredient, Ingredient>

}
  
RecipeIngredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  recipeId : {
    type: DataTypes.INTEGER
  },
  measurement: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  childIngredientName : {
    type : DataTypes.TEXT
  }
},
  {
    sequelize,
    tableName: "recipeIngredients",
  }
);
