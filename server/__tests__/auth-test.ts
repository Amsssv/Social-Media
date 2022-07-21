import supertest from "supertest";
import app from '../index';

describe("Authentication and Authorization form", () => {

    test("User can successfully login", async () => {
        const res = await supertest(app)
            .post("/login")
            .send({
                login: 'user',
                password: 'user',
            });

        expect(res.statusCode).toBe(200);
        expect(typeof res.body.accessToken === "string").toBe(true)
        expect(typeof res.body.refreshToken === "string").toBe(true)

        const {statusCode, body, header} = await supertest(app)
            .get("/refresh")
            .send({
                refreshToken: res.body.refreshToken,
            });

        expect(statusCode).toBe(200);
        expect(typeof body.accesstoken === 'string').toBe(true);
        expect(typeof  header.cookie.value === 'string').toBe(true);
    })

    test("User gets 403 on invalid credentials", async () => {
        const res = await supertest(app)
            .post("/login");

        expect(res.statusCode).toBe(403);
    })
});

