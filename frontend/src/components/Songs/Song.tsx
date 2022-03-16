import { ITrack } from "../../types";
import "./Song.css";

export default function Song({ track }: { track: ITrack }) {
  console.log(track.image);
  return (
    <div className="song">
      <img src={track.image} />
      <div className="info">
        <h3 className="name">{track.name}</h3>
        <ul>
          {track.artists.map((artist, index, { length }) => {
            if (length - 1 == index) {
              return <li>{artist}</li>;
            } else {
              return <li>{artist},</li>;
            }
          })}
        </ul>
      </div>
      {/* <h3 className="album">{track.album}</h3> */}
    </div>
  );
}
