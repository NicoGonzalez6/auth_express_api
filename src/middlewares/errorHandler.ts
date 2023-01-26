import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = async (
	err,
	req,
	res,
	next
): Promise<void> => {
	const customErr = {
		message: err.message || 'Something went wrong, please try agan later',
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
	};

	res.status(customErr.statusCode).json({ msg: customErr.message });
};

export default errorHandler;
