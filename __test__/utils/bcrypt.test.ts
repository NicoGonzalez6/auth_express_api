import bcrypt from '../../src/utils/bcrypt';

describe('should test all the bcrypt functions works correctly', () => {
	it('should hash a password correctly', async () => {
		const password = 'secret';

		const hashPassword = await bcrypt.hashPassword(password);

		const checkHashPassword =
			hashPassword.split('').length > password.split('').length;

		expect(hashPassword).not.toEqual(password);
		expect(checkHashPassword).toBeTruthy();
	});

	it('should verify  a password correctly', async () => {
		const password = 'secret';

		const hashPassword = await bcrypt.hashPassword(password);

		const verifyPassword = await bcrypt.verifyPassword(
			password,
			hashPassword
		);

		expect(verifyPassword).toBe(true);
	});
});
