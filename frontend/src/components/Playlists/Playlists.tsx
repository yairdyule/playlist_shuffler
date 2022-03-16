import { useEffect, useState } from "react";
import { IPlaylist } from "../../types";
import { getUserPlaylists } from "../../utilities/api";
import Playlist from "./Playlist";
import "./Playlist.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    (async () => {
      let { data } = await getUserPlaylists()
      setPlaylists(data.playlists);
    })();
  }, []);

  if (!playlists) {
    return <div>...loading...</div>;
  }

  console.log(playlists);

  return (
    <div className="playlists">
      <hr/>
      {playlists.map((list) => {
        return <Playlist playlist={list} />;
      })}
    </div>
  );
}
