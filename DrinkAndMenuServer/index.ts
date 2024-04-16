import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import { sequelize } from "./Models";
import { rootRouter } from './Routes/index'

dotenv.config({path : path.resolve(__dirname, '../.env')});

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'
console.log(PORT, HOST)
const CLIENT_PORT = process.env.CLIENT_PORT || 3000
const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost'

const corsConfig = {
  origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
  credentials: true,
};
const app = express();

app.use(cors(corsConfig));
app.use(express.json())
app.use('/', rootRouter)

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log('Connected to SQL database')
  console.log(`App is listening at ${HOST}:${PORT}`)
});