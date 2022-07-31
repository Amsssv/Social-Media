import supertest from 'supertest';
import app from '../index';
import userService from "../src/services/user.service";
import set = Reflect.set;


describe('Authentication and Authorization form', () => {

    test('User can successfully registrate', async () => {
        const users = [
            {email: "vasya@mail.ru", password: "hello", name: "Leisha"},
            {email: "lesha@mail.ru", password: "world", name: "Vasyl"},
        ]
        for (const user of users) {
            await userService.registration(user.email, user.password, user.name);
            const {status, body} = await supertest(app)
                .post('/api/registration')
                .send(user);
            expect(status).toBe(200);
            expect(body.email).toEqual(user.email);
            expect(body.id).toBeDefined();
       }
    })

    test('User can successfully login', async () => {
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
        const res = await supertest(app)
            .post('/api/login')
            .send({email: "vasy@mail.ru", password: "hellojj", name: "Leisha"});
        expect(res.status).toBe(403);
    })

    test('User can get new access token using refresh token', async () => {
        const res = await supertest(app)
            .post('/api/refresh')
            .send({
                refreshToken
            });
        expect(status).toBe(200);
    })

    test('User get 404 on invalid refresh token', async () => {
        const {status} = await supertest(app)
            .post('/api/refresh')
            .send({
                refreshToken: 'INVALID',
            })
        expect(status).toBe(404)
    })
    //
    test('User can use refresh token only once', async () => {
        const firstResponse = await supertest(app)
            .post('/api/refresh')
            .send()
        expect(firstResponse.status).toBe(200);
        expect(typeof firstResponse.body.accessToken === 'string').toBe(true);
        expect(typeof firstResponse.header.cookie.refreshToken === 'string').toBe(true);

        const secondResponce = await supertest(app)
            .post('/api/refresh')
            .send()
        expect(secondResponce.status).toBe(404)
    })

    test('Refresh tokens become invalid on logout', async () => {
        const logoutRes = await supertest(app)
            .post('/api/logout')
        expect(logoutRes.status).toBe(302);
    })
});

