import { Model, Optional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Association } from "sequelize";

import { sequelize } from ".";
import { DrinkIngredient } from "./DrinkIngredient";
import { Ingredient } from "./Ingredient";
import { IDrink, IDrinkIngredient } from './modelTypes';

type DrinkCreationAttributes = Optional<IDrink, "id">;

export class Drink extends Model<IDrink, DrinkCreationAttributes> {
    public id!: number;
    public name! :string
    public glass! : string
    public description! : string
    public method! : string

    public addIngredients!: HasManyAddAssociationsMixin<Ingredient, string>
    public getIngredients!:  HasManyGetAssociationsMixin<Ingredient>

    public addDrinkIngredients!: HasManyAddAssociationsMixin<DrinkIngredient, string>
    public getDrinkIngredients!:  HasManyGetAssociationsMixin<DrinkIngredient>

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associations: {
      Ingredients : Association<Drink, Ingredient>
    };
    
    public userId ? : string
    public Ingredients? : Ingredient[]
    public measures? : IDrinkIngredient[]
    public drinkIngredients? : IDrinkIngredient[]
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
      },
      method: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      glass: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numOfIngredients : {
        type :DataTypes.INTEGER
      }
    },

    {
      sequelize,
      tableName: "drinks",
    }
  );