import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Non-lazy loaded components (small or layout-level)
import Layout from "../Components/Layout/Layout";
import Home from "../Components/Home";
import PrivateRoute from "../Auth/PrivateRoute";
<<<<<<< HEAD
import {PropagateLoader} from "react-spinners";
=======
import { PropagateLoader } from "react-spinners";
>>>>>>> df4412c85638b1af8ed83e47f25f4735433d413b
import Piechart from "../Components/Piechart";

// Lazy loaded components
const CurrencyConverter = lazy(() => import("../Components/CurrencyConverter"));
const Signin = lazy(() => import("../Components/Signin"));
const Signup = lazy(() => import("../Components/Signup"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage/ErrorPage"));

const Loading = (
  <div className="flex items-center justify-center min-h-screen">
    <PropagateLoader color="#0862e5" size={15} />
  </div>
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home />},

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Piechart />
          </PrivateRoute>
        ),
      },
      {
        path: "currency",
        element: (
          <PrivateRoute>
            <Suspense fallback={Loading}>
              <CurrencyConverter />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={Loading}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={Loading}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={Loading}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default AppRouter;
