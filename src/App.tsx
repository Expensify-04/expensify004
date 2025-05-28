import {GoogleOAuthProvider} from "@react-oauth/google";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./Components/Auth/Authentication";
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routes/router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const queryClient = new QueryClient();

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />

            <ToastContainer
              position="top-right"
              autoClose={1000}
              closeOnClick
              draggable
              theme="light"
              pauseOnHover
            />
          </AuthProvider>

          {import.meta.env.DEV && <ReactQueryDevtools />}
          {import.meta.env.DEV && <TanStackRouterDevtools router={router} position="bottom-left" />}
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
