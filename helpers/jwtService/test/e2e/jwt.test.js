const request = require("supertest");
const app = require("src/app");

require("dotenv").config();

describe("Test Token URL", () => {
  it("Validate token", async () => {
    const payload = {
      user_id: "1",
      user_email: "test@zeleri.com",
      active: true,
    };
    const tokenCreate = await request(app).post("/api/jwt/").send({
      payload,
      expires: true,
      expiresIn: 3600,
    });
    const token = tokenCreate.body.token;
    expect(token).toBeDefined();
    
    const response = await request(app)
      .post("/api/jwt/validate")
      .send({ token: token });
    expect(response.status).toBe(200);
  });

  it(" Token not Found", async () => {
    const response = await request(app).post("/api/jwt/validate");
    expect(response.status).toBe(400);
  });

  it("Payload null", async () => {
    const response = await request(app).post("/api/jwt/").send({
      payload: null,
      expires: true,
      expiresIn: 3600,
    });
    expect(response.status).toBe(400);
  });
});