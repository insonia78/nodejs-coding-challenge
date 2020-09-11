import request from 'supertest';

const app = require('./app');

test('Initial request', async () => {
   await request(app).get('/').send()
              .expect(200);
});