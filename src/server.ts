import app from './app';
import dotenv from 'dotenv';
import connectAndSyncDb from './db/init';

dotenv.config();

const PORT = process.env.PORT || 5050;

connectAndSyncDb();

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
