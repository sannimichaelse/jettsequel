import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './middleware/error-handler';
import routes from './routes';
import config from 'config'
import sequelize from "db/index"

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));
app.use('/', routes);

app.use(errorHandler);

const port = config.APP_PORT || 9002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

