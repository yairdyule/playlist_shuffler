import request from "supertest";
import { Routes } from "../routes";
import { server } from "../server";
import { Wares } from "../wares";

describe("Spotify endpoints", () => {
  afterAll(() => {
    server.close();
  });

  it("/test: Should hit test route", async () => {
    const res = await request(server).get("/spotify/test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("tested");
  });

  it("/callback: Should properly fail with 'error' sent in query", async () => {
    const res = await request(server)
      .get("/spotify/callback")
      .query({ error: true });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toBe(false);
  });

  it("/user: Should fail unauthenticated users", async () => {
    const res = await request(server).get("/spotify/user");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toEqual(false);
  });

  it("/callback: Should fail gracefully", async () => {
    const res = await request(server).get("/spotify/callback");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toEqual(false);
  });
});

describe("Route initializiation", () => {
  Routes.forEach((route) => {
    expect(route).toHaveProperty("path");
    expect(route).toHaveProperty("router");
  });
});
