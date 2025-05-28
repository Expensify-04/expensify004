import {
  createRouter,
  createRootRoute,
  createRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";

import Piechart from "../Components/Dashboard/Piechart";
import Layout from "./__root";
import Home from "../Components/Home";
import {authGuard} from "../utils/AuthGuard";

const Signin = lazyRouteComponent(() => import("../Components/Auth/Signin"));
const Signup = lazyRouteComponent(() => import("../Components/Auth/Signup"));
const CurrencyConverter = lazyRouteComponent(
  () => import("../Components/Currency/CurrencyConverter")
);
const ErrorPage = lazyRouteComponent(() => import("../Pages/ErrorPage/ErrorPage"));

// Root route
const rootRoute = createRootRoute({
  component: Layout,
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  beforeLoad: authGuard,
  component: () => <Piechart />,
});

const currencyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "currency",
  beforeLoad: authGuard,
  component: () => <CurrencyConverter />,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signin",
  component: Signin,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signup",
  component: Signup,
});

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: ErrorPage,
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  dashboardRoute,
  currencyRoute,
  signinRoute,
  signupRoute,
  errorRoute,
]);

// Router instance
export const router = createRouter({
  routeTree,
});

// Router type for inference
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
