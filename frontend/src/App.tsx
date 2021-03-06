import { useEffect, useState } from "react";
import User from "./components/User/User";
import "./App.css";
import Playlists from "./components/Playlists/Playlists";
import { authUrl } from "./utilities/api";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  const click = () => {
    localStorage.setItem("isAuthed", "yes");
    setIsAuthed(true);
  };

  useEffect(() => {
    const authed = localStorage.getItem("isAuthed");
    setIsAuthed(authed === "yes" ? true : false);
  }, []);


  const heading = <h1>playlist shuffling extravaganza</h1>;

  if (!isAuthed) {
    return (
      <div className="App">
        {heading}
        <a
          // href="https://shuffling-extravaganza.herokuapp.com/spotify/auth"
          href={authUrl}
          onClick={() => click()}
        >
          authorize us with spotify
        </a>
      </div>
    );
  }

  return (
    <div className="App">
      <User />
      <Playlists />
    </div>
  );
}

export default App;
