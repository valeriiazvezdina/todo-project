const request = require('supertest');
const app = require('../../index');

describe('CRUD endpoints', () => {
    describe('GET /api/users/', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/api/users/');
            expect(response.statusCode).toBe(200);
        });
    });
    describe('POST /api/users/login', () => {
        test('should respond with a 200 status code', async () => {
            const user = {
                email: 'admin@admin.admin',
                password: '123456789'
            };
            const response = await request(app).post('/api/users/login').send(user);
            expect(response.statusCode).toBe(200);
        });
        test('should respond with a 403 status code', async () => {
            const user = {
                email: 'admin@admin.admin',
                password: 'password'
            };
            const response = await request(app).post('/api/users/login').send(user);
            expect(response.statusCode).toBe(403);
        });
        test('should return a token', async () => {
            const user = {
                email: 'admin@admin.admin',
                password: '123456789'
            };
            const response = await request(app).post('/api/users/login').send(user);
            expect(response.body.token).toBeDefined();
        });
    });
    describe('POST /api/users/register', () => {
        test('should return 201 status code', async () => {
            const user = {
                email: 'newadmin@admin.admin',
                password: '123456789'
            };
            const response = await request(app).post('/api/users/register').send(user);
            expect(response.statusCode).toBe(201);
        });
        test('should return new user body', async () => {
            const user = {
                email: 'newadmin@admin.admin',
                password: '123456789'
            };
            const response = await request(app).post('/api/users/register').send(user);
            expect(response.body).toBeDefined();
        });
        test('should return status code 400', async () => {
            const user = {
                email: 'test@test.test',
                password: '123456789'
            };
            const response = await request(app).post('/api/users/register').send(user);
            expect(response.statusCode).toBe(400);
        });
    });
});