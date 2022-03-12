"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wares = exports.CorsOptions = exports.ExpressJSON = exports.ExpressUrlEncoding = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const domainsFromEnv = process.env.WHITELISTED_URL;
const whitelist = domainsFromEnv === null || domainsFromEnv === void 0 ? void 0 : domainsFromEnv.split(",").map((item) => item.trim());
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || (whitelist === null || whitelist === void 0 ? void 0 : whitelist.indexOf(origin)) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
const FrontendAssets = express_1.default.static(path_1.default.join(__dirname, "../frontend"));
exports.ExpressUrlEncoding = express_1.default.urlencoded({ extended: true });
exports.ExpressJSON = express_1.default.json();
exports.CorsOptions = (0, cors_1.default)(corsOptions);
exports.Wares = [
    exports.CorsOptions,
    exports.ExpressJSON,
    exports.ExpressUrlEncoding,
    FrontendAssets,
];
