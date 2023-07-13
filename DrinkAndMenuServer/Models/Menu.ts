import { Model, Optional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Association } from "sequelize";

import { sequelize } from ".";
import { Ingredient } from "./Ingredient";
import { IMenu } from './modelTypes';
import { Drink } from "./Drink";

type MenuCreationAttributes = Optional<IMenu, "id">;

export class Menu extends Model<IMenu, MenuCreationAttributes> {
  public id!: number;
  public title! :string
  public current! : boolean
  public userId! : string

  public addIngredients!: HasManyAddAssociationsMixin<Ingredient, number>
  public getIngredients!:  HasManyGetAssociationsMixin<Ingredient>

  public addDrinks!: HasManyAddAssociationsMixin<Drink, number>
  public getDrinks!:  HasManyGetAssociationsMixin<Drink>

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    specialtyIngredients : Association<Menu, Ingredient>
    drinks : Association<Menu, Drink>
  };   
}
  
Menu.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    current: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "menus",
  }
);

Menu.belongsToMany(Drink, { through: 'menuDrinks', as :'drinks'});
Drink.belongsToMany(Menu, { through: 'menuDrinks', as: 'menus'});

Menu.belongsToMany(Ingredient, { through: 'menuIngredients',});
Ingredient.belongsToMany(Menu, { through: 'menuIngredients' });