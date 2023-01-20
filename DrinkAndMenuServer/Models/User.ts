import { Model, Optional, DataTypes } from "sequelize";

import { sequelize } from ".";
import { IUser } from './modelTypes';

type UserCreationAttributes = Optional<IUser, "uid">;

export class User extends Model<IUser, UserCreationAttributes> {
    public uid!: string;
    public username! :string
    public password! :string
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  User.init(
    {
      uid: {
        type: DataTypes.TEXT,
        allowNull: false,
      } ,
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