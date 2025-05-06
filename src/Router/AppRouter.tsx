import {createBrowserRouter} from "react-router-dom";
import Layout from "../Components/Layout";
import Home from "../Components/Home";
import CurrencyConverter from "../Components/CurrencyConverter";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

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
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default AppRouter;
