"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const wares_1 = require("./wares");
const app = (0, express_1.default)();
for (const ware of wares_1.Wares) {
    app.use(ware);
}
for (const route of routes_1.Routes) {
    app.use(route.path, route.router);
}
exports.server = app.listen(process.env.PORT || 8000);
