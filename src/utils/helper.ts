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

export const cleanRouteFile = (file: string): string => {
	return file.split('.')[0];
};

export const checkValidResource = (value: any, message: string) => {
	if (!value) {
		throw new customErr.badRequest(message);
	}
};
