import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={AppRouter} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
