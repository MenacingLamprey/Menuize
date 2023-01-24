import { Association,
    HasManyAddAssociationMixin,
    Model,
    Optional,
    DataTypes,} from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { DrinkIngredient } from "./DrinkIngredient";
import { IIngredient } from './modelTypes';
import { User } from "./User";

type IngredientCreationAttributes = Optional<IIngredient, "id">;

export class Ingredient extends Model<IIngredient, IngredientCreationAttributes> {
    id! : number
    name!: string
    instructions! : string
    family! : string

    public addDrink!: HasManyAddAssociationMixin<Ingredient, string>;
    public removeDrink!: HasManyAddAssociationMixin<Ingredient, string>;
    public addIngredient!: HasManyAddAssociationMixin<Ingredient, string>;
    public removeIngredient!: HasManyAddAssociationMixin<Ingredient, string>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {
        recipe: Association<Ingredient, Ingredient>;
        drinks : Association<Drink, Ingredient>
        creator : Association<User, Ingredient>;  
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
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    family: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "ingredients",
  }
);

Ingredient.belongsToMany(Drink, { through: DrinkIngredient });
Drink.belongsToMany(Ingredient, { through: DrinkIngredient });

Ingredient.belongsToMany(Ingredient, { as: "recipe", through: "ingredientRecipe" });