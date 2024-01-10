import { Routes, Route, Link, HashRouter } from "react-router-dom";

import GundamsList from "./components/gundams-list";
import Gundams from "./components/gundams";
import GundInfo from "./components/gund-info";

import Signup from "./components/signup";
import Login from "./components/login";
import Favourites from "./components/Favourites";
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function App() {
  /*Fiddling with websockets
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => {
      console.log(`Connection : ${socket.id}`);
    });
    socket.on("foo", (string) => {
      console.log(string);
    });
  }, []);*/
  return (
  
    <HashRouter>
      <Routes>
        <Route path="/" element={<GundamsList />} />
        <Route path="/gund2/:name" element={<Gundams />} />
        <Route path="/gund-info" element={<GundInfo />} />
        <Route path="/gund-info" element={<GundInfo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path={"/gunder/:name"} element={<GundInfo />} />
      </Routes>
    </HashRouter>

  );
}

export default App;
