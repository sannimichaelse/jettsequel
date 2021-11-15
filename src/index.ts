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
import { logger } from 'config/logger';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/', routes);

app.use(errorHandler);

const port = config.APP_PORT || 9002;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

(async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.info('Unable to connect to the database:', error);
    }
})();

