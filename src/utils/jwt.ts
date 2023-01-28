import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface generateTokenI {
	id: number;
	name: string;
	email: string;
}

const generateToken = (payload: generateTokenI): string => {
	const token = sign(payload, process.env.TOKEN_SECRET as string, {
		expiresIn: process.env.TOKEN_EXPIRE,
	});

	return token;
};

export default { generateToken };
