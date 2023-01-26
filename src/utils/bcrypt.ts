import { genSalt, hash, compare } from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
	const salt = await genSalt(10);

	const hashedPassword = await hash(password, salt);

	return hashedPassword;
};

const verifyPassword = async (
	password: string,
	storePassword: string
): Promise<boolean> => {
	const comparePassword = await compare(password, storePassword);

	return comparePassword;
};

export default { hashPassword, verifyPassword };
