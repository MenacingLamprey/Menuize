import { Model, Optional, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Association } from "sequelize";

import { sequelize } from ".";
import { Ingredient } from "./Ingredient";
import { IBrand } from './modelTypes';

type BrandCreationAttributes = Optional<IBrand, "id">;

export class Brand extends Model<IBrand, BrandCreationAttributes> {
    public name! :string
    public price! : number

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associations: {
      Ingredients : Association<Brand, Ingredient>
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
      
    },

    {
      sequelize,
      tableName: "brands",
    }
  );