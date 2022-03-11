import { useEffect, useState } from "react";
import User from "./components/User/User";
import "./App.css";
import Playlists from "./components/Playlists/Playlists";
// import { api } from "./utilities/api";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  const click = () => {
    localStorage.setItem("isAuthed", "yes");
    setIsAuthed(true);
  };

  useEffect(() => {
    switch (localStorage.getItem("isAuthed")) {
      case "yes":
        setIsAuthed(true);
        break;
      default:
        setIsAuthed(false);
    }
  }, []);

  const heading = <h1>playlist shuffling extravaganza</h1>;

  if (!isAuthed) {
    return (
      <div className="App">
        {heading}
        <a
          onClick={() => {
            click();
          }}
          href="http://localhost:8000/spotify/auth"
        >
          authorize us with spotify
        </a>
      </div>
    );
  }

  return (
    <div className="App">
      {heading}
      <User />
      <Playlists />
    </div>
  );
}

export default App;
