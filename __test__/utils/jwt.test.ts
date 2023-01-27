import { generateToken } from '../../src/utils/jwt';

describe('should test all the bcrypt functions works correctly', () => {
	it('should generate user token correctly', async () => {
		const userInfo = {
			id: 1,
			name: 'test',
			email: 'email@test.com',
		};

		const token = await generateToken(userInfo);

		expect(token).toBeTruthy();
	});
});
