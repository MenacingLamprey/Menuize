import { Model, Optional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Association, HasOneSetAssociationMixin } from "sequelize";

import { sequelize } from ".";
import { Ingredient } from "./Ingredient";
import { IBrand } from './modelTypes';
import { Recipe } from "./Recipe";

type BrandCreationAttributes = Optional<IBrand, "id">;

export class Brand extends Model<IBrand, BrandCreationAttributes> {
    declare name :string
    declare price : number
    declare ingredient : Ingredient
    declare recipe : Recipe


    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    declare setRecipe : HasOneSetAssociationMixin<Recipe, Brand>

    public static associations: {
      ingredient : Association<Brand, Ingredient>
      recipe : Association<Brand, Recipe>
    };

  }
  
  Brand.init(
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
      price: {
        type: DataTypes.FLOAT,

      },
      preferred : {
        type : DataTypes.BOOLEAN
      }
      
    },

    {
      sequelize,
      tableName: "brands",
    }
  );