import { Association,
  HasManyAddAssociationMixin,
  Model,
  Optional,
  DataTypes,} from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { DrinkIngredient } from "./DrinkIngredient";
import { IIngredient, IIngredientFamily } from './modelTypes';

type IngredientCreationAttributes = Optional<IIngredientFamily, "id">;

export class IngredientFamily extends Model<IIngredientFamily, IngredientCreationAttributes> {
  id! : number
  name!: string
  parentFamilyId! : number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

IngredientFamily.init(
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
  parentFamilyId: {
    type: DataTypes.INTEGER,
  }
},

{
  sequelize,
  tableName: "ingredient-families",
}
);