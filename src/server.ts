import app from './app';
import dotenv from 'dotenv';
import connectAndSync from './db/init';

dotenv.config();

const PORT = process.env.PORT || 5050;

connectAndSync();

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
