// @ts-ignore
import supertest from 'supertest';
import app from '../index';
import db from '../src/models/db';
jest.mock('../server/src/models/db');

describe('Authentication and Authorization form', () => {

    beforeEach((): void => {
        jest.clearAllMocks();
        jest.resetModules();
    })

    test('User can successfully signUp', async () => {
        //@ts-ignore
        db.query = jest.fn( () => Promise.resolve({rows: [{
            email: "leshya@mail.ru",
            password: "hello",
            name: "anything"
        }]}));

        const user = {email: "leshya@mail.ru", password: "hello", name: "anything"};
        const res = await supertest(app)
            .post('/api/signup')
            .send(user);
        expect(res.status).toBe(200);
        expect(res.text).toBe(`User with this email leshya@mail.ru successfully created`);
    })

    test('User gets error on sign up with the same email', async () => {
        //@ts-ignore
        db.query = jest.fn( () => Promise.reject(`User with this email already exists`));
        const user = {email: "leshya@mail.ru", password: "hello", name: "anything"};
        const res = await supertest(app)
            .post('/api/signup')
            .send(user);
        expect(res.status).toBe(500);
    })

    test('User can successfully login', async () => {
        //@ts-ignore
        db.query = jest.fn(() => Promise.resolve(
            {rows: [{
                id: "02866337-4fc2-4b9a-bfc5-b620f5ab4490",
                email: "vasya@mail.ru",
                name: "anything",
                isLogin: "true",
                password: "$2b$04$HjnkR.HRVpIf20EtYUVlweTW7W3qE7zNYtzhEWVeomhYT5toj7Gm6"
            }]}
        ))

        const user = {email: "vasya@mail.ru", password: "hello", name: "anything"};
        const {status, body} = await supertest(app)
            .post('/api/login')
            .send({...user});
        expect(status).toBe(200);
        expect(body.email).toBe(user.email);
        expect(body.name).toBe(user.name)
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
    })

    test('User gets 403 on invalid credentials', async () => {
        //@ts-ignore
        db.query = jest.fn(() => Promise.resolve(
            {rows: [{
                    id: "02866337-4fc2-4b9a-bfc5-b620f5ab4490",
                    email: "vasya@mail.ru",
                    name: "anything",
                    isLogin: "true",
                    password: "$2b$04$HjnkR.HRVpIf20EtYUVlweTW7W3qE7zNYtzhEWVeomhYT5toj7Gm6"
                }]}
        ))

        const res = await supertest(app)
            .post('/api/login')
            .send({email: "vasy@mail.ru", password: "hellojj", name: "Leisha"});
        expect(res.status).toBe(403);
    })


    test('Refresh tokens become invalid on logout', async () => {
        const logoutRes = await supertest(app)
            .post('/api/logout')
        expect(logoutRes.status).toBe(302);
    })
})
;

