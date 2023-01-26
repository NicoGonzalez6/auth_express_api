import { StatusCodes } from 'http-status-codes';

class badRequest extends Error {
	statusCode: number;
	constructor(message: string) {
		super(message), (this.statusCode = StatusCodes.BAD_REQUEST);
	}
}

class notFound extends Error {
	statusCode: number;
	constructor(message: string) {
		super(message), (this.statusCode = StatusCodes.NOT_FOUND);
	}
}

export default { badRequest, notFound };
