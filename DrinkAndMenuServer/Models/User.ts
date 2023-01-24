import { Association,
  HasManyAddAssociationMixin,
  Model,
  Optional,
  DataTypes,} from "sequelize";

import { sequelize } from ".";
import { Drink } from "./Drink";
import { Ingredient } from "./Ingredient";
import { IUser } from './modelTypes';

type UserCreationAttributes = Optional<IUser, "uid">;

export class User extends Model<IUser, UserCreationAttributes> {
  public uid!: string;
  public username! :string
  public password! :string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addDrink!: HasManyAddAssociationMixin<User, string>;
  public removeDrink!: HasManyAddAssociationMixin<User, string>;
  public addIngredient!: HasManyAddAssociationMixin<User, string>;
  public removeIngredient!: HasManyAddAssociationMixin<User, string>;

  public static associations: {
    drinks: Association<User, Drink>;
    ingredients : Association<User, Ingredient>
  };
}
  
User.init(
  {
    uid: {
      primaryKey :true,
      type: DataTypes.TEXT,
      allowNull: false,
      unique : true
    },
    username :{
      type: DataTypes.TEXT,
      allowNull: false
      },
      password :{
      type: DataTypes.TEXT,
      allowNull: false
      }
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.hasMany(Drink, {
  sourceKey: "uid",
  foreignKey: "userId",
  as: "drinks",
});

User.hasMany(Ingredient, {
  sourceKey: "uid",
  foreignKey: "userId",
  as: "ingredients",
});