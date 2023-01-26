import { checkRequiredFields, cleanRouteFile } from '../../src/utils/helper';
import customErr from '../../src/errors';

describe('test of the global helpers functions', () => {
	it('Should verify all the required fields and throw an error if one its not fullfill with 1 invalid field', () => {
		const email = '';
		const password = 'secret';

		expect(() => checkRequiredFields(email, password)).toThrow(
			customErr.badRequest
		);
	});

	it('Should verify all the required fields and throw an error if one its not fullfill with all valid fields', () => {
		const email = 'test@gmail.com';
		const password = 'secret';

		expect(() => checkRequiredFields(email, password)).not.toThrow(
			customErr.badRequest
		);
	});

	it('Should clean the extension file name from the file', () => {
		const file = 'file.ts';
		expect(cleanRouteFile(file)).toEqual('file');
	});
});
