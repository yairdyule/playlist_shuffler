"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const routes_1 = require("../routes");
const server_1 = require("../server");
describe("Spotify endpoints", () => {
    afterAll(() => {
        server_1.server.close();
    });
    it("/test: Should hit test route", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.server).get("/spotify/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toBe("tested");
    }));
    it("/callback: Should properly fail with 'error' sent in query", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.server)
            .get("/spotify/callback")
            .query({ error: true });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toBe(false);
    }));
    it("/user: Should fail unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.server).get("/spotify/user");
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toEqual(false);
    }));
    it("/callback: Should fail gracefully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.server).get("/spotify/callback");
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toEqual(false);
    }));
});
describe("Route initializiation", () => {
    routes_1.Routes.forEach((route) => {
        expect(route).toHaveProperty("path");
        expect(route).toHaveProperty("router");
    });
});
