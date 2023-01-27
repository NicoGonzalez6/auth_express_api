import customErr from '../../src/errors';

describe('Test the error constructors', () => {
	test('Bad Request Error', () => {
		const err = () => {
			throw new customErr.badRequest('Bad Request');
		};
		expect(() => err()).toThrow(customErr.badRequest);
	});

	test('Not Found Error', () => {
		const err = () => {
			throw new customErr.notFound('notFound');
		};
		expect(() => err()).toThrow(customErr.notFound);
	});
});
