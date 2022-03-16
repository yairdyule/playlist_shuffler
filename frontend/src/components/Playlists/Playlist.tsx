import { useState } from "react";
import { getPlaylistTracks } from "../../utilities/api";
import { shuffleSongs, orderByName, orderByArtist } from "./utils";
import { IPlaylist, ITrack } from "../../types";

import Song from "../Songs/Song";
import "./Playlist.css";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [songs, setSongs] = useState<ITrack[]>([]);
  const [showSongs, setShowSongs] = useState(false);

  const handleClick = async () => {
    if (songs.length == 0) {
      let { data } = await getPlaylistTracks(playlist.id as string);
      setSongs(data.tracks as ITrack[]);
    }
    setShowSongs(!showSongs);
  };

  const handleShuffle = async () => {
    setSongs(await shuffleSongs(playlist.id as string));
  };

  const handleOrderByName = async () => {
    setSongs(await orderByName(playlist.id as string));
  };

  const handleOrderByArtist = async () => {
    setSongs(await orderByArtist(playlist.id as string));
  };

  return (
    <>
      <div className="playlist" onClick={handleClick}>
        <img src={playlist?.img?.url} alt="" />
        <h3>{playlist.name}</h3>
      </div>
      <div className="songs">
        {showSongs && songs && songs.map((track) => <Song track={track} />)}
      </div>
      {showSongs && (
        <div className="buttons">
          <button onClick={handleShuffle}>shuffle</button>
          <button onClick={handleOrderByName}>order by name</button>
          <button onClick={handleOrderByArtist}>order by artist</button>
        </div>
      )}
      <hr />
    </>
  );
}
