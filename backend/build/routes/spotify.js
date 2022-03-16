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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyRouter = void 0;
const express_1 = require("express");
const index_1 = require("../utils/index");
const router = (0, express_1.Router)();
router.get("/test", (_req, res) => {
    res.status(200).send({ msg: "tested" });
});
// route: /spotify/
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("/spotify/auth");
}));
// /spotify/auth
router.get("/auth", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(index_1.api.createAuthorizeURL(index_1.scopes, "arstneio", true));
}));
// /spotify/callback
router.get("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, code } = req.query;
    if (error) {
        return res.status(401).send({
            success: false,
            msg: "failed to authenticate with spotify's API",
        });
    }
    try {
        let auth = yield index_1.api.authorizationCodeGrant(code);
        let { access_token, refresh_token, expires_in } = auth.body;
        index_1.api.setAccessToken(access_token);
        index_1.api.setRefreshToken(refresh_token);
        // set an interval (~3min) after which we refresh the access token
        // for this user. this allows for perpetual action on their
        // behalf, even when they're not on the app (in theory)
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield index_1.api.refreshAccessToken();
                const access_token = data.body["access_token"];
                index_1.api.setAccessToken(access_token);
            }
            catch (err) {
                console.log(err);
            }
        }), (expires_in / 2) * 100);
        // res.sendFile(path.join(__dirname, "../frontend/index.html"));
        (0, index_1.returnToFrontend)(res);
    }
    catch (error) {
        return res.status(400).send({
            success: false,
            msg: "failed to authenticate with spotify's api",
        });
    }
}));
router.get("/user", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { body } = yield index_1.api.getMe();
        let img = body.images[0].url;
        let name = body.display_name;
        res.send({
            img: img,
            name: name,
        });
    }
    catch (err) {
        res.status(401).send({ success: false });
    }
}));
/*
 * get the validated user's playlists
* {playlists: [{
    id, name, img, tracks
    }]
* }
 */
router.get("/getUserPlaylists", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = yield index_1.api.getUserPlaylists();
    let playlists = body.items.map((plist) => {
        return {
            id: plist.id,
            name: plist.name,
            img: plist.images[0],
            tracks: plist.tracks,
        };
    });
    res.send({ playlists: playlists });
}));
router.get("/getUserPlaylist/:playlistId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { playlistId } = req.params;
    let { body } = yield index_1.api.getPlaylist(playlistId);
    let name = body.name;
    let id = body.id;
    let uri = body.uri;
    let tracks = body.tracks;
    let img = body.images[0];
    res.send({
        playlist: {
            name,
            id,
            uri,
            tracks,
            img,
        },
    });
}));
router.get("/shufflePlaylist/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id; //req.params.id?
    try {
        index_1.api
            .getPlaylist(id)
            .then(({ body }) => {
            return body.tracks.items.map(({ track }) => {
                return {
                    uri: track.uri,
                    id: track.id,
                };
            });
        })
            .then((trackInfo) => __awaiter(void 0, void 0, void 0, function* () {
            //remove all tracks
            let uris = trackInfo.map((datum) => {
                return { uri: datum.uri };
            });
            yield index_1.api.removeTracksFromPlaylist(id, uris);
            //shuffle uris
            let shuffledUris = (0, index_1.shuffle)(uris).map((datum) => datum.uri);
            //add shuffled tracks
            yield index_1.api.addTracksToPlaylist(id, shuffledUris);
            res.send({ success: true });
        }))
            .catch((err) => {
            console.error(err);
            res.send({ success: false });
        });
    }
    catch (err) {
        console.error(err);
        console.log("sorry");
    }
}));
router.get("/alphabetizePlaylistTracks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        let { body: playlist } = yield index_1.api.getPlaylist(id);
        let uris = playlist.tracks.items.map(({ track }) => {
            return { uri: track.uri };
        });
        yield index_1.api.removeTracksFromPlaylist(id, uris);
        let trackStuff = playlist.tracks.items.map(({ track }) => {
            return {
                toCompare: track.name,
                uri: track.uri,
            };
        });
        trackStuff = (0, index_1.alphabetize)(trackStuff);
        let alphabetizedUris = trackStuff.map((datum) => datum.uri);
        yield index_1.api.addTracksToPlaylist(id, alphabetizedUris);
        res.send({ success: true });
    }
    catch (err) {
        res.status(400).send({ success: false });
    }
}));
router.get("/alphabetizePlaylistArtists/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let id = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        let { body: playlist } = yield index_1.api.getPlaylist(id);
        let uris = playlist.tracks.items.map(({ track }) => {
            return { uri: track.uri };
        });
        yield index_1.api.removeTracksFromPlaylist(id, uris);
        let trackStuff = playlist.tracks.items.map(({ track }) => {
            return {
                toCompare: track.artists[0].name,
                uri: track.uri,
            };
        });
        trackStuff = (0, index_1.alphabetize)(trackStuff);
        let alphabetizedUris = trackStuff.map((datum) => datum.uri);
        yield index_1.api.addTracksToPlaylist(id, alphabetizedUris);
        res.send({ success: true });
    }
    catch (err) {
        res.status(400).send({ success: false });
    }
}));
router.get("/getPlaylistTracks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let playlistId = (_d = req.params) === null || _d === void 0 ? void 0 : _d.id;
    try {
        let { body: playlist } = yield index_1.api.getPlaylist(playlistId);
        let { body: trackResponse } = yield index_1.api.getTracks(playlist.tracks.items.map(({ track }) => track.id));
        let tracks = trackResponse.tracks.slice(0, 15).map((track) => {
            return {
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist) => artist.name),
                image: track.album.images[0].url,
                album: track.album.name,
            };
        });
        res
            .status(200)
            .send({ success: true, msg: "tracks fetched", tracks: tracks });
    }
    catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
}));
exports.SpotifyRouter = {
    router: router,
    path: "/spotify",
};
