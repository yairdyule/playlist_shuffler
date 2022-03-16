import axios, { AxiosInstance } from "axios";

console.log(process.env.NODE_ENV === "development");

export const authUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/spotify/auth"
    : "https://shuffling-extravaganza.herokuapp.com/spotify/auth";

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : "https://shuffling-extravaganza.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});

export const getPlaylistTracks = async (playlistId: string) => {
  return await api.get(`/spotify/getPlaylistTracks/${playlistId}`);
};

export const shufflePlaylist = async (playlistId: string) => {
  return await api.get(`/spotify/shufflePlaylist/${playlistId}`);
};

export const alphabetizeByTrack = async (playlistId: string) => {
  return await api.get(`/spotify/alphabetizePlaylistTracks/${playlistId}`);
};

export const alphabetizeByArtist = async (playlistId: string) => {
  return await api.get(`/spotify/alphabetizePlaylistArtists/${playlistId}`);
};

export const getUserPlaylists = async () => {
  return await api.get("/spotify/getUserPlaylists");
};

export const getUser = async () => {
  return await api.get("/spotify/user");
};
