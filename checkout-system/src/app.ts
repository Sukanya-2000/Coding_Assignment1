// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import sequelize from './db/sequelize';
import * as dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
