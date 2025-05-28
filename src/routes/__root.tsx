import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import {useEffect} from "react";
import {useAuth} from "../Components/Auth/Authentication";
import {Outlet} from "@tanstack/react-router";

const Layout = () => {
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    console.log("login state ", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow" role="main">
        <Outlet /> {/* This renders the nested route (Home, CurrencyConverter, etc.) */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
