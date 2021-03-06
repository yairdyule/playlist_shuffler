"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnToFrontend = exports.alphabetize = exports.shuffle = exports.scopes = exports.api = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.api = new spotify_web_api_node_1.default({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NODE_ENV === "development"
        ? "http://localhost:8000/spotify/callback"
        : process.env.REDIRECT_URI,
});
exports.scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "playlist-modify-public",
    "playlist-modify-private",
];
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
exports.shuffle = shuffle;
function alphabetize(input) {
    let arr = input.slice(0); //copy array
    let sorted = arr.sort((a, b) => a.toCompare < b.toCompare ? -1 : 1);
    return sorted;
}
exports.alphabetize = alphabetize;
function returnToFrontend(res) {
    if (process.env.NODE_ENV == "development") {
        res.redirect("http://localhost:3000");
    }
    else {
        res.sendFile(path_1.default.join(__dirname, "../frontend/index.html"));
    }
}
exports.returnToFrontend = returnToFrontend;
