"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
afterAll(() => {
    server_1.server.close();
});
describe("Server tests", () => {
    it("Should listen", () => {
        expect(server_1.server.listening).toBeTruthy();
    });
});
