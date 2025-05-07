import {createBrowserRouter} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Components/Home";
import CurrencyConverter from "../Components/CurrencyConverter";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
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
        path: "Dashboard",
        element: <CurrencyConverter />,
      },
      {
        path: "Currency",
        element: <CurrencyConverter />,
      },
      // {
      //   path: "*",
      //   element: <ErrorPage />,
      // },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default AppRouter;
