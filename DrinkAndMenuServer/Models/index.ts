import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

dotenv.config({path : path.resolve(__dirname, '../.env')});

const dbURL = process.env.DB_URL || ""
const sequelize = new Sequelize(dbURL, {dialect : 'postgres'});

export { sequelize };