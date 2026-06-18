import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import db from "../db/index.js";
import { usersTable, urlsTable } from "../models/index.js";
import { like } from "drizzle-orm";

// Every test user/url created in this file is tagged with this prefix so
// cleanup can find and remove ONLY data created by this test run, even if
// a previous run crashed before cleaning up.
const TEST_TAG = "linkjet-test";
const uniqueEmail = (label) =>
  `${TEST_TAG}-${label}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;

async function cleanupTestData() {
  await db.delete(urlsTable).where(like(urlsTable.targetURL, `%${TEST_TAG}%`));
  await db.delete(usersTable).where(like(usersTable.email, `%${TEST_TAG}%`));
}

beforeAll(async () => {
  await cleanupTestData();
});
afterAll(async () => {
  await cleanupTestData();
  await db.$client.end(); // close the pg pool so Jest can exit cleanly
});

describe("POST /user/signup", () => {
  test("creates a new user and returns 201 with a userId", async () => {
    const email = uniqueEmail("signup-success");
    const res = await request(app).post("/user/signup").send({
      firstname: "Test",
      lastname: "User",
      email,
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body.data.userId).toBeDefined();
  });

  test("rejects an invalid email with 400 (Zod validation)", async () => {
    const res = await request(app).post("/user/signup").send({
      firstname: "Test",
      lastname: "User",
      email: "not-a-valid-email",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("rejects a duplicate email with 400", async () => {
    const email = uniqueEmail("signup-dupe");
    const payload = {
      firstname: "Test",
      lastname: "User",
      email,
      password: "password123",
    };
    const first = await request(app).post("/user/signup").send(payload);
    expect(first.status).toBe(201);
    const second = await request(app).post("/user/signup").send(payload);
    expect(second.status).toBe(400);
  });
});

describe("POST /user/login", () => {
  async function signupUser(email, password) {
    await request(app)
      .post("/user/signup")
      .send({ firstname: "Test", lastname: "User", email, password });
  }

  test("logs in with correct credentials and returns a token", async () => {
    const email = uniqueEmail("login-success");
    const password = "password123";
    await signupUser(email, password);
    const res = await request(app)
      .post("/user/login")
      .send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("rejects an incorrect password with 404", async () => {
    const email = uniqueEmail("login-wrong-pw");
    await signupUser(email, "correctPassword1");
    const res = await request(app)
      .post("/user/login")
      .send({ email, password: "wrongPassword1" });
    expect(res.status).toBe(404);
  });

  test("rejects a non-existent user with 404", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ email: uniqueEmail("never-signed-up"), password: "password123" });
    expect(res.status).toBe(404);
  });
});

describe("GET /user/me (JWT-protected)", () => {
  async function signupAndLogin(label) {
    const email = uniqueEmail(label);
    const password = "password123";
    await request(app)
      .post("/user/signup")
      .send({ firstname: "Proto", lastname: "Type", email, password });
    const loginRes = await request(app)
      .post("/user/login")
      .send({ email, password });
    return { email, token: loginRes.body.token };
  }

  test("returns 401 when no Authorization header is sent", async () => {
    const res = await request(app).get("/user/me");
    expect(res.status).toBe(401);
  });

  test("returns 401 when the token is garbage/invalid", async () => {
    const res = await request(app)
      .get("/user/me")
      .set("Authorization", "Bearer this.is.not.a.real.jwt");
    expect(res.status).toBe(401);
  });

  test("returns the correct user's profile with a valid token", async () => {
    const { email, token } = await signupAndLogin("me-success");
    const res = await request(app)
      .get("/user/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });
});

describe("POST /shorten (JWT-protected + Zod validation)", () => {
  async function getAuthToken(label) {
    const email = uniqueEmail(label);
    const password = "password123";
    await request(app)
      .post("/user/signup")
      .send({ firstname: "Proto", lastname: "Type", email, password });
    const loginRes = await request(app)
      .post("/user/login")
      .send({ email, password });
    return loginRes.body.token;
  }

  test("returns 401 when not authenticated", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ url: `https://example.com/${TEST_TAG}` });
    expect(res.status).toBe(401);
  });

  test("rejects an invalid URL with 400 when authenticated", async () => {
    const token = await getAuthToken("shorten-invalid-url");
    const res = await request(app)
      .post("/shorten")
      .set("Authorization", `Bearer ${token}`)
      .send({ url: "not-a-real-url" });
    expect(res.status).toBe(400);
  });

  test("creates a short link with a valid token and valid URL", async () => {
    const token = await getAuthToken("shorten-success");
    const res = await request(app)
      .post("/shorten")
      .set("Authorization", `Bearer ${token}`)
      .send({ url: `https://example.com/${TEST_TAG}-page` });
    expect(res.status).toBe(201);
    expect(res.body.shortCode).toBeDefined();
  });
});

describe("GET /:shortCode (public redirect)", () => {
  test("returns 404 for a short code that does not exist", async () => {
    const res = await request(app).get("/this-code-does-not-exist-xyz");
    expect(res.status).toBe(404);
  });
});
