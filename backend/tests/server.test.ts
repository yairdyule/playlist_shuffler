import { server } from "../server";

afterAll(() => {
  server.close();
});

describe("Server tests", () => {
  it("Should listen", () => {
    expect(server.listening).toBeTruthy();
  });
});
