import path from 'path';
import fs from 'fs';

const node_env = process.env.NODE_ENV as string;

const isDev = node_env.trim() == 'development';

const modelsFolder = path.join(__dirname, '..', 'models');

const connectAndSyncDb = async (): Promise<void> => {
	try {
		fs.readdirSync(modelsFolder).forEach(async (files) => {
			await import(`${modelsFolder}/${files}`).then((file) => {
				file.default.sync({ alter: isDev });
			});
		});
	} catch (error) {
		console.log(error);
	}
};

export default connectAndSyncDb;
