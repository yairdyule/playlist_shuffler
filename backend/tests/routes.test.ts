import request from "supertest";
import { server } from "../server";

describe("Spotify endpoints", () => {
  afterAll(() => {
    server.close();
  });

  it("Should hit test routes", async () => {
    const res = await request(server).get("/spotify/test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toBe("tested");
  });

  it("Should fail unauthorized users", async () => {
    const res = await request(server).get("/spotify/user");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("success");
    expect(res.body.success).toEqual(false);
  });
});
