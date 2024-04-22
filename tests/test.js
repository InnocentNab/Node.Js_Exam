import request from "supertest";
import { connect } from "../src/database/db.connect.js";
import app from "../src/app.js";

describe("E2E tests", () => {
  it("should be able to register", async () => {
    await clearDB();
    const res = await request(app).post("/user/register").send({
      email: "solomon.eniola7@gmail.com",
      password: "password1234",
      name: "Test User",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("User created successfully");
    expect(res.body.data.user).toHaveProperty("first_name");
    expect(res.body.data.user).toHaveProperty("last_name");
    expect(res.body.data.user).toHaveProperty("email");
  });

  it("should be able to login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "",
      password: "",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Login successful");
    expect(res.body.data).toHaveProperty("accessToken");
  });
});
