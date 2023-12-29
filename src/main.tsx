import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"
import { UserContextProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
    <GoogleOAuthProvider clientId="1027295592136-c6tp18kfu3s3uuvp364kbbfv25od924f.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </UserContextProvider>
  </React.StrictMode>
);
