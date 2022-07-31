import supertest from 'supertest';
import app from '../index';
import userService from "../src/services/user.service";


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
        const res = await supertest(app)
            .post('/api/login')
            .send({});
        expect(res.status).toBe(200);
        expect(typeof res.body.accessToken === 'string').toBe(true)
        // expect(typeof res.header.cookie.refreshToken === 'string').toBe(true)

        // const {status, body, header} = await supertest(app)
        //     .get('/api/refresh')
        //     .send({
        //         refreshToken: res.header.cookie.refreshToken,
        //     });
        // expect(status).toBe(200);
        // expect(typeof body.accesstoken === 'string').toBe(true);
        // expect(typeof header.cookie.value === 'string').toBe(true);
    })

    test('User gets 403 on invalid credentials', async () => {
        const res = await supertest(app)
            .post('/api/login')
            .send({
                login: 'INVALID',
                password: 'INVALID',
            });
        expect(res.status).toBe(403);
    })
    //
    // test('User receives 401 on expired token', async () => {
    //     const expiredToken = issueToken(users[0], {expiresIn: '1000ms'});
    //     const res = await supertest(app)
    //         .get('/api/users')
    //         .set('Authorization', `Bearer ${expiredToken}`);
    //     expect(res.status).toBe(401);
    // })
    //
    // test('User can get new access token using refresh token', async () => {
    //     const {status, body, header} = await supertest(app)
    //         .post('/api/refresh')
    //         .send({
    //             refreshToken: tokens[0].token,
    //         })
    //     expect(status).toBe(200);
    //     expect(typeof body.accessToken === 'string').toBe(true);
    //     expect(typeof header.cookie.refreshToken === 'string').toBe(true);
    // })
    //
    // test('User get 404 on invalid refresh token', async () => {
    //     const {status, header} = await supertest(app)
    //         .post('/api/refresh')
    //         .send({
    //             refreshToken: 'INVALID',
    //         })
    //     expect(status).toBe(404)
    //     expect(header.cookie.refreshToken !== tokens[0].token).toBe(true)
    // })
    //
    // test('User can use refresh token only once', async () => {
    //     const firstResponse = await supertest(app)
    //         .post('/api/refresh')
    //         .send({
    //             refreshToken: tokens[1].token,
    //         })
    //     expect(firstResponse.status).toBe(200);
    //     expect(typeof firstResponse.body.accessToken === 'string').toBe(true);
    //     expect(typeof firstResponse.header.cookie.refreshToken === 'string').toBe(true);
    //
    //     const secondResponce = await supertest(app)
    //         .post('/api/refresh')
    //         .send({
    //             refreshToken: tokens[1].token,
    //         })
    //     expect(secondResponce.status).toBe(404)
    // })
    //
    // test('Refresh tokens become invalid on logout', async () => {
    //     const logoutRes = await supertest(app)
    //         .post('/api/logout')
    //         .set('Authorization', `Bearer ${issueToken(users[1], {})}`);
    //     expect(logoutRes.status).toBe(200);
    //
    //     const {status} = await supertest(app)
    //         .post('/api/refresh')
    //         .send({
    //             refreshToken: tokens[2].token,
    //         })
    //     expect(status).toBe(404)
    // })
});

