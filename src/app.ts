import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routes';
import fs from 'fs';
import path from 'path';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

const folderName = path.join(__dirname, 'models');

const node_env = process.env.NODE_ENV as string;

const isDev = node_env.trim() == 'development';

fs.readdirSync(folderName).map((file) => {
	import(`${folderName}/${file}`).then((model) => {
		model.default.sync({ alter: isDev });
	});
});

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
