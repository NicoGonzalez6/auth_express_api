import { Request, Response } from 'express';
import bcrypt from '../utils/bcrypt';
import { checkRequiredFields } from '../utils/helper';
import User, { addUserOptionalFields, userOutputI } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import customErr from '../errors';

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

	if (!user) {
		throw new customErr.notFound('User not found');
	}

	const storePassword = user.dataValues.password;

	const comparePassword = await bcrypt.verifyPassword(
		password,
		storePassword
	);

	if (!comparePassword) {
		throw new customErr.badRequest('invalid credentials');
	}

	user = (await User.findOne({
		where: {
			email: email,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'password'],
		},
	})) as userOutputI;

	res.status(StatusCodes.OK).json(user.dataValues);
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

	if (existingUser?.dataValues) {
		throw new customErr.badRequest('existing user');
	}
	const payload: addUserOptionalFields = {
		name,
		email,
		password: hashPassword,
	};

	await User.create(payload);

	const newUser = await User.findOne({
		where: {
			email,
		},
		attributes: {
			exclude: ['createdAt', 'password', 'updatedAt'],
		},
	});

	res.status(StatusCodes.CREATED).json(newUser?.dataValues);
};
