import { ITrack } from "../../types";
import {
  alphabetizeByArtist,
  alphabetizeByTrack,
  getPlaylistTracks,
  shufflePlaylist,
} from "../../utilities/api";

export async function shuffleSongs(playlistId: string): Promise<ITrack[]> {
  let { data } = await shufflePlaylist(playlistId);
  if (data.success) {
    let { data } = await getPlaylistTracks(playlistId);
    if (data.success) {
      return data.tracks as ITrack[];
    }
  }
  return [];
}

export async function orderByName(playlistId: string): Promise<ITrack[]> {
  let { data } = await alphabetizeByTrack(playlistId as string);
  if (data.success) {
    let { data } = await getPlaylistTracks(playlistId as string);
    if (data.success) {
      return data.tracks as ITrack[];
    }
  }
  return [];
}

export async function orderByArtist(playlistId: string): Promise<ITrack[]> {
  let { data } = await alphabetizeByArtist(playlistId as string);
  if (data.success) {
    let { data } = await getPlaylistTracks(playlistId as string);
    if (data.success) {
      return data.tracks as ITrack[];
    }
  }
  return [];
}
