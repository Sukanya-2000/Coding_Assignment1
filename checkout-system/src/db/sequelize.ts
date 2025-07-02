// src/db/sequelize.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB ENV VALUES:', {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
  });

if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_HOST
) {
  throw new Error('Missing required DB environment variables');
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASS), // force string cast
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);



export default sequelize;
