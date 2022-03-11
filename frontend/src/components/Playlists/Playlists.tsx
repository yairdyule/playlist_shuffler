import { useEffect, useState } from "react";
import { IPlaylist } from "../../types";
import { api } from "../../utilities/api";
import Playlist from "./Playlist";
import "./Playlist.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    (async () => {
      let { data } = await api.get("/spotify/getUserPlaylists");
      setPlaylists(data.playlists);
    })();
  }, []);

  if (!playlists) {
    return <div>...loading...</div>;
  }

  console.log(playlists);

  return (
    <div className="playlists">
      <h2></h2>

      {playlists.map((list) => {
        return <Playlist playlist={list} />;
      })}
    </div>
  );
}
