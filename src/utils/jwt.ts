import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface generateTokenI {
	id: number;
	name: string;
	email: string;
}

const generateToken = (payload: generateTokenI): string => {
	const { id, email, name } = payload;

	const userPayload = {
		id: id,
		name: name,
		email: email,
	};

	const token = sign(userPayload, process.env.TOKEN_SECRET as string, {
		expiresIn: process.env.TOKEN_EXPIRE,
	});

	return token;
};

export default { generateToken };
