import { Sequelize } from 'sequelize';
import { configDb } from '../config/config.db';

const { dbDriver, dbHost, dbName, dbPassword, dbPort, dbUser } = configDb;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	dialect: dbDriver,
	port: dbPort,
	define: {
		defaultScope: {
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		},
	},
});

export default sequelize;
