import User from '../models/user';
import { sequelize } from './db';

const node_env = process.env.NODE_ENV as string;

const isDev = node_env.trim() == 'development';

//models for sync
const models = [User];

//database init function
const connectAndSync = async (): Promise<void> => {
	try {
		sequelize.sync({ alter: isDev });
	} catch (error) {
		console.log(error);
	}
};

export default connectAndSync;
