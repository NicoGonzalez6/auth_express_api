import { Router } from 'express';
import fs from 'fs';
import { cleanRouteFile } from '../utils/helper';

const router = Router();

const routeFolder = __dirname;

fs.readdirSync(routeFolder).forEach((file) => {
	const fileName = cleanRouteFile(file);

	if (fileName != 'index') {
		import(`./${fileName}`).then((module) => {
			router.use(`/${fileName}`, module.default);
		});
	}
});

export default router;
