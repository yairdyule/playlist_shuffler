import { Router } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
import { IRoute } from "../types";

dotenv.config();
const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-modify-public",
  "playlist-modify-private",
];

const router = Router();

// route: /spotify/
router.get("/", async (req, res) => {
  console.log("receieved a req");
  res.redirect("/spotify/auth");
});

// /spotify/auth
router.get("/auth", async (req, res) => {
  res.redirect(api.createAuthorizeURL(scopes, "arstneio", true));
});

// /spotify/callback
router.get("/callback", async (req, res) => {
  const { error, code, state } = req.query;

  if (error) {
    return res.status(400).send({
      success: false,
      msg: "failed to authenticate with spotify's API",
    });
  }

  try {
    let auth = await api.authorizationCodeGrant(code as string);
    let { access_token, refresh_token, expires_in } = auth.body;
    api.setAccessToken(access_token);
    api.setRefreshToken(refresh_token);

    // set an interval (~3min) after which we refresh the access token
    // for this user. this allows for perpetual action on their
    // behalf, even when they're not on the app (in theory)
    setInterval(async () => {
      try {
        const data = await api.refreshAccessToken();
        const access_token = data.body["access_token"];
        console.log("The access token has been refreshed!");
        api.setAccessToken(access_token);
      } catch (err) {
        console.log("Problem retrieving refresh token: ");
        console.log(err);
      }
    }, (expires_in / 2) * 100);

    res.redirect("http://localhost:3000"); //get 'back in' to frontend
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      msg: "failed to authenticate with spotify's api",
    });
  }
});

router.get("/getUserPlaylists", async (req, res) => {
  let { body } = await api.getUserPlaylists();
  let playlists = body.items.map((plist) => {
    return {
      id: plist.id,
      name: plist.name,
      img: plist.images[0],
      tracks: plist.tracks,
    };
  });

  res.send({ playlists: playlists });
});

router.get("/shufflePlaylist", async (req, res) => {
  let id = ""; //req.params.id?
  let { body: playlist } = await api.getPlaylist(id);
  let tracks = playlist.tracks.items.map((track) => track.track);
  await api.removeTracksFromPlaylist(id, tracks);
  let shuffled = shuffleArray(tracks) as SpotifyApi.TrackObjectFull[];
  await api.addTracksToPlaylist(
    id,
    shuffled.map((track) => track.uri)
  );
  res.send("shuffled");
});

/**
 * @cite: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
 */
function shuffleArray(items: any[]) {
  return items
    .map((value) => ({ value, sort: Math.random }))
    .sort(
      (a, b) => (a.sort as unknown as number) - (b.sort as unknown as number)
    )
    .map(({ value }) => value);
}

export const SpotifyRouter: IRoute = {
  router: router,
  path: "/spotify",
};
