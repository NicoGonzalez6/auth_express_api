import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface configDbInterface {
	dbName: string;
	dbUser: string;
	dbPassword: string;
	dbHost: string;
	dbPort: number | undefined;
	dbDriver: Dialect;
}

export const configDb: configDbInterface = {
	dbDriver: <Dialect>process.env.DB_DRIVER,
	dbHost: <string>process.env.DB_HOST,
	dbPassword: <string>process.env.DB_PWD,
	dbPort: <number | undefined>process.env.DB_PORT,
	dbName: <string>process.env.DB_NAME,
	dbUser: <string>process.env.DB_USER,
};
