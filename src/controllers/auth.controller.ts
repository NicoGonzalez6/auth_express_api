import { Request, Response } from 'express';
import bcrypt from '../utils/bcrypt';
import { checkRequiredFields, checkValidResource } from '../utils/helper';
import User, { addUserOptionalFields, userOutputI } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { generateToken, generateTokenI } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	await checkRequiredFields(email, password);

	let user = (await User.findOne({
		where: {
			email: email,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
	})) as userOutputI;

	checkValidResource(user, 'User not found');

	const storedPassword = <string>user.dataValues.password;

	const comparePassword = await bcrypt.verifyPassword(
		password,
		storedPassword
	);

	checkValidResource(comparePassword, 'invalid credentials');

	user = (await User.findOne({
		where: {
			email: email,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'password'],
		},
	})) as userOutputI;

	const token = generateToken(user.dataValues as generateTokenI);

	res.status(StatusCodes.OK).json({ user: user.dataValues, token });
};

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	await checkRequiredFields(name, email, password);

	const hashPassword = await bcrypt.hashPassword(password);

	const existingUser = await User.findOne({
		where: {
			email,
		},
		attributes: {
			exclude: ['createdAt', 'password', 'updatedAt'],
		},
	});

	checkValidResource(!existingUser?.dataValues, 'existing user');

	const payload: addUserOptionalFields = {
		name,
		email,
		password: hashPassword,
	};

	await User.create(payload);

	const newUser = (await User.findOne({
		where: {
			email,
		},
		attributes: {
			exclude: ['createdAt', 'password', 'updatedAt'],
		},
	})) as userOutputI;

	res.status(StatusCodes.CREATED).json(newUser?.dataValues);
};
