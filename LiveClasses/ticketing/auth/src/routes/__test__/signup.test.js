import request from "supertest";
import app from "../../app.js";

it("returns a 201 on successful login", async () => {
    return request(app)
        .post("/api/v1/users/login")
        .send({
            email: "test@example.com",
            password: "password",
        })
        .expect(201);
});
