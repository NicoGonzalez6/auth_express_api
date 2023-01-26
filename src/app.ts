import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routes';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
app.use('/api/v1', (_, res) => {
	res.send('react_express_app');
});

app.use(errorHandler);

export default app;
