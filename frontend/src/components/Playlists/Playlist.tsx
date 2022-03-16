import { useEffect, useState } from "react";
import { IPlaylist } from "../../types";
import { api } from "../../utilities/api";
import "./Playlist.css";

export default function Playlist({ playlist }: { playlist: IPlaylist }) {
  const [shuffled, setShuffled] = useState<true | false | null>(null);

  const handleClick = async () => {
    let { data } = await api.get(`/spotify/shufflePlaylist/${playlist.id}`);
    setShuffled(data.success);
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
