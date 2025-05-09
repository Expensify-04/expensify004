
import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {ToastContainer} from "react-toastify";
import { AuthProvider } from "./Components/Authentication";
function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
    
  return (
    <>
      
      <GoogleOAuthProvider clientId={clientId}>
       <AuthProvider>
        <RouterProvider router={AppRouter} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          closeOnClick
          draggable
          theme="light"
          pauseOnHover
        />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
