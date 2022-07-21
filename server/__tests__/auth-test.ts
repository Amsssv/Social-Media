import request from "supertest";
import app from '../index';

describe("Authentication and Authorization form", () => {
    test("User can successfully login", async () => {
        const response = await request(app).post("/login");
        expect(response.statusCode).toBe(200);
        expect(typeof response.body.login === 'string').toBe(true);
        expect(typeof response.body.password === 'string').toBe(true);
    });
});

