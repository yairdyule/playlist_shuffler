import { Router } from "express";
import { IRoute } from "../types";
import {
  scopes,
  api,
  shuffle,
  returnToFrontend,
  alphabetize,
  sortInput,
} from "../utils/index";

const router = Router();

router.get("/test", (_req, res) => {
  res.status(200).send({ msg: "tested" });
});

// route: /spotify/
router.get("/", async (_req, res) => {
  res.redirect("/spotify/auth");
});

// /spotify/auth
router.get("/auth", async (_req, res) => {
  res.redirect(api.createAuthorizeURL(scopes, "arstneio", true));
});

// /spotify/callback
router.get("/callback", async (req, res) => {
  const { error, code } = req.query;

  if (error) {
    return res.status(401).send({
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
        api.setAccessToken(access_token);
      } catch (err) {
        console.log(err);
      }
    }, (expires_in / 2) * 100);

    // res.sendFile(path.join(__dirname, "../frontend/index.html"));
    returnToFrontend(res);
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "failed to authenticate with spotify's api",
    });
  }
});

router.get("/user", async (_req, res) => {
  try {
    let { body } = await api.getMe();

    let img = (body.images as SpotifyApi.ImageObject[])[0].url;
    let name = body.display_name;

    res.send({
      img: img,
      name: name,
    });
  } catch (err) {
    res.status(401).send({ success: false });
  }
});

/*
 * get the validated user's playlists
* {playlists: [{
    id, name, img, tracks
    }]
* }
 */
router.get("/getUserPlaylists", async (_req, res) => {
  try {

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
  } catch (err) {
    console.error(err)
    res.status(401).send({success: false})
  }
});

router.get("/getUserPlaylist/:playlistId", async (req, res) => {
  let { playlistId } = req.params;
  let { body } = await api.getPlaylist(playlistId);

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
});

router.get("/shufflePlaylist/:id", async (req, res) => {
  let id = req.params?.id; //req.params.id?

  try {
    api
      .getPlaylist(id)
      .then(({ body }) => {
        return body.tracks.items.map(({ track }) => {
          return {
            uri: track.uri,
            id: track.id,
          };
        });
      })
      .then(async (trackInfo) => {
        //remove all tracks
        let uris = trackInfo.map((datum) => {
          return { uri: datum.uri };
        });
        await api.removeTracksFromPlaylist(id, uris);

        //shuffle uris
        let shuffledUris = shuffle(uris).map((datum) => datum.uri);

        //add shuffled tracks
        await api.addTracksToPlaylist(id, shuffledUris);
        res.send({ success: true });
      })
      .catch((err) => {
        console.error(err);
        res.send({ success: false });
      });
  } catch (err) {
    console.error(err);
    console.log("sorry");
  }
});

router.get("/alphabetizePlaylistTracks/:id", async (req, res) => {
  let id = req.params?.id;
  try {
    let { body: playlist } = await api.getPlaylist(id);

    let uris = playlist.tracks.items.map(({ track }) => {
      return { uri: track.uri };
    });

    await api.removeTracksFromPlaylist(id, uris);

    let trackStuff: sortInput[] = playlist.tracks.items.map(({ track }) => {
      return {
        toCompare: track.name,
        uri: track.uri,
      };
    });
    trackStuff = alphabetize(trackStuff);

    let alphabetizedUris = trackStuff.map((datum) => datum.uri)
    await api.addTracksToPlaylist(id, alphabetizedUris)
    res.send({success: true})

  } catch (err) {
    res.status(400).send({success: false})
  }
});

router.get("/alphabetizePlaylistArtists/:id", async (req, res) => {
  let id = req.params?.id;
  try {
    let { body: playlist } = await api.getPlaylist(id);

    let uris = playlist.tracks.items.map(({ track }) => {
      return { uri: track.uri };
    });

    await api.removeTracksFromPlaylist(id, uris);

    let trackStuff: sortInput[] = playlist.tracks.items.map(({ track }) => {
      return {
        toCompare: track.artists[0].name,
        uri: track.uri,
      };
    });
    trackStuff = alphabetize(trackStuff);

    let alphabetizedUris = trackStuff.map((datum) => datum.uri)
    await api.addTracksToPlaylist(id, alphabetizedUris)
    res.send({success: true})

  } catch (err) {
    res.status(400).send({success: false})
  }
});

router.get("/getPlaylistTracks/:id", async (req, res) => {
  let playlistId = req.params?.id;

  try {
    let { body: playlist } = await api.getPlaylist(playlistId);

    let { body: trackResponse } = await api.getTracks(
      playlist.tracks.items.map(({ track }) => track.id)
    );

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
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
});

export const SpotifyRouter: IRoute = {
  router: router,
  path: "/spotify",
};
