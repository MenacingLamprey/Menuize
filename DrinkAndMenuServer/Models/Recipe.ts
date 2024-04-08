import { Association,
  HasManyAddAssociationMixin,
  Model,
  Optional,
  DataTypes,
  HasOneSetAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";

import { sequelize } from ".";
import { IRecipe, IRecipeIngredient } from './modelTypes';
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { Ingredient } from "./Ingredient";

type RecipeCreationAttributes = Optional<IRecipe, "id">;

export class Recipe extends Model<IRecipe, RecipeCreationAttributes> {
id! : number
instructions! : string
yield! : string
userId ? : string


public readonly createdAt!: Date;
public readonly updatedAt!: Date


public static associations: {
  ingredient : Association<Recipe, RecipeIngredient>
  creator : Association<User, Recipe>;  
  childIngredients : Association<Recipe, RecipeIngredient>
};

declare addChildIngredients : HasManyAddAssociationMixin<Recipe,RecipeIngredient[]>
declare setIngredient : HasOneSetAssociationMixin<Ingredient, Recipe>
declare removeChildIngredients : HasManyRemoveAssociationMixin<IRecipeIngredient[], Recipe>
}

Recipe.init(
{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  yield: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
},

{
  sequelize,
  tableName: "recipes",
}
);