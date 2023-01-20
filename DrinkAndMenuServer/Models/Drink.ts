import { Model, Optional, DataTypes } from "sequelize";

import { sequelize } from ".";
import { IDrink } from './modelTypes';

type DrinkCreationAttributes = Optional<IDrink, "id">;

export class Drink extends Model<IDrink, DrinkCreationAttributes> {
    public id!: number;
    public name! :string
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Drink.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "drinks",
    }
  );