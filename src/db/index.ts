import { Sequelize } from 'sequelize';
import databaseConfig from "config/database.json"

const env = process.env.NODE_ENV || "development"
const { dialect, storage } = databaseConfig[env]

const sequelize = new Sequelize({
    dialect,
    storage
});

export default sequelize