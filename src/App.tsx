import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="912996226246-9ja53kmbgrml5rmk4rh3uemvjfjqvtb0.apps.googleusercontent.com ">
      <RouterProvider router={AppRouter} />

      </GoogleOAuthProvider>
    </>
  );
}

export default App;
