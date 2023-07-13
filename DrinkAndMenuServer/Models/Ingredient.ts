import { Association,
    HasManyAddAssociationMixin,
    Model,
    Optional,
    DataTypes,
  } from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { DrinkIngredient } from "./DrinkIngredient";
import { IIngredient } from './modelTypes';
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";

type IngredientCreationAttributes = Optional<IIngredient, "id">;

export class Ingredient extends Model<IIngredient, IngredientCreationAttributes> {
  id! : number
  name!: string
  instructions! : string
  family! : string
  yield! : string

  public addDrink!: HasManyAddAssociationMixin<Ingredient, string>;
  public removeDrink!: HasManyAddAssociationMixin<Ingredient, string>;
  public addIngredient!: HasManyAddAssociationMixin<Ingredient, string>;
  public removeIngredient!: HasManyAddAssociationMixin<Ingredient, string>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  userId ? : string
  
  public static associations: {
    drinks : Association<Drink, Ingredient>
    creator : Association<User, Ingredient>;  
    DrinkIngredient : Association<DrinkIngredient, Ingredient>
    RecipeIngredient : Association<RecipeIngredient, Ingredient>
  };
}
  
Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique : true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    family: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    yield : {
      type : DataTypes.TEXT,
      allowNull : true 
    }
  },

  {
    sequelize,
    tableName: "ingredients",
  }
);

Ingredient.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  as : "childIngredients",
  foreignKey :'IngredientId'
});

Ingredient.hasMany(RecipeIngredient, {
  foreignKey :'childIngredientId'
});

Ingredient.belongsToMany(Drink, { through: DrinkIngredient,});
Drink.belongsToMany(Ingredient, { through: DrinkIngredient });