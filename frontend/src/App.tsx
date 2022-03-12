import { useEffect, useState } from "react";
import User from "./components/User/User";
import "./App.css";
import Playlists from "./components/Playlists/Playlists";
import { Route, Routes } from "react-router-dom";
// import { api } from "./utilities/api";

function App() {
  const heading = <h1>playlist shuffling extravaganza</h1>;

  return (
    <Routes>
      <Route
        path="/playlists"
        element={
          <div className="App">
            {heading}
            <User />
            <Playlists />
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
