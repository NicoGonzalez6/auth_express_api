import { Sequelize } from 'sequelize';
import { configDb } from '../config/config.db';

const { dbDriver, dbHost, dbName, dbPassword, dbPort, dbUser } = configDb;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	dialect: dbDriver,
	port: dbPort,
});
