import { Model, Optional, DataTypes, Association } from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { Ingredient } from "./Ingredient";
import { IDrinkIngredient } from './modelTypes';

type DrinkIngredientCreationAttributes = Optional<IDrinkIngredient, "id">;

export class DrinkIngredient extends Model<IDrinkIngredient, DrinkIngredientCreationAttributes> {
  public id!: number;
  public measurement! :string
  public amount! : number 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public bulkCreate(recordsData: Model<IDrinkIngredient, DrinkIngredientCreationAttributes>[], options?: {}): Promise<Model<IDrinkIngredient, DrinkIngredientCreationAttributes>[]> {
  //   return this.bulkCreate(recordsData, options);
  // }

  public static associations: {
    DrinkId: Association<Drink, DrinkIngredient>;
    IngredientID: Association<Ingredient, DrinkIngredient>;
  };

}
  
DrinkIngredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    measurement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "drinkIngredients",
  }
);

Drink.hasMany(DrinkIngredient)