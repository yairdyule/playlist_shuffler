import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
import { Response } from "express";
import path from "path";
dotenv.config();

export const api = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/spotify/callback"
      : process.env.REDIRECT_URI,
});

export const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-modify-public",
  "playlist-modify-private",
];

export function shuffle(array: any[]) {
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

export type sortInput = { toCompare: any; uri: string };
export function alphabetize(input: sortInput[]) {
  let arr = input.slice(0); //copy array
  let sorted = arr.sort((a, b) => a.toCompare < b.toCompare ? -1 : 1);
  return sorted;
}

export function returnToFrontend(res: Response) {
  if (process.env.NODE_ENV == "development") {
    res.redirect("http://localhost:3000");
  } else {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  }
}
