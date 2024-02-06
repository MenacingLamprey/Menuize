import { Model, Optional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Association } from "sequelize";

import { sequelize } from ".";
import { DrinkIngredient } from "./DrinkIngredient";
import { Ingredient } from "./Ingredient";
import { IDrink, IDrinkIngredient } from './modelTypes';
import { Menu } from "./Menu";

interface IStrippedDrink {
  id : number
  drinkName : string
  ingredients : string[]
}
type DrinkCreationAttributes = Optional<IStrippedDrink, "id">;

export class StrippedDrink extends Model<IStrippedDrink, DrinkCreationAttributes> {
    public id!: number;
    public name! :string
    public numOfIngredients! : number

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

  }
  
  StrippedDrink.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      drinkName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ingredients : {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull : true
      }
    },

    {
      sequelize,
      tableName: "stripped-drinks",
    }
  );