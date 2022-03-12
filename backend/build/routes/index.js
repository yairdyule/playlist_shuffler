"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const spotify_1 = require("./spotify");
const server_1 = require("./server");
exports.Routes = [spotify_1.SpotifyRouter, server_1.ServerRouter];
