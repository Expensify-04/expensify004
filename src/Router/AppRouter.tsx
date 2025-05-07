// src/router/AppRouter.jsx
import {createBrowserRouter} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Components/Home";
import CurrencyConverter from "../Components/CurrencyConverter";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import PrivateRoute from "../Auth/PrivateRoute";

// import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <CurrencyConverter />
          </PrivateRoute>
        ),
      },
      {
        path: "currency",
        element: (
          <PrivateRoute>
            <CurrencyConverter />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      // {
      //   path: "*",
      //   element: <ErrorPage />,
      // },
    ],
  },
]);

export default AppRouter;
