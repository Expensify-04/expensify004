import {createBrowserRouter} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Components/Home";
import CurrencyConverter from "../Components/CurrencyConverter";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import Piechart from "../Components/Piechart";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ProtectedRouter from "../Components/ProtectedRouter";
const AppRouter = createBrowserRouter([
  {
    
    path: "/",
    element: <Layout />,
    children: [
      {index:true,element: <Home/>},
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRouter>
                      <Piechart/>
         </ProtectedRouter>
        ),
      },
      {
        path: "currency",
        element: (
          <ProtectedRouter>
            <CurrencyConverter />
          </ProtectedRouter>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default AppRouter;
