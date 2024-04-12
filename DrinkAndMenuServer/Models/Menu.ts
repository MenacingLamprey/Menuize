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
  declare drinks : Drink[]
  declare ingredients : Ingredient[]

  public addIngredients!: HasManyAddAssociationsMixin<Ingredient, Menu>
  public getIngredients!:  HasManyGetAssociationsMixin<Ingredient>

  public addDrinks!: HasManyAddAssociationsMixin<Drink, Menu>
  public getDrinks!:  HasManyGetAssociationsMixin<Drink>

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    ingredients : Association<Menu, Ingredient>
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
    },
    inProgress : {
      type :DataTypes.BOOLEAN,
      defaultValue : false,
      allowNull : false
    }
  },
  {
    sequelize,
    tableName: "menus",
  }
);

Menu.belongsToMany(Drink, { through: 'menuDrinks', as :'drinks'});
Drink.belongsToMany(Menu, { through: 'menuDrinks', as: 'menus'});

Menu.belongsToMany(Ingredient, { through: 'menuIngredients', as :'ingredients'});
Ingredient.belongsToMany(Menu, { through: 'menuIngredients', as : 'menus' });