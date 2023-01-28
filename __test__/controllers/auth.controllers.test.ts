import app from '../../src/app';
import request from 'supertest';
import connectAndSyncDb from '../../src/db/init';
import { StatusCodes } from 'http-status-codes';
import User from '../../src/models/user';

describe('test of the auth controllers', () => {
	const registerPayload = {
		name: 'test',
		email: 'email@test.com',
		password: 'secret',
	};

	const loginPayload = {
		email: 'email@test.com',
		password: 'secret',
	};

	const incorrectLoginPayload = {
		email: 'email@test.com',
		password: 'secret2',
	};

	const emptyLoginPayloadFields = {
		email: 'email@test.com',
		password: '',
	};

	beforeAll(async () => {
		await connectAndSyncDb();
	});

	afterAll(async () => {
		await User.destroy({
			where: {
				email: registerPayload.email,
			},
		});
	});

	it('should test the register endpoint', async () => {
		const registerEndpoint = await request(app)
			.post('/api/v1/auth/register')
			.send(registerPayload)
			.set('Accept', 'application/json');

		expect(registerEndpoint.status).toBe(StatusCodes.CREATED);
		expect(registerEndpoint.body.name).toEqual(registerPayload.name);
	});

	it('should fail if the user already exists', async () => {
		const registerEndpoint = await request(app)
			.post('/api/v1/auth/register')
			.send(registerPayload)
			.set('Accept', 'application/json');

		expect(registerEndpoint.status).toBe(StatusCodes.BAD_REQUEST);
	});

	it('should test the login endpoint', async () => {
		const loginEndpoint = await request(app)
			.post('/api/v1/auth/login')
			.send(loginPayload)
			.set('Accept', 'application/json');

		expect(loginEndpoint.status).toBe(StatusCodes.OK);
		expect(loginEndpoint.body.user.email).toEqual(loginPayload.email);
		expect(loginEndpoint.body.token).toBeTruthy();
	});

	it('should fail if the password is incorrect', async () => {
		const loginEndpoint = await request(app)
			.post('/api/v1/auth/login')
			.send(incorrectLoginPayload)
			.set('Accept', 'application/json');

		expect(loginEndpoint.status).toBe(StatusCodes.BAD_REQUEST);
		expect(loginEndpoint.body.msg).toEqual('invalid credentials');
	});

	it('should fail if one of the fields are empty', async () => {
		const loginEndpoint = await request(app)
			.post('/api/v1/auth/login')
			.send(emptyLoginPayloadFields)
			.set('Accept', 'application/json');

		expect(loginEndpoint.status).toBe(StatusCodes.BAD_REQUEST);
		expect(loginEndpoint.body.msg).toEqual(
			'Please provide all the requested values'
		);
	});
});
