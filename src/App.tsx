import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="912996226246-9ja53kmbgrml5rmk4rh3uemvjfjqvtb0.apps.googleusercontent.com ">
      <RouterProvider router={AppRouter}  /> 
      <ToastContainer position="top-right" autoClose={1000} closeOnClick draggable theme="light" pauseOnHover/>

      </GoogleOAuthProvider>
    </>
  );
}

export default App;
