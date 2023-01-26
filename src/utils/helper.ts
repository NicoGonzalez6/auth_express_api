import customErr from '../errors';

export const checkRequiredFields = (...rest: (string | number)[]): void => {
	rest.forEach((value) => {
		if (!value) {
			throw new customErr.badRequest(
				'Please provide all the requested values'
			);
		}
	});
};
