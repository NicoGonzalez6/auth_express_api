import request from 'supertest';
import app from '../src/app';

describe('server app test', () => {
	it('server should be up', async () => {
		const response = await request(app).get('/api/v1');

		expect(response.text).toEqual('react_express_app');
		expect(response.status).toEqual(200);
	});
});
