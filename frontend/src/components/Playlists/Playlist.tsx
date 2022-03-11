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
    <div className={`playlist ${shuffled && "shuffled"}`} onClick={handleClick}>
      <img src={playlist?.img?.url} />
      <h3>{playlist.name}</h3>
    </div>
  );
}
